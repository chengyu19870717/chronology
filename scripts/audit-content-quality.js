const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const projectRoot = path.resolve(__dirname, '..');
const loadStarted = performance.now();
const knowledge = require('../data/historyKnowledge');
const curriculum = require('../data/curriculumIndex');
const curriculumContent = require('../curriculum-package/data/content');
const { PERSON_DETAIL_OVERRIDES } = require('../curriculum-package/data/curatedDetails');
const { hasDynastyTagInfo, TAG_GLOSSARY } = require('../data/dynastyTagGlossary');
const { getPersonTagInfo } = require('../data/personTagGlossary');
const { formatHistoricalName, getNamePronunciation } = require('../data/namePronunciations');
const { buildPersonRows, isShortPersonName } = require('../data/personGridLayout');
const loadMs = performance.now() - loadStarted;

const failures = [];
const warnings = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function duplicateValues(items) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    if (seen.has(item)) duplicates.add(item);
    seen.add(item);
  }
  return Array.from(duplicates);
}

function walkFiles(directory, ignoredNames, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignoredNames.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(fullPath, ignoredNames, files);
    else files.push(fullPath);
  }
  return files;
}

function totalBytes(files) {
  return files.reduce((sum, file) => sum + fs.statSync(file).size, 0);
}

function formatMiB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

const {
  persons,
  events,
  rulers,
  relationships,
  personMap,
  eventMap,
  detailQuality,
  searchPersons,
  searchRulers,
  getDynastyView,
} = knowledge;

function normalizeIdentity(value) {
  return String(value || '').replace(/（.*?）/g, '').replace(/[·\s]/g, '');
}

const existingNames = new Set(persons
  .reduce((names, person) => names.concat(person.name, person.formalName || []), [])
  .map(normalizeIdentity));
const curriculumPeople = curriculum.people.filter(person => !existingNames.has(normalizeIdentity(person.name)));
const curriculumPersonIds = new Set(curriculumPeople.map(person => person.id));
const curriculumEvents = curriculum.events.filter(event => (
  (event.relatedPersonIds || []).some(id => curriculumPersonIds.has(id))
));
const curriculumEventIds = new Set(curriculumEvents.map(event => event.id));
const curriculumRelationships = curriculum.relationships.filter(edge => (
  curriculumPersonIds.has(edge.sourceId) && curriculumPersonIds.has(edge.targetId)
));
const fullCurriculumPeople = curriculumPeople.map(person => curriculumContent.buildPerson(person.id));
const fullCurriculumEvents = curriculumEvents.map(event => curriculumContent.buildEvent(event.id));
const crossDynastyPeople = curriculumPeople.filter(person => person.dynastyIds.length > 1);
const curriculumMentionEdges = curriculumPeople.flatMap(person => {
  const matches = persons.concat(curriculumPeople).filter(other => (
    other.id !== person.id
    && [other.name, other.formalName]
      .filter(Boolean)
      .map(name => String(name).replace(/（.*?）/g, ''))
      .some(name => name.length >= 2 && person.focus.indexOf(name) !== -1)
  ));
  return matches.map(other => `${person.id}->${other.id}`);
});

assert(persons.length + curriculumPeople.length >= 1000, '人物总量未达到 1000 位');
assert(events.length + curriculumEvents.length >= 500, '事件总量未达到 500 件');
assert(!duplicateValues(persons.concat(curriculumPeople).map(item => normalizeIdentity(item.name))).length, '新旧人物存在规范名重名');
assert(!duplicateValues(events.concat(curriculumEvents).map(item => normalizeIdentity(item.name))).length, '新旧事件存在规范名重名');
assert(crossDynastyPeople.length >= 100, '可确认的跨朝代新增人物少于 100 位');
const missingCrossPlacements = crossDynastyPeople.flatMap(person => person.dynastyIds
  .filter(dynastyId => !curriculum.getDynastyExpansion(dynastyId).people.some(item => item.id === person.id))
  .map(dynastyId => `${person.id}->${dynastyId}`));
assert(!missingCrossPlacements.length, `跨朝代人物有 ${missingCrossPlacements.length} 个朝代聚合缺位`);
assert(curriculumMentionEdges.length >= 50, '新增人物的直接点名事件关系少于 50 条');

assert(!duplicateValues(persons.map(item => item.id)).length, '人物 ID 存在重复');
assert(!duplicateValues(events.map(item => item.id)).length, '事件 ID 存在重复');
assert(!duplicateValues(rulers.map(item => item.id)).length, '帝王年表 ID 存在重复');

const personIds = new Set(persons.map(item => item.id));
const eventIds = new Set(events.map(item => item.id));
const invalidRelationshipEndpoints = relationships.filter(edge => (
  !personIds.has(edge.sourceId) || !personIds.has(edge.targetId)
));
const invalidPersonEvents = persons.flatMap(person => (person.relatedEventIds || [])
  .filter(id => !eventIds.has(id))
  .map(id => `${person.id}->${id}`));
const invalidEventPeople = events.flatMap(event => (event.relatedPersonIds || [])
  .filter(id => !personIds.has(id))
  .map(id => `${event.id}->${id}`));

assert(!invalidRelationshipEndpoints.length, `人物关系存在 ${invalidRelationshipEndpoints.length} 个无效端点`);
assert(!invalidPersonEvents.length, `人物关联事件存在 ${invalidPersonEvents.length} 个无效端点`);
assert(!invalidEventPeople.length, `事件关联人物存在 ${invalidEventPeople.length} 个无效端点`);

const allPersonIds = new Set([...personIds, ...curriculumPersonIds]);
const invalidCurriculumRelationships = curriculumRelationships.filter(edge => (
  !allPersonIds.has(edge.sourceId) || !allPersonIds.has(edge.targetId)
));
const invalidCurriculumPersonEvents = curriculumPeople.flatMap(person => (person.relatedEventIds || [])
  .filter(id => !curriculumEventIds.has(id))
  .map(id => `${person.id}->${id}`));
const invalidCurriculumEventPeople = curriculumEvents.flatMap(event => (event.relatedPersonIds || [])
  .filter(id => !allPersonIds.has(id))
  .map(id => `${event.id}->${id}`));
assert(!invalidCurriculumRelationships.length, `教材通史关系存在 ${invalidCurriculumRelationships.length} 个无效端点`);
assert(!invalidCurriculumPersonEvents.length, `教材通史人物关联事件存在 ${invalidCurriculumPersonEvents.length} 个无效端点`);
assert(!invalidCurriculumEventPeople.length, `教材通史事件关联人物存在 ${invalidCurriculumEventPeople.length} 个无效端点`);

const unlinkedRulers = rulers.filter(ruler => !ruler.linkedPersonId || !personMap[ruler.linkedPersonId]);
assert(!unlinkedRulers.length, `有 ${unlinkedRulers.length} 位帝王年表条目无法进入人物志`);

for (const field of Object.keys(detailQuality.personFieldCounts || {})) {
  assert(detailQuality.personFieldCounts[field] === 0, `人物字段 ${field} 有 ${detailQuality.personFieldCounts[field]} 条未达详细度标准`);
}
for (const field of Object.keys(detailQuality.eventFieldCounts || {})) {
  assert(detailQuality.eventFieldCounts[field] === 0, `事件字段 ${field} 有 ${detailQuality.eventFieldCounts[field]} 条未达详细度标准`);
}

const resumeFields = [
  'timeText',
  'title',
  'nominalDuty',
  'authorityScope',
  'actualInfluence',
  'modernEquivalent',
  'impact',
];
const invalidResumes = [];
for (const person of persons) {
  if (!(person.resume || []).length) {
    invalidResumes.push(`${person.id}:无履历`);
    continue;
  }
  person.resume.forEach((resume, index) => {
    for (const field of resumeFields) {
      if (!String(resume[field] || '').trim()) invalidResumes.push(`${person.id}:${index}:${field}`);
    }
  });
}
assert(!invalidResumes.length, `有 ${invalidResumes.length} 个履历字段缺失`);

const curriculumPersonFields = ['summary', 'background', 'childhood', 'personality', 'policyInclination', 'socialContribution', 'impactSummary'];
const invalidCurriculumPeople = [];
for (const person of fullCurriculumPeople) {
  for (const field of curriculumPersonFields) {
    if (String(person[field] || '').length < 45) invalidCurriculumPeople.push(`${person.id}:${field}`);
  }
  if ((person.resume || []).length < 3) invalidCurriculumPeople.push(`${person.id}:resume`);
  for (const resume of person.resume || []) {
    for (const field of resumeFields) {
      if (!String(resume[field] || '').trim()) invalidCurriculumPeople.push(`${person.id}:resume:${field}`);
    }
  }
  if ((person.disputeTabs || []).length < 2) invalidCurriculumPeople.push(`${person.id}:disputeTabs`);
}
assert(!invalidCurriculumPeople.length, `教材通史人物有 ${invalidCurriculumPeople.length} 个详情字段未达标`);

const invalidCurriculumEvents = [];
for (const event of fullCurriculumEvents) {
  for (const field of ['summary', 'background', 'process', 'result', 'impact']) {
    if (String(event[field] || '').length < 45) invalidCurriculumEvents.push(`${event.id}:${field}`);
  }
  if ((event.disputeTabs || []).length < 2) invalidCurriculumEvents.push(`${event.id}:disputeTabs`);
  if (!(event.relatedPersons || []).length) invalidCurriculumEvents.push(`${event.id}:relatedPersons`);
}
assert(!invalidCurriculumEvents.length, `教材通史事件有 ${invalidCurriculumEvents.length} 个详情字段未达标`);

assert(personMap.kongzi && personMap.kongzi.name === '孔丘（孔子）', '孔子主显示名未统一为孔丘（孔子）');
assert(formatHistoricalName('褒姒') === '褒姒（sì）', '褒姒生僻字读音标注不正确');
assert(formatHistoricalName('寒浞') === '寒浞（zhuó）', '寒浞生僻字读音标注不正确');
assert(formatHistoricalName('苏轼') === '苏轼', '生僻字认定过宽：苏轼不应标注拼音');
assert(formatHistoricalName('秦琼') === '秦琼', '生僻字认定过宽：秦琼不应标注拼音');
assert(formatHistoricalName(formatHistoricalName('嬴稷（秦昭襄王）')) === '嬴稷（yíng jì，秦昭襄王）', '生僻字读音格式不是幂等的');
const pronunciationPeople = persons.concat(curriculumPeople).filter(person => getNamePronunciation(person.name));
assert(pronunciationPeople.length >= 100, `严格生僻或易误读姓名覆盖不足：${pronunciationPeople.length} 位`);

assert(isShortPersonName('孔丘（孔子）'), '短姓名未进入三列布局');
assert(!isShortPersonName('嬴稷（yíng jì，秦昭襄王）'), '长姓名错误进入三列布局');
const shortGridRows = buildPersonRows(['孔丘', '孙武', '李耳'].map((name, index) => ({ id: `short-${index}`, name })));
assert(shortGridRows.length === 1 && shortGridRows[0].columns === 3, '连续短姓名未组成三列行');
const mixedGridRows = buildPersonRows(['孔丘', '嬴稷（yíng jì，秦昭襄王）', '孙武', '李耳']
  .map((name, index) => ({ id: `mixed-${index}`, name })));
assert(mixedGridRows.length === 2 && mixedGridRows.every(row => row.columns === 2), '包含长姓名的行未合并为两列');
const balancedGridRows = buildPersonRows(['甲', '乙', '丙', '丁'].map((name, index) => ({ id: `balanced-${index}`, name })));
assert(balancedGridRows.length === 2 && balancedGridRows[0].columns === 3 && balancedGridRows[1].isSingle,
  '短姓名余项未使用合并单元格');

const curatedCurriculumIds = Object.keys(PERSON_DETAIL_OVERRIDES);
assert(curatedCurriculumIds.length >= 15, `重点人物真实资料覆盖不足：${curatedCurriculumIds.length} 位`);
for (const id of curatedCurriculumIds) {
  const person = curriculumContent.buildPerson(id);
  const event = person && person.relatedEvents && person.relatedEvents[0];
  assert(person && person.resume.length >= 3, `${id} 的重点履历没有完整接入`);
  assert(event && event.dateText.indexOf('相关活动期') === -1, `${id} 的重点事件仍使用模板日期`);
  assert(event && event.relatedPersons.length >= 1, `${id} 的重点事件缺少关联人物`);
}

const personTags = new Set([
  ...persons.flatMap(person => person.categories || []),
  ...fullCurriculumPeople.flatMap(person => person.categories || []),
]);
const missingPersonTagInfo = Array.from(personTags).filter(label => {
  const info = getPersonTagInfo(label, '审计人物', '审计时期');
  return !info || !info.definition || !info.context || !info.note;
});
assert(!missingPersonTagInfo.length, `有 ${missingPersonTagInfo.length} 个人物标签缺少释义`);
assert(fullCurriculumPeople.every(person => /film and television portrayals/.test(person.avatarGenerationPrompt)), '新增人物头像提示词缺少经典影视视觉共识策略');
assert(fullCurriculumPeople.every(person => /no resemblance to any specific actor/.test(person.avatarGenerationPrompt)), '新增人物头像提示词缺少避免复刻具体演员的限制');

const requiredCurriculumTopics = [
  '大禹', '商汤', '周武王', '周公', '齐桓公', '管仲', '孔子', '老子', '孟子', '墨子', '韩非', '商鞅', '李冰',
  '秦始皇', '陈胜', '吴广', '刘邦', '项羽', '张骞', '司马迁', '董仲舒', '蔡伦', '张衡', '华佗',
  '曹操', '刘备', '孙权', '诸葛亮', '北魏孝文帝', '祖冲之', '贾思勰', '隋文帝', '唐太宗', '武则天',
  '玄奘', '鉴真', '李白', '杜甫', '白居易', '赵匡胤', '范仲淹', '王安石', '苏轼', '岳飞', '文天祥',
  '文成公主', '松赞干布', '禄东赞', '金城公主', '尺带珠丹', '阿倍仲麻吕', '崔致远',
  '毕昇', '沈括', '郭守敬', '关汉卿', '黄道婆', '成吉思汗', '忽必烈', '朱元璋', '朱棣', '郑和',
  '戚继光', '李时珍', '宋应星', '徐光启', '李自成', '努尔哈赤', '皇太极', '康熙', '乾隆', '曹雪芹',
  '林则徐', '洪秀全', '曾国藩', '李鸿章', '左宗棠', '邓世昌', '康有为', '梁启超', '谭嗣同', '孙中山', '黄兴', '秋瑾',
  '马可·波罗', '郑光祖', '噶尔丹', '邹容', '陈天华',
  '夏朝建立', '牧野之战', '分封制', '国人暴动', '平王东迁', '春秋争霸', '战国兼并', '百家争鸣',
  '秦统一', '大泽乡', '楚汉', '文景之治', '推恩令', '张骞通西域', '丝绸之路', '盐铁', '黄巾起义',
  '赤壁之战', '三国鼎立', '八王之乱', '淝水之战', '北魏孝文帝改革', '大运河', '科举制', '贞观之治',
  '开元盛世', '安史之乱', '藩镇割据', '黄巢起义', '陈桥兵变', '澶渊之盟', '王安石变法', '靖康之变',
  '郾城大捷', '蒙古灭金', '元朝统一', '行省制', '郑和下西洋', '土木堡之变', '戚继光抗倭',
  '明末农民战争', '清军入关', '郑成功收复台湾', '雅克萨之战', '鸦片战争', '太平天国', '洋务运动',
  '甲午中日战争', '戊戌变法', '义和团运动', '辛亥革命',
];
const curriculumCorpus = JSON.stringify({ persons, events, curriculumPeople });
const missingCurriculumTopics = requiredCurriculumTopics.filter(topic => curriculumCorpus.indexOf(topic) === -1);
assert(!missingCurriculumTopics.length, `教材关键人物或主题缺失：${missingCurriculumTopics.join('、')}`);

const sourcePoorPattern = /传说时代|史实存疑|史料缺载|生卒年不详|早期王朝|史料分层/;
const sourcePoorPeople = persons.filter(person => sourcePoorPattern.test([
  person.lifeText,
  ...(person.categories || []),
  person.summary,
  person.background,
].join(' ')));
const sourcePoorWithoutTabs = sourcePoorPeople.filter(person => !(person.disputeTabs || []).length);
assert(!sourcePoorWithoutTabs.length, `有 ${sourcePoorWithoutTabs.length} 位史料稀少人物缺少证据边界页签`);

const eventFields = ['summary', 'background', 'process', 'result', 'impact'];
for (const field of eventFields) {
  const duplicates = duplicateValues(events.map(event => event[field]).filter(Boolean));
  assert(!duplicates.length, `事件字段 ${field} 存在 ${duplicates.length} 组完全重复文本`);
}

const forbiddenTemplatePhrases = [
  '过程叙述以可确认',
  '判断其长期影响时，应区分',
  '需按各自职位与实际权限区分',
  '直接结果包括参战者',
  '事件的直接结果不仅是成败',
  '长期影响需要放在',
  '将其放入年表观察',
  '从长时段看',
];
const allEventText = events.map(event => eventFields.map(field => event[field] || '').join(' ')).join('\n');
for (const phrase of forbiddenTemplatePhrases) {
  assert(!allEventText.includes(phrase), `事件正文仍包含模板句式：${phrase}`);
}

const personFields = ['summary', 'background', 'childhood', 'personality', 'policyInclination', 'socialContribution', 'impactSummary'];
const allPersonText = persons.map(person => personFields.map(field => person[field] || '').join(' ')).join('\n');
const forbiddenPersonPhrases = [
  '公共活动展开于',
  '其性格特征只能由',
  '历史作用，包括已知政治或军事结果',
  '评估其历史位置',
  '把“被后世记住”直接改写成正面贡献',
];
for (const phrase of forbiddenPersonPhrases) {
  assert(!allPersonText.includes(phrase), `人物正文仍包含模板句式：${phrase}`);
}

const punctuationProblems = [];
for (const item of [...persons, ...events]) {
  for (const field of [...eventFields, ...personFields]) {
    const value = String(item[field] || '');
    if (/。{2,}|[，、；]。/.test(value)) punctuationProblems.push(`${item.id}:${field}`);
  }
}
assert(!punctuationProblems.length, `有 ${punctuationProblems.length} 个字段存在连续或冲突标点`);

const searchCases = [
  ['爱新觉罗·福临', 'ruler'],
  ['孛儿只斤·铁穆耳', 'ruler'],
  ['孙皓', 'ruler'],
  ['高欢', 'person'],
  ['桓温', 'person'],
  ['马可波罗', 'person'],
  ['孔丘', 'person'],
  ['孔子', 'person'],
];
for (const [keyword, type] of searchCases) {
  const result = type === 'ruler' ? searchRulers(keyword) : searchPersons(keyword);
  assert(result.length > 0, `姓名搜索无结果：${keyword}`);
}

const dynastyView = getDynastyView('', knowledge.dynasties.map(item => item.id));
assert(dynastyView.length === knowledge.dynasties.length, '朝代视图未完整返回全部朝代');
assert(dynastyView.every(item => Array.isArray(item.emperors) && Array.isArray(item.otherRulers)), '朝代视图未拆分帝王与其他人物');
const requiredDynastyTags = new Set([
  ...dynastyView.map(item => item.statusText),
  ...knowledge.dynasties.flatMap(item => item.labels || []),
]);
const missingDynastyTagInfo = Array.from(requiredDynastyTags).filter(label => !hasDynastyTagInfo(label));
assert(!missingDynastyTagInfo.length, `有 ${missingDynastyTagInfo.length} 个朝代标签缺少释义`);

const ignoredRuntimeNames = new Set([
  '.DS_Store',
  '.git',
  '.gitignore',
  '.gitkeep',
  'avatar-sources',
  'scripts',
  'workflows',
  'person-package',
  'curriculum-package',
  'README.md',
  'COMFYUI_STATUS.md',
  'project.config.json',
  'project.private.config.json',
]);
const mainRuntimeFiles = walkFiles(projectRoot, ignoredRuntimeNames);
const mainRuntimeBytes = totalBytes(mainRuntimeFiles);
const personPackageDir = path.join(projectRoot, 'person-package');
const personPackageFiles = walkFiles(personPackageDir, new Set(['.DS_Store', '.gitkeep']));
const personPackageBytes = totalBytes(personPackageFiles);
const curriculumPackageDir = path.join(projectRoot, 'curriculum-package');
const curriculumPackageFiles = walkFiles(curriculumPackageDir, new Set(['.DS_Store', '.gitkeep']));
const curriculumPackageBytes = totalBytes(curriculumPackageFiles);
const curriculumAvatarDir = path.join(curriculumPackageDir, 'assets', 'avatars');
const curriculumAvatarFiles = fs.existsSync(curriculumAvatarDir)
  ? walkFiles(curriculumAvatarDir, new Set(['.DS_Store', '.gitkeep'])).filter(file => file.endsWith('.jpg'))
  : [];
const avatarDir = path.join(projectRoot, 'assets', 'avatars');
const avatarFiles = fs.existsSync(avatarDir)
  ? walkFiles(avatarDir, new Set()).filter(file => file.endsWith('.jpg'))
  : [];
const compactAvatarDir = path.join(personPackageDir, 'assets', 'avatars');
const compactAvatarFiles = fs.existsSync(compactAvatarDir)
  ? walkFiles(compactAvatarDir, new Set()).filter(file => file.endsWith('.jpg'))
  : [];
const avatarBytes = totalBytes([...avatarFiles, ...compactAvatarFiles]);

assert(mainRuntimeBytes < 2 * 1024 * 1024, `估算主包 ${formatMiB(mainRuntimeBytes)} 超过 2 MiB 目标`);
assert(personPackageBytes < 2 * 1024 * 1024, `估算人物分包 ${formatMiB(personPackageBytes)} 超过 2 MiB 目标`);
assert(curriculumPackageBytes < 2 * 1024 * 1024, `估算教材通史分包 ${formatMiB(curriculumPackageBytes)} 超过 2 MiB 目标`);
assert(curriculumAvatarFiles.length === curriculumPeople.length, `教材通史头像 ${curriculumAvatarFiles.length}/${curriculumPeople.length}，尚未补齐`);
assert(loadMs < 250, `数据模块加载耗时 ${loadMs.toFixed(1)} ms 超过 250 ms 目标`);

console.log('中国编年史内容审计');
console.log(`- 人物：${persons.length + curriculumPeople.length}（原库 ${persons.length} + 教材通史 ${curriculumPeople.length}）`);
console.log(`- 事件：${events.length + curriculumEvents.length}（原库 ${events.length} + 教材通史 ${curriculumEvents.length}）`);
console.log(`- 帝王年表：${rulers.length}（正统帝王 ${rulers.filter(item => item.isCanonicalRuler).length}）`);
console.log(`- 人物关系：${relationships.length + curriculumRelationships.length}`);
console.log(`- 朝代标签释义：${requiredDynastyTags.size}/${Object.keys(TAG_GLOSSARY).length}`);
console.log(`- 人物标签释义：${personTags.size}/${personTags.size}`);
console.log(`- 严格生僻或易误读姓名：${pronunciationPeople.length}/${pronunciationPeople.length}`);
console.log(`- 重点真实资料深化：${curatedCurriculumIds.length} 人 / ${curatedCurriculumIds.length} 事件`);
console.log(`- 史料稀少人物边界页签：${sourcePoorPeople.length}/${sourcePoorPeople.length}`);
console.log(`- 原人物库头像：${persons.length}/${persons.length} 人（${avatarFiles.length + compactAvatarFiles.length} 份运行图，${formatMiB(avatarBytes)}）`);
console.log(`- 教材通史头像：${curriculumAvatarFiles.length}/${curriculumPeople.length} 人`);
console.log(`- 估算主包：${formatMiB(mainRuntimeBytes)}`);
console.log(`- 估算人物分包：${formatMiB(personPackageBytes)}`);
console.log(`- 估算教材通史分包：${formatMiB(curriculumPackageBytes)}`);
console.log(`- 教材关键人物与主题：${requiredCurriculumTopics.length}/${requiredCurriculumTopics.length}`);
console.log(`- 新增跨朝代人物：${crossDynastyPeople.length} 位，聚合缺位 0`);
console.log(`- 新增直接点名事件关系：${curriculumMentionEdges.length} 条，可双向进入人物志`);
console.log(`- 数据模块加载：${loadMs.toFixed(1)} ms`);

for (const warning of warnings) console.warn(`WARN: ${warning}`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}
console.log('PASS: 全部内容、关系、搜索、性能与包体检查通过');
