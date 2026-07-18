const PERSON_THRESHOLDS = {
  summary: 80,
  background: 145,
  childhood: 95,
  personality: 105,
  policyInclination: 110,
  socialContribution: 105,
  impactSummary: 115,
};

const EVENT_THRESHOLDS = {
  summary: 65,
  background: 145,
  process: 150,
  result: 125,
  impact: 135,
};

const ERA_CONTEXT = {
  xia: '早期国家形成、部族联盟和世袭王权叙事尚未能由同时代文字材料逐人验证',
  shang: '商王朝以王族祭祀、方国关系和青铜文明为核心，晚商又有甲骨卜辞提供直接材料',
  'western-zhou': '西周依靠分封、宗法和礼乐维系统治，王室与诸侯、卿士之间的权力关系持续变化',
  'eastern-zhou': '周天子权威下降，诸侯争霸、战国兼并和制度变法共同重组政治秩序',
  qin: '秦以统一战争和郡县中央集权结束战国格局，同时承受高强度征发与继承危机',
  'western-han': '西汉由汉初休养生息走向中央集权强化，外戚、诸侯王和官僚政治也不断调整',
  xin: '王莽改制、社会矛盾和全国性战争使两汉之间出现剧烈制度与政权转折',
  'eastern-han': '东汉重建统一后逐渐出现外戚宦官交替、豪强扩张和地方军事化',
  'three-kingdoms': '魏蜀吴在战争、联盟和制度建设中长期并立，司马氏最终取得曹魏实际权力',
  'western-jin': '西晋完成短暂统一后因继承、宗室兵权和地方战争迅速陷入崩解',
  'eastern-jin-sixteen': '东晋门阀政治与北方多政权并立同时发展，南北战争和人口迁徙影响深远',
  'southern-northern': '南北政权频繁更替，军镇、宗室、士族和族群整合共同推动制度转型',
  sui: '隋结束长期分裂并重建统一制度，但大型工程、战争和征役又迅速放大社会压力',
  tang: '唐朝由统一和盛世转入安史之乱、藩镇割据与宦官掌军，政治文化仍保持广泛影响',
  'five-dynasties-ten-kingdoms': '五代军镇政权快速更替，十国则在南方和西南形成不同地方治理路径',
  'song-liao-jin-xixia': '宋、辽、西夏、金并立，战争、和议、文官政治与区域制度相互影响',
  yuan: '元朝在蒙古帝国背景下实行行省等制度，多族群治理、宗王政治和欧亚交通并存',
  ming: '明朝强化皇权和文官行政，同时面对边疆、海贸、财政与晚期党争危机',
  qing: '清朝巩固多民族统一国家后遭遇人口财政压力、社会战争和近代列强冲击',
};

const SOURCE_POOR_PATTERNS = /传说时代|史实存疑|史料缺载|生卒年不详|早期王朝|史料分层/;

function text(value) {
  return String(value || '').trim();
}

function unique(items) {
  return Array.from(new Set((items || []).filter(Boolean)));
}

function joinNames(items, fallback) {
  const values = unique(items).map(cleanFragment).filter(Boolean).slice(0, 4);
  return values.length ? values.join('、') : fallback;
}

function cleanFragment(value) {
  return text(value)
    .replace(/[。！？；，、,;\s]+$/g, '')
    .replace(/。{2,}/g, '。')
    .replace(/[，、；]。/g, '。');
}

function joinClauses(items, fallback) {
  const values = unique(items).map(cleanFragment).filter(Boolean).slice(0, 4);
  return values.length ? values.join('；') : fallback;
}

function appendToLength(base, additions, minimum) {
  let result = text(base)
    .replace(/。{2,}/g, '。')
    .replace(/[，、；]。/g, '。');
  for (const addition of additions) {
    const value = cleanFragment(addition);
    if (result.length >= minimum || !value || result.indexOf(value) !== -1) continue;
    result += `${result && !/[。！？；]$/.test(result) ? '。' : ''}${value}。`;
  }
  return result;
}

function personDynastyIds(person) {
  return unique(person.dynastyIds || []);
}

function personEraContext(person) {
  const contexts = personDynastyIds(person).map(id => ERA_CONTEXT[id]).filter(Boolean);
  return contexts.length ? contexts.join('；跨时期观察时还要注意') : '其所处时代的政治、社会和文化结构持续变化';
}

function personRole(person) {
  const categories = (person.categories || []).join('、') || '历史人物';
  const resumes = person.resume || [];
  const titles = joinNames(resumes.map(item => item.title), categories);
  const scopes = joinClauses(resumes.map(item => item.authorityScope), '具体活动范围需按史料所见判断');
  return { categories, titles, scopes };
}

function personRoleContext(person, role, eventNames) {
  const labels = `${role.categories} ${role.titles}`;
  if (/帝王|君主|皇帝|天子|王$/.test(labels)) {
    return `${person.name}的名义职权涉及最高人事、军政、财政与礼制决策；其实际统治能力还取决于宗室、官僚、地方和军队是否服从。${eventNames}用于检验其决策执行、权力边界与制度后果`;
  }
  if (/将领|军事|统帅|武将/.test(labels)) {
    return `${person.name}的职能重心是军队指挥、战场协同、补给和战略执行。评价其在${eventNames}中的表现，应分开个人决策、上级授权、兵力资源与对手反应`;
  }
  if (/科学|医学|技术|天文|数学|水利|工程|农学/.test(labels)) {
    return `${person.name}的影响主要通过观测、计算、著述、工程实践、医疗经验或技术传播形成。${eventNames}可用来检查这些成果的实际用途、应用条件和后世修正`;
  }
  if (/思想|文学|诗人|教育|史学|艺术|书法/.test(labels)) {
    return `${person.name}的影响不主要来自行政命令，而是通过著述、创作、讲学、授徒和思想传播形成。${eventNames}可用来观察这些成果在当时的产生条件、受众与后世接受`;
  }
  if (/政治|官|宰相|改革|文官|外交|幕僚/.test(labels)) {
    return `${person.name}主要通过议政、行政、人事、财政、外交或制度执行产生影响。其在${eventNames}中能做什么，由正式官职的管辖范围、君主信任和官僚合作程度共同决定`;
  }
  return `${person.name}的历史作用需从其实际身份、可确认权限和${eventNames}中的具体行动来判断，不把后世称号直接等同于当时的实权`;
}

function relationshipContext(person, relationships, personMap) {
  const edges = relationships.filter(edge => edge.sourceId === person.id || edge.targetId === person.id);
  return edges.slice(0, 4).map(edge => {
    const otherId = edge.sourceId === person.id ? edge.targetId : edge.sourceId;
    const other = personMap[otherId];
    return other ? `${cleanFragment(edge.type)}：与${other.name}的关联是${cleanFragment(edge.summary)}` : '';
  }).filter(Boolean);
}

function eventRelevanceScore(person, event) {
  const labels = (person.categories || []).join(' ');
  const type = eventType(event);
  let score = 0;
  if (eventMentionsPerson(person, event)) score += 5;
  if (eventOverlapsLife(person, event)) score += 2;
  if (/将领|军事|武将|统帅/.test(labels) && type === 'conflict') score += 4;
  if (/帝王|君主|政治|官|宰辅|改革|权臣/.test(labels) && /reform|political|conflict/.test(type)) score += 3;
  if (/思想|文学|诗人|教育|史学|书法|科学|技术|医学|工程/.test(labels) && type === 'culture') score += 4;
  return score;
}

function relatedEventContext(person, eventMap) {
  return (person.relatedEventIds || [])
    .map((id, index) => ({ event: eventMap[id], index }))
    .filter(item => item.event)
    .sort((a, b) => eventRelevanceScore(person, b.event) - eventRelevanceScore(person, a.event) || a.index - b.index)
    .slice(0, 4)
    .map(item => item.event);
}

function historicalYears(value) {
  const source = text(value);
  if (!source || /世纪/.test(source)) return [];
  const values = [];
  const pattern = /(前)?(\d{1,4})/g;
  let match = pattern.exec(source);
  while (match) {
    values.push(match[1] ? -Number(match[2]) : Number(match[2]));
    match = pattern.exec(source);
  }
  return values;
}

function eventOverlapsLife(person, event) {
  const years = historicalYears(event.dateText || event.periodLabel);
  if (!years.length) return true;
  const start = Math.min(...years);
  const end = Math.max(...years);
  if (Number.isFinite(person.birthYear) && end < person.birthYear - 2) return false;
  if (Number.isFinite(person.deathYear) && start > person.deathYear) return false;
  return true;
}

function eventMentionsPerson(person, event) {
  const titleMatch = text(person.name).match(/（([^）]+)）/);
  const names = unique([
    person.name,
    person.formalName,
    text(person.name).replace(/（.*）/g, ''),
    titleMatch && titleMatch[1],
  ]).filter(name => name.length >= 2);
  const evidence = [event.summary, event.background, event.process, event.result, event.impact].join(' ');
  return names.some(name => evidence.includes(name));
}

function eventPersonEvidence(person, event) {
  const titleMatch = text(person.name).match(/（([^）]+)）/);
  const names = unique([
    person.name,
    person.formalName,
    text(person.name).replace(/（.*）/g, ''),
    titleMatch && titleMatch[1],
  ]).filter(name => name.length >= 2);
  const fields = [event.summary, event.process, event.background, event.result, event.impact];
  return fields.find(value => names.some(name => text(value).includes(name))) || event.summary;
}

function sameTimeRange(left, right) {
  if (cleanFragment(left) === cleanFragment(right)) return true;
  const a = historicalYears(left);
  const b = historicalYears(right);
  if (!a.length || !b.length) return false;
  return Math.min(...a) === Math.min(...b) && Math.max(...a) === Math.max(...b);
}

function resumeStageTitle(person, base) {
  const labels = `${(person.categories || []).join(' ')} ${base.title || ''}`;
  if (/将领|军事|武将|统帅/.test(labels)) return `${base.title} / 战役指挥阶段`;
  if (/帝王|君主|皇帝|王$/.test(labels)) return `${base.title} / 重大决策阶段`;
  if (/改革|政治|官|宰辅|外交|权臣/.test(labels)) return `${base.title} / 政策与执行阶段`;
  if (/科学|技术|医学|工程|文学|思想|学术|史学|诗人/.test(labels)) return `${base.title} / 作品与传播阶段`;
  return `${base.title} / 关键活动阶段`;
}

function expandEvidenceBasedResume(person, eventMap) {
  const resumes = person.resume || [];
  if (resumes.length !== 1 || isSourcePoor(person)) return;
  const base = resumes[0];
  const existing = [base.timeText, base.periodLabel, base.title].join(' ');
  const events = relatedEventContext(person, eventMap).filter(event => (
    !existing.includes(event.name)
    && !sameTimeRange(base.timeText, event.dateText)
    && eventOverlapsLife(person, event)
    && eventMentionsPerson(person, event)
  )).sort((a, b) => {
    const left = historicalYears(a.dateText || a.periodLabel);
    const right = historicalYears(b.dateText || b.periodLabel);
    return (left.length ? Math.min(...left) : 999999) - (right.length ? Math.min(...right) : 999999);
  });
  for (const event of events.slice(0, 2)) {
    const duty = cleanFragment(base.nominalDuty) || '按已知身份承担相关职责';
    const scope = cleanFragment(base.authorityScope) || '实际权限以已知职位和组织资源为限';
    resumes.push({
      timeText: event.dateText || event.periodLabel || base.timeText,
      periodLabel: event.name,
      title: resumeStageTitle(person, base),
      nominalDuty: `在已有身份与授权范围内参与${event.name}，承担与“${duty}”相关的具体任务。`,
      authorityScope: `${scope}。参与该事件不意味着当事人自动拥有其他参与者的职权。`,
      actualInfluence: eventPersonEvidence(person, event),
      modernEquivalent: base.modernEquivalent,
      impact: event.result || event.impact || event.summary,
      evidenceEventId: event.id,
    });
  }
}

function isSourcePoor(person) {
  return SOURCE_POOR_PATTERNS.test([
    person.lifeText,
    ...(person.categories || []),
    ...(person.crossDynastyLabels || []),
    ...(person.sourceLabels || []),
  ].join(' '));
}

function enrichPerson(person, context) {
  const { eventMap, relationships, personMap } = context;
  const events = relatedEventContext(person, eventMap);
  const relations = relationshipContext(person, relationships, personMap);
  const role = personRole(person);
  const era = personEraContext(person);
  const eventNames = joinNames(events.map(item => item.name), '其成年后的主要活动');
  const activePeriods = joinNames(person.activePeriodLabels || person.crossDynastyLabels, '相关历史时期');
  const sourcePoor = isSourcePoor(person);
  const roleContext = personRoleContext(person, role, eventNames);
  const directEvents = events.filter(event => eventOverlapsLife(person, event) && eventMentionsPerson(person, event));
  const directEventNames = joinNames(directEvents.map(item => item.name), '');
  const resumes = person.resume || [];
  const firstResume = resumes[0];
  const lastResume = resumes[resumes.length - 1];
  const firstStage = firstResume
    ? `${firstResume.timeText || firstResume.periodLabel}的“${cleanFragment(firstResume.title)}”`
    : `${activePeriods}的已知身份`;
  const lastStage = lastResume
    ? `${lastResume.timeText || lastResume.periodLabel}的“${cleanFragment(lastResume.title)}”`
    : firstStage;
  const firstScope = firstResume && clipped(firstResume.authorityScope || firstResume.nominalDuty, 90);
  const lastScope = lastResume && clipped(lastResume.authorityScope || lastResume.nominalDuty, 90);
  const directAction = directEvents[0] && clipped(eventPersonEvidence(person, directEvents[0]), 110);
  const directResult = directEvents[0] && clipped(directEvents[0].result || directEvents[0].impact, 110);
  const secondResult = directEvents[1] && clipped(directEvents[1].result || directEvents[1].impact, 90);
  const finalResumeImpact = lastResume && clipped(lastResume.impact || lastResume.actualInfluence, 100);

  person.summary = appendToLength(person.summary, [
    `${person.name}在${activePeriods}年表中归入${role.categories}，首段可核对履历是${firstStage}`,
    directEvents.length ? `事件正文直接点名其参与${directEventNames}；其余事件端点只表示制度背景、继承或后续影响` : events.length ? `${eventNames}提供同时代或后续关联，现有正文没有足够证据把它们全部写成本人亲历` : `人物志目前以任职、作品、言论、世系和已知关系为主要证据入口`,
    firstScope ? `该阶段能够直接支配或承担的范围是${firstScope}` : '',
  ], PERSON_THRESHOLDS.summary);

  person.background = appendToLength(person.background, [
    `${person.name}的履历先列${firstStage}${lastStage !== firstStage ? `，并另列${lastStage}` : ''}`,
    firstScope ? `首段权限记录为${firstScope}` : '',
    lastStage !== firstStage && lastScope ? `末段权限记录为${lastScope}` : '',
    directEvents.length ? `${directEvents[0].name}提供的直接背景是${clipped(directEvents[0].background, 105)}` : `现有事件端点没有形成连续行动链，背景以世系、职位、作品和成年关系为限`,
    `这些履历位于${era}`, 
  ], PERSON_THRESHOLDS.background);

  const childhoodAdditions = sourcePoor ? [
    `${person.name}最早能稳定核对的材料落在${firstStage}，更早的出生、家世、受教和少年生活缺少同时代连续记录`,
    `人物志因此只保留${person.lifeText || '现有年代范围'}、已知世系和成年履历，不用传说、小说或结局反推童年`,
    firstScope ? `成年后首个可说明的活动范围是${firstScope}` : '',
  ] : [
    `${person.name}现存资料进入连续履历时，最早阶段是${firstStage}`,
    firstScope ? `这一阶段的职责或活动范围为${firstScope}，它能说明成年能力来源，但不能代替没有记录的私人童年` : '',
    `早年栏只采用史料明确提到的家庭、教育、迁徙和生活环境；${activePeriods}的一般时代特征不自动写成个人经历`,
  ];
  person.childhood = appendToLength(person.childhood, childhoodAdditions, PERSON_THRESHOLDS.childhood);

  person.personality = appendToLength(person.personality, [
    directAction ? `${directEvents[0].name}留下的公开行动记录是${directAction}` : `${firstStage}是目前判断其公开处事方式的最早履历依据`,
    relations.length ? `${relations[0]}，这条关系可以核对其公开交往、合作、分歧或权力位置` : `现有关系不足以补出私人心理，性格只从任职、作品和公开选择归纳`,
    `庙号、谥号、小说和民间脸谱不作为独立性格证据`,
  ], PERSON_THRESHOLDS.personality);

  person.policyInclination = appendToLength(person.policyInclination, [
    firstScope ? `${firstStage}对应的实际权限是${firstScope}` : `${roleContext}`,
    lastStage !== firstStage && lastScope ? `${lastStage}另列的权限范围是${lastScope}` : '',
    directEvents.length ? `${directEvents[0].name}对其行动方向的记录是${clipped(directEvents[0].summary, 105)}` : events.length ? `${eventNames}只提供时代或后续关联，未留下本人行动时不据此推定完整政策纲领` : `没有连续行政或著述记录时，本栏以履历权限为上限`,
    `政策判断以${role.titles}的正式职责、实际权限和可核对行动为范围`,
  ], PERSON_THRESHOLDS.policyInclination);

  person.socialContribution = appendToLength(person.socialContribution, [
    directResult ? `${directEvents[0].name}给出的直接结果是${directResult}` : finalResumeImpact ? `${lastStage}留下的结果是${finalResumeImpact}` : `目前可确认的作用止于${firstStage}及其职责范围`,
    secondResult ? `${directEvents[1].name}进一步记录${secondResult}` : '',
    finalResumeImpact && directResult ? `其末段履历另记${finalResumeImpact}` : '',
    `人物志把建设成果、知识传播、战争损失和制度教训分别记录，不把知名度直接等同于正面贡献`,
  ], PERSON_THRESHOLDS.socialContribution);

  person.impactSummary = appendToLength(person.impactSummary, [
    finalResumeImpact ? `${lastStage}的履历结论是${finalResumeImpact}` : '',
    directResult ? `${directEvents[0].name}把个人选择落实为${directResult}` : '',
    relations.length ? `${relations.slice(0, 2).join('；')}` : `关系材料尚不足以把其影响扩大到未记录的后世制度或文化`,
    events.length ? `人物卡保留${eventNames}作为核对入口，直接参与与背景、继承关系分开展示` : `没有独立事件端点时，影响范围以世系、职位、作品和现有履历为限`,
  ], PERSON_THRESHOLDS.impactSummary);

  if (!(person.disputeTabs || []).length && sourcePoor) {
    person.disputeTabs = [
      { title: '可确认内容', body: `${person.name}目前可确认的信息以${person.lifeText || '年代范围'}、王位或身份次序、成年活动及相关事件为主。` },
      { title: '史料边界', body: '缺少同时代连续记录的部分不补造细节；传世文献、考古背景和后世故事需要分层阅读。' },
    ];
  }
}

function eventDynastyContext(event) {
  const contexts = unique((event.dynastyIds || []).map(id => ERA_CONTEXT[id]).filter(Boolean));
  return contexts.length ? contexts.join('；同时') : '相关时代的政治、社会与文化结构正在变化';
}

function eventPeople(event, personMap) {
  return (event.relatedPersonIds || []).map(id => personMap[id]).filter(Boolean).slice(0, 6);
}

function eventType(event) {
  const value = `${event.name} ${(event.tags || []).join(' ')}`;
  if (/传说|史实存疑/.test(value)) return 'legend';
  if (/改革|变法|新政|制度|法制|开关|科举|行政/.test(value)) return 'reform';
  if (/战争|之战|起义|叛乱|北伐|灭|兵变|政变|战役|抗|军事/.test(value)) return 'conflict';
  if (/文化|思想|文学|史学|科技|科学|医学|书法|戏曲|理学|心学|交流|航海/.test(value)) return 'culture';
  return 'political';
}

function eventTypeContext(type) {
  const map = {
    legend: '相关叙述承担解释早期秩序和王朝合法性的功能，文献层累与考古背景必须分开标注',
    reform: '制度设计、执行主体、受益与受损群体以及后续反复共同决定改革效果',
    conflict: '兵力只是结果的一部分，动员、补给、将领关系、地理条件和政治目标同样重要',
    culture: '知识或文化成果依赖作者、传播媒介、教育网络和后世接受，不宜只归功于单一人物',
    political: '皇权、官僚、地方力量、财政资源和社会压力共同塑造决策结果',
  };
  return map[type];
}

function clipped(value, maximum) {
  const source = cleanFragment(value);
  if (source.length <= maximum) return source;
  return `${source.slice(0, maximum).replace(/[，、；：]$/g, '')}…`;
}

function eventResume(person, event) {
  const resumes = person.resume || [];
  const explicit = resumes.find(item => item.evidenceEventId === event.id);
  if (explicit) return explicit;
  const eventYears = historicalYears(event.dateText || event.periodLabel);
  if (!eventYears.length) return resumes[0];
  const eventStart = Math.min(...eventYears);
  const eventEnd = Math.max(...eventYears);
  return resumes.find(item => {
    const years = historicalYears(item.timeText || item.periodLabel);
    if (!years.length) return false;
    return Math.min(...years) <= eventEnd && Math.max(...years) >= eventStart;
  }) || resumes[0];
}

function personEventEvidence(person, event) {
  const resume = eventResume(person, event);
  if (!resume) return `${person.name}的人物志记录其身份为${joinNames(person.categories, '历史人物')}`;
  const title = cleanFragment(resume.title) || joinNames(person.categories, '历史人物');
  const scope = clipped(resume.authorityScope || resume.nominalDuty, 68);
  return `${person.name}在相关阶段的履历身份为“${title}”，已知权限范围是${scope}`;
}

function chronologicalNeighbors(event, events) {
  const dynastyIds = event.dynastyIds || [];
  const years = historicalYears(event.dateText || event.periodLabel);
  if (!dynastyIds.length || !years.length) return {};
  const start = Math.min(...years);
  const candidates = events.map((item, index) => {
    const itemYears = historicalYears(item.dateText || item.periodLabel);
    return {
      item,
      index,
      start: itemYears.length ? Math.min(...itemYears) : null,
    };
  }).filter(candidate => (
    candidate.start !== null
    && candidate.item.id !== event.id
    && (candidate.item.dynastyIds || []).some(id => dynastyIds.indexOf(id) !== -1)
  ));
  const previous = candidates.filter(candidate => candidate.start <= start)
    .sort((a, b) => b.start - a.start || b.index - a.index)[0];
  const next = candidates.filter(candidate => candidate.start > start)
    .sort((a, b) => a.start - b.start || a.index - b.index)[0];
  return { previous: previous && previous.item, next: next && next.item };
}

function chronologyEvidence(event, events) {
  const neighbors = chronologicalNeighbors(event, events);
  if (neighbors.previous && neighbors.next) {
    return `按现有编年排序，${event.name}前接${neighbors.previous.name}（${neighbors.previous.dateText}），后续为${neighbors.next.name}（${neighbors.next.dateText}）`;
  }
  if (neighbors.previous) return `按现有编年排序，${event.name}前接${neighbors.previous.name}（${neighbors.previous.dateText}）`;
  if (neighbors.next) return `按现有编年排序，${event.name}后续为${neighbors.next.name}（${neighbors.next.dateText}）`;
  return '';
}

function enrichEvent(event, context) {
  const { personMap, events } = context;
  const people = eventPeople(event, personMap);
  const peopleNames = joinNames(people.map(item => item.name), '相关参与者');
  const peopleRoles = joinNames(people.map(item => `${item.name}（${(item.categories || []).slice(0, 2).join('、') || '历史人物'}）`), peopleNames);
  const directPeople = people.filter(person => eventMentionsPerson(person, event) && eventOverlapsLife(person, event));
  const contextualPeople = people.filter(person => directPeople.indexOf(person) === -1);
  const tags = joinNames(event.tags, '政治与社会变化');
  const era = eventDynastyContext(event);
  const type = eventType(event);
  const typeContext = eventTypeContext(type);
  const dateText = event.dateText || event.periodLabel || '相关历史阶段';
  const chronology = chronologyEvidence(event, events);
  const roleEvidence = directPeople.slice(0, 3).map(person => personEventEvidence(person, event));
  const fallbackRoleEvidence = people.slice(0, 2).map(person => personEventEvidence(person, event));
  const resultEvidence = (directPeople.length ? directPeople : people).slice(0, 2).map(person => {
    const resume = eventResume(person, event);
    const evidence = resume && (resume.actualInfluence || resume.impact);
    return `${person.name}的人物履历提供的结果线索是：${clipped(evidence || person.summary, 78)}`;
  });

  event.summary = appendToLength(event.summary, [
    `${event.name}发生于${dateText}，现有人物志可直接关联到${peopleNames}`,
    `条目以${tags}为检索标签，便于从朝代年表、人物志和关系图谱交叉进入`,
  ], EVENT_THRESHOLDS.summary);

  event.background = appendToLength(event.background, [
    `${dateText}的时间坐标属于${era}`, 
    `人物端点包括${peopleRoles}；${typeContext}`,
    chronology,
  ], EVENT_THRESHOLDS.background);

  event.process = appendToLength(event.process, [
    ...roleEvidence,
    !roleEvidence.length ? `现有过程材料未直接点名全部关联人物；可核对的履历信息为${fallbackRoleEvidence.join('；')}` : '',
    contextualPeople.length ? `${joinNames(contextualPeople.map(person => person.name), '其他人物')}提供统治背景、组织关系或后续影响；是否亲历以事件原文和生卒时间为准` : '',
    `${event.name}的过程时间标记为${dateText}，对应检索标签为${tags}`,
    `人物志端点为${peopleRoles}，可从卡片继续核对各自任职阶段与行动范围`,
    type === 'legend' ? `该条目的绝对年代、个人动机和行动细节缺少同时代连续文字记录，过程保留“传说时代”或“史实存疑”边界` : '',
  ], EVENT_THRESHOLDS.process);

  event.result = appendToLength(event.result, [
    ...resultEvidence,
    chronology ? `${chronology}，可以继续沿年表核对结果是否在下一事件中延续或反转` : '',
    `结果字段只承载${event.name}能够确认的直接结局；${tags}的后续变化分别保留在相邻事件和人物影响字段中`,
  ], EVENT_THRESHOLDS.result);

  event.impact = appendToLength(event.impact, [
    chronology,
    `${event.name}的影响入口由${tags}和${peopleNames}共同构成，人物履历提供权限边界，年表提供前后变化`,
    type === 'legend' ? `其价值首先是早期秩序与历史记忆，不把传世叙事、考古文化和可核验个人传记混为同一证据` : `${typeContext}；条目不把后世文学形象直接替代当时制度、资源与行动记录`,
  ], EVENT_THRESHOLDS.impact);

  if (!(event.disputeTabs || []).length) {
    if (type === 'legend') {
      event.disputeTabs = [
        { title: '传统叙事', body: `${event.name}在传世文献中具有解释早期秩序和历史记忆的作用。` },
        { title: '证据范围', body: '人物、绝对年代和具体过程若缺少同时代材料，必须保留传说时代或史实存疑标注。' },
      ];
    } else if (type === 'reform' || type === 'conflict') {
      event.disputeTabs = [
        { title: '通识结论', body: `${event.summary}` },
        { title: '多因素解释', body: `${typeContext}，评价时需区分决策目标、执行条件、社会成本和长期结果。` },
      ];
    }
  }
}

function applyDetailEnrichment({ persons, events, relationships }) {
  const personMap = persons.reduce((map, person) => {
    map[person.id] = person;
    return map;
  }, {});
  const eventMap = events.reduce((map, event) => {
    map[event.id] = event;
    return map;
  }, {});
  const context = { personMap, eventMap, relationships, events };
  persons.forEach(person => expandEvidenceBasedResume(person, eventMap));
  persons.forEach(person => enrichPerson(person, context));
  events.forEach(event => enrichEvent(event, context));
}

function auditDetailQuality({ persons, events }) {
  const personFieldCounts = {};
  Object.keys(PERSON_THRESHOLDS).forEach(field => {
    personFieldCounts[field] = persons.filter(person => text(person[field]).length < PERSON_THRESHOLDS[field]).length;
  });
  const eventFieldCounts = {};
  Object.keys(EVENT_THRESHOLDS).forEach(field => {
    eventFieldCounts[field] = events.filter(event => text(event[field]).length < EVENT_THRESHOLDS[field]).length;
  });
  return { personFieldCounts, eventFieldCounts };
}

module.exports = {
  PERSON_THRESHOLDS,
  EVENT_THRESHOLDS,
  applyDetailEnrichment,
  auditDetailQuality,
};
