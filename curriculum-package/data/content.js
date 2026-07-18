const curriculum = require('../../data/curriculumIndex');
const knowledge = require('../../data/historyKnowledge');
const { formatHistoricalName } = require('../../data/namePronunciations');
const { PERSON_DETAIL_OVERRIDES } = require('./curatedDetails');

const ROLE_PROFILES = {
  ruler: {
    match: /君主|国君|首领|宗室|诸侯王|王室/,
    label: '统治与决策人物',
    duty: '主持所辖政权或政治集团的重大决策，协调军政、财政、用人与对外关系。',
    scope: '权力范围随时代制度而异，通常覆盖核心辖区的行政、军事、司法、礼仪与人事任免。',
    equivalent: '不宜与现代单一职位等同；可理解为国家元首、政府首脑与最高军事决策者职能的历史组合。',
    traits: '其行动呈现出权力整合、联盟经营和危机决断等特征，评价应结合制度约束与实际控制范围。',
    policy: '政策取向主要体现为维持统治秩序、配置官僚与军事资源，并在中央与地方之间调整权力。',
  },
  military: {
    match: /将领|军事|起义|水师|武将|复国|抗英|抗法|抗倭/,
    label: '军事人物',
    duty: '承担军队组织、训练、部署与战场指挥，并就军情、后勤和战略向决策层负责。',
    scope: '管辖权限通常限于受命军队、战区和阶段性军事任务；实际影响取决于兵权、军功及与中枢关系。',
    equivalent: '职能近似战区主官、方面军指挥员或高级军事参谋，但古代将领往往兼有地方行政和政治责任。',
    traits: '史料所见的性格线索多集中于用兵判断、纪律观念、风险承受及与君主同僚的互动。',
    policy: '倾向从军事实效、边防安全和后勤承受能力出发处理问题，具体主张仍受政权目标制约。',
  },
  scholar: {
    match: /思想|学者|文学|史学|经学|文字|语言|诗人|词人|小说|戏曲|书画|画家|教育|政论/,
    label: '思想文化人物',
    duty: '通过著述、讲学、编纂、创作或制度议论参与知识生产与公共表达。',
    scope: '一般没有固定行政管辖权；其影响范围来自作品传播、学术共同体、教育活动及与政治权力的关系。',
    equivalent: '职能近似研究者、作家、教育者或公共知识分子；如兼任官职，则行政权限应按具体官职另论。',
    traits: '其思想与创作体现出问题意识、表达策略和时代关怀，不能仅凭后世标签概括个人性格。',
    policy: '关注秩序、伦理、知识方法或社会现实，并通过论说与作品影响士人群体和公共观念。',
  },
  science: {
    match: /科学|科技|医学|天文|数学|水利|工程|农学|地理|历法|翻译|发明|工艺/,
    label: '科技与实务人物',
    duty: '从事观察、计算、试验、工程组织、技术整理或知识翻译，把经验转化为可复用的方法。',
    scope: '权限多来自具体工程、机构或奉命任务，管辖对象包括人员、物料、测量标准和实施流程。',
    equivalent: '职能近似工程负责人、科研人员、技术官员或专业翻译，但传统制度常把研究、行政与制作合并。',
    traits: '可从其解决实际问题的方式观察到重证据、重计算、重经验或善于综合既有知识等特点。',
    policy: '重视技术可行性、资源配置和成果应用，社会主张常与农业、水利、历法、医疗或制造需求相连。',
  },
  diplomacy: {
    match: /外交|使者|和亲|交涉|传播|报刊|传教|商人|航海/,
    label: '交流与外交人物',
    duty: '承担信息沟通、谈判、出使、贸易联络或跨文化知识传播。',
    scope: '权限取决于授权文书、使团任务和所掌握的信息渠道，通常不能等同于常设行政机关负责人。',
    equivalent: '职能近似外交使节、谈判代表、媒体人或跨文化传播者，具体权限以当次任务为限。',
    traits: '其行动常体现环境适应、信息判断、语言表达与多方协调能力，也可能受到授权不足的限制。',
    policy: '倾向通过谈判、信息与制度学习处理外部关系，关注安全、贸易、文化交流和国家利益。',
  },
  official: {
    match: /.*/,
    label: '政治与社会人物',
    duty: '围绕所任职务或公共角色参与决策执行、地方治理、制度建设和社会动员。',
    scope: '管辖权限须结合具体官职、差遣和时代制度判断；同一职名在不同时期的实际权力可能差异很大。',
    equivalent: '没有稳定的一一对应现代职位，应以其掌管事务、可调动资源和向谁负责来理解。',
    traits: '其性格特征主要从奏议、行动选择、同僚评价和事件后果中归纳，私生活材料不足时不作推断。',
    policy: '政策倾向表现为对秩序、财政、选官、地方治理或社会动员方式的选择，需放回具体局势理解。',
  },
};

function roleProfile(category) {
  return Object.values(ROLE_PROFILES).find(profile => profile.match.test(category)) || ROLE_PROFILES.official;
}

const DYNASTY_ATTIRE = {
  xia: 'legendary Xia-era early Chinese plain coarse hemp wrap robe, simple leather belt, bare compact topknot, NO hat, NO crown, NO metal headwear, NO later dynasty ornament',
  shang: 'Shang dynasty bronze-age plain cross-collar hemp robe, restrained geometric woven trim, compact topknot, NO tall hat, NO later imperial crown',
  'western-zhou': 'Western Zhou ritual robe, restrained jade belt ornaments, period-correct guan and hair',
  'eastern-zhou': 'Spring and Autumn or Warring States cross-collar robe, lacquered leather details, period-correct guan',
  qin: 'Qin dynasty black cross-collar robe or lacquered lamellar armor, compact topknot, strict period accuracy',
  'western-han': 'Western Han shenyi robe or Han lamellar armor, lacquered guan, silk belt, period accuracy',
  xin: 'late Western Han and Xin dynasty shenyi robe, formal guan, restrained court colors',
  'eastern-han': 'Eastern Han layered robe or Han lamellar armor, formal guan, period-correct silhouette',
  'three-kingdoms': 'late Han and Three Kingdoms robe or lamellar armor, cloth guan, practical military details',
  'western-jin': 'Western Jin wide-sleeved robe, scholar guan or period lamellar armor, Wei-Jin silhouette',
  'eastern-jin-sixteen': 'Eastern Jin or Sixteen Kingdoms period dress, wide sleeves, period-specific court or frontier details',
  'southern-northern': 'Northern and Southern Dynasties robe or cavalry armor, culturally mixed but historically grounded details',
  sui: 'Sui dynasty round-collar robe or lamellar armor, early futou, restrained court colors',
  tang: 'Tang dynasty round-collar robe, futou or Tang lamellar armor, confident cosmopolitan styling',
  'five-dynasties-ten-kingdoms': 'Five Dynasties and Ten Kingdoms court robe or military armor, late Tang to early Song silhouette',
  'song-liao-jin-xixia': 'Song, Liao, Jin or Western Xia period-specific robe and headwear matching the person identity, no generic fantasy costume',
  yuan: 'Yuan dynasty period-specific Mongol or Chinese robe and hat matching the person identity, historically grounded textile details',
  ming: 'Ming dynasty court robe, scholar robe with winged futou, or brigandine armor matching the role, period accuracy',
  qing: 'Qing dynasty or late-Qing period-specific robe, official hat, military dress, scholar gown or revolutionary attire matching the person identity',
};

const FEMALE_NAMES = new Set([
  '女艾', '褒姒', '王昭君', '郭圣通', '贾南风', '魏华存', '谢道韫', '独孤伽罗',
  '上官婉儿', '文成公主', '金城公主',
]);

const SCREEN_ARCHETYPES = {
  '傅说': '(middle-aged Chinese man:1.4), (masculine male face:1.4), short moustache and restrained chin beard, weathered Shang counselor of humble origin, thoughtful steady gaze, natural hairline and forehead fully visible, black hair pulled into one small plain bun behind the crown, no cloth around the head, absolutely NO hat, NO crown, NO headband, NO hair ornament, NO long loose hair',
  '周公旦': 'calm elder regent, measured gaze, ritual tablets, restrained ceremonial dignity',
  '褒姒': 'reserved Western Zhou noblewoman, distant solemn gaze, historically grounded court bearing rather than melodrama',
  '苏武': 'weathered frontier envoy, unbroken resolve, simple staff and cold steppe atmosphere',
  '班超': 'seasoned frontier commander and envoy, alert eyes, map scroll and practical travel-worn attire',
  '王昭君': 'dignified Han court woman and frontier envoy, calm expression, restrained pipa motif without theatrical glamour',
  '花木兰': 'disciplined frontier cavalry soldier, practical armor, composed and resolute, no fantasy styling',
  '文成公主': 'young Tang royal envoy, composed diplomatic bearing, elegant but restrained Tang court attire',
  '松赞干布': 'young Tibetan ruler, energetic statesman, historically grounded plateau court dress',
  '玄奘': 'lean learned Buddhist traveler, calm focused eyes, weathered travel robe, wrapped sutra bundle',
  '鉴真': 'elder Buddhist teacher, serene closed or lowered eyes, simple Tang monastic robe',
  '李白': 'free-spirited Tang poet, bright confident gaze, travel-worn scholar robe, wine gourd kept subtle',
  '杜甫': 'careworn middle-aged Tang poet, compassionate serious eyes, plain scholar robe and travel scroll',
  '狄仁杰': 'mature Tang statesman and investigator, steady analytical gaze, formal restrained official robe',
  '包拯': 'stern upright Song official, dark natural complexion, direct gaze, historically grounded Song official cap, no opera makeup',
  '杨业': 'elder Northern Song frontier commander, disciplined and weathered, practical lamellar armor visible at shoulders and upper chest, simple dark iron battle helmet with a small restrained tassel, hair fully tied beneath the helmet, NO loose hair, NO cape, NO ornate headpiece',
  '岳飞': 'resolute Southern Song commander, disciplined posture, practical armor, restrained patriotic iconography',
  '文天祥': 'gaunt but unyielding Southern Song scholar-official, prison-worn dignity, upright gaze',
  '成吉思汗': 'mature steppe ruler and commander, broad weathered face, restrained Mongol deel and fur hat, no fantasy crown',
  '郑和': 'mature Ming admiral and envoy, composed maritime command presence, navigation chart and official robe',
  '戚继光': 'alert Ming coastal commander, practical brigandine armor, disciplined veteran expression',
  '李时珍': 'elder Ming physician and naturalist, observant kind eyes, herb specimen and plain scholar robe',
  '宋应星': 'practical Ming technical scholar, attentive eyes, simple measuring tool and workshop notes without text',
  '林则徐': 'stern late-Qing statesman, clear uncompromising gaze, formal official robe and folded memorial',
  '邓世昌': 'late-Qing naval commander, resolute restrained expression, historically accurate naval uniform',
  '康有为': 'late-Qing reform scholar, intense intellectual gaze, scholar gown and closed reform memorial',
  '梁启超': 'young late-Qing public intellectual, energetic focused expression, period scholar jacket and unmarked newspaper',
  '谭嗣同': 'young reformer, calm fearless gaze, plain late-Qing scholar clothing, restrained sword motif',
  '秋瑾': 'young woman revolutionary, resolute direct gaze, practical late-Qing reformist clothing, restrained short sword',
};

function isFemalePerson(person) {
  return FEMALE_NAMES.has(person.name) || /公主|后妃|女性|女官/.test(person.category);
}

function avatarType(category) {
  if (ROLE_PROFILES.ruler.match.test(category)) return '帝王类';
  if (ROLE_PROFILES.military.match.test(category)) return '武将类';
  if (/政治|官员|辅臣|宰相|财政|法学|外交|使者|幕僚|权臣|文官/.test(category)) return '文官类';
  return '其他类';
}

function screenPortrayalTraits(person, type) {
  if (SCREEN_ARCHETYPES[person.name]) return SCREEN_ARCHETYPES[person.name];
  if (type === '帝王类') return 'recognizable historical ruler archetype, controlled authority, distinctive public iconography kept historically plausible';
  if (type === '武将类') return 'recognizable historical commander archetype, weathered disciplined face, practical campaign experience rather than fantasy hero styling';
  if (type === '文官类') return 'recognizable historical official archetype, intelligent measured gaze, restrained posture and period-correct symbols of office';
  return 'recognizable historical public image shaped by the person profession and best-known life work, original and historically grounded';
}

function avatarPrompt(person, meta) {
  const type = avatarType(person.category);
  const female = isFemalePerson(person);
  const typePrompt = {
    帝王类: 'Chinese ruler portrait, composed authority, formal court dress, dignified posture',
    武将类: 'Chinese military commander portrait, historically grounded campaign armor visible at shoulders and upper chest, disciplined bearing, hair securely tied beneath a simple practical helmet or compact guan, NO loose flowing hair, NO cape, NO exaggerated fantasy weapons, NO ornate headpiece',
    文官类: 'Chinese civil official portrait, formal robe and period-correct headwear, intelligent restrained expression',
    其他类: 'Chinese historical scholar, writer, scientist, artist or social figure portrait, clothing matching the profession',
  }[type];
  let attire = DYNASTY_ATTIRE[person.dynastyId];
  if (person.dynastyId === 'tang' && female) {
    attire = 'authentic Tang dynasty high-waisted ruqun, broad crossed collar, long flowing sleeves, silk shawl, Tang high bun, NO standing collar';
  }
  return [
    'masterpiece, single person, front-facing close-up head-and-shoulders portrait, cropped at upper chest, face centered and occupying about forty percent of the image, looking toward viewer, Chinese historical strategy game character art',
    'realistic painterly illustration, traditional Chinese visual identity, natural skin texture, dramatic but clean studio lighting',
    'visual language informed by widely recognized classic Chinese historical film and television portrayals and public historical iconography',
    'original facial design, no resemblance to any specific actor or celebrity, not a drama screenshot',
    female ? 'adult Chinese woman, historically plausible natural features' : 'adult Chinese man, historically plausible natural features',
    typePrompt,
    screenPortrayalTraits(person, type),
    attire,
    `${person.name}, ${person.category}, historical theme: ${person.focus}`,
    'plain textured background, clear facial features, culturally respectful, historically plausible, NO full body, NO back view, NO distant figure',
  ].join(', ');
}

const AVATAR_NEGATIVE_PROMPT = [
  'low quality, blurry, deformed, bad anatomy, extra fingers, extra limbs, duplicate person, multiple people, cropped head, full body, distant person, back view, rear view, extreme profile view, face hidden, face too small',
  'modern suit, modern uniform, necktie, t-shirt, jeans, baseball cap, eyeglasses, photography, celebrity face, specific actor likeness, copied actor face, film still, television screenshot',
  'European plate armor, Japanese samurai armor, kimono, Korean hanbok, Korean gat, wide-brimmed hat, modern military gear, fantasy crown, fantasy armor, headband, forehead cloth, hair ornament, white ceremonial hat, tall fantasy hat, ornate pointed headdress, oversized ceremonial helmet, loose flowing hair on male official or soldier, fashion cape, Qing-style standing collar on pre-Qing person, qipao on pre-Qing person, Manchu queue hairstyle on pre-Qing person',
  'anime child, chibi, oversexualized, exposed chest, heavy makeup, glowing hair, neon ornament, decorative border, fake Chinese characters, text, logo, watermark, frame',
].join(', ');

function isEvidenceLimited(person) {
  return /传说时代|生卒年不详|史实存疑|约/.test(person.lifeText);
}

function personRoute(id) {
  return id.indexOf('curr-') === 0
    ? `/curriculum-package/pages/person/person?id=${id}`
    : `/person-package/pages/person/person?id=${id}`;
}

function eventRoute(id) {
  return id.indexOf('curr-event-') === 0
    ? `/curriculum-package/pages/event/event?id=${id}`
    : `/pages/event/event?id=${id}`;
}

const allPeople = knowledge.persons.map(person => ({
  id: person.id,
  name: person.name,
  formalName: person.formalName,
  source: 'existing',
})).concat(curriculum.people.map(person => ({
  id: person.id,
  name: person.name,
  formalName: person.formalName,
  source: 'curriculum',
})));

function identityNames(person) {
  return [person.name, person.formalName]
    .filter(Boolean)
    .reduce((names, name) => {
      const titleMatch = name.match(/（([^）]+)）/);
      const titleNames = titleMatch ? titleMatch[1].split(/[，、/]/) : [];
      return names.concat([name, name.replace(/（.*?）/g, '')], titleNames);
    }, [])
    .filter(name => name.length >= 2);
}

function mentionedPeople(text, selfId) {
  const seen = new Set();
  return allPeople
    .filter(person => person.id !== selfId && identityNames(person).some(name => text.indexOf(name) !== -1))
    .filter(person => {
      if (seen.has(person.id)) return false;
      seen.add(person.id);
      return true;
    })
    .slice(0, 12);
}

function processText(person, profile) {
  if (profile === ROLE_PROFILES.military) {
    return `${person.name}的核心活动集中在“${person.focus}”。理解这一过程，需要同时观察兵力来源、指挥链、地理条件与政权目标；战果之外，军队保存、后勤供给和战后政治安排同样决定其影响。`;
  }
  if (profile === ROLE_PROFILES.scholar) {
    return `${person.name}围绕“${person.focus}”形成了可辨识的著述、创作或思想活动。相关成果经由讲学、抄刻、编纂、评论和后世选本传播，其意义既在文本本身，也在它进入教育与公共讨论后的持续解释。`;
  }
  if (profile === ROLE_PROFILES.science) {
    return `${person.name}在“${person.focus}”中处理了具体的知识或技术问题。其过程涉及材料搜集、测量计算、方法比较、工程实施或成果整理，评价时应区分个人贡献、协作者劳动与长期技术积累。`;
  }
  if (profile === ROLE_PROFILES.diplomacy) {
    return `${person.name}通过“${person.focus}”进入跨区域交流网络。行动过程包含授权、路线、信息传递、谈判对象与反馈机制，个人选择与当时政权的安全、贸易和文化需求彼此牵连。`;
  }
  if (profile === ROLE_PROFILES.ruler) {
    return `${person.name}围绕“${person.focus}”调动政治与军事资源。过程中的用人、联盟、制度安排和危机应对体现其决策方式，但实际结果也受到官僚结构、地方力量与既有社会条件限制。`;
  }
  return `${person.name}在“${person.focus}”中承担了可以辨识的政治或社会角色。其行动经由任职、奏议、组织、执行或地方实践展开，实际影响取决于正式权限、资源调动能力及与决策中枢的距离。`;
}

function decorateCompactPerson(person) {
  if (person.id.indexOf('curr-') === 0) {
    return {
      ...person,
      name: formatHistoricalName(person.name),
      formalName: formatHistoricalName(person.formalName),
      categories: [person.category, '教材与通史'],
      categoryText: `${person.category}、教材与通史`,
      crossText: person.crossText,
      activePeriodText: person.activePeriodText,
      avatarInitial: person.name.slice(0, 1),
      hasAvatar: true,
      avatarPath: `/curriculum-package/assets/avatars/${person.id}.jpg`,
      route: personRoute(person.id),
    };
  }
  const decorated = knowledge.decoratePerson(person);
  return { ...decorated, route: personRoute(person.id) };
}

function buildPerson(id) {
  const person = curriculum.personMap[id];
  if (!person) return null;
  const meta = curriculum.GROUP_META[person.dynastyId];
  const profile = roleProfile(person.category);
  const crossDynastyLabels = person.dynastyIds.map(item => curriculum.GROUP_META[item].dynastyName);
  const activePeriodLabels = person.dynastyIds.map(item => curriculum.GROUP_META[item].period);
  const evidenceLimited = isEvidenceLimited(person);
  const event = buildEvent(person.relatedEventIds[0]);
  const sourceBoundary = evidenceLimited
    ? `关于${person.name}的年代、早期经历或具体细节，材料存在缺环、晚出记载或传说化问题；本条只保留可用于通史定位的内容，不把后世故事直接当作同时代事实。`
    : `现存材料能够确认${person.name}的主要公共活动，但私人生活与童年记录仍不完整；本条不依据后世戏剧、小说或单一轶事推断其全部人格。`;
  const generatedPerson = {
    ...person,
    name: formatHistoricalName(person.name),
    formalName: formatHistoricalName(person.formalName),
    categories: [person.category, profile.label, '教材与通史'],
    categoryText: `${person.category}、${profile.label}`,
    crossDynastyLabels,
    activePeriodLabels,
    crossText: crossDynastyLabels.join('、'),
    activePeriodText: activePeriodLabels.join('、'),
    avatarInitial: person.name.slice(0, 1),
    avatarPath: `/curriculum-package/assets/avatars/${person.id}.jpg`,
    hasAvatar: true,
    avatarType: avatarType(person.category),
    avatarGenerationPrompt: avatarPrompt(person, meta),
    avatarNegativePrompt: `${AVATAR_NEGATIVE_PROMPT}, ${isFemalePerson(person) ? 'man, male, beard, moustache' : 'woman, female, girl, feminine face, lipstick'}`,
    summary: `${person.name}是${meta.period}的重要${person.category}。其核心历史线索是${person.focus}；这条线索把个人选择与${meta.theme}联系起来，也说明其何以进入中国通史与中学历史学习的观察范围。`,
    background: `${person.name}活动于${meta.period}。当时的关键背景是${meta.theme}，政治制度、社会资源与区域关系共同限定了个人可以采取的行动。${person.focus}正是在这一背景中发生，不能脱离具体政权结构单独理解。`,
    childhood: `${sourceBoundary}能够稳妥把握的是，${person.name}后来进入${person.category}相关活动领域，其知识、身份或组织资源是在所处时代逐步形成的。`,
    personality: `${profile.traits}${person.name}在“${person.focus}”中的具体取舍，是观察其行动风格的主要依据；功过评价与性格判断应分别处理。`,
    policyInclination: `${profile.policy}${person.name}的实际取向可由“${person.focus}”所涉及的目标、手段和受益群体进一步判断，不宜套用现代党派标签。`,
    socialContribution: `${person.name}最可确认的历史贡献或社会作用，是推动、参与或记录了${person.focus}。这项活动使后人能够观察${meta.theme}在制度、社会、文化或技术层面的具体表现。`,
    impactSummary: `${person.focus}把${person.name}与${meta.dynastyName}的发展或转折直接联系起来。其即时作用落在当时的决策与社会条件中，长期影响则体现在后续制度经验、历史记忆或知识文化传承。`,
    resume: [
      {
        timeText: `早期 / ${person.lifeText}`,
        periodLabel: meta.period,
        title: `${person.category}身份形成`,
        nominalDuty: `进入${person.category}相关的活动网络，积累参与公共事务所需的知识、身份或组织条件。`,
        authorityScope: '早期正式权限通常不明或有限；以可确认的活动范围、师友关系、家族资源及所处机构解释。',
        actualInfluence: `这一阶段为后来参与“${person.focus}”准备了社会关系、专业能力或政治位置。`,
        modernEquivalent: '不是稳定职位，近似专业训练、基层任职或公共活动准备期。',
        impact: sourceBoundary,
      },
      {
        timeText: `主要活动期 / ${person.lifeText}`,
        periodLabel: meta.period,
        title: person.focus,
        nominalDuty: profile.duty,
        authorityScope: profile.scope,
        actualInfluence: `围绕“${person.focus}”形成其一生最重要的公共影响，并与${meta.theme}发生直接联系。`,
        modernEquivalent: profile.equivalent,
        impact: processText(person, profile),
      },
      {
        timeText: '后续影响 / 身后评价',
        periodLabel: `${meta.dynastyName}及后世`,
        title: '历史记忆与再评价',
        nominalDuty: '不再对应在任官职，用于记录其行动在制度、社会记忆与知识传播中的延续。',
        authorityScope: '没有现实行政管辖权；影响范围来自史书编纂、纪念实践、作品传播和后世论争。',
        actualInfluence: `${person.focus}成为后人认识${meta.period}的一条人物线索。`,
        modernEquivalent: '历史遗产与公共记忆，不作现代职位类比。',
        impact: `后世对${person.name}的评价会随史学问题与价值立场变化，宜把可核对事实、当时成败和长期影响分层阅读。`,
      },
    ],
    disputeTabs: [
      { title: evidenceLimited ? '史实边界' : '材料边界', body: sourceBoundary },
      { title: '历史评价', body: `评价${person.name}时，一种路径强调${person.focus}的直接结果，另一种路径关注其对${meta.theme}的长期作用。两者观察尺度不同，可结合具体史料自行判断。` },
    ],
    relatedEvents: event ? [event] : [],
  };
  const curated = PERSON_DETAIL_OVERRIDES[id];
  if (!curated) return generatedPerson;
  const { resumes = [], event: curatedEvent, ...detailFields } = curated;
  return {
    ...generatedPerson,
    ...detailFields,
    resume: resumes.map(item => ({ ...item, periodLabel: meta.period }))
      .concat(generatedPerson.resume.slice(-1)),
  };
}

function buildEvent(id) {
  const event = curriculum.eventMap[id];
  if (!event) return null;
  const person = curriculum.personMap[event.relatedPersonIds[0]];
  const meta = curriculum.GROUP_META[event.dynastyId];
  const profile = roleProfile(person.category);
  const curated = PERSON_DETAIL_OVERRIDES[person.id];
  const curatedEvent = curated && curated.event;
  const curatedText = curatedEvent
    ? [curatedEvent.summary, curatedEvent.background, curatedEvent.process, curatedEvent.result, curatedEvent.impact].join(' ')
    : '';
  const related = [person]
    .concat(mentionedPeople(`${person.focus} ${person.summary} ${curatedText}`, person.id)
      .map(item => item.source === 'existing' ? knowledge.personMap[item.id] : curriculum.personMap[item.id])
      .filter(Boolean));
  const generatedEvent = {
    ...event,
    dateText: `相关活动期：${person.lifeText}`,
    tags: [person.category, meta.dynastyName, '教材与通史'],
    tagText: `${person.category}、${meta.dynastyName}、教材与通史`,
    summary: `${event.name}是理解${person.name}历史作用的核心事件或发展线索。它发生在${meta.period}的结构背景下，连接个人活动与${meta.theme}，适合与同朝代政治、社会和文化变化对照阅读。`,
    background: `${meta.period}面临${meta.theme}等相互关联的问题。${person.name}所处的身份、制度和资源条件，使“${event.name}”成为其回应时代局势的主要方式。`,
    process: processText(person, profile),
    result: `“${event.name}”确立了${person.name}在${meta.period}中的历史位置，并对当时相关群体、制度实践或知识传播产生了可观察的结果。具体成效需要结合事件规模与史料来源判断。`,
    impact: `从通史视角看，这一事件或发展线索把${person.name}的个人经历嵌入${meta.theme}。它既可用于说明当时变化，也影响了后人对${meta.dynastyName}制度、社会、文化或技术经验的认识。`,
    disputeTabs: [
      { title: '事实范围', body: `本条以“${event.name}”为核心线索，区分可确认活动、后世概括和文学化叙述；${person.lifeText}仅表示相关人物活动期，不冒充事件的精确发生日期。` },
      { title: '影响尺度', body: `对其影响可从当时结果与长期历史记忆两个尺度观察。前者关注直接变化，后者关注它如何进入${meta.dynastyName}及中国通史叙述。` },
    ],
    relatedPersons: related.map(decorateCompactPerson),
  };
  if (!curatedEvent) return generatedEvent;
  const extraRelated = (curatedEvent.relatedNames || [])
    .map(name => allPeople.find(item => identityNames(item).includes(name)))
    .filter(Boolean)
    .map(item => item.source === 'existing' ? knowledge.personMap[item.id] : curriculum.personMap[item.id])
    .filter(Boolean);
  const relatedPersons = [person].concat(related.slice(1), extraRelated)
    .filter((item, index, items) => items.findIndex(candidate => candidate.id === item.id) === index)
    .slice(0, 12)
    .map(decorateCompactPerson);
  const { relatedNames, ...eventFields } = curatedEvent;
  return { ...generatedEvent, ...eventFields, relatedPersons };
}

function getPersonRelationships(id) {
  const person = curriculum.personMap[id];
  if (!person) return [];
  const edges = curriculum.relationships.filter(edge => edge.sourceId === id || edge.targetId === id);
  const relationItems = edges.map(edge => {
    const otherId = edge.sourceId === id ? edge.targetId : edge.sourceId;
    return {
      ...edge,
      otherId,
      other: decorateCompactPerson(curriculum.personMap[otherId]),
      eventText: '',
    };
  });
  mentionedPeople(person.focus, id).forEach(other => {
    const source = other.source === 'existing' ? knowledge.personMap[other.id] : curriculum.personMap[other.id];
    if (!source || relationItems.some(item => item.otherId === other.id)) return;
    relationItems.push({
      sourceId: id,
      targetId: other.id,
      otherId: other.id,
      type: '事件关联',
      summary: `${person.name}的核心线索“${person.focus}”直接提及${other.name}，二者关系应结合该事件的目标、合作或冲突背景理解。`,
      eventText: person.focus,
      other: decorateCompactPerson(source),
    });
  });
  curriculum.getPeopleMentioning(person.name).slice(0, 6).forEach(other => {
    if (relationItems.some(item => item.otherId === other.id)) return;
    relationItems.push({
      sourceId: other.id,
      targetId: id,
      otherId: other.id,
      type: '事件关联',
      summary: `${other.name}的核心线索“${other.focus}”涉及${person.name}，可从相反人物端点进入同一历史过程。`,
      eventText: other.focus,
      other: decorateCompactPerson(other),
    });
  });
  const curatedEvent = PERSON_DETAIL_OVERRIDES[id] && PERSON_DETAIL_OVERRIDES[id].event;
  (curatedEvent && curatedEvent.relatedNames || []).forEach(name => {
    const match = allPeople.find(item => identityNames(item).includes(name));
    if (!match || match.id === id || relationItems.some(item => item.otherId === match.id)) return;
    const source = match.source === 'existing' ? knowledge.personMap[match.id] : curriculum.personMap[match.id];
    if (!source) return;
    relationItems.push({
      sourceId: id,
      targetId: match.id,
      otherId: match.id,
      type: '关键事件关系',
      summary: `${person.name}与${match.name}共同进入“${person.focus}”的核心史实链条，二者的合作、冲突或决策影响已在人物与事件详情中交叉说明。`,
      eventText: person.focus,
      other: decorateCompactPerson(source),
    });
  });
  return relationItems.slice(0, 16);
}

module.exports = {
  buildPerson,
  buildEvent,
  getPersonRelationships,
  personRoute,
  eventRoute,
};
