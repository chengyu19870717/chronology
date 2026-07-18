function listText(list, fallback) {
  const items = (list || []).filter(Boolean);
  return items.length ? items.join('、') : fallback;
}

function periodText(config) {
  return listText(config.activePeriodLabels || config.crossDynastyLabels, '相关历史时期');
}

function categoryText(config) {
  return listText(config.categories, '历史人物');
}

function hasCategory(config, pattern) {
  return (config.categories || []).some(item => pattern.test(item));
}

function roleProfile(config) {
  if (hasCategory(config, /帝王|君主|商王|霸主|王$/)) {
    return {
      title: '君主 / 最高统治者',
      nominalDuty: '作为所属政权最高统治者，负责国家军政、财政、人事、礼制和重大政策方向。',
      authorityScope: '所属政权的中央政务、军队调度、官员任免、诏令发布、对外关系和制度调整。',
      modernEquivalent: '国家元首与最高行政决策者的职能近似，但古代君权不宜直接等同现代职位',
      policy: '主要通过政权稳定、军政决策、制度延续和王朝继承等选择体现其治理方向。',
    };
  }
  if (hasCategory(config, /将领|军事|女将|抗倭|边防/)) {
    return {
      title: '军事人物',
      nominalDuty: '承担军事指挥、防务组织、战役执行或武装力量整合职责。',
      authorityScope: '军队训练、前线调度、战役计划、军需协同和特定区域防务。',
      modernEquivalent: '高级军事指挥官或战区防务负责人的职能近似，不等同现代军衔',
      policy: '主要围绕军事防御、进攻作战、边疆控制和政权安全展开行动。',
    };
  }
  if (hasCategory(config, /政治家|改革|制度|辅政|宰辅|谏臣|权臣/)) {
    return {
      title: '政治 / 制度人物',
      nominalDuty: '参与政务决策、制度设计、行政执行或君主辅佐。',
      authorityScope: '中央或地方行政、人事建议、财政军政方案、法令执行和政策协调。',
      modernEquivalent: '高级行政官、政策顾问或制度改革负责人的职能近似',
      policy: '倾向通过制度、行政、人事或财政措施影响国家治理。',
    };
  }
  if (hasCategory(config, /治水|早期国家/)) {
    return {
      title: '公共治理 / 早期国家人物',
      nominalDuty: '在传统叙事中承担治水、组织共同体或推动早期国家秩序形成的角色。',
      authorityScope: '水利治理、部族联盟协调、公共工程组织和早期政治权威建构。',
      modernEquivalent: '公共工程组织者、早期政治共同体领袖的职能近似，史实边界需谨慎标注',
      policy: '主要体现为公共治理、社会组织和早期国家形成叙事中的秩序建构。',
    };
  }
  if (hasCategory(config, /思想家|儒家|道家|理学|心学|纵横家/)) {
    return {
      title: '思想 / 学术人物',
      nominalDuty: '提出思想主张、参与教育传播、影响政治伦理或社会价值判断。',
      authorityScope: '学术论述、弟子教育、政策建议、文本传播和后世解释传统。',
      modernEquivalent: '思想家、教育者、公共伦理倡导者或政策理论顾问的职能近似',
      policy: '倾向通过思想体系、价值主张和政治伦理影响社会秩序。',
    };
  }
  if (hasCategory(config, /文学家|诗人|史学家|书法|戏曲|文化/)) {
    return {
      title: '文化 / 文学人物',
      nominalDuty: '通过著述、创作、编纂或艺术实践影响文化传统。',
      authorityScope: '文本写作、史料整理、文学艺术创作、文化传播和审美范式塑造。',
      modernEquivalent: '作家、史学家、艺术家或文化知识生产者的职能近似',
      policy: '主要影响不在行政政策，而在文化表达、历史记忆和价值传播。',
    };
  }
  if (hasCategory(config, /科学|技术|医学|数学|天文|发明/)) {
    return {
      title: '科技 / 技术人物',
      nominalDuty: '从事科学观察、技术改进、医药实践、工程记录或知识整理。',
      authorityScope: '专业知识生产、技术方案、工具改进、经验记录和传播应用。',
      modernEquivalent: '科学家、工程技术专家、医学专家或技术史人物的职能近似',
      policy: '主要通过技术改良、知识积累和生产生活方式变化产生影响。',
    };
  }
  if (hasCategory(config, /外交|航海|探险|翻译|僧人|交流/)) {
    return {
      title: '外交 / 交流人物',
      nominalDuty: '承担对外沟通、文化交流、交通开拓、翻译传播或宗教文化连接。',
      authorityScope: '出使路线、交流网络、翻译文本、外交沟通和跨区域信息传递。',
      modernEquivalent: '外交官、文化交流使者、翻译家或跨区域事务代表的职能近似',
      policy: '倾向通过交通、外交和知识传播改变政权视野与文化联系。',
    };
  }
  if (hasCategory(config, /起义|革命|叛乱/)) {
    return {
      title: '起义 / 革命人物',
      nominalDuty: '组织或参与反抗既有政权的政治军事行动。',
      authorityScope: '动员群众、组织武装、发布号召、控制区域和争取政治合法性。',
      modernEquivalent: '政治动员者、武装运动领袖或革命组织者的职能近似',
      policy: '倾向通过社会动员和武装冲突挑战既有统治秩序。',
    };
  }
  return {
    title: '历史人物',
    nominalDuty: '在其所处时代通过政治、军事、思想、文化或社会行动产生影响。',
    authorityScope: '具体权限需结合身份判断，可能涉及政务、军事、学术、文化或社会动员。',
    modernEquivalent: '不宜直接类比，以下以其实际活动范围说明',
    policy: '现有材料不足以概括单一政策标签，应结合其身份、时代压力和相关事件判断。',
  };
}

function defaultBackground(config) {
  const period = periodText(config);
  const cats = categoryText(config);
  if (/传说时代|史实存疑/.test(`${period} ${cats}`)) {
    return `${config.name}属于${period}的重要${cats}，相关叙事多见于传统文献、传说系统和后世历史记忆，需与考古材料和史实存疑标签一并理解。`;
  }
  return `${config.name}活动于${period}，现有记载通常将其归入${cats}。本条依据相关人物、事件和制度材料概括其历史位置，具体判断以可核验记载为准。`;
}

function defaultChildhood(config) {
  const period = periodText(config);
  if (/传说时代|史实存疑/.test(`${period} ${categoryText(config)}`)) {
    return '早年经历缺乏可直接核验的连续史料，原型以“传说时代”“史实存疑”标注，避免把后世叙事当作确定事实。';
  }
  if (/生卒年不详|不详/.test(config.lifeText || '')) {
    return '早年经历和家世缺少连续材料，现有记载主要集中在其成年后的政治、军事、思想或文化活动。';
  }
  if (hasCategory(config, /帝王|君主|王$/)) {
    return '早年多受宗室、贵族或宫廷政治环境影响，其性格和决策需放在继承秩序、权力竞争和时代压力中观察。';
  }
  return '现存材料没有形成连续的早年传记，能够确认的内容主要来自其成年后的关键选择、职能范围和时代背景。';
}

function defaultPersonality(config) {
  if (hasCategory(config, /末代|亡国|争议|权臣|宦官/)) {
    return '大众认知中评价较复杂，既要看到其在具体权力结构中的行为选择，也要区分正史叙述、后世道德评价和文学化形象。';
  }
  if (hasCategory(config, /帝王|君主|王$/)) {
    return '性格特征主要通过用人、制度选择、战争或政权维护方式体现，常见评价围绕决断力、控局能力和对时代压力的回应展开。';
  }
  if (hasCategory(config, /将领|军事/)) {
    return '相关性格主要从战场表现、组织能力和风险判断中呈现，宜结合具体战役和任职记录理解。';
  }
  if (hasCategory(config, /思想家|文学家|史学家|科学|技术|医学/)) {
    return '相关性格主要从著述、研究、创作或知识实践中呈现，宜结合作品和具体社会处境理解。';
  }
  return '现有材料主要通过行为选择、社会角色和影响结果呈现其性格，后世评价与文学形象需要和史料分开阅读。';
}

function defaultPolicy(config) {
  return roleProfile(config).policy;
}

function defaultResume(config) {
  const profile = roleProfile(config);
  return [{
    timeText: config.lifeText || '生卒年不详',
    periodLabel: periodText(config),
    title: profile.title,
    nominalDuty: profile.nominalDuty,
    authorityScope: profile.authorityScope,
    actualInfluence: config.summary,
    modernEquivalent: profile.modernEquivalent,
    impact: config.impactSummary || config.summary,
  }];
}

function defaultPersonDisputes(config) {
  const text = `${categoryText(config)} ${periodText(config)} ${config.summary || ''}`;
  if (/传说|史实存疑/.test(text)) {
    return [
      { title: '传统叙事', body: `${config.name}在传统叙事中具有重要象征意义，常被用来解释早期国家、王朝更替或文化秩序的形成。` },
      { title: '史料边界', body: '涉及传说时代或史料不足的内容，应保留“约”“传说时代”“史实存疑”等标签，避免把后世叙事等同于可完全确认的史实。' },
    ];
  }
  if (/争议|末代|亡国|权臣|宦官|改革|女性|起义|叛乱/.test(text)) {
    return [
      { title: '通识评价', body: `${config.name}的历史形象通常与${config.summary}相关，是理解相关时代矛盾的重要入口。` },
      { title: '多视角', body: '评价时可区分其个人选择、制度结构、时代压力和后世道德化叙事，避免只用单一标签概括。' },
    ];
  }
  return [];
}

function eventBackground(config) {
  const period = config.periodLabel || listText(config.dynastyIds, '相关时期');
  const tags = listText(config.tags, '政治、社会与文化变迁');
  return `${config.name}处于${period}的${tags}变动之中。现有材料显示，它与前期制度安排、资源分配、社会压力和人物选择直接相关。${config.summary}`;
}

function eventProcess(config) {
  const people = listText(config.tags, '相关人物');
  return `事件涉及${people}：既有矛盾在特定时代压力下累积，相关人物的决策推动局势变化，并通过政权、军队、制度或知识传播扩展影响。${config.summary}`;
}

function eventResult(config) {
  const text = `${config.name || ''} ${(config.tags || []).join(' ')}`;
  if (/王朝更替|灭亡|建立|统一/.test(text)) {
    return `${config.summary} 直接结果是相关政权的存续、统治中心或政治合法性发生变化，后续朝代需要在新的权力格局上重新组织统治。`;
  }
  if (/改革|制度|变法/.test(text)) {
    return `${config.summary} 改革主要改变行政、财政、军政或思想秩序；它提高了部分治理能力，也会触动旧有利益并留下后续争论。`;
  }
  if (/战争|边防|军事|起义|农民|之战|战役|抗倭|伐|平叛/.test(text)) {
    return `${config.summary} 直接改变交战各方的兵力、地盘、补给或政治声望，使军政格局和地方控制出现重新分配。`;
  }
  if (/文化|史学|文学|科技|四大发明|交流|科学|印刷|历法|诗|书|法|理学|心学/.test(text)) {
    return `${config.summary} 使知识、技术、文本或交流网络得到积累，并通过教育、制度、生产生活或后世传播形成持续影响。`;
  }
  return `${config.summary} 直接结果表现为相关人物关系、制度运行或社会局势变化，长期影响需要结合${config.periodLabel || '所处时代'}的后续材料判断。`;
}

function eventImpact(config) {
  const tags = listText(config.tags, '政治、社会与文化');
  return `${config.summary} 从长时段看，它有助于理解${config.periodLabel || '该时期'}的${tags}如何相互作用，并观察其对后续制度、社会和人物选择的影响。`;
}

function eventDisputes(config) {
  const text = `${config.name} ${listText(config.tags, '')}`;
  if (/传说|史实存疑/.test(text)) {
    return [
      { title: '传统记忆', body: '该事件在传统历史叙事中具有解释早期秩序或王朝更替的作用。' },
      { title: '史实边界', body: '涉及早期年代和传说材料时，应结合考古、文献层累和“约”年代标注谨慎理解。' },
    ];
  }
  if (/改革|变法|争议|战争|起义|灭亡|更替/.test(text)) {
    return [
      { title: '通识结论', body: `${config.name}通常被视为${config.summary}` },
      { title: '理解角度', body: '可从制度压力、人物选择、资源约束和后世评价四个角度拆开判断，避免只看单一成败。' },
    ];
  }
  return [];
}

function person(config) {
  return {
    formalName: config.formalName || config.name,
    birthYear: config.birthYear ?? null,
    deathYear: config.deathYear ?? null,
    categories: config.categories || [],
    activePeriodLabels: config.activePeriodLabels || config.crossDynastyLabels || [],
    background: config.background || defaultBackground(config),
    childhood: config.childhood || defaultChildhood(config),
    personality: config.personality || defaultPersonality(config),
    policyInclination: config.policyInclination || defaultPolicy(config),
    socialContribution: config.socialContribution || config.summary,
    impactSummary: config.impactSummary || config.summary,
    resume: config.resume || defaultResume(config),
    relatedEventIds: config.relatedEventIds || [],
    disputeTabs: config.disputeTabs || defaultPersonDisputes(config),
    hasAvatar: false,
    ...config,
  };
}

function event(config) {
  return {
    tags: config.tags || [],
    relatedPersonIds: config.relatedPersonIds || [],
    background: config.background || eventBackground(config),
    process: config.process || eventProcess(config),
    result: config.result || eventResult(config),
    impact: config.impact || eventImpact(config),
    disputeTabs: config.disputeTabs || eventDisputes(config),
    ...config,
  };
}

function emperorResume(config) {
  return [
    {
      timeText: config.reignText || config.lifeText,
      periodLabel: config.periodLabel,
      title: config.title || '皇帝 / 最高统治者',
      nominalDuty: `作为${config.polity}最高统治者，负责国家军政、财政、人事、礼制和重大政策方向。`,
      authorityScope: config.authorityScope || `${config.polity}中央政务、军队调度、官员任免、诏令发布、对外关系和国家制度调整。`,
      actualInfluence: config.actualInfluence || config.summary,
      modernEquivalent: '国家元首与最高行政决策者的职能近似，但古代皇权不宜直接等同现代职位',
      impact: config.impact || config.summary,
    },
  ];
}

const persons = [
  person({ id: 'da-yu', name: '大禹', formalName: '禹', lifeText: '传说时代', categories: ['传说时代', '治水人物', '早期国家'], crossDynastyLabels: ['传说时代', '夏'], activePeriodLabels: ['夏建立前后'], dynastyIds: ['xia'], summary: '传统叙事中的治水英雄和夏朝开创者，体现从部落联盟向早期国家过渡的历史记忆。', relatedEventIds: ['yu-control-floods', 'xia-founding'] }),
  person({ id: 'qi-of-xia', name: '启', formalName: '姒启', lifeText: '传说时代', categories: ['夏后氏君主', '早期国家'], crossDynastyLabels: ['夏'], dynastyIds: ['xia'], summary: '传统叙事中承接禹位，常被用来说明“禅让”向“世袭”转变。', relatedEventIds: ['xia-founding'] }),
  person({ id: 'jie-of-xia', name: '夏桀', formalName: '履癸', lifeText: '传说时代', categories: ['末代君主', '亡国君主'], crossDynastyLabels: ['夏'], dynastyIds: ['xia'], summary: '传统史书中的夏朝末代君主，常与商汤灭夏、暴政叙事联系在一起。', relatedEventIds: ['shang-overthrows-xia'] }),

  person({ id: 'cheng-tang', name: '商汤', formalName: '成汤', lifeText: '约前17-前16世纪', categories: ['开国君主', '商朝人物'], crossDynastyLabels: ['夏末', '商'], dynastyIds: ['xia', 'shang'], summary: '商朝开创者，传统叙事中以伐桀建商代表王朝更替。', relatedEventIds: ['shang-overthrows-xia'] }),
  person({ id: 'yi-yin', name: '伊尹', lifeText: '生卒年不详', categories: ['政治家', '辅政人物'], crossDynastyLabels: ['商'], dynastyIds: ['shang'], summary: '商初重要辅臣，传统叙事中以辅佐商汤和治理商政著称。', relatedEventIds: ['shang-overthrows-xia'] }),
  person({ id: 'pan-geng', name: '盘庚', lifeText: '生卒年不详', categories: ['商王', '迁都人物'], crossDynastyLabels: ['商'], dynastyIds: ['shang'], summary: '商王，迁都于殷，使商后期政治中心趋于稳定。', relatedEventIds: ['pan-geng-moves-yin'] }),
  person({ id: 'wu-ding', name: '武丁', lifeText: '生卒年不详', categories: ['商王', '中兴君主'], crossDynastyLabels: ['商'], dynastyIds: ['shang'], summary: '商代重要君主，甲骨文材料中可见其频繁祭祀、征伐和治理活动。', relatedEventIds: ['wu-ding-revival'] }),
  person({ id: 'fu-hao', name: '妇好', lifeText: '生卒年不详', categories: ['女将', '商王室人物'], crossDynastyLabels: ['商'], dynastyIds: ['shang'], summary: '商王武丁配偶之一，甲骨文和墓葬材料显示其参与祭祀与军事活动。', relatedEventIds: ['wu-ding-revival'] }),
  person({ id: 'shang-zhou-wang', name: '商纣王', formalName: '帝辛', lifeText: '？-约前1046年', deathYear: -1046, categories: ['末代君主', '亡国君主'], crossDynastyLabels: ['商末'], dynastyIds: ['shang'], summary: '商朝末代君主，传统叙事中是周灭商的反面典型，现代讨论会区分史实和后世政治书写。', relatedEventIds: ['wu-wang-conquers-shang'] }),

  person({ id: 'king-wen-zhou', name: '周文王', formalName: '姬昌', lifeText: '约前1152-约前1056年', birthYear: -1152, deathYear: -1056, categories: ['周族领袖', '奠基人物'], crossDynastyLabels: ['商末', '西周前史'], dynastyIds: ['shang', 'western-zhou'], summary: '周族兴起的重要领袖，为周灭商奠定政治和德治叙事基础。', relatedEventIds: ['wu-wang-conquers-shang'] }),
  person({ id: 'king-wu-zhou', name: '周武王', formalName: '姬发', lifeText: '？-约前1043年', deathYear: -1043, categories: ['开国君主', '西周人物'], crossDynastyLabels: ['商末', '西周'], dynastyIds: ['shang', 'western-zhou'], summary: '率周人和诸侯在牧野之战中灭商，建立西周。', relatedEventIds: ['wu-wang-conquers-shang'] }),
  person({ id: 'duke-of-zhou', name: '周公旦', formalName: '姬旦', lifeText: '生卒年不详', categories: ['政治家', '制度人物', '礼乐'], crossDynastyLabels: ['西周'], dynastyIds: ['western-zhou'], summary: '辅佐成王、平定叛乱、制礼作乐，是西周制度和儒家政治理想中的核心人物。', relatedEventIds: ['zhou-ritual-feudalism'] }),
  person({ id: 'jiang-ziya', name: '姜子牙', formalName: '姜尚', lifeText: '生卒年不详', categories: ['军事家', '辅政人物', '传说色彩'], crossDynastyLabels: ['商末', '西周'], dynastyIds: ['shang', 'western-zhou'], summary: '辅佐周族灭商并受封齐地，人物形象兼具史实和传说色彩。', relatedEventIds: ['wu-wang-conquers-shang'] }),
  person({ id: 'king-you-zhou', name: '周幽王', formalName: '姬宫湦', lifeText: '？-前771年', deathYear: -771, categories: ['末代君主', '西周人物'], crossDynastyLabels: ['西周末'], dynastyIds: ['western-zhou'], summary: '西周末代君主，犬戎攻破镐京后西周结束，东周开始。', relatedEventIds: ['western-zhou-fall'] }),

  person({ id: 'han-wen-di', name: '汉文帝', formalName: '刘恒', lifeText: '前203-前157年', birthYear: -203, deathYear: -157, categories: ['帝王君主', '治世君主'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '西汉皇帝，与汉景帝时期并称“文景之治”，推行轻徭薄赋和休养生息。', relatedEventIds: ['wenjing-rule'] }),
  person({ id: 'han-jing-di', name: '汉景帝', formalName: '刘启', lifeText: '前188-前141年', birthYear: -188, deathYear: -141, categories: ['帝王君主'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '西汉皇帝，平定七国之乱，继续休养生息政策。', relatedEventIds: ['wenjing-rule', 'rebellion-seven-states'] }),
  person({ id: 'han-wu-di', name: '汉武帝', formalName: '刘彻', lifeText: '前156-前87年', birthYear: -156, deathYear: -87, categories: ['帝王君主', '制度塑造者'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '强化中央集权，独尊儒术，反击匈奴，开拓丝绸之路，是西汉国势扩张的代表君主。', relatedEventIds: ['han-wu-reforms', 'silk-road'] }),
  person({
    id: 'han-xuan-di',
    name: '汉宣帝',
    formalName: '刘询',
    lifeText: '前91-前49年',
    birthYear: -91,
    deathYear: -49,
    categories: ['帝王君主', '中兴君主'],
    crossDynastyLabels: ['西汉'],
    dynastyIds: ['western-han'],
    summary: '西汉中后期重要君主，亲历民间后入承大统，整顿吏治、平衡霍氏外戚影响，推动“昭宣中兴”。',
    background: '汉武帝曾孙，幼年因巫蛊之祸牵连而流落民间，特殊成长经历使其较能理解基层社会和官吏治理问题。',
    childhood: '早年遭遇宫廷政治灾祸，成长环境远离稳定皇室教育，形成谨慎、务实且重视实际治理的性格线索。',
    personality: '通识评价多认为其沉稳谨慎、重视循吏和法度，也能在外戚权力与皇权之间逐步夺回主动。',
    policyInclination: '偏向整顿吏治、轻徭薄赋、重视实际行政效果，同时维护汉武帝以来的大一统制度框架。',
    socialContribution: '巩固西汉中期政治秩序，使汉朝在武帝高压扩张后恢复相对稳定，被后世与汉昭帝时期合称“昭宣中兴”。',
    impactSummary: '汉宣帝时期体现汉代皇权、外戚和官僚体系再平衡，是理解西汉由强盛转入后期政治结构的重要节点。',
    relatedEventIds: ['zhaoxuan-revival'],
    resume: emperorResume({
      lifeText: '前91-前49年',
      reignText: '前74-前49年',
      periodLabel: '西汉昭宣时期',
      polity: '西汉',
      summary: '整顿吏治、削弱霍氏外戚影响并稳定西汉中期统治。',
      actualInfluence: '在霍光身后逐步强化皇权，选用循吏，维持边疆和内政稳定。',
      impact: '其统治使西汉从武帝后期消耗中恢复，是教材和通识中“昭宣中兴”的核心君主。',
    }),
  }),
  person({ id: 'dong-zhongshu', name: '董仲舒', lifeText: '前179-前104年', birthYear: -179, deathYear: -104, categories: ['思想家', '儒家', '制度人物'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '提出适应大一统帝国的儒学政治方案，对汉代意识形态建设影响深远。', relatedEventIds: ['han-wu-reforms'] }),
  person({ id: 'sima-qian', name: '司马迁', lifeText: '约前145-约前86年', birthYear: -145, deathYear: -86, categories: ['史学家', '文学家'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '《史记》作者，开创纪传体通史传统，是中国史学和文学史核心人物。', relatedEventIds: ['shiji-written'] }),
  person({ id: 'zhang-qian', name: '张骞', lifeText: '？-前114年', deathYear: -114, categories: ['外交人物', '探险人物'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '出使西域，推动汉朝与中亚交通联系，被视为丝绸之路开拓的重要人物。', relatedEventIds: ['silk-road'] }),
  person({ id: 'wei-qing', name: '卫青', lifeText: '？-前106年', deathYear: -106, categories: ['将领', '西汉人物'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '汉武帝时期重要将领，参与对匈奴战争，改变汉匈力量对比。', relatedEventIds: ['han-xiongnu-war'] }),
  person({ id: 'huo-qubing', name: '霍去病', lifeText: '前140-前117年', birthYear: -140, deathYear: -117, categories: ['将领', '军事家'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '西汉名将，多次远征匈奴，封狼居胥成为后世军事功业象征。', relatedEventIds: ['han-xiongnu-war'] }),
  person({ id: 'wang-mang', name: '王莽', lifeText: '前45-23年', birthYear: -45, deathYear: 23, categories: ['帝王君主', '改革人物', '争议人物'], crossDynastyLabels: ['西汉', '新'], dynastyIds: ['western-han', 'xin'], summary: '代汉建立新朝，推行复古式改制，因社会矛盾和改革失序迅速失败。', relatedEventIds: ['wang-mang-usurpation', 'xin-reforms'] }),

  person({ id: 'liu-xiu', name: '光武帝', formalName: '刘秀', lifeText: '前5-57年', birthYear: -5, deathYear: 57, categories: ['开国君主', '帝王君主'], crossDynastyLabels: ['新末', '东汉'], dynastyIds: ['xin', 'eastern-han'], summary: '重建汉朝，建立东汉，史称“光武中兴”。', relatedEventIds: ['guangwu-restoration'] }),
  person({ id: 'ban-chao', name: '班超', lifeText: '32-102年', birthYear: 32, deathYear: 102, categories: ['外交人物', '将领'], crossDynastyLabels: ['东汉'], dynastyIds: ['eastern-han'], summary: '长期经营西域，维护东汉在西域的影响。', relatedEventIds: ['eastern-han-western-regions'] }),
  person({ id: 'ban-gu', name: '班固', lifeText: '32-92年', birthYear: 32, deathYear: 92, categories: ['史学家', '文学家'], crossDynastyLabels: ['东汉'], dynastyIds: ['eastern-han'], summary: '《汉书》主要作者，确立断代史体例的重要人物。', relatedEventIds: ['hanshu-compiled'] }),
  person({ id: 'zhang-heng', name: '张衡', lifeText: '78-139年', birthYear: 78, deathYear: 139, categories: ['科学家', '文学家'], crossDynastyLabels: ['东汉'], dynastyIds: ['eastern-han'], summary: '东汉科学家和文学家，在天文学、地震仪器和赋体文学方面影响突出。', relatedEventIds: ['eastern-han-science'] }),
  person({ id: 'cai-lun', name: '蔡伦', lifeText: '？-121年', deathYear: 121, categories: ['技术人物', '宦官'], crossDynastyLabels: ['东汉'], dynastyIds: ['eastern-han'], summary: '改进造纸术，推动书写材料变革，是世界文明史重要技术人物。', relatedEventIds: ['papermaking-improved'] }),
  person({ id: 'zhang-jue', name: '张角', lifeText: '？-184年', deathYear: 184, categories: ['起义领袖', '宗教人物'], crossDynastyLabels: ['东汉末'], dynastyIds: ['eastern-han'], summary: '太平道领袖，发动黄巾起义，东汉末地方军政格局由此剧变。', relatedEventIds: ['yellow-turban'] }),

  person({ id: 'cao-cao', name: '曹操', lifeText: '155-220年', birthYear: 155, deathYear: 220, categories: ['政治家', '军事家', '文学家'], crossDynastyLabels: ['东汉末', '三国魏'], dynastyIds: ['eastern-han', 'three-kingdoms'], summary: '东汉末政治军事集团核心人物，统一北方，为曹魏建立奠定基础。', relatedEventIds: ['guandu-battle', 'red-cliffs'] }),
  person({ id: 'liu-bei', name: '刘备', lifeText: '161-223年', birthYear: 161, deathYear: 223, categories: ['帝王君主', '蜀汉人物'], crossDynastyLabels: ['东汉末', '三国蜀'], dynastyIds: ['eastern-han', 'three-kingdoms'], summary: '蜀汉开国君主，依托汉室正统叙事和荆益集团建立政权。', relatedEventIds: ['red-cliffs', 'three-kingdoms-formation'] }),
  person({ id: 'sun-quan', name: '孙权', lifeText: '182-252年', birthYear: 182, deathYear: 252, categories: ['帝王君主', '吴国人物'], crossDynastyLabels: ['东汉末', '三国吴'], dynastyIds: ['eastern-han', 'three-kingdoms'], summary: '江东政权核心君主，巩固孙吴基业，参与赤壁和三国鼎立格局。', relatedEventIds: ['red-cliffs', 'three-kingdoms-formation'] }),
  person({ id: 'zhuge-liang', name: '诸葛亮', lifeText: '181-234年', birthYear: 181, deathYear: 234, categories: ['政治家', '军事家', '谋士'], crossDynastyLabels: ['三国蜀'], dynastyIds: ['three-kingdoms'], summary: '蜀汉丞相，辅佐刘备、刘禅，治蜀和北伐形象影响深远。', relatedEventIds: ['three-kingdoms-formation'] }),
  person({ id: 'sima-yi', name: '司马懿', lifeText: '179-251年', birthYear: 179, deathYear: 251, categories: ['政治家', '军事家', '权臣'], crossDynastyLabels: ['三国魏', '西晋前史'], dynastyIds: ['three-kingdoms', 'western-jin'], summary: '曹魏后期权臣，司马氏掌权的关键人物，为西晋代魏奠定基础。', relatedEventIds: ['sima-usurpation'] }),
  person({ id: 'guan-yu', name: '关羽', lifeText: '？-220年', deathYear: 220, categories: ['将领', '文化形象'], crossDynastyLabels: ['东汉末', '三国蜀'], dynastyIds: ['eastern-han', 'three-kingdoms'], summary: '刘备集团核心将领，后世忠义形象和民间信仰影响极大。', relatedEventIds: ['three-kingdoms-formation'] }),
  person({ id: 'zhou-yu', name: '周瑜', lifeText: '175-210年', birthYear: 175, deathYear: 210, categories: ['将领', '吴国人物'], crossDynastyLabels: ['东汉末'], dynastyIds: ['eastern-han', 'three-kingdoms'], summary: '孙吴名将，赤壁之战中发挥关键作用。', relatedEventIds: ['red-cliffs'] }),
  person({ id: 'hua-tuo', name: '华佗', lifeText: '约145-208年', birthYear: 145, deathYear: 208, categories: ['医学家'], crossDynastyLabels: ['东汉末'], dynastyIds: ['eastern-han'], summary: '东汉末医学家，外科、针灸和麻醉传说影响深远。', relatedEventIds: ['eastern-han-medicine'] }),

  person({ id: 'sima-yan', name: '晋武帝', formalName: '司马炎', lifeText: '236-290年', birthYear: 236, deathYear: 290, categories: ['开国君主', '帝王君主'], crossDynastyLabels: ['西晋'], dynastyIds: ['western-jin'], summary: '代魏建晋并灭吴统一全国，但西晋统一很快走向危机。', relatedEventIds: ['western-jin-unification'] }),
  person({ id: 'wang-xizhi', name: '王羲之', lifeText: '303-361年', birthYear: 303, deathYear: 361, categories: ['书法家', '文化人物'], crossDynastyLabels: ['东晋'], dynastyIds: ['eastern-jin-sixteen'], summary: '东晋书法家，被誉为“书圣”，《兰亭序》影响深远。', relatedEventIds: ['eastern-jin-culture'] }),
  person({ id: 'tao-yuanming', name: '陶渊明', lifeText: '365-427年', birthYear: 365, deathYear: 427, categories: ['文学家', '田园诗'], crossDynastyLabels: ['东晋', '南朝宋'], dynastyIds: ['eastern-jin-sixteen', 'southern-northern'], summary: '田园诗代表作家，隐逸人格和文学风格影响后世。', relatedEventIds: ['eastern-jin-culture'] }),
  person({ id: 'xie-an', name: '谢安', lifeText: '320-385年', birthYear: 320, deathYear: 385, categories: ['政治家', '东晋人物'], crossDynastyLabels: ['东晋'], dynastyIds: ['eastern-jin-sixteen'], summary: '东晋重臣，淝水之战前后稳定政局，是门阀政治代表人物。', relatedEventIds: ['feishui-battle'] }),
  person({ id: 'fu-jian', name: '苻坚', lifeText: '338-385年', birthYear: 338, deathYear: 385, categories: ['十六国君主', '前秦人物'], crossDynastyLabels: ['十六国'], dynastyIds: ['eastern-jin-sixteen'], summary: '前秦君主，一度统一北方，淝水之战失败后政权瓦解。', relatedEventIds: ['feishui-battle'] }),
  person({ id: 'zu-chongzhi', name: '祖冲之', lifeText: '429-500年', birthYear: 429, deathYear: 500, categories: ['科学家', '数学家'], crossDynastyLabels: ['南北朝'], dynastyIds: ['southern-northern'], summary: '南朝科学家，精确推算圆周率并参与历法研究。', relatedEventIds: ['northern-southern-science'] }),
  person({ id: 'emperor-xiaowen-northern-wei', name: '北魏孝文帝', formalName: '拓跋宏', lifeText: '467-499年', birthYear: 467, deathYear: 499, categories: ['帝王君主', '改革人物'], crossDynastyLabels: ['北魏', '南北朝'], dynastyIds: ['southern-northern'], summary: '推行迁都洛阳和汉化改革，深刻影响北方民族融合和制度转型。', relatedEventIds: ['xiaowen-reform'] }),

  person({ id: 'sui-wen-di', name: '隋文帝', formalName: '杨坚', lifeText: '541-604年', birthYear: 541, deathYear: 604, categories: ['开国君主', '帝王君主'], crossDynastyLabels: ['隋'], dynastyIds: ['sui'], summary: '建立隋朝并重新统一中国，推行制度整合。', relatedEventIds: ['sui-unification'] }),
  person({ id: 'sui-yang-di', name: '隋炀帝', formalName: '杨广', lifeText: '569-618年', birthYear: 569, deathYear: 618, categories: ['帝王君主', '争议人物'], crossDynastyLabels: ['隋'], dynastyIds: ['sui'], summary: '营建大运河、开拓边疆，但徭役战争沉重导致隋末危机。', relatedEventIds: ['grand-canal', 'sui-fall'] }),

  person({
    id: 'tang-gaozu',
    name: '唐高祖',
    formalName: '李渊',
    lifeText: '566-635年',
    birthYear: 566,
    deathYear: 635,
    categories: ['开国君主', '帝王君主'],
    crossDynastyLabels: ['隋末', '唐'],
    dynastyIds: ['sui', 'tang'],
    summary: '唐朝开国皇帝，利用隋末动荡起兵入关，建立唐朝并奠定初唐政权框架。',
    background: '出身关陇贵族集团，长期在隋朝军政体系中任职，具备地方军事和贵族网络资源。',
    childhood: '早年成长于北朝隋唐贵族政治环境，接受门阀、军事和礼法秩序影响。',
    personality: '通识叙事中常被视为谨慎务实、善于借助家族和部属力量的开国型君主。',
    policyInclination: '偏向稳定关中、整合隋制、吸纳群雄并逐步完成统一。',
    socialContribution: '建立唐朝，使隋末分裂局面逐步收束，为贞观之治和初唐制度发展奠定基础。',
    impactSummary: '唐高祖是隋唐更替的关键人物，其政权建立为唐代长期强盛提供起点。',
    relatedEventIds: ['sui-fall', 'tang-founding'],
    resume: emperorResume({
      lifeText: '566-635年',
      reignText: '618-626年',
      periodLabel: '隋末唐初',
      polity: '唐',
      summary: '起兵建唐并组织统一战争，确立唐朝中央政权。',
      actualInfluence: '掌握唐初最高军政决策，依托李世民等宗室和功臣集团平定竞争势力。',
      impact: '开创唐朝，是隋末秩序重建和初唐政治格局形成的中心人物。',
    }),
  }),
  person({ id: 'tang-taizong', name: '唐太宗', formalName: '李世民', lifeText: '598-649年', birthYear: 598, deathYear: 649, categories: ['帝王君主', '治世君主'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '唐代重要君主，贞观之治代表了开明纳谏和制度整合的治世形象。', relatedEventIds: ['zhenguan-rule'] }),
  person({
    id: 'tang-gaozong',
    name: '唐高宗',
    formalName: '李治',
    lifeText: '628-683年',
    birthYear: 628,
    deathYear: 683,
    categories: ['帝王君主', '初唐君主'],
    crossDynastyLabels: ['唐'],
    dynastyIds: ['tang'],
    summary: '唐太宗之后的初唐君主，延续唐制并在其时期形成永徽政治，武则天逐步进入权力核心。',
    background: '唐太宗之子，承接贞观政治遗产，也面对宗室、功臣和后宫政治关系的重组。',
    childhood: '成长于初唐宫廷和储位竞争环境，接受儒家礼法与帝王教育。',
    personality: '通识评价多认为其性格相对温和，善于延续制度，但后期受健康与宫廷权力格局影响较大。',
    policyInclination: '延续唐太宗制度路线，重视法典和官僚秩序，同时在后期形成武后参与政务的格局。',
    socialContribution: '其时期唐朝疆域和制度继续扩展，《唐律疏议》等制度成果体现初唐法制成熟。',
    impactSummary: '唐高宗连接贞观政治与武周政治，是理解初唐权力结构演变的关键君主。',
    relatedEventIds: ['yonghui-rule', 'wu-zhou'],
    resume: emperorResume({
      lifeText: '628-683年',
      reignText: '649-683年',
      periodLabel: '初唐永徽至弘道时期',
      polity: '唐',
      summary: '继承贞观制度遗产，维持初唐政治扩张和法制建设。',
      actualInfluence: '前期亲政延续唐制，后期武则天参政影响加深，皇权运作方式发生变化。',
      impact: '其统治为唐代制度成熟和武周政治转折共同铺垫。',
    }),
  }),
  person({ id: 'wu-zetian', name: '武则天', lifeText: '624-705年', birthYear: 624, deathYear: 705, categories: ['帝王君主', '女性政治人物'], crossDynastyLabels: ['唐', '武周'], dynastyIds: ['tang'], summary: '中国历史上少见的女性皇帝，延续科举用人并改变唐代政治格局。', relatedEventIds: ['wu-zhou'] }),
  person({ id: 'tang-xuanzong', name: '唐玄宗', formalName: '李隆基', lifeText: '685-762年', birthYear: 685, deathYear: 762, categories: ['帝王君主', '盛衰转折'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '开元盛世的君主，也与安史之乱导致唐由盛转衰密切相关。', relatedEventIds: ['kaiyuan-prosperity', 'an-shi-rebellion'] }),
  person({ id: 'wei-zheng', name: '魏征', lifeText: '580-643年', birthYear: 580, deathYear: 643, categories: ['谏臣', '政治家'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '唐太宗时期重要谏臣，纳谏政治的代表人物。', relatedEventIds: ['zhenguan-rule'] }),
  person({ id: 'xuan-zang', name: '玄奘', lifeText: '602-664年', birthYear: 602, deathYear: 664, categories: ['僧人', '翻译家', '文化交流'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '西行取经并翻译佛典，是唐代中外文化交流的重要人物。', relatedEventIds: ['tang-cultural-exchange'] }),
  person({ id: 'li-bai', name: '李白', lifeText: '701-762年', birthYear: 701, deathYear: 762, categories: ['文学家', '诗人'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '盛唐诗人，浪漫主义诗风和人格形象影响深远。', relatedEventIds: ['tang-poetry'] }),
  person({ id: 'du-fu', name: '杜甫', lifeText: '712-770年', birthYear: 712, deathYear: 770, categories: ['文学家', '诗人'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '现实主义诗歌代表，被称为“诗圣”，作品反映唐代由盛转衰。', relatedEventIds: ['tang-poetry', 'an-shi-rebellion'] }),
  person({ id: 'han-yu', name: '韩愈', lifeText: '768-824年', birthYear: 768, deathYear: 824, categories: ['文学家', '思想家'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '古文运动代表人物，倡导儒学复兴和文体革新。', relatedEventIds: ['tang-literary-reform'] }),
  person({ id: 'bai-juyi', name: '白居易', lifeText: '772-846年', birthYear: 772, deathYear: 846, categories: ['文学家', '诗人'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '中唐诗人，关注现实民生，诗歌通俗易懂，影响广泛。', relatedEventIds: ['tang-poetry'] }),
  person({ id: 'an-lushan', name: '安禄山', lifeText: '703-757年', birthYear: 703, deathYear: 757, categories: ['叛乱人物', '将领'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '发动安史之乱，是唐朝由盛转衰的关键人物。', relatedEventIds: ['an-shi-rebellion'] }),
  person({ id: 'guo-ziyi', name: '郭子仪', lifeText: '697-781年', birthYear: 697, deathYear: 781, categories: ['将领', '唐朝人物'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '平定安史之乱的重要将领，维护唐朝延续。', relatedEventIds: ['an-shi-rebellion'] }),
  person({ id: 'huang-chao', name: '黄巢', lifeText: '？-884年', deathYear: 884, categories: ['起义领袖', '唐末人物'], crossDynastyLabels: ['唐末'], dynastyIds: ['tang'], summary: '唐末农民起义领袖，严重动摇唐朝统治。', relatedEventIds: ['huang-chao-uprising'] }),

  person({ id: 'zhu-wen', name: '朱温', formalName: '朱全忠', lifeText: '852-912年', birthYear: 852, deathYear: 912, categories: ['五代君主', '后梁'], crossDynastyLabels: ['唐末', '五代十国', '后梁'], dynastyIds: ['tang', 'five-dynasties-ten-kingdoms'], summary: '废唐建后梁，开启五代更替。', relatedEventIds: ['five-dynasties-begin'] }),
  person({ id: 'li-cunxu', name: '李存勖', lifeText: '885-926年', birthYear: 885, deathYear: 926, categories: ['五代君主', '后唐'], crossDynastyLabels: ['五代十国', '后唐'], dynastyIds: ['five-dynasties-ten-kingdoms'], summary: '建立后唐并灭后梁，是五代前期重要君主。', relatedEventIds: ['five-dynasties-transition'] }),
  person({ id: 'shi-jingtang', name: '石敬瑭', lifeText: '892-942年', birthYear: 892, deathYear: 942, categories: ['五代君主', '后晋'], crossDynastyLabels: ['五代十国', '后晋'], dynastyIds: ['five-dynasties-ten-kingdoms'], summary: '建立后晋，割让燕云十六州，对宋辽格局影响深远。', relatedEventIds: ['sixteen-prefectures'] }),
  person({ id: 'chai-rong', name: '周世宗', formalName: '柴荣', lifeText: '921-959年', birthYear: 921, deathYear: 959, categories: ['五代君主', '改革人物'], crossDynastyLabels: ['五代十国', '后周'], dynastyIds: ['five-dynasties-ten-kingdoms'], summary: '后周君主，整军经武，为北宋统一奠定条件。', relatedEventIds: ['later-zhou-reform'] }),
  person({ id: 'li-yu', name: '李煜', lifeText: '937-978年', birthYear: 937, deathYear: 978, categories: ['十国君主', '文学家'], crossDynastyLabels: ['五代十国', '南唐', '北宋初'], dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], summary: '南唐后主，亡国君主和词人身份并重，文学影响深远。', relatedEventIds: ['song-unification'] }),

  person({ id: 'song-taizu', name: '宋太祖', formalName: '赵匡胤', lifeText: '927-976年', birthYear: 927, deathYear: 976, categories: ['开国君主', '帝王君主'], crossDynastyLabels: ['后周', '北宋'], dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], summary: '发动陈桥兵变建立宋朝，强化中央集权并逐步结束五代十国割据。', relatedEventIds: ['chenqiao-mutiny', 'song-unification'] }),
  person({
    id: 'song-renzong',
    name: '宋仁宗',
    formalName: '赵祯',
    lifeText: '1010-1063年',
    birthYear: 1010,
    deathYear: 1063,
    categories: ['帝王君主', '治世君主'],
    crossDynastyLabels: ['北宋'],
    dynastyIds: ['song-liao-jin-xixia'],
    summary: '北宋在位时间很长的君主，仁宗朝士大夫政治、文化和制度讨论活跃。',
    background: '宋真宗之子，幼年即位，早期由刘太后临朝，成年后亲政。',
    childhood: '宫廷成长与太后摄政环境使其政治风格较重平衡和稳妥。',
    personality: '传统评价多强调宽厚、仁恕、能容纳士大夫意见，但也存在决断不足的讨论。',
    policyInclination: '偏向稳健治理、尊重文官政治和制度协商，较少采取剧烈改革。',
    socialContribution: '仁宗朝人才辈出，范仲淹、欧阳修、苏轼等士人活动与北宋文化繁荣密切相关。',
    impactSummary: '宋仁宗体现北宋文治政治的高峰，也为后来更激烈的改革争论提供背景。',
    relatedEventIds: ['renzong-era', 'song-culture'],
    resume: emperorResume({
      lifeText: '1010-1063年',
      reignText: '1022-1063年',
      periodLabel: '北宋仁宗朝',
      polity: '北宋',
      summary: '长期维持北宋文官政治和社会秩序，形成士大夫文化活跃的政治环境。',
      actualInfluence: '通过任免宰执、采纳谏议和维持文官体系平衡影响朝政。',
      impact: '仁宗朝成为北宋政治文化的重要标杆，也暴露财政军事问题逐渐积累。',
    }),
  }),
  person({
    id: 'song-shenzong',
    name: '宋神宗',
    formalName: '赵顼',
    lifeText: '1048-1085年',
    birthYear: 1048,
    deathYear: 1085,
    categories: ['帝王君主', '改革支持者'],
    crossDynastyLabels: ['北宋'],
    dynastyIds: ['song-liao-jin-xixia'],
    summary: '北宋皇帝，支持王安石推行熙宁变法，试图解决财政、军事和边防压力。',
    background: '继承仁宗、英宗之后的北宋问题结构，面对冗官、冗兵、财政压力和边防困境。',
    childhood: '成长于北宋文官政治成熟期，熟悉士大夫议政和边防财政困境。',
    personality: '通识评价多认为其有改革雄心、求治心切，但对改革成本和党争后果承压较大。',
    policyInclination: '倾向富国强兵、强化财政和军事能力，支持王安石新法。',
    socialContribution: '推动北宋最大规模制度改革尝试，使社会经济、军事和基层治理问题被系统提出。',
    impactSummary: '宋神宗与王安石变法是理解北宋政治分裂和国家能力调整的核心线索。',
    relatedEventIds: ['wang-anshi-reform'],
    resume: emperorResume({
      lifeText: '1048-1085年',
      reignText: '1067-1085年',
      periodLabel: '北宋熙宁元丰时期',
      polity: '北宋',
      summary: '支持王安石变法，推动富国强兵和制度整顿。',
      actualInfluence: '以皇权支持新法执行，决定改革方向、人事任用和边防政策。',
      impact: '改革扩大国家财政军事能力讨论，也激化新旧党争。',
    }),
  }),
  person({
    id: 'song-huizong',
    name: '宋徽宗',
    formalName: '赵佶',
    lifeText: '1082-1135年',
    birthYear: 1082,
    deathYear: 1135,
    categories: ['帝王君主', '艺术人物', '亡国责任争议'],
    crossDynastyLabels: ['北宋', '金'],
    dynastyIds: ['song-liao-jin-xixia'],
    summary: '北宋末年皇帝，艺术成就突出，但政治失序、联金灭辽和靖康之变使其成为亡国教训中的关键人物。',
    background: '北宋后期党争、财政压力和辽金格局变化交织，其即位后面临复杂内外局势。',
    childhood: '宗室成长环境偏重文化艺术素养，政治历练不足的问题常被后世讨论。',
    personality: '通识形象常突出审美精致、艺术才能高，但政治判断和用人控制力不足。',
    policyInclination: '宫廷文化和艺术建设突出，政治上依赖近臣，外交上卷入联金灭辽的高风险选择。',
    socialContribution: '书画艺术和宫廷文化有重要影响，但其政治失败造成极大历史代价。',
    impactSummary: '宋徽宗是北宋灭亡叙事中的核心君主，帮助理解文化繁荣与国家治理能力脱节的风险。',
    relatedEventIds: ['song-culture', 'jingkang-incident'],
    resume: emperorResume({
      lifeText: '1082-1135年',
      reignText: '1100-1126年',
      periodLabel: '北宋末年',
      polity: '北宋',
      summary: '北宋末年最高统治者，主导宫廷政治和对辽金政策方向。',
      actualInfluence: '任用蔡京等近臣，推动宫廷文化工程，并参与联金灭辽战略选择。',
      impact: '靖康之变后被俘北迁，成为北宋亡国责任讨论中的核心人物。',
    }),
  }),
  person({
    id: 'song-gaozong',
    name: '宋高宗',
    formalName: '赵构',
    lifeText: '1107-1187年',
    birthYear: 1107,
    deathYear: 1187,
    categories: ['帝王君主', '南宋开国君主', '争议人物'],
    crossDynastyLabels: ['北宋末', '南宋'],
    dynastyIds: ['song-liao-jin-xixia'],
    summary: '南宋开国皇帝，在宋室南渡后维持政权延续，但对岳飞和宋金和战的选择争议很大。',
    background: '靖康之变后宋室南迁，北方失守、军政重建和金朝压力构成其执政背景。',
    childhood: '成长于北宋宗室体系，青年时期突遭靖康巨变，政治心理受亡国和逃亡压力影响。',
    personality: '常被评价为谨慎求稳、重视保全皇位和政权延续，但在恢复中原问题上决心不足。',
    policyInclination: '偏向守成与议和，重建南方财政军政秩序，同时防范武将坐大。',
    socialContribution: '维持南宋政权延续，使江南社会经济继续发展，但和议路线留下长期争议。',
    impactSummary: '宋高宗是南宋建立、岳飞冤案和宋金对峙格局的核心人物。',
    relatedEventIds: ['jingkang-incident', 'song-jin-war'],
    resume: emperorResume({
      lifeText: '1107-1187年',
      reignText: '1127-1162年',
      periodLabel: '南宋建立初期',
      polity: '南宋',
      summary: '重建南宋朝廷，处理抗金、议和、财政和武将权力问题。',
      actualInfluence: '控制南宋最高军政路线，与秦桧主和政策、岳飞遭害密切相关。',
      impact: '确保南宋延续，也使恢复中原和岳飞冤案成为后世评价焦点。',
    }),
  }),
  person({ id: 'wang-anshi', name: '王安石', lifeText: '1021-1086年', birthYear: 1021, deathYear: 1086, categories: ['政治家', '改革人物', '文学家'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '主持熙宁变法，试图解决北宋财政、军事和社会治理压力。', relatedEventIds: ['wang-anshi-reform'] }),
  person({ id: 'sima-guang', name: '司马光', lifeText: '1019-1086年', birthYear: 1019, deathYear: 1086, categories: ['史学家', '政治家'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '《资治通鉴》主编，与王安石变法形成重要政治对照。', relatedEventIds: ['zizhi-tongjian', 'wang-anshi-reform'] }),
  person({ id: 'su-shi', name: '苏轼', lifeText: '1037-1101年', birthYear: 1037, deathYear: 1101, categories: ['文学家', '书画家'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '北宋文学艺术全才，诗词文书画均影响深远。', relatedEventIds: ['song-culture'] }),
  person({ id: 'shen-kuo', name: '沈括', lifeText: '1031-1095年', birthYear: 1031, deathYear: 1095, categories: ['科学家', '技术人物'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '《梦溪笔谈》作者，记录宋代科技、工程和自然知识。', relatedEventIds: ['song-science'] }),
  person({ id: 'bi-sheng', name: '毕昇', lifeText: '生卒年不详', categories: ['技术人物', '发明人物'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '活字印刷术发明者，推动印刷技术发展。', relatedEventIds: ['movable-type'] }),
  person({ id: 'yue-fei', name: '岳飞', lifeText: '1103-1142年', birthYear: 1103, deathYear: 1142, categories: ['将领', '民族英雄形象'], crossDynastyLabels: ['南宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '南宋抗金名将，忠义形象影响深远。', relatedEventIds: ['jingkang-incident', 'song-jin-war'] }),
  person({ id: 'qin-hui', name: '秦桧', lifeText: '1090-1155年', birthYear: 1090, deathYear: 1155, categories: ['宰辅', '争议人物'], crossDynastyLabels: ['南宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '南宋宰相，主和政策和岳飞冤案使其历史评价高度负面。', relatedEventIds: ['song-jin-war'] }),
  person({ id: 'zhu-xi', name: '朱熹', lifeText: '1130-1200年', birthYear: 1130, deathYear: 1200, categories: ['思想家', '理学'], crossDynastyLabels: ['南宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '理学集大成者，对后世科举、教育和政治伦理影响巨大。', relatedEventIds: ['neo-confucianism'] }),
  person({ id: 'wen-tianxiang', name: '文天祥', lifeText: '1236-1283年', birthYear: 1236, deathYear: 1283, categories: ['政治家', '文学家', '抗元人物'], crossDynastyLabels: ['南宋末', '元初'], dynastyIds: ['song-liao-jin-xixia', 'yuan'], summary: '南宋末抗元人物，以忠节和《正气歌》影响后世。', relatedEventIds: ['song-fall'] }),
  person({ id: 'yelv-abaoji', name: '耶律阿保机', lifeText: '872-926年', birthYear: 872, deathYear: 926, categories: ['辽朝君主', '开国君主'], crossDynastyLabels: ['辽'], dynastyIds: ['song-liao-jin-xixia'], summary: '建立契丹辽政权，是宋辽并立格局的重要起点。', relatedEventIds: ['liao-founding'] }),
  person({ id: 'wanyan-aguda', name: '完颜阿骨打', lifeText: '1068-1123年', birthYear: 1068, deathYear: 1123, categories: ['金朝君主', '开国君主'], crossDynastyLabels: ['金'], dynastyIds: ['song-liao-jin-xixia'], summary: '建立金朝，灭辽并推动北宋靖康之变前后的格局变化。', relatedEventIds: ['jin-founding', 'jingkang-incident'] }),
  person({ id: 'yuan-hao', name: '元昊', lifeText: '1003-1048年', birthYear: 1003, deathYear: 1048, categories: ['西夏君主'], crossDynastyLabels: ['西夏'], dynastyIds: ['song-liao-jin-xixia'], summary: '建立西夏政权，与宋辽形成西北多政权并立格局。', relatedEventIds: ['xixia-founding'] }),

  person({ id: 'kublai-khan', name: '忽必烈', lifeText: '1215-1294年', birthYear: 1215, deathYear: 1294, categories: ['帝王君主', '元朝开创者'], crossDynastyLabels: ['蒙古', '元'], dynastyIds: ['yuan'], summary: '建立元朝并完成对南宋统一，推行行省制度。', relatedEventIds: ['yuan-founding', 'song-fall'] }),
  person({ id: 'yelv-chucai', name: '耶律楚材', lifeText: '1190-1244年', birthYear: 1190, deathYear: 1244, categories: ['政治家', '制度人物'], crossDynastyLabels: ['蒙古帝国', '元前史'], dynastyIds: ['yuan'], summary: '服务蒙古政权，主张以中原制度治理中原，对元初治理有影响。', relatedEventIds: ['yuan-founding'] }),
  person({ id: 'guo-shoujing', name: '郭守敬', lifeText: '1231-1316年', birthYear: 1231, deathYear: 1316, categories: ['科学家', '天文学家'], crossDynastyLabels: ['元'], dynastyIds: ['yuan'], summary: '主持授时历等天文历法工作，是元代科学代表人物。', relatedEventIds: ['yuan-science'] }),
  person({ id: 'guan-hanqing', name: '关汉卿', lifeText: '约1220-约1300年', birthYear: 1220, deathYear: 1300, categories: ['文学家', '戏曲家'], crossDynastyLabels: ['元'], dynastyIds: ['yuan'], summary: '元杂剧代表作家，《窦娥冤》等作品影响深远。', relatedEventIds: ['yuan-drama'] }),

  person({ id: 'ming-taizu', name: '明太祖', formalName: '朱元璋', lifeText: '1328-1398年', birthYear: 1328, deathYear: 1398, categories: ['开国君主', '帝王君主'], crossDynastyLabels: ['元末', '明'], dynastyIds: ['yuan', 'ming'], summary: '推翻元朝建立明朝，强化皇权和基层控制。', relatedEventIds: ['ming-founding'] }),
  person({ id: 'ming-chengzu', name: '明成祖', formalName: '朱棣', lifeText: '1360-1424年', birthYear: 1360, deathYear: 1424, categories: ['帝王君主'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '发动靖难之役即位，迁都北京，支持郑和下西洋。', relatedEventIds: ['jingnan-campaign', 'zheng-he-voyages'] }),
  person({
    id: 'ming-yingzong',
    name: '明英宗',
    formalName: '朱祁镇',
    lifeText: '1427-1464年',
    birthYear: 1427,
    deathYear: 1464,
    categories: ['帝王君主', '争议人物'],
    crossDynastyLabels: ['明'],
    dynastyIds: ['ming'],
    summary: '明代中期皇帝，两度在位，土木堡之变被俘和夺门复辟使其成为明代边防与皇权危机的关键人物。',
    background: '明宣宗之子，幼年即位，早期由内阁与太皇太后等辅政，宦官王振影响逐渐上升。',
    childhood: '幼主登基，长期处在宫廷辅政和宦官近侍环境中，政治判断受身边权力结构影响明显。',
    personality: '通识评价多认为其早期轻信近侍、军事判断不足，复辟后对功臣和政局处理争议较大。',
    policyInclination: '早期受宦官和亲征路线影响，土木堡后明代更重视京师防御和边防体系调整。',
    socialContribution: '其失败促成北京保卫战和于谦守城叙事，也让明代皇权、宦官和边防问题集中暴露。',
    impactSummary: '明英宗是土木堡之变、北京保卫战和夺门之变的中心人物，体现明中期国家安全与宫廷政治风险。',
    relatedEventIds: ['tumu-crisis'],
    resume: emperorResume({
      lifeText: '1427-1464年',
      reignText: '1435-1449年、1457-1464年',
      periodLabel: '明中期土木堡前后',
      polity: '明',
      summary: '两度在位，直接卷入土木堡之变、被俘、复辟和北京防御危机。',
      actualInfluence: '以皇帝身份决定亲征方向，复辟后重新掌握最高人事与军政决策。',
      impact: '土木堡之变重创明军威望，也使于谦北京保卫战成为明代转折事件。',
    }),
  }),
  person({ id: 'zheng-he', name: '郑和', lifeText: '1371-1433年', birthYear: 1371, deathYear: 1433, categories: ['航海家', '外交人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '七下西洋，展示明初海上交通和朝贡外交。', relatedEventIds: ['zheng-he-voyages'] }),
  person({ id: 'yu-qian', name: '于谦', lifeText: '1398-1457年', birthYear: 1398, deathYear: 1457, categories: ['政治家', '军事防御'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '土木堡之变后主持北京保卫战，稳定明朝危局。', relatedEventIds: ['tumu-crisis'] }),
  person({ id: 'wang-yangming', name: '王阳明', formalName: '王守仁', lifeText: '1472-1529年', birthYear: 1472, deathYear: 1529, categories: ['思想家', '心学', '军事人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '心学集大成者，提出知行合一，也有平叛军政经历。', relatedEventIds: ['yangming-learning'] }),
  person({ id: 'qi-jiguang', name: '戚继光', lifeText: '1528-1588年', birthYear: 1528, deathYear: 1588, categories: ['将领', '抗倭人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '明代抗倭名将，训练戚家军，改善东南海防。', relatedEventIds: ['anti-wokou'] }),
  person({
    id: 'ming-shenzong',
    name: '明神宗',
    formalName: '朱翊钧',
    lifeText: '1563-1620年',
    birthYear: 1563,
    deathYear: 1620,
    categories: ['帝王君主', '盛衰转折'],
    crossDynastyLabels: ['明'],
    dynastyIds: ['ming'],
    summary: '明代在位时间很长的皇帝，万历初年支持张居正改革，后期怠政与财政军政压力加剧相联系。',
    background: '幼年即位，前期由张居正辅政，继承明中后期财政、边防和官僚体系压力。',
    childhood: '宫廷教育中受太后、司礼监和张居正影响，早期政治运行高度依赖辅政集团。',
    personality: '通识评价常呈现前期受约束、后期抗拒文官压力和长期不上朝的复杂形象。',
    policyInclination: '前期支持或接受张居正改革，后期倾向维护皇权自主并与文官集团长期拉扯。',
    socialContribution: '万历前期改革整顿财政行政，但后期怠政和党争加深明末治理危机。',
    impactSummary: '明神宗是理解张居正改革成效、万历怠政和明末危机积累的重要君主。',
    relatedEventIds: ['zhang-juzheng-reform'],
    resume: emperorResume({
      lifeText: '1563-1620年',
      reignText: '1572-1620年',
      periodLabel: '明代万历时期',
      polity: '明',
      summary: '前期在张居正辅政下推动改革，后期与文官集团冲突并出现长期怠政。',
      actualInfluence: '通过皇帝身份决定改革存续、人事任免和财政军政方向，后期消极治理同样产生深远影响。',
      impact: '万历时期既有改革成效，也有财政、边防和党争问题积累，是明末危机的重要背景。',
    }),
  }),
  person({ id: 'zhang-juzheng', name: '张居正', lifeText: '1525-1582年', birthYear: 1525, deathYear: 1582, categories: ['政治家', '改革人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '主持万历初年改革，推行考成法和一条鞭法，改善财政行政。', relatedEventIds: ['zhang-juzheng-reform'] }),
  person({ id: 'li-shizhen', name: '李时珍', lifeText: '1518-1593年', birthYear: 1518, deathYear: 1593, categories: ['医学家', '科学家'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '《本草纲目》作者，是中国古代医药学代表人物。', relatedEventIds: ['ming-science'] }),
  person({ id: 'xu-guangqi', name: '徐光启', lifeText: '1562-1633年', birthYear: 1562, deathYear: 1633, categories: ['科学家', '政治家', '中西交流'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '推动中西科学交流，参与《几何原本》翻译和农政研究。', relatedEventIds: ['late-ming-western-learning'] }),
  person({ id: 'song-yingxing', name: '宋应星', lifeText: '1587-约1666年', birthYear: 1587, deathYear: 1666, categories: ['科学家', '技术史人物'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '《天工开物》作者，系统记录明代工农业技术。', relatedEventIds: ['ming-science'] }),
  person({ id: 'yuan-chonghuan', name: '袁崇焕', lifeText: '1584-1630年', birthYear: 1584, deathYear: 1630, categories: ['将领', '争议人物'], crossDynastyLabels: ['明末'], dynastyIds: ['ming'], summary: '明末辽东将领，抗击后金，后被崇祯处死，评价复杂。', relatedEventIds: ['ming-qing-transition'] }),
  person({ id: 'li-zicheng', name: '李自成', lifeText: '1606-1645年', birthYear: 1606, deathYear: 1645, categories: ['起义领袖', '明末人物'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '明末农民起义领袖，攻入北京导致明朝灭亡。', relatedEventIds: ['ming-fall'] }),

  person({ id: 'nurhaci', name: '努尔哈赤', lifeText: '1559-1626年', birthYear: 1559, deathYear: 1626, categories: ['后金君主', '开创人物'], crossDynastyLabels: ['明末', '后金'], dynastyIds: ['ming', 'qing'], summary: '统一女真各部，建立后金，是清朝兴起的奠基者。', relatedEventIds: ['later-jin-rise'] }),
  person({ id: 'hong-taiji', name: '皇太极', lifeText: '1592-1643年', birthYear: 1592, deathYear: 1643, categories: ['清朝君主', '制度人物'], crossDynastyLabels: ['后金', '清'], dynastyIds: ['qing'], summary: '改国号为清，完善八旗和国家制度，为入关奠定基础。', relatedEventIds: ['qing-founding'] }),
  person({ id: 'shunzhi-emperor', name: '顺治帝', formalName: '福临', lifeText: '1638-1661年', birthYear: 1638, deathYear: 1661, categories: ['帝王君主'], crossDynastyLabels: ['清'], dynastyIds: ['qing'], summary: '清入关后的第一位皇帝，清政权开始统治全国。', relatedEventIds: ['qing-enters-pass'] }),
  person({ id: 'kangxi-emperor', name: '康熙帝', formalName: '玄烨', lifeText: '1654-1722年', birthYear: 1654, deathYear: 1722, categories: ['帝王君主', '治世君主'], crossDynastyLabels: ['清'], dynastyIds: ['qing'], summary: '平三藩、统一台湾、应对边疆问题，是清前期巩固统治的重要君主。', relatedEventIds: ['kangxi-consolidation'] }),
  person({ id: 'yongzheng-emperor', name: '雍正帝', formalName: '胤禛', lifeText: '1678-1735年', birthYear: 1678, deathYear: 1735, categories: ['帝王君主', '制度人物'], crossDynastyLabels: ['清'], dynastyIds: ['qing'], summary: '整顿吏治、推行摊丁入亩和军机处等制度，强化皇权和财政。', relatedEventIds: ['qing-institutions'] }),
  person({ id: 'qianlong-emperor', name: '乾隆帝', formalName: '弘历', lifeText: '1711-1799年', birthYear: 1711, deathYear: 1799, categories: ['帝王君主', '盛衰转折'], crossDynastyLabels: ['清'], dynastyIds: ['qing'], summary: '清代高峰时期君主，也与后期财政、吏治和闭关困境相联系。', relatedEventIds: ['high-qing'] }),
  person({
    id: 'daoguang-emperor',
    name: '道光帝',
    formalName: '旻宁',
    lifeText: '1782-1850年',
    birthYear: 1782,
    deathYear: 1850,
    categories: ['帝王君主', '晚清转折'],
    crossDynastyLabels: ['清', '晚清'],
    dynastyIds: ['qing'],
    summary: '清代鸦片战争时期皇帝，面对禁烟、海防和对外关系冲击，是中国近代转折的重要背景人物。',
    background: '清中期盛世余绪已衰，财政、吏治、白银外流和边疆海防压力逐渐显现。',
    childhood: '成长于乾嘉以后清廷环境，接受传统皇室教育，对西方海权和国际秩序认识有限。',
    personality: '通识评价多认为其勤俭谨慎、重视整饬，但面对近代国际冲击时决策工具不足。',
    policyInclination: '支持禁烟和维护传统朝贡秩序，倾向以传统行政和军事体系应对新型外部压力。',
    socialContribution: '任用林则徐禁烟，推动清廷正视鸦片问题，但鸦片战争暴露传统治理和海防局限。',
    impactSummary: '道光帝时期标志中国近代危机开端，是理解鸦片战争和晚清转型的关键君主。',
    relatedEventIds: ['opium-war'],
    resume: emperorResume({
      lifeText: '1782-1850年',
      reignText: '1820-1850年',
      periodLabel: '晚清鸦片战争前后',
      polity: '清',
      summary: '处理禁烟、海防和鸦片战争，面对清朝对外关系重大转折。',
      actualInfluence: '以皇帝身份决定禁烟路线、林则徐任用和战和决策，但受信息、制度和军事能力限制。',
      impact: '其统治时期清朝遭遇近代列强冲击，传统天下秩序开始瓦解。',
    }),
  }),
  person({ id: 'lin-zexu', name: '林则徐', lifeText: '1785-1850年', birthYear: 1785, deathYear: 1850, categories: ['政治家', '禁烟人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '主持虎门销烟，是鸦片战争前后中国近代转折的重要人物。', relatedEventIds: ['opium-war'] }),
  person({ id: 'wei-yuan', name: '魏源', lifeText: '1794-1857年', birthYear: 1794, deathYear: 1857, categories: ['思想家', '近代启蒙'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '提出“师夷长技以制夷”，代表晚清开眼看世界的思想转向。', relatedEventIds: ['opium-war'] }),
  person({ id: 'hong-xiuquan', name: '洪秀全', lifeText: '1814-1864年', birthYear: 1814, deathYear: 1864, categories: ['起义领袖', '太平天国'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '太平天国运动领袖，严重冲击清朝统治。', relatedEventIds: ['taiping-rebellion'] }),
  person({ id: 'zeng-guofan', name: '曾国藩', lifeText: '1811-1872年', birthYear: 1811, deathYear: 1872, categories: ['政治家', '湘军', '洋务人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '组织湘军镇压太平天国，并参与洋务运动，是晚清重臣。', relatedEventIds: ['taiping-rebellion', 'self-strengthening'] }),
  person({ id: 'li-hongzhang', name: '李鸿章', lifeText: '1823-1901年', birthYear: 1823, deathYear: 1901, categories: ['政治家', '洋务人物', '外交人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '晚清重臣，主导洋务和外交，甲午战争后评价复杂。', relatedEventIds: ['self-strengthening', 'sino-japanese-war'] }),
  person({ id: 'cixi', name: '慈禧太后', lifeText: '1835-1908年', birthYear: 1835, deathYear: 1908, categories: ['女性政治人物', '晚清权力核心'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '晚清实际权力核心之一，与洋务、戊戌变法、庚子事变等晚清转型困境密切相关。', relatedEventIds: ['hundred-days-reform', 'boxer-protocol'] }),
  person({
    id: 'guangxu-emperor',
    name: '光绪帝',
    formalName: '载湉',
    lifeText: '1871-1908年',
    birthYear: 1871,
    deathYear: 1908,
    categories: ['帝王君主', '维新相关人物', '晚清转型'],
    crossDynastyLabels: ['清', '晚清'],
    dynastyIds: ['qing'],
    summary: '晚清皇帝，支持戊戌变法但受制于慈禧太后和守旧权力结构，变法失败后长期被幽禁。',
    background: '同治帝无嗣后入承大统，幼年即位并长期处于慈禧太后影响之下。',
    childhood: '宫廷成长环境高度受摄政权力控制，缺乏稳定独立执政空间。',
    personality: '通识评价常强调其求变愿望和政治经验不足并存，面对复杂权力结构时缺乏实际控制力。',
    policyInclination: '倾向支持维新变法、学习西方制度技术，试图通过诏令推动制度改革。',
    socialContribution: '其支持使维新派改革进入中央政治议程，戊戌变法成为晚清制度转型的重要尝试。',
    impactSummary: '光绪帝体现晚清皇权名义与实际权力分离，也体现改革愿望与政治执行能力之间的断裂。',
    relatedEventIds: ['hundred-days-reform', 'boxer-protocol'],
    resume: emperorResume({
      lifeText: '1871-1908年',
      reignText: '1875-1908年',
      periodLabel: '晚清维新变法时期',
      polity: '清',
      summary: '名义上为清朝最高统治者，支持戊戌变法并发布改革诏令。',
      actualInfluence: '在变法期间借皇帝名义推动制度调整，但军政实权受慈禧太后和守旧集团制约。',
      impact: '戊戌变法失败后被幽禁，成为晚清改革受挫和权力结构僵化的象征。',
    }),
  }),
  person({ id: 'kang-youwei', name: '康有为', lifeText: '1858-1927年', birthYear: 1858, deathYear: 1927, categories: ['思想家', '维新人物'], crossDynastyLabels: ['晚清', '近代'], dynastyIds: ['qing'], summary: '维新派代表人物，推动戊戌变法。', relatedEventIds: ['hundred-days-reform'] }),
  person({ id: 'liang-qichao', name: '梁启超', lifeText: '1873-1929年', birthYear: 1873, deathYear: 1929, categories: ['思想家', '维新人物', '文学家'], crossDynastyLabels: ['晚清', '近代'], dynastyIds: ['qing'], summary: '维新派和近代启蒙思想重要人物，影响政治思想和新文体。', relatedEventIds: ['hundred-days-reform'] }),
  person({ id: 'tan-sitong', name: '谭嗣同', lifeText: '1865-1898年', birthYear: 1865, deathYear: 1898, categories: ['维新人物', '烈士形象'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '戊戌六君子之一，变法失败后遇害，成为近代改革牺牲象征。', relatedEventIds: ['hundred-days-reform'] }),
  person({ id: 'sun-yat-sen', name: '孙中山', formalName: '孙文', lifeText: '1866-1925年', birthYear: 1866, deathYear: 1925, categories: ['革命人物', '近代人物'], crossDynastyLabels: ['晚清', '民国'], dynastyIds: ['qing'], summary: '领导资产阶级民主革命，提出三民主义，是辛亥革命和民国建立的重要人物。', relatedEventIds: ['xinhai-revolution'] }),

  person({ id: 'king-helu-wu', name: '吴王阖闾', formalName: '姬光', lifeText: '？-前496年', deathYear: -496, categories: ['诸侯君主', '春秋人物'], crossDynastyLabels: ['春秋', '吴国'], dynastyIds: ['eastern-zhou'], summary: '春秋后期吴国君主，任用伍子胥、孙武等人强吴攻楚，使吴国进入霸权竞争。', relatedEventIds: ['wu-yue-hegemony'] }),
  person({ id: 'wu-zixu', name: '伍子胥', lifeText: '？-前484年', deathYear: -484, categories: ['政治家', '军事人物', '春秋人物'], crossDynastyLabels: ['春秋', '楚', '吴'], dynastyIds: ['eastern-zhou'], summary: '春秋末期重要谋臣和军事人物，辅佐吴国强盛，因劝谏夫差防越而被迫自尽，历史形象兼具复仇与忠谏。', relatedEventIds: ['wu-yue-hegemony'] }),
  person({ id: 'fuchai', name: '吴王夫差', lifeText: '？-前473年', deathYear: -473, categories: ['诸侯君主', '亡国君主', '春秋人物'], crossDynastyLabels: ['春秋', '吴国'], dynastyIds: ['eastern-zhou'], summary: '吴国末代君主，曾击败越国并参与争霸，后轻视越国恢复与伍子胥劝谏，最终为越所灭。', relatedEventIds: ['wu-yue-hegemony'] }),
  person({ id: 'fan-li', name: '范蠡', lifeText: '生卒年不详', categories: ['政治家', '谋臣', '商业传说人物'], crossDynastyLabels: ['春秋', '越国'], dynastyIds: ['eastern-zhou'], summary: '辅佐越王勾践灭吴，后功成身退，传统叙事中兼具政治谋略和商业智慧形象。', relatedEventIds: ['wu-yue-hegemony'] }),
  person({ id: 'mozi', name: '墨子', formalName: '墨翟', lifeText: '约前468-约前376年', birthYear: -468, deathYear: -376, categories: ['思想家', '墨家', '技术实践人物'], crossDynastyLabels: ['战国'], dynastyIds: ['eastern-zhou'], summary: '墨家创始人，主张兼爱、非攻、尚贤、节用，代表战国诸子中重实践和反战的一支思想传统。', relatedEventIds: ['mozi-thought'] }),
  person({ id: 'king-wei-qi', name: '齐威王', lifeText: '？-前320年', deathYear: -320, categories: ['诸侯君主', '战国人物'], crossDynastyLabels: ['战国', '齐国'], dynastyIds: ['eastern-zhou'], summary: '战国时期齐国君主，任用邹忌、田忌、孙膑等人物，使齐国在桂陵、马陵等战役中形成强势地位。', relatedEventIds: ['guiling-maling-battles'] }),
  person({ id: 'king-hui-wei', name: '魏惠王', lifeText: '前400-前319年', birthYear: -400, deathYear: -319, categories: ['诸侯君主', '战国人物'], crossDynastyLabels: ['战国', '魏国'], dynastyIds: ['eastern-zhou'], summary: '战国魏国君主，迁都大梁，魏国在其时期先强后受挫，桂陵、马陵之战标志魏国霸权衰退。', relatedEventIds: ['guiling-maling-battles'] }),
  person({ id: 'sun-bin', name: '孙膑', lifeText: '生卒年不详', categories: ['军事家', '兵家', '战国人物'], crossDynastyLabels: ['战国', '齐国'], dynastyIds: ['eastern-zhou'], summary: '战国兵家人物，辅佐齐国在桂陵、马陵等战役中击败魏军，其军事思想被后世归入兵家传统。', relatedEventIds: ['guiling-maling-battles'] }),
  person({ id: 'pang-juan', name: '庞涓', lifeText: '？-前342年', deathYear: -342, categories: ['将领', '战国人物'], crossDynastyLabels: ['战国', '魏国'], dynastyIds: ['eastern-zhou'], summary: '战国魏将，传统叙事中与孙膑形成强烈对照，马陵之战失败身亡，象征魏国军事优势转折。', relatedEventIds: ['guiling-maling-battles'] }),
  person({ id: 'tian-ji', name: '田忌', lifeText: '生卒年不详', categories: ['将领', '齐国人物'], crossDynastyLabels: ['战国', '齐国'], dynastyIds: ['eastern-zhou'], summary: '战国齐将，任用孙膑谋略对抗魏军，“田忌赛马”故事也常用于说明策略排序。', relatedEventIds: ['guiling-maling-battles'] }),

  person({ id: 'yuan-shao', name: '袁绍', lifeText: '？-202年', deathYear: 202, categories: ['军阀', '东汉末人物'], crossDynastyLabels: ['东汉末'], dynastyIds: ['eastern-han'], summary: '东汉末北方强大军政势力首领，官渡之战败于曹操后，其集团迅速衰落。', relatedEventIds: ['guandu-battle'] }),
  person({ id: 'cao-pi', name: '曹丕', formalName: '魏文帝', lifeText: '187-226年', birthYear: 187, deathYear: 226, categories: ['帝王君主', '文学人物'], crossDynastyLabels: ['东汉末', '三国魏'], dynastyIds: ['eastern-han', 'three-kingdoms'], summary: '曹魏开国皇帝，代汉称帝，推动九品中正制等制度安排，文学上也有重要地位。', relatedEventIds: ['three-kingdoms-formation', 'sima-usurpation'] }),
  person({ id: 'lu-xun-wu', name: '陆逊', lifeText: '183-245年', birthYear: 183, deathYear: 245, categories: ['将领', '政治家', '吴国人物'], crossDynastyLabels: ['东汉末', '三国吴'], dynastyIds: ['eastern-han', 'three-kingdoms'], summary: '孙吴名将，夷陵之战击败刘备，后长期参与吴国军政，是三国吴的重要支柱。', relatedEventIds: ['yiling-battle'] }),
  person({ id: 'sima-zhao', name: '司马昭', lifeText: '211-265年', birthYear: 211, deathYear: 265, categories: ['权臣', '政治家', '军事人物'], crossDynastyLabels: ['三国魏', '西晋前史'], dynastyIds: ['three-kingdoms', 'western-jin'], summary: '曹魏后期司马氏权臣，灭蜀并强化司马氏代魏基础，是西晋建立前的关键人物。', relatedEventIds: ['sima-usurpation'] }),

  person({ id: 'li-jing-tang', name: '李靖', lifeText: '571-649年', birthYear: 571, deathYear: 649, categories: ['将领', '军事家', '唐朝人物'], crossDynastyLabels: ['隋末', '唐初'], dynastyIds: ['sui', 'tang'], summary: '唐初名将，参与统一战争并北破东突厥，是唐初军事扩张和边疆稳定的重要人物。', relatedEventIds: ['tang-tujue-campaign'] }),
  person({ id: 'fang-xuanling', name: '房玄龄', lifeText: '579-648年', birthYear: 579, deathYear: 648, categories: ['政治家', '宰辅', '唐朝人物'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '唐太宗时期宰相，与杜如晦并称“房谋杜断”，代表贞观政治中的制度和行政执行能力。', relatedEventIds: ['zhenguan-ministers'] }),
  person({ id: 'du-ruhui', name: '杜如晦', lifeText: '585-630年', birthYear: 585, deathYear: 630, categories: ['政治家', '宰辅', '唐朝人物'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '唐太宗时期宰相，与房玄龄共同辅佐贞观政治，常被用于说明初唐君臣协同。', relatedEventIds: ['zhenguan-ministers'] }),
  person({ id: 'jian-zhen', name: '鉴真', lifeText: '688-763年', birthYear: 688, deathYear: 763, categories: ['僧人', '文化交流', '唐朝人物'], crossDynastyLabels: ['唐', '日本奈良时代'], dynastyIds: ['tang'], summary: '唐代高僧，东渡日本传播佛教戒律、医药和建筑艺术，是中日文化交流代表人物。', relatedEventIds: ['jianzhen-east-voyage'] }),

  person({ id: 'song-zhenzong', name: '宋真宗', formalName: '赵恒', lifeText: '968-1022年', birthYear: 968, deathYear: 1022, categories: ['帝王君主', '北宋人物'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '北宋皇帝，澶渊之盟时期的最高统治者，其时期确立宋辽长期和平格局，也有封禅和天书政治争议。', relatedEventIds: ['chanyuan-treaty'] }),
  person({ id: 'kou-zhun', name: '寇准', lifeText: '961-1023年', birthYear: 961, deathYear: 1023, categories: ['政治家', '宰辅', '主战人物'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '北宋宰相，澶渊之役中主张宋真宗亲征稳定军心，是宋辽关系转折的重要人物。', relatedEventIds: ['chanyuan-treaty'] }),
  person({ id: 'xiao-chuo', name: '萧太后', formalName: '萧绰', lifeText: '953-1009年', birthYear: 953, deathYear: 1009, categories: ['女性政治人物', '辽朝人物', '军事政治人物'], crossDynastyLabels: ['辽', '北宋并立'], dynastyIds: ['song-liao-jin-xixia'], summary: '辽景宗皇后、辽圣宗时期摄政太后，参与辽宋战争和澶渊之盟，是宋辽格局中的关键女性政治人物。', relatedEventIds: ['chanyuan-treaty'] }),
  person({ id: 'fan-zhongyan', name: '范仲淹', lifeText: '989-1052年', birthYear: 989, deathYear: 1052, categories: ['政治家', '改革人物', '文学家'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '北宋政治家和文学家，主持庆历新政，提出士大夫担当理想，是宋代政治文化核心人物。', relatedEventIds: ['qingli-reform', 'song-culture'] }),
  person({ id: 'ouyang-xiu', name: '欧阳修', lifeText: '1007-1072年', birthYear: 1007, deathYear: 1072, categories: ['文学家', '史学家', '政治家'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '北宋文学革新和古文运动领袖之一，参与庆历新政并提携苏轼等后辈。', relatedEventIds: ['qingli-reform', 'song-literary-network'] }),
  person({ id: 'han-shizhong', name: '韩世忠', lifeText: '1089-1151年', birthYear: 1089, deathYear: 1151, categories: ['将领', '抗金人物'], crossDynastyLabels: ['南宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '南宋抗金名将，黄天荡等战事中抵抗金军，与岳飞并为南宋初年主战将领代表。', relatedEventIds: ['song-jin-war', 'huangtiandang-battle'] }),
  person({ id: 'li-qingzhao', name: '李清照', lifeText: '1084-约1155年', birthYear: 1084, deathYear: 1155, categories: ['文学家', '词人', '女性文化人物'], crossDynastyLabels: ['北宋', '南宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '宋代女词人，作品经历北宋繁华和南渡离乱，是宋词与女性书写的重要代表。', relatedEventIds: ['song-culture', 'southern-song-patriotic-literature'] }),
  person({ id: 'lu-you', name: '陆游', lifeText: '1125-1210年', birthYear: 1125, deathYear: 1210, categories: ['文学家', '诗人', '爱国文学'], crossDynastyLabels: ['南宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '南宋诗人，作品大量表达恢复中原和忧国情怀，是南宋爱国文学代表。', relatedEventIds: ['southern-song-patriotic-literature'] }),
  person({ id: 'xin-qiji', name: '辛弃疾', lifeText: '1140-1207年', birthYear: 1140, deathYear: 1207, categories: ['文学家', '词人', '抗金人物'], crossDynastyLabels: ['金', '南宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '南宋豪放派词人，早年参与抗金归宋，词作兼具军事抱负和政治失意。', relatedEventIds: ['southern-song-patriotic-literature'] }),

  person({ id: 'marco-polo', name: '马可·波罗', lifeText: '1254-1324年', birthYear: 1254, deathYear: 1324, categories: ['旅行者', '中外交流人物'], crossDynastyLabels: ['元', '欧洲中世纪'], dynastyIds: ['yuan'], summary: '威尼斯旅行者，关于元代中国的游记在欧洲传播东方知识，具体经历细节存在学术讨论。', relatedEventIds: ['yuan-cultural-exchange'] }),
  person({ id: 'zhao-mengfu', name: '赵孟頫', lifeText: '1254-1322年', birthYear: 1254, deathYear: 1322, categories: ['书画家', '文学家', '元代人物'], crossDynastyLabels: ['南宋末', '元'], dynastyIds: ['song-liao-jin-xixia', 'yuan'], summary: '宋宗室出身的元代书画家，入仕元朝并形成重要书画风格，是宋元文化转折中的复杂人物。', relatedEventIds: ['yuan-art-literati'] }),
  person({ id: 'huang-daopo', name: '黄道婆', lifeText: '约1245-约1330年', birthYear: 1245, deathYear: 1330, categories: ['技术人物', '纺织人物', '女性科技人物'], crossDynastyLabels: ['宋末', '元'], dynastyIds: ['song-liao-jin-xixia', 'yuan'], summary: '元代棉纺织技术传播和改良代表人物，推动江南棉纺织业发展。', relatedEventIds: ['cotton-textile-technology'] }),

  person({ id: 'wei-zhongxian', name: '魏忠贤', lifeText: '1568-1627年', birthYear: 1568, deathYear: 1627, categories: ['宦官', '权臣', '争议人物'], crossDynastyLabels: ['明末'], dynastyIds: ['ming'], summary: '明末宦官权臣，专权和党争加剧政治腐败，崇祯即位后被清算。', relatedEventIds: ['late-ming-eunuch-politics'] }),
  person({ id: 'chongzhen-emperor', name: '崇祯帝', formalName: '朱由检', lifeText: '1611-1644年', birthYear: 1611, deathYear: 1644, categories: ['帝王君主', '亡国君主', '明末人物'], crossDynastyLabels: ['明末'], dynastyIds: ['ming'], summary: '明朝末代皇帝，清算魏忠贤、勤于政务但难挽财政、边防和农民战争危机，李自成入京后自缢。', relatedEventIds: ['late-ming-eunuch-politics', 'ming-fall'] }),
  person({ id: 'dorgon', name: '多尔衮', lifeText: '1612-1650年', birthYear: 1612, deathYear: 1650, categories: ['摄政王', '军事人物', '清初人物'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '清初摄政王，主导清军入关和定鼎中原，是明清鼎革中的关键权力人物。', relatedEventIds: ['qing-enters-pass', 'shanhai-pass-battle'] }),
  person({ id: 'wu-sangui', name: '吴三桂', lifeText: '1612-1678年', birthYear: 1612, deathYear: 1678, categories: ['将领', '藩王', '争议人物'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '明末清初辽东将领，山海关决策影响清军入关，后发动三藩之乱，历史评价复杂。', relatedEventIds: ['shanhai-pass-battle', 'kangxi-consolidation'] }),
  person({ id: 'zheng-chenggong', name: '郑成功', formalName: '郑森', lifeText: '1624-1662年', birthYear: 1624, deathYear: 1662, categories: ['军事人物', '海上势力', '民族英雄形象'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '南明和海上抗清力量代表，驱逐荷兰殖民者、收复台湾，在海疆史和民族记忆中影响突出。', relatedEventIds: ['zheng-success-taiwan'] }),
  person({ id: 'shi-lang', name: '施琅', lifeText: '1621-1696年', birthYear: 1621, deathYear: 1696, categories: ['将领', '海防人物', '争议人物'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '清初水师将领，攻取台湾郑氏政权并推动清廷设置台湾府，是海疆治理转折人物。', relatedEventIds: ['qing-taiwan-unification'] }),
  person({ id: 'heshen', name: '和珅', lifeText: '1750-1799年', birthYear: 1750, deathYear: 1799, categories: ['权臣', '贪腐典型', '争议人物'], crossDynastyLabels: ['乾隆', '嘉庆初'], dynastyIds: ['qing'], summary: '乾隆后期权臣，因巨额贪腐被嘉庆清算，常被用于理解清中期吏治腐败和盛世转衰。', relatedEventIds: ['heshen-corruption'] }),
  person({ id: 'zuo-zongtang', name: '左宗棠', lifeText: '1812-1885年', birthYear: 1812, deathYear: 1885, categories: ['政治家', '军事人物', '洋务人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '晚清重臣，镇压内乱、推动洋务并收复新疆，是晚清边疆和近代工业建设的重要人物。', relatedEventIds: ['recover-xinjiang', 'self-strengthening'] }),
  person({ id: 'zhang-zhidong', name: '张之洞', lifeText: '1837-1909年', birthYear: 1837, deathYear: 1909, categories: ['政治家', '洋务人物', '晚清新政人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '晚清重臣，主张“中学为体，西学为用”，参与洋务和清末新政，是近代教育实业转型人物。', relatedEventIds: ['self-strengthening', 'late-qing-new-policy'] }),
  person({ id: 'deng-shichang', name: '邓世昌', lifeText: '1849-1894年', birthYear: 1849, deathYear: 1894, categories: ['海军将领', '甲午人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '北洋海军将领，黄海海战中殉国，是甲午战争和近代海防失败记忆中的代表人物。', relatedEventIds: ['sino-japanese-war'] }),
  person({ id: 'yuan-shikai', name: '袁世凯', lifeText: '1859-1916年', birthYear: 1859, deathYear: 1916, categories: ['政治家', '军事人物', '清末民初人物'], crossDynastyLabels: ['晚清', '民国'], dynastyIds: ['qing'], summary: '清末北洋军政人物，戊戌政变、清末新政和辛亥革命后政权转移均与其相关，评价高度复杂。', relatedEventIds: ['hundred-days-reform', 'late-qing-new-policy', 'xinhai-revolution'] }),
  person({ id: 'qiu-jin', name: '秋瑾', lifeText: '1875-1907年', birthYear: 1875, deathYear: 1907, categories: ['革命人物', '女性人物', '近代启蒙'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '晚清革命者和女性解放倡导者，牺牲后成为反清革命和近代女性觉醒的重要象征。', relatedEventIds: ['qiu-jin-revolution', 'xinhai-revolution'] }),

  person({ id: 'zhou-ping-wang', name: '周平王', formalName: '姬宜臼', lifeText: '？-前720年', deathYear: -720, categories: ['周王', '东周开端人物'], crossDynastyLabels: ['西周末', '东周初'], dynastyIds: ['western-zhou', 'eastern-zhou'], summary: '犬戎破镐京后东迁洛邑，开启东周，是西周到春秋秩序转折的标志人物。', relatedEventIds: ['western-zhou-fall'] }),
  person({ id: 'qin-mu-gong', name: '秦穆公', formalName: '嬴任好', lifeText: '？-前621年', deathYear: -621, categories: ['春秋霸主', '诸侯君主'], crossDynastyLabels: ['春秋', '秦国'], dynastyIds: ['eastern-zhou'], summary: '春秋秦国君主，任用百里奚等贤臣，经营西戎并参与秦晋关系，是秦国早期崛起的重要君主。', relatedEventIds: ['qin-mu-hegemony'] }),
  person({ id: 'baili-xi', name: '百里奚', lifeText: '生卒年不详', categories: ['政治家', '辅政人物', '春秋人物'], crossDynastyLabels: ['春秋', '秦国'], dynastyIds: ['eastern-zhou'], summary: '秦穆公时期贤臣，传统叙事中以“五羖大夫”形象入秦辅政，是春秋用人故事的代表。', relatedEventIds: ['qin-mu-hegemony'] }),
  person({ id: 'chu-cheng-wang', name: '楚成王', lifeText: '？-前626年', deathYear: -626, categories: ['诸侯君主', '春秋人物'], crossDynastyLabels: ['春秋', '楚国'], dynastyIds: ['eastern-zhou'], summary: '春秋楚国君主，与晋文公时期的晋楚争霸和城濮之战相关，是楚国北上争霸的重要节点人物。', relatedEventIds: ['chengpu-battle'] }),
  person({ id: 'zhao-lie-hou', name: '赵烈侯', lifeText: '？-前400年', deathYear: -400, categories: ['诸侯君主', '战国初期'], crossDynastyLabels: ['战国', '赵国'], dynastyIds: ['eastern-zhou'], summary: '韩赵魏被周天子承认为诸侯时的赵氏君主之一，是三家分晋进入战国格局的代表人物。', relatedEventIds: ['three-families-jin'] }),
  person({ id: 'han-jing-hou', name: '韩景侯', lifeText: '？-前400年', deathYear: -400, categories: ['诸侯君主', '战国初期'], crossDynastyLabels: ['战国', '韩国'], dynastyIds: ['eastern-zhou'], summary: '韩氏被承认为诸侯时的代表君主之一，与魏文侯、赵烈侯共同体现三家分晋后的战国新秩序。', relatedEventIds: ['three-families-jin'] }),
  person({ id: 'li-kui', name: '李悝', lifeText: '约前455-前395年', birthYear: -455, deathYear: -395, categories: ['政治家', '改革人物', '法家先驱'], crossDynastyLabels: ['战国', '魏国'], dynastyIds: ['eastern-zhou'], summary: '魏文侯时期改革家，主持变法并编《法经》，是战国制度变法和法家政治的重要先声。', relatedEventIds: ['li-kui-reform'] }),
  person({ id: 'wu-qi', name: '吴起', lifeText: '？-前381年', deathYear: -381, categories: ['军事家', '改革人物', '兵家'], crossDynastyLabels: ['战国', '魏国', '楚国'], dynastyIds: ['eastern-zhou'], summary: '战国军事家和改革人物，先仕魏后入楚变法，兼具兵家实践和制度改革影响。', relatedEventIds: ['wu-qi-reform'] }),
  person({ id: 'zou-ji', name: '邹忌', lifeText: '生卒年不详', categories: ['政治家', '谏臣', '齐国人物'], crossDynastyLabels: ['战国', '齐国'], dynastyIds: ['eastern-zhou'], summary: '齐威王时期重臣，“邹忌讽齐王纳谏”体现战国君主纳谏和国家治理改进的通识故事。', relatedEventIds: ['zou-ji-remonstrance'] }),
  person({ id: 'yan-zhao-wang', name: '燕昭王', formalName: '姬职', lifeText: '？-前279年', deathYear: -279, categories: ['诸侯君主', '战国人物'], crossDynastyLabels: ['战国', '燕国'], dynastyIds: ['eastern-zhou'], summary: '战国燕国君主，筑黄金台招贤，任用乐毅伐齐，使燕国短暂崛起。', relatedEventIds: ['yue-yi-attacks-qi'] }),
  person({ id: 'yue-yi', name: '乐毅', lifeText: '生卒年不详', categories: ['将领', '军事家', '战国人物'], crossDynastyLabels: ['战国', '燕国'], dynastyIds: ['eastern-zhou'], summary: '燕昭王任用的名将，率联军伐齐，一度攻下齐国大量城邑，是战国军事史重要人物。', relatedEventIds: ['yue-yi-attacks-qi'] }),
  person({ id: 'tian-dan', name: '田单', lifeText: '生卒年不详', categories: ['将领', '齐国人物'], crossDynastyLabels: ['战国', '齐国'], dynastyIds: ['eastern-zhou'], summary: '齐国将领，以即墨坚守和火牛阵反攻燕军著称，是齐国复国叙事的核心人物。', relatedEventIds: ['tian-dan-restores-qi'] }),
  person({ id: 'zhao-wuling-wang', name: '赵武灵王', formalName: '赵雍', lifeText: '约前340-前295年', birthYear: -340, deathYear: -295, categories: ['诸侯君主', '改革人物'], crossDynastyLabels: ['战国', '赵国'], dynastyIds: ['eastern-zhou'], summary: '推行胡服骑射，增强赵国骑兵和边疆机动能力，是战国军事制度变革的重要君主。', relatedEventIds: ['hufu-qishe'] }),
  person({ id: 'xinling-jun', name: '信陵君', formalName: '魏无忌', lifeText: '？-前243年', deathYear: -243, categories: ['战国四公子', '政治军事人物'], crossDynastyLabels: ['战国', '魏国'], dynastyIds: ['eastern-zhou'], summary: '魏国公子，窃符救赵故事体现战国合纵抗秦和门客政治，是战国四公子代表。', relatedEventIds: ['xinling-jun-rescues-zhao'] }),
  person({ id: 'yan-taizi-dan', name: '燕太子丹', lifeText: '？-前226年', deathYear: -226, categories: ['诸侯贵族', '战国人物'], crossDynastyLabels: ['战国', '燕国'], dynastyIds: ['eastern-zhou'], summary: '燕国太子，策划荆轲刺秦王，反映战国末期弱国面对秦统一压力的极端选择。', relatedEventIds: ['jing-ke-assassinates-qin'] }),
  person({ id: 'jing-ke', name: '荆轲', lifeText: '？-前227年', deathYear: -227, categories: ['刺客', '战国人物', '文化形象'], crossDynastyLabels: ['战国', '燕国', '秦统一前夕'], dynastyIds: ['eastern-zhou'], summary: '受燕太子丹委托刺杀秦王政未遂，成为战国末期反秦行动和文学叙事中的著名人物。', relatedEventIds: ['jing-ke-assassinates-qin'] }),

  person({ id: 'lu-zhi', name: '吕后', formalName: '吕雉', lifeText: '前241-前180年', birthYear: -241, deathYear: -180, categories: ['女性政治人物', '汉初权力核心'], crossDynastyLabels: ['秦末', '西汉初'], dynastyIds: ['qin', 'western-han'], summary: '刘邦皇后，汉初临朝称制，吕氏集团和功臣集团关系影响汉初政治稳定。', relatedEventIds: ['empress-lu-regency'] }),
  person({ id: 'zhou-bo', name: '周勃', lifeText: '？-前169年', deathYear: -169, categories: ['将领', '功臣', '汉初人物'], crossDynastyLabels: ['秦末', '西汉初'], dynastyIds: ['qin', 'western-han'], summary: '汉初功臣，参与平定诸吕并迎立汉文帝，是功臣集团维护刘氏政权的重要人物。', relatedEventIds: ['empress-lu-regency', 'wenjing-rule'] }),
  person({ id: 'chao-cuo', name: '晁错', lifeText: '前200-前154年', birthYear: -200, deathYear: -154, categories: ['政治家', '削藩人物'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '汉景帝时期主张削藩，七国之乱前被杀，是中央集权与诸侯王矛盾的关键人物。', relatedEventIds: ['rebellion-seven-states'] }),
  person({ id: 'liu-bi', name: '吴王刘濞', lifeText: '前215-前154年', birthYear: -215, deathYear: -154, categories: ['诸侯王', '叛乱人物'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '七国之乱首要诸侯王之一，反对削藩举兵失败，体现汉初封国问题。', relatedEventIds: ['rebellion-seven-states'] }),
  person({ id: 'huo-guang', name: '霍光', lifeText: '？-前68年', deathYear: -68, categories: ['辅政人物', '权臣', '西汉人物'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '汉武帝托孤重臣，辅佐汉昭帝、拥立汉宣帝，对昭宣中兴和皇权外朝关系影响很大。', relatedEventIds: ['zhaoxuan-revival', 'huo-guang-regency'] }),
  person({ id: 'han-zhao-di', name: '汉昭帝', formalName: '刘弗陵', lifeText: '前94-前74年', birthYear: -94, deathYear: -74, categories: ['帝王君主', '西汉人物'], crossDynastyLabels: ['西汉'], dynastyIds: ['western-han'], summary: '汉武帝少子，霍光辅政时期维持西汉政治稳定，与汉宣帝时期共同构成“昭宣中兴”前段。', relatedEventIds: ['zhaoxuan-revival', 'huo-guang-regency'] }),
  person({ id: 'zhang-zhongjing', name: '张仲景', lifeText: '约150-219年', birthYear: 150, deathYear: 219, categories: ['医学家', '东汉人物'], crossDynastyLabels: ['东汉末'], dynastyIds: ['eastern-han'], summary: '东汉末医学家，《伤寒杂病论》传统作者，被尊为“医圣”，与华佗同为汉末医学代表。', relatedEventIds: ['eastern-han-medicine', 'shanghan-zabinglun'] }),

  person({ id: 'xie-xuan', name: '谢玄', lifeText: '343-388年', birthYear: 343, deathYear: 388, categories: ['将领', '东晋人物'], crossDynastyLabels: ['东晋'], dynastyIds: ['eastern-jin-sixteen'], summary: '东晋名将，淝水之战前线指挥核心之一，谢安稳定后方、谢玄统兵作战共同促成东晋胜利。', relatedEventIds: ['feishui-battle'] }),
  person({ id: 'wang-meng', name: '王猛', lifeText: '325-375年', birthYear: 325, deathYear: 375, categories: ['政治家', '前秦人物', '辅政人物'], crossDynastyLabels: ['十六国', '前秦'], dynastyIds: ['eastern-jin-sixteen'], summary: '辅佐苻坚整顿前秦内政和军政，是前秦统一北方的重要制度人物。', relatedEventIds: ['wang-meng-governs-qin'] }),
  person({ id: 'gu-kaizhi', name: '顾恺之', lifeText: '约348-约409年', birthYear: 348, deathYear: 409, categories: ['画家', '文化人物'], crossDynastyLabels: ['东晋'], dynastyIds: ['eastern-jin-sixteen'], summary: '东晋画家和理论人物，人物画传统代表，是东晋士族文化和艺术史的重要人物。', relatedEventIds: ['eastern-jin-culture'] }),
  person({ id: 'jia-sixie', name: '贾思勰', lifeText: '生卒年不详', categories: ['农学家', '科学技术人物'], crossDynastyLabels: ['北魏', '南北朝'], dynastyIds: ['southern-northern'], summary: '北魏农学家，《齐民要术》作者，系统总结农牧生产经验，是中国古代农学代表人物。', relatedEventIds: ['qimin-yaoshu'] }),
  person({ id: 'li-daoyuan', name: '郦道元', lifeText: '约466-527年', birthYear: 466, deathYear: 527, categories: ['地理学家', '文学人物'], crossDynastyLabels: ['北魏'], dynastyIds: ['southern-northern'], summary: '北魏地理学家，《水经注》作者，兼具地理、历史和文学价值。', relatedEventIds: ['shuijingzhu'] }),

  person({ id: 'gao-jiong', name: '高颎', lifeText: '541-607年', birthYear: 541, deathYear: 607, categories: ['政治家', '隋朝人物'], crossDynastyLabels: ['隋'], dynastyIds: ['sui'], summary: '隋文帝重臣，参与隋初制度建设和统一前后政务，是隋朝建立稳定秩序的重要宰辅。', relatedEventIds: ['sui-unification'] }),
  person({ id: 'yang-su', name: '杨素', lifeText: '544-606年', birthYear: 544, deathYear: 606, categories: ['将领', '政治家', '隋朝人物'], crossDynastyLabels: ['隋'], dynastyIds: ['sui'], summary: '隋朝重臣和将领，参与平陈统一及隋初军政事务，后世评价兼具功业和权势争议。', relatedEventIds: ['sui-unification'] }),
  person({ id: 'li-chun', name: '李春', lifeText: '生卒年不详', categories: ['工程技术人物', '隋朝人物'], crossDynastyLabels: ['隋'], dynastyIds: ['sui'], summary: '隋代工匠，赵州桥传统设计者，代表古代桥梁工程技术成就。', relatedEventIds: ['zhaozhou-bridge'] }),
  person({ id: 'yang-guifei', name: '杨贵妃', formalName: '杨玉环', lifeText: '719-756年', birthYear: 719, deathYear: 756, categories: ['宫廷人物', '女性文化形象'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '唐玄宗贵妃，安史之乱和马嵬驿叙事中的核心宫廷人物，后世文学艺术影响极大。', relatedEventIds: ['an-shi-rebellion', 'mawei-incident'] }),
  person({ id: 'shi-siming', name: '史思明', lifeText: '703-761年', birthYear: 703, deathYear: 761, categories: ['叛乱人物', '将领'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '安史之乱后期叛军首领之一，与安禄山并称“安史”，使唐朝战乱延续。', relatedEventIds: ['an-shi-rebellion'] }),
  person({ id: 'yan-zhenqing', name: '颜真卿', lifeText: '709-785年', birthYear: 709, deathYear: 785, categories: ['书法家', '政治人物', '忠烈形象'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '唐代书法家和忠烈政治人物，安史之乱中坚守反叛，书法与人格形象共同影响后世。', relatedEventIds: ['an-shi-rebellion', 'tang-calligraphy'] }),
  person({ id: 'liu-zongyuan', name: '柳宗元', lifeText: '773-819年', birthYear: 773, deathYear: 819, categories: ['文学家', '思想家', '唐朝人物'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '唐代古文运动代表，与韩愈并称“韩柳”，其山水游记和政论影响深远。', relatedEventIds: ['tang-literary-reform'] }),

  person({
    id: 'gao-huan', name: '高欢', lifeText: '496-547年', birthYear: 496, deathYear: 547,
    categories: ['政治家', '军事家', '东魏权臣', '北齐奠基人'], crossDynastyLabels: ['北魏末', '东魏'], dynastyIds: ['southern-northern'],
    summary: '北魏末军事政治领袖，消灭尔朱氏势力后控制孝静帝建立东魏格局，为其子高洋建立北齐奠定军政基础。',
    background: '北魏六镇动乱、河阴之变和尔朱氏控制洛阳后，北方军镇将领与地方豪强成为重组政权的主要力量。高欢在这一环境中整合军队、官僚和河北资源，逐步取代尔朱集团。',
    childhood: '成长于北魏北边军镇社会，早年家境和族属细节在不同材料中有复杂叙述。可确认的成长背景是他熟悉边镇军人、鲜卑与汉地官僚之间的合作与紧张。',
    personality: '善于结交将领、分配利益和吸纳不同背景人才，政治判断灵活，能把军镇同盟转化为持续政权；其统治也依赖强军和权臣控制。',
    policyInclination: '以稳定河北税赋、维持军队、整合鲜卑军镇与汉地官僚为主，保留元魏皇帝作为名义正统，实际由高氏掌握军政。',
    socialContribution: '建立东魏的实际军政秩序，使北魏崩解后的河北地区重新形成中央，也把北方竞争转入高氏与宇文氏长期对峙。',
    impactSummary: '高欢的历史作用不在帝号，而在于他以丞相和军事领袖身份控制东魏，并把军队、邺城中枢和人才集团传给北齐建国者。',
    relatedEventIds: ['heyin-and-northern-wei-split'],
    resume: [
      { timeText: '520年代-531年', periodLabel: '北魏军镇动乱与尔朱氏时期', title: '军镇将领 / 晋州刺史等职', nominalDuty: '率军平叛、管理州郡军政并维持所部军队和粮饷。', authorityScope: '权限以所部军队和任职州郡为主，受北魏朝廷与尔朱军政集团名义约束。', actualInfluence: '在军镇与地方将领中建立人脉，逐步形成能脱离尔朱氏独立行动的军事集团。', modernEquivalent: '职能近似边区军政长官与方面军将领合一，不对应现代单一职位。', impact: '为后来击败尔朱氏、控制北魏朝廷积累军队和同盟资源。' },
      { timeText: '531-534年', periodLabel: '击败尔朱氏与控制洛阳', title: '大丞相 / 北魏实际军政主导者', nominalDuty: '以朝廷丞相和军事统帅身份讨伐尔朱氏，安排皇帝、中央官员和北方军政。', authorityScope: '实际调动河北主力军队、控制中枢人事和重要州镇，但仍使用元魏皇帝的名义合法性。', actualInfluence: '韩陵之战后取得北魏中枢主导权，高氏集团取代尔朱氏成为最强军政力量。', modernEquivalent: '职能接近掌控中央政府的战时政府首脑兼最高军事统帅。', impact: '北魏皇权更进一步转为名义中心，东西分裂的军政条件成熟。' },
      { timeText: '534-547年', periodLabel: '东魏与东西对峙', title: '东魏丞相 / 渤海王', nominalDuty: '辅政孝静帝，统筹东魏中央、军队、财政和对西魏战争。', authorityScope: '实际控制东魏中枢人事、河北军队、邺城政治中心和对外军事，皇帝保留名义礼制地位。', actualInfluence: '与宇文泰多次交战，未能消灭西魏，但建立了可由高氏继承的东魏军政体系。', modernEquivalent: '实际职能近似政权最高行政与军事决策者，但法统上仍为皇帝辅臣。', impact: '高氏子弟在此军政基础上最终取代东魏，建立北齐。' },
    ],
  }),
  person({
    id: 'yuwen-tai', name: '宇文泰', lifeText: '507-556年', birthYear: 507, deathYear: 556,
    categories: ['政治家', '军事家', '西魏权臣', '北周奠基人'], crossDynastyLabels: ['北魏末', '西魏'], dynastyIds: ['southern-northern'],
    summary: '北魏末关中军政集团领袖，拥立元宝炬建立西魏，推动府兵、官制与关中资源整合，为北周和后来隋唐的关陇政治奠定基础。',
    background: '北魏后期军镇动乱、尔朱氏内斗和孝武帝与高欢冲突，使关中成为另一个军政中心。宇文泰承接贺拔岳部众，把零散军镇力量与关中豪族、官僚组织起来。',
    childhood: '成长于北魏北边军镇环境，早年从军经历使其熟悉骑兵、军镇人际和动乱中的组织方式。具体童年记录有限，不由成年成就反推早慧故事。',
    personality: '长于在资源弱于对手的情况下整合将领、官僚和地方豪族，用人务实而组织意识强；同时通过废立皇帝维持对政权的实际控制。',
    policyInclination: '以军政合一的府兵组织、苏绰等人推动的行政财政整顿、关中土地与豪族整合为重点，以较小地盘对抗东魏。',
    socialContribution: '重建关中军政组织，使西魏能在东魏压力下存续并发展；其用人和军制又影响北周、隋唐初年的政治军事集团。',
    impactSummary: '宇文泰未称帝，但他对西魏的实际统治、军制整合和子弟安排直接通向北周建立，并形成后世所概括的关陇集团政治。',
    relatedEventIds: ['heyin-and-northern-wei-split'],
    resume: [
      { timeText: '520年代-534年', periodLabel: '北魏军镇动乱与关中集团形成', title: '军镇将领 / 贺拔岳部将', nominalDuty: '参与平叛、驻守关陇和统率所部，在主将身亡后整合其军队与地方同盟。', authorityScope: '早期权限以所部军队和关中防区为主，受北魏朝廷和上级将领名义授权。', actualInfluence: '贺拔岳遇害后取得关中军队主导权，成为能与高欢对抗的西部军政领袖。', modernEquivalent: '职能近似边区方面军将领和军事联盟组织者。', impact: '关中由北魏一般军区转为可支撑独立政权的军政核心。' },
      { timeText: '534-535年', periodLabel: '孝武帝西迁与西魏建立', title: '大将军 / 西迁政权主导者', nominalDuty: '接纳孝武帝进入关中，安置朝廷官员并组织对东魏的军政防线。', authorityScope: '实际控制关中军队、长安朝廷安全和核心人事，皇帝仍提供名义法统。', actualInfluence: '与孝武帝冲突后另立元宝炬，西魏正式建立，宇文泰成为实际最高决策者。', modernEquivalent: '职能近似新政权的军政组织者和最高军事保障人。', impact: '北魏分裂为东魏、西魏，高氏与宇文氏两大集团的长期竞争开始。' },
      { timeText: '535-556年', periodLabel: '西魏执政与关陇整合', title: '西魏丞相 / 大冢宰等最高辅政职', nominalDuty: '统筹西魏军队、官僚、财政、对东魏战争与皇位安排。', authorityScope: '实际权限覆盖关中中枢、府兵将领、州郡人事和战时动员，元魏皇帝主要保留礼制名义。', actualInfluence: '与苏绰等合作整顿行政，组织府兵与柱国将领体系，使西魏在资源较少时仍能与东魏、梁朝竞争。', modernEquivalent: '实际职能近似政权最高行政、国防与组织改革决策者，法统上仍为辅臣。', impact: '其子宇文觉和侄宇文护承接军政集团，西魏随后转为北周。' },
    ],
  }),
  person({
    id: 'erzhu-rong', name: '尔朱荣', lifeText: '493-530年', birthYear: 493, deathYear: 530,
    categories: ['将领', '北魏权臣', '军镇人物'], crossDynastyLabels: ['北魏末'], dynastyIds: ['southern-northern'],
    summary: '北魏末军镇将领和权臣，以平定葛荣等军镇势力崛起，拥立孝庄帝并发动河阴之变，后被孝庄帝设计杀死。',
    background: '六镇起义后北魏中央失去对边镇军队和地方的稳定控制，尔朱氏依靠契胡部众、马匹和并州军事资源扩张，胡太后与孝明帝的宫廷冲突又给了其介入洛阳的机会。',
    childhood: '出身北魏北边的部落与军事豪强家庭，早年接触牧马、部众组织和边镇军事。详细少年经历材料有限，可确认的能力主要体现在成年后的骑兵动员与军镇联盟。',
    personality: '军事决断强、善于快速集中骑兵和收编将领，却以大规模屠杀宗室官员建立恐惧秩序，使皇帝与朝廷对其权力产生强烈反弹。',
    policyInclination: '以军镇武力平定叛乱、更换皇帝和重组中枢，优先保障尔朱氏军队与家族控制，缺少可稳定吸纳官僚和宗室的长期制度安排。',
    socialContribution: '他对军镇叛乱的平定短期恢复了北魏部分军事秩序，但河阴大屠杀毁坏中央官僚与皇室结构，加速高欢、宇文泰等新军政集团兴起。',
    impactSummary: '尔朱荣展示了北魏末军事强人可以拥立皇帝却难以稳定治理中央的困境；其被杀后尔朱氏内斗，直接为北魏分裂创造条件。',
    relatedEventIds: ['heyin-and-northern-wei-split'],
    resume: [
      { timeText: '525-528年', periodLabel: '六镇余波与军事崛起', title: '并州军镇将领 / 大都督', nominalDuty: '动员部众与骑兵讨伐军镇叛乱，防卫并州并执行北魏朝廷军事任务。', authorityScope: '主要控制所部骑兵、尔朱氏部众和并州军事资源，名义上仍受北魏朝廷授官。', actualInfluence: '通过多次军事行动成为北魏最强地方将领，具备进入洛阳干预皇位的条件。', modernEquivalent: '职能近似边区方面军统帅兼地方军政集团领袖。', impact: '地方军镇实力凌驾中央官职，为河阴之变提供武力基础。' },
      { timeText: '528-530年', periodLabel: '河阴之变与控制北魏朝政', title: '天柱大将军 / 太原王 / 北魏实际军政强人', nominalDuty: '拥立孝庄帝、统筹平叛和朝廷安全，以辅政名义处理重大军政。', authorityScope: '实际调动主力军队、干预中枢人事与皇帝废立，但政令合法性仍需借助元魏皇帝。', actualInfluence: '在河阴杀害大批宗室和官员，后平定葛荣，形成尔朱氏对北魏军政的高度控制。', modernEquivalent: '实际职能接近控制中央的最高军事强人，不存在准确现代职位对应。', impact: '高压控制促使孝庄帝冒险诛杀尔朱荣，北魏进一步陷入军阀混战。' },
    ],
  }),
  person({
    id: 'su-jun', name: '苏峻', lifeText: '？-328年', deathYear: 328,
    categories: ['将领', '叛乱人物', '东晋人物'], crossDynastyLabels: ['东晋'], dynastyIds: ['eastern-jin-sixteen'],
    summary: '东晋初流民帅和将领，以军功控制历阳强兵，因拒绝朝廷征召而联合祖约起兵，攻入建康后战败身死。',
    background: '西晋末人口南渡和军队地方化产生了多支流民武装，东晋朝廷既借助这些将领守卫江淮，又担心他们拥兵自重。苏峻与庚亮辅政集团的冲突在这一结构中激化。',
    childhood: '早年家世和教育记录不连续，其公共履历主要从西晋末组织乡里和流民武装开始。可确认的能力是招聚部众、守城与在战乱中维持军队。',
    personality: '军事组织力强，对自身军权和部众安全高度敏感；面对中央征召时选择武装对抗，攻入都城后又缺少建立稳定政治秩序的能力。',
    policyInclination: '以保留历阳军队和个人权力为核心，反对庚亮等中枢辅政者削弱强藩；起兵后主要依靠军事占领和控制皇帝，无持续行政方案。',
    socialContribution: '苏峻的历史作用主要是反面制度教训：他揭示东晋初朝廷、门阀与地方强兵之间缺少稳定统属机制，叛乱也给建康和江南社会带来严重破坏。',
    impactSummary: '苏峻之乱强化东晋朝廷对拥兵将领的警惕，也使王导、温峤、陶侃等人重新协调中枢与方镇，成为东晋政权脆弱平衡的典型事件。',
    relatedEventIds: ['sujun-rebellion'],
    resume: [
      { timeText: '西晋末-326年', periodLabel: '流民武装与历阳防务', title: '流民帅 / 历阳内史等军政职', nominalDuty: '组织南渡流民武装、守卫江淮、管理历阳地区行政与所部军队。', authorityScope: '对历阳及所部流民军拥有较强军政控制，名义上受东晋朝廷官职与诏令约束。', actualInfluence: '屡立军功并拥有精兵，使中央难以在不造成军事反弹的情况下调整其职位。', modernEquivalent: '职能近似边防区军政长官兼地方武装领袖。', impact: '其军队独立性成为中央收权和地方自保冲突的核心。' },
      { timeText: '327-328年', periodLabel: '苏峻之乱', title: '叛军主帅 / 建康实际控制者', nominalDuty: '统率叛军进攻建康、控制成帝和朝廷，并对抗勤王联军。', authorityScope: '以军事占领控制都城、宫廷和部分官员，但无全国合法授权，也未有效控制荆州、江州等方镇。', actualInfluence: '一度攻破建康并左右中枢，随后在温峤、陶侃等联军反攻中战死。', modernEquivalent: '属于武装叛乱的最高指挥者，不是合法中央行政职位。', impact: '建康受到破坏，东晋中枢、门阀与方镇必须重新建立协调。' },
    ],
  }),
  person({
    id: 'huan-wen', name: '桓温', lifeText: '312-373年', birthYear: 312, deathYear: 373,
    categories: ['政治家', '将领', '东晋权臣'], crossDynastyLabels: ['东晋'], dynastyIds: ['eastern-jin-sixteen'],
    summary: '东晋中期军事强人，以灭成汉、长期经营荆州和多次北伐积累威望，后废海西公、拥立简文帝，却未能完成篡位。',
    background: '东晋皇室实力有限，上游荆州掌握对成汉、关中和中原用兵的军队、漕运和人口资源。桓温以驸马和将领身份出任荆州，将北伐名义、地方军权和个人政治目标结合。',
    childhood: '出身谯国桓氏官僚家庭，父亲桓彝在苏峻之乱中遇害，家庭变故与东晋门阀军政环境影响其早年。其后娶南康长公主，进入皇室与高门政治网络。',
    personality: '野心强、善于军事组织和政治威慑，能以北伐和名声提升权力；但柋头失败削弱威望，谢安等中枢士族也通过程序与拖延限制其篡位。',
    policyInclination: '主张以荆州军力北伐、恢复旧土并压倒朝中对手，后期通过废立皇帝与要求九锡扩张个人权力，政权安排高度依赖军镇。',
    socialContribution: '灭成汉和部分北伐扩大东晋军事活动空间，同时他对皇帝废立的操纵使后人更清楚看到东晋皇权、门阀和方镇之间的制度弱点。',
    impactSummary: '桓温为后来桓玄篡位和刘裕以北府军代晋提供了军事强人控制朝政的前例，其失败也说明军功、名分与士族合作缺一不可。',
    relatedEventIds: ['huanwen-depositions'],
    resume: [
      { timeText: '345-354年', periodLabel: '荆州经营与灭成汉', title: '安西将军 / 荆州刺史', nominalDuty: '管理荆州军政、长江上游防务和对成汉战争，负责军队、粮运与占领区安置。', authorityScope: '权限主要覆盖荆州州郡、上游军队与益州战区，名义上由东晋皇帝和中枢授权。', actualInfluence: '率军攻灭成汉，取得独立的荆州军政基础和超越普通方镇的政治威望。', modernEquivalent: '职能近似长江上游战区统帅兼大区行政长官。', impact: '东晋消灭成汉并控制益州，桓温则由地方将领上升为全国性权力人物。' },
      { timeText: '354-369年', periodLabel: '三次北伐', title: '征讨大都督 / 大司马', nominalDuty: '统筹对前秦、羌、前燕等北方政权的军事行动，调动荆州及相关州郡军粮。', authorityScope: '可指挥大规模远征军、干预沿线州郡与战时人事，但兵员、粮道和中枢支持仍受东晋内部平衡约束。', actualInfluence: '前两次北伐取得部分成果，第三次在柋头失败，个人威望受损但军权仍在。', modernEquivalent: '职能近似全国性远征总指挥兼主要战区军政首长。', impact: '北伐成败同时改变东晋对北方的战略预期，也影响桓温后来通过废立恢复威信的选择。' },
      { timeText: '371-373年', periodLabel: '废海西公与控制中枢', title: '大司马 / 皇帝废立主导者', nominalDuty: '以最高军事官和辅政重臣身份影响中枢，处理皇帝废立与重大人事。', authorityScope: '实际控制荆州军队、部分朝廷人事和废立行动，但皇室礼法、中枢士族与九锡程序限制其直接篡位。', actualInfluence: '废司马奕为海西公并拥立简文帝，又试图获得九锡，最终在谢安等拖延中病死。', modernEquivalent: '属于掌握强大军权的最高辅政者，不存在准确现代职位对应。', impact: '东晋皇帝废立被方镇军事强人左右，为后来桓玄和刘裕控制朝政留下先例。' },
    ],
  }),
  person({
    id: 'hou-jing', name: '侯景', lifeText: '503-552年', birthYear: 503, deathYear: 552,
    categories: ['将领', '叛乱人物', '东魏降将'], crossDynastyLabels: ['北魏末', '东魏', '南朝梁'], dynastyIds: ['southern-northern'],
    summary: '北魏末至东魏将领，长期控制河南军镇，叛高欢后投降梁朝，随即发动侯景之乱，攻陷建康、控制梁帝并短暂称帝，最终被王僧辩、陈霸先等击败。',
    background: '东魏、西魏对峙使河南成为高压战区，侯景以多年军镇经营拥有独立部众。高欢死后他担心被高澄清除，转而投靠梁朝；梁武帝晚年的宗室分散和建康防务松弛给了其叛乱空间。',
    childhood: '早年家世记录有限，成长与北魏军镇社会、六镇动乱和尔朱氏军事集团密切相关。他的公共能力主要来自骑兵作战、军镇管理和在政权分裂中保持部众。',
    personality: '军事经验丰富、善于抓住对手内部弱点，但对个人安全和独立军权极度敏感，在政治合作破裂时频繁叛离。占领建康后的残暴控制又迅速耗尽支持。',
    policyInclination: '优先保住所部军队、地盘和个人统治安全，通过废立梁帝、控制都城与最终称帝寻求合法性，却未建立可持续整合江南宗室、士族和地方军队的制度。',
    socialContribution: '侯景本人的正面建设有限，其历史作用主要是显示梁朝宗室、都城防务和降将安置的结构性缺陷；叛乱造成人口、城市和门阀文化巨大损失。',
    impactSummary: '侯景之乱实质上终结了梁武帝后期的南朝秩序，促成王僧辩、陈霸先等新军事力量崛起，并让西魏获得干预江陵与攻取梁地的机会。',
    relatedEventIds: ['houjing-rebellion'],
    resume: [
      { timeText: '520年代-547年', periodLabel: '北魏末与东魏河南军镇', title: '军镇将领 / 河南道大行台等职', nominalDuty: '统率河南战区军队，管理州镇防务、粮饷和对西魏作战。', authorityScope: '实际控制黄河以南多支军队和部分州郡，名义上从属尔朱氏、后高欢的军政体系。', actualInfluence: '在东魏西魏战争中成为一方重将，长期经营的部众使其具备叛离中枢的能力。', modernEquivalent: '职能近似多州战区统帅兼军管区长官。', impact: '东魏更换核心领导后，独立军权与个人安全矛盾导致其叛高氏。' },
      { timeText: '547-548年', periodLabel: '叛东魏与投梁', title: '梁朝豫州牧等降将官职 / 所部军队领袖', nominalDuty: '以降将身份为梁朝守卫淮南、处理与东魏战争和安置所部。', authorityScope: '对本部军队仍有强控制，梁朝授予的地方官职则受中央与州郡体系名义约束。', actualInfluence: '梁朝未能充分拆分或安置其军队，和议中对侯景去留的不确定感促使其起兵。', modernEquivalent: '近似带原部成建制投降后被临时授职的边区军事长官。', impact: '降将安置失败成为侯景之乱的直接触发环节。' },
      { timeText: '548-552年', periodLabel: '侯景之乱与短暂称帝', title: '叛军主帅 / 汉政权皇帝', nominalDuty: '统帅叛军攻占建康，控制、废立梁朝皇帝，并试图组织新政权对抗各地梁朝宗室。', authorityScope: '军事占领期间可控制建康、宫廷和部分江东州郡，却无法稳定统合荆州、江州及其他宗室军队。', actualInfluence: '攻破台城，导致梁武帝死亡，先后控制简文帝等并称帝，最终在王僧辩、陈霸先联军反攻中败亡。', modernEquivalent: '属于占领都城的叛军政权最高统治者，不对应合法现代公职。', impact: '梁朝中央崩溃，江南人口、经济和士族秩序受到严重破坏。' },
    ],
  }),
  person({ id: 'zhao-pu', name: '赵普', lifeText: '922-992年', birthYear: 922, deathYear: 992, categories: ['政治家', '宰辅', '北宋人物'], crossDynastyLabels: ['五代末', '北宋初'], dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], summary: '北宋初宰相，辅佐宋太祖强化中央集权，参与杯酒释兵权等政治安排。', relatedEventIds: ['chenqiao-mutiny', 'cup-wine-release-soldiers'] }),
  person({ id: 'shi-shouxin', name: '石守信', lifeText: '928-984年', birthYear: 928, deathYear: 984, categories: ['将领', '北宋初人物'], crossDynastyLabels: ['后周', '北宋'], dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], summary: '宋太祖时期高级武将，杯酒释兵权叙事中的代表人物之一，体现宋初抑制武将割据的制度方向。', relatedEventIds: ['cup-wine-release-soldiers'] }),
  person({ id: 'bao-zheng', name: '包拯', lifeText: '999-1062年', birthYear: 999, deathYear: 1062, categories: ['政治家', '清官形象', '北宋人物'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '北宋官员，以刚正执法和清廉形象著称，历史人物与民间包公形象共同影响社会认知。', relatedEventIds: ['bao-zheng-judicial'] }),
  person({ id: 'su-song', name: '苏颂', lifeText: '1020-1101年', birthYear: 1020, deathYear: 1101, categories: ['科学家', '政治家', '技术人物'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '北宋科学家和政治家，主持水运仪象台等科技工程，是宋代科技综合能力代表。', relatedEventIds: ['song-science', 'water-powered-armillary-sphere'] }),
  person({ id: 'cheng-yi', name: '程颐', lifeText: '1033-1107年', birthYear: 1033, deathYear: 1107, categories: ['思想家', '理学'], crossDynastyLabels: ['北宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '北宋理学家，二程之一，其思想成为朱熹理学的重要来源。', relatedEventIds: ['neo-confucianism'] }),
  person({ id: 'lu-jiuyuan', name: '陆九渊', lifeText: '1139-1193年', birthYear: 1139, deathYear: 1193, categories: ['思想家', '心学先声'], crossDynastyLabels: ['南宋'], dynastyIds: ['song-liao-jin-xixia'], summary: '南宋思想家，心学先驱，与朱熹有鹅湖之会等思想交流和分歧。', relatedEventIds: ['neo-confucianism', 'ehu-meeting'] }),

  person({ id: 'yu-dayou', name: '俞大猷', lifeText: '1503-1579年', birthYear: 1503, deathYear: 1579, categories: ['将领', '抗倭人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '明代抗倭名将，与戚继光并称，长期参与东南海防和倭患治理。', relatedEventIds: ['anti-wokou'] }),
  person({ id: 'zhu-chenhao', name: '宁王朱宸濠', lifeText: '1476-1521年', birthYear: 1476, deathYear: 1521, categories: ['宗室', '叛乱人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '明代宗室，发动宁王之乱，被王阳明迅速平定，是阳明心学“知行合一”政治实践常见背景。', relatedEventIds: ['prince-ning-rebellion'] }),
  person({ id: 'tang-xianzu', name: '汤显祖', lifeText: '1550-1616年', birthYear: 1550, deathYear: 1616, categories: ['文学家', '戏曲家'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '明代戏曲家，《牡丹亭》作者，代表晚明戏曲文学高峰。', relatedEventIds: ['ming-drama'] }),
  person({ id: 'xu-xiake', name: '徐霞客', lifeText: '1587-1641年', birthYear: 1587, deathYear: 1641, categories: ['地理学家', '旅行家'], crossDynastyLabels: ['明末'], dynastyIds: ['ming'], summary: '明末旅行家和地理观察者，《徐霞客游记》体现实地考察精神和地理知识积累。', relatedEventIds: ['xu-xiake-travels'] }),
  person({ id: 'matteo-ricci', name: '利玛窦', lifeText: '1552-1610年', birthYear: 1552, deathYear: 1610, categories: ['传教士', '中西交流人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '意大利耶稣会士，参与晚明西学东渐，与徐光启合作传播数学、天文和世界地理知识。', relatedEventIds: ['late-ming-western-learning'] }),

  person({ id: 'yang-xiuqing', name: '杨秀清', lifeText: '1823-1856年', birthYear: 1823, deathYear: 1856, categories: ['太平天国人物', '权力核心'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '太平天国东王，掌握重要军政和宗教权力，天京事变中被杀，是太平天国内部矛盾核心人物。', relatedEventIds: ['taiping-rebellion', 'tianjing-incident'] }),
  person({ id: 'shi-dakai', name: '石达开', lifeText: '1831-1863年', birthYear: 1831, deathYear: 1863, categories: ['太平天国人物', '军事人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '太平天国翼王，军事能力突出，天京事变后出走，反映太平天国内部裂解。', relatedEventIds: ['taiping-rebellion', 'tianjing-incident'] }),
  person({ id: 'hong-rengan', name: '洪仁玕', lifeText: '1822-1864年', birthYear: 1822, deathYear: 1864, categories: ['太平天国人物', '改革设想人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '太平天国后期重要人物，提出《资政新篇》，反映近代化改革设想在农民战争中的特殊尝试。', relatedEventIds: ['taiping-rebellion'] }),
  person({ id: 'ding-ruchang', name: '丁汝昌', lifeText: '1836-1895年', birthYear: 1836, deathYear: 1895, categories: ['海军将领', '甲午人物'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '北洋水师提督，甲午战争威海卫战败后自尽，是晚清海军制度和战争失败的重要人物。', relatedEventIds: ['sino-japanese-war'] }),
  person({ id: 'yan-fu', name: '严复', lifeText: '1854-1921年', birthYear: 1854, deathYear: 1921, categories: ['思想家', '翻译家', '近代启蒙'], crossDynastyLabels: ['晚清', '近代'], dynastyIds: ['qing'], summary: '翻译《天演论》等西方思想著作，推动晚清思想启蒙和社会达尔文主义传播。', relatedEventIds: ['yan-fu-translation'] }),
  person({ id: 'rong-hong', name: '容闳', lifeText: '1828-1912年', birthYear: 1828, deathYear: 1912, categories: ['教育人物', '洋务人物', '中西交流'], crossDynastyLabels: ['晚清'], dynastyIds: ['qing'], summary: '中国近代留学教育先驱，推动幼童留美和中西教育交流，是洋务运动教育面向的代表。', relatedEventIds: ['self-strengthening', 'chinese-educational-mission'] }),
  person({ id: 'zhang-jian', name: '张謇', lifeText: '1853-1926年', birthYear: 1853, deathYear: 1926, categories: ['实业家', '教育人物', '晚清新政人物'], crossDynastyLabels: ['晚清', '民国'], dynastyIds: ['qing'], summary: '清末状元、实业家和教育家，倡导实业救国，代表晚清到民初社会经济转型力量。', relatedEventIds: ['late-qing-new-policy', 'industry-saves-nation'] }),

  person({ id: 'liu-xuan', name: '更始帝', formalName: '刘玄', lifeText: '？-25年', deathYear: 25, categories: ['帝王君主', '新末起义人物'], crossDynastyLabels: ['新末', '东汉初'], dynastyIds: ['xin', 'eastern-han'], summary: '绿林军拥立的更始帝，曾攻入长安推翻王莽政权，但内部派系和地方力量分裂使其统治迅速瓦解。', background: '刘玄出身汉室宗亲，王莽末年加入绿林军，借刘氏名号获得政治合法性。更始政权进入长安后，既要处理赤眉、地方豪强，也要面对刘秀等汉室力量的竞争。', childhood: '宗室身份和早年经历记载有限，进入反莽武装前并不是最具号召力的领袖，后世对他的评价主要来自更始政权的短暂兴亡。', personality: '处事较为谨慎但缺少整合复杂派系的能力，在长安宫廷和地方军队之间难以建立稳定权威。', policyInclination: '借复汉名义恢复旧王朝合法性，但缺乏持续的行政、军队和财政重建方案。', socialContribution: '更始政权连接新末起义与东汉复兴，是理解王莽政权如何被推翻、刘秀如何取得最终胜出的关键中间环节。', impactSummary: '刘玄的失败说明王朝合法性口号不能替代军政整合，绿林、赤眉和地方豪强的竞争最终把东汉重建推向刘秀集团。', relatedEventIds: ['wang-mang-usurpation', 'xin-reforms', 'xin-falls-and-chimei'] }),
  person({ id: 'fan-chong', name: '樊崇', lifeText: '生卒年不详', categories: ['起义人物', '赤眉军首领'], crossDynastyLabels: ['新末', '东汉初'], dynastyIds: ['xin', 'eastern-han'], summary: '赤眉军首领，王莽末年在青州、徐州一带组织反抗，后进入关中并与更始、刘秀力量竞争。', background: '王莽末年灾荒、徭役和地方控制失序，樊崇在民众武装中逐步取得领导地位。赤眉军以简易组织和强大动员能力扩张，但进入关中后面临粮食、行政和合法性难题。', childhood: '生年、家世和早年职业缺少可靠记载，现有形象主要来自其在地方社会危机中组织武装的经历。', personality: '善于动员基层力量，行动直接而重视生存压力；面对复杂政权竞争时，缺乏长期行政整合条件。', policyInclination: '以反王莽、争取生存和控制地方资源为优先，后期借刘氏宗室名义寻求政治合法性。', socialContribution: '赤眉运动反映新末社会矛盾和基层民众动员，也说明推翻旧政权后建立稳定行政秩序的困难。', impactSummary: '樊崇不是单纯的“流寇”符号，赤眉军是新末社会危机的集体产物；其失败又加速了刘秀对全国秩序的重新整合。', relatedEventIds: ['xin-falls-and-chimei'] }),
  person({ id: 'dou-gu', name: '窦固', lifeText: '？-88年', deathYear: 88, categories: ['将领', '东汉边疆人物'], crossDynastyLabels: ['东汉'], dynastyIds: ['eastern-han'], summary: '东汉将领，明帝时期参与北击匈奴和经营西域，为班超重新打开西域交通提供军事背景。', background: '窦固出身外戚和军政家族，东汉明帝时期北方边疆压力仍然存在。朝廷通过军事行动、设置经营机构和派遣使者恢复对西域的联系。', childhood: '家族背景使其较早接触宫廷和军政环境，具体幼年材料有限。理解其经历要结合东汉外戚、边防和西域交通的制度背景。', personality: '重视执行和边疆行动，能够把中央战略转化为远距离军事和交通任务。', policyInclination: '支持以军事威慑、都护体系和外交交通维护东汉在西域的影响。', socialContribution: '为班超经营西域提供前置的军政条件，体现东汉对西域经营并非单个使者的个人冒险。', impactSummary: '窦固连接东汉中央决策与西域经营，使用户能看到班超活动背后的军队、机构和交通基础。', relatedEventIds: ['eastern-han-western-regions', 'dou-gu-western-regions'] }),
  person({ id: 'gan-ying', name: '甘英', lifeText: '生卒年不详', categories: ['外交人物', '东汉西域人物'], crossDynastyLabels: ['东汉'], dynastyIds: ['eastern-han'], summary: '东汉使者，受班超派遣出使安息，抵达波斯湾附近后返回，是东汉探索欧亚交通路线的代表人物。', background: '东汉经营西域扩大了汉朝对中亚和西亚的地理认知，甘英在班超支持下沿既有交通网络向西出使。关于其最远到达地点，传统记载和现代解释存在一定讨论。', childhood: '早年家世与教育不详，主要通过一次远距离出使进入历史记录。', personality: '具有远行、观察和外交执行所需的耐力，但个人言行材料很少，不宜做过度心理推断。', policyInclination: '服务东汉拓展交通、信息和外交视野的政策，不以直接征服为主要目标。', socialContribution: '扩大中国古代对中亚、西亚交通和区域政权的认知，体现丝绸之路上的信息传播价值。', impactSummary: '甘英的意义在于“走到哪里、带回什么信息”，其出使让东汉西域史从军事经营延伸到欧亚世界认知。', relatedEventIds: ['dou-gu-western-regions'] }),
  person({ id: 'sun-hao-wu', name: '孙皓', formalName: '吴末帝', lifeText: '242-284年', birthYear: 242, deathYear: 284, categories: ['末代君主', '三国吴'], crossDynastyLabels: ['三国吴', '西晋'], dynastyIds: ['three-kingdoms', 'western-jin'], summary: '孙吴末代皇帝，统治后期政治失序，西晋灭吴后投降，三国鼎立至此结束。', background: '孙皓继承孙吴政权时，魏蜀吴长期竞争已转化为西晋司马氏的统一压力。吴国内部财政、军政和君臣关系恶化，成为西晋进攻的重要条件。', childhood: '出身孙吴宗室，早年经历与继承顺序有关，具体成长细节不如其即位后的统治争议明确。', personality: '个性强势而猜疑，传统史书多强调其残暴，但评价也应结合孙吴末期制度、财政和军事困境。', policyInclination: '倾向强化宫廷控制和个人权威，未能有效处理内部治理与西晋军事压力。', socialContribution: '作为孙吴末代统治者，其经历帮助理解三国政权为何在长期竞争后被西晋逐一整合。', impactSummary: '孙皓的失败是个人统治问题与孙吴整体结构性困境叠加的结果，西晋灭吴则标志三国分裂结束。', relatedEventIds: ['western-jin-unification'] }),
  person({ id: 'du-yu', name: '杜预', lifeText: '222-285年', birthYear: 222, deathYear: 285, categories: ['将领', '政治家', '西晋人物'], crossDynastyLabels: ['三国魏', '西晋'], dynastyIds: ['three-kingdoms', 'western-jin'], summary: '西晋名将和经学家，参与灭吴统一战争，兼具军事、行政和学术成就。', background: '杜预出身魏晋士族，司马氏掌权后进入西晋政务和军务体系。灭吴战争中，他从荆州方向推进，重视军队协同和战后治理。', childhood: '家学和士族教育为其经学、法律与行政能力提供基础，具体童年材料有限。', personality: '理性、善于统筹，既能处理军政任务，也重视经典和制度知识。', policyInclination: '支持西晋统一和中央秩序，强调以军事实力打开局面、以行政制度巩固新占领地区。', socialContribution: '体现魏晋时期文武兼备的士族官员形象，参与统一并留下经学、法律和地方治理影响。', impactSummary: '杜预说明西晋统一不只是一次战役胜利，还需要将军事推进转化为地方行政和政治整合。', relatedEventIds: ['western-jin-unification'] }),
  person({ id: 'wang-jun-jin', name: '王濬', lifeText: '206-285年', birthYear: 206, deathYear: 285, categories: ['将领', '西晋人物'], crossDynastyLabels: ['三国魏', '西晋'], dynastyIds: ['three-kingdoms', 'western-jin'], summary: '西晋将领，率水军沿长江东下攻灭孙吴，是西晋统一战争的关键执行者。', background: '西晋统一需要突破孙吴长江防线，王濬负责益州造船和水军训练，长期准备后沿江东进。', childhood: '早年家世和仕途细节有限，历史影响主要集中在水军建设、长江作战和灭吴行动。', personality: '重视准备和工程保障，能够把造船、训练、航道和战役节奏结合起来。', policyInclination: '服务司马氏统一天下的战略，强调水军力量和长江交通对南方政权的决定性作用。', socialContribution: '展示古代国家如何通过造船、工程和水军组织完成跨区域统一，丰富对西晋灭吴的理解。', impactSummary: '王濬使西晋统一呈现出陆军与水军协同的完整面貌，孙吴的江防优势最终被系统性突破。', relatedEventIds: ['western-jin-unification'] }),
  person({ id: 'feng-taihou', name: '冯太后', lifeText: '442-490年', birthYear: 442, deathYear: 490, categories: ['政治家', '北魏辅政人物', '女性人物'], crossDynastyLabels: ['北魏', '南北朝'], dynastyIds: ['southern-northern'], summary: '北魏重要临朝称制者，推动均田制、三长制等改革，为孝文帝迁都和汉化改革准备制度条件。', background: '冯太后出身北燕皇族后裔，进入北魏宫廷后经历皇权、外戚和贵族权力竞争。她两度临朝，面对的是北魏由军事贵族政权向定居官僚国家转型的压力。', childhood: '幼年经历与北燕灭亡后的宫廷环境有关，早年被纳入北魏后逐步学习宫廷政治和宗室权力运行。', personality: '政治判断坚定、执行力强，能够在复杂宗室和贵族关系中保持权威；改革手段也带有集中权力和强制推行的特点。', policyInclination: '支持户籍、赋役、土地和基层行政改革，以制度化治理削弱旧贵族的无序特权。', socialContribution: '为北魏孝文帝改革奠定制度基础，推动北方社会生产、行政和民族融合进程。', impactSummary: '冯太后不是孝文帝改革的旁观者，而是北魏制度转型的前置推动者；她与孝文帝的关系体现改革的连续性。', relatedEventIds: ['xiaowen-reform'] }),
  person({ id: 'yao-chong', name: '姚崇', lifeText: '650-721年', birthYear: 650, deathYear: 721, categories: ['政治家', '唐朝宰辅'], crossDynastyLabels: ['唐', '开元时期'], dynastyIds: ['tang'], summary: '唐玄宗初期宰相，提出处理蝗灾、吏治和行政秩序的务实方案，与宋璟共同开启开元政治。', background: '姚崇历经武周和唐中宗、睿宗时期政局变化，唐玄宗即位后需要整顿官僚、财政和宫廷秩序。他以经验丰富的宰相身份承担开局改革。', childhood: '出身官僚家庭，早年仕途经历使其熟悉唐代中央行政和多次宫廷政变后的权力运行。', personality: '务实、果断、重视行政效果，善于在危机中提出可执行方案，但政治风格也较强硬。', policyInclination: '优先整顿吏治、压缩无效开支、稳定财政和处理灾害，强调先恢复行政秩序再谈扩张。', socialContribution: '为开元前期的政治稳定和行政复苏提供宰辅经验，代表唐代成熟官僚治理的一面。', impactSummary: '姚崇与宋璟的接续说明开元盛世并非单一君主创造，而是由不同风格宰相共同推进的政治过程。', relatedEventIds: ['kaiyuan-prosperity'] }),
  person({ id: 'song-jing', name: '宋璟', lifeText: '663-737年', birthYear: 663, deathYear: 737, categories: ['政治家', '唐朝宰辅', '谏臣'], crossDynastyLabels: ['唐', '开元时期'], dynastyIds: ['tang'], summary: '唐玄宗时期宰相，以清正、守法和整顿吏治著称，与姚崇并称“姚宋”。', background: '宋璟经历武周到唐玄宗时期，入相后面对的是宫廷权力、官僚任用和地方行政逐渐复杂化的问题。', childhood: '官宦家庭和科举、仕途教育为其行政能力提供基础，具体幼年材料较少。', personality: '刚正、克制、重原则，倾向以制度和公开规则约束权力与人情。', policyInclination: '强调依法行政、整顿吏治、限制权贵干预，维护中央官僚秩序的可预期性。', socialContribution: '代表开元前期清明政治和文官治理传统，为唐玄宗时期行政稳定提供制度支撑。', impactSummary: '宋璟与姚崇的治理风格一务实一守正，共同构成开元政治早期的重要政策组合。', relatedEventIds: ['kaiyuan-prosperity'] }),
  person({ id: 'zhang-jianzhi', name: '张柬之', lifeText: '625-706年', birthYear: 625, deathYear: 706, categories: ['政治家', '唐朝宰辅', '政变人物'], crossDynastyLabels: ['唐', '武周'], dynastyIds: ['tang'], summary: '唐中宗时期宰相，参与神龙政变，促成武周结束和唐朝复辟。', background: '张柬之在武则天晚年进入权力核心，面对皇位继承、武氏外戚和李唐宗室之间的紧张关系。神龙政变是宫廷集团共同推动的权力转折。', childhood: '早年经历以科举和官僚仕途为主，具体幼年材料有限。其历史作用集中于晚年进入中枢后的政治判断。', personality: '政治判断果断，敢于在高风险宫廷环境中组织行动；政变成功后也未能完全控制新旧集团冲突。', policyInclination: '倾向恢复李唐皇统和传统宗室秩序，同时维护唐代官僚国家的连续性。', socialContribution: '连接武周与中宗复辟，帮助理解唐代女性皇权、外戚和宗室政治的复杂转折。', impactSummary: '张柬之的行动结束武周，但政变并未消除宫廷权力竞争，唐中宗时期的新一轮政治动荡由此展开。', relatedEventIds: ['wu-zhou'] }),
  person({ id: 'li-guangbi', name: '李光弼', lifeText: '708-764年', birthYear: 708, deathYear: 764, categories: ['将领', '安史之乱人物'], crossDynastyLabels: ['唐'], dynastyIds: ['tang'], summary: '唐代名将，安史之乱中与郭子仪等共同抵御叛军，参与收复洛阳等关键军事行动。', background: '李光弼出身将门，安禄山起兵后被唐廷任用为方面军统帅。唐军需要在河北、河东和洛阳方向同时应对叛军与藩镇复杂局势。', childhood: '将门家庭和军事教育塑造其作战能力，早年经历主要围绕边镇和唐代军事体系展开。', personality: '严谨、善于组织防御和反攻，重视军纪与战场秩序；与其他将领之间也存在指挥协同和政治信任问题。', policyInclination: '以恢复唐朝中央权威和控制战略要地为目标，重视军队纪律、据点防御和阶段性反攻。', socialContribution: '代表安史之乱中唐军专业将领的作用，使事件不再被简化为单一叛军首领与朝廷的对决。', impactSummary: '李光弼与郭子仪共同支撑唐朝反攻，但战后藩镇势力上升也说明军事平乱会产生新的政治结构。', relatedEventIds: ['an-shi-rebellion'] }),
  person({ id: 'yelv-deguang', name: '耶律德光', formalName: '辽太宗', lifeText: '902-947年', birthYear: 902, deathYear: 947, categories: ['帝王君主', '辽朝人物'], crossDynastyLabels: ['契丹', '辽', '五代'], dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], summary: '辽太宗，继承并扩展辽朝势力，协助石敬瑭建立后晋并取得燕云十六州，后南下中原。', background: '耶律德光继承辽太祖建立的政治军事基础，面对五代中原政权更替和后晋求援。辽军取得燕云后，开始更深介入中原政治。', childhood: '契丹皇族成员，早年接受草原贵族和军事训练，具体教育细节不详。', personality: '重视扩张和战略机会，能够利用中原政权内斗扩大辽朝影响，但对中原行政和长期统治条件判断不足。', policyInclination: '以军事扩张、控制燕云和干预五代政权为重点，兼顾辽朝本部与中原收益。', socialContribution: '把辽朝与五代中原更替直接连接起来，燕云十六州的长期影响贯穿宋辽边防史。', impactSummary: '耶律德光的南下说明辽朝不只是北方旁观者，其军事介入塑造了后晋、后汉和北宋初年的战略困局。', relatedEventIds: ['sixteen-prefectures', 'five-dynasties-transition'] }),
  person({ id: 'liu-zhiyuan', name: '刘知远', formalName: '后汉高祖', lifeText: '895-948年', birthYear: 895, deathYear: 948, categories: ['帝王君主', '五代人物'], crossDynastyLabels: ['后晋', '后汉', '五代'], dynastyIds: ['five-dynasties-ten-kingdoms'], summary: '后汉建立者，原为后晋河东节度使，后在后晋灭亡后进入中原称帝，建立后汉。', background: '刘知远依靠河东军镇和沙陀军事集团积累力量，后晋在辽军南下和内部崩溃后，他抓住中原权力真空建立后汉。', childhood: '出身沙陀军事贵族系统，早年经历与后唐、后晋军镇政治相连，具体细节不多。', personality: '谨慎而重视军镇基础，能够等待时机，但后汉统治时间短、中央整合能力有限。', policyInclination: '依靠河东军政集团维持政权，试图恢复中原秩序并平衡军镇与中央。', socialContribution: '连接后晋崩溃、后汉建立和后周兴起，是五代政权快速更替的重要环节。', impactSummary: '刘知远的建国说明五代中军镇力量可迅速取得帝位，但短暂统治也反映地方军政集团难以稳定转化为中央国家。', relatedEventIds: ['five-dynasties-transition'] }),
  person({ id: 'guo-wei', name: '郭威', formalName: '后周太祖', lifeText: '904-954年', birthYear: 904, deathYear: 954, categories: ['帝王君主', '五代人物'], crossDynastyLabels: ['后汉', '后周', '五代'], dynastyIds: ['five-dynasties-ten-kingdoms'], summary: '后周建立者，推行整顿军政、减轻民生负担等措施，为柴荣时期的改革和北宋建立奠定基础。', background: '郭威原为后汉重要将领，后汉内部猜忌和权力冲突引发其起兵。后周建立后，他面对的是五代长期战争、财政压力和军镇割据。', childhood: '早年出身普通军户或军镇环境，具体家世存在不同记载；军旅经历是其进入权力核心的主要路径。', personality: '务实、重视军纪和民生，能够在军事夺权后尝试修复社会秩序。', policyInclination: '整顿禁军和地方军镇、减轻部分赋役、恢复农业生产，寻求以中央军政能力结束五代乱局。', socialContribution: '后周的恢复性政策为北宋统一和中央集权提供过渡，郭威本人也代表五代后期较成熟的整顿路线。', impactSummary: '郭威没有完成统一，却为柴荣和赵匡胤留下较好的制度与军政基础，后周成为五代走向北宋的重要桥梁。', relatedEventIds: ['five-dynasties-transition', 'later-zhou-reform'] }),
  person({ id: 'meng-zhixiang', name: '孟知祥', formalName: '后蜀高祖', lifeText: '874-934年', birthYear: 874, deathYear: 934, categories: ['帝王君主', '十国人物'], crossDynastyLabels: ['后唐', '后蜀', '十国'], dynastyIds: ['five-dynasties-ten-kingdoms'], summary: '后蜀建立者，长期据守西川，利用后唐衰弱建立相对独立的地方政权。', background: '孟知祥在后唐时期掌握西川军政，面对中原中央与地方节度使的反复博弈。后唐内乱后，他在成都建立后蜀。', childhood: '出身后唐军政系统，早年经历与沙陀政权和西川军镇联系紧密。', personality: '谨慎、重视地缘防守和地方资源，擅长在中原政权变动中保全西川。', policyInclination: '以地方自治、稳定蜀地财政和军队为核心，避免过度卷入中原争霸。', socialContribution: '代表十国中西南政权的地方治理路径，说明五代十国不是单一中原战争，而有多个区域国家并行发展。', impactSummary: '后蜀的建立体现十国政治与五代更替的互动，蜀地相对稳定也保存了重要文化和经济资源。', relatedEventIds: ['five-dynasties-transition'] }),
  person({ id: 'qian-liu', name: '钱镠', formalName: '吴越武肃王', lifeText: '852-932年', birthYear: 852, deathYear: 932, categories: ['十国君主', '地方治理人物'], crossDynastyLabels: ['吴越', '十国'], dynastyIds: ['five-dynasties-ten-kingdoms'], summary: '吴越国奠基者，经营两浙水利、城市和海上贸易，采取保境安民、对外称臣的务实路线。', background: '钱镠从唐末地方武装中崛起，控制两浙后面对中原五代和南方诸国竞争。他以承认中原正朔换取地方自治空间。', childhood: '出身临安地区普通家庭或地方武人环境，早年经历与唐末地方武装和海防活动有关。', personality: '务实、善于权衡，重视地方建设和避免无谓战争；其政治合法性主要通过地方治理和对外策略维持。', policyInclination: '以保境安民、兴修水利、发展海贸和灵活承认中原政权为主，优先维护两浙稳定。', socialContribution: '吴越水利、城市和佛教文化建设影响深远，钱镠体现十国地方国家的治理与发展路径。', impactSummary: '钱镠及吴越说明十国时期南方政权并非纯粹割据，也可能在经济、工程和文化上形成持续积累。', relatedEventIds: ['song-unification'] }),
  person({ id: 'wang-xun-yuan', name: '王恂', lifeText: '1235-1281年', birthYear: 1235, deathYear: 1281, categories: ['数学家', '天文学家', '元朝人物'], crossDynastyLabels: ['元'], dynastyIds: ['yuan'], summary: '元代数学家、天文学家，参与郭守敬等主持的授时历工作，代表元代科学团队协作。', background: '元朝统一后需要建立适用于广大疆域的历法和时间制度，王恂参与天文观测、数学计算和历法编制。', childhood: '早年受传统数学和天文知识训练，具体家世材料有限。', personality: '重视计算、观测和协作，科学贡献更多体现在团队工作与方法积累中。', policyInclination: '服务国家历法、天文观测和行政时间秩序建设，以实测和计算改进旧历。', socialContribution: '推动元代历法和数学发展，体现古代大型科技工程中多位学者共同完成任务的特点。', impactSummary: '王恂补足授时历中的数学和协作环节，使郭守敬相关科技事件不再被理解为单一人物的个人发明。', relatedEventIds: ['yuan-science'] }),
  person({ id: 'xu-heng', name: '许衡', lifeText: '1209-1281年', birthYear: 1209, deathYear: 1281, categories: ['思想家', '政治家', '元朝人物'], crossDynastyLabels: ['元'], dynastyIds: ['yuan'], summary: '元代儒者和政治人物，参与元初制度、教育和历法文化建设，代表蒙古政权吸收中原治理资源。', background: '许衡活动于金元易代和元朝制度建立时期，面对不同政治传统、教育体系和官僚选用方式的整合问题。', childhood: '早年接受儒学教育，战乱与政权更替塑造其对教育、秩序和制度建设的重视。', personality: '重视学术和制度，倾向通过教育、礼法和官僚规范稳定新政权。', policyInclination: '推动儒学教育、官僚制度和历法文化进入元朝治理体系，强调以制度整合多元人群。', socialContribution: '帮助元朝吸收中原教育和行政传统，也参与元代知识体系和历法工程的制度化。', impactSummary: '许衡连接元初政治、儒学教育与科学文化，是理解元朝多元治理的重要补充人物。', relatedEventIds: ['yuan-science'] }),
  person({ id: 'bai-pu', name: '白朴', lifeText: '1226-约1306年', birthYear: 1226, categories: ['文学家', '戏曲家', '元朝人物'], crossDynastyLabels: ['元'], dynastyIds: ['yuan'], summary: '元代杂剧作家，代表作《梧桐雨》等体现元曲的历史题材和文人表达。', background: '白朴经历金元易代和社会文化变迁，元代城市演出、文人创作与民间语言共同推动杂剧繁荣。', childhood: '少年经历与金元战乱和家庭变故有关，早年教育和文化环境塑造其文学创作。', personality: '重视历史感、情感表达和戏剧结构，作品常在兴亡题材中寄托个人感受。', policyInclination: '主要通过文学创作表达历史反思和个体情感，不以行政政策为主要影响方式。', socialContribution: '丰富元杂剧题材和文人创作传统，与关汉卿、马致远等共同构成元曲文化谱系。', impactSummary: '白朴说明元曲不仅是通俗娱乐，也承载金元易代后的历史记忆、士人情感和社会观察。', relatedEventIds: ['yuan-drama'] }),
  person({ id: 'ma-zhiyuan', name: '马致远', lifeText: '约1250-1321年', categories: ['文学家', '戏曲家', '元朝人物'], crossDynastyLabels: ['元'], dynastyIds: ['yuan'], summary: '元代散曲和杂剧作家，《汉宫秋》等作品影响深远，常与马致远的“秋思”散曲传统联系。', background: '马致远活动于元代城市文化和戏曲市场成熟时期，文人身份、杂剧演出和散曲传播共同构成其创作环境。', childhood: '生卒与早年材料存在不确定性，主要通过作品、文人交往和元曲传统认识其文化位置。', personality: '长于营造苍凉、疏宕和含蓄的情绪，擅用历史人物和旅途意象表达个人与时代感受。', policyInclination: '主要以戏曲和散曲观察社会、历史与人生，不宜直接类比行政职位。', socialContribution: '推动散曲和杂剧语言成熟，扩大元代戏曲对后世文学、舞台和大众文化的影响。', impactSummary: '马致远与白朴、关汉卿共同说明元曲是元代城市文化、历史记忆和文人表达的重要载体。', relatedEventIds: ['yuan-drama'] }),

  person({ id: 'li-shanchang', name: '李善长', lifeText: '1314-1390年', birthYear: 1314, deathYear: 1390, categories: ['政治家', '明初宰辅'], crossDynastyLabels: ['元末', '明'], dynastyIds: ['ming'], summary: '明太祖早期重要谋臣和丞相，参与朱元璋集团的行政、后勤与制度建设，后因胡惟庸案牵连。', background: '李善长在元末群雄竞争中投奔朱元璋，长期负责政务、粮饷和文书，帮助新政权从军队集团转向中央官僚国家。', childhood: '早年家世和教育材料不多，进入朱元璋集团后凭借行政能力和地方经验上升。', personality: '善于统筹、务实而重视权力秩序，能够处理创业期复杂政务，但晚年卷入明初高压政治。', policyInclination: '支持中央集权、官僚行政和财政军需整合，优先保障明朝建国和制度成形。', socialContribution: '代表明初文官集团在建国、定制和财政行政中的作用，补足开国战争只看武将的叙事。', impactSummary: '李善长说明明朝建立既依赖军事胜利，也依赖政务、粮饷和制度设计；其结局则体现明初相权与皇权的紧张。', relatedEventIds: ['ming-founding'] }),
  person({ id: 'liu-bowen', name: '刘伯温', formalName: '刘基', lifeText: '1311-1375年', birthYear: 1311, deathYear: 1375, categories: ['政治家', '谋士', '文学家'], crossDynastyLabels: ['元末', '明'], dynastyIds: ['ming'], summary: '明初谋臣、政治家和文学家，辅佐朱元璋制定战略与制度，后世“刘伯温”形象带有大量传奇色彩。', background: '刘基早年任元朝官职，元末局势崩溃后转入朱元璋阵营。他在战略判断、政务建议和文书论述方面发挥作用。', childhood: '接受传统儒学和经史教育，早年仕元经历使其熟悉地方行政与天下形势，具体幼年故事不宜过度传奇化。', personality: '善于分析局势、重视制度和名分，表达锋利但也处于明初皇权高度集中的政治环境中。', policyInclination: '支持统一战争、中央集权和礼法秩序，以谋略与制度建议服务新王朝。', socialContribution: '连接明初军事创业、文官制度和文学传统，丰富朱元璋建国的人物结构。', impactSummary: '刘基的真实历史作用应与民间预言家形象区分，其核心贡献在战略、政务和士人文化，而非后世神异传说。', relatedEventIds: ['ming-founding'] }),
  person({ id: 'lan-yu', name: '蓝玉', lifeText: '？-1393年', deathYear: 1393, categories: ['将领', '明初军事人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '明初名将，北伐击破北元势力，扩展明朝北方安全空间，后因蓝玉案被杀。', background: '蓝玉在明初北方战争中崛起，依靠军功成为边疆统帅。明太祖晚年担心功臣、军队和皇位继承安全，功臣集团受到清洗。', childhood: '早年家世记载有限，主要从军功和常遇春家族关系进入明初军事集团。', personality: '勇猛、敢战、战场执行力强，但居功自傲和军政边界意识不足，成为皇权不安的重要对象。', policyInclination: '支持北伐、边疆军事扩张和以军功维护明朝安全，政治上依赖功臣军事集团。', socialContribution: '代表明初北伐和北方边防成就，也帮助理解开国武将从建国功臣转为皇权潜在威胁的过程。', impactSummary: '蓝玉的战功巩固明初北疆，但蓝玉案显示朱元璋通过清洗功臣重塑皇权和继承秩序。', relatedEventIds: ['ming-founding'] }),
  person({ id: 'fang-xiaoru', name: '方孝孺', lifeText: '1357-1402年', birthYear: 1357, deathYear: 1402, categories: ['文官', '儒学人物', '靖难人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '建文帝时期文臣，靖难之役后拒绝为朱棣起草即位诏书，被杀并成为忠臣与政治正统争议的象征。', background: '方孝孺受建文帝信任，参与削藩和文教政策。朱棣攻入南京后要求其起草即位文书，方孝孺拒绝，最终遭到极严厉的惩罚。', childhood: '出身儒学家庭，受宋濂一系学术影响，早年以文章、经学和道德操守获得士林声誉。', personality: '重视名分和政治正统，刚直而不愿妥协；其选择体现儒臣道德责任，也暴露政治冲突中的极端后果。', policyInclination: '支持建文帝削藩和文官治理，强调皇位继承名分与儒家政治伦理。', socialContribution: '成为明初正统、忠节和靖难合法性讨论的核心人物，影响后世对文臣气节的理解。', impactSummary: '方孝孺的悲剧不能脱离靖难之役的制度与军政冲突理解，既是忠臣形象，也是明初政治高压的见证。', relatedEventIds: ['jingnan-campaign'] }),
  person({ id: 'xie-jin', name: '解缙', lifeText: '1369-1415年', birthYear: 1369, deathYear: 1415, categories: ['文官', '文学家', '明初文化人物'], crossDynastyLabels: ['明'], dynastyIds: ['ming'], summary: '明初文臣、文学家，参与《永乐大典》编纂和朝廷文书工作，后因宫廷权力斗争失势。', background: '解缙以才学进入明初政治，历经洪武、建文和永乐时期。永乐帝重视大型文献编纂，但宫廷继承和权力竞争也使其屡遭起伏。', childhood: '幼年聪敏、受儒学教育，早年文章才能得到朝廷注意，具体家庭细节以文献记载为准。', personality: '才思敏捷、表达直接，重视文献与国家文化工程，但不善于处理持续变化的宫廷关系。', policyInclination: '支持以文教、典籍和官僚制度整合新王朝文化秩序，服务皇权国家的知识工程。', socialContribution: '参与《永乐大典》等大型文化工程，体现明初国家对知识整理、经典保存和文化正统的重视。', impactSummary: '解缙把明初政治、文献编纂与宫廷风险联系起来，是理解《永乐大典》背后人物网络的重要入口。', relatedEventIds: ['jingnan-campaign'] }),
  person({ id: 'gu-yanwu', name: '顾炎武', formalName: '顾绛', lifeText: '1613-1682年', birthYear: 1613, deathYear: 1682, categories: ['思想家', '史学家', '清初实学'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '明清之际思想家、史学家，重视经世致用、地方社会和历史考证，提出“天下兴亡，匹夫有责”的相关思想传统。', background: '顾炎武经历明亡和清初政权转换，拒绝以简单仕进处理遗民身份，长期游历、考察和著述，关注制度、地理、民生与学术实证。', childhood: '出身江南士人家庭，早年接受经学教育，明末政治危机和家国变故深刻影响其学术方向。', personality: '严谨、坚守、重实证与行动，反对空疏议论；其遗民身份也使思想带有强烈的历史责任感。', policyInclination: '倡导经世致用、考察实际制度和地方社会，反思君主专制及空谈性理对国家治理的局限。', socialContribution: '推动清初考据、史学和经世思想发展，影响近代知识分子对国家、社会与责任的理解。', impactSummary: '顾炎武把明清鼎革的个人体验转化为制度、地理和社会研究，代表清初思想从心性玄谈转向实证和经世。', relatedEventIds: ['ming-qing-thought'] }),
  person({ id: 'huang-zongxi', name: '黄宗羲', lifeText: '1610-1695年', birthYear: 1610, deathYear: 1695, categories: ['思想家', '史学家', '清初实学'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '明清之际思想家，著《明夷待访录》，批评君主专制弊端并讨论学校、地方和公共政治。', background: '黄宗羲出身东林党人家庭，明末党争和清军入关使其长期保持遗民立场。其著述将历史经验与制度批评结合起来。', childhood: '父亲黄尊素因党争受害，家庭政治记忆影响其早年成长；他受经学、史学和东林学术传统教育。', personality: '批判性强、重视公共责任和制度分析，既有遗民立场，也能以学术研究处理现实政治问题。', policyInclination: '反对君主把天下视为私产，强调学校、地方、士人和公共事务的制度作用。', socialContribution: '推动清初政治思想、史学和地方社会研究，成为近代反思专制、讨论公共性的先声。', impactSummary: '黄宗羲的制度批评具有历史语境限制，但其“天下为主、君为客”等论述持续影响近代政治思想。', relatedEventIds: ['ming-qing-thought'] }),
  person({ id: 'wang-fuzhi', name: '王夫之', formalName: '王船山', lifeText: '1619-1692年', birthYear: 1619, deathYear: 1692, categories: ['思想家', '史学家', '清初实学'], crossDynastyLabels: ['明末', '清初'], dynastyIds: ['ming', 'qing'], summary: '明清之际思想家、史学家，重视气本论、历史变化和经世实践，晚年隐居著述。', background: '王夫之经历明亡和南明抗清活动，清初长期隐居湖南，系统整理经学、史学和哲学，以历史变化解释政治与社会。', childhood: '出身士人家庭，早年接受经学教育和明末政治熏陶，南明经历强化了其历史责任感。', personality: '学术体系宏阔、独立而坚守，重视历史具体性和现实社会，不轻易接受简单的道德或权力解释。', policyInclination: '强调从历史变化、社会生产和制度实践理解政治，反对脱离现实的空疏心性论。', socialContribution: '构成清初实学和哲学史的重要高峰，对近代史学、哲学和民族国家思想产生持续影响。', impactSummary: '王夫之与顾炎武、黄宗羲共同构成明清之际思想转向，但三人的问题意识、学术路径和政治表达并不相同。', relatedEventIds: ['ming-qing-thought'] }),
  person({ id: 'tian-wenjing', name: '田文镜', lifeText: '1662-1732年', birthYear: 1662, deathYear: 1732, categories: ['政治家', '清朝制度人物'], crossDynastyLabels: ['清', '雍正时期'], dynastyIds: ['qing'], summary: '雍正时期重要地方督抚，以河南摊丁入亩、整顿赋役和强力行政著称。', background: '雍正朝需要把财政、赋役和官僚考核改革落实到地方，田文镜在河南等地承担高强度行政整顿。', childhood: '出身清代官僚家庭或科举仕途环境，具体早年材料有限，主要通过地方任职进入历史视野。', personality: '执行强硬、重视效率和考核，能够快速推进政策，但地方治理方式也引发士绅和民众争议。', policyInclination: '支持雍正的财政整顿、摊丁入亩和官员考成，以中央政令压实地方行政责任。', socialContribution: '代表清代中央改革在地方的执行层，帮助理解制度改革如何转化为税收、户籍和基层行政操作。', impactSummary: '田文镜的争议体现改革成效与地方承受之间的张力，不能只用“能吏”或“酷吏”单一评价。', relatedEventIds: ['qing-institutions'] }),
  person({ id: 'li-wei', name: '李卫', lifeText: '1687-1738年', birthYear: 1687, deathYear: 1738, categories: ['政治家', '清朝制度人物'], crossDynastyLabels: ['清', '雍正时期'], dynastyIds: ['qing'], summary: '雍正时期能吏，历任地方督抚，重视治安、盐政和漕运等事务，民间形象与历史官员形象并存。', background: '李卫由基层和地方行政进入清廷重用范围，雍正时期中央需要整顿盐政、漕运、治安和地方官场。', childhood: '早年教育和家世记载有限，仕途上升更多依靠实际办事能力和雍正帝信任。', personality: '务实、果断、敢于处理复杂事务，行政风格直接而强硬。', policyInclination: '支持中央集权和财政、治安制度整顿，重视在地方建立可执行的行政秩序。', socialContribution: '体现清代地方行政、盐政和漕运等具体治理领域，帮助用户理解督抚并非抽象官职。', impactSummary: '李卫的履历说明雍正制度整顿依赖一批高执行力地方官，也伴随强势行政与地方社会之间的磨合。', relatedEventIds: ['qing-institutions'] }),
  person({ id: 'eertai', name: '鄂尔泰', lifeText: '1677-1745年', birthYear: 1677, deathYear: 1745, categories: ['政治家', '清朝边疆制度人物'], crossDynastyLabels: ['清', '雍正时期'], dynastyIds: ['qing'], summary: '雍正、乾隆时期重臣，长期经营西南事务，推动改土归流并参与清代边疆行政整合。', background: '西南土司地区存在地方权力、税役和军事边界问题，鄂尔泰在云贵等地推行改土归流，将部分土司区域纳入流官行政。', childhood: '出身满洲官僚家庭，接受清代八旗和行政教育，早年仕途为边疆任职积累经验。', personality: '组织能力强、行政意志坚定，重视中央制度覆盖，但政策推进会触动地方传统权力。', policyInclination: '支持中央集权、改土归流、边疆行政标准化和地方官僚体系扩展。', socialContribution: '推动清代西南边疆行政整合，改变部分地区的税役、司法和官员任用结构。', impactSummary: '鄂尔泰的改革体现国家整合与地方传统之间的张力，改土归流的效果和代价需要结合具体区域判断。', relatedEventIds: ['qing-institutions'] }),
  person({ id: 'zhang-tingyu', name: '张廷玉', lifeText: '1672-1755年', birthYear: 1672, deathYear: 1755, categories: ['政治家', '清朝宰辅', '史学人物'], crossDynastyLabels: ['清', '雍正时期', '乾隆时期'], dynastyIds: ['qing'], summary: '清代重臣、军机大臣，参与雍正朝行政和军机处运作，也主持《明史》等史书编纂。', background: '张廷玉出身汉族官僚家庭，康熙晚期进入中枢，雍正时期成为军机处和皇帝决策体系的重要文官。', childhood: '父亲张英为康熙朝重臣，家庭教育和官僚网络为其成长提供条件，早年接受经史和行政训练。', personality: '谨慎、守成、长于文书和制度协调，能够在高压皇权体系中保持长期任职。', policyInclination: '支持密折、军机和中央行政协调，以文书、档案和官僚制度提高皇帝决策效率。', socialContribution: '体现清代中枢行政、军机处和官方史学编纂的制度化发展。', impactSummary: '张廷玉的履历帮助理解军机处并非现代意义的内阁，而是服务皇帝的中枢决策和文书执行机构。', relatedEventIds: ['qing-institutions'] }),
  person({ id: 'yixin', name: '奕䜣', formalName: '恭亲王奕䜣', lifeText: '1833-1898年', birthYear: 1833, deathYear: 1898, categories: ['宗室政治家', '洋务人物', '外交人物'], crossDynastyLabels: ['清', '晚清'], dynastyIds: ['qing'], summary: '晚清恭亲王，参与总理各国事务衙门和洋务外交，代表清廷内部较重视制度调整与对外交涉的力量。', background: '第二次鸦片战争后清廷需要处理列强外交、军政改革和宫廷权力关系，奕䜣在恭亲王、议政和外交机构中发挥作用。', childhood: '出身道光帝皇子和清代宗室教育体系，早年接受满洲贵族、儒学和军政训练。', personality: '务实、善于外交和制度协调，但受宗室身份、慈禧权力和朝廷派系制约。', policyInclination: '支持设立近代外交机构、引进军事技术和有限制度改革，以维护清朝统治。', socialContribution: '推动总理衙门、洋务外交和清廷对世界秩序的认识变化。', impactSummary: '奕䜣体现晚清内部改革的有限性：清廷开始建立近代外交和技术机构，却没有完成根本政治转型。', relatedEventIds: ['self-strengthening'] }),
  person({ id: 'shen-baozhen', name: '沈葆桢', lifeText: '1820-1879年', birthYear: 1820, deathYear: 1879, categories: ['政治家', '洋务人物', '海防人物'], crossDynastyLabels: ['清', '晚清'], dynastyIds: ['qing'], summary: '晚清洋务和海防官员，主持福州船政等建设，推动近代海军、造船和技术教育。', background: '甲午战争前清廷面对海防和技术落后问题，沈葆桢在福建船政等机构中推进造船、教育和海军人才培养。', childhood: '出身士大夫家庭，接受传统经学和科举教育，后在地方行政与海防危机中转向洋务实践。', personality: '重视实务、教育和工程管理，愿意在传统官僚体系内吸收近代技术。', policyInclination: '支持自强、海防、船政和技术教育，以军事工业和人才培养增强国家能力。', socialContribution: '推动中国近代造船、海军教育和工程人才体系建设，是洋务运动的重要执行者。', impactSummary: '沈葆桢说明洋务运动不仅是购买武器，也包括船厂、学校、翻译和技术管理等完整制度尝试。', relatedEventIds: ['self-strengthening'] }),
  person({
    id: 'zhan-tianyou', name: '詹天佑', lifeText: '1861-1919年', birthYear: 1861, deathYear: 1919,
    categories: ['工程师', '科学技术人物', '近代人物'], crossDynastyLabels: ['晚清', '民国'], dynastyIds: ['qing'],
    summary: '中国近代铁路工程师，主持京张铁路等工程，体现近代工程教育、技术自主和国家交通建设。',
    background: '晚清铁路建设受到财政、列强资本和技术人才限制，詹天佑接受近代教育后进入铁路工程，将测绘、施工和本土技术组织结合。',
    childhood: '参加幼童留美计划，接受近代工程教育，回国后面对技术人才不足和复杂政治经济环境。',
    personality: '严谨、务实、重视现场勘测和工程安全，面对困难强调自主设计与团队协作。',
    policyInclination: '主要以工程建设和技术自主服务国家交通与工业化，不宜直接套用传统官职类比。',
    socialContribution: '推动中国铁路工程和近代技术人才培养，京张铁路成为近代中国自主工程能力的象征。',
    impactSummary: '詹天佑把留学教育、工程组织和民族工业联系起来，展示晚清近代化不只是思想口号，也包含具体技术实践。',
    relatedEventIds: ['railway-engineering'],
    resume: [
      { timeText: '1872-1881年', periodLabel: '幼童留美与工程教育', title: '留学生 / 铁路工程学习者', nominalDuty: '接受语言、数学、工程和铁路专业教育，完成从新式基础教育到大学工程训练的过渡。', authorityScope: '学生阶段无行政或工程管辖权，主要在学校和实习环境中获取测量、土木和铁路知识。', actualInfluence: '作为幼童留美成员完成近代工程教育，形成日后承担铁路勘测与施工的专业基础。', modernEquivalent: '近代留学工程生和铁路工程储备人才的职能近似。', impact: '成为清末新式教育转化为本土工程能力的代表性个案。' },
      { timeText: '1888-1905年', periodLabel: '中国铁路勘测与工程实务', title: '铁路工程师 / 勘测与施工组织者', nominalDuty: '参与铁路测量、线路设计、桥涵施工、工程质量和技术人员协调。', authorityScope: '权限限于所参与铁路工程的技术方案、现场施工和工程团队，不掌握国家路权与财政最终决策。', actualInfluence: '在多项铁路工程中积累勘测、桥梁和组织经验，逐步成为可独立承担干线工程的中国工程师。', modernEquivalent: '铁路项目技术负责人、土木工程师与现场施工管理者的职能近似。', impact: '为京张铁路的自主勘测、设计和施工准备技术与组织经验。' },
      { timeText: '1905-1919年', periodLabel: '京张铁路与后续铁路事业', title: '总工程师 / 铁路技术与组织负责人', nominalDuty: '主持线路复测、工程设计、施工组织、经费使用、人才调配与工程安全。', authorityScope: '对京张线的技术路线和工程团队拥有主要专业指挥权，资金、政策与路权仍受政府和铁路机构约束。', actualInfluence: '组织中国工程师完成复杂山地铁路，并继续参与铁路技术、行业组织和国家交通事务。', modernEquivalent: '干线铁路项目总工程师兼大型工程项目负责人的职能近似。', impact: '京张铁路证明中国工程团队能够独立承担复杂干线建设，并促进铁路专业人才培养。' },
    ],
  }),
  person({
    id: 'qiu-shiliang', name: '仇士良', lifeText: '781-843年', birthYear: 781, deathYear: 843,
    categories: ['宦官', '神策军将领', '晚唐政治人物'], crossDynastyLabels: ['唐', '中晚唐'], dynastyIds: ['tang'],
    summary: '唐文宗时期掌握神策军的权势宦官，甘露之变中识破李训等人的伏杀计划并控制皇帝，事后主持清洗朝臣，进一步强化宦官对禁军和宫廷的支配。',
    background: '安史之乱后神策军逐渐成为皇帝直接依赖的禁军，宦官又掌握枢密、传诏和禁军指挥。唐文宗试图摆脱宦官控制，却没有可独立调动的军事力量。',
    childhood: '出身、入宫经过和早年家庭材料缺乏，较明确的履历始于宦官系统和神策军职务。其政治资源主要来自宫廷信息、禁军指挥与皇帝安全体系。',
    personality: '警觉、果断且擅长宫廷权力斗争，能在突发危机中迅速控制皇帝和军队；其强硬清洗也造成朝廷恐惧与文官系统严重受损。',
    policyInclination: '优先维护宦官集团对禁军、宫门和皇帝近侍系统的控制，以人事清洗和军事威慑压制皇帝、宰相及反宦官官员。',
    socialContribution: '正面制度贡献有限，其经历主要用于解释晚唐皇帝为何难以收回神策军，以及宫廷军事化如何破坏正常官僚决策。',
    impactSummary: '甘露之变后宦官权势达到高峰，皇帝名义上的最高权力与实际禁军控制进一步分离，成为晚唐政治失灵的重要结构。',
    relatedEventIds: ['ganlu-incident'],
    resume: [
      { timeText: '810年代-834年', periodLabel: '神策军与宫廷权力上升', title: '内侍省官员 / 神策军中尉', nominalDuty: '在内廷传达诏令、护卫宫禁，并参与神策军日常指挥和将校任用。', authorityScope: '可影响宫门、禁军、皇帝出入与部分中枢信息，但名义上仍受皇帝诏令和朝廷官制约束。', actualInfluence: '依托神策军和宦官网络进入晚唐权力核心，能够干预宰相与朝臣的人身安全。', modernEquivalent: '近似宫廷警卫与中央禁军负责人，但兼具近侍、军事和政治中介权力，现代无准确对应。', impact: '为甘露之变中迅速反制文宗与李训的计划准备了军队和信息优势。' },
      { timeText: '835年', periodLabel: '甘露之变', title: '神策军中尉 / 宦官集团首领', nominalDuty: '控制宫禁和禁军，保护皇帝并处置所谓宫廷叛乱。', authorityScope: '实际可劫持皇帝回宫、调动神策军和追捕官员，远超普通宫廷警卫职责。', actualInfluence: '察觉左金吾仗院伏兵后带文宗返回宫中，调军杀死李训、郑注及大量官员。', modernEquivalent: '属于掌握首都卫戍并控制国家元首行动的宫廷军事强人，无法等同现代合法公职。', impact: '反宦官行动失败，神策军和宦官对皇帝废立、中枢人事的影响继续扩大。' },
      { timeText: '835-843年', periodLabel: '甘露之变后专权', title: '右神策军中尉 / 开府仪同三司', nominalDuty: '统领禁军、参与宫廷安全和皇位继承相关事务。', authorityScope: '通过禁军与宦官系统影响皇帝、朝臣及中枢运行，正式官衔不能完整表现其实际权力。', actualInfluence: '文宗晚年和武宗初年仍居权力核心，退休前告诫宦官集团以控制皇帝维持权势。', modernEquivalent: '无准确现代类比，应理解为宫廷禁军、近侍机构和政治集团领袖的合一。', impact: '其长期掌军使晚唐君主与文官无法稳定建立对宫廷武力的制度控制。' },
    ],
  }),
  person({
    id: 'li-xun', name: '李训', formalName: '李仲言', lifeText: '？-835年', deathYear: 835,
    categories: ['政治人物', '唐朝官员', '政变人物'], crossDynastyLabels: ['唐', '唐文宗时期'], dynastyIds: ['tang'],
    summary: '唐文宗近臣，本名李仲言，与郑注等策划清除掌握神策军的宦官；835年以“甘露”为诱饵发动行动，计划败露后被捕杀。',
    background: '晚唐皇帝、宦官与文官之间权力严重失衡。李训因接近文宗而快速进入中枢，文宗希望借其绕开传统宰相体系，秘密组织反宦官行动。',
    childhood: '出生年份、家世和幼年生活资料不详。史料重点集中在其成年后的官场起伏、改名复出以及文宗时期迅速获信任的过程。',
    personality: '善于揣摩皇帝意图、行动大胆而急进，也有排斥同谋和独占功劳的倾向；计划保密、军事准备与协同不足，最终造成灾难性失败。',
    policyInclination: '核心目标是帮助皇帝诛除宦官、收回神策军和宫廷控制权，但主要依赖秘密政变，缺乏稳定的军队与官僚联盟。',
    socialContribution: '其行动未形成正面治理成果，却揭示晚唐反宦官改革的制度困境：没有独立武力时，皇帝诏令难以转化为实际控制。',
    impactSummary: '甘露之变失败导致朝臣大规模被杀，李训成为以秘密行动解决结构性权力失衡而失败的典型人物。',
    relatedEventIds: ['ganlu-incident'],
    resume: [
      { timeText: '830年代前期', periodLabel: '入仕与接近文宗', title: '翰林学士等中枢近臣', nominalDuty: '起草文书、备皇帝顾问并参与中枢议政。', authorityScope: '可直接向皇帝进言和接触机密，但无独立军队，对神策军、宫门和宦官机构没有法定指挥权。', actualInfluence: '凭文宗信任快速升迁，与郑注等成为秘密反宦官计划的核心策划者。', modernEquivalent: '近似国家元首高级文书顾问和政策幕僚，但古代翰林近臣带有宫廷政治属性。', impact: '绕开常规官僚程序的快速升迁扩大了行动保密性，也削弱了广泛政治支持。' },
      { timeText: '835年', periodLabel: '甘露之变策划与失败', title: '宰相 / 反宦官行动策划者', nominalDuty: '参与最高政务并按皇帝意图恢复朝廷对禁军和宫廷的控制。', authorityScope: '拥有宰相议政和调度部分官员的权力，却不能直接命令仇士良掌握的神策军。', actualInfluence: '安排以“甘露”诱使宦官进入伏击地点，现场异常被识破后逃离，最终被捕杀。', modernEquivalent: '近似政府首脑成员兼秘密行动策划者，但无现代法治职位可对应政变职能。', impact: '行动失败使文官中枢遭清洗，文宗进一步受制于宦官。' },
    ],
  }),
  person({
    id: 'pang-xun', name: '庞勋', lifeText: '？-869年', deathYear: 869,
    categories: ['戍卒领袖', '起义人物', '晚唐人物'], crossDynastyLabels: ['唐', '晚唐'], dynastyIds: ['tang'],
    summary: '晚唐桂林戍卒起事领袖，率逾期不得归乡的徐泗士兵北返并占据徐州地区；朝廷多路进攻并借助沙陀骑兵后，起义于869年失败。',
    background: '晚唐边防轮戍时间延长、粮饷与归期失信，徐泗地区又承受税役和军镇治理压力。基层士兵的不满与地方社会矛盾结合，形成大规模武装行动。',
    childhood: '出生、家庭和幼年经历缺乏可靠记载，现存材料主要从桂林戍卒推举其为首领开始。无法据此推定其早年性格或完整社会背景。',
    personality: '具有组织士兵、长途行军和争取地方响应的能力，敢于挑战朝廷；但队伍成分复杂、纪律与长期补给不足，也难以抵御朝廷多路围剿。',
    policyInclination: '早期诉求集中在戍卒按期归乡和待遇，控制徐州后逐渐转为争夺地方军政权力，未形成成熟稳定的全国制度方案。',
    socialContribution: '其正面建设成果有限，但起义把晚唐军役失信、地方税役和中央军事依赖暴露出来，是理解黄巢起义前社会危机的重要入口。',
    impactSummary: '庞勋起义虽被镇压，却消耗唐廷财政与军力，并提升沙陀军事集团的重要性，显示中央已难以依靠常规官僚和禁军处理地方危机。',
    relatedEventIds: ['pangxun-rebellion'],
    resume: [
      { timeText: '868年以前', periodLabel: '桂林戍守', title: '徐泗戍卒 / 基层军人', nominalDuty: '随军在桂林承担边防守备、巡逻和军事劳役，等待轮换归乡。', authorityScope: '基层士兵不具备独立军政管辖权，受戍守将领、军镇和朝廷调令约束。', actualInfluence: '长期戍守和归期拖延形成共同不满，为士兵集体北返提供组织基础。', modernEquivalent: '近似跨区轮换部署的基层驻防军人。', impact: '军役制度失信把待遇问题转化为集体兵变。' },
      { timeText: '868-869年', periodLabel: '庞勋起义', title: '戍卒起义领袖 / 徐州武装首领', nominalDuty: '统率起义军行军、作战、补给并控制徐州周边据点。', authorityScope: '权力来自起义军推举和武装占领，可调动所部及部分地方响应者，但缺少稳定行政与合法财政体系。', actualInfluence: '带领戍卒北返并扩军，一度控制徐州周边，最终在唐军与沙陀骑兵联合进攻下战败身亡。', modernEquivalent: '属于兵变后形成的地方武装首领，不对应现代合法军政职务。', impact: '成为晚唐中央军事、财政和基层军役危机进一步恶化的标志。' },
    ],
  }),
  person({
    id: 'princess-taiping', name: '太平公主', lifeText: '约665-713年', birthYear: 665, deathYear: 713,
    categories: ['皇室女性', '政治人物', '宫廷权力人物'], crossDynastyLabels: ['唐', '武周'], dynastyIds: ['tang'],
    summary: '唐高宗与武则天之女，参与神龙政变后的宫廷政治，并与李隆基合作发动唐隆政变清除韦后集团；睿宗复位后权势达到高峰，最终在与玄宗的权力竞争中失败。',
    background: '武周至开元初年皇位多次更替，宗室、外戚、女性皇族和禁军共同参与政治。太平公主凭皇室血缘、财产、门客和母亲武则天留下的政治经验进入中枢。',
    childhood: '成长于高宗、武则天共同执政和武周建立的宫廷环境，接受皇室教育并较早接触宗室婚姻与政治联盟。具体私人生活材料常受后世宫廷叙事影响。',
    personality: '政治敏锐、善于结盟并经营门客网络，能够在继承危机中快速行动；权力扩张也使她与李隆基从盟友转为竞争者。',
    policyInclination: '重视维持自身及李唐宗室在中枢的影响，主要通过人事推荐、宗室联盟和禁军政变参与政治，缺少独立系统的政策纲领。',
    socialContribution: '其政治生涯显示唐代皇室女性并非只能处于后宫，也能通过财产、血缘和门客参与国家权力，但这种参与高度依赖宫廷结构。',
    impactSummary: '太平公主既是结束韦后控制的重要合作者，也是睿宗朝权力分裂的核心人物；其失败标志玄宗亲政和开元中枢重组。',
    relatedEventIds: ['wu-zhou', 'tanglong-coup'],
    resume: [
      { timeText: '690-705年', periodLabel: '武周时期', title: '皇室公主 / 宫廷政治参与者', nominalDuty: '以皇室成员身份承担礼仪、婚姻联结和宗室事务，没有常设行政官署。', authorityScope: '正式身份不直接赋予行政管辖权，实际影响来自武则天信任、皇族关系、财产和门客。', actualInfluence: '在武周宫廷积累政治经验和人际网络，并在神龙政变前后参与李唐宗室复位进程。', modernEquivalent: '无现代公职类比，应理解为拥有非正式政治资源的最高皇室成员。', impact: '成为中宗、睿宗时期宫廷联盟的重要组织者。' },
      { timeText: '710年', periodLabel: '唐隆政变', title: '宗室联盟核心 / 政变合作者', nominalDuty: '联合李隆基和禁军清除韦氏集团、恢复李旦皇位。', authorityScope: '依靠宗室身份、宫廷联络和禁军盟友影响行动，本人并无法定军队统帅权。', actualInfluence: '与李隆基共同推动政变，韦后、安乐公主被杀，睿宗复位。', modernEquivalent: '属于继承危机中的皇室政治组织者，现代制度无对应职位。', impact: '帮助终结韦氏控制，也为其后与李隆基争权创造条件。' },
      { timeText: '710-713年', periodLabel: '睿宗朝权势与失败', title: '太平公主 / 中枢人事影响者', nominalDuty: '以皇帝之妹身份参与议政和推荐官员。', authorityScope: '能够通过睿宗、宰相和门客影响人事与决策，但权力缺少正式责任边界，并受到太子、禁军和皇帝最终裁决限制。', actualInfluence: '与李隆基持续争夺中枢主导权；玄宗先天政变后，其党羽被清洗，她被赐死。', modernEquivalent: '无准确现代类比，近似依靠亲属关系和政治网络影响最高决策的非正式权力中心。', impact: '其失败结束初唐后期频繁的皇族集团共治，玄宗得以集中皇权。' },
    ],
  }),
  person({
    id: 'empress-wei', name: '韦皇后', formalName: '韦氏（个人名不详）', lifeText: '？-710年', deathYear: 710,
    categories: ['皇后', '外戚政治人物', '宫廷权力人物'], crossDynastyLabels: ['唐', '武周末至中宗朝'], dynastyIds: ['tang'],
    summary: '唐中宗李显皇后，随中宗流放房州并在其复位后参与朝政，联结安乐公主、武三思等扩大韦氏集团权力；中宗死后控制幼帝和中枢，在唐隆政变中被杀。',
    background: '武则天晚年至中宗复位后，皇位继承、武氏外戚、李唐宗室和禁军关系复杂。中宗政治能力和权威有限，皇后、女儿及外戚由此进入决策核心。',
    childhood: '个人名字、出生年份和早年生活史料不足，已知出身京兆韦氏。她与李显共同经历废黜和房州流放，这段经历加强了夫妻政治依存。',
    personality: '在逆境中有较强承受力，复位后积极经营权力与亲属网络；任用亲信和追求家族地位加剧宫廷对立。关于私生活的部分描述带有胜利者书写色彩，应与政治事实区分。',
    policyInclination: '优先扩大皇后、外戚和安乐公主集团的人事与经济利益，并试图在中宗死后控制继承和临朝权力，缺乏被稳定制度约束的公开施政纲领。',
    socialContribution: '其政治生涯为研究唐代皇后、外戚和女性政治参与提供重要案例，同时也显示非正式权力网络与皇位继承结合时的高风险。',
    impactSummary: '韦氏集团的扩张触发李隆基与太平公主联合政变；后世常将她简单类比武则天，但二人的正式权位、治理时间和政治能力并不相同。',
    relatedEventIds: ['tanglong-coup'],
    disputeTabs: [
      { title: '传统评价', body: '传统史书多把韦后写成仿效武则天、干政乱政的反面人物，并强调其私德问题。' },
      { title: '制度视角', body: '现代讨论更重视中宗权威薄弱、皇位继承失序、外戚和禁军共同参与政治；对胜利者叙事中的私生活指控需谨慎核实。' },
    ],
    resume: [
      { timeText: '684-705年', periodLabel: '中宗被废与房州流放', title: '庐陵王妃 / 被废皇族配偶', nominalDuty: '陪同被废的李显生活，维持家庭和有限宗室联络。', authorityScope: '无行政和军政管辖权，行动受武周监控，影响主要限于家庭内部。', actualInfluence: '与李显共同经历长期不安，使中宗复位后对其高度依赖。', modernEquivalent: '无现代公职对应，属于被限制政治活动的前国家元首家属。', impact: '流放经历成为中宗朝夫妻共掌宫廷权力的重要心理与政治背景。' },
      { timeText: '705-710年', periodLabel: '中宗复位后', title: '皇后 / 宫廷与外戚集团核心', nominalDuty: '主持后宫礼仪、皇室内务并辅佐皇帝处理宗室事务。', authorityScope: '皇后无独立国家行政区划，但可借皇帝授权、诏令入口、亲属和亲信影响官员任免及政策。', actualInfluence: '与安乐公主、武三思等形成政治联盟，扩大韦氏亲属和近臣在朝廷中的地位。', modernEquivalent: '国家元首配偶并兼有强大非正式政治影响，不能等同现代行政官员。', impact: '宫廷人事集团扩张加剧李唐宗室、太平公主和李隆基的不安。' },
      { timeText: '710年', periodLabel: '中宗死后与唐隆政变', title: '皇太后 / 临朝权力控制者', nominalDuty: '以太后身份辅佐少帝李重茂，处理继承过渡和中枢政务。', authorityScope: '短期控制诏令和部分中枢人事，但禁军并未完全服从，李旦、太平公主和李隆基另有宗室合法性。', actualInfluence: '拥立李重茂后试图延续韦氏控制，李隆基联合太平公主发动政变，她在宫中被杀。', modernEquivalent: '近似未成年君主时期的皇室摄政核心，但缺少稳定合法授权。', impact: '韦氏集团瓦解，睿宗复位，初唐权力进入李隆基与太平公主竞争阶段。' },
    ],
  }),
  person({
    id: 'li-deyu', name: '李德裕', lifeText: '787-850年', birthYear: 787, deathYear: 850,
    categories: ['政治家', '唐朝宰相', '中晚唐人物'], crossDynastyLabels: ['唐', '中晚唐'], dynastyIds: ['tang'],
    summary: '中晚唐宰相，唐武宗会昌时期主持军政和财政事务，参与平定昭义刘稹、处理回鹘南迁及会昌政策；又是后世“牛李党争”叙事中的李党代表。',
    background: '安史之乱后藩镇、宦官、财政和边疆问题并存，进士与门荫官僚之间也有政治网络竞争。李德裕出身赵郡李氏，依靠地方治理和中枢经验进入权力核心。',
    childhood: '父亲李吉甫曾任宰相，家学和官僚环境使其熟悉政务与文书。他未以进士科起家，后来与牛僧孺等人的路线及人事网络冲突，被概括为牛李党争。',
    personality: '决断力强、重视行政效率和国家权威，处理藩镇与边疆问题较为坚决；同时用人和派系斗争方式强硬，政敌对其评价尖锐。',
    policyInclination: '主张强化中央对藩镇和边疆事务的控制，重视财政、人事与军政协调；会昌灭佛期间支持清查寺院经济，但政策也与武宗个人宗教倾向和财政需要有关。',
    socialContribution: '在会昌时期提高中枢军政执行力，留下大量奏议和政务经验，为研究晚唐宰相、藩镇治理和官僚派系提供材料。',
    impactSummary: '李德裕的升降显示晚唐政策连续性受皇帝更替、宦官和官僚网络影响；宣宗即位后其迅速被贬，也说明宰相权力依赖君主支持。',
    relatedEventIds: ['yuanhe-campaigns', 'huichang-buddhist-suppression'],
    disputeTabs: [
      { title: '党争框架', body: '传统常以牛党、李党解释中晚唐官员冲突，李德裕被视为李党领袖。' },
      { title: '政策网络', body: '现代研究也关注科举、门荫、地方履历、皇帝用人和具体政策差异，避免把数十年政争简化为两个固定集团。' },
    ],
    resume: [
      { timeText: '810年代-830年', periodLabel: '地方与边镇历练', title: '州刺史、浙西观察使等地方长官', nominalDuty: '管理州镇行政、赋税、治安、军队和对中央文书。', authorityScope: '可统筹辖区财政与地方军政，重大人事、战争和税制仍需朝廷批准。', actualInfluence: '通过整顿地方财政和行政积累声望，形成重视执行和中央权威的治理风格。', modernEquivalent: '职能近似跨地市行政负责人兼区域监察、部分军务协调者。', impact: '地方经验成为其处理中晚唐财政、藩镇和边疆事务的基础。' },
      { timeText: '830-840年', periodLabel: '文宗朝入相与外放', title: '宰相、节度使', nominalDuty: '参与中枢议政、官员任免和地方军镇治理。', authorityScope: '宰相可参与国家政策但不独掌神策军，外任节度使则管辖特定地区军政，均受皇帝、宦官和同僚制约。', actualInfluence: '在牛李政争和皇帝用人变化中反复入相、外放，积累边疆与藩镇实务经验。', modernEquivalent: '中枢政府首脑成员与区域军政长官的交替任职，现代无完全对应。', impact: '其政治网络和政策主张在武宗即位后重新成为中枢主导力量。' },
      { timeText: '840-846年', periodLabel: '会昌执政', title: '宰相 / 中书门下平章事', nominalDuty: '协助武宗处理军政、财政、边疆、人事和诏令执行。', authorityScope: '可统筹中枢政策与跨部门行动，但皇帝掌握最终决策，神策军和宦官系统也保有独立影响。', actualInfluence: '主持应对回鹘南迁、平定昭义刘稹，参与会昌灭佛及财政整顿，是武宗朝最重要宰相。', modernEquivalent: '近似政府首脑成员和最高政策协调者，但处于皇权与宦官禁军并存的制度中。', impact: '会昌政局短期强化中央执行力，宣宗即位后政策和人事迅速逆转。' },
      { timeText: '846-850年', periodLabel: '宣宗朝贬谪', title: '被贬地方官员', nominalDuty: '按贬谪任命处理有限地方事务。', authorityScope: '失去中枢议政和军政协调权，政治活动受到朝廷严密限制。', actualInfluence: '因宣宗调整会昌政治遗产和政敌反击，被连续贬往南方并死于崖州。', modernEquivalent: '近似被撤职后降任边远地方职务的前政府高官。', impact: '其结局显示晚唐政策与官员命运高度依赖皇帝更替。' },
    ],
  }),
  person({
    id: 'temujin', name: '孛儿只斤·铁木真（成吉思汗）', formalName: '孛儿只斤·铁木真', lifeText: '约1162-1227年', birthYear: 1162, deathYear: 1227,
    categories: ['蒙古大汗', '帝王君主', '军事政治领袖'], crossDynastyLabels: ['南宋', '金', '西夏', '蒙古帝国', '元朝前史'], dynastyIds: ['song-liao-jin-xixia', 'yuan'],
    summary: '统一蒙古高原诸部并于1206年建立蒙古汗国，随后发动攻金、西征和灭夏战争；其军事与组织能力创建横跨欧亚的帝国基础，也造成大规模战争破坏。',
    background: '12世纪蒙古高原由多个部落和贵族集团竞争，金朝又通过册封、贸易和军事干预影响草原。铁木真在家族失势后依靠安答、婚姻、部众和战功重新建立联盟。',
    childhood: '父亲也速该去世后，家族被原部众抛弃，铁木真少年时期经历贫困、俘虏和部落冲突。早年生存经历强化其对忠诚、组织纪律和个人依附关系的重视。',
    personality: '战略耐心、善于吸纳不同出身人才并建立严格军纪，对背叛极其敏感；征服中兼用招降、分化与恐怖威慑，既有制度整合能力，也实施过残酷屠杀。',
    policyInclination: '打破部分旧部落界限，以千户制重组军民，重视军功、驿传、信息和宗教宽容；核心目标仍是大汗家族统治、战争动员和贡赋获取。',
    socialContribution: '统一草原并建立跨区域军事、驿传和政治秩序，扩大欧亚人员、技术与商品流动；其征服同时造成城市毁坏、人口死亡和长期社会重组。',
    impactSummary: '成吉思汗建立的制度和分封体系由窝阔台、蒙哥、忽必烈等继承，直接改变金、西夏、南宋及欧亚历史；评价必须同时呈现帝国连接与征服暴力。',
    relatedEventIds: ['mongol-destroys-xixia', 'mongol-destroys-jin'],
    disputeTabs: [
      { title: '帝国创建', body: '强调统一蒙古诸部、军事组织、驿传与跨欧亚交流，认为其创建了影响深远的世界帝国。' },
      { title: '战争代价', body: '强调征服战争中的屠城、人口损失和地方社会破坏，反对只用英雄或交流叙事遮蔽暴力。' },
    ],
    resume: [
      { timeText: '约1170-1206年', periodLabel: '家族失势与统一蒙古诸部', title: '部族首领 / 草原联盟组织者', nominalDuty: '保护家族与部众、组织放牧和作战，并通过联盟解决草原资源与安全冲突。', authorityScope: '早期仅能支配直属家族和追随者，随着战争胜利逐步控制克烈、乃蛮等原有集团。', actualInfluence: '通过安答、婚姻、分化和军功用人扩大部众，击败主要竞争者，完成蒙古高原政治统一。', modernEquivalent: '属于从部落军事首领成长为跨部联盟统帅的历史身份，现代无准确职位对应。', impact: '1206年获得推举为成吉思汗，草原权力由多部竞争转向大汗统治。' },
      { timeText: '1206-1215年', periodLabel: '建立蒙古汗国与攻金', title: '成吉思汗 / 蒙古大汗', nominalDuty: '统辖汗国军政、分封、对外战争、法令和各千户关系。', authorityScope: '可调动蒙古本部与附属部众，任命千户和将领；实际统治仍需协调诸子、功臣和宗族贵族。', actualInfluence: '以千户制整编军队，进攻西夏和金朝，1215年蒙古军攻取金中都，扩大对华北的控制。', modernEquivalent: '国家最高统治者与最高军事统帅合一，但草原分封和宗族共治不同于现代国家。', impact: '建立蒙古征服金、西夏及向中亚扩张的军事组织基础。' },
      { timeText: '1218-1227年', periodLabel: '西征与最终攻夏', title: '蒙古大汗 / 跨区域征服统帅', nominalDuty: '决定帝国战争方向，协调诸王和将领，处置新征服地区的贡赋、驻军与分封。', authorityScope: '对蒙古主力和帝国战略拥有最高决定权，各战区由诸子、速不台等将领具体执行。', actualInfluence: '发动对花剌子模的西征，返回后再次进攻西夏，1227年在战争期间去世，西夏随后投降。', modernEquivalent: '帝国最高统帅兼最高统治者，无现代权力分立制度可直接类比。', impact: '留下横跨欧亚的继承体系，也把灭金、继续西征等任务交给后继大汗。' },
    ],
  }),
  person({
    id: 'ogedei', name: '孛儿只斤·窝阔台（元太宗）', formalName: '孛儿只斤·窝阔台', lifeText: '1186-1241年', birthYear: 1186, deathYear: 1241,
    categories: ['蒙古大汗', '帝王君主', '元朝前史人物'], crossDynastyLabels: ['金', '南宋', '蒙古帝国', '元朝前史'], dynastyIds: ['song-liao-jin-xixia', 'yuan'],
    summary: '成吉思汗第三子，1229年被推举为蒙古大汗；在位期间完成灭金、扩建和林、发展驿站与赋税行政，并发动第二次大规模西征。',
    background: '成吉思汗去世后，蒙古帝国需要在诸子封地和功臣军队之间确定大汗继承。窝阔台获得拖雷等宗王支持即位，继承一个快速扩张但行政制度尚不稳定的帝国。',
    childhood: '成长于铁木真统一草原和连续战争的家族环境，青年时期参与攻金与西征，熟悉诸王协商、军事分工和征服区治理。其早年教育以草原政治和战争实践为主。',
    personality: '较能协调宗王和功臣，愿意采用耶律楚材等不同族群官员处理财政；个人生活放纵、饮酒过度的记载也显示最高权力缺少稳定约束。',
    policyInclination: '延续对外扩张，同时建设和林、驿站和征税体系，把一次性掠夺逐渐转为持续财政；仍保留宗王分封和军事征服的帝国结构。',
    socialContribution: '推动蒙古帝国从草原战争联盟走向具有都城、驿传和常态税收的跨区域政权，促进欧亚交通，也继续造成征服战争与人口损失。',
    impactSummary: '灭金和西征把蒙古帝国推向最大扩张阶段；其死后长期摄政与汗位争夺又暴露宗王选汗制度的继承风险。',
    relatedEventIds: ['mongol-destroys-jin'],
    resume: [
      { timeText: '1206-1227年', periodLabel: '成吉思汗时期的皇子与战将', title: '宗王 / 方面军统帅', nominalDuty: '率领分封部众参加攻金、西征和区域作战，执行大汗战略。', authorityScope: '可指挥本部与临时配属军队，重大方向、战利品分配和停战由成吉思汗及宗王会议决定。', actualInfluence: '在攻金与花剌子模战争中积累军功，并被成吉思汗指定为大汗继承候选。', modernEquivalent: '近似拥有世袭军队的皇族战区统帅，现代无准确类比。', impact: '通过战功和兄弟间相对可接受性取得继承基础。' },
      { timeText: '1229-1234年', periodLabel: '即位与灭金', title: '蒙古大汗', nominalDuty: '主持帝国军政、宗王协调、对外战争和征服区行政。', authorityScope: '拥有最高战略与任命权，但需通过忽里台大会和诸王合作落实，拖雷、察合台等集团仍有独立资源。', actualInfluence: '重新发动攻金，蒙古与南宋夹击蔡州，1234年金朝灭亡；同时采纳耶律楚材等人的税赋治理建议。', modernEquivalent: '跨区域帝国最高统治者与最高统帅的合一。', impact: '华北进入蒙古长期统治阶段，南宋与蒙古从暂时合作转为直接对峙。' },
      { timeText: '1235-1241年', periodLabel: '和林、驿站与第二次西征', title: '蒙古大汗 / 帝国制度建设者', nominalDuty: '统筹都城、驿传、税赋和各战区扩张，维持宗王与征服区之间资源分配。', authorityScope: '可发布全帝国命令并调度主要军队，地方执行仍依赖宗王、达鲁花赤和各地官僚。', actualInfluence: '建设和林、扩充驿站，命拔都等西征欧洲，并向南宋用兵；1241年去世后汗位一度空缺。', modernEquivalent: '帝国元首、最高军事决策者与中央行政建立者的复合角色。', impact: '制度化提高帝国连通性，继承危机则延缓对南宋的持续进攻。' },
    ],
  }),
  person({
    id: 'wanyan-zongbi', name: '完颜宗弼（金兀术）', formalName: '完颜宗弼', lifeText: '？-1148年', deathYear: 1148,
    categories: ['金朝宗室', '将领', '政治人物'], crossDynastyLabels: ['北宋末', '南宋', '金'], dynastyIds: ['song-liao-jin-xixia'],
    summary: '金太祖完颜阿骨打之子，参与灭辽、攻宋和追击宋高宗，黄天荡与韩世忠交战，后成为金朝主战与议和政策的重要决策者；民间多称“金兀术”。',
    background: '女真建金后迅速灭辽并南下攻宋，金朝宗室将领兼具军队、部族与政治资源。北方占领区治理和南宋抵抗使战争从快速突袭转为长期对峙。',
    childhood: '出生年份和幼年细节缺乏可靠记录，作为金太祖之子成长于女真部落统一和建国战争环境，早年能力主要通过宗室军事训练与随军征战形成。',
    personality: '作战进取、行动坚决，善于长途追击和骑兵战，也能在战局变化后接受和议；宋代抗金叙事常将其脸谱化为单一反派，需要与史实区分。',
    policyInclination: '早期主张继续南下并以军事压力控制中原，后期在金朝内部权力和宋金战局变化下参与绍兴和议，重视金朝对北方与淮河线的稳定控制。',
    socialContribution: '其正面意义主要在金朝国家形成和军政整合；对宋而言则是战争侵略者。人物志应同时呈现不同政权立场和战争造成的社会损失。',
    impactSummary: '完颜宗弼把灭北宋后的军事推进与绍兴和议连接起来，是理解岳飞、韩世忠、秦桧和宋高宗决策环境不可缺少的对手方人物。',
    relatedEventIds: ['jingkang-incident', 'huangtiandang-battle', 'song-jin-war'],
    disputeTabs: [
      { title: '宋人记忆', body: '在抗金文学和民间故事中，金兀术常被塑造成岳飞、韩世忠的主要敌手和侵略者。' },
      { title: '金朝视角', body: '从金朝政治看，他又是宗室统帅和中枢重臣，参与女真国家扩张、占领区治理与后期和议。' },
    ],
    resume: [
      { timeText: '1120年代', periodLabel: '灭辽与攻宋', title: '金朝宗室将领 / 方面军统帅', nominalDuty: '统率女真及附属军队执行灭辽、攻宋和占领北方州县任务。', authorityScope: '可指挥所属方面军和战区行动，战略方向与封赏受金太祖、太宗及宗室军政会议决定。', actualInfluence: '参与灭辽和北宋战争，逐步成为金朝南线最重要的宗室将领之一。', modernEquivalent: '近似皇族战区统帅，但同时拥有宗室政治权力。', impact: '北宋灭亡后成为继续追击南宋朝廷的核心人物。' },
      { timeText: '1129-1131年', periodLabel: '搜山检海与黄天荡', title: '金军南征主帅', nominalDuty: '追击宋高宗、打击南宋军队并寻找渡江北撤通道。', authorityScope: '直接调动南征主力、骑兵和占领区资源，但受长江水战、补给和宋军防线限制。', actualInfluence: '深入江南追击宋高宗，在黄天荡被韩世忠水军阻截，后开渠突围北撤。', modernEquivalent: '跨区域远征军主帅。', impact: '金军认识到长期占领江南成本过高，宋金战争逐渐转向淮河、长江防线对峙。' },
      { timeText: '1130年代-1148年', periodLabel: '宋金对峙与和议', title: '都元帅、太傅等军政重臣', nominalDuty: '统筹南线战争、占领区军政和对宋谈判，参与金朝中枢决策。', authorityScope: '对南线军队和部分对宋政策有重大影响，仍受金熙宗、宗室与中枢权力斗争制约。', actualInfluence: '与岳飞等宋军多次交战，后支持并执行绍兴和议框架，稳定金宋边界。', modernEquivalent: '近似最高国防统帅和外交安全决策者的复合职能。', impact: '宋金进入长期南北对峙，其形象也在两国史书和后世文学中高度分化。' },
    ],
  }),
  person({
    id: 'meng-gong', name: '孟珙', lifeText: '1195-1246年', birthYear: 1195, deathYear: 1246,
    categories: ['南宋将领', '边防统帅', '抗蒙人物'], crossDynastyLabels: ['南宋', '金末', '蒙古帝国'], dynastyIds: ['song-liao-jin-xixia'],
    summary: '南宋中后期名将，出身将门，参与联蒙灭金和蔡州之战，后长期经营京湖防线、抵御蒙古南侵，是南宋由联蒙到抗蒙转折中的关键统帅。',
    background: '南宋与金长期对峙，蒙古崛起后改变三方力量。宋廷一度选择联蒙灭金，却很快面对蒙古南下，京湖和长江中游成为国家防线核心。',
    childhood: '出生于襄阳一带的将门家庭，父亲孟宗政长期守卫京湖。孟珙从小接触边防、军粮、堡寨和骑步兵协同，成长环境不同于纯科举文官。',
    personality: '沉稳务实、重视情报、后勤和防御体系，能在战场胜利后转向长期边区治理；也善于安置降众和使用不同来源兵力。',
    policyInclination: '主张以京湖为中心建立纵深防御，兼顾主动出击、屯田、堡寨、军粮和流民安置，避免只依赖一次决战。',
    socialContribution: '在蒙古压力上升时维持长江中游防线，整合军队、地方行政和生产恢复，为南宋延续数十年提供重要安全条件。',
    impactSummary: '孟珙既参与金朝最后灭亡，又成为抵抗蒙古的主要宋将，体现短期联盟如何迅速转化为新边疆战争。',
    relatedEventIds: ['mongol-destroys-jin'],
    resume: [
      { timeText: '1217-1232年', periodLabel: '京湖抗金与边防历练', title: '南宋军官 / 京湖将领', nominalDuty: '协助父辈与地方军队守卫襄阳、枣阳等地，处理巡防、作战和军粮。', authorityScope: '早期仅指挥所属部队和具体防区，战略决策由制置司、朝廷和主帅决定。', actualInfluence: '在抗金作战中积累边防经验并逐步独立领军，熟悉京湖地形、流民和堡寨体系。', modernEquivalent: '近似边防部队军官和区域作战指挥员。', impact: '形成其以后重视防御纵深、后勤和多兵种协同的统帅风格。' },
      { timeText: '1233-1234年', periodLabel: '联蒙灭金与蔡州之战', title: '宋军主将 / 蔡州方面统帅', nominalDuty: '率宋军配合蒙古进攻蔡州，切断金军退路并执行灭金战略。', authorityScope: '可指挥参战宋军和战区攻城行动，对蒙古盟军无隶属指挥权，双方通过临时协作推进。', actualInfluence: '攻入蔡州并见证金哀宗自尽、金末帝被杀，金朝灭亡。', modernEquivalent: '联合战役中的一方战区指挥官。', impact: '南宋收复部分失地的期待很快与蒙古利益冲突，联盟迅速破裂。' },
      { timeText: '1235-1246年', periodLabel: '京湖制置与抗蒙', title: '京湖制置使等边防最高长官', nominalDuty: '统筹京湖军队、城防、粮饷、屯田、官员和对蒙古作战。', authorityScope: '可协调长江中游多个州军和地方资源，重大外交、财政和全国战略仍由朝廷决定。', actualInfluence: '多次阻击蒙古进攻，修复堡寨、安置流民并培养将领，使京湖防线保持稳定。', modernEquivalent: '近似大战区统帅兼边区军政协调负责人。', impact: '延缓蒙古沿长江中游突破，为南宋维持国势提供关键时间。' },
    ],
  }),
  person({
    id: 'lyu-wenhuan', name: '吕文焕', lifeText: '？-1298年', deathYear: 1298,
    categories: ['南宋将领', '元朝将领', '襄阳守将'], crossDynastyLabels: ['南宋', '元'], dynastyIds: ['song-liao-jin-xixia', 'yuan'],
    summary: '南宋襄阳守将，在元军长期围攻中坚守近六年，1273年因樊城失守、援军断绝而投降；后为元朝招降和攻宋，其经历具有忠守、投降与改仕的多重争议。',
    background: '襄阳、樊城控制汉水进入长江的通道，是南宋京湖防线核心。元军以围城、断援、水军和攻城器械逐步压缩城内生存空间，南宋中枢救援屡败。',
    childhood: '出生年份和幼年经历不详，出身宋代军将家族，兄长吕文德长期掌握京湖军务。其军事与政治资源主要来自家族军职和襄樊防区。',
    personality: '长期守城表现出坚忍和组织能力，面对孤城绝援后选择投降；此后积极为元效力，使后世评价在现实求生、保全民众与变节之间分裂。',
    policyInclination: '作为宋将时以守住襄阳和等待援军为目标；降元后转向帮助元廷利用熟悉的江防、官员和地方网络完成征服。',
    socialContribution: '其守城和降元经历为理解长期围城、军人忠诚、城内民众生存及王朝更替中的个人选择提供具体案例，而非单一忠奸标签。',
    impactSummary: '襄阳投降打开元军沿汉水、长江东进的战略通道，吕文焕又参与劝降宋将，加速南宋防线瓦解。',
    relatedEventIds: ['xiangyang-fancheng-campaign', 'song-fall'],
    disputeTabs: [
      { title: '失节评价', body: '传统强调守将应以死殉城，认为吕文焕降元并参与攻宋构成变节。' },
      { title: '围城处境', body: '另一视角关注六年围困、樊城失守、援军断绝和城内军民生存，分析投降在极端军事环境中的现实选择。' },
    ],
    resume: [
      { timeText: '1267年以前', periodLabel: '京湖军务任职', title: '南宋军将 / 襄阳知府兼守将', nominalDuty: '管理襄阳城防、守军、治安、军粮和周边水陆交通。', authorityScope: '可直接指挥襄阳守军并调配城内资源，跨区援军和全国战略由京湖制置司及朝廷决定。', actualInfluence: '依靠吕氏军将网络和长期边防经验掌握襄阳，是元军南下必须面对的守城主将。', modernEquivalent: '近似战略要塞军事主官兼地方战时行政负责人。', impact: '襄阳防守能力使元军不得不从快速进攻转为长期围城。' },
      { timeText: '1267-1273年', periodLabel: '襄樊围城', title: '襄阳守将', nominalDuty: '组织守城、反围攻、军粮和军民秩序，等待南宋援军。', authorityScope: '控制城内军队与防务，但无法决定朝廷救援、外部水路和樊城战局。', actualInfluence: '坚守多年，樊城被回回炮等攻破、外援断绝后向元军投降。', modernEquivalent: '被长期包围的战略要塞司令。', impact: '襄阳陷落使南宋长江防线失去西部门户。' },
      { timeText: '1273-1298年', periodLabel: '降元与参与攻宋', title: '元朝将领 / 招降与江南军务官员', nominalDuty: '为元军提供南宋江防、将领和州郡信息，参与作战与招降。', authorityScope: '可在元廷授权下指挥所部、接触宋军旧识，战略方向由忽必烈和元军统帅决定。', actualInfluence: '利用原有关系劝降部分宋将，参与元朝平定江南，后在元廷任职。', modernEquivalent: '改隶新政权的区域军事顾问与将领。', impact: '个人网络转化为元军征服资源，也使其历史评价长期具有强烈道德争议。' },
    ],
  }),
  person({
    id: 'zhang-shijie', name: '张世杰', lifeText: '？-1279年', deathYear: 1279,
    categories: ['南宋将领', '抗元人物', '流亡朝廷重臣'], crossDynastyLabels: ['南宋末', '元初'], dynastyIds: ['song-liao-jin-xixia', 'yuan'],
    summary: '南宋末年主要抗元将领，临安投降后与陆秀夫等拥立端宗、末帝，在东南沿海维持流亡朝廷；崖山海战失败后突围，随后遇风溺亡。',
    background: '元军突破襄阳并沿长江东进后，临安于1276年投降。部分宋臣、军队和宗室转向福建、广东沿海，依靠水军、港口和海外贸易维持抵抗。',
    childhood: '出生时间和幼年材料不详，据载早年由北方南下并进入宋军，主要履历集中在成年后的军旅生涯。不能从晚年忠烈形象反推其完整早年经历。',
    personality: '坚决主战、重视军队和皇统延续，在极端不利条件下仍能组织水军；战略上依赖海上机动，崖山把船队连结固守也限制了机动空间。',
    policyInclination: '坚持以宗室皇帝维持南宋合法性，通过沿海水军、地方军民和海外补给继续抗元，不接受临安投降作为战争终点。',
    socialContribution: '维持南宋最后数年的军事抵抗，保存流亡朝廷和沿海战争史料；战争同时使军民长期迁徙、饥病并承担巨大损失。',
    impactSummary: '张世杰是崖山最后防务的主要军事负责人，其失败标志南宋有组织的国家抵抗终结，也形成后世强烈的亡国忠烈记忆。',
    relatedEventIds: ['song-fall'],
    resume: [
      { timeText: '1250年代-1276年', periodLabel: '南宋军旅与临安保卫', title: '都统制等高级将领', nominalDuty: '指挥禁军或地方部队，承担长江、临安周边防御和战时调度。', authorityScope: '可指挥所属军队和具体战区，和战、全国兵力和财政仍由皇帝、枢密院与宰相决定。', actualInfluence: '元军南下时参与保卫临安和长江防线，临安投降后拒绝随朝廷降元。', modernEquivalent: '近似中央机动部队高级指挥官。', impact: '保存部分宋军主力并转向东南沿海继续抵抗。' },
      { timeText: '1276-1278年', periodLabel: '拥立端宗与海上流亡', title: '枢密副使、越国公 / 流亡朝廷军事主帅', nominalDuty: '保护宗室、统筹水陆军队、港口转移和对元作战。', authorityScope: '掌握流亡朝廷主要军力和船队，但兵员、粮食、港口及地方支持不断缩小。', actualInfluence: '与陆秀夫、陈宜中等拥立赵昰，在福建、广东沿海转战，端宗死后继续拥立赵昺。', modernEquivalent: '战时流亡政府的最高军事负责人。', impact: '延续南宋法统和军事抵抗，但持续迁徙削弱组织与补给。' },
      { timeText: '1278-1279年', periodLabel: '崖山海战', title: '崖山宋军主帅', nominalDuty: '组织船队防御、保护末帝和流亡朝廷，寻求击退元军或保存力量。', authorityScope: '直接指挥崖山船队与陆上营地，受海湾地形、补给封锁和元军水师包围限制。', actualInfluence: '将船只连结形成水上阵地，元军断水断粮后发起总攻；战败突围，后遇风溺亡。', modernEquivalent: '国家最后海上防御战役的总指挥。', impact: '宋军主力覆灭，南宋政权终结。' },
    ],
  }),
  person({
    id: 'lu-xiufu', name: '陆秀夫', lifeText: '1238-1279年', birthYear: 1238, deathYear: 1279,
    categories: ['南宋政治家', '抗元人物', '流亡朝廷宰辅'], crossDynastyLabels: ['南宋末', '元初'], dynastyIds: ['song-liao-jin-xixia', 'yuan'],
    summary: '南宋末进士和宰辅，临安失守后参与拥立端宗、末帝，在海上流亡朝廷负责政务、礼仪和教育；崖山战败时背负末帝赵昺投海。',
    background: '南宋中枢投降后，沿海抗元集团既要作战，也要用宗室继承、礼仪、诏令和官僚程序维持政权合法性。陆秀夫承担的正是流亡条件下的行政与皇统维护。',
    childhood: '生于楚州盐城，后随家迁居镇江，接受儒学和科举教育，1256年中进士。其成长路径属于南宋士大夫教育体系，与张世杰的军旅背景互补。',
    personality: '谨慎坚毅、重视礼法和责任，能在战争迁徙中维持文书与教育；最后投海体现传统臣节，也应看到幼帝与军民在亡国环境中缺少选择。',
    policyInclination: '坚持延续赵宋皇统和抗元立场，通过官僚礼仪、教育幼帝、签署诏令及协调军政维持流亡朝廷。',
    socialContribution: '保存南宋最后政权运作和士大夫责任的历史记忆，其忠节影响后世政治伦理；同时也需要反思以殉国作为唯一道德标准的局限。',
    impactSummary: '陆秀夫负帝投海成为南宋灭亡的象征性场景，把制度崩溃、个人忠诚和儿童皇帝的悲剧集中在崖山终局。',
    relatedEventIds: ['song-fall'],
    disputeTabs: [
      { title: '忠节叙事', body: '传统把负帝投海视为臣子不事二主、与国家共亡的最高忠节。' },
      { title: '生命与选择', body: '现代视角也会追问幼帝、军民是否拥有自主选择，并区分个人殉国伦理与国家对生命的责任。' },
    ],
    resume: [
      { timeText: '1256-1276年', periodLabel: '进士入仕与南宋末政务', title: '文官、礼部侍郎等', nominalDuty: '处理中央文书、礼仪、官员事务并参与战时政务。', authorityScope: '按官职参与具体部门与朝议，无独立军权，重大和战决定由皇帝和宰执集体作出。', actualInfluence: '在南宋末危机中进入中枢，临安投降后没有留在降元朝廷。', modernEquivalent: '近似中央行政与礼仪事务高级官员。', impact: '文官与礼制经验使其成为海上流亡朝廷维持政务的核心。' },
      { timeText: '1276-1278年', periodLabel: '拥立端宗与流亡政务', title: '签书枢密院事等宰辅', nominalDuty: '协调诏令、官员、军政文书和皇帝教育，维持流亡朝廷法统。', authorityScope: '可处理中央文书和参与最高议政，对军队的直接调动主要依赖张世杰等将领。', actualInfluence: '参与拥立赵昰，随朝廷转移福建、广东，端宗去世后又拥立赵昺。', modernEquivalent: '战时流亡政府的行政首脑成员兼国家元首办公室负责人。', impact: '使流亡集团仍能以宋朝国家名义发布命令和组织官员。' },
      { timeText: '1278-1279年', periodLabel: '崖山终局', title: '左丞相 / 末帝辅臣', nominalDuty: '辅佐幼帝、主持文官政务并与军事主帅共同维持最后防线。', authorityScope: '在流亡朝廷内具有最高文官权力，但受元军封锁、资源枯竭和张世杰军事安排限制。', actualInfluence: '崖山战败后背负赵昺投海，流亡朝廷文官系统随之终结。', modernEquivalent: '流亡政府最高行政负责人之一，殉国行为无现代公职对应。', impact: '成为宋亡忠节的象征，也留下关于国家、臣节和生命选择的长期讨论。' },
    ],
  }),
  person({
    id: 'liu-bingzhong', name: '刘秉忠', lifeText: '1216-1274年', birthYear: 1216, deathYear: 1274,
    categories: ['政治家', '规划人物', '元朝制度人物'], crossDynastyLabels: ['蒙古帝国', '元初'], dynastyIds: ['yuan'],
    summary: '忽必烈重要谋臣，早年曾为僧，后参与设计国号、礼制、官制和大都城市规划，是蒙古王府转向元朝中央国家制度的重要参与者。',
    background: '蒙古征服华北后，需要在宗王分权、草原传统和汉地财税行政之间建立可持续制度。忽必烈经营漠南时吸纳僧人、儒士和不同族群幕僚，刘秉忠由此进入核心。',
    childhood: '出身辽金以来的官僚家庭，少年学习经史、天文和术数，曾入武安山为僧，法名子聪。多种知识与宗教经历使他能在蒙古贵族和汉地士人之间沟通。',
    personality: '知识面广、长于制度规划和文书表达，政治上务实，能够把儒家王朝语言转化为忽必烈可执行的建国方案。其影响依赖君主长期信任。',
    policyInclination: '主张采用中原王朝官制、礼仪、年号和都城规划，加强中央行政与财税，同时保留蒙古皇权和宗王结构。',
    socialContribution: '参与大都和上都规划、国号与官制建设，使元朝统治拥有稳定行政空间和政治象征；具体工程由大量官员、工匠和民夫共同完成。',
    impactSummary: '刘秉忠把幕府谋划、城市规划和国家制度连接起来，是理解忽必烈为何能从蒙古宗王转为元朝皇帝的关键人物。',
    relatedEventIds: ['yuan-founding'],
    resume: [
      { timeText: '1230年代-1242年', periodLabel: '学习、出家与进入忽必烈幕府', title: '僧人子聪 / 王府顾问', nominalDuty: '以学术、宗教和术数知识为王府提供咨询。', authorityScope: '没有正式行政辖区，影响来自个人知识和忽必烈信任。', actualInfluence: '经海云禅师等推荐进入忽必烈幕府，开始参与华北治理和人才引荐。', modernEquivalent: '近似最高领导人政策顾问与跨学科幕僚。', impact: '成为忽必烈汉地幕僚集团的长期核心。' },
      { timeText: '1242-1260年', periodLabel: '漠南经营与制度建议', title: '王府谋臣 / 行政规划顾问', nominalDuty: '建议税赋、用人、城建和安抚汉地的政策，参与王府文书。', authorityScope: '可提出跨区域制度方案但无独立执行军队，落实依靠忽必烈授权和地方官。', actualInfluence: '参与邢州治理、开平城规划和汉地官僚网络建设，为忽必烈争夺汗位准备行政资源。', modernEquivalent: '政策规划与区域发展顾问。', impact: '帮助忽必烈建立区别于纯军事分封的治理基础。' },
      { timeText: '1260-1274年', periodLabel: '元朝建制与大都规划', title: '太保、参领中书省事', nominalDuty: '参与最高政务、礼制、官制、国号和都城规划。', authorityScope: '可进入中书省议政并协调制度设计，军事和宗王事务仍由皇帝及蒙古贵族决定。', actualInfluence: '参与定国号为元、制定礼仪官制，并主持大都规划等工作。', modernEquivalent: '近似中央政府高级政策协调官兼首都规划总顾问。', impact: '元朝的政治象征、行政制度与都城空间得到系统整合。' },
    ],
  }),
  person({
    id: 'el-temur', name: '燕铁木儿', lifeText: '？-1333年', deathYear: 1333,
    categories: ['元朝权臣', '将领', '宫廷政变人物'], crossDynastyLabels: ['元'], dynastyIds: ['yuan'],
    summary: '元朝钦察贵族和禁军将领，1328年两都之战中控制大都、拥立元文宗并击败上都集团，随后掌握枢密、军队和中枢人事，成为文宗朝最有权势的重臣。',
    background: '元泰定帝死后，皇位继承缺乏确定安排，大都与上都各有宗王、军队和官僚支持。宿卫、钦察军和首都控制决定哪一方能发布诏令并组织全国响应。',
    childhood: '出生年份和幼年资料有限，出身世代服务元廷的钦察军人家庭，父祖拥有宿卫和军事地位。其成长路径主要是怯薛、禁军和宫廷关系。',
    personality: '行动果断、擅长控制首都与组织军事联盟，能迅速利用继承真空；胜利后大规模扩张家族权势，也造成皇权和官僚制度被权臣网络挤压。',
    policyInclination: '优先维护自己拥立的文宗集团和钦察军政治利益，通过军权、人事和婚姻控制中枢，制度建设服从于政权安全与家族权力。',
    socialContribution: '其正面治理贡献有限，但两都之战的经历清楚展示元代首都政治、宿卫军、宗王继承和多族群军事集团如何共同运作。',
    impactSummary: '燕铁木儿结束两都军事对抗，却形成新的权臣专政；其死后家族迅速被清洗，说明依靠个人军权建立的中枢秩序难以稳定继承。',
    relatedEventIds: ['war-of-two-capitals'],
    resume: [
      { timeText: '1328年以前', periodLabel: '宿卫与钦察军任职', title: '佥枢密院事等禁军将领', nominalDuty: '管理宿卫、首都军队并参与枢密军事事务。', authorityScope: '可调动所辖钦察军和部分大都守军，全国军政仍受皇帝、枢密院及诸王控制。', actualInfluence: '依靠家族军职和首都宿卫网络进入权力核心。', modernEquivalent: '近似首都卫戍高级将领兼国防决策成员。', impact: '泰定帝死后具备率先控制大都的军事条件。' },
      { timeText: '1328年', periodLabel: '两都之战', title: '大都政变与军事联盟首领', nominalDuty: '控制大都、拥立新帝并抵御上都集团军队。', authorityScope: '实际掌握大都诏令、仓储和主要禁军，可向各地征调支持，仍需借皇族候选人提供合法性。', actualInfluence: '拥立图帖睦尔为文宗，击败支持阿速吉八的上都军队，决定皇位归属。', modernEquivalent: '继承危机中的首都军事强人，无现代合法职位对应。', impact: '大都取得元朝政治中心优势，皇权却更依赖拥立功臣。' },
      { timeText: '1328-1333年', periodLabel: '文宗朝权臣政治', title: '太平王、太师、右丞相等', nominalDuty: '参与最高军政、人事、财政和皇室安全事务。', authorityScope: '名义上是皇帝下属，实际通过军队、亲属和党羽广泛控制中枢任命。', actualInfluence: '在文宗、明宗更替及文宗复位中保持主导，家族获得大量封赏，直至病死。', modernEquivalent: '掌握首都军权和政府人事的最高权臣，现代无准确类比。', impact: '权臣网络压缩皇帝和官僚自主性，其死后政治迅速反转。' },
    ],
  }),
  person({
    id: 'tegshi', name: '铁失', lifeText: '？-1323年', deathYear: 1323,
    categories: ['元朝官员', '政变人物', '南坡之变参与者'], crossDynastyLabels: ['元'], dynastyIds: ['yuan'],
    summary: '元英宗时期御史大夫，因改革触及既得利益并卷入宫廷权力冲突，1323年在南坡组织刺杀英宗和丞相拜住，事后被泰定帝处死。',
    background: '元英宗与拜住试图整顿财政、裁减冗官并抑制太后和权贵集团利益，改革引起部分蒙古贵族和官员反对。皇帝巡幸往返时的宿卫安全成为政变机会。',
    childhood: '出生、家世和幼年经历缺乏完整可靠材料，已知其成年后依靠元廷官僚和宿卫政治进入高位。无法从一次政变记录推定全部早年性格。',
    personality: '敢于在高风险环境组织暴力行动，善于联络不满官员和宿卫；但政变缺乏可持续合法性，刺杀成功后很快被新朝清算。',
    policyInclination: '主要代表反对英宗、拜住改革的权贵利益和个人政治安全诉求，没有留下系统治理方案，核心手段是通过刺杀改变皇位与人事。',
    socialContribution: '没有明确正面贡献，其历史意义在于揭示元代改革、宿卫安全与皇位继承之间的脆弱关系，以及政治暴力对制度连续性的破坏。',
    impactSummary: '南坡之变终止英宗改革并促成泰定帝即位，随后又埋下皇统争议，最终通向1328年两都之战。',
    relatedEventIds: ['nanpo-incident'],
    resume: [
      { timeText: '1323年以前', periodLabel: '英宗朝任职', title: '御史大夫', nominalDuty: '领导御史台监察官员、纠察行政和向皇帝进谏。', authorityScope: '可调查、弹劾官员并接触中枢机密，但无权决定皇位继承或合法处置皇帝。', actualInfluence: '身居监察高位并与受改革影响的权贵、宿卫形成联系。', modernEquivalent: '近似中央最高监察机关负责人，但古代御史兼有强烈政治纠察权。', impact: '正式监察权和非正式宫廷网络被用于筹备政变。' },
      { timeText: '1323年', periodLabel: '南坡之变与被诛', title: '政变组织者', nominalDuty: '无合法职务授权，秘密组织宿卫和官员刺杀皇帝。', authorityScope: '实际只能动用参与密谋的宿卫和私人网络，缺乏全国军政控制与稳定继承安排。', actualInfluence: '在南坡刺杀元英宗与拜住，迎立泰定帝后仍被逮捕处死。', modernEquivalent: '宫廷刺杀和政变首谋，不对应任何现代合法公职。', impact: '英宗改革中断，元代皇统与中枢政治进一步失序。' },
    ],
  }),
  person({
    id: 'wang-zhen-ming', name: '王振', lifeText: '？-1449年', deathYear: 1449,
    categories: ['宦官', '明朝权臣', '土木堡人物'], crossDynastyLabels: ['明', '明英宗时期'], dynastyIds: ['ming'],
    summary: '明英宗信任的司礼监宦官，掌握内廷文书和政治影响，1449年促成英宗亲征瓦剌并干预行军，土木堡惨败时被杀，成为明代宦官专权的重要案例。',
    background: '明代废丞相后，皇帝依靠内阁票拟与司礼监批红处理政务。英宗即位年幼，王振凭近侍和教育关系进入权力中心，北方瓦剌势力上升又制造军事压力。',
    childhood: '出生年份、早年家庭和入宫细节存在不同说法，较可靠履历集中在其入宫后服务太子、英宗并掌握司礼监。对其早年动机不宜作戏剧化推断。',
    personality: '善于利用皇帝信任和内廷信息，权力欲强，对军事声望与政治控制判断过度自信；亲征中的路线干预显示其缺乏大型军队指挥经验。',
    policyInclination: '维护司礼监和个人网络对中枢文书、人事的影响，倾向以皇帝亲征快速建立威望，却没有充分尊重军队补给、情报和指挥程序。',
    socialContribution: '正面贡献有限，其经历帮助理解司礼监批红、皇帝近侍与内阁的权力关系，也说明缺乏专业约束的军事决策会造成国家灾难。',
    impactSummary: '土木堡之变导致英宗被俘、明军精锐和官员大量损失，北京进入紧急防御；王振因此成为宦官干政和决策失误的典型。',
    relatedEventIds: ['tumu-crisis'],
    resume: [
      { timeText: '1420年代-1435年', periodLabel: '东宫与英宗早期近侍', title: '东宫局郎、内廷近侍', nominalDuty: '服务太子教育、传达文书并管理部分宫廷事务。', authorityScope: '正式权限限于内廷和东宫，政治影响主要来自与未来皇帝的长期亲近。', actualInfluence: '取得英宗信任，皇帝即位后迅速进入司礼监核心。', modernEquivalent: '国家元首私人秘书与宫廷事务官的职能近似，但古代近侍权力更依赖个人关系。', impact: '师傅式近侍关系成为其绕开外廷官僚的权力基础。' },
      { timeText: '1435-1449年', periodLabel: '司礼监掌权', title: '司礼监掌印太监', nominalDuty: '掌管内廷文书、批红流程、传达皇帝命令和宫廷机构。', authorityScope: '可影响奏章流转和皇帝决策入口，但无宰相法定统辖权；实际因皇帝信任干预人事与军政。', actualInfluence: '扩大宦官网络，对内阁和大臣形成压力，并推动英宗亲征瓦剌。', modernEquivalent: '无准确现代类比，兼具元首办公厅秘书长、机要与宫廷主管功能。', impact: '内廷文书权转化为跨部门政治影响，削弱专业军事与官僚制衡。' },
      { timeText: '1449年', periodLabel: '英宗亲征与土木堡', title: '随驾司礼监首领 / 非正式决策者', nominalDuty: '随侍皇帝、传达军令并保障御营内廷事务。', authorityScope: '无正式全军统帅权，却能凭皇帝信任改变行军和宿营决策，实际影响超过官职边界。', actualInfluence: '在仓促亲征、退军路线和土木堡宿营中施加强大影响，明军被瓦剌包围后死于乱军。', modernEquivalent: '介入最高军事决策的非专业元首近臣。', impact: '明军惨败和皇帝被俘，引发北京保卫战与皇位更替。' },
    ],
  }),
  person({
    id: 'esen', name: '绰罗斯·也先', formalName: '也先', lifeText: '？-1455年', deathYear: 1455,
    categories: ['瓦剌首领', '军事政治领袖', '明代边疆人物'], crossDynastyLabels: ['明', '瓦剌'], dynastyIds: ['ming'],
    summary: '15世纪瓦剌太师和后来的蒙古大汗，整合蒙古诸部并在土木堡击败明军、俘虏明英宗，继而围攻北京；退兵后因称汗与内部权力冲突被杀。',
    background: '北元之后蒙古诸部与瓦剌长期竞争，明朝通过朝贡、贸易和军事分化处理北方关系。也先扩大瓦剌势力，贸易争端和边境紧张最终升级为战争。',
    childhood: '出生年份和幼年记录有限，父亲脱欢是瓦剌重要首领，也先在草原联盟、部落军事和对明贸易环境中成长，继承强大政治军事网络。',
    personality: '军事判断敏锐、善于利用明军行军混乱和补给弱点，能通过俘虏皇帝进行政治谈判；称汗过快则破坏与蒙古贵族的联盟。',
    policyInclination: '以整合蒙古诸部、控制草原贸易和提高对明议价能力为核心，通过军事威慑、朝贡贸易和皇帝俘虏同时施压。',
    socialContribution: '从瓦剌与蒙古视角，他推动短期统一和草原政治重组；战争对明朝军民和边境社会造成重大损失，不能只以民族英雄或反派概括。',
    impactSummary: '也先的土木堡胜利打破明初北方军事优势，促成景泰帝即位和北京防御重组；其内部失败也显示草原联盟仍受传统汗统合法性限制。',
    relatedEventIds: ['tumu-crisis'],
    resume: [
      { timeText: '1430年代-1449年', periodLabel: '瓦剌太师与草原扩张', title: '瓦剌太师 / 联盟军事领袖', nominalDuty: '统率瓦剌军队、协调部落首领、管理对明贸易和周边战争。', authorityScope: '可调动瓦剌本部和盟军，仍需维护蒙古汗与各部贵族的名义和利益平衡。', actualInfluence: '整合蒙古高原大部势力，对明朝北边形成集中军事压力。', modernEquivalent: '草原军事联盟实际首领，兼具最高统帅和外交决策者职能。', impact: '瓦剌从区域力量上升为能直接挑战明朝的草原霸权。' },
      { timeText: '1449-1450年', periodLabel: '土木堡与北京围攻', title: '瓦剌统帅 / 明英宗俘获者', nominalDuty: '组织对明作战、处理俘虏皇帝和谈判贸易条件。', authorityScope: '掌握瓦剌主力和英宗人身，可对明施压，但无法直接控制北京城防和明朝新皇权。', actualInfluence: '在土木堡击溃明军并俘虏英宗，随后围攻北京，被于谦组织的防御击退，次年释放英宗。', modernEquivalent: '敌对联盟最高军事统帅兼战时谈判决策者。', impact: '明朝在没有被俘皇帝的情况下重建权力中心，也先以人质迫降的目标失败。' },
      { timeText: '1451-1455年', periodLabel: '称汗与内部失败', title: '太师、蒙古大汗', nominalDuty: '统治草原联盟并以大汗身份处理分封、战争和部落关系。', authorityScope: '军事势力强大，但非成吉思汗黄金家族出身，合法性受到诸部贵族抵制。', actualInfluence: '废黜原蒙古汗后自立，因分封和权力矛盾遭部下反叛并被杀。', modernEquivalent: '依靠军事联盟称立的草原最高统治者。', impact: '瓦剌霸权迅速分裂，蒙古高原重新进入多部竞争。' },
    ],
  }),
  person({
    id: 'yang-tinghe', name: '杨廷和', lifeText: '1459-1529年', birthYear: 1459, deathYear: 1529,
    categories: ['政治家', '明朝内阁首辅', '大礼议人物'], crossDynastyLabels: ['明', '武宗至世宗时期'], dynastyIds: ['ming'],
    summary: '明武宗、世宗之际内阁首辅，武宗死后主持迎立朱厚熜并稳定政务；大礼议中坚持世宗应以孝宗为皇考，因与皇帝冲突辞职。',
    background: '明武宗无子而亡，皇位需从宗室旁支选择。内阁既要处理继承、财政和边防，也要决定新皇帝在宗法礼制中如何承继孝宗，这一礼仪问题实际关系皇权与文官解释权。',
    childhood: '出身四川新都士人家庭，少年以科举经学成长，十二岁中举的记载显示其早慧，后进入翰林和内阁文官培养路径。',
    personality: '行政经验丰富、重视文官程序和礼制原则，在继承危机中果断稳局；面对世宗坚持本生父母尊号时缺少妥协，最终退出中枢。',
    policyInclination: '主张以内阁和礼部依据宗法、典章约束皇位继承，整顿武宗时期弊政，强调新君承继孝宗法统。',
    socialContribution: '武宗死后避免长期皇位真空并恢复部分行政秩序；大礼议则成为明代皇权、内阁、礼部和士大夫政治边界的典型案例。',
    impactSummary: '杨廷和迎立世宗却因礼制争议失去权力，说明文官可以组织继承，却不能在皇帝亲政后垄断合法性解释。',
    relatedEventIds: ['great-rites-controversy'],
    resume: [
      { timeText: '1478-1507年', periodLabel: '翰林与东宫文官', title: '翰林官、东宫讲读官', nominalDuty: '编修文书、讲解经史并参与皇室教育。', authorityScope: '主要限于文书、学术和皇太子教育，无独立地方或军政权。', actualInfluence: '积累典章、文书和宫廷教育经验，进入内阁人才梯队。', modernEquivalent: '近似中央政策研究、元首文稿与储君教育官员。', impact: '为后续处理继承与礼制问题准备专业资格。' },
      { timeText: '1507-1521年', periodLabel: '武宗朝内阁与首辅', title: '大学士、内阁首辅', nominalDuty: '票拟奏章、协调六部、处理财政边防并向皇帝提供决策建议。', authorityScope: '可统筹文官中枢但无独立诏令和军权，决策需皇帝批红，受刘瑾等宦官及近幸干扰。', actualInfluence: '在武宗怠政和近幸政治中维持行政运转，武宗死后主持继承安排。', modernEquivalent: '近似政府最高政策协调者，但不是独立于皇帝的总理。', impact: '保障无嗣皇帝死后的中枢连续性。' },
      { timeText: '1521-1524年', periodLabel: '迎立世宗与大礼议', title: '内阁首辅 / 辅政大臣', nominalDuty: '迎立新君、整顿政务并解释皇统礼制。', authorityScope: '能组织内阁和礼部意见，却不能否定皇帝对亲属尊号与皇权合法性的最终坚持。', actualInfluence: '迎立朱厚熜，清理武宗近幸；因反对尊兴献王为皇考与世宗冲突，辞职归乡。', modernEquivalent: '继承过渡期政府首席协调官与宪制礼仪顾问。', impact: '大礼议由学术礼制争论转为皇帝重建亲信和控制文官的政治斗争。' },
    ],
  }),
  person({
    id: 'zhang-cong', name: '张璁（后赐名孚敬）', formalName: '张璁', lifeText: '1475-1539年', birthYear: 1475, deathYear: 1539,
    categories: ['政治家', '明朝内阁首辅', '大礼议人物'], crossDynastyLabels: ['明', '嘉靖时期'], dynastyIds: ['ming'],
    summary: '明世宗时期官员，大礼议中支持皇帝尊生父兴献王为皇考，因而迅速进入中枢并任内阁首辅；后获赐名孚敬，是嘉靖初年皇权重组的重要人物。',
    background: '朱厚熜以藩王入继大统，杨廷和等要求其在礼法上成为孝宗之子。张璁提出“继统不继嗣”等主张，为世宗保留本生父子名分提供经学和政治依据。',
    childhood: '出身浙江永嘉士人家庭，长期参加科举，四十余岁才中进士。多年经学与科举经历使其熟悉礼制论辩，也使其入仕后更依赖皇帝赏识。',
    personality: '辩论能力强、立场坚定，敢于挑战资深首辅和多数廷臣；掌权后用人强硬，容易把礼制分歧转化为政治排斥。',
    policyInclination: '支持世宗强化皇权、重定皇统礼制并削弱杨廷和旧臣影响，同时参与整顿官僚和嘉靖初政。',
    socialContribution: '其论述改变嘉靖朝皇统礼仪和中枢人事，帮助理解经学解释如何直接参与国家权力分配；政策评价与政治投机争议并存。',
    impactSummary: '张璁借大礼议从新科进士升至首辅，显示皇帝可以通过提拔少数派重组官僚联盟；廷杖和清洗也加深嘉靖朝君臣隔阂。',
    relatedEventIds: ['great-rites-controversy'],
    disputeTabs: [
      { title: '礼学主张', body: '支持者认为张璁维护世宗与生父的自然亲属伦理，并提出可自洽的皇统解释。' },
      { title: '政治路径', body: '批评者认为其借迎合皇帝快速升迁，并通过大礼议排斥异己，强化皇权对文官的压制。' },
    ],
    resume: [
      { timeText: '1517年以前', periodLabel: '长期科举与地方士人阶段', title: '士人 / 科举应试者', nominalDuty: '研习经史、参加科举并参与地方士人活动。', authorityScope: '无国家行政权限，社会影响限于家乡和士人网络。', actualInfluence: '多次应试后在四十余岁中进士，形成对礼经文本的深入熟悉。', modernEquivalent: '长期准备国家考试的地方知识分子。', impact: '经学积累成为其介入大礼议的主要专业资本。' },
      { timeText: '1521-1524年', periodLabel: '大礼议进言与快速升迁', title: '进士、翰林学士等', nominalDuty: '按新任官员身份议论典礼、起草文书并向皇帝进言。', authorityScope: '初无部门管辖权，影响来自奏疏被世宗采纳和皇帝直接提拔。', actualInfluence: '提出支持世宗尊生父的礼制方案，成为皇帝对抗杨廷和集团的理论与政治盟友。', modernEquivalent: '从政策研究官快速上升的元首特别顾问。', impact: '大礼议的少数派意见转化为皇帝重组中枢的工具。' },
      { timeText: '1524-1535年', periodLabel: '嘉靖初年入阁与首辅', title: '礼部尚书、大学士、内阁首辅', nominalDuty: '参与礼制、票拟、人事和国家政策协调，辅佐世宗处理政务。', authorityScope: '可领导内阁和影响六部人事，但诏令最终由皇帝裁决，权力高度依赖世宗信任。', actualInfluence: '推动大礼议结论落实，排除反对者并参与嘉靖初期行政整顿；数次因病和政争离任。', modernEquivalent: '政府最高政策协调者兼礼制主管。', impact: '皇帝亲信取代旧内阁集团，嘉靖朝中枢权力结构重建。' },
      { timeText: '1535-1539年', periodLabel: '退居与去世', title: '致仕首辅', nominalDuty: '离开日常政务，保留荣衔并接受朝廷礼遇或监督。', authorityScope: '不再直接管理内阁和六部，政治影响限于旧部与皇帝评价。', actualInfluence: '因健康与政治压力归乡，后获赐名孚敬，去世后评价随朝局反复。', modernEquivalent: '退休的前政府首脑成员。', impact: '其政治遗产继续影响嘉靖帝与文官集团关系。' },
    ],
  }),
  person({
    id: 'guan-tianpei', name: '关天培', lifeText: '1781-1841年', birthYear: 1781, deathYear: 1841,
    categories: ['清朝将领', '海防人物', '鸦片战争人物'], crossDynastyLabels: ['清', '鸦片战争'], dynastyIds: ['qing'],
    summary: '清代水师将领、广东水师提督，协助林则徐整顿虎门海防；1841年英军进攻虎门炮台时率军抵抗并战死，是第一次鸦片战争海防的重要人物。',
    background: '清代广东海防依赖炮台、水师、绿营和地方财政，武器、训练和指挥体系与工业化海军存在差距。禁烟冲突升级后，虎门成为广州门户。',
    childhood: '生于江苏山阳，家境普通，早年以武职进入清军，从基层水师和河防职务逐级升迁。具体幼年生活材料有限，其能力主要在长期军旅中形成。',
    personality: '勤于整顿军务、重视炮台和训练，临战坚决；但身处装备、兵饷和跨部门协调不足的体制，个人勇敢无法弥补整体海防差距。',
    policyInclination: '支持加强沿海炮台、水师训练和禁烟防务，主张在虎门正面抵抗英军，军事思路仍以岸炮和传统水师体系为基础。',
    socialContribution: '参与虎门炮台建设和广东海防整顿，其战死成为近代海防责任的象征，也提醒不能把战争失败仅归结为将领个人勇怯。',
    impactSummary: '关天培的履历把林则徐禁烟、虎门工程和实际海战连接起来，展示晚清技术、财政、训练与指挥体系共同面临的危机。',
    relatedEventIds: ['opium-war'],
    resume: [
      { timeText: '1803-1834年', periodLabel: '基层武职与水师历练', title: '把总、参将、副将等水师军官', nominalDuty: '训练士兵、巡防河海、管理舰船炮械并执行缉私治安。', authorityScope: '按营制指挥所属官兵和船只，跨省海防、财政及外交由督抚和朝廷决定。', actualInfluence: '从基层武职逐步升迁，积累水战、河防和营务管理经验。', modernEquivalent: '近似从基层晋升的海军或海岸警备军官。', impact: '长期实务使其成为广东水师整顿的合适人选。' },
      { timeText: '1834-1839年', periodLabel: '广东水师提督与虎门设防', title: '广东水师提督', nominalDuty: '统领广东水师、沿海炮台、巡防缉私和战备训练。', authorityScope: '可指挥全省水师与炮台守军，军费、外交、贸易和绿营跨区调动受两广总督及朝廷制约。', actualInfluence: '修筑和整顿虎门炮台，训练水师，配合林则徐执行禁烟与海防。', modernEquivalent: '近似省级海军战区司令兼海岸防卫负责人。', impact: '虎门形成较完整岸防体系，但舰炮和后勤仍明显落后。' },
      { timeText: '1839-1841年', periodLabel: '鸦片战争与虎门战死', title: '广东水师提督 / 虎门守军主将', nominalDuty: '组织炮台作战、保护广州门户并阻止英军舰队突破。', authorityScope: '直接指挥虎门炮台和部分水师，无法控制朝廷和战、外省增援及英军海上机动。', actualInfluence: '在英军进攻虎门时坚持抵抗，炮台失守后战死。', modernEquivalent: '海岸要塞与区域海防最高军事指挥官。', impact: '其牺牲强化海防改革呼声，也暴露传统防御体系面对蒸汽舰炮的局限。' },
    ],
  }),
  person({
    id: 'li-xiucheng', name: '李秀成', lifeText: '1823-1864年', birthYear: 1823, deathYear: 1864,
    categories: ['太平天国人物', '将领', '忠王'], crossDynastyLabels: ['晚清', '太平天国'], dynastyIds: ['qing'],
    summary: '太平天国后期主要将领，封忠王，在天京事变后承担江浙战场和天京防御；1864年天京失守后被俘处死，留下供词成为研究太平天国的重要争议史料。',
    background: '天京事变使太平天国早期领导层瓦解，清军湘军、淮军和地方团练逐步加强，江南城市、粮道和外国势力态度成为后期战争关键。',
    childhood: '出生于广西藤县贫苦农民家庭，早年生活资料有限，起义后从普通参加者凭军功上升。基层经历使其较熟悉士兵和地方民众，但后期已成为掌握大军的王爵。',
    personality: '军事机动和组织能力强，能在危局中重建部队，也较重视保存实力和地方经营；与洪秀全在战略判断上常有分歧，未能改变天京中心主义。',
    policyInclination: '主张经营苏浙财赋区、以机动作战牵制清军，并多次建议天京突围；政治上仍维护太平天国和洪氏皇权。',
    socialContribution: '其战争造成与承受都很巨大，正面建设主要是后期军政组织和部分地方秩序；《李秀成自述》保存重要当事人视角，但文本有删改争议。',
    impactSummary: '李秀成是太平天国从再起到覆亡的核心将领，与曾国藩、李鸿章等对手构成晚清地方军队兴起和江南战乱的关键关系。',
    relatedEventIds: ['taiping-rebellion', 'tianjing-incident'],
    disputeTabs: [
      { title: '忠王形象', body: '强调李秀成在危局中整军、保护幼天王和坚持作战，是太平天国后期最重要统帅。' },
      { title: '供词争议', body: '其被俘后的自述是否包含求生、劝降和曾国藩删改，长期存在文本与动机争论。' },
    ],
    resume: [
      { timeText: '1851-1856年', periodLabel: '参加起义与军中上升', title: '太平军基层将领至指挥官', nominalDuty: '率部行军、攻守城池、征集军粮并执行上级战略。', authorityScope: '早期仅能指挥所属部队，战略由东王、翼王等中央领导决定。', actualInfluence: '凭作战能力从普通参与者逐步升任重要将领。', modernEquivalent: '由基层晋升的野战部队指挥官。', impact: '天京事变后成为重建太平军领导层的人选。' },
      { timeText: '1857-1861年', periodLabel: '忠王与江浙战场', title: '忠王 / 太平军方面统帅', nominalDuty: '统率大军经营苏州、杭州等地，组织作战、粮饷和地方军政。', authorityScope: '可调动所辖军队并管理占领区，封王和全国战略仍由洪秀全及天京中枢决定。', actualInfluence: '参与三河大捷后扩大战果，攻取苏州等江南城市，太平天国一度重新获得财赋和兵源。', modernEquivalent: '大战区统帅兼占领区军政负责人。', impact: '支撑太平天国后期局势，也使战争进一步深入江南人口与经济中心。' },
      { timeText: '1862-1864年', periodLabel: '天京保卫与被俘', title: '忠王 / 天京后期主帅', nominalDuty: '抵御湘军、淮军和地方武装，保护天京与幼天王。', authorityScope: '掌握部分主力但受洪秀全命令、粮荒、各军分散和清军包围限制。', actualInfluence: '建议突围未被完全采纳，天京失守后保护幼天王出城，自己被俘并遭曾国藩处死。', modernEquivalent: '覆亡政权的最后主要军事统帅。', impact: '太平天国中央军事力量崩溃，其供词成为后世研究核心材料。' },
    ],
  }),
  person({
    id: 'chen-yucheng', name: '陈玉成', lifeText: '1837-1862年', birthYear: 1837, deathYear: 1862,
    categories: ['太平天国人物', '将领', '英王'], crossDynastyLabels: ['晚清', '太平天国'], dynastyIds: ['qing'],
    summary: '太平天国后期青年名将，封英王，与李秀成共同重建天京事变后的军事局面，三河大捷重创湘军；后在安庆失守和突围中被诱捕处死。',
    background: '天京事变后太平天国急需新一代统帅，清军则围绕长江和安庆推进。安庆是天京上游粮道和屏障，湘军水陆并进使防守压力持续增加。',
    childhood: '出生于广西藤县农民家庭，少年时期参加金田起义，几乎全部成年经历都在战争中。早年教育资料缺乏，其能力主要来自军队实战和太平军组织。',
    personality: '勇敢敏锐、擅长快速机动和战场突击，年轻而有威望；面对安庆长期围困和盟友不稳时，战略资源和政治经验不足。',
    policyInclination: '以长江中上游军事防御、机动作战和保护天京为核心，政治制度主张记录较少，不宜从其将领身份推定完整治国观点。',
    socialContribution: '正面贡献主要体现在太平军军事组织和牵制清军，其战争同样给安徽、湖北等地民众带来破坏。人物价值在于理解后期战局而非单纯英雄化。',
    impactSummary: '陈玉成被杀使太平天国失去上游最重要统帅，安庆和长江防线崩溃，湘军得以集中进逼天京。',
    relatedEventIds: ['taiping-rebellion', 'tianjing-incident'],
    resume: [
      { timeText: '1851-1856年', periodLabel: '少年从军与快速升迁', title: '太平军青年将领', nominalDuty: '率领所属兵力参加攻城、守城和野战，执行中枢军令。', authorityScope: '随军职上升扩大指挥范围，早期无独立战区与政治决策权。', actualInfluence: '从少年兵成长为能独立带兵的将领，在多次战斗中建立声望。', modernEquivalent: '快速晋升的野战军军官。', impact: '天京事变后成为填补高级将领缺口的核心人才。' },
      { timeText: '1857-1860年', periodLabel: '英王与三河大捷', title: '英王 / 长江上游方面统帅', nominalDuty: '统率安徽、湖北方向军队，解除天京压力并打击湘军。', authorityScope: '可独立组织大规模战役和调动所辖部队，全国战略和封爵由洪秀全决定。', actualInfluence: '与李秀成等在三河击败湘军李续宾部，缓解天京外围压力。', modernEquivalent: '大战区野战军司令。', impact: '太平天国在领导层内乱后重新获得军事主动。' },
      { timeText: '1860-1862年', periodLabel: '安庆危机与被捕', title: '英王 / 安庆救援主帅', nominalDuty: '保卫长江上游据点、组织安庆解围和撤退。', authorityScope: '受湘军围城、粮道断绝和太平军多路协同失败限制，无法统一所有援军。', actualInfluence: '安庆解围失败后向北转移，被苗沛霖诱捕并交清军，1862年在河南就义。', modernEquivalent: '战区失利后的突围军团主帅。', impact: '太平天国上游防线失去核心，天京被围形势加速形成。' },
    ],
  }),
  person({
    id: 'huang-xing', name: '黄兴', lifeText: '1874-1916年', birthYear: 1874, deathYear: 1916,
    categories: ['革命家', '辛亥革命人物', '军事组织者'], crossDynastyLabels: ['晚清', '民国'], dynastyIds: ['qing'],
    summary: '近代民主革命家，与孙中山共同领导同盟会，参与或组织多次武装起义；武昌起义后任战时总司令，民国初年反对袁世凯专权。',
    background: '甲午战败、清末新政、留学和新军发展推动革命网络形成。革命派需要在海外筹款、秘密组织、宣传和国内新军起义之间建立协作。',
    childhood: '生于湖南善化士绅家庭，接受传统教育后进入新式学堂并留学日本，接触民族国家、军事和革命思想。其转变体现晚清新式教育对知识青年的影响。',
    personality: '行动力强、愿意承担高风险军事任务，重视组织协作且个人作风较为克制；连续起义失败也显示革命派军事资源和保密能力有限。',
    policyInclination: '主张推翻清朝、建立共和，重视军事起义和新军动员；民国初年反对袁世凯破坏共和制度。',
    socialContribution: '组织华兴会、同盟会和多次起义，把海外革命思想转化为国内军事行动；与孙中山形成政治宣传和军事组织的互补。',
    impactSummary: '黄兴虽多次起义失败，但持续积累革命网络和经验，武昌起义后成为战时军事中心人物，是辛亥革命不能缺少的组织者。',
    relatedEventIds: ['xinhai-revolution'],
    resume: [
      { timeText: '1898-1904年', periodLabel: '新式教育、留日与华兴会', title: '教师、留学生 / 革命组织者', nominalDuty: '学习新知识、从事教育并联络反清青年。', authorityScope: '无清廷行政权，组织能力依赖学校、同乡和秘密社团。', actualInfluence: '在湖南组织华兴会，筹划长沙起义，失败后流亡日本。', modernEquivalent: '民间政治组织发起人和青年运动组织者。', impact: '地方革命团体为全国性同盟会准备干部和网络。' },
      { timeText: '1905-1911年10月', periodLabel: '同盟会与武装起义', title: '同盟会执行部负责人 / 起义指挥者', nominalDuty: '策划国内起义、筹集武器经费、训练人员并协调海外支援。', authorityScope: '可指挥参与行动的革命党人，无稳定领土和正规财政，受清军侦缉与地方条件限制。', actualInfluence: '参与钦廉、防城、镇南关和黄花岗等起义，黄花岗战斗中负伤。', modernEquivalent: '地下政治组织军事负责人。', impact: '连续行动扩大反清影响并训练革命骨干，但也造成重大人员牺牲。' },
      { timeText: '1911年10月-1912年', periodLabel: '武昌起义后的战争与共和建立', title: '革命军战时总司令、南京临时政府陆军总长', nominalDuty: '指挥汉阳等前线作战，整合各省革命军并建设临时政府军事机构。', authorityScope: '对名义所辖革命军有指挥权，各省军队和财政高度分散，重大政治安排由各派协商。', actualInfluence: '在武汉前线组织抵抗，后参与南北议和和南京临时政府。', modernEquivalent: '革命联军战时总司令与临时政府国防部长。', impact: '帮助地方起义转化为全国政权更替与共和建国。' },
      { timeText: '1912-1916年', periodLabel: '民国初年反袁活动', title: '国民党领袖、讨袁军事组织者', nominalDuty: '参与政党政治、维护共和并组织反对袁世凯的军事行动。', authorityScope: '政治影响来自党派和地方军队，不掌握稳定中央行政。', actualInfluence: '宋教仁案后二次革命失败，流亡后继续反袁，1916年病逝。', modernEquivalent: '在野党领袖和反专制军事联盟组织者。', impact: '其晚年经历显示辛亥革命成功并未自动建立稳定共和制度。' },
    ],
  }),
  person({
    id: 'sushun', name: '爱新觉罗·肃顺', formalName: '爱新觉罗·肃顺', lifeText: '1816-1861年', birthYear: 1816, deathYear: 1861,
    categories: ['清朝宗室', '政治家', '辛酉政变人物'], crossDynastyLabels: ['清', '咸丰时期'], dynastyIds: ['qing'],
    summary: '咸丰帝晚年重臣和顾命八大臣核心，主张整顿财政与官场，咸丰死后辅佐同治帝；辛酉政变中被慈安、慈禧与恭亲王集团逮捕处死。',
    background: '第二次鸦片战争、太平天国和财政危机削弱清廷，咸丰帝北逃热河后依赖肃顺等近臣。皇帝死后，幼帝、两宫太后、顾命大臣和留京恭亲王之间缺少稳定权力分配。',
    childhood: '出身宗室，父亲为郑亲王乌尔恭阿，早年在宗室和八旗体系中成长。因并非嫡长继承核心，其仕途更多依靠个人办事能力和咸丰信任。',
    personality: '行政强硬、敢于得罪权贵，重视财政和人事整顿；对两宫太后和恭亲王的政治能力估计不足，顾命集团控制诏令的方式也激化冲突。',
    policyInclination: '主张加强皇帝与顾命大臣对财政、官员和军务的控制，支持重用曾国藩等地方力量，但反对后妃直接参与外朝政治。',
    socialContribution: '在危机中参与财政整顿和地方用人，其政策能力获得部分肯定；顾命政治失败则说明幼帝时期缺少制度化摄政安排。',
    impactSummary: '肃顺被处死使辛酉政变成功，两宫垂帘与恭亲王议政形成新权力结构，晚清中央政治由此转向慈禧长期主导。',
    relatedEventIds: ['second-opium-war', 'xinyou-coup'],
    disputeTabs: [
      { title: '能臣评价', body: '部分评价肯定肃顺敢于整顿财政、打击贪腐并支持曾国藩等地方实务人才。' },
      { title: '权力冲突', body: '批评认为其专断、树敌过多，并试图以顾命大臣排除两宫太后和恭亲王，最终造成政变。' },
    ],
    resume: [
      { timeText: '1850年以前', periodLabel: '宗室与中低级官职', title: '宗室官员、御前侍卫等', nominalDuty: '承担宫廷宿卫、宗室和具体行政差遣。', authorityScope: '权限随差遣而定，无法独立决定国家财政和军政。', actualInfluence: '在道光末至咸丰初逐步展现办事能力并接近新帝。', modernEquivalent: '皇室成员兼中央机关与警卫系统官员。', impact: '宗室身份提供入仕路径，个人强硬作风促成后续重用。' },
      { timeText: '1853-1861年', periodLabel: '咸丰朝中枢重臣', title: '户部尚书、协办大学士等', nominalDuty: '处理财政、官员、军务和皇帝交办的重大政务。', authorityScope: '可参与最高决策并影响财政人事，外交和全国军事仍由皇帝及军机体系决定。', actualInfluence: '在太平天国和英法战争危机中整顿钱法、用人，咸丰北逃热河后成为最受信任重臣之一。', modernEquivalent: '财政部长与政府最高决策成员的复合角色。', impact: '地方军与中枢财政获得部分支持，肃顺也积累大量政敌。' },
      { timeText: '1861年', periodLabel: '顾命与辛酉政变', title: '赞襄政务王大臣 / 顾命核心', nominalDuty: '辅佐幼帝载淳，处理诏令、政务和皇帝丧仪。', authorityScope: '与其他顾命大臣集体掌握外朝政务，但两宫太后拥有御玺和皇帝监护权，恭亲王掌握北京政治资源。', actualInfluence: '试图限制两宫参与政务，返京途中被政变集团逮捕，随后处斩。', modernEquivalent: '未成年君主摄政委员会核心成员。', impact: '顾命集团瓦解，垂帘听政成为晚清中央权力的新形式。' },
    ],
  }),
  person({
    id: 'empress-cian', name: '钮祜禄氏（慈安太后）', formalName: '钮祜禄氏', lifeText: '1837-1881年', birthYear: 1837, deathYear: 1881,
    categories: ['皇后', '皇太后', '晚清政治人物'], crossDynastyLabels: ['清', '咸丰至光绪时期'], dynastyIds: ['qing'],
    summary: '咸丰帝皇后、同治与光绪时期皇太后，辛酉政变中与慈禧、恭亲王合作清除顾命大臣，随后两宫共同垂帘听政；正式礼法地位高于慈禧，但日常政治影响相对克制。',
    background: '咸丰帝死于热河后，同治帝年幼，顾命八大臣、两宫太后与恭亲王争夺摄政权。皇太后掌握皇帝监护、御玺和内廷合法性，是政变能够转化为正式诏令的关键。',
    childhood: '出身满洲镶黄旗钮祜禄氏，接受八旗贵族女性和宫廷礼仪教育，入宫后较快册立为皇后。个人早年生活记录有限。',
    personality: '传统记载多称其稳重、宽和，较少主动经营庞大政治网络；但在辛酉政变、同治帝婚姻和重大处置上能够作出明确决定。',
    policyInclination: '重视皇室礼法和两宫共同裁决，日常政务多依赖慈禧、恭亲王和军机大臣；在维持清朝统治和洋务自强上与同治朝中枢保持一致。',
    socialContribution: '参与建立同治初年的两宫垂帘与议政王合作格局，帮助朝廷在内战、外交危机后恢复运转；其制度角色常被慈禧个人叙事遮蔽。',
    impactSummary: '慈安在世时，两宫并列为慈禧权力提供一定礼法平衡；1881年突然去世后，慈禧对宫廷和皇帝的控制更集中。',
    relatedEventIds: ['xinyou-coup'],
    resume: [
      { timeText: '1852-1861年', periodLabel: '咸丰皇后', title: '皇后 / 后宫最高礼仪主持者', nominalDuty: '主持后宫、皇室礼仪和内廷女性事务。', authorityScope: '正式管辖后宫与礼仪，不直接统领六部和军队；作为中宫拥有最高皇室女性名位。', actualInfluence: '在咸丰后宫和皇室秩序中地位最高，咸丰死后取得母后皇太后身份。', modernEquivalent: '国家元首配偶与皇室机构最高女性成员，不能等同现代行政官。', impact: '其礼法地位成为两宫太后联合发布命令的合法性来源。' },
      { timeText: '1861年', periodLabel: '辛酉政变', title: '母后皇太后 / 政变核心', nominalDuty: '监护幼帝、保管御玺并参与摄政安排。', authorityScope: '可与慈禧共同盖印发布皇帝名义诏令，需依靠恭亲王和北京官员掌握外朝与军队。', actualInfluence: '与慈禧、奕䜣合作逮捕肃顺等顾命大臣，建立两宫垂帘听政。', modernEquivalent: '未成年国家元首的皇室监护与共同摄政者。', impact: '晚清中央权力从顾命委员会转为两宫太后与议政王合作。' },
      { timeText: '1861-1881年', periodLabel: '两宫垂帘与同光时期', title: '慈安太后 / 共同摄政者', nominalDuty: '与慈禧共同听取军机奏报、裁决重大人事和皇室事务。', authorityScope: '形式上与慈禧并列，重大诏令需两宫同意；日常议政参与程度较低，外朝执行由军机、总理衙门和督抚承担。', actualInfluence: '参与同治、光绪两朝早期重大皇室和政治决定，对安德海处置等事件表现独立态度。', modernEquivalent: '双重摄政体系中的共同国家监护人。', impact: '维持两宫权力平衡，去世后晚清宫廷更由慈禧单独主导。' },
    ],
  }),
  person({
    id: 'sengge-rinchen', name: '博尔济吉特·僧格林沁（科尔沁亲王）', formalName: '博尔济吉特·僧格林沁', lifeText: '1811-1865年', birthYear: 1811, deathYear: 1865,
    categories: ['清朝将领', '蒙古王公', '晚清军事人物'], crossDynastyLabels: ['清', '晚清'], dynastyIds: ['qing'],
    summary: '晚清科尔沁蒙古王公和清军统帅，参与镇压太平天国北伐、第二次鸦片战争大沽口作战及后来的捻军战争；1865年在山东曹州战死。',
    background: '八旗和蒙古王公是清朝传统军事支柱，但19世纪同时面对内战与工业化列强。僧格林沁既在内战中取得战果，也在英法联军进攻中经历传统骑兵和炮台体系的局限。',
    childhood: '出身科尔沁左翼后旗博尔济吉特氏，幼年家境并非最显赫，后被选为郡王嗣子，进入蒙古王公与清廷联姻、封爵体系。',
    personality: '勇猛、重视传统骑兵和正面防御，执行皇命坚决；对西方联军火器和战术适应有限，内战中的强硬镇压也带来巨大社会代价。',
    policyInclination: '维护清朝皇权和八旗、蒙古王公军事体系，主张以正规军和骑兵镇压内乱、抵抗外敌，较少参与洋务技术改革。',
    socialContribution: '在太平军北伐等战事中保护京畿安全，但军事行动造成战争破坏；其成败展示传统国家军事体系面对内外双重危机的不同表现。',
    impactSummary: '僧格林沁败于英法联军后，清廷更依赖地方湘淮军和洋务力量；其死于捻军又象征八旗、蒙古传统主力进一步衰落。',
    relatedEventIds: ['taiping-rebellion', 'second-opium-war'],
    resume: [
      { timeText: '1825-1853年', periodLabel: '承袭王爵与京畿军务', title: '科尔沁郡王、御前大臣等', nominalDuty: '承担蒙古王公朝觐、宿卫和奉命领军事务。', authorityScope: '可统率所属蒙古部众和皇帝临时授予军队，地方行政与全国军政由朝廷决定。', actualInfluence: '通过宗室姻亲和军职进入清廷核心，成为可独立领军的蒙古王公。', modernEquivalent: '世袭地方贵族兼中央待命高级军事统帅。', impact: '太平天国北伐逼近京畿时被委以主力。' },
      { timeText: '1853-1855年', periodLabel: '镇压太平军北伐', title: '参赞大臣 / 京畿清军统帅', nominalDuty: '组织京畿、直隶和蒙古骑兵围堵太平军北伐部队。', authorityScope: '可调度战区八旗、绿营和蒙古军，军费和跨省协调受咸丰帝、军机处与地方督抚制约。', actualInfluence: '在华北长期围困并消灭太平军北伐主力，保住北京安全。', modernEquivalent: '首都防区战时联军总指挥。', impact: '清廷暂时解除北方威胁，但内战伤亡和地方破坏严重。' },
      { timeText: '1858-1860年', periodLabel: '大沽口与第二次鸦片战争', title: '钦差大臣 / 大沽与京畿防务主帅', nominalDuty: '修筑海口防御、统率清军阻止英法联军进入天津北京。', authorityScope: '可指挥大沽炮台和京畿兵力，外交和议由皇帝、桂良、奕䜣等处理。', actualInfluence: '1859年大沽口一度击退联军，1860年再战失败，八里桥骑兵遭重创。', modernEquivalent: '首都方向海岸与陆上防区司令。', impact: '战败迫使清廷签订条约，也暴露传统炮台与骑兵对现代联军的差距。' },
      { timeText: '1861-1865年', periodLabel: '镇压捻军与战死', title: '亲王 / 清军机动作战主帅', nominalDuty: '率骑兵在华北追击捻军，保护交通和州县。', authorityScope: '可调动直属骑兵及战区配属部队，地方情报、粮饷和协同依赖督抚。', actualInfluence: '长期追击捻军，1865年在曹州遭伏击战死。', modernEquivalent: '国家机动野战军统帅。', impact: '清廷进一步依赖曾国藩、李鸿章等地方军政集团处理全国战争。' },
    ],
  }),
];

const events = [
  event({ id: 'yu-control-floods', name: '大禹治水', dateText: '传说时代', dynastyIds: ['xia'], periodLabel: '夏前后传说', tags: ['传说时代', '治水', '史实存疑'], relatedPersonIds: ['da-yu'], summary: '传统叙事中禹治理洪水，体现早期公共工程、部落联盟和王权形成的历史记忆。' }),
  event({ id: 'xia-founding', name: '夏朝建立与世袭传说', dateText: '约前2070年前后', dynastyIds: ['xia'], periodLabel: '夏初', tags: ['早期国家', '史实存疑'], relatedPersonIds: ['da-yu', 'qi-of-xia'], summary: '传统史书认为夏朝建立，启继位常被用来说明世袭制度形成。' }),
  event({ id: 'shang-overthrows-xia', name: '商汤灭夏', dateText: '约前1600年前后', dynastyIds: ['xia', 'shang'], periodLabel: '夏商更替', tags: ['王朝更替', '传说时代'], relatedPersonIds: ['jie-of-xia', 'cheng-tang', 'yi-yin'], summary: '商汤伐桀建立商朝，是传统王朝更替叙事的重要开端。' }),
  event({ id: 'pan-geng-moves-yin', name: '盘庚迁殷', dateText: '约前14世纪', dynastyIds: ['shang'], periodLabel: '商中后期', tags: ['迁都', '殷墟'], relatedPersonIds: ['pan-geng'], summary: '盘庚迁都于殷后，商后期政治中心趋于稳定，殷墟考古和甲骨文材料尤为重要。' }),
  event({ id: 'wu-ding-revival', name: '武丁中兴', dateText: '商后期', dynastyIds: ['shang'], periodLabel: '商后期', tags: ['甲骨文', '中兴'], relatedPersonIds: ['wu-ding', 'fu-hao'], summary: '武丁时期商王朝活跃于征伐、祭祀和治理，甲骨文反映出较丰富的国家活动。' }),
  event({ id: 'wu-wang-conquers-shang', name: '武王伐纣与牧野之战', dateText: '约前1046年', dynastyIds: ['shang', 'western-zhou'], periodLabel: '商周更替', tags: ['王朝更替', '教材重点'], relatedPersonIds: ['shang-zhou-wang', 'king-wen-zhou', 'king-wu-zhou', 'jiang-ziya'], summary: '周武王联合诸侯击败商纣王，建立西周。' }),
  event({ id: 'zhou-ritual-feudalism', name: '分封制、宗法制与礼乐秩序', dateText: '西周前期', dynastyIds: ['western-zhou'], periodLabel: '西周制度', tags: ['分封制', '宗法制', '礼乐'], relatedPersonIds: ['duke-of-zhou'], summary: '西周通过分封、宗法和礼乐构建政治社会秩序，对后世影响深远。' }),
  event({ id: 'western-zhou-fall', name: '西周灭亡与平王东迁', dateText: '前771-前770年', dynastyIds: ['western-zhou', 'eastern-zhou'], periodLabel: '西周东周转折', tags: ['王朝更替', '春秋开端'], relatedPersonIds: ['king-you-zhou'], summary: '犬戎攻破镐京后西周结束，周平王东迁洛邑，东周开始。' }),
  event({ id: 'wenjing-rule', name: '文景之治', dateText: '前180-前141年', dynastyIds: ['western-han'], periodLabel: '西汉前期', tags: ['治世', '休养生息'], relatedPersonIds: ['han-wen-di', 'han-jing-di'], summary: '西汉前期轻徭薄赋、社会恢复，为汉武帝时期扩张奠定基础。' }),
  event({ id: 'rebellion-seven-states', name: '七国之乱', dateText: '前154年', dynastyIds: ['western-han'], periodLabel: '汉景帝时期', tags: ['削藩', '中央集权'], relatedPersonIds: ['han-jing-di'], summary: '吴楚等诸侯王反叛被平定，西汉中央集权进一步加强。' }),
  event({ id: 'han-wu-reforms', name: '汉武帝制度与思想政策', dateText: '前141-前87年', dynastyIds: ['western-han'], periodLabel: '汉武帝时期', tags: ['推恩令', '独尊儒术', '中央集权'], relatedPersonIds: ['han-wu-di', 'dong-zhongshu'], summary: '汉武帝通过推恩令、盐铁专卖、察举和儒学政治等措施强化中央集权。' }),
  event({ id: 'zhaoxuan-revival', name: '昭宣中兴', dateText: '前87-前49年', dynastyIds: ['western-han'], periodLabel: '汉昭帝、汉宣帝时期', tags: ['中兴', '吏治', '西汉'], relatedPersonIds: ['han-xuan-di'], summary: '汉昭帝、汉宣帝时期政治相对稳定，吏治和社会经济有所恢复，常被概括为昭宣中兴。' }),
  event({ id: 'han-xiongnu-war', name: '汉匈战争', dateText: '前2世纪后期', dynastyIds: ['western-han'], periodLabel: '汉武帝时期', tags: ['匈奴', '卫青', '霍去病'], relatedPersonIds: ['han-wu-di', 'wei-qing', 'huo-qubing'], summary: '西汉对匈奴展开大规模反击，改变北方边疆力量格局。' }),
  event({ id: 'silk-road', name: '张骞通西域与丝绸之路', dateText: '前2世纪', dynastyIds: ['western-han'], periodLabel: '汉武帝时期', tags: ['丝绸之路', '中外交流'], relatedPersonIds: ['zhang-qian', 'han-wu-di'], summary: '张骞出使西域推动汉朝与中亚联系，丝绸之路逐渐形成。' }),
  event({ id: 'shiji-written', name: '《史记》成书', dateText: '西汉', dynastyIds: ['western-han'], periodLabel: '西汉文化', tags: ['史学', '纪传体'], relatedPersonIds: ['sima-qian'], summary: '司马迁撰写《史记》，奠定纪传体通史传统。' }),
  event({ id: 'wang-mang-usurpation', name: '王莽代汉', dateText: '8年', dynastyIds: ['western-han', 'xin'], periodLabel: '西汉新朝转折', tags: ['王朝更替'], relatedPersonIds: ['wang-mang'], summary: '王莽建立新朝，西汉结束。' }),
  event({ id: 'xin-reforms', name: '王莽改制', dateText: '8-23年', dynastyIds: ['xin'], periodLabel: '新朝', tags: ['改革', '争议'], relatedPersonIds: ['wang-mang'], summary: '王莽推行复古式改革，因执行失序和社会矛盾激化而失败。' }),
  event({ id: 'guangwu-restoration', name: '光武中兴', dateText: '25年后', dynastyIds: ['eastern-han'], periodLabel: '东汉初年', tags: ['东汉建立', '中兴'], relatedPersonIds: ['liu-xiu'], summary: '刘秀建立东汉，恢复汉室统治。' }),
  event({ id: 'eastern-han-western-regions', name: '班超经营西域', dateText: '1世纪后期', dynastyIds: ['eastern-han'], periodLabel: '东汉对外关系', tags: ['西域', '外交'], relatedPersonIds: ['ban-chao'], summary: '班超长期在西域活动，维护东汉在西域的影响。' }),
  event({ id: 'hanshu-compiled', name: '《汉书》编撰', dateText: '东汉', dynastyIds: ['eastern-han'], periodLabel: '东汉文化', tags: ['史学', '断代史'], relatedPersonIds: ['ban-gu'], summary: '班固等编撰《汉书》，断代史体例成熟。' }),
  event({ id: 'papermaking-improved', name: '蔡伦改进造纸术', dateText: '105年前后', dynastyIds: ['eastern-han'], periodLabel: '东汉科技', tags: ['造纸术', '四大发明'], relatedPersonIds: ['cai-lun'], summary: '蔡伦改进造纸术，推动书写和文化传播。' }),
  event({ id: 'eastern-han-science', name: '张衡与东汉科学', dateText: '2世纪', dynastyIds: ['eastern-han'], periodLabel: '东汉科技', tags: ['天文学', '地动仪'], relatedPersonIds: ['zhang-heng'], summary: '张衡代表东汉天文、数学、机械和文学成就。' }),
  event({ id: 'eastern-han-medicine', name: '东汉医学发展', dateText: '东汉末', dynastyIds: ['eastern-han'], periodLabel: '东汉科技', tags: ['医学', '华佗'], relatedPersonIds: ['hua-tuo'], summary: '华佗等医学人物体现东汉医学经验积累。' }),
  event({ id: 'yellow-turban', name: '黄巾起义', dateText: '184年', dynastyIds: ['eastern-han'], periodLabel: '东汉末年', tags: ['农民起义', '东汉衰落'], relatedPersonIds: ['zhang-jue'], summary: '黄巾起义冲击东汉统治，地方军政势力上升。' }),
  event({ id: 'guandu-battle', name: '官渡之战', dateText: '200年', dynastyIds: ['eastern-han'], periodLabel: '东汉末年', tags: ['曹操', '袁绍', '北方统一'], relatedPersonIds: ['cao-cao', 'yuan-shao'], summary: '曹操在官渡击败袁绍，扭转北方力量对比，为统一北方奠定基础。' }),
  event({ id: 'red-cliffs', name: '赤壁之战', dateText: '208年', dynastyIds: ['eastern-han', 'three-kingdoms'], periodLabel: '东汉末年', tags: ['三国', '教材重点'], relatedPersonIds: ['cao-cao', 'liu-bei', 'sun-quan', 'zhou-yu'], summary: '孙刘联军击败曹操，奠定三国鼎立基础。' }),
  event({ id: 'three-kingdoms-formation', name: '三国鼎立形成', dateText: '220-229年', dynastyIds: ['three-kingdoms'], periodLabel: '三国建立', tags: ['魏蜀吴', '鼎立'], relatedPersonIds: ['cao-cao', 'cao-pi', 'liu-bei', 'sun-quan', 'zhuge-liang', 'guan-yu'], summary: '曹丕代汉后，蜀汉、孙吴相继建国，三国鼎立格局形成。' }),
  event({ id: 'sima-usurpation', name: '司马氏掌权与晋代魏', dateText: '249-266年', dynastyIds: ['three-kingdoms', 'western-jin'], periodLabel: '魏晋转折', tags: ['高平陵之变', '王朝更替'], relatedPersonIds: ['sima-yi', 'cao-pi', 'sima-zhao', 'sima-yan'], summary: '司马氏在曹魏后期逐步掌权，司马昭强化代魏基础，司马炎最终建立西晋。' }),
  event({ id: 'western-jin-unification', name: '西晋统一', dateText: '280年', dynastyIds: ['western-jin'], periodLabel: '西晋', tags: ['短暂统一'], relatedPersonIds: ['sima-yan'], summary: '西晋灭吴，结束三国分裂局面。' }),
  event({ id: 'feishui-battle', name: '淝水之战', dateText: '383年', dynastyIds: ['eastern-jin-sixteen'], periodLabel: '东晋十六国', tags: ['东晋', '前秦', '教材重点'], relatedPersonIds: ['xie-an', 'fu-jian'], summary: '东晋以少胜多击败前秦，北方统一局面瓦解。' }),
  event({ id: 'eastern-jin-culture', name: '东晋士族文化', dateText: '4-5世纪', dynastyIds: ['eastern-jin-sixteen'], periodLabel: '东晋文化', tags: ['书法', '文学'], relatedPersonIds: ['wang-xizhi', 'tao-yuanming'], summary: '东晋士族文化推动书法、玄学、山水田园文学发展。' }),
  event({ id: 'xiaowen-reform', name: '北魏孝文帝改革', dateText: '5世纪后期', dynastyIds: ['southern-northern'], periodLabel: '北魏', tags: ['改革', '民族融合'], relatedPersonIds: ['emperor-xiaowen-northern-wei'], summary: '北魏孝文帝迁都洛阳、推行汉化改革，促进民族融合。' }),
  event({ id: 'northern-southern-science', name: '南北朝科技文化', dateText: '5世纪', dynastyIds: ['southern-northern'], periodLabel: '南北朝文化', tags: ['祖冲之', '圆周率'], relatedPersonIds: ['zu-chongzhi'], summary: '祖冲之等体现南北朝科技文化成就。' }),
  event({ id: 'sui-unification', name: '隋统一南北', dateText: '589年', dynastyIds: ['sui'], periodLabel: '隋文帝时期', tags: ['统一', '王朝建立'], relatedPersonIds: ['sui-wen-di'], summary: '隋灭陈，结束南北长期分裂。' }),
  event({ id: 'grand-canal', name: '隋修大运河', dateText: '605年后', dynastyIds: ['sui'], periodLabel: '隋炀帝时期', tags: ['大运河', '工程'], relatedPersonIds: ['sui-yang-di'], summary: '大运河加强南北交通和经济联系，也加重徭役负担。' }),
  event({ id: 'sui-fall', name: '隋末动乱与唐兴起', dateText: '611-618年', dynastyIds: ['sui', 'tang'], periodLabel: '隋唐转折', tags: ['农民起义', '王朝更替'], relatedPersonIds: ['sui-yang-di'], summary: '隋末战争和起义导致隋亡，唐朝兴起。' }),
  event({ id: 'tang-founding', name: '唐朝建立', dateText: '618年', dynastyIds: ['tang'], periodLabel: '唐高祖时期', tags: ['王朝建立', '隋唐更替'], relatedPersonIds: ['tang-gaozu'], summary: '李渊在隋末动荡中建立唐朝，并逐步组织统一战争。' }),
  event({ id: 'zhenguan-rule', name: '贞观之治', dateText: '627-649年', dynastyIds: ['tang'], periodLabel: '唐太宗时期', tags: ['治世', '纳谏'], relatedPersonIds: ['tang-taizong', 'wei-zheng'], summary: '唐太宗时期政治清明、制度整合和纳谏风气被后世称道。' }),
  event({ id: 'yonghui-rule', name: '永徽之治与初唐法制', dateText: '650-655年前后', dynastyIds: ['tang'], periodLabel: '唐高宗前期', tags: ['初唐', '唐律疏议', '制度'], relatedPersonIds: ['tang-gaozong'], summary: '唐高宗前期延续贞观政治遗产，法制和官僚秩序继续成熟。' }),
  event({ id: 'wu-zhou', name: '武周政治', dateText: '690-705年', dynastyIds: ['tang'], periodLabel: '武则天时期', tags: ['女性皇帝', '科举'], relatedPersonIds: ['wu-zetian'], summary: '武则天称帝建立武周，延续并调整唐代政治制度。' }),
  event({ id: 'kaiyuan-prosperity', name: '开元盛世', dateText: '713-741年', dynastyIds: ['tang'], periodLabel: '唐玄宗前期', tags: ['盛世'], relatedPersonIds: ['tang-xuanzong'], summary: '唐玄宗前期国力强盛、文化繁荣，被称为开元盛世。' }),
  event({ id: 'tang-cultural-exchange', name: '唐代中外文化交流', dateText: '7-8世纪', dynastyIds: ['tang'], periodLabel: '唐代文化', tags: ['玄奘', '鉴真', '交流'], relatedPersonIds: ['xuan-zang', 'jian-zhen'], summary: '唐代交通开放，玄奘西行、鉴真东渡等活动推动佛教、贸易和人员往来。' }),
  event({ id: 'tang-poetry', name: '唐诗高峰', dateText: '唐代', dynastyIds: ['tang'], periodLabel: '唐代文化', tags: ['李白', '杜甫', '白居易'], relatedPersonIds: ['li-bai', 'du-fu', 'bai-juyi'], summary: '唐诗成为中国古典诗歌高峰，盛唐、中唐诗人各具代表性。' }),
  event({ id: 'an-shi-rebellion', name: '安史之乱', dateText: '755-763年', dynastyIds: ['tang'], periodLabel: '唐玄宗后期', tags: ['唐由盛转衰', '教材重点'], relatedPersonIds: ['tang-xuanzong', 'an-lushan', 'guo-ziyi', 'du-fu'], summary: '安史之乱重创唐朝，藩镇割据和财政军事问题加剧。' }),
  event({ id: 'tang-literary-reform', name: '古文运动', dateText: '中唐', dynastyIds: ['tang'], periodLabel: '唐代文学', tags: ['韩愈', '古文'], relatedPersonIds: ['han-yu'], summary: '韩愈等倡导古文，推动文体和儒学复兴。' }),
  event({ id: 'huang-chao-uprising', name: '黄巢起义', dateText: '875-884年', dynastyIds: ['tang'], periodLabel: '唐末', tags: ['唐末动乱'], relatedPersonIds: ['huang-chao'], summary: '黄巢起义严重削弱唐朝统治，为五代更替铺路。' }),
  event({ id: 'five-dynasties-begin', name: '朱温废唐建后梁', dateText: '907年', dynastyIds: ['five-dynasties-ten-kingdoms'], periodLabel: '五代开端', tags: ['后梁', '王朝更替'], relatedPersonIds: ['zhu-wen'], summary: '朱温建立后梁，唐朝灭亡，五代十国开始。' }),
  event({ id: 'five-dynasties-transition', name: '五代更替', dateText: '907-960年', dynastyIds: ['five-dynasties-ten-kingdoms'], periodLabel: '五代', tags: ['后梁', '后唐', '后晋', '后汉', '后周'], relatedPersonIds: ['zhu-wen', 'li-cunxu', 'shi-jingtang', 'chai-rong'], summary: '中原五代短促更替，军事集团和地方割据影响政权稳定。' }),
  event({ id: 'sixteen-prefectures', name: '燕云十六州割让', dateText: '936年', dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], periodLabel: '后晋辽宋格局', tags: ['后晋', '辽', '边防'], relatedPersonIds: ['shi-jingtang'], summary: '燕云十六州割让影响宋辽长期军事地理格局。' }),
  event({ id: 'later-zhou-reform', name: '后周世宗改革', dateText: '954-959年', dynastyIds: ['five-dynasties-ten-kingdoms'], periodLabel: '后周', tags: ['改革', '宋初统一前提'], relatedPersonIds: ['chai-rong'], summary: '周世宗整军、裁汰冗弊，为北宋统一奠定基础。' }),
  event({ id: 'chenqiao-mutiny', name: '陈桥兵变', dateText: '960年', dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], periodLabel: '宋初', tags: ['北宋建立'], relatedPersonIds: ['song-taizu'], summary: '赵匡胤发动陈桥兵变，建立北宋。' }),
  event({ id: 'song-unification', name: '北宋统一战争', dateText: '960-979年', dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], periodLabel: '宋初', tags: ['统一', '十国收束'], relatedPersonIds: ['song-taizu', 'li-yu'], summary: '北宋逐步结束五代十国割据，但未能收回燕云十六州。' }),
  event({ id: 'renzong-era', name: '仁宗朝政治文化', dateText: '1022-1063年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋仁宗朝', tags: ['文官政治', '士大夫文化'], relatedPersonIds: ['song-renzong', 'su-shi'], summary: '宋仁宗时期文官政治和士大夫文化活跃，北宋文化与制度讨论进入重要阶段。' }),
  event({ id: 'liao-founding', name: '辽朝建立', dateText: '916年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '辽', tags: ['契丹', '并立政权'], relatedPersonIds: ['yelv-abaoji'], summary: '耶律阿保机建立契丹辽政权，形成北方强大政权。' }),
  event({ id: 'xixia-founding', name: '西夏建立', dateText: '1038年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '西夏', tags: ['西北政权'], relatedPersonIds: ['yuan-hao'], summary: '元昊称帝建立西夏，宋辽夏形成多方格局。' }),
  event({ id: 'jin-founding', name: '金朝建立', dateText: '1115年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '金', tags: ['女真', '并立政权'], relatedPersonIds: ['wanyan-aguda'], summary: '完颜阿骨打建立金朝，迅速改变辽宋格局。' }),
  event({ id: 'jingkang-incident', name: '靖康之变', dateText: '1127年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋南宋转折', tags: ['北宋灭亡', '南宋建立'], relatedPersonIds: ['song-huizong', 'song-gaozong', 'wanyan-aguda', 'yue-fei'], summary: '金军攻破开封，北宋灭亡，宋室南渡。' }),
  event({ id: 'wang-anshi-reform', name: '王安石变法', dateText: '1069年后', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋', tags: ['改革', '新法旧党'], relatedPersonIds: ['song-shenzong', 'wang-anshi', 'sima-guang'], summary: '王安石试图通过财政、军事和社会政策改革解决北宋积弊。' }),
  event({ id: 'zizhi-tongjian', name: '《资治通鉴》成书', dateText: '1084年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋文化', tags: ['史学'], relatedPersonIds: ['sima-guang'], summary: '司马光主持编撰《资治通鉴》，形成编年体通史高峰。' }),
  event({ id: 'song-culture', name: '宋代文化繁荣', dateText: '宋代', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '宋代文化', tags: ['词', '书画', '士大夫'], relatedPersonIds: ['song-renzong', 'song-huizong', 'fan-zhongyan', 'ouyang-xiu', 'su-shi', 'li-qingzhao'], summary: '宋代士大夫文化、词、书画、理学和城市经济高度发展，北宋文人政治与南渡文学共同塑造宋代文化面貌。' }),
  event({ id: 'song-science', name: '宋代科技发展', dateText: '宋代', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '宋代科技', tags: ['沈括', '技术'], relatedPersonIds: ['shen-kuo'], summary: '宋代科技、工程和出版活跃，《梦溪笔谈》记录大量知识。' }),
  event({ id: 'movable-type', name: '活字印刷术', dateText: '北宋', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '宋代科技', tags: ['四大发明', '印刷'], relatedPersonIds: ['bi-sheng'], summary: '毕昇发明活字印刷术，推动印刷技术发展。' }),
  event({ id: 'song-jin-war', name: '宋金战争与绍兴和议', dateText: '12世纪', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '南宋', tags: ['岳飞', '韩世忠', '秦桧'], relatedPersonIds: ['song-gaozong', 'yue-fei', 'han-shizhong', 'qin-hui'], summary: '宋金战争和议和选择影响南宋政治格局，岳飞、韩世忠等抗金将领与秦桧主和路线形成鲜明张力。' }),
  event({ id: 'neo-confucianism', name: '理学形成与朱熹集成', dateText: '南宋', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '南宋思想', tags: ['理学', '朱熹'], relatedPersonIds: ['zhu-xi'], summary: '理学在宋代成熟，朱熹体系影响后世教育与科举。' }),
  event({ id: 'song-fall', name: '南宋灭亡', dateText: '1276-1279年', dynastyIds: ['song-liao-jin-xixia', 'yuan'], periodLabel: '宋元更替', tags: ['王朝更替', '抗元'], relatedPersonIds: ['wen-tianxiang', 'kublai-khan'], summary: '元灭南宋，完成新的大一统。' }),
  event({ id: 'yuan-founding', name: '元朝建立与行省制', dateText: '1271年后', dynastyIds: ['yuan'], periodLabel: '元初', tags: ['元朝', '行省制'], relatedPersonIds: ['kublai-khan', 'yelv-chucai'], summary: '忽必烈建立元朝并推行行省制度，对后世地方行政影响深远。' }),
  event({ id: 'yuan-science', name: '授时历与元代科学', dateText: '1281年', dynastyIds: ['yuan'], periodLabel: '元代科技', tags: ['郭守敬', '历法'], relatedPersonIds: ['guo-shoujing'], summary: '郭守敬等主持授时历，体现元代天文历法成就。' }),
  event({ id: 'yuan-drama', name: '元曲与杂剧繁荣', dateText: '元代', dynastyIds: ['yuan'], periodLabel: '元代文化', tags: ['元曲', '杂剧'], relatedPersonIds: ['guan-hanqing'], summary: '元杂剧繁荣，关汉卿等作家推动戏曲文学发展。' }),
  event({ id: 'ming-founding', name: '明朝建立', dateText: '1368年', dynastyIds: ['yuan', 'ming'], periodLabel: '元明更替', tags: ['王朝更替'], relatedPersonIds: ['ming-taizu'], summary: '朱元璋建立明朝，元朝在中原统治结束。' }),
  event({ id: 'jingnan-campaign', name: '靖难之役', dateText: '1399-1402年', dynastyIds: ['ming'], periodLabel: '明初', tags: ['皇位争夺'], relatedPersonIds: ['ming-chengzu'], summary: '燕王朱棣夺取皇位，成为明成祖。' }),
  event({ id: 'zheng-he-voyages', name: '郑和下西洋', dateText: '1405-1433年', dynastyIds: ['ming'], periodLabel: '明成祖至宣德时期', tags: ['航海', '中外交流'], relatedPersonIds: ['ming-chengzu', 'zheng-he'], summary: '郑和率船队多次远航，展示明代海上交通和外交。' }),
  event({ id: 'tumu-crisis', name: '土木堡之变与北京保卫战', dateText: '1449年', dynastyIds: ['ming'], periodLabel: '明中期', tags: ['边防', '于谦'], relatedPersonIds: ['ming-yingzong', 'yu-qian'], summary: '明英宗被俘后，于谦组织北京保卫战，稳定局势。' }),
  event({ id: 'yangming-learning', name: '阳明心学', dateText: '明中期', dynastyIds: ['ming'], periodLabel: '明代思想', tags: ['心学', '知行合一'], relatedPersonIds: ['wang-yangming'], summary: '王阳明发展心学，强调知行合一，对后世思想影响深远。' }),
  event({ id: 'anti-wokou', name: '戚继光抗倭', dateText: '16世纪', dynastyIds: ['ming'], periodLabel: '明代海防', tags: ['抗倭', '海防'], relatedPersonIds: ['qi-jiguang'], summary: '戚继光训练军队、抗击倭寇，改善东南沿海安全。' }),
  event({ id: 'zhang-juzheng-reform', name: '张居正改革', dateText: '1572-1582年', dynastyIds: ['ming'], periodLabel: '万历初年', tags: ['改革', '一条鞭法'], relatedPersonIds: ['ming-shenzong', 'zhang-juzheng'], summary: '张居正推行考成法和一条鞭法，整顿明代财政行政。' }),
  event({ id: 'ming-science', name: '明代科技著述', dateText: '明代', dynastyIds: ['ming'], periodLabel: '明代科技', tags: ['本草纲目', '天工开物'], relatedPersonIds: ['li-shizhen', 'song-yingxing'], summary: '李时珍、宋应星等代表明代医药和工农业技术总结。' }),
  event({ id: 'late-ming-western-learning', name: '晚明西学东渐', dateText: '16-17世纪', dynastyIds: ['ming'], periodLabel: '晚明', tags: ['中西交流', '徐光启'], relatedPersonIds: ['xu-guangqi'], summary: '晚明时期西方科学知识传入中国，徐光启等参与翻译和传播。' }),
  event({ id: 'ming-qing-transition', name: '明清辽东战争', dateText: '17世纪前期', dynastyIds: ['ming', 'qing'], periodLabel: '明清转折', tags: ['后金', '辽东'], relatedPersonIds: ['nurhaci', 'yuan-chonghuan'], summary: '后金崛起与明辽东防线冲突，推动明清更替。' }),
  event({ id: 'ming-fall', name: '明朝灭亡', dateText: '1644年', dynastyIds: ['ming', 'qing'], periodLabel: '明清更替', tags: ['李自成', '崇祯', '清入关'], relatedPersonIds: ['chongzhen-emperor', 'li-zicheng', 'wu-sangui', 'dorgon'], summary: '李自成攻入北京，崇祯自缢，吴三桂与清军入关改变北方局势，明朝全国性统治终结。' }),
  event({ id: 'later-jin-rise', name: '后金兴起', dateText: '1616年', dynastyIds: ['ming', 'qing'], periodLabel: '清前史', tags: ['女真', '努尔哈赤'], relatedPersonIds: ['nurhaci'], summary: '努尔哈赤建立后金，女真力量崛起。' }),
  event({ id: 'qing-founding', name: '清朝建号', dateText: '1636年', dynastyIds: ['qing'], periodLabel: '清前期', tags: ['皇太极', '清'], relatedPersonIds: ['hong-taiji'], summary: '皇太极改国号为清，完善国家制度。' }),
  event({ id: 'qing-enters-pass', name: '清军入关', dateText: '1644年', dynastyIds: ['qing'], periodLabel: '清入关', tags: ['王朝更替', '多尔衮', '吴三桂'], relatedPersonIds: ['shunzhi-emperor', 'dorgon', 'wu-sangui'], summary: '多尔衮摄政下清军借山海关局势入关，并逐步统一全国，明清鼎革完成。' }),
  event({ id: 'kangxi-consolidation', name: '康熙巩固统一', dateText: '17世纪后期', dynastyIds: ['qing'], periodLabel: '康熙时期', tags: ['三藩', '台湾', '边疆'], relatedPersonIds: ['kangxi-emperor', 'wu-sangui', 'shi-lang'], summary: '康熙平三藩、统一台湾并处理边疆问题，清朝统治稳定。' }),
  event({ id: 'qing-institutions', name: '雍正制度整顿', dateText: '18世纪前期', dynastyIds: ['qing'], periodLabel: '雍正时期', tags: ['摊丁入亩', '军机处'], relatedPersonIds: ['yongzheng-emperor'], summary: '雍正整顿财政吏治并强化皇权机构。' }),
  event({ id: 'high-qing', name: '康乾盛世与清中期转折', dateText: '18世纪', dynastyIds: ['qing'], periodLabel: '清中期', tags: ['康乾盛世', '盛衰转折'], relatedPersonIds: ['kangxi-emperor', 'yongzheng-emperor', 'qianlong-emperor', 'heshen'], summary: '清中期疆域和人口达到高峰，同时也积累财政、吏治、闭关和权臣贪腐问题。' }),
  event({ id: 'opium-war', name: '鸦片战争', dateText: '1840-1842年', dynastyIds: ['qing'], periodLabel: '晚清', tags: ['近代开端', '林则徐'], relatedPersonIds: ['daoguang-emperor', 'lin-zexu', 'wei-yuan'], summary: '鸦片战争打开中国近代史转折，传统天下观和对外关系遭遇冲击。' }),
  event({ id: 'taiping-rebellion', name: '太平天国运动', dateText: '1851-1864年', dynastyIds: ['qing'], periodLabel: '晚清', tags: ['农民战争', '清朝危机'], relatedPersonIds: ['hong-xiuquan', 'zeng-guofan'], summary: '太平天国严重冲击清朝统治，也推动地方军政力量上升。' }),
  event({ id: 'self-strengthening', name: '洋务运动', dateText: '19世纪60-90年代', dynastyIds: ['qing'], periodLabel: '晚清改革', tags: ['自强求富', '近代工业'], relatedPersonIds: ['zeng-guofan', 'li-hongzhang', 'zuo-zongtang', 'zhang-zhidong'], summary: '洋务派学习西方军事和技术，推动近代工业、军事、海防和教育建设。' }),
  event({ id: 'sino-japanese-war', name: '甲午中日战争', dateText: '1894-1895年', dynastyIds: ['qing'], periodLabel: '晚清', tags: ['民族危机', '马关条约'], relatedPersonIds: ['li-hongzhang', 'deng-shichang'], summary: '甲午战败暴露洋务局限和近代海防短板，邓世昌殉国成为北洋海军失败记忆的重要象征。' }),
  event({ id: 'hundred-days-reform', name: '戊戌变法', dateText: '1898年', dynastyIds: ['qing'], periodLabel: '晚清改革', tags: ['维新', '改革'], relatedPersonIds: ['guangxu-emperor', 'kang-youwei', 'liang-qichao', 'tan-sitong', 'cixi', 'yuan-shikai'], summary: '维新派推动制度改革，百日后失败，谭嗣同等遇害，袁世凯在政变前后的选择影响变法结局。' }),
  event({ id: 'boxer-protocol', name: '庚子事变与辛丑条约', dateText: '1900-1901年', dynastyIds: ['qing'], periodLabel: '晚清危机', tags: ['义和团', '辛丑条约'], relatedPersonIds: ['guangxu-emperor', 'cixi'], summary: '义和团运动和八国联军侵华后，清政府签订辛丑条约。' }),
  event({ id: 'xinhai-revolution', name: '辛亥革命', dateText: '1911年', dynastyIds: ['qing'], periodLabel: '清末民初', tags: ['王朝终结', '共和'], relatedPersonIds: ['sun-yat-sen', 'yuan-shikai', 'qiu-jin'], summary: '辛亥革命推翻清朝，结束中国两千多年君主专制制度，革命党、北洋军政力量和清廷共同影响政权转移。' }),

  event({ id: 'wu-yue-hegemony', name: '吴越争霸', dateText: '前6-前5世纪', dynastyIds: ['eastern-zhou'], periodLabel: '春秋末期', tags: ['吴国', '越国', '争霸'], relatedPersonIds: ['king-helu-wu', 'sun-wu', 'wu-zixu', 'fuchai', 'goujian', 'fan-li'], summary: '吴国在阖闾、夫差时期强盛，越王勾践在范蠡等辅佐下灭吴，体现春秋末期南方诸侯争霸。' }),
  event({ id: 'mozi-thought', name: '墨家思想形成', dateText: '战国前期', dynastyIds: ['eastern-zhou'], periodLabel: '战国诸子', tags: ['墨家', '兼爱非攻', '百家争鸣'], relatedPersonIds: ['mozi', 'kongzi', 'mengzi'], summary: '墨子提出兼爱、非攻、尚贤等主张，与儒家、道家、法家共同构成战国思想竞争。' }),
  event({ id: 'guiling-maling-battles', name: '桂陵之战与马陵之战', dateText: '前354年、前342年', dynastyIds: ['eastern-zhou'], periodLabel: '战国中期', tags: ['齐魏战争', '孙膑', '围魏救赵'], relatedPersonIds: ['king-wei-qi', 'king-hui-wei', 'sun-bin', 'tian-ji', 'pang-juan'], summary: '齐国借孙膑谋略在桂陵、马陵击败魏军，魏国霸权受挫，齐国地位上升。' }),
  event({ id: 'yiling-battle', name: '夷陵之战', dateText: '222年', dynastyIds: ['three-kingdoms'], periodLabel: '三国初期', tags: ['蜀吴战争', '陆逊', '刘备'], relatedPersonIds: ['liu-bei', 'sun-quan', 'lu-xun-wu'], summary: '刘备伐吴失败，陆逊火攻破蜀军，蜀汉国力受损，孙吴巩固江东安全。' }),
  event({ id: 'tang-tujue-campaign', name: '唐灭东突厥', dateText: '630年', dynastyIds: ['tang'], periodLabel: '唐太宗时期', tags: ['边疆', '李靖', '东突厥'], relatedPersonIds: ['tang-taizong', 'li-jing-tang'], summary: '李靖率军击败东突厥，唐朝北方安全和草原影响力显著提升。' }),
  event({ id: 'zhenguan-ministers', name: '贞观名臣政治', dateText: '627-649年', dynastyIds: ['tang'], periodLabel: '唐太宗时期', tags: ['房玄龄', '杜如晦', '纳谏'], relatedPersonIds: ['tang-taizong', 'wei-zheng', 'fang-xuanling', 'du-ruhui'], summary: '唐太宗任用魏征、房玄龄、杜如晦等名臣，形成初唐制度整合和君臣协同的治世形象。' }),
  event({ id: 'jianzhen-east-voyage', name: '鉴真东渡', dateText: '753年', dynastyIds: ['tang'], periodLabel: '唐代中外交流', tags: ['中日交流', '佛教', '航海'], relatedPersonIds: ['jian-zhen'], summary: '鉴真历经多次尝试东渡日本，传播佛教戒律和唐代文化，是唐代中外交流的重要事件。' }),
  event({ id: 'chanyuan-treaty', name: '澶渊之盟', dateText: '1005年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋辽并立', tags: ['宋辽关系', '寇准'], relatedPersonIds: ['song-zhenzong', 'kou-zhun', 'xiao-chuo'], summary: '宋辽在战争后达成澶渊之盟，形成长期和平与岁币关系，北宋边防和财政格局由此稳定又受制。' }),
  event({ id: 'qingli-reform', name: '庆历新政', dateText: '1043-1045年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋仁宗朝', tags: ['改革', '范仲淹', '欧阳修'], relatedPersonIds: ['song-renzong', 'fan-zhongyan', 'ouyang-xiu'], summary: '范仲淹等试图整顿吏治、选官和边防，庆历新政虽短暂失败，却预示北宋改革议题持续加深。' }),
  event({ id: 'song-literary-network', name: '北宋古文与士大夫网络', dateText: '11世纪', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋文化', tags: ['欧阳修', '苏轼', '古文'], relatedPersonIds: ['ouyang-xiu', 'su-shi', 'fan-zhongyan'], summary: '欧阳修等推动文风革新并提携后进，苏轼等人继承发展，使北宋文学与士大夫政治相互塑造。' }),
  event({ id: 'huangtiandang-battle', name: '黄天荡之战', dateText: '1130年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '南宋初年', tags: ['抗金', '韩世忠'], relatedPersonIds: ['han-shizhong', 'song-gaozong'], summary: '韩世忠在黄天荡一带阻击金军，体现南宋初年江淮防线和水战抗金的重要性。' }),
  event({ id: 'southern-song-patriotic-literature', name: '南宋爱国文学', dateText: '12-13世纪', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '南宋文化', tags: ['陆游', '辛弃疾', '李清照'], relatedPersonIds: ['li-qingzhao', 'lu-you', 'xin-qiji', 'yue-fei'], summary: '南渡离乱和宋金对峙推动忧国诗词发展，李清照、陆游、辛弃疾等以不同方式书写时代创痛。' }),
  event({ id: 'yuan-cultural-exchange', name: '元代东西交通与游记传播', dateText: '13世纪后期', dynastyIds: ['yuan'], periodLabel: '元代交流', tags: ['马可波罗', '中外交流'], relatedPersonIds: ['kublai-khan', 'marco-polo'], summary: '蒙古帝国和元代交通网络促进欧亚交流，马可·波罗游记在欧洲传播元代中国形象。' }),
  event({ id: 'yuan-art-literati', name: '元代文人书画转型', dateText: '13-14世纪', dynastyIds: ['yuan'], periodLabel: '元代文化', tags: ['赵孟頫', '书画'], relatedPersonIds: ['zhao-mengfu'], summary: '赵孟頫等文人书画家在宋元转折中重塑书画风格，也体现遗民身份与入仕选择的复杂性。' }),
  event({ id: 'cotton-textile-technology', name: '元代棉纺织技术传播', dateText: '13-14世纪', dynastyIds: ['yuan'], periodLabel: '元代技术', tags: ['黄道婆', '棉纺织'], relatedPersonIds: ['huang-daopo'], summary: '黄道婆改良和传播棉纺织技术，推动江南棉纺织业发展，影响民生经济。' }),
  event({ id: 'late-ming-eunuch-politics', name: '晚明宦官政治与东林党争', dateText: '17世纪前期', dynastyIds: ['ming'], periodLabel: '明末政治', tags: ['魏忠贤', '崇祯', '党争'], relatedPersonIds: ['wei-zhongxian', 'chongzhen-emperor'], summary: '魏忠贤专权和东林党争加深明末政治撕裂，崇祯清算阉党后仍难重建稳定治理。' }),
  event({ id: 'shanhai-pass-battle', name: '山海关决策与清军入关', dateText: '1644年', dynastyIds: ['ming', 'qing'], periodLabel: '明清鼎革', tags: ['吴三桂', '多尔衮', '李自成'], relatedPersonIds: ['wu-sangui', 'dorgon', 'li-zicheng', 'shunzhi-emperor'], summary: '吴三桂与多尔衮合兵击败李自成势力，清军入关后北方政局迅速改变。' }),
  event({ id: 'zheng-success-taiwan', name: '郑成功收复台湾', dateText: '1661-1662年', dynastyIds: ['ming', 'qing'], periodLabel: '明清海疆', tags: ['台湾', '海防', '荷兰殖民'], relatedPersonIds: ['zheng-chenggong'], summary: '郑成功驱逐荷兰殖民者、收复台湾，使台湾进入明郑政权治理阶段。' }),
  event({ id: 'qing-taiwan-unification', name: '清统一台湾', dateText: '1683年', dynastyIds: ['qing'], periodLabel: '康熙时期', tags: ['台湾', '施琅', '海疆'], relatedPersonIds: ['kangxi-emperor', 'shi-lang', 'zheng-chenggong'], summary: '施琅率清军攻取台湾郑氏政权，清廷随后设置台湾府，海疆治理格局发生变化。' }),
  event({ id: 'heshen-corruption', name: '和珅案', dateText: '1799年', dynastyIds: ['qing'], periodLabel: '乾嘉转折', tags: ['贪腐', '吏治'], relatedPersonIds: ['qianlong-emperor', 'heshen'], summary: '乾隆去世后嘉庆清算和珅，巨额贪腐案暴露清中期后期吏治和财政问题。' }),
  event({ id: 'recover-xinjiang', name: '左宗棠收复新疆', dateText: '1876-1878年', dynastyIds: ['qing'], periodLabel: '晚清边疆', tags: ['新疆', '边疆危机'], relatedPersonIds: ['zuo-zongtang'], summary: '左宗棠率军收复新疆，维护西北边疆安全，体现晚清在边疆危机中的军事和财政动员。' }),
  event({ id: 'late-qing-new-policy', name: '清末新政与新军', dateText: '1901-1911年', dynastyIds: ['qing'], periodLabel: '清末改革', tags: ['新政', '新军', '立宪'], relatedPersonIds: ['cixi', 'zhang-zhidong', 'yuan-shikai'], summary: '清末新政推动教育、军事、行政和预备立宪改革，新军和地方实力派上升也加速清廷权力重组。' }),
  event({ id: 'qiu-jin-revolution', name: '秋瑾与晚清革命宣传', dateText: '1907年前后', dynastyIds: ['qing'], periodLabel: '清末革命', tags: ['女性解放', '革命宣传'], relatedPersonIds: ['qiu-jin', 'sun-yat-sen'], summary: '秋瑾参与革命宣传和组织活动，牺牲后成为反清革命与女性觉醒的标志性人物。' }),

  event({ id: 'qin-mu-hegemony', name: '秦穆公任贤与秦国西进', dateText: '前7世纪', dynastyIds: ['eastern-zhou'], periodLabel: '春秋秦国', tags: ['秦穆公', '百里奚', '春秋霸主'], relatedPersonIds: ['qin-mu-gong', 'baili-xi', 'jin-wen-gong'], summary: '秦穆公任用百里奚等贤臣，经营西方并参与秦晋关系，为秦国早期崛起奠定传统叙事基础。' }),
  event({ id: 'chengpu-battle', name: '城濮之战', dateText: '前632年', dynastyIds: ['eastern-zhou'], periodLabel: '春秋晋楚争霸', tags: ['晋文公', '楚成王', '争霸'], relatedPersonIds: ['jin-wen-gong', 'chu-cheng-wang'], summary: '晋文公在城濮之战中击败楚军，成为春秋晋楚争霸和晋文公称霸的重要节点。' }),
  event({ id: 'li-kui-reform', name: '李悝变法', dateText: '战国初期', dynastyIds: ['eastern-zhou'], periodLabel: '魏文侯时期', tags: ['变法', '法经', '魏国'], relatedPersonIds: ['wei-wen-hou', 'li-kui'], summary: '李悝在魏文侯时期推行政治经济改革并整理法制，推动魏国成为战国初期强国。' }),
  event({ id: 'wu-qi-reform', name: '吴起变法', dateText: '前4世纪', dynastyIds: ['eastern-zhou'], periodLabel: '战国楚国', tags: ['变法', '吴起', '楚国'], relatedPersonIds: ['wu-qi'], summary: '吴起在楚国推行削弱旧贵族、整顿军政的改革，触动既得利益后被杀。' }),
  event({ id: 'zou-ji-remonstrance', name: '邹忌讽齐王纳谏', dateText: '战国中期', dynastyIds: ['eastern-zhou'], periodLabel: '齐威王时期', tags: ['纳谏', '齐国'], relatedPersonIds: ['king-wei-qi', 'zou-ji'], summary: '邹忌以家事类比国政劝齐威王纳谏，成为教材中说明讽谏和君主听政的经典故事。' }),
  event({ id: 'yue-yi-attacks-qi', name: '乐毅伐齐', dateText: '前284年前后', dynastyIds: ['eastern-zhou'], periodLabel: '战国后期', tags: ['燕昭王', '乐毅', '齐国危机'], relatedPersonIds: ['yan-zhao-wang', 'yue-yi', 'tian-dan'], summary: '燕昭王任用乐毅率联军伐齐，齐国几乎亡国，随后田单在即墨坚持反攻。' }),
  event({ id: 'tian-dan-restores-qi', name: '田单复齐', dateText: '前279年前后', dynastyIds: ['eastern-zhou'], periodLabel: '战国后期', tags: ['火牛阵', '齐国复国'], relatedPersonIds: ['tian-dan', 'yue-yi'], summary: '田单据守即墨并反攻燕军，使齐国恢复，是战国后期以弱复国的重要叙事。' }),
  event({ id: 'hufu-qishe', name: '胡服骑射', dateText: '前307年', dynastyIds: ['eastern-zhou'], periodLabel: '赵武灵王时期', tags: ['军事改革', '赵国'], relatedPersonIds: ['zhao-wuling-wang'], summary: '赵武灵王推行胡服骑射，学习北方骑兵战法，提升赵国军事机动能力。' }),
  event({ id: 'xinling-jun-rescues-zhao', name: '信陵君窃符救赵', dateText: '前257年', dynastyIds: ['eastern-zhou'], periodLabel: '长平之后', tags: ['战国四公子', '合纵抗秦'], relatedPersonIds: ['xinling-jun', 'qin-zhao-xiang-wang'], summary: '秦围赵都邯郸时，信陵君窃符夺兵救赵，体现战国合纵抗秦和门客政治。' }),
  event({ id: 'jing-ke-assassinates-qin', name: '荆轲刺秦王', dateText: '前227年', dynastyIds: ['eastern-zhou'], periodLabel: '秦统一前夕', tags: ['燕太子丹', '秦王政'], relatedPersonIds: ['jing-ke', 'yan-taizi-dan', 'qin-shi-huang'], summary: '燕太子丹派荆轲刺杀秦王政未遂，成为战国末期弱国反秦的著名事件。' }),
  event({ id: 'empress-lu-regency', name: '吕后临朝与诸吕之乱', dateText: '前195-前180年', dynastyIds: ['western-han'], periodLabel: '汉初', tags: ['吕后', '功臣集团'], relatedPersonIds: ['lu-zhi', 'liu-bang', 'zhou-bo', 'han-wen-di'], summary: '吕后临朝称制，吕氏集团掌权；吕后死后功臣集团平定诸吕并迎立汉文帝。' }),
  event({ id: 'huo-guang-regency', name: '霍光辅政', dateText: '前87-前68年', dynastyIds: ['western-han'], periodLabel: '昭宣时期', tags: ['辅政', '霍光'], relatedPersonIds: ['han-zhao-di', 'han-xuan-di', 'huo-guang'], summary: '霍光受汉武帝托孤辅政，废立昌邑王、拥立汉宣帝，深刻影响西汉中期皇权运行。' }),
  event({ id: 'shanghan-zabinglun', name: '《伤寒杂病论》成书传统', dateText: '东汉末', dynastyIds: ['eastern-han'], periodLabel: '东汉医学', tags: ['张仲景', '医学'], relatedPersonIds: ['zhang-zhongjing', 'hua-tuo'], summary: '张仲景医学传统和华佗外科经验共同体现东汉末医学发展，《伤寒杂病论》成为后世中医经典。' }),
  event({ id: 'wang-meng-governs-qin', name: '王猛辅佐前秦', dateText: '4世纪', dynastyIds: ['eastern-jin-sixteen'], periodLabel: '前秦强盛', tags: ['王猛', '苻坚'], relatedPersonIds: ['fu-jian', 'wang-meng'], summary: '王猛辅佐苻坚整顿内政、强化军政，使前秦一度统一北方，为淝水之战前的强盛奠基。' }),
  event({ id: 'qimin-yaoshu', name: '《齐民要术》', dateText: '北魏时期', dynastyIds: ['southern-northern'], periodLabel: '南北朝农学', tags: ['农学', '贾思勰'], relatedPersonIds: ['jia-sixie'], summary: '贾思勰《齐民要术》系统总结农业、畜牧和加工经验，是中国古代农学代表著作。' }),
  event({ id: 'shuijingzhu', name: '《水经注》', dateText: '北魏时期', dynastyIds: ['southern-northern'], periodLabel: '南北朝地理', tags: ['地理学', '郦道元'], relatedPersonIds: ['li-daoyuan'], summary: '郦道元《水经注》记录河流、地理、历史和风物，兼具科学和文学价值。' }),
  event({ id: 'zhaozhou-bridge', name: '赵州桥建造', dateText: '隋代', dynastyIds: ['sui'], periodLabel: '隋代工程', tags: ['桥梁', '李春'], relatedPersonIds: ['li-chun'], summary: '赵州桥代表隋代桥梁工程技术成就，传统上归于工匠李春设计建造。' }),
  event({ id: 'mawei-incident', name: '马嵬驿之变', dateText: '756年', dynastyIds: ['tang'], periodLabel: '安史之乱途中', tags: ['杨贵妃', '唐玄宗'], relatedPersonIds: ['tang-xuanzong', 'yang-guifei', 'an-lushan'], summary: '安史之乱中唐玄宗西逃，马嵬驿兵变导致杨贵妃被赐死，成为唐由盛转衰的象征事件。' }),
  event({ id: 'tang-calligraphy', name: '唐代书法与颜真卿', dateText: '唐代', dynastyIds: ['tang'], periodLabel: '唐代文化', tags: ['书法', '颜真卿'], relatedPersonIds: ['yan-zhenqing'], summary: '颜真卿书法和忠烈形象共同塑造唐代文化记忆，是中国书法史重要节点。' }),
  event({ id: 'cup-wine-release-soldiers', name: '杯酒释兵权', dateText: '北宋初', dynastyIds: ['five-dynasties-ten-kingdoms', 'song-liao-jin-xixia'], periodLabel: '宋初中央集权', tags: ['宋太祖', '赵普', '武将权力'], relatedPersonIds: ['song-taizu', 'zhao-pu', 'shi-shouxin'], summary: '宋太祖通过解除高级武将兵权强化中央集权，赵普等参与制度安排，奠定宋代重文抑武方向。' }),
  event({ id: 'bao-zheng-judicial', name: '包拯执法与清官形象', dateText: '北宋仁宗朝', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋政治文化', tags: ['包拯', '清官'], relatedPersonIds: ['song-renzong', 'bao-zheng'], summary: '包拯以刚正执法和清廉形象著称，历史事迹与民间包公故事共同构成中国清官文化符号。' }),
  event({ id: 'water-powered-armillary-sphere', name: '苏颂水运仪象台', dateText: '1088年前后', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '北宋科技', tags: ['天文仪器', '苏颂'], relatedPersonIds: ['su-song', 'shen-kuo'], summary: '苏颂主持水运仪象台，体现北宋天文、机械和工程综合水平，与沈括记录的宋代科技共同说明技术活跃。' }),
  event({ id: 'ehu-meeting', name: '鹅湖之会', dateText: '1175年', dynastyIds: ['song-liao-jin-xixia'], periodLabel: '南宋思想', tags: ['朱熹', '陆九渊', '理学心学'], relatedPersonIds: ['zhu-xi', 'lu-jiuyuan'], summary: '朱熹与陆九渊在鹅湖之会中围绕治学路径和心性问题论辩，反映南宋理学内部差异。' }),
  event({ id: 'prince-ning-rebellion', name: '宁王之乱', dateText: '1519年', dynastyIds: ['ming'], periodLabel: '明中期', tags: ['王阳明', '平叛'], relatedPersonIds: ['wang-yangming', 'zhu-chenhao'], summary: '宁王朱宸濠起兵叛乱，王阳明迅速平定，成为其军政才能和知行合一实践的重要背景。' }),
  event({ id: 'ming-drama', name: '晚明戏曲与《牡丹亭》', dateText: '明代后期', dynastyIds: ['ming'], periodLabel: '晚明文化', tags: ['汤显祖', '戏曲'], relatedPersonIds: ['tang-xianzu'], summary: '汤显祖《牡丹亭》等作品代表晚明戏曲文学高峰，体现城市文化和个体情感表达增强。' }),
  event({ id: 'xu-xiake-travels', name: '徐霞客游记与实地考察', dateText: '明末', dynastyIds: ['ming'], periodLabel: '明末地理观察', tags: ['徐霞客', '地理'], relatedPersonIds: ['xu-xiake'], summary: '徐霞客长期旅行考察地貌、水文和风土，《徐霞客游记》体现明末知识实践中的实地观察精神。' }),
  event({ id: 'tianjing-incident', name: '天京事变', dateText: '1856年', dynastyIds: ['qing'], periodLabel: '太平天国内部危机', tags: ['杨秀清', '石达开', '内讧'], relatedPersonIds: ['hong-xiuquan', 'yang-xiuqing', 'shi-dakai'], summary: '太平天国领导层内部冲突爆发，杨秀清被杀、石达开出走，运动由盛转衰。' }),
  event({ id: 'yan-fu-translation', name: '严复翻译《天演论》', dateText: '1898年前后', dynastyIds: ['qing'], periodLabel: '晚清思想启蒙', tags: ['严复', '天演论'], relatedPersonIds: ['yan-fu', 'liang-qichao'], summary: '严复翻译介绍西方思想，尤其《天演论》影响晚清知识界对国家危机和社会竞争的理解。' }),
  event({ id: 'chinese-educational-mission', name: '幼童留美', dateText: '1872-1881年', dynastyIds: ['qing'], periodLabel: '洋务教育', tags: ['容闳', '留学'], relatedPersonIds: ['rong-hong', 'zeng-guofan', 'li-hongzhang'], summary: '容闳推动幼童留美计划，晚清首次大规模派遣幼童赴美学习，体现洋务运动的教育尝试。' }),
  event({ id: 'industry-saves-nation', name: '实业救国', dateText: '清末民初', dynastyIds: ['qing'], periodLabel: '晚清经济转型', tags: ['张謇', '实业'], relatedPersonIds: ['zhang-jian', 'zhang-zhidong'], summary: '张謇等倡导实业救国，通过近代企业、教育和地方建设回应民族危机。' }),
  event({ id: 'xin-falls-and-chimei', name: '新末起义与赤眉军', dateText: '17-27年', dynastyIds: ['xin', 'eastern-han'], periodLabel: '新末东汉初', tags: ['绿林军', '赤眉军', '王朝更替'], relatedPersonIds: ['wang-mang', 'liu-xuan', 'fan-chong', 'liu-xiu'], summary: '王莽改革失效、灾荒和地方控制崩溃后，绿林、赤眉等武装相继兴起，更始政权短暂入长安，刘秀最终完成东汉重建。' }),
  event({ id: 'dou-gu-western-regions', name: '窦固出击与甘英出使西域', dateText: '73-102年', dynastyIds: ['eastern-han'], periodLabel: '东汉经营西域', tags: ['窦固', '班超', '甘英', '丝绸之路'], relatedPersonIds: ['dou-gu', 'ban-chao', 'gan-ying'], summary: '东汉先以窦固等将领恢复西域军事通道，再由班超经营诸国、派甘英向西出使，军事、外交和交通信息由此相互连接。' }),
  event({ id: 'five-dynasties-later-han-zhou', name: '后汉后周更替', dateText: '947-951年', dynastyIds: ['five-dynasties-ten-kingdoms'], periodLabel: '五代中后期', tags: ['后汉', '后周', '军镇政治'], relatedPersonIds: ['liu-zhiyuan', 'guo-wei', 'chai-rong'], summary: '后晋灭亡后刘知远建立后汉，郭威又因军政和宫廷冲突建立后周，五代中原政权继续快速更替。' }),
  event({ id: 'wuyue-local-governance', name: '吴越保境安民与纳土前史', dateText: '10世纪', dynastyIds: ['five-dynasties-ten-kingdoms'], periodLabel: '十国吴越', tags: ['吴越', '水利', '地方治理'], relatedPersonIds: ['qian-liu', 'song-taizu'], summary: '吴越政权在两浙经营水利、城市和海贸，并通过对中原政权称臣换取地方稳定，为后来和平纳土归宋准备条件。' }),
  event({ id: 'ming-qing-thought', name: '明清之际实学与思想转向', dateText: '17世纪', dynastyIds: ['ming', 'qing'], periodLabel: '明清鼎革后的思想世界', tags: ['顾炎武', '黄宗羲', '王夫之', '经世致用'], relatedPersonIds: ['gu-yanwu', 'huang-zongxi', 'wang-fuzhi'], summary: '明清鼎革促使顾炎武、黄宗羲、王夫之等从历史、制度、经学和社会实践反思国家治理，清初实学由此形成重要传统。' }),
  event({ id: 'railway-engineering', name: '京张铁路与近代工程自主', dateText: '1905-1909年', dynastyIds: ['qing'], periodLabel: '清末近代工业', tags: ['詹天佑', '铁路', '工程技术'], relatedPersonIds: ['zhan-tianyou', 'zhang-zhidong', 'rong-hong'], summary: '詹天佑主持京张铁路建设，在资金、地形和技术人才有限的条件下完成复杂线路，成为清末工程教育与技术自主的代表。' }),
];

const periodExtensions = {
  xia: [
    { id: 'xia-legend-period', name: '夏朝与早期国家传说', dateText: '约前2070-约前1600年', ruler: '禹、启、桀等传统叙事人物', personIds: ['da-yu', 'qi-of-xia', 'jie-of-xia'], eventIds: ['yu-control-floods', 'xia-founding', 'shang-overthrows-xia'] },
  ],
  shang: [
    { id: 'shang-period', name: '商代青铜与甲骨文时期', dateText: '约前1600-前1046年', ruler: '商汤、盘庚、武丁、帝辛等', personIds: ['cheng-tang', 'yi-yin', 'pan-geng', 'wu-ding', 'fu-hao', 'shang-zhou-wang'], eventIds: ['shang-overthrows-xia', 'pan-geng-moves-yin', 'wu-ding-revival', 'wu-wang-conquers-shang'] },
  ],
  'western-zhou': [
    { id: 'western-zhou-period', name: '西周分封礼乐时期', dateText: '前1046-前771年', ruler: '周武王、周公、周幽王等', personIds: ['king-wen-zhou', 'king-wu-zhou', 'duke-of-zhou', 'jiang-ziya', 'king-you-zhou'], eventIds: ['wu-wang-conquers-shang', 'zhou-ritual-feudalism', 'western-zhou-fall'] },
    { id: 'western-eastern-zhou-transition', name: '西周东周转折', dateText: '前771-前720年', ruler: '周幽王、周平王', personIds: ['king-you-zhou', 'zhou-ping-wang'], eventIds: ['western-zhou-fall'] },
  ],
  'eastern-zhou': [
    { id: 'spring-autumn-jin-chu-qin', name: '春秋晋楚秦争霸', dateText: '前7-前6世纪', ruler: '晋文公、楚成王、秦穆公等', personIds: ['jin-wen-gong', 'chu-cheng-wang', 'qin-mu-gong', 'baili-xi'], eventIds: ['chengpu-battle', 'qin-mu-hegemony'] },
    { id: 'spring-autumn-wu-yue', name: '春秋吴越争霸', dateText: '前6-前5世纪', ruler: '吴王阖闾、吴王夫差、越王勾践等', personIds: ['king-helu-wu', 'sun-wu', 'wu-zixu', 'fuchai', 'goujian', 'fan-li'], eventIds: ['wu-yue-hegemony'] },
    { id: 'warring-states-qi-wei-mozi', name: '战国齐魏战争与墨家思想', dateText: '前5-前4世纪', ruler: '齐、魏等诸侯竞争', personIds: ['mozi', 'king-wei-qi', 'king-hui-wei', 'sun-bin', 'tian-ji', 'pang-juan'], eventIds: ['mozi-thought', 'guiling-maling-battles'] },
    { id: 'warring-states-reform-heroes', name: '战国改革、合纵与刺秦', dateText: '前4-前3世纪', ruler: '韩赵魏齐燕赵秦等诸侯', personIds: ['wei-wen-hou', 'zhao-lie-hou', 'han-jing-hou', 'li-kui', 'wu-qi', 'zou-ji', 'yan-zhao-wang', 'yue-yi', 'tian-dan', 'zhao-wuling-wang', 'xinling-jun', 'yan-taizi-dan', 'jing-ke'], eventIds: ['three-families-jin', 'li-kui-reform', 'wu-qi-reform', 'zou-ji-remonstrance', 'yue-yi-attacks-qi', 'tian-dan-restores-qi', 'hufu-qishe', 'xinling-jun-rescues-zhao', 'jing-ke-assassinates-qin'] },
  ],
  'western-han': [
    { id: 'western-han-early', name: '汉初与文景之治', dateText: '前202-前141年', ruler: '汉高祖、吕后、文帝、景帝等', personIds: ['liu-bang', 'lu-zhi', 'zhou-bo', 'xiao-he', 'zhang-liang', 'han-xin', 'han-wen-di', 'han-jing-di', 'chao-cuo', 'liu-bi'], eventIds: ['empress-lu-regency', 'wenjing-rule', 'rebellion-seven-states'] },
    { id: 'western-han-wudi', name: '汉武帝与西汉强盛', dateText: '前141-前87年', ruler: '汉武帝刘彻', personIds: ['han-wu-di', 'dong-zhongshu', 'sima-qian', 'zhang-qian', 'wei-qing', 'huo-qubing'], eventIds: ['han-wu-reforms', 'han-xiongnu-war', 'silk-road', 'shiji-written'] },
    { id: 'western-han-zhaoxuan', name: '昭宣中兴与西汉中期稳定', dateText: '前87-前49年', ruler: '汉昭帝、汉宣帝', personIds: ['han-zhao-di', 'han-xuan-di', 'huo-guang'], eventIds: ['zhaoxuan-revival', 'huo-guang-regency'] },
  ],
  xin: [
    { id: 'xin-period', name: '王莽新朝', dateText: '8-23年', ruler: '王莽', personIds: ['wang-mang'], eventIds: ['wang-mang-usurpation', 'xin-reforms'] },
    { id: 'xin-collapse-period', name: '新末起义与更始政权', dateText: '17-27年', ruler: '更始帝刘玄、赤眉军与刘秀等', personIds: ['wang-mang', 'liu-xuan', 'fan-chong', 'liu-xiu'], eventIds: ['xin-falls-and-chimei', 'wang-mang-usurpation'] },
  ],
  'eastern-han': [
    { id: 'eastern-han-early', name: '东汉建立与经营西域', dateText: '25-102年', ruler: '光武帝及明章时期', personIds: ['liu-xiu', 'ban-chao', 'ban-gu'], eventIds: ['guangwu-restoration', 'eastern-han-western-regions', 'hanshu-compiled'] },
    { id: 'eastern-han-late', name: '东汉科技与末年动荡', dateText: '105-220年', ruler: '东汉中后期诸帝与地方军政势力', personIds: ['cai-lun', 'zhang-heng', 'hua-tuo', 'zhang-zhongjing', 'zhang-jue', 'cao-cao', 'yuan-shao', 'zhou-yu', 'cao-pi', 'lu-xun-wu'], eventIds: ['papermaking-improved', 'eastern-han-science', 'eastern-han-medicine', 'shanghan-zabinglun', 'yellow-turban', 'guandu-battle', 'red-cliffs', 'yiling-battle'] },
    { id: 'eastern-han-western-regions-detail', name: '东汉西域交通与欧亚认知', dateText: '73-102年', ruler: '明帝、章帝时期的边疆将领与使者', personIds: ['dou-gu', 'ban-chao', 'gan-ying'], eventIds: ['dou-gu-western-regions', 'eastern-han-western-regions'] },
  ],
  'three-kingdoms': [
    { id: 'three-kingdoms-period', name: '魏蜀吴鼎立', dateText: '220-280年', ruler: '曹魏、蜀汉、孙吴并立', personIds: ['cao-cao', 'cao-pi', 'liu-bei', 'sun-quan', 'zhuge-liang', 'sima-yi', 'sima-zhao', 'guan-yu', 'zhou-yu', 'lu-xun-wu'], eventIds: ['red-cliffs', 'three-kingdoms-formation', 'yiling-battle', 'sima-usurpation'] },
  ],
  'western-jin': [
    { id: 'western-jin-period', name: '西晋短暂统一', dateText: '266-316年', ruler: '晋武帝司马炎及宗王政治', personIds: ['sima-yi', 'sima-zhao', 'sima-yan'], eventIds: ['sima-usurpation', 'western-jin-unification'] },
    { id: 'western-jin-wo-period', name: '西晋灭吴与三国终结', dateText: '279-280年', ruler: '晋武帝司马炎、孙吴末帝孙皓', personIds: ['sima-yan', 'sun-hao-wu', 'du-yu', 'wang-jun-jin'], eventIds: ['western-jin-unification'] },
  ],
  'eastern-jin-sixteen': [
    { id: 'eastern-jin-period', name: '东晋与十六国对峙', dateText: '317-420年', ruler: '东晋门阀政治与北方十六国', personIds: ['xie-an', 'xie-xuan', 'fu-jian', 'wang-meng', 'wang-xizhi', 'gu-kaizhi', 'tao-yuanming'], eventIds: ['wang-meng-governs-qin', 'feishui-battle', 'eastern-jin-culture'] },
  ],
  'southern-northern': [
    { id: 'southern-northern-period', name: '南北朝改革与文化', dateText: '420-589年', ruler: '南朝与北朝政权相继更替', personIds: ['tao-yuanming', 'emperor-xiaowen-northern-wei', 'zu-chongzhi', 'jia-sixie', 'li-daoyuan'], eventIds: ['xiaowen-reform', 'northern-southern-science', 'qimin-yaoshu', 'shuijingzhu'] },
    { id: 'northern-wei-regency-period', name: '北魏冯太后与孝文帝改革', dateText: '471-499年', ruler: '冯太后、北魏孝文帝', personIds: ['feng-taihou', 'emperor-xiaowen-northern-wei'], eventIds: ['xiaowen-reform'] },
  ],
  sui: [
    { id: 'sui-period', name: '隋朝统一与短促崩溃', dateText: '581-618年', ruler: '隋文帝、隋炀帝', personIds: ['sui-wen-di', 'gao-jiong', 'yang-su', 'sui-yang-di', 'li-chun'], eventIds: ['sui-unification', 'grand-canal', 'zhaozhou-bridge', 'sui-fall'] },
  ],
  tang: [
    { id: 'tang-early', name: '初唐与盛唐', dateText: '618-755年', ruler: '唐高祖、唐太宗、唐高宗、武则天、唐玄宗等', personIds: ['tang-gaozu', 'tang-taizong', 'tang-gaozong', 'wei-zheng', 'fang-xuanling', 'du-ruhui', 'li-jing-tang', 'wu-zetian', 'tang-xuanzong', 'yang-guifei', 'xuan-zang', 'jian-zhen', 'li-bai'], eventIds: ['tang-founding', 'zhenguan-rule', 'zhenguan-ministers', 'tang-tujue-campaign', 'yonghui-rule', 'wu-zhou', 'kaiyuan-prosperity', 'tang-cultural-exchange', 'jianzhen-east-voyage', 'tang-poetry', 'mawei-incident'] },
    { id: 'tang-mid-late', name: '中晚唐与唐末动荡', dateText: '755-907年', ruler: '安史乱后藩镇与唐末起义', personIds: ['an-lushan', 'shi-siming', 'guo-ziyi', 'yan-zhenqing', 'du-fu', 'han-yu', 'liu-zongyuan', 'bai-juyi', 'huang-chao'], eventIds: ['an-shi-rebellion', 'tang-calligraphy', 'tang-literary-reform', 'huang-chao-uprising'] },
    { id: 'tang-kaiyuan-ministers', name: '开元前期姚宋政治', dateText: '713-725年', ruler: '唐玄宗、姚崇、宋璟', personIds: ['tang-xuanzong', 'yao-chong', 'song-jing'], eventIds: ['kaiyuan-prosperity'] },
    { id: 'tang-an-shi-commanders', name: '安史之乱唐军统帅', dateText: '755-763年', ruler: '唐肃宗及郭子仪、李光弼等', personIds: ['an-lushan', 'guo-ziyi', 'li-guangbi', 'shi-siming'], eventIds: ['an-shi-rebellion'] },
  ],
  'five-dynasties-ten-kingdoms': [
    { id: 'five-dynasties-period', name: '五代中原更替', dateText: '907-960年', ruler: '后梁、后唐、后晋、后汉、后周相继更替', personIds: ['zhu-wen', 'li-cunxu', 'shi-jingtang', 'chai-rong'], eventIds: ['five-dynasties-begin', 'five-dynasties-transition', 'sixteen-prefectures', 'later-zhou-reform'] },
    { id: 'ten-kingdoms-song-transition', name: '十国与宋初收束', dateText: '907-979年', ruler: '南方及周边十国与北宋统一进程', personIds: ['li-yu', 'song-taizu', 'zhao-pu', 'shi-shouxin'], eventIds: ['chenqiao-mutiny', 'cup-wine-release-soldiers', 'song-unification'] },
    { id: 'five-dynasties-later-han-zhou-period', name: '后汉后周与十国地方治理', dateText: '947-960年', ruler: '刘知远、郭威、柴荣及吴越等地方政权', personIds: ['liu-zhiyuan', 'guo-wei', 'chai-rong', 'qian-liu'], eventIds: ['five-dynasties-later-han-zhou', 'later-zhou-reform', 'wuyue-local-governance'] },
  ],
  'song-liao-jin-xixia': [
    { id: 'northern-song-period', name: '北宋与辽夏并立', dateText: '960-1127年', ruler: '北宋、辽、西夏并立', personIds: ['song-taizu', 'zhao-pu', 'shi-shouxin', 'song-zhenzong', 'kou-zhun', 'xiao-chuo', 'song-renzong', 'fan-zhongyan', 'ouyang-xiu', 'bao-zheng', 'song-shenzong', 'song-huizong', 'yelv-abaoji', 'yuan-hao', 'wang-anshi', 'sima-guang', 'su-shi', 'shen-kuo', 'bi-sheng', 'su-song'], eventIds: ['chenqiao-mutiny', 'song-unification', 'cup-wine-release-soldiers', 'chanyuan-treaty', 'renzong-era', 'qingli-reform', 'bao-zheng-judicial', 'liao-founding', 'xixia-founding', 'wang-anshi-reform', 'song-literary-network', 'zizhi-tongjian', 'song-culture', 'song-science', 'movable-type', 'water-powered-armillary-sphere', 'jingkang-incident'] },
    { id: 'southern-song-period', name: '南宋与金对峙', dateText: '1127-1279年', ruler: '南宋、金、西夏、蒙古相继角力', personIds: ['song-gaozong', 'wanyan-aguda', 'yue-fei', 'han-shizhong', 'qin-hui', 'li-qingzhao', 'lu-you', 'xin-qiji', 'cheng-yi', 'zhu-xi', 'lu-jiuyuan', 'wen-tianxiang'], eventIds: ['jin-founding', 'jingkang-incident', 'song-jin-war', 'huangtiandang-battle', 'southern-song-patriotic-literature', 'neo-confucianism', 'ehu-meeting', 'song-fall'] },
    { id: 'liao-later-southern-frontier', name: '辽太宗与燕云格局', dateText: '936-947年', ruler: '辽太宗耶律德光与后晋', personIds: ['yelv-deguang', 'shi-jingtang'], eventIds: ['sixteen-prefectures'] },
  ],
  yuan: [
    { id: 'yuan-period', name: '元朝大一统与多元文化', dateText: '1271-1368年', ruler: '忽必烈及元代诸帝', personIds: ['kublai-khan', 'yelv-chucai', 'marco-polo', 'zhao-mengfu', 'huang-daopo', 'guo-shoujing', 'guan-hanqing', 'wen-tianxiang'], eventIds: ['yuan-founding', 'song-fall', 'yuan-cultural-exchange', 'yuan-art-literati', 'cotton-textile-technology', 'yuan-science', 'yuan-drama'] },
    { id: 'yuan-science-drama-detail', name: '元代历法与戏曲', dateText: '13-14世纪', ruler: '元代官僚、科学家与文人', personIds: ['wang-xun-yuan', 'xu-heng', 'guo-shoujing', 'guan-hanqing', 'bai-pu', 'ma-zhiyuan'], eventIds: ['yuan-science', 'yuan-drama'] },
  ],
  ming: [
    { id: 'ming-early', name: '明初建制与海上交流', dateText: '1368-1449年', ruler: '明太祖、明成祖、明英宗等', personIds: ['ming-taizu', 'ming-chengzu', 'ming-yingzong', 'zheng-he', 'yu-qian'], eventIds: ['ming-founding', 'jingnan-campaign', 'zheng-he-voyages', 'tumu-crisis'] },
    { id: 'ming-middle-late', name: '明中后期改革、科技与危机', dateText: '15-17世纪', ruler: '明中后期皇帝与内阁、边防、起义力量', personIds: ['wang-yangming', 'zhu-chenhao', 'qi-jiguang', 'yu-dayou', 'ming-shenzong', 'zhang-juzheng', 'li-shizhen', 'tang-xianzu', 'xu-guangqi', 'matteo-ricci', 'xu-xiake', 'song-yingxing', 'wei-zhongxian', 'chongzhen-emperor', 'yuan-chonghuan', 'li-zicheng', 'dorgon', 'wu-sangui', 'zheng-chenggong', 'shi-lang'], eventIds: ['yangming-learning', 'prince-ning-rebellion', 'anti-wokou', 'zhang-juzheng-reform', 'ming-science', 'ming-drama', 'late-ming-western-learning', 'xu-xiake-travels', 'late-ming-eunuch-politics', 'ming-qing-transition', 'ming-fall', 'shanhai-pass-battle', 'zheng-success-taiwan'] },
  ],
  qing: [
    { id: 'qing-early', name: '清入关与康乾时期', dateText: '1636-1799年', ruler: '皇太极、顺治、康熙、雍正、乾隆等', personIds: ['nurhaci', 'hong-taiji', 'shunzhi-emperor', 'dorgon', 'wu-sangui', 'zheng-chenggong', 'shi-lang', 'kangxi-emperor', 'yongzheng-emperor', 'qianlong-emperor', 'heshen'], eventIds: ['later-jin-rise', 'qing-founding', 'qing-enters-pass', 'shanhai-pass-battle', 'zheng-success-taiwan', 'kangxi-consolidation', 'qing-taiwan-unification', 'qing-institutions', 'high-qing', 'heshen-corruption'] },
    { id: 'late-qing-period', name: '晚清危机与近代转型', dateText: '1840-1912年', ruler: '道光、光绪、晚清朝廷、洋务派、维新派、革命派', personIds: ['daoguang-emperor', 'lin-zexu', 'wei-yuan', 'hong-xiuquan', 'yang-xiuqing', 'shi-dakai', 'hong-rengan', 'zeng-guofan', 'li-hongzhang', 'rong-hong', 'zuo-zongtang', 'zhang-zhidong', 'zhang-jian', 'ding-ruchang', 'deng-shichang', 'yan-fu', 'cixi', 'guangxu-emperor', 'kang-youwei', 'liang-qichao', 'tan-sitong', 'yuan-shikai', 'qiu-jin', 'sun-yat-sen'], eventIds: ['opium-war', 'taiping-rebellion', 'tianjing-incident', 'self-strengthening', 'chinese-educational-mission', 'recover-xinjiang', 'sino-japanese-war', 'yan-fu-translation', 'hundred-days-reform', 'boxer-protocol', 'late-qing-new-policy', 'industry-saves-nation', 'qiu-jin-revolution', 'xinhai-revolution'] },
  ],
};

const relationships = [
  { sourceId: 'han-wu-di', targetId: 'dong-zhongshu', type: '君臣 / 思想政策', summary: '董仲舒的儒学政治方案服务汉武帝大一统治理。', eventIds: ['han-wu-reforms'] },
  { sourceId: 'han-wu-di', targetId: 'zhang-qian', type: '君臣 / 西域交通', summary: '张骞出使西域扩展汉朝对外交通视野。', eventIds: ['silk-road'] },
  { sourceId: 'han-wu-di', targetId: 'wei-qing', type: '君臣 / 对匈奴战争', summary: '卫青是汉武帝时期反击匈奴的重要将领。', eventIds: ['han-xiongnu-war'] },
  { sourceId: 'han-wu-di', targetId: 'huo-qubing', type: '君臣 / 对匈奴战争', summary: '霍去病以远征战功成为汉武帝军事扩张的代表人物。', eventIds: ['han-xiongnu-war'] },
  { sourceId: 'cao-cao', targetId: 'liu-bei', type: '三国竞争', summary: '曹操与刘备从合作、依附到长期竞争，是三国格局的重要线索。', eventIds: ['red-cliffs', 'three-kingdoms-formation'] },
  { sourceId: 'liu-bei', targetId: 'zhuge-liang', type: '君臣 / 谋略', summary: '诸葛亮辅佐刘备建立蜀汉，并在刘备死后主持蜀汉政务。', eventIds: ['three-kingdoms-formation'] },
  { sourceId: 'sun-quan', targetId: 'zhou-yu', type: '君臣 / 赤壁战役', summary: '周瑜辅佐孙权，在赤壁之战中发挥关键军事作用。', eventIds: ['red-cliffs'] },
  { sourceId: 'xie-an', targetId: 'fu-jian', type: '淝水对峙', summary: '淝水之战中东晋和前秦形成关键对抗。', eventIds: ['feishui-battle'] },
  { sourceId: 'tang-taizong', targetId: 'wei-zheng', type: '君臣 / 纳谏', summary: '魏征以直谏著称，是贞观政治的重要象征。', eventIds: ['zhenguan-rule'] },
  { sourceId: 'tang-xuanzong', targetId: 'an-lushan', type: '君臣转敌', summary: '安禄山受唐玄宗信任而坐大，最终发动安史之乱。', eventIds: ['an-shi-rebellion'] },
  { sourceId: 'wang-anshi', targetId: 'sima-guang', type: '改革争论', summary: '王安石与司马光代表北宋新法与旧党政治争论。', eventIds: ['wang-anshi-reform'] },
  { sourceId: 'yue-fei', targetId: 'qin-hui', type: '抗金与主和争议', summary: '岳飞抗金与秦桧主和、岳飞冤案构成南宋政治记忆核心。', eventIds: ['song-jin-war'] },
  { sourceId: 'ming-chengzu', targetId: 'zheng-he', type: '君臣 / 海上外交', summary: '郑和下西洋是在明成祖支持下展开的大规模海上外交行动。', eventIds: ['zheng-he-voyages'] },
  { sourceId: 'ming-chengzu', targetId: 'ming-taizu', type: '祖孙 / 制度继承', summary: '明成祖继承并调整明太祖建立的皇权结构。', eventIds: ['jingnan-campaign'] },
  { sourceId: 'zeng-guofan', targetId: 'li-hongzhang', type: '师承 / 洋务集团', summary: '李鸿章受曾国藩提携，二人共同代表晚清地方军政和洋务集团。', eventIds: ['taiping-rebellion', 'self-strengthening'] },
  { sourceId: 'kang-youwei', targetId: 'liang-qichao', type: '师生 / 维新派', summary: '康有为与梁启超是戊戌变法的核心思想和舆论人物。', eventIds: ['hundred-days-reform'] },
  { sourceId: 'cixi', targetId: 'kang-youwei', type: '改革冲突', summary: '慈禧太后与维新派的权力冲突导致戊戌变法失败。', eventIds: ['hundred-days-reform'] },
  { sourceId: 'lin-zexu', targetId: 'wei-yuan', type: '近代思想关联', summary: '林则徐禁烟与魏源开眼看世界共同反映鸦片战争前后的思想转向。', eventIds: ['opium-war'] },
  { sourceId: 'sun-yat-sen', targetId: 'cixi', type: '革命与晚清体制', summary: '孙中山代表革命派对晚清君主专制体制的挑战。', eventIds: ['xinhai-revolution'] },
  { sourceId: 'tang-gaozu', targetId: 'tang-taizong', type: '父子 / 开国权力转移', summary: '唐高祖建立唐朝，李世民在统一战争和玄武门之变后成为唐太宗。', eventIds: ['tang-founding', 'zhenguan-rule'] },
  { sourceId: 'tang-gaozong', targetId: 'wu-zetian', type: '夫妻 / 共治与权力转移', summary: '唐高宗后期武则天参与政务，成为唐向武周政治转折的重要线索。', eventIds: ['yonghui-rule', 'wu-zhou'] },
  { sourceId: 'song-renzong', targetId: 'su-shi', type: '时代背景 / 士大夫政治', summary: '苏轼成长和入仕处于仁宗朝文官政治和文化活跃的背景之下。', eventIds: ['renzong-era', 'song-culture'] },
  { sourceId: 'song-shenzong', targetId: 'wang-anshi', type: '君臣 / 变法支持', summary: '宋神宗支持王安石变法，使新法从士人方案进入国家政策层面。', eventIds: ['wang-anshi-reform'] },
  { sourceId: 'song-gaozong', targetId: 'yue-fei', type: '君臣 / 抗金路线争议', summary: '岳飞抗金军事行动受宋高宗最高战略路线制约，和战选择成为南宋政治焦点。', eventIds: ['song-jin-war'] },
  { sourceId: 'song-gaozong', targetId: 'qin-hui', type: '君臣 / 主和政策', summary: '秦桧主和路线与宋高宗维护南宋政权安全的选择密切相关。', eventIds: ['song-jin-war'] },
  { sourceId: 'ming-yingzong', targetId: 'yu-qian', type: '君臣 / 土木堡危机', summary: '明英宗被俘后，于谦主持北京防御并拥立景泰帝稳定局势，二人关系体现皇权危机与国家安全冲突。', eventIds: ['tumu-crisis'] },
  { sourceId: 'ming-shenzong', targetId: 'zhang-juzheng', type: '君臣 / 改革辅政', summary: '张居正在万历初年辅佐年幼的明神宗推行财政和行政改革。', eventIds: ['zhang-juzheng-reform'] },
  { sourceId: 'daoguang-emperor', targetId: 'lin-zexu', type: '君臣 / 禁烟政策', summary: '道光帝任用林则徐赴广东禁烟，禁烟行动直接牵动鸦片战争前后局势。', eventIds: ['opium-war'] },
  { sourceId: 'guangxu-emperor', targetId: 'cixi', type: '名义皇权与实际权力', summary: '光绪帝支持维新变法，但实际军政权力受到慈禧太后和守旧集团制约。', eventIds: ['hundred-days-reform', 'boxer-protocol'] },
  { sourceId: 'guangxu-emperor', targetId: 'kang-youwei', type: '君臣 / 维新变法', summary: '康有为等维新派通过光绪帝推动制度改革，形成戊戌变法的中央政治路径。', eventIds: ['hundred-days-reform'] },
  { sourceId: 'king-helu-wu', targetId: 'sun-wu', type: '君臣 / 军事改革', summary: '孙武服务吴国并以兵法和军队训练帮助吴王阖闾增强军事实力。', eventIds: ['wu-yue-hegemony'] },
  { sourceId: 'king-helu-wu', targetId: 'wu-zixu', type: '君臣 / 强吴攻楚', summary: '伍子胥辅佐吴王阖闾改革内政、经营军政，是吴国崛起的重要谋臣。', eventIds: ['wu-yue-hegemony'] },
  { sourceId: 'fuchai', targetId: 'wu-zixu', type: '君臣 / 忠谏冲突', summary: '伍子胥劝夫差警惕越国，夫差不纳并赐死伍子胥，成为吴亡叙事中的关键冲突。', eventIds: ['wu-yue-hegemony'] },
  { sourceId: 'fuchai', targetId: 'goujian', type: '吴越对抗', summary: '夫差先败越而称强，勾践卧薪尝胆后灭吴，二人构成春秋末期吴越争霸主线。', eventIds: ['wu-yue-hegemony'] },
  { sourceId: 'goujian', targetId: 'fan-li', type: '君臣 / 灭吴谋略', summary: '范蠡辅佐勾践恢复越国并最终灭吴，功成身退的形象影响深远。', eventIds: ['wu-yue-hegemony'] },
  { sourceId: 'mozi', targetId: 'kongzi', type: '诸子思想对照', summary: '墨家兼爱非攻与儒家仁礼秩序同属战国显学，但社会理想和实践路径不同。', eventIds: ['mozi-thought', 'hundred-schools'] },
  { sourceId: 'mozi', targetId: 'mengzi', type: '思想争论', summary: '孟子常批评墨家兼爱，二者体现战国诸子围绕伦理、政治和社会秩序的争论。', eventIds: ['mozi-thought', 'hundred-schools'] },
  { sourceId: 'king-wei-qi', targetId: 'tian-ji', type: '君臣 / 齐军统帅', summary: '齐威王时期田忌参与对魏作战，齐国军事地位由此提升。', eventIds: ['guiling-maling-battles'] },
  { sourceId: 'tian-ji', targetId: 'sun-bin', type: '将帅与谋士', summary: '田忌重用孙膑谋略，在齐魏战争中取得关键胜利。', eventIds: ['guiling-maling-battles'] },
  { sourceId: 'sun-bin', targetId: 'pang-juan', type: '战场对手 / 兵家对照', summary: '孙膑与庞涓的对抗构成桂陵、马陵叙事核心，也成为兵家智谋与骄兵失败的对照。', eventIds: ['guiling-maling-battles'] },
  { sourceId: 'king-hui-wei', targetId: 'pang-juan', type: '君臣 / 魏军指挥', summary: '庞涓代表魏惠王时期魏军主力，马陵失败使魏国霸权受挫。', eventIds: ['guiling-maling-battles'] },
  { sourceId: 'king-wei-qi', targetId: 'king-hui-wei', type: '齐魏争霸', summary: '齐威王与魏惠王时期齐魏竞争激烈，桂陵、马陵之战改变战国中期力量格局。', eventIds: ['guiling-maling-battles'] },
  { sourceId: 'cao-cao', targetId: 'yuan-shao', type: '官渡对手 / 北方争霸', summary: '官渡之战中曹操以弱胜强击败袁绍，北方统一方向由此转向曹操集团。', eventIds: ['guandu-battle'] },
  { sourceId: 'cao-cao', targetId: 'cao-pi', type: '父子 / 曹魏奠基与建国', summary: '曹操奠定曹魏基础，曹丕代汉称帝，使三国鼎立正式成形。', eventIds: ['three-kingdoms-formation'] },
  { sourceId: 'sun-quan', targetId: 'lu-xun-wu', type: '君臣 / 夷陵决策', summary: '孙权任用陆逊抵御刘备伐吴，夷陵胜利巩固孙吴安全。', eventIds: ['yiling-battle'] },
  { sourceId: 'liu-bei', targetId: 'lu-xun-wu', type: '夷陵战场对手', summary: '刘备为关羽之死和荆州问题伐吴，陆逊在夷陵击败蜀军。', eventIds: ['yiling-battle'] },
  { sourceId: 'sima-yi', targetId: 'cao-pi', type: '君臣 / 曹魏政权', summary: '司马懿在曹丕时期进入曹魏权力体系，为后续司马氏掌权积累政治资本。', eventIds: ['sima-usurpation'] },
  { sourceId: 'sima-yi', targetId: 'sima-zhao', type: '父子 / 权力承继', summary: '司马昭承继司马懿、司马师之后的权力基础，继续推进司马氏控制曹魏。', eventIds: ['sima-usurpation'] },
  { sourceId: 'sima-zhao', targetId: 'sima-yan', type: '父子 / 代魏建晋', summary: '司马昭完成代魏前的权力铺垫，司马炎最终受禅建立西晋。', eventIds: ['sima-usurpation', 'western-jin-unification'] },
  { sourceId: 'tang-taizong', targetId: 'li-jing-tang', type: '君臣 / 边疆军事', summary: '李靖受唐太宗重用北破东突厥，体现初唐强大的军事组织能力。', eventIds: ['tang-tujue-campaign'] },
  { sourceId: 'tang-taizong', targetId: 'fang-xuanling', type: '君臣 / 宰辅行政', summary: '房玄龄辅佐唐太宗处理制度和政务，是贞观名臣政治的重要代表。', eventIds: ['zhenguan-rule', 'zhenguan-ministers'] },
  { sourceId: 'tang-taizong', targetId: 'du-ruhui', type: '君臣 / 决策辅佐', summary: '杜如晦参与唐太宗核心决策，与房玄龄共同构成贞观政治的宰辅形象。', eventIds: ['zhenguan-ministers'] },
  { sourceId: 'fang-xuanling', targetId: 'du-ruhui', type: '同僚 / 房谋杜断', summary: '房玄龄、杜如晦并称“房谋杜断”，体现初唐行政谋划与决断执行的配合。', eventIds: ['zhenguan-ministers'] },
  { sourceId: 'xuan-zang', targetId: 'jian-zhen', type: '中外交流对照', summary: '玄奘西行和鉴真东渡分别代表唐代向西、向东的佛教文化交流。', eventIds: ['tang-cultural-exchange', 'jianzhen-east-voyage'] },
  { sourceId: 'song-zhenzong', targetId: 'kou-zhun', type: '君臣 / 澶渊决策', summary: '寇准力主宋真宗亲征澶州，稳定北宋军心并促成宋辽谈判条件。', eventIds: ['chanyuan-treaty'] },
  { sourceId: 'song-zhenzong', targetId: 'xiao-chuo', type: '宋辽对峙', summary: '宋真宗与辽方萧太后时期的战争和谈判最终形成澶渊之盟。', eventIds: ['chanyuan-treaty'] },
  { sourceId: 'kou-zhun', targetId: 'xiao-chuo', type: '澶渊战和对手', summary: '寇准代表北宋强硬应战路线，萧太后代表辽方实际决策核心之一。', eventIds: ['chanyuan-treaty'] },
  { sourceId: 'song-renzong', targetId: 'fan-zhongyan', type: '君臣 / 庆历新政', summary: '范仲淹在仁宗朝推动庆历新政，试图提前处理北宋吏治和边防问题。', eventIds: ['qingli-reform'] },
  { sourceId: 'song-renzong', targetId: 'ouyang-xiu', type: '君臣 / 文治政治', summary: '欧阳修在仁宗朝参与政治和文学革新，体现北宋士大夫政治活力。', eventIds: ['qingli-reform', 'song-culture'] },
  { sourceId: 'fan-zhongyan', targetId: 'ouyang-xiu', type: '同道 / 庆历改革', summary: '范仲淹和欧阳修同属庆历新政与北宋士大夫改革传统中的关键人物。', eventIds: ['qingli-reform'] },
  { sourceId: 'ouyang-xiu', targetId: 'su-shi', type: '提携 / 文学传承', summary: '欧阳修赏识并提携苏轼，使北宋古文和士大夫文学传统延续发展。', eventIds: ['song-literary-network', 'song-culture'] },
  { sourceId: 'song-gaozong', targetId: 'han-shizhong', type: '君臣 / 抗金将领', summary: '韩世忠在南宋初年抵抗金军，但其军事行动同样受宋高宗和战路线制约。', eventIds: ['song-jin-war', 'huangtiandang-battle'] },
  { sourceId: 'han-shizhong', targetId: 'yue-fei', type: '同僚 / 抗金名将', summary: '韩世忠与岳飞同为南宋初年抗金名将，代表主战军事力量。', eventIds: ['song-jin-war'] },
  { sourceId: 'qin-hui', targetId: 'han-shizhong', type: '主和与主战张力', summary: '秦桧主和路线与韩世忠等抗金将领形成政治张力。', eventIds: ['song-jin-war'] },
  { sourceId: 'li-qingzhao', targetId: 'xin-qiji', type: '南渡文学 / 时代创痛', summary: '李清照和辛弃疾分别以婉约词与豪放词书写南渡后的家国创痛。', eventIds: ['southern-song-patriotic-literature'] },
  { sourceId: 'lu-you', targetId: 'xin-qiji', type: '爱国文学同代呼应', summary: '陆游和辛弃疾都将恢复中原的政治理想写入诗词，是南宋爱国文学代表。', eventIds: ['southern-song-patriotic-literature'] },
  { sourceId: 'kublai-khan', targetId: 'marco-polo', type: '统治者与旅行者记述', summary: '马可·波罗关于元代中国的叙述以忽必烈时代的大一统和欧亚交通为背景。', eventIds: ['yuan-cultural-exchange'] },
  { sourceId: 'kublai-khan', targetId: 'zhao-mengfu', type: '元廷与宋宗室文人', summary: '赵孟頫以宋宗室身份入仕元朝，体现元代政治整合和文化身份复杂性。', eventIds: ['yuan-art-literati'] },
  { sourceId: 'huang-daopo', targetId: 'song-yingxing', type: '技术史前后影响', summary: '黄道婆代表棉纺织技术传播，宋应星则系统记录工农业技术，二者可作为技术史前后链条理解。', eventIds: ['cotton-textile-technology', 'ming-science'] },
  { sourceId: 'chongzhen-emperor', targetId: 'wei-zhongxian', type: '皇权清算宦官集团', summary: '崇祯即位后清算魏忠贤集团，但明末政治结构和财政军政危机已难以逆转。', eventIds: ['late-ming-eunuch-politics'] },
  { sourceId: 'chongzhen-emperor', targetId: 'yuan-chonghuan', type: '君臣 / 辽东争议', summary: '袁崇焕因辽东战局和政治猜疑被崇祯处死，成为明末军事决策争议焦点。', eventIds: ['ming-qing-transition'] },
  { sourceId: 'chongzhen-emperor', targetId: 'li-zicheng', type: '亡国君主与起义军', summary: '李自成入北京直接导致崇祯自缢，明朝全国性统治终结。', eventIds: ['ming-fall'] },
  { sourceId: 'li-zicheng', targetId: 'wu-sangui', type: '山海关前后对抗', summary: '李自成政权与吴三桂在山海关局势中对立，推动清军入关。', eventIds: ['ming-fall', 'shanhai-pass-battle'] },
  { sourceId: 'dorgon', targetId: 'wu-sangui', type: '临时同盟 / 入关决策', summary: '多尔衮与吴三桂在山海关合兵击败李自成，清军由此进入中原。', eventIds: ['qing-enters-pass', 'shanhai-pass-battle'] },
  { sourceId: 'dorgon', targetId: 'shunzhi-emperor', type: '摄政与皇权', summary: '顺治帝幼年入关，清初实际军政决策很大程度由摄政王多尔衮主导。', eventIds: ['qing-enters-pass'] },
  { sourceId: 'kangxi-emperor', targetId: 'wu-sangui', type: '君臣转敌 / 三藩之乱', summary: '吴三桂由清初藩王转为叛乱首领，康熙平三藩巩固清朝统一。', eventIds: ['kangxi-consolidation'] },
  { sourceId: 'zheng-chenggong', targetId: 'shi-lang', type: '海疆对手 / 郑氏与清廷', summary: '郑成功奠定台湾郑氏政权基础，施琅后来代表清廷统一台湾，二者构成清初海疆主线。', eventIds: ['zheng-success-taiwan', 'qing-taiwan-unification'] },
  { sourceId: 'kangxi-emperor', targetId: 'shi-lang', type: '君臣 / 统一台湾', summary: '康熙任用施琅攻取台湾郑氏政权，将台湾纳入清朝行政体系。', eventIds: ['qing-taiwan-unification', 'kangxi-consolidation'] },
  { sourceId: 'qianlong-emperor', targetId: 'heshen', type: '君臣 / 权臣贪腐', summary: '和珅受乾隆宠信而权势膨胀，其贪腐暴露清中期后期吏治问题。', eventIds: ['high-qing', 'heshen-corruption'] },
  { sourceId: 'zeng-guofan', targetId: 'zuo-zongtang', type: '晚清军政同僚', summary: '曾国藩与左宗棠同属晚清地方军政力量上升的代表人物，共同影响洋务和边疆治理。', eventIds: ['self-strengthening', 'recover-xinjiang'] },
  { sourceId: 'li-hongzhang', targetId: 'zhang-zhidong', type: '洋务集团对照', summary: '李鸿章偏重淮军、北洋和外交，张之洞偏重湖广实业教育，二人共同构成洋务与新政谱系。', eventIds: ['self-strengthening', 'late-qing-new-policy'] },
  { sourceId: 'li-hongzhang', targetId: 'deng-shichang', type: '北洋海军体系', summary: '邓世昌是北洋海军将领，甲午战败也牵动对李鸿章洋务海防路线的评价。', eventIds: ['sino-japanese-war'] },
  { sourceId: 'zhang-zhidong', targetId: 'yuan-shikai', type: '清末新政与新军', summary: '张之洞和袁世凯都参与清末新政语境下的教育、实业或新军建设，地方实力派影响上升。', eventIds: ['late-qing-new-policy'] },
  { sourceId: 'guangxu-emperor', targetId: 'yuan-shikai', type: '戊戌政变关键人物', summary: '袁世凯在戊戌变法前后的选择影响维新派计划和政变走向。', eventIds: ['hundred-days-reform'] },
  { sourceId: 'cixi', targetId: 'yuan-shikai', type: '晚清权力合作', summary: '慈禧太后在晚清政治中重用袁世凯等新军力量，清末权力结构由此变化。', eventIds: ['hundred-days-reform', 'late-qing-new-policy'] },
  { sourceId: 'sun-yat-sen', targetId: 'qiu-jin', type: '革命思想与行动呼应', summary: '孙中山代表革命组织和理论，秋瑾代表清末革命宣传与牺牲精神，二者共同构成辛亥前革命动员。', eventIds: ['qiu-jin-revolution', 'xinhai-revolution'] },
  { sourceId: 'sun-yat-sen', targetId: 'yuan-shikai', type: '革命与北洋政权转移', summary: '辛亥革命后孙中山与袁世凯围绕临时政权交接形成清末民初转折主线。', eventIds: ['xinhai-revolution'] },
  { sourceId: 'da-yu', targetId: 'qi-of-xia', type: '父子 / 世袭转折叙事', summary: '大禹与启的承继关系常被用来说明禅让传说向世袭王权叙事转变。', eventIds: ['xia-founding'] },
  { sourceId: 'jie-of-xia', targetId: 'cheng-tang', type: '夏商更替对手', summary: '夏桀和商汤构成传统王朝更替叙事中暴君失德与新王受命的对照。', eventIds: ['shang-overthrows-xia'] },
  { sourceId: 'cheng-tang', targetId: 'yi-yin', type: '君臣 / 开国辅政', summary: '伊尹辅佐商汤灭夏建商，是商初辅政和贤相叙事的核心人物。', eventIds: ['shang-overthrows-xia'] },
  { sourceId: 'wu-ding', targetId: 'fu-hao', type: '商王与王室女将', summary: '妇好在武丁时期参与祭祀与军事活动，体现商王室政治和军事权力结构。', eventIds: ['wu-ding-revival'] },
  { sourceId: 'shang-zhou-wang', targetId: 'king-wu-zhou', type: '商周更替对手', summary: '周武王伐纣灭商，商纣王成为传统亡国君主叙事的代表。', eventIds: ['wu-wang-conquers-shang'] },
  { sourceId: 'king-wen-zhou', targetId: 'king-wu-zhou', type: '父子 / 周族兴起', summary: '周文王奠定周族政治基础，周武王完成灭商建周。', eventIds: ['wu-wang-conquers-shang'] },
  { sourceId: 'king-wu-zhou', targetId: 'jiang-ziya', type: '君臣 / 灭商军事辅佐', summary: '姜子牙辅佐周武王伐纣，在传统叙事中代表周族军事谋略。', eventIds: ['wu-wang-conquers-shang'] },
  { sourceId: 'king-wu-zhou', targetId: 'duke-of-zhou', type: '兄弟 / 建周与制礼', summary: '周武王建立西周，周公旦辅佐成王并整理分封礼乐秩序。', eventIds: ['wu-wang-conquers-shang', 'zhou-ritual-feudalism'] },
  { sourceId: 'king-you-zhou', targetId: 'zhou-ping-wang', type: '父子 / 西周东周转折', summary: '周幽王亡国后，周平王东迁洛邑，标志西周结束和东周开始。', eventIds: ['western-zhou-fall'] },
  { sourceId: 'qin-mu-gong', targetId: 'baili-xi', type: '君臣 / 任贤图霸', summary: '秦穆公任用百里奚等贤臣，推动秦国在春秋时期崛起。', eventIds: ['qin-mu-hegemony'] },
  { sourceId: 'qin-mu-gong', targetId: 'jin-wen-gong', type: '秦晋关系 / 霸主互动', summary: '秦穆公曾支持重耳返晋，秦晋关系成为春秋争霸的重要线索。', eventIds: ['qin-mu-hegemony', 'chengpu-battle'] },
  { sourceId: 'jin-wen-gong', targetId: 'chu-cheng-wang', type: '晋楚争霸对手', summary: '城濮之战中晋文公击败楚军，晋楚争霸格局由此发生转折。', eventIds: ['chengpu-battle'] },
  { sourceId: 'jin-wen-gong', targetId: 'chu-zhuang-wang', type: '春秋霸主接续', summary: '晋文公和楚庄王分别代表春秋中期晋、楚争霸中的霸主形象。', eventIds: ['spring-autumn-hegemony'] },
  { sourceId: 'wei-wen-hou', targetId: 'zhao-lie-hou', type: '三家分晋 / 新诸侯', summary: '魏文侯与赵烈侯同属三家分晋后被承认的新诸侯，战国秩序由此形成。', eventIds: ['three-families-jin'] },
  { sourceId: 'wei-wen-hou', targetId: 'han-jing-hou', type: '三家分晋 / 新诸侯', summary: '魏、韩、赵三家由晋国卿族转为诸侯，是春秋到战国的制度转折。', eventIds: ['three-families-jin'] },
  { sourceId: 'wei-wen-hou', targetId: 'li-kui', type: '君臣 / 变法强魏', summary: '李悝辅佐魏文侯改革，使魏国成为战国初期强国。', eventIds: ['li-kui-reform'] },
  { sourceId: 'wei-wen-hou', targetId: 'wu-qi', type: '君臣 / 魏国军事', summary: '吴起曾仕魏并参与军事建设，体现魏文侯时期重用人才的强国路线。', eventIds: ['li-kui-reform', 'wu-qi-reform'] },
  { sourceId: 'li-kui', targetId: 'wu-qi', type: '战国变法谱系', summary: '李悝和吴起分别从法制、军政方向体现战国早期变法潮流。', eventIds: ['li-kui-reform', 'wu-qi-reform'] },
  { sourceId: 'king-wei-qi', targetId: 'zou-ji', type: '君臣 / 纳谏政治', summary: '邹忌讽谏齐威王，使齐国纳谏故事成为战国政治教化经典。', eventIds: ['zou-ji-remonstrance'] },
  { sourceId: 'yan-zhao-wang', targetId: 'yue-yi', type: '君臣 / 招贤伐齐', summary: '燕昭王招贤任用乐毅，发动伐齐战争，使燕国短暂崛起。', eventIds: ['yue-yi-attacks-qi'] },
  { sourceId: 'yue-yi', targetId: 'tian-dan', type: '燕齐战争对手', summary: '乐毅伐齐几乎灭齐，田单随后坚守即墨并复齐，二人构成燕齐战争的正反转折。', eventIds: ['yue-yi-attacks-qi', 'tian-dan-restores-qi'] },
  { sourceId: 'zhao-wuling-wang', targetId: 'lian-po', type: '赵国军事传统', summary: '赵武灵王胡服骑射增强赵国军事基础，廉颇则代表其后赵军防御作战能力。', eventIds: ['hufu-qishe', 'changping-battle'] },
  { sourceId: 'xinling-jun', targetId: 'qin-zhao-xiang-wang', type: '合纵抗秦对抗', summary: '信陵君窃符救赵对抗秦国围赵压力，反映秦昭襄王时期秦国扩张带来的诸侯危机。', eventIds: ['xinling-jun-rescues-zhao'] },
  { sourceId: 'jing-ke', targetId: 'yan-taizi-dan', type: '委托刺秦', summary: '燕太子丹策划刺秦，荆轲执行刺杀行动，成为战国末期弱国反秦的著名故事。', eventIds: ['jing-ke-assassinates-qin'] },
  { sourceId: 'jing-ke', targetId: 'qin-shi-huang', type: '刺秦对象', summary: '荆轲刺杀秦王政未遂，秦统一进程没有被阻断。', eventIds: ['jing-ke-assassinates-qin'] },
  { sourceId: 'wang-jian', targetId: 'wang-ben', type: '父子 / 秦灭六国统帅', summary: '王翦、王贲父子参与秦灭六国战争，是秦统一军事集团的代表。', eventIds: ['qin-unification'] },
  { sourceId: 'qin-shi-huang', targetId: 'wang-ben', type: '君臣 / 统一战争', summary: '王贲参与灭魏、燕、齐等战争，服务秦王政统一天下。', eventIds: ['qin-unification'] },
  { sourceId: 'chen-sheng', targetId: 'wu-guang', type: '起义同盟', summary: '陈胜、吴广在大泽乡发动起义，揭开秦末大规模反秦序幕。', eventIds: ['daze-uprising'] },
  { sourceId: 'zhang-han', targetId: 'chen-sheng', type: '秦军与起义军对抗', summary: '章邯代表秦末镇压起义的主力将领，陈胜代表早期反秦动员。', eventIds: ['daze-uprising'] },
  { sourceId: 'xiang-yu', targetId: 'zhang-han', type: '巨鹿战场对手', summary: '巨鹿之战中项羽击破秦军主力，章邯最终降楚，秦朝军事支柱崩溃。', eventIds: ['julu-battle', 'fall-of-qin'] },
  { sourceId: 'liu-bang', targetId: 'lu-zhi', type: '夫妻 / 汉初权力延续', summary: '吕后在刘邦死后掌控朝政，对汉初政治格局产生深远影响。', eventIds: ['empress-lu-regency'] },
  { sourceId: 'lu-zhi', targetId: 'zhou-bo', type: '吕氏集团与功臣集团', summary: '吕后死后，周勃等功臣平定诸吕并迎立汉文帝。', eventIds: ['empress-lu-regency'] },
  { sourceId: 'zhou-bo', targetId: 'han-wen-di', type: '拥立关系', summary: '周勃参与迎立代王刘恒为汉文帝，推动汉初权力回归刘氏皇族。', eventIds: ['empress-lu-regency', 'wenjing-rule'] },
  { sourceId: 'han-jing-di', targetId: 'chao-cuo', type: '君臣 / 削藩政策', summary: '晁错主张削藩，汉景帝处死晁错仍未阻止七国之乱爆发。', eventIds: ['rebellion-seven-states'] },
  { sourceId: 'han-jing-di', targetId: 'liu-bi', type: '中央与诸侯王对抗', summary: '吴王刘濞发动七国之乱，汉景帝平乱后中央集权进一步加强。', eventIds: ['rebellion-seven-states'] },
  { sourceId: 'chao-cuo', targetId: 'liu-bi', type: '削藩与反削藩冲突', summary: '晁错削藩政策触发诸侯王反弹，刘濞成为七国之乱首要人物。', eventIds: ['rebellion-seven-states'] },
  { sourceId: 'han-zhao-di', targetId: 'huo-guang', type: '君臣 / 托孤辅政', summary: '霍光辅佐年幼的汉昭帝，维持武帝死后的政治稳定。', eventIds: ['huo-guang-regency', 'zhaoxuan-revival'] },
  { sourceId: 'han-xuan-di', targetId: 'huo-guang', type: '拥立与皇权再平衡', summary: '霍光拥立汉宣帝，宣帝亲政后逐步处理霍氏外戚影响。', eventIds: ['huo-guang-regency', 'zhaoxuan-revival'] },
  { sourceId: 'han-wu-di', targetId: 'sima-qian', type: '君臣 / 史学与权力创伤', summary: '司马迁因李陵事件受刑后完成《史记》，其个人遭遇与汉武帝时代政治压力相连。', eventIds: ['shiji-written'] },
  { sourceId: 'wang-mang', targetId: 'liu-xiu', type: '新汉更替对照', summary: '王莽代汉建新，刘秀在新末乱局中重建汉朝，二人构成西汉到东汉的政权转折。', eventIds: ['wang-mang-usurpation', 'guangwu-restoration'] },
  { sourceId: 'ban-gu', targetId: 'ban-chao', type: '兄弟 / 史学与西域经营', summary: '班固以史学著称，班超以经营西域著称，二人代表东汉文化与对外关系两条线索。', eventIds: ['hanshu-compiled', 'eastern-han-western-regions'] },
  { sourceId: 'zhang-heng', targetId: 'cai-lun', type: '东汉科技同代', summary: '张衡和蔡伦分别代表东汉科学仪器与造纸技术的成就。', eventIds: ['eastern-han-science', 'papermaking-improved'] },
  { sourceId: 'zhang-zhongjing', targetId: 'hua-tuo', type: '汉末医学双峰', summary: '张仲景和华佗从方书经典、外科针灸等不同方向体现汉末医学发展。', eventIds: ['eastern-han-medicine', 'shanghan-zabinglun'] },
  { sourceId: 'zhang-jue', targetId: 'cao-cao', type: '起义与地方军政崛起', summary: '黄巾起义给曹操等地方军政人物提供崛起舞台，东汉末军阀格局由此形成。', eventIds: ['yellow-turban'] },
  { sourceId: 'liu-bei', targetId: 'guan-yu', type: '君臣 / 蜀汉集团核心', summary: '关羽是刘备集团核心将领，其失败和身后忠义形象深刻影响三国叙事。', eventIds: ['three-kingdoms-formation', 'yiling-battle'] },
  { sourceId: 'cao-cao', targetId: 'hua-tuo', type: '权力与医学传说', summary: '华佗被曹操处死的故事体现汉末医学人物与权力中心的紧张关系，细节具有传说色彩。', eventIds: ['eastern-han-medicine'] },
  { sourceId: 'xie-an', targetId: 'xie-xuan', type: '叔侄 / 淝水分工', summary: '谢安稳定东晋后方，谢玄前线统兵，二人共同支撑淝水之战胜利。', eventIds: ['feishui-battle'] },
  { sourceId: 'fu-jian', targetId: 'wang-meng', type: '君臣 / 前秦强盛', summary: '王猛辅佐苻坚整顿前秦，使其一度统一北方。', eventIds: ['wang-meng-governs-qin'] },
  { sourceId: 'xie-xuan', targetId: 'fu-jian', type: '淝水战场对手', summary: '谢玄统率东晋军队抵御苻坚南下，淝水之战改变南北格局。', eventIds: ['feishui-battle'] },
  { sourceId: 'wang-xizhi', targetId: 'gu-kaizhi', type: '东晋艺术传统', summary: '王羲之书法和顾恺之绘画共同代表东晋士族文化艺术高峰。', eventIds: ['eastern-jin-culture'] },
  { sourceId: 'tao-yuanming', targetId: 'wang-xizhi', type: '东晋文化气质', summary: '王羲之和陶渊明分别从书法雅集与田园文学呈现东晋士人文化。', eventIds: ['eastern-jin-culture'] },
  { sourceId: 'zu-chongzhi', targetId: 'jia-sixie', type: '南北朝科技知识', summary: '祖冲之数学历法和贾思勰农学共同构成南北朝科技知识积累。', eventIds: ['northern-southern-science', 'qimin-yaoshu'] },
  { sourceId: 'jia-sixie', targetId: 'li-daoyuan', type: '北朝知识整理', summary: '贾思勰农学和郦道元地理学体现北朝实用知识和文本整理传统。', eventIds: ['qimin-yaoshu', 'shuijingzhu'] },
  { sourceId: 'sui-wen-di', targetId: 'gao-jiong', type: '君臣 / 隋初建制', summary: '高颎辅佐隋文帝处理隋初政务和制度建设，是隋朝统一后的重要宰辅。', eventIds: ['sui-unification'] },
  { sourceId: 'sui-wen-di', targetId: 'yang-su', type: '君臣 / 平陈统一', summary: '杨素参与隋朝军政和统一战争，服务隋文帝重新统一南北。', eventIds: ['sui-unification'] },
  { sourceId: 'sui-yang-di', targetId: 'yang-su', type: '隋朝权臣与继承争议', summary: '杨素与隋炀帝继位前后的政治关系常被纳入隋末争议叙事。', eventIds: ['sui-fall'] },
  { sourceId: 'sui-yang-di', targetId: 'tang-gaozu', type: '隋唐更替', summary: '隋炀帝时期徭役战争和统治危机加深，李渊在隋末动荡中建唐。', eventIds: ['sui-fall', 'tang-founding'] },
  { sourceId: 'tang-xuanzong', targetId: 'yang-guifei', type: '宫廷关系 / 盛衰象征', summary: '唐玄宗与杨贵妃的宫廷叙事和马嵬驿之变成为唐由盛转衰的重要文化符号。', eventIds: ['mawei-incident', 'an-shi-rebellion'] },
  { sourceId: 'an-lushan', targetId: 'shi-siming', type: '叛军首领接续', summary: '安禄山、史思明先后领导叛乱，使安史之乱持续多年。', eventIds: ['an-shi-rebellion'] },
  { sourceId: 'guo-ziyi', targetId: 'shi-siming', type: '平叛与叛军对抗', summary: '郭子仪等唐军将领长期平定安史叛乱，史思明代表后期叛军力量。', eventIds: ['an-shi-rebellion'] },
  { sourceId: 'yan-zhenqing', targetId: 'an-lushan', type: '忠烈与叛乱对抗', summary: '颜真卿在安史之乱中坚守反叛，其忠烈形象与书法成就并行流传。', eventIds: ['an-shi-rebellion', 'tang-calligraphy'] },
  { sourceId: 'li-bai', targetId: 'du-fu', type: '盛唐诗歌双峰', summary: '李白与杜甫分别代表盛唐浪漫想象和现实关怀，是唐诗高峰的核心人物。', eventIds: ['tang-poetry'] },
  { sourceId: 'han-yu', targetId: 'liu-zongyuan', type: '韩柳 / 古文运动', summary: '韩愈与柳宗元并称“韩柳”，共同推动中唐古文运动。', eventIds: ['tang-literary-reform'] },
  { sourceId: 'han-yu', targetId: 'bai-juyi', type: '中唐文学对照', summary: '韩愈倡导古文和儒学复兴，白居易强调诗歌通俗和现实关怀，二人体现中唐文学不同方向。', eventIds: ['tang-literary-reform', 'tang-poetry'] },
  { sourceId: 'zhu-wen', targetId: 'huang-chao', type: '起义军转藩镇', summary: '朱温出身黄巢起义军后投唐并坐大，最终废唐建后梁。', eventIds: ['huang-chao-uprising', 'five-dynasties-begin'] },
  { sourceId: 'chai-rong', targetId: 'song-taizu', type: '后周与北宋承接', summary: '周世宗改革和军事整顿为赵匡胤建立北宋、继续统一奠定条件。', eventIds: ['later-zhou-reform', 'chenqiao-mutiny'] },
  { sourceId: 'song-taizu', targetId: 'zhao-pu', type: '君臣 / 宋初中央集权', summary: '赵普辅佐宋太祖处理宋初政治制度，强化中央集权。', eventIds: ['chenqiao-mutiny', 'cup-wine-release-soldiers'] },
  { sourceId: 'song-taizu', targetId: 'shi-shouxin', type: '君臣 / 解除兵权', summary: '石守信等高级武将被解除兵权，体现宋太祖防范五代武人政治的制度选择。', eventIds: ['cup-wine-release-soldiers'] },
  { sourceId: 'zhao-pu', targetId: 'shi-shouxin', type: '制度设计与武将退权', summary: '赵普代表宋初制度谋划，石守信代表被调整的高级武将群体。', eventIds: ['cup-wine-release-soldiers'] },
  { sourceId: 'song-taizu', targetId: 'li-yu', type: '统一战争与亡国君主', summary: '北宋统一战争中南唐后主李煜降宋，十国割据走向收束。', eventIds: ['song-unification'] },
  { sourceId: 'song-renzong', targetId: 'bao-zheng', type: '君臣 / 清官政治形象', summary: '包拯活动于仁宗朝，刚正清廉形象成为北宋文官政治的重要社会记忆。', eventIds: ['bao-zheng-judicial', 'renzong-era'] },
  { sourceId: 'shen-kuo', targetId: 'bi-sheng', type: '科技记录与发明', summary: '沈括在《梦溪笔谈》中记录毕昇活字印刷术，使相关技术进入后世知识传统。', eventIds: ['song-science', 'movable-type'] },
  { sourceId: 'shen-kuo', targetId: 'su-song', type: '北宋科技同代', summary: '沈括和苏颂分别体现宋代知识记录、天文机械和工程技术水平。', eventIds: ['song-science', 'water-powered-armillary-sphere'] },
  { sourceId: 'zhu-xi', targetId: 'cheng-yi', type: '思想承继 / 程朱理学', summary: '朱熹吸收二程思想并系统化，形成后世影响深远的程朱理学。', eventIds: ['neo-confucianism'] },
  { sourceId: 'zhu-xi', targetId: 'lu-jiuyuan', type: '思想论辩 / 理学心学', summary: '朱熹与陆九渊围绕治学和心性问题存在差异，鹅湖之会成为南宋思想史重要节点。', eventIds: ['ehu-meeting', 'neo-confucianism'] },
  { sourceId: 'wang-yangming', targetId: 'zhu-chenhao', type: '平叛对手', summary: '王阳明平定宁王朱宸濠叛乱，体现其军政实践和知行合一形象。', eventIds: ['prince-ning-rebellion', 'yangming-learning'] },
  { sourceId: 'qi-jiguang', targetId: 'yu-dayou', type: '抗倭同僚', summary: '戚继光、俞大猷同为明代抗倭名将，共同改善东南海防。', eventIds: ['anti-wokou'] },
  { sourceId: 'xu-guangqi', targetId: 'matteo-ricci', type: '中西合作 / 科学翻译', summary: '徐光启与利玛窦合作翻译和传播西方科学知识，是晚明西学东渐核心组合。', eventIds: ['late-ming-western-learning'] },
  { sourceId: 'li-shizhen', targetId: 'xu-xiake', type: '晚明实证知识', summary: '李时珍医药考证和徐霞客实地旅行共同体现晚明知识实践中的观察、记录和整理。', eventIds: ['ming-science', 'xu-xiake-travels'] },
  { sourceId: 'tang-xianzu', targetId: 'wang-yangming', type: '晚明思想文化背景', summary: '汤显祖文学中的情感表达与晚明心学文化氛围有关，可作为思想与戏曲之间的文化关联理解。', eventIds: ['ming-drama', 'yangming-learning'] },
  { sourceId: 'hong-xiuquan', targetId: 'yang-xiuqing', type: '太平天国权力冲突', summary: '洪秀全与杨秀清的权力矛盾最终引爆天京事变，太平天国由盛转衰。', eventIds: ['taiping-rebellion', 'tianjing-incident'] },
  { sourceId: 'hong-xiuquan', targetId: 'shi-dakai', type: '太平天国君臣裂解', summary: '石达开出走反映太平天国内部权力裂解，对运动走向造成重大影响。', eventIds: ['taiping-rebellion', 'tianjing-incident'] },
  { sourceId: 'yang-xiuqing', targetId: 'shi-dakai', type: '天京事变相关人物', summary: '杨秀清被杀和石达开出走共同构成天京事变后太平天国内部崩裂的关键线索。', eventIds: ['tianjing-incident'] },
  { sourceId: 'hong-xiuquan', targetId: 'hong-rengan', type: '宗族与后期改革设想', summary: '洪仁玕提出《资政新篇》，试图为太平天国后期寻找近代化改革方案。', eventIds: ['taiping-rebellion'] },
  { sourceId: 'zeng-guofan', targetId: 'hong-xiuquan', type: '镇压与起义对抗', summary: '曾国藩组织湘军镇压太平天国，二人代表清廷地方军政与农民战争对抗两端。', eventIds: ['taiping-rebellion'] },
  { sourceId: 'li-hongzhang', targetId: 'ding-ruchang', type: '北洋海军上下级', summary: '丁汝昌统领北洋水师，甲午战败也牵动对李鸿章北洋体系的评价。', eventIds: ['sino-japanese-war'] },
  { sourceId: 'ding-ruchang', targetId: 'deng-shichang', type: '北洋海军同僚', summary: '丁汝昌和邓世昌同属北洋海军，威海卫战败与黄海海战共同构成甲午海战记忆。', eventIds: ['sino-japanese-war'] },
  { sourceId: 'yan-fu', targetId: 'liang-qichao', type: '晚清思想启蒙呼应', summary: '严复译介西学，梁启超推动新文体和维新舆论，二人共同影响晚清知识界。', eventIds: ['yan-fu-translation', 'hundred-days-reform'] },
  { sourceId: 'rong-hong', targetId: 'zeng-guofan', type: '洋务教育合作', summary: '容闳推动幼童留美，曾国藩等洋务重臣支持相关教育尝试。', eventIds: ['chinese-educational-mission', 'self-strengthening'] },
  { sourceId: 'rong-hong', targetId: 'li-hongzhang', type: '洋务教育与外交', summary: '容闳的留学教育设想与李鸿章等洋务派的近代化实践相互关联。', eventIds: ['chinese-educational-mission', 'self-strengthening'] },
  { sourceId: 'zhang-jian', targetId: 'zhang-zhidong', type: '实业教育与新政谱系', summary: '张謇实业救国和张之洞新政实业教育路线共同体现晚清社会经济转型。', eventIds: ['industry-saves-nation', 'late-qing-new-policy'] },
  { sourceId: 'tan-sitong', targetId: 'liang-qichao', type: '维新同道 / 思想激进', summary: '谭嗣同与梁启超同属维新派，变法失败后一死一亡命，成为晚清改革不同命运的象征。', eventIds: ['hundred-days-reform'] },
  { sourceId: 'yongzheng-emperor', targetId: 'qianlong-emperor', type: '父子 / 清中期制度承接', summary: '雍正整顿财政吏治并强化皇权，乾隆继承其制度基础进入清中期高峰。', eventIds: ['qing-institutions', 'high-qing'] },
  { sourceId: 'nurhaci', targetId: 'hong-taiji', type: '父子 / 后金到清', summary: '努尔哈赤奠定后金基础，皇太极改国号为清并完善国家制度。', eventIds: ['later-jin-rise', 'qing-founding'] },
  { sourceId: 'laozi', targetId: 'zhuangzi', type: '道家思想承续', summary: '老子和庄子共同构成先秦道家思想传统，后世常以“老庄”并称。', eventIds: ['hundred-schools'] },
  { sourceId: 'pan-geng', targetId: 'wu-ding', type: '商王传承 / 迁殷后稳定', summary: '盘庚迁殷稳定商后期政治中心，武丁中兴则体现迁殷后商王朝活跃发展。', eventIds: ['pan-geng-moves-yin', 'wu-ding-revival'] },
  { sourceId: 'emperor-xiaowen-northern-wei', targetId: 'jia-sixie', type: '北魏改革与社会知识背景', summary: '北魏孝文帝改革推动北方制度转型，贾思勰农学整理体现北朝社会生产知识积累。', eventIds: ['xiaowen-reform', 'qimin-yaoshu'] },
  { sourceId: 'zhu-wen', targetId: 'li-cunxu', type: '后梁后唐更替对手', summary: '李存勖灭后梁，结束朱温开创的后梁政权，是五代前期更替主线。', eventIds: ['five-dynasties-transition'] },
  { sourceId: 'shi-jingtang', targetId: 'song-taizu', type: '燕云遗留与宋初边防', summary: '石敬瑭割让燕云十六州造成长期边防缺口，宋太祖建立北宋后仍受此格局制约。', eventIds: ['sixteen-prefectures', 'song-unification'] },
  { sourceId: 'song-huizong', targetId: 'wanyan-aguda', type: '宋金格局前史', summary: '完颜阿骨打建立金朝迅速改变辽宋格局，宋徽宗时期联金灭辽和靖康之变均受这一变局影响。', eventIds: ['jin-founding', 'jingkang-incident'] },
  { sourceId: 'wen-tianxiang', targetId: 'kublai-khan', type: '抗元与统一对峙', summary: '文天祥代表南宋末抗元忠节，忽必烈代表元朝完成统一的政治军事力量。', eventIds: ['song-fall'] },
  { sourceId: 'yelv-abaoji', targetId: 'xiao-chuo', type: '辽朝开创与承继', summary: '耶律阿保机建立辽朝，萧太后则代表辽朝成熟期与北宋对峙的实际决策力量。', eventIds: ['liao-founding', 'chanyuan-treaty'] },
  { sourceId: 'wanyan-aguda', targetId: 'yelv-abaoji', type: '辽金更替前后', summary: '耶律阿保机开创辽朝，完颜阿骨打建立金朝并灭辽，二人构成北方民族政权更替线索。', eventIds: ['liao-founding', 'jin-founding'] },
  { sourceId: 'yuan-hao', targetId: 'song-renzong', type: '宋夏并立对峙', summary: '元昊建立西夏并与北宋长期对峙，宋仁宗朝需要处理西北边防和财政压力。', eventIds: ['xixia-founding', 'renzong-era'] },
  { sourceId: 'yelv-chucai', targetId: 'kublai-khan', type: '蒙古治理制度前史', summary: '耶律楚材主张以制度治理中原，为忽必烈建立元朝和推行行省制提供前史背景。', eventIds: ['yuan-founding'] },
  { sourceId: 'guo-shoujing', targetId: 'kublai-khan', type: '君臣 / 历法工程', summary: '郭守敬在元代主持天文历法工作，服务忽必烈时期国家制度和时间秩序建设。', eventIds: ['yuan-science'] },
  { sourceId: 'guan-hanqing', targetId: 'zhao-mengfu', type: '元代文化对照', summary: '关汉卿杂剧和赵孟頫书画分别体现元代城市戏曲与士人艺术两种文化面向。', eventIds: ['yuan-drama', 'yuan-art-literati'] },
  { sourceId: 'sui-yang-di', targetId: 'li-chun', type: '隋代工程时代背景', summary: '隋炀帝时期大工程频繁，李春所代表的桥梁技术体现隋代工程能力；二者是时代背景关联，不作直接任命关系处理。', eventIds: ['grand-canal', 'zhaozhou-bridge'] },
  { sourceId: 'wang-mang', targetId: 'liu-xuan', type: '新末政权竞争', summary: '王莽新政崩溃后，更始帝刘玄借汉室名义进入长安，代表新末反莽力量对王莽政权的替代。', eventIds: ['xin-falls-and-chimei'] },
  { sourceId: 'liu-xuan', targetId: 'fan-chong', type: '新末起义势力并立', summary: '刘玄的更始政权与樊崇领导的赤眉军都反对王莽，但在长安和关中形成新的合法性与资源竞争。', eventIds: ['xin-falls-and-chimei'] },
  { sourceId: 'liu-xiu', targetId: 'liu-xuan', type: '汉室宗亲 / 政权竞争', summary: '刘秀与刘玄都以汉室宗亲身份参与新末复汉，但最终由刘秀整合北方和地方势力建立东汉。', eventIds: ['xin-falls-and-chimei', 'guangwu-restoration'] },
  { sourceId: 'ban-chao', targetId: 'dou-gu', type: '君臣 / 西域经营前后相承', summary: '窦固的军事行动打开东汉经营西域的通道，班超在此基础上长期经营西域诸国。', eventIds: ['eastern-han-western-regions', 'dou-gu-western-regions'] },
  { sourceId: 'ban-chao', targetId: 'gan-ying', type: '使者 / 欧亚交通', summary: '班超派甘英向西出使，甘英把东汉西域经营延伸到对中亚、西亚交通路线的观察。', eventIds: ['dou-gu-western-regions'] },
  { sourceId: 'sima-yan', targetId: 'sun-hao-wu', type: '统一战争 / 末代对手', summary: '司马炎建立西晋后发动灭吴战争，孙皓投降标志三国鼎立结束。', eventIds: ['western-jin-unification'] },
  { sourceId: 'sima-yan', targetId: 'du-yu', type: '君臣 / 灭吴统帅', summary: '司马炎部署统一战争，杜预从荆州方向推进并参与孙吴灭亡。', eventIds: ['western-jin-unification'] },
  { sourceId: 'du-yu', targetId: 'wang-jun-jin', type: '灭吴战场协同', summary: '杜预与王濬分别从陆路和长江水路推进，体现西晋灭吴的多方向协同。', eventIds: ['western-jin-unification'] },
  { sourceId: 'emperor-xiaowen-northern-wei', targetId: 'feng-taihou', type: '祖孙 / 改革承继', summary: '冯太后先行推动北魏制度改革，孝文帝继续迁都洛阳和汉化政策，二人构成改革连续线索。', eventIds: ['xiaowen-reform'] },
  { sourceId: 'tang-xuanzong', targetId: 'yao-chong', type: '君臣 / 开元政治', summary: '唐玄宗任用姚崇处理即位初期政务，开元政治的行政整顿由此启动。', eventIds: ['kaiyuan-prosperity'] },
  { sourceId: 'tang-xuanzong', targetId: 'song-jing', type: '君臣 / 吏治整顿', summary: '宋璟继姚崇入相，强调清正和制度秩序，帮助开元前期形成相对稳定的官僚政治。', eventIds: ['kaiyuan-prosperity'] },
  { sourceId: 'yao-chong', targetId: 'song-jing', type: '宰辅接续 / 姚宋', summary: '姚崇和宋璟治理风格不同但前后接续，共同构成开元初期的“姚宋”政治。', eventIds: ['kaiyuan-prosperity'] },
  { sourceId: 'guo-ziyi', targetId: 'li-guangbi', type: '安史之乱 / 唐军名将', summary: '郭子仪与李光弼共同承担唐朝反击叛军的核心军事任务，二人也分别面对藩镇和朝廷信任问题。', eventIds: ['an-shi-rebellion'] },
  { sourceId: 'an-lushan', targetId: 'li-guangbi', type: '安史战场对手', summary: '李光弼在安禄山叛军造成的河东、河北战场上组织防御和反攻。', eventIds: ['an-shi-rebellion'] },
  { sourceId: 'shi-jingtang', targetId: 'yelv-deguang', type: '后晋与辽 / 燕云割让', summary: '石敬瑭向耶律德光求援建立后晋并割让燕云十六州，二人关系改变五代和宋辽边防格局。', eventIds: ['sixteen-prefectures'] },
  { sourceId: 'liu-zhiyuan', targetId: 'guo-wei', type: '后汉后周更替', summary: '郭威原为后汉将领，刘知远建立的后汉在内部冲突后被后周取代。', eventIds: ['five-dynasties-later-han-zhou'] },
  { sourceId: 'guo-wei', targetId: 'chai-rong', type: '养父子 / 后周承继', summary: '郭威建立后周，柴荣继承其政权并推进改革和统一准备。', eventIds: ['five-dynasties-later-han-zhou', 'later-zhou-reform'] },
  { sourceId: 'qian-liu', targetId: 'song-taizu', type: '吴越与北宋 / 地方治理', summary: '钱镠开创的吴越地方治理传统延续至北宋统一，北宋最终以较少战争完成两浙纳入。', eventIds: ['wuyue-local-governance', 'song-unification'] },
  { sourceId: 'wang-xun-yuan', targetId: 'guo-shoujing', type: '授时历 / 科技协作', summary: '王恂负责数学和历算等工作，郭守敬负责观测和工程，二人共同参与授时历。', eventIds: ['yuan-science'] },
  { sourceId: 'xu-heng', targetId: 'guo-shoujing', type: '元代学术与历法制度', summary: '许衡代表元初儒学和制度整合，郭守敬代表天文工程，二者共同体现元代知识体系的多元协作。', eventIds: ['yuan-science'] },
  { sourceId: 'bai-pu', targetId: 'guan-hanqing', type: '元曲作家谱系', summary: '白朴与关汉卿共同推动元杂剧题材和文人创作发展。', eventIds: ['yuan-drama'] },
  { sourceId: 'ma-zhiyuan', targetId: 'bai-pu', type: '元曲作家同代传统', summary: '马致远和白朴分别以散曲、杂剧和历史题材创作丰富元曲表达。', eventIds: ['yuan-drama'] },
  { sourceId: 'ming-taizu', targetId: 'li-shanchang', type: '君臣 / 建国行政', summary: '李善长负责明初政务、粮饷和制度建设，是朱元璋从军事集团转向中央国家的重要文臣。', eventIds: ['ming-founding'] },
  { sourceId: 'ming-taizu', targetId: 'liu-bowen', type: '君臣 / 战略谋划', summary: '刘伯温以战略和政务建议辅佐朱元璋完成统一和建国。', eventIds: ['ming-founding'] },
  { sourceId: 'ming-taizu', targetId: 'lan-yu', type: '君臣 / 北方军事', summary: '蓝玉代表明初北伐和边疆军事力量，战功扩大明朝北方安全空间。', eventIds: ['ming-founding'] },
  { sourceId: 'li-shanchang', targetId: 'liu-bowen', type: '明初文臣 / 政策分歧', summary: '李善长和刘伯温分别代表明初行政统筹与战略谋划，二人也处在皇权高度集中的政治环境中。', eventIds: ['ming-founding'] },
  { sourceId: 'ming-chengzu', targetId: 'fang-xiaoru', type: '靖难 / 正统冲突', summary: '靖难之役后朱棣要求方孝孺起草即位诏书，方孝孺拒绝并成为建文正统与永乐皇权冲突的象征。', eventIds: ['jingnan-campaign'] },
  { sourceId: 'ming-chengzu', targetId: 'xie-jin', type: '君臣 / 永乐文治', summary: '解缙在永乐初参与文书和《永乐大典》编纂，但宫廷继承与权力冲突使其结局复杂。', eventIds: ['jingnan-campaign'] },
  { sourceId: 'gu-yanwu', targetId: 'huang-zongxi', type: '清初实学 / 思想共振', summary: '顾炎武和黄宗羲都从明清鼎革反思制度与公共政治，但分别偏重经世考证和君主制批判。', eventIds: ['ming-qing-thought'] },
  { sourceId: 'gu-yanwu', targetId: 'wang-fuzhi', type: '清初实学 / 历史哲学', summary: '顾炎武与王夫之都重视历史具体性、经世实践和明亡经验，形成清初思想转向的重要对照。', eventIds: ['ming-qing-thought'] },
  { sourceId: 'huang-zongxi', targetId: 'wang-fuzhi', type: '明清之际思想家', summary: '黄宗羲和王夫之都以经史和现实政治为基础展开思想，但对公共政治、心性和历史变化的侧重点不同。', eventIds: ['ming-qing-thought'] },
  { sourceId: 'yongzheng-emperor', targetId: 'tian-wenjing', type: '君臣 / 地方赋役整顿', summary: '田文镜把雍正朝财政、赋役和官员考成政策落实到河南等地。', eventIds: ['qing-institutions'] },
  { sourceId: 'yongzheng-emperor', targetId: 'li-wei', type: '君臣 / 地方治理', summary: '李卫受雍正重用，处理盐政、漕运、治安等地方行政事务。', eventIds: ['qing-institutions'] },
  { sourceId: 'yongzheng-emperor', targetId: 'eertai', type: '君臣 / 改土归流', summary: '鄂尔泰代表雍正朝西南边疆行政整合和改土归流政策。', eventIds: ['qing-institutions'] },
  { sourceId: 'yongzheng-emperor', targetId: 'zhang-tingyu', type: '君臣 / 军机中枢', summary: '张廷玉参与雍正朝军机处和中枢文书运作，体现皇帝与文官系统的新型决策关系。', eventIds: ['qing-institutions'] },
  { sourceId: 'tian-wenjing', targetId: 'eertai', type: '雍正能吏 / 地方与边疆', summary: '田文镜和鄂尔泰分别在内地赋役、边疆行政方向执行雍正改革，体现清代中央政策的区域差异。', eventIds: ['qing-institutions'] },
  { sourceId: 'yixin', targetId: 'li-hongzhang', type: '洋务 / 中央与地方', summary: '奕䜣代表清廷中央外交和制度尝试，李鸿章代表地方军政与洋务实践，二者共同推动晚清自强政策。', eventIds: ['self-strengthening'] },
  { sourceId: 'yixin', targetId: 'shen-baozhen', type: '洋务 / 海防建设', summary: '奕䜣在中央推动洋务外交，沈葆桢在福建船政和海防建设中落实技术与教育政策。', eventIds: ['self-strengthening'] },
  { sourceId: 'shen-baozhen', targetId: 'zhan-tianyou', type: '近代技术教育 / 工程传承', summary: '沈葆桢推动船政和近代技术教育，詹天佑代表受新式教育后进入铁路工程实践的人才群体。', eventIds: ['self-strengthening', 'railway-engineering'] },
  { sourceId: 'zhan-tianyou', targetId: 'zhang-zhidong', type: '铁路工程 / 清末工业', summary: '詹天佑的铁路工程实践与张之洞推动的教育、工业和新政环境相互关联。', eventIds: ['railway-engineering', 'late-qing-new-policy'] },
  { sourceId: 'zhan-tianyou', targetId: 'rong-hong', type: '留学教育 / 技术人才', summary: '容闳推动幼童留美，詹天佑代表留学教育培养出的近代工程技术人才。', eventIds: ['chinese-educational-mission', 'railway-engineering'] },
  { sourceId: 'gao-huan', targetId: 'profile-ruler-ewei-xiaojing', type: '拥立与实际控制', summary: '高欢拥立元善见为东魏孝静帝，皇帝保留正统名义，东魏军政则主要由高欢及高氏集团掌握。', eventIds: ['heyin-and-northern-wei-split'] },
  { sourceId: 'gao-huan', targetId: 'profile-ruler-nqi-wenxuan', type: '父子 / 东魏至北齐', summary: '高欢建立东魏的军政基础，其子高洋后迫使孝静帝禅位并建立北齐。', eventIds: ['heyin-and-northern-wei-split'] },
  { sourceId: 'yuwen-tai', targetId: 'profile-ruler-wwei-wendi', type: '拥立与实际控制', summary: '宇文泰拥立元宝炬为西魏文帝，皇帝提供元魏正统，宇文泰掌握关中军政和主要制度改革。', eventIds: ['heyin-and-northern-wei-split'] },
  { sourceId: 'yuwen-tai', targetId: 'profile-ruler-nzhou-xiaomin', type: '父子 / 西魏至北周', summary: '宇文泰建立的关陇军政集团由其子宇文觉继承，西魏禅让后北周建立。', eventIds: ['heyin-and-northern-wei-split'] },
  { sourceId: 'gao-huan', targetId: 'yuwen-tai', type: '东西魏军政对手', summary: '高欢与宇文泰分别整合河北和关中军政资源，沙苑、河桥、邙山等战事构成东魏、西魏长期对峙。', eventIds: ['heyin-and-northern-wei-split'] },
  { sourceId: 'erzhu-rong', targetId: 'profile-ruler-nwei-xiaozhuang', type: '拥立、控制与反杀', summary: '尔朱荣拥立元子攸为孝庄帝并掌握军政，孝庄帝后在宫中设计诛杀尔朱荣，随即遭尔朱氏报复。', eventIds: ['heyin-and-northern-wei-split'] },
  { sourceId: 'erzhu-rong', targetId: 'gao-huan', type: '旧主与后续取代者', summary: '高欢曾进入尔朱荣军政体系，尔朱荣死后高欢整合河北力量击败尔朱氏，取得北魏中枢主导权。', eventIds: ['heyin-and-northern-wei-split'] },
  { sourceId: 'su-jun', targetId: 'profile-ruler-ejin-chengdi', type: '叛军主帅与被控幼帝', summary: '苏峻攻入建康后控制年幼的晋成帝与中枢，勤王联军平叛后皇帝才恢复朝廷秩序。', eventIds: ['sujun-rebellion'] },
  { sourceId: 'huan-wen', targetId: 'profile-ruler-ejin-haixi', type: '权臣与被废皇帝', summary: '桓温以宫闱废立理由迫使司马奕退位为海西公，展示荆州军权对东晋皇位的干预。', eventIds: ['huanwen-depositions'] },
  { sourceId: 'huan-wen', targetId: 'profile-ruler-ejin-jianwen', type: '拥立者与受制皇帝', summary: '桓温废海西公后拥立司马昱为简文帝，简文帝在位期间长期受桓温军政压力。', eventIds: ['huanwen-depositions'] },
  { sourceId: 'huan-wen', targetId: 'xie-an', type: '军事强人与中枢平衡者', summary: '桓温试图以九锡推进篡位，谢安等中枢士族以程序和拖延阻滞，在不直接军事冲突的情况下维持晋室。', eventIds: ['huanwen-depositions'] },
  { sourceId: 'hou-jing', targetId: 'profile-ruler-liang-wudi', type: '降将、叛军与被困皇帝', summary: '梁武帝接纳侯景降梁，后者起兵攻陷台城，梁武帝在围困中死亡。', eventIds: ['houjing-rebellion'] },
  { sourceId: 'hou-jing', targetId: 'profile-ruler-liang-jianwen', type: '控制、废立与杀害', summary: '侯景控制梁简文帝萧纲，后废帝并将其杀害，以频繁废立为自己称帝铺路。', eventIds: ['houjing-rebellion'] },
  { sourceId: 'hou-jing', targetId: 'profile-ruler-chen-wudi', type: '叛军主帅与平叛对手', summary: '陈霸先与王僧辩等联军攻破侯景政权，平叛军功成为陈霸先后来控制建康并建立陈朝的重要基础。', eventIds: ['houjing-rebellion'] },
  { sourceId: 'qiu-shiliang', targetId: 'li-xun', type: '甘露之变 / 宦官与反宦官策划者', summary: '李训设计伏杀掌握神策军的仇士良等宦官，仇士良识破计划后控制文宗并调禁军反击，李训最终被杀。', eventIds: ['ganlu-incident'] },
  { sourceId: 'qiu-shiliang', targetId: 'profile-ruler-tang-wenzong', type: '禁军控制与受制皇帝', summary: '仇士良名义上护卫唐文宗，实际依托神策军限制皇帝行动；甘露之变后文宗更加无法摆脱宦官控制。', eventIds: ['ganlu-incident'] },
  { sourceId: 'li-xun', targetId: 'profile-ruler-tang-wenzong', type: '君臣 / 反宦官密谋', summary: '唐文宗秘密任用李训策划诛除宦官，希望收回神策军和宫廷控制权，因缺少独立武力而失败。', eventIds: ['ganlu-incident'] },
  { sourceId: 'pang-xun', targetId: 'profile-ruler-tang-yizong', type: '戍卒起义与朝廷镇压', summary: '庞勋率桂林戍卒和地方响应者占据徐州地区，唐懿宗朝廷调集多路军队并依靠沙陀骑兵将其镇压。', eventIds: ['pangxun-rebellion'] },
  { sourceId: 'princess-taiping', targetId: 'empress-wei', type: '宫廷权力对手', summary: '韦后控制中宗死后的继承局势，太平公主与李隆基联合发动唐隆政变，清除韦氏集团。', eventIds: ['tanglong-coup'] },
  { sourceId: 'princess-taiping', targetId: 'tang-xuanzong', type: '政变盟友与皇权竞争者', summary: '太平公主与李隆基在唐隆政变中合作，睿宗复位后双方转而争夺中枢主导权，最终太平公主失败。', eventIds: ['tanglong-coup'] },
  { sourceId: 'princess-taiping', targetId: 'profile-ruler-tang-ruizong', type: '兄妹 / 睿宗朝政治影响', summary: '太平公主依靠唐睿宗的信任广泛影响人事和议政，形成与太子李隆基并立的非正式权力中心。', eventIds: ['tanglong-coup'] },
  { sourceId: 'empress-wei', targetId: 'profile-ruler-tang-zhongzong', type: '夫妻 / 中宗朝宫廷政治', summary: '韦皇后陪伴李显经历房州流放，中宗复位后高度依赖她，韦氏、安乐公主和武三思等由此进入权力核心。', eventIds: ['tanglong-coup'] },
  { sourceId: 'li-deyu', targetId: 'profile-ruler-tang-wuzong', type: '君臣 / 会昌执政', summary: '唐武宗重用李德裕统筹军政、边疆和财政，李德裕也是会昌灭佛及昭义用兵等政策的重要执行者。', eventIds: ['huichang-buddhist-suppression'] },
  { sourceId: 'li-deyu', targetId: 'profile-ruler-tang-xuanzong-late', type: '皇位更替与政治清算', summary: '唐宣宗即位后重新调整武宗朝政策和人事，李德裕失去支持并被连续贬谪。', eventIds: ['huichang-buddhist-suppression'] },
  { sourceId: 'temujin', targetId: 'ogedei', type: '父子 / 蒙古大汗继承', summary: '铁木真在诸子中选择较能协调宗王的窝阔台为继承人；窝阔台通过忽里台大会即位并继续灭金与西征。', eventIds: ['mongol-destroys-jin'] },
  { sourceId: 'temujin', targetId: 'profile-ruler-xixia-modi', type: '蒙古攻夏与末代君主', summary: '成吉思汗发动最后一次攻夏战争并在途中去世，西夏末帝李睍随后向蒙古投降，西夏灭亡。', eventIds: ['mongol-destroys-xixia'] },
  { sourceId: 'ogedei', targetId: 'profile-ruler-jin-aizong', type: '蒙古灭金与末帝抵抗', summary: '窝阔台朝蒙古军持续攻金，金哀宗迁往蔡州并在宋蒙夹击下自尽，金朝灭亡。', eventIds: ['mongol-destroys-jin'] },
  { sourceId: 'wanyan-zongbi', targetId: 'han-shizhong', type: '黄天荡战场对手', summary: '完颜宗弼率金军北撤时被韩世忠水军阻于黄天荡，双方围绕长江水道、火攻和开渠突围持续交战。', eventIds: ['huangtiandang-battle'] },
  { sourceId: 'wanyan-zongbi', targetId: 'yue-fei', type: '宋金战争对手', summary: '完颜宗弼与岳飞分别代表金军南线和南宋主战力量，郾城、颍昌等战事及后续和议使二人成为抗金叙事中的主要对手。', eventIds: ['song-jin-war'] },
  { sourceId: 'wanyan-zongbi', targetId: 'song-gaozong', type: '军事压力与宋金议和', summary: '完颜宗弼的南征给宋高宗朝廷造成持续军事压力，双方最终在战争、内政和边界需求下达成绍兴和议。', eventIds: ['song-jin-war'] },
  { sourceId: 'meng-gong', targetId: 'ogedei', type: '联蒙灭金与随后对峙', summary: '孟珙率宋军在窝阔台灭金战略中参与蔡州之战；金亡后宋蒙利益迅速冲突，孟珙转而负责抗蒙防线。', eventIds: ['mongol-destroys-jin'] },
  { sourceId: 'lyu-wenhuan', targetId: 'kublai-khan', type: '襄阳守将降元', summary: '吕文焕在襄阳投降后受到忽必烈任用，利用宋军旧识和江防经验参与元朝继续攻宋。', eventIds: ['xiangyang-fancheng-campaign', 'song-fall'] },
  { sourceId: 'lyu-wenhuan', targetId: 'profile-ruler-song-duzong', type: '守将与救援失效的朝廷', summary: '宋度宗时期朝廷未能打破元军对襄阳的长期封锁，吕文焕在樊城失守、外援断绝后投降。', eventIds: ['xiangyang-fancheng-campaign'] },
  { sourceId: 'zhang-shijie', targetId: 'lu-xiufu', type: '流亡朝廷军政协作', summary: '张世杰负责南宋流亡朝廷的军队和船队，陆秀夫负责文书、礼仪和辅政，二人共同维持端宗、末帝时期抵抗。', eventIds: ['song-fall'] },
  { sourceId: 'zhang-shijie', targetId: 'profile-ruler-song-bing', type: '末帝与军事主帅', summary: '张世杰统率崖山宋军并保护赵昺所在流亡朝廷，海战失败后南宋军事组织瓦解。', eventIds: ['song-fall'] },
  { sourceId: 'lu-xiufu', targetId: 'profile-ruler-song-bing', type: '末帝辅臣与崖山殉国', summary: '陆秀夫在流亡朝廷辅佐幼帝赵昺，崖山战败后背负赵昺投海，成为宋亡的象征性结局。', eventIds: ['song-fall'] },
  { sourceId: 'liu-bingzhong', targetId: 'kublai-khan', type: '君臣 / 元朝建制规划', summary: '刘秉忠长期为忽必烈规划汉地治理、官制、礼仪和都城，使忽必烈的王府资源逐步转化为元朝中央制度。', eventIds: ['yuan-founding'] },
  { sourceId: 'liu-bingzhong', targetId: 'guo-shoujing', type: '师友与元初工程制度', summary: '刘秉忠曾荐举和指导郭守敬，二人的规划、历法与水利工作共同体现元初吸纳专业人才的制度路径。', eventIds: ['yuan-founding', 'yuan-science'] },
  { sourceId: 'el-temur', targetId: 'profile-ruler-yuan-wenzong', type: '拥立与权臣控制', summary: '燕铁木儿控制大都并拥立图帖睦尔为元文宗，文宗复位后高度依赖其军队和政治集团。', eventIds: ['war-of-two-capitals'] },
  { sourceId: 'el-temur', targetId: 'profile-ruler-yuan-tianshun', type: '两都之战对立', summary: '上都集团拥立阿速吉八为天顺帝，燕铁木儿领导的大都军击败上都力量，天顺帝下落不明。', eventIds: ['war-of-two-capitals'] },
  { sourceId: 'tegshi', targetId: 'profile-ruler-yuan-yingzong', type: '御史大夫与遇刺皇帝', summary: '铁失身任御史大夫却组织宿卫在南坡刺杀元英宗和拜住，使英宗改革突然中断。', eventIds: ['nanpo-incident'] },
  { sourceId: 'tegshi', targetId: 'profile-ruler-yuan-taiding', type: '政变与继承清算', summary: '铁失等刺杀英宗后迎立也孙铁木儿，但泰定帝为稳定统治仍处死铁失及主要同谋。', eventIds: ['nanpo-incident'] },
  { sourceId: 'wang-zhen-ming', targetId: 'ming-yingzong', type: '近侍信任与军事灾难', summary: '王振依靠明英宗长期信任干预中枢，推动仓促亲征并影响行军，最终与英宗一同陷入土木堡危机。', eventIds: ['tumu-crisis'] },
  { sourceId: 'wang-zhen-ming', targetId: 'esen', type: '土木堡决策者与战场对手', summary: '王振干预的明军亲征被也先抓住补给和行军弱点，土木堡惨败后王振被杀、英宗被俘。', eventIds: ['tumu-crisis'] },
  { sourceId: 'esen', targetId: 'yu-qian', type: '北京攻防对手', summary: '也先俘虏英宗后进逼北京，于谦拥立代宗并组织京师防御，迫使瓦剌退兵。', eventIds: ['tumu-crisis'] },
  { sourceId: 'yang-tinghe', targetId: 'profile-ruler-ming-shizong', type: '迎立首辅与礼制冲突', summary: '杨廷和主持迎立朱厚熜，却要求其在礼法上承继孝宗；世宗坚持尊生父，双方在大礼议中决裂。', eventIds: ['great-rites-controversy'] },
  { sourceId: 'zhang-cong', targetId: 'profile-ruler-ming-shizong', type: '大礼议支持与君臣联盟', summary: '张璁以礼经论证支持世宗尊生父，得到皇帝快速提拔并成为重组嘉靖初年内阁的重要亲信。', eventIds: ['great-rites-controversy'] },
  { sourceId: 'yang-tinghe', targetId: 'zhang-cong', type: '大礼议政策对手', summary: '杨廷和坚持新君承继孝宗法统，张璁支持继统不继嗣；礼学分歧最终演变为中枢人事与皇权边界冲突。', eventIds: ['great-rites-controversy'] },
  { sourceId: 'guan-tianpei', targetId: 'daoguang-emperor', type: '海防将领与最高决策者', summary: '关天培奉道光帝和两广督抚命令整顿广东水师，朝廷和战反复及资源限制影响虎门防御。', eventIds: ['opium-war'] },
  { sourceId: 'guan-tianpei', targetId: 'lin-zexu', type: '禁烟与虎门海防协作', summary: '林则徐主持广东禁烟与外交防务，关天培负责水师、炮台和具体战备，二人共同构成虎门防线的文武协作。', eventIds: ['opium-war'] },
  { sourceId: 'li-xiucheng', targetId: 'chen-yucheng', type: '太平天国后期双核心将领', summary: '天京事变后李秀成主要经营江浙，陈玉成主要支撑安徽和长江上游，双方在三河等战役中协同重建战局。', eventIds: ['taiping-rebellion', 'tianjing-incident'] },
  { sourceId: 'li-xiucheng', targetId: 'hong-xiuquan', type: '封王主帅与天王战略分歧', summary: '洪秀全封李秀成为忠王并依赖其保卫天京，李秀成关于突围和经营苏浙的建议却不总被采纳。', eventIds: ['taiping-rebellion', 'tianjing-incident'] },
  { sourceId: 'li-xiucheng', targetId: 'zeng-guofan', type: '天京攻防对手', summary: '李秀成负责太平天国后期天京和江南战场，曾国藩统筹湘军围攻；天京失守后李秀成被俘并由曾国藩处死。', eventIds: ['taiping-rebellion'] },
  { sourceId: 'li-xiucheng', targetId: 'li-hongzhang', type: '苏州与江南战场对手', summary: '李秀成经营苏州等江南地区，李鸿章率淮军并借助常胜军进攻，双方争夺太平天国财赋核心区。', eventIds: ['taiping-rebellion'] },
  { sourceId: 'chen-yucheng', targetId: 'hong-xiuquan', type: '英王与天王', summary: '洪秀全封陈玉成为英王，倚重其守卫长江上游；中央战略和多路协同不足又限制了陈玉成救援安庆。', eventIds: ['taiping-rebellion'] },
  { sourceId: 'chen-yucheng', targetId: 'zeng-guofan', type: '安庆战场对手', summary: '陈玉成组织太平军援救安庆，曾国藩、曾国荃等湘军采取长期围城和水陆封锁，最终安庆失守。', eventIds: ['taiping-rebellion'] },
  { sourceId: 'huang-xing', targetId: 'sun-yat-sen', type: '革命同盟与政治军事分工', summary: '孙中山主要承担革命纲领、海外宣传和筹款，黄兴长期负责组织国内起义和军事行动，二人共同领导同盟会。', eventIds: ['xinhai-revolution'] },
  { sourceId: 'huang-xing', targetId: 'yuan-shikai', type: '共和谈判与反袁对立', summary: '辛亥后黄兴接受南北议和形成的权力转移，宋教仁案和袁世凯专权后又参与二次革命反袁。', eventIds: ['xinhai-revolution'] },
  { sourceId: 'sushun', targetId: 'profile-ruler-qing-xianfeng', type: '君臣 / 顾命托付', summary: '咸丰帝在内外交困中重用肃顺，并临终任命其为顾命八大臣核心辅佐幼帝。', eventIds: ['second-opium-war', 'xinyou-coup'] },
  { sourceId: 'sushun', targetId: 'cixi', type: '顾命大臣与垂帘政变对手', summary: '肃顺试图由顾命大臣控制外朝并限制后妃干政，慈禧联合慈安、奕䜣发动辛酉政变将其处死。', eventIds: ['xinyou-coup'] },
  { sourceId: 'sushun', targetId: 'empress-cian', type: '摄政权力对手', summary: '慈安拥有母后皇太后的礼法地位和御玺，肃顺等顾命大臣未能与两宫建立权力分工，最终在返京途中被捕。', eventIds: ['xinyou-coup'] },
  { sourceId: 'empress-cian', targetId: 'cixi', type: '两宫太后 / 共同垂帘', summary: '慈安与慈禧在辛酉政变后共同垂帘听政，慈安名位较高而慈禧更积极处理日常政治，两者既合作也形成一定平衡。', eventIds: ['xinyou-coup'] },
  { sourceId: 'empress-cian', targetId: 'profile-ruler-qing-tongzhi', type: '嫡母与幼帝监护', summary: '慈安以母后皇太后身份成为同治帝嫡母和共同监护人，参与幼帝时期重大皇室与政治裁决。', eventIds: ['xinyou-coup'] },
  { sourceId: 'empress-cian', targetId: 'yixin', type: '垂帘太后与议政王合作', summary: '慈安、慈禧依靠恭亲王奕䜣掌握北京外朝、外交和官僚资源，共同完成辛酉政变并建立同治初政局。', eventIds: ['xinyou-coup'] },
  { sourceId: 'sengge-rinchen', targetId: 'profile-ruler-qing-xianfeng', type: '君臣 / 京畿军事统帅', summary: '咸丰帝先后命僧格林沁镇压太平军北伐并抵御英法联军，传统军事体系的成败直接影响京师安全。', eventIds: ['taiping-rebellion', 'second-opium-war'] },
  { sourceId: 'sengge-rinchen', targetId: 'hong-xiuquan', type: '太平军北伐与清军围剿', summary: '洪秀全派出的北伐军深入直隶，僧格林沁统率清军长期围堵并最终消灭其主力。', eventIds: ['taiping-rebellion'] },
  { sourceId: 'zhang-jianzhi', targetId: 'wu-zetian', type: '武周复辟 / 宫廷政变', summary: '张柬之组织神龙政变促成武周结束，武则天退位后唐朝复辟。', eventIds: ['wu-zhou'] },
  { sourceId: 'meng-zhixiang', targetId: 'li-cunxu', type: '后唐与后蜀 / 地方军镇', summary: '孟知祥曾受后唐体系任用并掌握西川，后唐衰弱后建立后蜀，体现中央与地方军镇的张力。', eventIds: ['five-dynasties-transition'] },
  { sourceId: 'han-wen-di', targetId: 'han-jing-di', type: '父子 / 文景之治', summary: '汉景帝继承汉文帝的休养生息路线，并在七国之乱后进一步削弱诸侯势力。', eventIds: ['wenjing-rule', 'rebellion-seven-states'] },
  { sourceId: 'liu-xiu', targetId: 'ban-chao', type: '东汉中兴与西域经营', summary: '光武帝重建东汉中央秩序，为班超后来经营西域、恢复东汉边疆影响提供了国家基础。', eventIds: ['guangwu-restoration', 'eastern-han-western-regions'] },
  { sourceId: 'cao-cao', targetId: 'zhuge-liang', type: '三国战略对手', summary: '曹操与诸葛亮分属北方曹魏和蜀汉战略体系，赤壁及三国鼎立后的对抗体现不同资源结构与政治目标。', eventIds: ['red-cliffs', 'three-kingdoms-formation'] },
  { sourceId: 'tang-taizong', targetId: 'tang-gaozong', type: '父子 / 唐初皇权承继', summary: '唐太宗完成贞观时期的制度整合，唐高宗继承其皇权与官僚体系并继续扩展唐朝影响。', eventIds: ['zhenguan-rule', 'yonghui-rule'] },
  { sourceId: 'wang-anshi', targetId: 'su-shi', type: '北宋士大夫政治 / 改革争论', summary: '王安石变法改变苏轼等士大夫的仕途和论政环境，二人也代表改革执行与文学士大夫批评的不同侧重。', eventIds: ['wang-anshi-reform', 'song-culture'] },
  { sourceId: 'kangxi-emperor', targetId: 'yongzheng-emperor', type: '父子 / 清前期制度承继', summary: '康熙完成多方面统一与边疆巩固，雍正进一步把财政、吏治和皇权中枢制度化。', eventIds: ['kangxi-consolidation', 'qing-institutions'] },
  { sourceId: 'zhang-juzheng', targetId: 'ming-shenzong', type: '首辅辅政 / 改革与清算', summary: '张居正辅佐幼年明神宗推行万历初年改革，神宗亲政后又重新评价并清算张居正政治遗产。', eventIds: ['zhang-juzheng-reform'] },
  { sourceId: 'li-hongzhang', targetId: 'zhang-zhidong', type: '洋务重臣 / 地方实践对照', summary: '李鸿章与张之洞分别在北洋、直隶和湖广等地推进洋务，体现晚清地方督抚推动近代工业与教育的共同路径。', eventIds: ['self-strengthening'] },
];

const personPatches = [
  { id: 'tian-wenjing', merge: {
    resume: [
      { timeText: '1680年代-1722年', periodLabel: '康熙朝基层与地方任职', title: '县丞、知县、知州等地方官', nominalDuty: '处理州县赋税、治安、司法、仓储和民政。', authorityScope: '仅限任职州县，重大钱粮、人事和军事由督抚及中央决定。', actualInfluence: '长期从基层逐级升迁，熟悉钱粮、赋役和地方官员执行环节。', modernEquivalent: '近似基层至地市级地方行政官员。', impact: '实务履历使其成为雍正推行地方财政整顿的合适执行者。' },
      { timeText: '1722-1727年', periodLabel: '河南巡抚与赋役整顿', title: '河南巡抚', nominalDuty: '统筹全省民政、财政、司法、治安和官员考核。', authorityScope: '可指挥省级行政并监督州县，军队、跨省事务和重大税制须请示皇帝与中央。', actualInfluence: '推行清查钱粮、火耗归公、摊丁入亩等政策，以密折直接获得雍正支持。', modernEquivalent: '近似省级行政负责人兼中央监察特派职能。', impact: '提高财政执行力，也因催科严厉和越级弹劾形成酷吏争议。' },
      { timeText: '1727-1732年', periodLabel: '河南山东总督与晚年', title: '河南山东总督', nominalDuty: '协调两省财政、河务、治安、赈灾和官员体系。', authorityScope: '可统筹跨省重大行政并节制部分军务，仍受军机、户部和皇帝最终裁决。', actualInfluence: '继续执行雍正财政与吏治政策，在灾情和地方承受问题上受到批评。', modernEquivalent: '跨省区域最高行政与监督负责人。', impact: '其成效和代价成为评价雍正改革执行方式的重要案例。' },
    ],
  } },
  { id: 'li-wei', merge: {
    resume: [
      { timeText: '1717-1722年', periodLabel: '捐资入仕与财政实务', title: '兵部员外郎、户部郎中等', nominalDuty: '处理兵部或户部文书、钱粮和具体行政差遣。', authorityScope: '在所属司局办理业务，无独立地方管辖和最高政策决定权。', actualInfluence: '未走科举正途而凭办事能力受到雍正注意，积累财政和盐务知识。', modernEquivalent: '中央部门中层业务官员。', impact: '成为雍正不拘常规选拔实务官员的代表。' },
      { timeText: '1722-1727年', periodLabel: '云南盐务与地方升迁', title: '云南盐驿道、布政使、巡抚', nominalDuty: '管理盐政、财政、驿站并逐步统筹全省行政。', authorityScope: '盐驿道管专业事务，布政使主财政，巡抚统筹省政；军务和跨省政策仍归中央。', actualInfluence: '整顿盐课、钱粮和地方治安，以执行迅速获得连续升迁。', modernEquivalent: '由省级专业部门负责人升至省级行政长官。', impact: '建立其处理盐政、漕运和地方复杂事务的能吏声誉。' },
      { timeText: '1727-1732年', periodLabel: '浙江总督与海疆盐政', title: '浙江总督、兵部尚书衔', nominalDuty: '管理浙江军政、盐务、海防、治安和官员。', authorityScope: '可统筹全省文武与海疆事务，税制、对外和重大军令由皇帝与中央决定。', actualInfluence: '严查盐枭、处理海塘和地方治安，形成强势行政风格。', modernEquivalent: '省级军政综合负责人。', impact: '提升地方控制，也引发执法严厉与权力扩张争议。' },
      { timeText: '1732-1738年', periodLabel: '直隶总督与乾隆初年', title: '直隶总督', nominalDuty: '统筹京畿周边行政、河工、治安、军务和漕运。', authorityScope: '管辖首都外围重要省区，重大事务直接向皇帝奏报，不能替代中央六部与军机。', actualInfluence: '继续处理河务、捕盗和财政，乾隆初仍获任用，1738年病逝。', modernEquivalent: '首都圈省级最高行政与安全协调负责人。', impact: '显示雍正用人和强执行型地方治理延续到乾隆初。' },
    ],
  } },
  { id: 'zhang-tingyu', merge: {
    resume: [
      { timeText: '1700-1722年', periodLabel: '康熙朝翰林与中枢文书', title: '翰林检讨、侍讲学士、礼部侍郎等', nominalDuty: '编修文书、讲读经史并参与礼部和中枢行政。', authorityScope: '按部门处理文书礼仪，重大政策由康熙帝、大学士和部院决定。', actualInfluence: '凭谨慎文书能力逐步接近中枢，熟悉皇帝奏折与官僚流程。', modernEquivalent: '中央文稿、政策研究和礼仪部门高级官员。', impact: '为雍正朝高强度机要工作准备制度经验。' },
      { timeText: '1722-1735年', periodLabel: '雍正朝大学士与军机核心', title: '大学士、军机大臣', nominalDuty: '承旨拟诏、处理机密军政、协调部院并记录皇帝决策。', authorityScope: '可接触最高机密和协调执行，但军机处服务皇帝，无独立于皇权的集体决策权。', actualInfluence: '长期承担文书和政策转达，参与西北军务、吏治和制度运作，成为雍正最信任的汉臣之一。', modernEquivalent: '近似元首机要办公室和国家安全政策协调负责人。', impact: '推动军机处从临时军务机构转为常设中枢。' },
      { timeText: '1735-1750年', periodLabel: '乾隆初年辅政与《明史》', title: '保和殿大学士、军机大臣', nominalDuty: '辅佐新帝、处理军机政务并参与官方史书编纂。', authorityScope: '在皇帝授权下议政和审定文书，实际影响随乾隆亲政与满汉重臣平衡而变化。', actualInfluence: '继续位居中枢并主持《明史》等编纂，晚年与乾隆因退休礼遇和配享问题发生冲突。', modernEquivalent: '资深中央决策协调者兼国家史志工程负责人。', impact: '跨越康雍乾三朝的长期任职展示清代文官中枢的连续与依附。' },
      { timeText: '1750-1755年', periodLabel: '退休与晚年失宠', title: '致仕大学士', nominalDuty: '退出日常政务，保留荣衔和部分礼遇。', authorityScope: '不再管理军机与部院，政治地位由皇帝恩典决定。', actualInfluence: '退休程序和家族案件引起乾隆不满，身后仍获配享太庙。', modernEquivalent: '退休的最高级文官。', impact: '说明清代重臣荣誉即使有先帝遗命，也受现任皇帝个人裁量。' },
    ],
  } },
  { id: 'shen-baozhen', merge: {
    resume: [
      { timeText: '1847-1866年', periodLabel: '科举入仕与江西军政', title: '翰林、广信知府、江西巡抚等', nominalDuty: '处理地方行政、团练、财政和太平天国战时防务。', authorityScope: '从州府辖区逐步扩大到全省行政，跨省战争仍由朝廷和曾国藩等统筹。', actualInfluence: '在江西组织防务、处理战乱与地方财政，积累大型军政项目经验。', modernEquivalent: '由中央文职转任地市、省级战时行政负责人。', impact: '传统科举官员在内战中转型为能处理军事与财政的地方督抚。' },
      { timeText: '1866-1874年', periodLabel: '福建船政', title: '总理船政大臣', nominalDuty: '主持造船厂、海军教育、机器设备、外籍技术人员和经费管理。', authorityScope: '可管理福建船政工程与学校，国家海军战略、关税和跨省财政仍由朝廷、总理衙门及督抚决定。', actualInfluence: '建设福州船政局和船政学堂，推动造船、驾驶、工程和留学人才培养。', modernEquivalent: '国家造船工业基地负责人兼海军工程教育主管。', impact: '洋务从购买武器扩展到工厂、学校和技术人才体系。' },
      { timeText: '1874-1875年', periodLabel: '台湾海防与行政整顿', title: '钦差办理台湾等处海防兼理各国事务大臣', nominalDuty: '处理日本侵台危机、台湾防务、道路、行政和对外交涉。', authorityScope: '可协调台湾军政和紧急外交执行，条约与全国对日政策由总理衙门和朝廷决定。', actualInfluence: '赴台整顿海防、推动开山抚番和行政建设，强化清廷对台湾的治理投入。', modernEquivalent: '国家安全特使兼区域海防与行政总协调人。', impact: '台湾海防从临时守备转向更系统的交通、驻军和行政建设。' },
      { timeText: '1875-1879年', periodLabel: '两江总督与海防建设', title: '两江总督、南洋大臣', nominalDuty: '统筹两江军政、财政、海防、洋务和对外交涉。', authorityScope: '可协调多省资源和南洋海防，重大外交与全国财政仍由中央裁决。', actualInfluence: '继续推动船政、海防和近代技术教育，1879年任内病逝。', modernEquivalent: '跨省区域最高行政负责人兼南方海防与外交主管。', impact: '形成从地方战争、工业项目到区域海防的一体化洋务履历。' },
    ],
  } },
  { id: 'mengzi', merge: {
    resume: [
      { timeText: '约前4世纪中叶', periodLabel: '受学与讲学形成', title: '儒家学者 / 私人教师', nominalDuty: '研习儒家经典、讲授伦理政治并培养弟子。', authorityScope: '无固定国家官职和行政管辖，影响来自讲学、弟子和士人交游。', actualInfluence: '继承并发展孔子仁学，形成性善、仁政和民贵君轻等核心论述。', modernEquivalent: '哲学教师和公共政治思想者。', impact: '为游说诸侯和后世《孟子》文本形成思想基础。' },
      { timeText: '约前320-前300年', periodLabel: '游说齐梁等国', title: '客卿式政治顾问 / 游士', nominalDuty: '向诸侯提出仁政、税役、战争和君臣伦理建议。', authorityScope: '可面见君主并参与论政，无稳定行政班底和政策执行权。', actualInfluence: '游说梁惠王、齐宣王等，以尖锐问答批评霸道和不义战争。', modernEquivalent: '跨国政策顾问与公共知识分子。', impact: '其主张未被完整采纳，却通过对话留下理想政治的经典表达。' },
      { timeText: '晚年', periodLabel: '退居著述与弟子整理', title: '儒家学派领袖', nominalDuty: '讲学、整理思想并与弟子讨论历史和政治。', authorityScope: '无行政权，学术影响通过门人和文本传播。', actualInfluence: '传统认为与弟子共同整理形成《孟子》，具体成书过程可能经历后人编定。', modernEquivalent: '学术共同体导师和经典作者。', impact: '宋代以后《孟子》进入四书体系，深刻影响儒家政治伦理。' },
    ],
  } },
  { id: 'zhuangzi', merge: {
    resume: [
      { timeText: '约前4世纪', periodLabel: '蒙地生活与漆园小吏传说', title: '漆园吏 / 地方小吏（传统记载）', nominalDuty: '若漆园吏记载可信，负责具体园圃或地方事务。', authorityScope: '权限局限于基层差遣，且任职细节和年代无法充分核实。', actualInfluence: '有限官场经验可能成为其反思权力、名利和制度束缚的现实背景。', modernEquivalent: '近似基层公共事务管理员，但史实细节存疑。', impact: '不宜把寓言中的拒官故事全部当作精确履历。' },
      { timeText: '约前4世纪中后期', periodLabel: '讲学、辩论与思想写作', title: '道家思想家 / 寓言作者', nominalDuty: '通过讲论和文本讨论生命、知识、政治与自由。', authorityScope: '无行政管辖，影响来自学术交游、寓言和后世文本编定。', actualInfluence: '以逍遥、齐物、心斋等主题批评固化名分和权力欲望，《庄子》内外杂篇并非都能确定为本人所作。', modernEquivalent: '哲学家、文学作者和公共批评者。', impact: '其思想与文体共同影响中国哲学、文学和艺术表达。' },
    ],
  } },
  { id: 'xunzi', merge: {
    resume: [
      { timeText: '约前3世纪中叶', periodLabel: '齐国稷下讲学', title: '稷下学者 / 祭酒（传统记载）', nominalDuty: '讲学、参与诸子辩论并培养学生。', authorityScope: '无齐国行政管辖权，学术地位来自稷下学宫和君主礼遇；祭酒次数等细节有史料限制。', actualInfluence: '系统讨论礼、法、性恶、学习和天人关系，在百家争鸣中重建儒家理论。', modernEquivalent: '高等学术机构资深教授或学术主持人。', impact: '吸收儒、法、名辩等资源，形成更重制度和教育的儒学路线。' },
      { timeText: '约前3世纪后期', periodLabel: '游历诸国与政治论说', title: '游士 / 政治顾问', nominalDuty: '向诸侯和官员讨论治国、礼法、军事与用人。', authorityScope: '有进言和辩论机会，无持续行政执行权。', actualInfluence: '游赵、秦、楚等地，观察战国国家制度并批评迷信与空谈。', modernEquivalent: '跨地区政策研究者和政治顾问。', impact: '现实政治观察使其儒学更重礼法结合和国家组织。' },
      { timeText: '晚年', periodLabel: '兰陵任职与著述传学', title: '兰陵令 / 学派导师', nominalDuty: '若任兰陵令，负责地方行政司法；退任后讲学著述。', authorityScope: '地方官权限限于兰陵辖区，学术影响通过韩非、李斯等学生及《荀子》传播。', actualInfluence: '在楚国兰陵任职并聚徒讲学，培养影响秦汉政治思想的重要学生。', modernEquivalent: '地方行政官兼思想学派导师。', impact: '连接先秦儒家、法家和秦汉制度思想。' },
    ],
  } },
  { id: 'han-fei', merge: {
    resume: [
      { timeText: '约前3世纪中叶', periodLabel: '韩国公子与荀子门下学习', title: '韩国宗室 / 学者', nominalDuty: '接受宗室与学术教育，研究治国、法术势和诸侯竞争。', authorityScope: '宗室身份提供议政可能，但无证据显示其长期掌握韩国具体行政部门。', actualInfluence: '相传与李斯同学于荀子，结合韩国弱势处境发展法家理论。', modernEquivalent: '具有皇族背景的政治理论研究者。', impact: '把商鞅之法、申不害之术和慎到之势综合成系统君主政治学。' },
      { timeText: '约前250-前234年', periodLabel: '著述与向韩王进谏', title: '宗室论政者 / 法家著述家', nominalDuty: '通过奏疏和著述分析韩国弱点、君臣控制与变法方案。', authorityScope: '可以进言但缺少执行权，韩王未持续采纳其主张。', actualInfluence: '写成《孤愤》《五蠹》等篇，批评权臣、游侠和法令不行，著作传到秦国后受秦王政重视。', modernEquivalent: '国家安全与制度理论作者、皇室政策顾问。', impact: '理论影响超过其在韩国的实际官职。' },
      { timeText: '前233年', periodLabel: '使秦、被囚与死亡', title: '韩国使者 / 被囚政治人物', nominalDuty: '代表韩国出使秦国，讨论两国关系和政策。', authorityScope: '使者可谈判进言，无秦国行政权；被囚后完全失去行动自由。', actualInfluence: '秦王欣赏其文章，李斯、姚贾等攻击其立场，韩非下狱后服毒身亡。', modernEquivalent: '外交使节与被羁押的政治理论家。', impact: '其理论被秦统一政治吸收，个人却死于所分析的君臣猜疑与权术环境。' },
    ],
  } },
  { id: 'li-shanchang', merge: {
    resume: [
      { timeText: '1354-1367年', periodLabel: '加入朱元璋集团与建国筹备', title: '幕府文臣 / 行省参议等', nominalDuty: '处理文书、粮饷、官员安排和占领区行政，为军队扩张建立后勤秩序。', authorityScope: '可统筹朱元璋控制区部分行政和财政，军事战略与最高任命由朱元璋决定。', actualInfluence: '较早加入朱元璋，仿效萧何承担后方行政和人才组织，成为淮西文臣核心。', modernEquivalent: '近似创业政权的行政总管和后勤协调负责人。', impact: '帮助军事集团从占领城市转向可持续征税、任官和供应的政权。' },
      { timeText: '1368-1380年', periodLabel: '明初丞相与制度建设', title: '左丞相、韩国公', nominalDuty: '领导中书省、协调六部前身、人事、财政与国家文书。', authorityScope: '作为丞相拥有广泛行政协调权，但皇帝掌握最终决策、军权和监察；淮西集团关系也构成政治资源。', actualInfluence: '参与制定明初官制、律令和礼仪，组织开国行政，后因权力过重和胡惟庸案背景逐渐退居。', modernEquivalent: '近似政府首脑兼开国行政总协调者，但处于高度皇权之下。', impact: '奠定明初中书省行政框架，也成为朱元璋废丞相前权臣政治的代表。' },
      { timeText: '1380-1390年', periodLabel: '退居与胡惟庸案扩大清洗', title: '致仕韩国公', nominalDuty: '退出日常政务，保留勋爵和家族荣典。', authorityScope: '无正式中书省管理权，仍因开国功臣、姻亲和淮西网络具有社会政治影响。', actualInfluence: '胡惟庸案持续扩大后被指与胡氏交通，李善长及家族多人于1390年被处死。', modernEquivalent: '退休的开国政府首脑兼世袭勋贵。', impact: '其结局显示朱元璋以大案重组功臣集团并彻底强化皇权。' },
    ],
  } },
  { id: 'liu-bowen', merge: {
    resume: [
      { timeText: '1333-1348年', periodLabel: '元朝科举入仕与地方任职', title: '元朝县丞、行省官员等', nominalDuty: '处理地方司法、治安、赋税和监察事务。', authorityScope: '仅限具体州县和行省差遣，受地方上级、蒙古色目官员和元廷制度制约。', actualInfluence: '在地方治理与镇压乱局中积累经验，因政治冲突多次辞官。', modernEquivalent: '近似地方行政、司法和监察官员。', impact: '熟悉元末基层失序和官僚弊病，为后来辅佐朱元璋提供现实经验。' },
      { timeText: '1360-1367年', periodLabel: '辅佐朱元璋统一', title: '谋臣 / 太史令等', nominalDuty: '提供军事战略、外交判断、制度和天文历法建议。', authorityScope: '可直接向朱元璋提出方案并参与机密，军队实际指挥和最终决策属于君主与诸将。', actualInfluence: '主张先取陈友谅、再图张士诚等战略，参与建国文书、礼制和人才谋划。', modernEquivalent: '最高领导人战略顾问兼政策规划官。', impact: '帮助朱元璋在元末多方竞争中形成较清晰的统一次序。' },
      { timeText: '1368-1371年', periodLabel: '明初建制与退隐', title: '御史中丞、弘文馆学士、诚意伯', nominalDuty: '参与监察、法制、历法和国家文书，纠察官员。', authorityScope: '拥有监察和议政影响，但不统领中书省，重大人事和军政由皇帝决定。', actualInfluence: '参与明初制度整顿后请求归乡，避免长期卷入中枢权力斗争。', modernEquivalent: '中央监察负责人兼高级政策顾问。', impact: '其历史形象由实际政治履历与后世神机妙算传说共同构成。' },
      { timeText: '1371-1375年', periodLabel: '归乡与晚年争议', title: '致仕诚意伯', nominalDuty: '保留勋爵，原则上不再处理日常政务。', authorityScope: '无正式行政管辖权，仍受朝廷和胡惟庸等中枢人物关注。', actualInfluence: '晚年健康恶化，死亡是否与胡惟庸进药有关存在史料与后世叙事争议。', modernEquivalent: '退休的高级政策顾问和勋爵。', impact: '后世把刘伯温神化为预言家，应与其真实元明官僚和谋臣履历区分。' },
    ],
  } },
  { id: 'lan-yu', merge: {
    resume: [
      { timeText: '1360年代-1378年', periodLabel: '从军与北伐成长', title: '明军将领 / 常遇春部下', nominalDuty: '率部作战、执行攻城和北伐任务，管理所属军队。', authorityScope: '可指挥本部与临时配属兵力，战略和军功赏罚由朱元璋、徐达等最高统帅决定。', actualInfluence: '依靠勇猛战功和与常遇春的姻亲关系快速上升，参加灭陈友谅、张士诚和北伐。', modernEquivalent: '野战部队高级军官。', impact: '成为洪武中后期接替老一代开国将领的军事骨干。' },
      { timeText: '1378-1388年', periodLabel: '西南与漠北方面统帅', title: '征南将军、大将军', nominalDuty: '统率大军执行平定西南、北击北元和边疆安置。', authorityScope: '战役期间可调度多支军队、军粮和战区行政，长期政策与封赏由皇帝决定。', actualInfluence: '参与平定云南，1388年捕鱼儿海大捷重创北元朝廷，获封凉国公。', modernEquivalent: '大战区远征军总指挥。', impact: '削弱北元对明朝北部的集中威胁，使蓝玉军功和个人声望达到高峰。' },
      { timeText: '1388-1393年', periodLabel: '功臣权势与蓝玉案', title: '凉国公 / 最高军事勋贵', nominalDuty: '备边、议军并作为勋贵承担国家军事任务。', authorityScope: '拥有将领网络和勋爵地位，但军队调动、卫所任命及生杀最终受皇帝控制。', actualInfluence: '因恃功、用人和礼法问题与朱元璋关系恶化，1393年被指谋反处死，案件牵连大量军政人员。', modernEquivalent: '拥有强大人脉的退休或待命最高级将领。', impact: '蓝玉案清洗明初军事功臣，为皇太孙继位和皇权直接控军扫除潜在力量。' },
    ],
  } },
  { id: 'xie-jin', merge: {
    resume: [
      { timeText: '1388-1398年', periodLabel: '洪武朝翰林与直言获罪', title: '翰林庶吉士、御史等', nominalDuty: '起草文书、编修史籍并承担监察进言。', authorityScope: '可向皇帝上疏和参与文书，无独立部门或地方军政权。', actualInfluence: '以才名和直言受到注意，也因奏疏锋芒与同僚冲突被贬退归乡。', modernEquivalent: '中央文稿、政策研究与监察官员。', impact: '形成才华突出但政治边界感不足的早期仕途特征。' },
      { timeText: '1402-1407年', periodLabel: '永乐朝入直文渊阁', title: '翰林学士、内阁成员', nominalDuty: '为明成祖起草诏令、票议政务并主持大型文献编纂。', authorityScope: '可接近皇帝并影响文书、文化项目，内阁此时不是法定宰相机构，军政最终由皇帝决定。', actualInfluence: '主持《永乐大典》编纂，参与储君人选讨论，支持朱高炽为太子。', modernEquivalent: '元首高级文稿顾问、政策秘书与国家级文化工程负责人。', impact: '推动大型类书编纂，也因卷入皇子继承问题树立政治敌手。' },
      { timeText: '1407-1415年', periodLabel: '外放、下狱与死亡', title: '广西参议等外官 / 囚犯', nominalDuty: '外放后处理地方行政，入狱后不再拥有公职权限。', authorityScope: '地方任职只限辖区；被捕后完全受锦衣卫和皇帝处置。', actualInfluence: '因太子与汉王朱高煦之争被贬，后遭诬陷入狱，1415年在锦衣卫狱中被埋雪致死。', modernEquivalent: '被降任地方后遭政治迫害的前中央顾问。', impact: '其结局显示永乐内阁近臣虽接近皇帝，却缺乏独立制度保障。' },
    ],
  } },
  { id: 'zhang-jianzhi', merge: {
    resume: [
      { timeText: '约658-689年', periodLabel: '科举入仕与地方历练', title: '监察御史、州县官员等', nominalDuty: '按任职承担监察、地方行政、赋税治安和文书事务。', authorityScope: '只能在具体监察差遣或州县辖区内行使职权，重大人事和政策由朝廷决定。', actualInfluence: '通过科举和地方任职积累行政声望，但升迁并不顺利，长期处于中低层官僚体系。', modernEquivalent: '近似中央监察人员与地方行政官员的交替履历。', impact: '基层和监察经验为其晚年进入中枢、判断宫廷风险提供行政基础。' },
      { timeText: '689-704年', periodLabel: '武周中后期进入中枢', title: '秋官侍郎、同凤阁鸾台平章事', nominalDuty: '参与刑部事务和宰相集体议政，处理官员任免、法律与国家政策。', authorityScope: '作为宰相可议政并直接向武则天进言，但禁军、宫门和皇位继承仍由皇帝及宫廷集团控制。', actualInfluence: '在狄仁杰等推荐后受到重用，成为武则天晚年支持李唐继承的核心大臣之一。', modernEquivalent: '近似司法行政负责人兼政府最高决策成员，但受君主最终裁决。', impact: '进入权力核心后能够联结崔玄暐、桓彦范、敬晖等人准备政变。' },
      { timeText: '705-706年', periodLabel: '神龙政变与中宗复位', title: '宰相 / 神龙政变组织者', nominalDuty: '在武则天病重和继承危机中维护中枢秩序、恢复李唐皇统。', authorityScope: '依靠宰相身份、禁军盟友和太子李显的继承资格组织行动，成功后仍受中宗、韦后和武三思集团制约。', actualInfluence: '率人迫使武则天退位并拥立中宗复位，随后因无法压制武三思与韦后势力而被外放，最终死于贬途中。', modernEquivalent: '属于继承危机中的政府高官和政变组织者，现代法治职位无对应。', impact: '结束武周并恢复唐朝，但没有建立稳定的新权力平衡，中宗朝宫廷斗争继续。' },
    ],
  } },
  { id: 'meng-zhixiang', merge: {
    resume: [
      { timeText: '907-925年', periodLabel: '后唐军政体系任职', title: '太原尹、北京留守等军政官', nominalDuty: '管理太原等地行政、治安、军需并协助后唐军事集团。', authorityScope: '在任职辖区内统筹地方军政，仍受后唐皇帝和中央枢密系统任免调度。', actualInfluence: '依靠与李克用、李存勖集团的姻亲和军政关系进入高级官僚层，为掌握西川准备资历。', modernEquivalent: '近似重要区域行政负责人兼军事后勤主管。', impact: '五代军政履历使其熟悉中原王朝与地方军镇之间的权力运作。' },
      { timeText: '925-930年', periodLabel: '出镇西川', title: '西川节度使', nominalDuty: '管理成都及西川军队、财政、州县、治安和对外防务。', authorityScope: '名义上接受后唐任命，实际掌握西川主要军队、税赋与官员推荐，对中央命令有很大议价空间。', actualInfluence: '后唐灭前蜀后受命镇守成都，逐步整合地方军政资源并削弱中央监军与枢密干预。', modernEquivalent: '近似拥有高度自主性的区域军政长官，权限远大于现代地方行政首长。', impact: '西川从后唐新占领区转变为孟知祥个人主导的地方政权基础。' },
      { timeText: '930-934年', periodLabel: '割据西川与建立后蜀', title: '蜀王 / 后蜀皇帝', nominalDuty: '统辖西川军政、财政、人事和对中原政权关系，后以皇帝身份建立后蜀。', authorityScope: '对四川盆地核心州县和军队拥有实际最高权力，但疆域、外交和军事能力受中原五代政权及周边国家限制。', actualInfluence: '与后唐决裂并控制东川、西川，先受封蜀王，934年称帝，建国后不久去世。', modernEquivalent: '由高度自治军政长官转为区域国家最高统治者，现代无准确职位类比。', impact: '后蜀建立延续蜀地相对独立格局，体现五代与十国政权之间的互动。' },
    ],
  } },
  { id: 'qi-huan-gong', merge: {
    background: '齐襄公时期内乱使齐国继承秩序失衡，公子小白在鲍叔牙等人支持下返齐争位。即位后，他把齐国的地缘、经济和军事资源交给管仲整合，并借周王室名义主持诸侯事务。',
    childhood: '作为齐国公子，早年生活在宗室竞争和诸侯外交环境中。齐襄公失政后，他长期在莒国避祸，这段流亡经历使其熟悉诸侯之间的利益交换，也形成了强烈的复位和控局意识。',
    personality: '善于识别和使用人才，能够接受管仲这样的政治对手成为核心辅臣；但晚年对继承安排和权力安全处理失误，留下齐国内乱隐患。',
    policyInclination: '以管仲的富国强兵为内政基础，以“尊王攘夷”和诸侯会盟建立霸主秩序，强调现实利益与周礼名义的结合。',
    socialContribution: '推动齐国行政、财政、军政和外交能力整合，使强国可以在周王室衰弱后承担区域秩序协调者角色。',
    impactSummary: '齐桓公把个人霸业、管仲改革和诸侯会盟连接起来，开创春秋早期霸主政治；其晚年继承危机也说明霸权不能自动转化为稳定制度。'
  } },
  { id: 'guan-zhong', merge: {
    background: '管仲早年家境并不显赫，曾与鲍叔牙交游并共同经商，后因公子纠事件成为齐桓公的政治对手。鲍叔牙推荐他后，管仲把个人才干转化为齐国的制度改革方案。',
    childhood: '传统材料强调其早年贫困、经商和交游经历，这使他比单纯的贵族政治人物更熟悉民生、贸易和地方社会的运行。具体早年细节仍应以《管子》与先秦史料的层累记载区别理解。',
    personality: '务实、善于权衡利害，重视长期国力而不拘泥于个人恩怨；其治理思想强调制度、财政和组织能力，带有鲜明的现实主义色彩。',
    policyInclination: '以富国强兵、发展工商和整顿行政为核心，通过赋税、军政编制和人才任用提高齐国动员能力。',
    socialContribution: '将财政、商业、军政和行政管理纳入一套相互配合的霸业方案，影响后世对“管仲改革”和春秋霸政的理解。',
    impactSummary: '管仲是齐桓公称霸背后的制度设计者和执行者，其经历说明古代国家竞争不仅依赖战场，也依赖财政、行政和人才组织。'
  } },
  { id: 'jin-wen-gong', merge: {
    background: '晋文公姬重耳出身晋国公室，因晋国内乱和继承竞争长期流亡，先后在多个诸侯国寻求保护。返晋即位后，他需要同时安置流亡功臣、整合卿大夫力量并恢复晋国军政。',
    childhood: '早年成长于晋国公室权力斗争中，成年后经历长期流亡。流亡让他直接接触不同诸侯国的制度和外交，也培养了重视盟友、承诺和政治回报的处世方式。',
    personality: '能够忍耐等待、善于吸纳流亡集团人才，政治上重视信誉和礼仪；但其霸业仍建立在强大的军政组织和卿大夫联盟之上。',
    policyInclination: '先整顿晋国内政，再借会盟、援宋和城濮之战建立对中原诸侯的领导，体现以军事实力维护礼制名义的霸政路线。',
    socialContribution: '推动晋国形成较强的军政联盟和诸侯协调能力，使春秋霸主格局从齐国转入晋楚长期竞争。',
    impactSummary: '晋文公的流亡、复位与称霸构成“政治资本转化为国家能力”的典型案例，城濮之战则成为晋楚争霸的关键分水岭。'
  } },
  { id: 'chu-zhuang-wang', merge: {
    background: '楚庄王即位时，楚国已经是长江中游强国，但内部贵族政治和北方诸侯竞争同时存在。传统叙事以“三年不鸣”表现其观察局势、积蓄力量后再行动的政治节奏。',
    childhood: '楚王室教育和贵族政治塑造了他的统治基础，具体幼年材料不足。理解其早年应关注楚国南方国家结构、贵族联盟和中原礼制压力，而不是把后世典故当作完整传记。',
    personality: '沉着、善于观察并能在关键时刻果断决策，既重视楚国军事威势，也懂得借礼仪、会盟和问鼎叙事争取政治声望。',
    policyInclination: '以扩大楚国在中原的战略影响为目标，兼顾国内整合和对晋竞争，形成南方强国挑战周礼秩序的路线。',
    socialContribution: '推动楚国由区域强国进一步参与中原秩序竞争，扩大南北政治、军事和文化互动。',
    impactSummary: '楚庄王代表春秋霸主体系中不同于齐晋的南方路径，其“问鼎”形象体现周王室权威下降和诸侯国家自主性上升。'
  } },
  { id: 'kongzi', merge: {
    background: '孔子出身鲁国没落贵族家庭，生活在周礼秩序松动、卿大夫势力上升和诸侯竞争加剧的时代。他曾在鲁国任职，后周游列国，最终以讲学和整理传统知识影响后世。',
    childhood: '传统记载认为其幼年家境并不优裕，少年时期重视礼仪和学习。早年对礼制、社会秩序与个人修养的关注，后来发展为“仁”“礼”“君子”等核心论述。',
    personality: '重视学习、实践和自我修养，能够持续调整表达方式以面对不同弟子和政治环境；同时对礼崩乐坏有强烈忧患意识。',
    policyInclination: '主张以仁德、礼制、教育和名分改善政治，强调统治者先正自身、再以教化和制度维持社会秩序。',
    socialContribution: '扩大私人讲学和经典教育的影响，形成以伦理、教育和政治责任为核心的儒家传统。',
    impactSummary: '孔子的直接政治实践未完全实现，但其教育、礼学和伦理思想被后世不断制度化，成为中国传统社会的重要思想资源。'
  } },
  { id: 'laozi', merge: {
    background: '关于老子的姓名、任职和活动年代，传统文献与后世解释并不完全一致。较常见叙事把他与周王室典籍管理和《道德经》传统联系起来，但人物生平不能完全按后世传记确定。',
    childhood: '缺乏连续可靠的幼年材料，现有叙事更多围绕其成年后的王室知识背景和出关传说展开，应使用“史实存疑”标签理解。',
    personality: '后世形象强调冷静、反思权力和保持精神自主；这些特征主要来自思想文本与传说塑造，不能直接等同于已被史料证实的个人性格。',
    policyInclination: '强调顺应事物规律、减少强制和过度干预，主张以“无为”反思权力扩张与行政繁扰。',
    socialContribution: '构成道家思想的重要源头，对政治哲学、养生观、文学表达和中国传统自然观产生长期影响。',
    impactSummary: '老子更适合被视为“思想传统的核心人物”而非生平完全清晰的历史传记人物，文本影响远超其可确认的官职经历。',
    disputeTabs: [
      { title: '传统叙事', body: '传统文献把老子与周王室守藏室史、孔子问礼和出关传说联系起来，形成完整而有影响力的文化形象。' },
      { title: '史料边界', body: '老子其人、成书年代和《道德经》编纂过程存在学术讨论，条目中的年代与官职应保留“史实存疑”提示。' }
    ]
  } },
  { id: 'sun-wu', merge: {
    background: '孙武通常与春秋末年吴国军事活动和《孙子兵法》传统联系在一起。现存材料对其籍贯、任职和具体战事记载有限，人物形象主要由兵书文本和后世史家共同塑造。',
    childhood: '早年经历几乎没有连续可靠的记载，传统上认为其来自有军事传统的贵族或士人环境。这里以“史料不足”处理，不把后世传奇训练故事当作确定事实。',
    personality: '兵学文本呈现出重视冷静判断、信息控制、成本意识和因势用兵的理性形象；这更多反映思想传统，不等同于完整的心理传记。',
    policyInclination: '主张以谋略、情报、组织、训练和最小成本达成军事目标，强调战争应服务于国家整体利益。',
    socialContribution: '《孙子兵法》把战争中的形势、虚实、后勤和决策系统化，对中国军事思想及世界兵学均有持续影响。',
    impactSummary: '孙武的历史价值既在于可能参与吴国军事，也在于《孙子兵法》形成的战略思想传统；二者需要区分为人物史实与文本影响。',
    disputeTabs: [
      { title: '传统归属', body: '传统史书将《孙子兵法》归于孙武，并把他与吴王阖闾时期军事活动联系起来。' },
      { title: '文本讨论', body: '兵书的成书、增订和传承存在学术讨论，不能用单一作者传记解释全部文本内容。' }
    ]
  } },
  { id: 'goujian', merge: {
    background: '越王勾践继承越国与吴国长期竞争的局面，夫椒战败后被迫入吴为质。返越后，他在范蠡、文种等辅佐下重建国家动员能力，最终灭吴并北上争衡。',
    childhood: '作为越王室成员，早年受越国与吴国边境竞争、王室继承和军事压力影响。具体幼年事迹不详，后世重点记忆集中在战败、受辱、复国过程。',
    personality: '坚忍、克制、目标感强，能够长期承受失败并集中资源复国；同时其晚年对功臣的处理也显示出君主对权力安全的高度敏感。',
    policyInclination: '先忍辱求存、积蓄财力和人口，再以军事与外交打击吴国，体现长期国家竞争而非短期决战的策略。',
    socialContribution: '传统叙事把越国复国与水利、生产、军政动员联系起来，成为理解春秋末国家竞争和长期战略的案例。',
    impactSummary: '“卧薪尝胆”使勾践成为坚忍复国的文化符号，但具体细节含有后世加工，应把政治过程与道德寓言分开观察。',
    disputeTabs: [
      { title: '通识形象', body: '勾践常被概括为忍辱负重、励精图治并最终灭吴的复国君主。' },
      { title: '历史视角', body: '吴越战争的胜负还取决于地缘、资源、联盟和内部政治，不能只归结为个人意志或单一成语。' }
    ]
  } },
  { id: 'wei-wen-hou', merge: {
    background: '魏文侯处在三家分晋后新诸侯国家形成的阶段。魏国通过任用李悝、西门豹、吴起等人物，在行政、农业、军事和地方治理上建立新型竞争优势。',
    childhood: '宗室出身使其熟悉晋国卿大夫政治和三家分晋后的权力结构。具体幼年材料有限，成年后的用人和改革选择更能说明其政治判断。',
    personality: '重视人才、能够授权改革者，既有宗主式统筹能力，也愿意接受来自士人和基层治理者的政策建议。',
    policyInclination: '支持变法、法制、农业开发、军事训练和地方行政整顿，以制度化国家能力取代旧贵族惯例。',
    socialContribution: '推动魏国成为战国初期改革型强国，为后续各国变法和“养士”政治提供先例。',
    impactSummary: '魏文侯说明战国竞争的起点不仅是领土战争，也是君主主动整合官僚、军队、财政和地方社会的制度竞争。'
  } },
  { id: 'qin-xiao-gong', merge: {
    background: '秦孝公即位时秦国经历内乱和国力相对落后的压力，东方诸侯把秦视为边缘强国。秦孝公公开求贤，最终选择支持商鞅，以高层政治保护推动制度重建。',
    childhood: '他成长于秦国改革需求强烈、宗室和旧贵族利益交错的环境。关于其幼年细节史料不多，核心应放在即位后的危机意识和改革授权。',
    personality: '目标明确、愿意承担改革触动贵族的政治风险，对增强秦国国力有强烈责任感；其支持商鞅也显示出较强的用人和授权能力。',
    policyInclination: '以法家式行政、军功爵制、县制、户籍和重农战政策提升国家动员能力，优先解决国力与安全问题。',
    socialContribution: '为秦国从诸侯边缘转向制度型强国提供政治条件，使后续秦统一具有稳定的国家能力基础。',
    impactSummary: '秦孝公的关键作用是把改革从思想主张变成君主授权的国家工程；没有这一层政治支持，商鞅变法难以持续推进。'
  } },
  { id: 'shang-yang', merge: {
    background: '商鞅出身卫国公族旁支，早年在魏国活动，后因秦孝公求贤进入秦国。他面对的是旧贵族权利、地方治理松散和军队动员不足等结构性问题。',
    childhood: '家世使他较早接触诸侯政治和贵族秩序，具体幼年经历没有连续可靠记载。其成熟思想主要在战国各国制度竞争中形成。',
    personality: '执行坚决、重视法令一致和组织效率，愿意用严格制度推动社会改造；同时对旧贵族利益的冲击也使其政治安全高度依赖君主。',
    policyInclination: '重农战、军功授爵、县制、户籍和法令控制并行，主张用可考核的制度替代血缘贵族的政治特权。',
    socialContribution: '重塑秦国行政、军队和基层社会的组织方式，成为中国古代国家治理史上最具影响力的改革家之一。',
    impactSummary: '商鞅变法增强了秦国统一战争能力，也留下法令严苛、社会控制强化和改革者身后政治风险等复杂遗产。'
  } },
  { id: 'mengzi', merge: {
    background: '孟子生活在战国诸侯兼并和民众负担加重的环境中，继承并发展孔子传统。他游说齐、梁等诸侯，希望以仁政和王道替代单纯的武力兼并。',
    childhood: '传统上认为孟子受业于子思学派或其传人，早年教育重视经典、伦理和政治论辩。具体家世与童年故事存在后世加工，宜以思想形成脉络为主。',
    personality: '论辩直接、道德立场鲜明，敢于批评君主；同时重视现实政治条件，常把民生、土地和战争问题纳入王道讨论。',
    policyInclination: '主张仁政、民贵君轻、性善和王道政治，强调统治者减少暴政、保障民生并以德性取得合法性。',
    socialContribution: '把儒家伦理进一步发展为政治批判和民本论述，对后世政治思想、教育和士人责任意识影响深远。',
    impactSummary: '孟子为儒家提供了更强的政治批判语言，使“民本”与“仁政”成为评价君主和制度的重要传统尺度。'
  } },
  { id: 'zhuangzi', merge: {
    background: '庄子处在战国秩序剧烈变动、诸侯争战和学派竞争的时代。传统记载称其曾任漆园吏，但其最重要的影响来自《庄子》所呈现的哲学寓言和文学表达。',
    childhood: '早年材料很少，传统传记更多突出其贫困、拒绝楚国高位和不愿以仕进换取自由。具体故事需要与后世寓言化表达区分。',
    personality: '重视精神自主、善用寓言反转成见，既讽刺权力和名利，也对生命、知识和语言保持开放怀疑。',
    policyInclination: '不主张以强制制度全面塑造人，强调顺应自然、减少权力干预和保全个体精神空间。',
    socialContribution: '以哲学寓言和高度文学化的语言拓展道家思想，影响中国文学、艺术、审美和生命观。',
    impactSummary: '庄子的价值不只在于提出“逍遥”“齐物”，还在于提供了反思权力、常识和单一评价标准的表达方式。'
  } },
  { id: 'qu-yuan', merge: {
    background: '屈原出身楚国王族或贵族系统，曾参与楚国政务和外交，活动于秦国持续东进、楚国内部贵族竞争加剧的时期。失势和放逐使其政治理想与楚国危机紧密相连。',
    childhood: '贵族出身使他接受楚国礼制、政治和文学教育，具体幼年事迹没有完整材料。后世对其成长的理解主要来自《离骚》等作品和史传叙述。',
    personality: '理想主义、忠诚而刚直，重视国家名分和政治操守；面对排挤时不愿完全改变立场，因而形成强烈的悲剧性。',
    policyInclination: '倾向联齐抗秦、整顿楚政并任用贤能，希望通过政治改革和外交联合维持楚国独立。',
    socialContribution: '以楚辞创作扩大中国古典诗歌的抒情、想象和政治表达传统，端午纪念也使其成为公共文化记忆的重要人物。',
    impactSummary: '屈原的历史影响同时来自楚国政治失败、个人放逐经历和《离骚》文学成就，不能只用“忠臣”或“诗人”单一概括。'
  } },
  { id: 'bai-qi', merge: {
    background: '白起在秦昭襄王时期逐步成为秦军核心统帅，活动范围覆盖韩、魏、楚、赵等方向。其战事建立在秦国长期变法、军功爵制、兵员组织和后勤能力之上。',
    childhood: '白起的出生、早年家世和受训经历缺乏可靠连续记载，不能用后世传奇补全。现有历史形象主要通过伊阙、鄢郢、华阳和长平等战役呈现。',
    personality: '擅长集中优势、快速突破和判断敌方弱点，作战风格冷峻而重视歼灭战；其战后处置又使后世评价包含强烈战争伦理争议。',
    policyInclination: '以秦国兼并和削弱六国为军事目标，重视战场主动权、后勤切断和对敌军有生力量的摧毁。',
    socialContribution: '代表战国后期职业化军队和大规模战争组织能力，相关战役帮助解释秦国为何能持续改变六国力量对比。',
    impactSummary: '白起的军事成就不能脱离秦国制度和秦昭襄王决策理解；长平战后坑杀叙事则使其成为军事效率与战争伦理冲突的典型。'
  } },
  { id: 'lian-po', merge: {
    background: '廉颇活跃于赵国面对秦、齐、魏等多方向压力的时期，长期承担边防和前线统率任务。其最广为人知的经历是长平之战前在上党方向采取坚守。',
    childhood: '廉颇早年家世与受训细节不详，主要通过战国赵国军事体系和后期作战记录进入历史。理解他应关注老将经验、赵国战略和前线资源。',
    personality: '勇武而有经验，能够在压力下采取稳健防守；“负荆请罪”故事又突出其承认错误、维护国家整体利益的一面。',
    policyInclination: '偏向以坚壁、持久和保存主力消耗强敌，在秦赵对峙中避免被秦军诱入决战。',
    socialContribution: '成为赵国军事传统和将相协作的代表，相关故事让用户理解战国战争不仅有名将个人，也有战略和后勤约束。',
    impactSummary: '廉颇与赵括的对照呈现了长平之战中的战略分歧；他的晚年流亡也反映战国君臣关系和人才使用的复杂性。'
  } },
  { id: 'lin-xiangru', merge: {
    background: '蔺相如原本并非赵国最高贵族，因完璧归赵成功处理秦赵外交危机而进入赵国决策层。此后他参与渑池会并与廉颇形成“将相和”的政治组合。',
    childhood: '早年家世和教育经历记载很少，传统叙事把他的政治跃升归因于危机中的判断和表达能力。这里不把后世故事细节当作完整幼年传记。',
    personality: '机智沉着、善于临场判断，能够在国家尊严和个人安危之间作出高风险选择；同时懂得以退让化解内部冲突。',
    policyInclination: '以维护赵国外交安全和国家尊严为优先，主张在强秦压力下通过谈判、礼仪和内部团结争取空间。',
    socialContribution: '代表战国外交官和上卿在国家竞争中的作用，使“完璧归赵”“渑池会”“将相和”成为通识政治案例。',
    impactSummary: '蔺相如的影响在于把外交、礼制、国家尊严和军政协同联系起来，说明弱国也可能通过专业外交争取战略主动。'
  } },
  { id: 'xunzi', merge: {
    background: '荀子生活在战国后期学派竞争和国家制度化加速的阶段，曾在齐国稷下学宫活动，后到楚国兰陵。其思想兼顾儒家教化、礼制和现实制度。',
    childhood: '早年经历材料有限，传统上强调其长期游学和学术积累。理解其思想形成，应结合战国政治由贵族秩序转向官僚国家的变化。',
    personality: '重视观察和论证，批评空谈与迷信，既坚持儒家礼义，也愿意正视人的欲望、制度约束和社会训练。',
    policyInclination: '主张性恶论、后天教化、礼法并用和尊重制度秩序，强调教育、规范和行政能力共同塑造社会。',
    socialContribution: '连接先秦儒学与后来的法家、经学和教育传统，李斯、韩非等人物常被视为其思想影响链上的重要节点。',
    impactSummary: '荀子使儒家更能回应战国国家治理问题，其“礼法并重”思想为理解秦汉政治思想的交汇提供重要入口。'
  } },
  { id: 'han-fei', merge: {
    background: '韩非是韩国公子，面对韩国在秦国压力下持续衰弱的现实，把诸侯竞争转化为对君主权力、官僚控制和法令执行的系统思考。入秦后又卷入宫廷政治竞争。',
    childhood: '王族出身使他熟悉诸侯政治和继承秩序，但传统说法称其口才不佳，主要依靠著述表达。具体幼年材料有限，宜从思想与政治处境理解。',
    personality: '观察冷峻、论证尖锐，重视制度约束而不轻信个人道德；其对人性和权力关系的判断带有强烈的政治不安全感。',
    policyInclination: '强调法、术、势相结合，要求君主集中权力、官员接受考核、赏罚公开并以制度控制贵族和官僚。',
    socialContribution: '系统总结法家治理思想，留下《韩非子》等文本，为研究秦制、君主集权和古代国家治理提供重要材料。',
    impactSummary: '韩非的思想解释了秦国为何重视法令和君权，也提示高压制度可能造成权力恐惧、信息失真和个人命运受制于宫廷政治。'
  } },
  { id: 'su-qin', merge: {
    background: '苏秦活动于战国中后期多国并立、秦国持续东进的环境，传统叙事把他塑造成游说六国合纵抗秦的代表。关于其具体经历和年代，古今材料存在辨析。',
    childhood: '早年贫困、游学和反复求仕的故事主要来自传统传记，部分带有劝学和传奇色彩。可确认的历史意义在于纵横家通过游说连接多个政权。',
    personality: '表达能力强、善于根据诸侯利益调整论述，具有明显的政治动员和联盟设计色彩；后世也常以其经历说明游说者的风险。',
    policyInclination: '主张以多国联盟制衡秦国，利用共同安全压力、利益交换和外交承诺维持合纵关系。',
    socialContribution: '代表战国纵横家和跨国外交网络，帮助理解诸侯国家之间并非只有战争，也有持续的谈判、宣传和联盟重组。',
    impactSummary: '苏秦的历史形象体现弱国联合制衡强国的政治想象，但“佩六国相印”等细节需要与史料争议和后世文学化叙事区分。',
    disputeTabs: [
      { title: '合纵代表', body: '传统通识把苏秦视为说服六国合纵抗秦的主要游说者。' },
      { title: '史料辨析', body: '苏秦的年代、事迹与《战国策》《史记》之间存在复杂关系，部分细节不能当作完全确定的个人履历。' }
    ]
  } },
  { id: 'zhang-yi', merge: {
    background: '张仪活动于秦国与六国外交竞争最激烈的时期，服务秦国连横路线。其任务不是单纯传递命令，而是利用各国安全焦虑、利益分歧和对秦的恐惧拆解合纵。',
    childhood: '传统记载称其早年游学并受纵横术影响，具体家世和求学细节不完全可靠。进入秦国政治后，其外交活动才成为主要历史线索。',
    personality: '善于言辞和策略转换，敢于承担欺诈、承诺和反复谈判带来的政治风险；其形象也因此常被评价为机变而缺乏诚信。',
    policyInclination: '以连横分化诸侯、拉拢个别国家、争取秦国战略纵深为核心，服务秦国远交近攻和兼并方向。',
    socialContribution: '使战国外交成为国家战略的一部分，体现信息、承诺和联盟关系如何影响军事兼并。',
    impactSummary: '张仪与苏秦构成合纵连横的经典对照，说明战国国家竞争不仅在战场，也在对联盟、舆论和外交承诺的争夺。'
  } },
  { id: 'sun-wu', append: { relatedEventIds: ['wu-yue-hegemony'] } },
  { id: 'goujian', append: { relatedEventIds: ['wu-yue-hegemony'] } },
  { id: 'jin-wen-gong', append: { relatedEventIds: ['qin-mu-hegemony', 'chengpu-battle'] } },
  { id: 'chu-zhuang-wang', append: { relatedEventIds: ['spring-autumn-hegemony'] } },
  { id: 'wei-wen-hou', append: { relatedEventIds: ['three-families-jin', 'li-kui-reform'] } },
  { id: 'mozi', append: { relatedEventIds: ['hundred-schools'] } },
  { id: 'qin-zhao-xiang-wang', append: { relatedEventIds: ['xinling-jun-rescues-zhao'] } },
  { id: 'qin-shi-huang', append: { relatedEventIds: ['jing-ke-assassinates-qin'] } },
  { id: 'wang-jian', append: { relatedEventIds: ['qin-unification'] } },
  { id: 'wang-ben', append: { relatedEventIds: ['qin-unification'] } },
  { id: 'chen-sheng', append: { relatedEventIds: ['daze-uprising'] } },
  { id: 'wu-guang', append: { relatedEventIds: ['daze-uprising'] } },
  { id: 'zhang-han', append: { relatedEventIds: ['daze-uprising', 'julu-battle', 'fall-of-qin'] } },
  { id: 'liu-bang', append: { relatedEventIds: ['empress-lu-regency'] } },
  { id: 'han-wen-di', append: { relatedEventIds: ['empress-lu-regency'] } },
  { id: 'han-jing-di', append: { relatedEventIds: ['rebellion-seven-states'] } },
  { id: 'han-wu-di', append: { relatedEventIds: ['shiji-written'] } },
  { id: 'han-xuan-di', append: { relatedEventIds: ['huo-guang-regency'] } },
  { id: 'wang-mang', append: { relatedEventIds: ['guangwu-restoration'] } },
  { id: 'liu-xiu', append: { relatedEventIds: ['wang-mang-usurpation'] } },
  { id: 'ban-chao', append: { relatedEventIds: ['hanshu-compiled'] } },
  { id: 'ban-gu', append: { relatedEventIds: ['eastern-han-western-regions'] } },
  { id: 'zhang-heng', append: { relatedEventIds: ['papermaking-improved'] } },
  { id: 'cai-lun', append: { relatedEventIds: ['eastern-han-science'] } },
  { id: 'zhang-jue', append: { relatedEventIds: ['yellow-turban'] } },
  { id: 'cao-cao', append: { relatedEventIds: ['yellow-turban', 'eastern-han-medicine'] } },
  { id: 'liu-bei', append: { relatedEventIds: ['yellow-turban'] } },
  { id: 'guan-yu', append: { relatedEventIds: ['red-cliffs'] } },
  { id: 'hua-tuo', append: { relatedEventIds: ['shanghan-zabinglun'] } },
  { id: 'xie-an', append: { relatedEventIds: ['feishui-battle'] } },
  { id: 'fu-jian', append: { relatedEventIds: ['wang-meng-governs-qin'] } },
  { id: 'wang-xizhi', append: { relatedEventIds: ['eastern-jin-culture'] } },
  { id: 'tao-yuanming', append: { relatedEventIds: ['eastern-jin-culture'] } },
  { id: 'zu-chongzhi', append: { relatedEventIds: ['qimin-yaoshu', 'shuijingzhu'] } },
  { id: 'sui-wen-di', append: { relatedEventIds: ['sui-unification'] } },
  { id: 'sui-yang-di', append: { relatedEventIds: ['zhaozhou-bridge'] } },
  { id: 'tang-gaozu', append: { relatedEventIds: ['sui-fall'] } },
  { id: 'tang-xuanzong', append: { relatedEventIds: ['mawei-incident'] } },
  { id: 'an-lushan', append: { relatedEventIds: ['mawei-incident'] } },
  { id: 'guo-ziyi', append: { relatedEventIds: ['tang-calligraphy'] } },
  { id: 'li-bai', append: { relatedEventIds: ['tang-poetry'] } },
  { id: 'du-fu', append: { relatedEventIds: ['tang-poetry'] } },
  { id: 'han-yu', append: { relatedEventIds: ['tang-literary-reform'] } },
  { id: 'bai-juyi', append: { relatedEventIds: ['tang-poetry'] } },
  { id: 'huang-chao', append: { relatedEventIds: ['five-dynasties-begin'] } },
  { id: 'zhu-wen', append: { relatedEventIds: ['huang-chao-uprising'] } },
  { id: 'chai-rong', append: { relatedEventIds: ['chenqiao-mutiny'] } },
  { id: 'song-taizu', append: { relatedEventIds: ['cup-wine-release-soldiers'] } },
  { id: 'song-renzong', append: { relatedEventIds: ['qingli-reform', 'bao-zheng-judicial'] } },
  { id: 'su-shi', append: { relatedEventIds: ['song-literary-network'] } },
  { id: 'shen-kuo', append: { relatedEventIds: ['movable-type', 'water-powered-armillary-sphere'] } },
  { id: 'bi-sheng', append: { relatedEventIds: ['song-science'] } },
  { id: 'zhu-xi', append: { relatedEventIds: ['ehu-meeting'] } },
  { id: 'kublai-khan', append: { relatedEventIds: ['yuan-cultural-exchange'] } },
  { id: 'guo-shoujing', append: { relatedEventIds: ['water-powered-armillary-sphere'] } },
  { id: 'guan-hanqing', append: { relatedEventIds: ['ming-drama'] } },
  { id: 'wang-yangming', append: { relatedEventIds: ['prince-ning-rebellion'] } },
  { id: 'qi-jiguang', append: { relatedEventIds: ['anti-wokou'] } },
  { id: 'li-shizhen', append: { relatedEventIds: ['xu-xiake-travels'] } },
  { id: 'xu-guangqi', append: { relatedEventIds: ['late-ming-western-learning'] } },
  { id: 'hong-xiuquan', append: { relatedEventIds: ['tianjing-incident'] } },
  { id: 'zeng-guofan', append: { relatedEventIds: ['chinese-educational-mission'] } },
  { id: 'li-hongzhang', append: { relatedEventIds: ['chinese-educational-mission'] } },
  { id: 'liang-qichao', append: { relatedEventIds: ['yan-fu-translation'] } },
  { id: 'tan-sitong', append: { relatedEventIds: ['yan-fu-translation'] } },
  { id: 'wang-mang', append: { relatedEventIds: ['xin-falls-and-chimei'] } },
  { id: 'liu-xiu', append: { relatedEventIds: ['xin-falls-and-chimei'] } },
  { id: 'ban-chao', append: { relatedEventIds: ['dou-gu-western-regions'] } },
  { id: 'sima-yan', append: { relatedEventIds: ['western-jin-unification'] } },
  { id: 'emperor-xiaowen-northern-wei', append: { relatedEventIds: ['xiaowen-reform'] } },
  { id: 'tang-xuanzong', append: { relatedEventIds: ['kaiyuan-prosperity'] } },
  { id: 'guo-ziyi', append: { relatedEventIds: ['an-shi-rebellion'] } },
  { id: 'shi-jingtang', append: { relatedEventIds: ['sixteen-prefectures'] } },
  { id: 'chai-rong', append: { relatedEventIds: ['five-dynasties-later-han-zhou'] } },
  { id: 'song-taizu', append: { relatedEventIds: ['wuyue-local-governance'] } },
  { id: 'guo-shoujing', append: { relatedEventIds: ['yuan-science'] } },
  { id: 'guan-hanqing', append: { relatedEventIds: ['yuan-drama'] } },
  { id: 'qin-zhao-xiang-wang', merge: {
    background: '秦昭襄王嬴稷在位时间长，早年曾在燕国为质，回秦即位后经历宣太后、魏冉等外戚与权臣影响，随后任用范雎、白起等人推进远交近攻。',
    childhood: '质子经历使他较早接触诸侯外交和继承风险，回秦后又处于宗室、外戚和相国势力交错的宫廷环境中。',
    personality: '长期执政、善于等待战略机会，能在不同阶段调整对外路线；晚年对名将功臣的信任与控制也产生尖锐矛盾。',
    policyInclination: '以远交近攻、蚕食六国和持续军事动员为主线，通过外交分化、关中资源和名将指挥扩大秦国优势。',
    socialContribution: '将秦孝公以来的制度优势转化为连续兼并成果，使秦国从西方强国成为统一战争的决定性力量。',
    impactSummary: '秦昭襄王时期的胜利不是白起个人功劳，而是君主决策、范雎外交、秦国财政军制和多条战线共同作用的结果。'
  } },
  { id: 'qin-shi-huang', merge: {
    background: '嬴政出生于秦赵关系紧张和人质政治交织的环境，十三岁继承秦王位，成年后逐步清除吕不韦、嫪毐等政治势力，亲自掌握统一战争。',
    childhood: '少年时期在赵国生活，回秦后面对宫廷继承与权臣控制，早年不安全感和秦国强国传统共同塑造其高度集中的权力观。',
    personality: '决断快、控制欲强、重视标准和执行，能够使用王翦等稳健将领，也倾向用严密监控和高压法令消除不确定性。',
    policyInclination: '统一后以皇帝制度、郡县制、法律、文字货币度量衡标准化和交通工程建立全国性行政框架。',
    socialContribution: '结束战国分裂，建立第一个大一统帝国的制度原型，后世汉唐明清持续继承并修正其国家结构。',
    impactSummary: '秦始皇的历史遗产同时包含国家统一、制度整合和社会负担加重三个面向，不能只用暴君或千古一帝单一标签概括。'
  } },
  { id: 'qin-er-shi', merge: {
    background: '胡亥是秦始皇幼子，沙丘政变后在赵高、李斯操控下继位。秦二世时期继承了秦帝国高压行政，却没有足够的政治经验处理继承危机和地方反抗。',
    childhood: '成长于秦始皇宫廷和严格等级秩序，作为非明确继承人缺乏独立处理军政的经历，即位后高度依赖近侍和宦官系统。',
    personality: '依赖近臣、判断力不足，对宫廷信息缺乏辨别能力；后世残暴形象与赵高控制、秦制压力和秦末危机共同构成。',
    policyInclination: '继续维持高税、重徭役和严刑法，没有及时释放地方压力或调整秦始皇时期的过度动员。',
    socialContribution: '其短暂统治暴露秦帝国继承制度、权力监督和中央信息链的脆弱性。',
    impactSummary: '秦亡不能只归因于秦二世个人，沙丘政变改变继承路线、赵高专权和秦末社会矛盾共同推动了政权崩溃。'
  } },
  { id: 'zhao-gao', merge: {
    background: '赵高长期在秦宫廷担任近侍和文书相关职务，熟悉诏令、继承和信息传递流程。秦始皇死后，他利用胡亥的依赖和李斯的顾虑推动沙丘政变。',
    childhood: '出身、是否为宦官以及早年经历存在史料讨论，较稳妥的说法是其在秦宫廷文书与近侍系统中积累了接近皇权的机会。',
    personality: '善于操控信息、试探忠诚和利用恐惧，政治手段灵活而极端；“指鹿为马”体现权臣对朝廷认知链的控制。',
    policyInclination: '以个人权力安全和宫廷控制为核心，通过矫诏、排除异己和制造服从维持对秦二世的影响。',
    socialContribution: '从反面展示古代宫廷文书、近侍和继承程序被个人操纵后，如何放大国家治理风险。',
    impactSummary: '赵高加速了秦朝政治崩坏，但他的权力也依托秦帝国高度集中和继承不透明的结构，不能脱离制度背景理解。'
  } },
  { id: 'li-si', merge: {
    background: '李斯出身楚国上蔡基层吏员，师从荀子后入秦，以游说和制度才干进入秦国中枢。他参与灭六国、郡县制和标准化，也在沙丘继承危机中作出关键选择。',
    childhood: '早年观察仓鼠和厕鼠的故事带有寓言色彩，但可见其强烈的环境意识和功名追求；从小吏到丞相的经历体现战国人才流动。',
    personality: '务实、善于权衡和推动大型制度工程，重视现实权力；在赵高压力和自身利益之间摇摆，最终失去政治安全。',
    policyInclination: '坚持君主集权、郡县制、统一文字货币和法令，主张用国家标准削弱六国旧贵族与地方传统。',
    socialContribution: '把秦国统一战争转化为全国行政和文化整合方案，对中国古代中央集权国家形态影响极大。',
    impactSummary: '李斯既是秦制设计者，也是沙丘政变的参与者，其一生显示制度建设与个人政治选择可能同时产生建国和覆亡后果。'
  } },
  { id: 'meng-tian', merge: {
    background: '蒙恬出身秦国将门，秦统一后负责北方边防，率军击退匈奴、收复河南地并组织长城和交通防线。',
    childhood: '家族中蒙骜、蒙武等先后为秦将，将门教育使他熟悉军队、贵族和国家动员体系，具体幼年材料仍有限。',
    personality: '谨慎、服从大局、重视边防工程和军队纪律，传统忠臣形象也受到其在沙丘政变中被迫自杀的结局影响。',
    policyInclination: '支持统一后的北方防御、军事屯驻和长城体系建设，以工程与军队结合维持边境安全。',
    socialContribution: '推动秦帝国北方边防和交通体系成形，体现统一国家需要长期驻军、工程和后勤而非一次战役即可完成。',
    impactSummary: '蒙恬的功绩与秦朝徭役负担相互关联，长城既是防务工程，也是国家动员能力和社会成本的象征。'
  } },
  { id: 'wang-jian', merge: {
    background: '王翦是秦统一战争后期最重要的统帅之一，先后参与灭赵、伐楚等关键行动。面对楚国强大兵力，他坚持需要足够兵力和长期准备。',
    childhood: '出身秦国军事贵族或将门系统，早年经历材料不详，主要通过持续战争和对秦王政的战略判断进入历史。',
    personality: '老成谨慎、重视战争成本和政治安全，善于在君主急于求成时坚持专业判断。',
    policyInclination: '服务秦国统一战略，但强调兵力、粮道、训练和时间条件，倾向以稳健消耗替代冒险决战。',
    socialContribution: '代表战国末期职业军事统帅和国家战略规划，尤其说明灭楚等战争需要长期资源投入。',
    impactSummary: '王翦的成功来自个人能力与秦国制度、财政和动员能力的结合，不能简化为名将单独改变历史。'
  } },
  { id: 'zhang-han', merge: {
    background: '秦末起义爆发后，中央缺乏常备野战兵力，章邯以骊山刑徒和奴产子临时编军，先后镇压陈胜余部并与项羽决战。',
    childhood: '早年经历和家世材料不足，主要从秦中央军事系统和临危受命的经历了解其历史作用。',
    personality: '战场应变能力强，能够在资源不足时快速组织军队，但受到秦廷猜疑、补给和政治信任危机影响。',
    policyInclination: '最初以恢复秦朝中央秩序为目标，后在巨鹿失败和赵高干预后转向保存部众与接受楚军条件。',
    socialContribution: '反映秦末国家机器从高压动员转为临时拼凑的过程，也连接大泽乡起义、巨鹿之战和秦亡。',
    impactSummary: '章邯的失败既是军事失利，也是秦廷内部不信任和后勤崩溃的结果，不能仅按个人将才评价。'
  } },
  { id: 'chen-sheng', merge: {
    background: '陈胜是阳城戍卒，因大雨误期面临秦法严惩，与吴广在大泽乡率先起义。起义迅速扩散后，他建立张楚政权并试图争夺反秦号召中心。',
    childhood: '出身社会底层，早年生活材料不多；“燕雀安知鸿鹄之志”体现后世对其阶层跃迁愿望的概括。',
    personality: '有号召力、敢于冒险和制造政治口号，但起义规模扩大后对部下和地方力量的控制不足。',
    policyInclination: '以反秦、恢复或重建诸侯政治为初始号召，尚未形成稳定的税收、军队和地方行政方案。',
    socialContribution: '率先击破秦朝基层恐惧和服从机制，成为中国历史上大规模民众起义的教材级象征。',
    impactSummary: '陈胜起义揭示秦末社会矛盾，但张楚政权迅速失败也说明起义动员不等于国家治理能力。'
  } },
  { id: 'xiang-yu', merge: {
    background: '项羽出身楚国贵族家庭，叔父项梁起兵后成为楚军核心。巨鹿之战建立军事威望，入关后主持分封，却未能把反秦联盟转化为稳定秩序。',
    childhood: '成长于楚国灭亡记忆和项氏军政家庭，早年接受军事和贵族荣誉教育，形成重勇力、重名分的行为风格。',
    personality: '勇猛、果断、重个人威望和复仇荣誉，善于战场鼓舞士气；但猜疑、分封失衡和缺少行政耐心削弱其政治整合能力。',
    policyInclination: '倾向以分封诸侯、军事威权和楚国正统组织天下，不擅长郡县式持续行政和基层财政管理。',
    socialContribution: '巨鹿之战和楚汉战争成为秦末政权转型的关键，项羽的成败也构成军事英雄与国家治理能力的经典对照。',
    impactSummary: '项羽并非简单的“有勇无谋”，其失败来自分封秩序、联盟利益、后勤和刘邦集团组织能力的综合竞争。'
  } },
  { id: 'liu-bang', merge: {
    background: '刘邦出身沛县基层吏员，先在秦末起义中进入关中，后依靠萧何行政、张良谋略和韩信军事逐步击败项羽。',
    childhood: '家境普通，熟悉乡里、亭里和基层社会网络，早年不拘礼法的形象与其后来善于接纳不同阶层人才形成对照。',
    personality: '善于用人、能接受失败并调整策略，重实际结果；同时多疑和皇权安全意识逐渐增强，建国后清理异姓功臣。',
    policyInclination: '建国后承接秦制但减轻部分刑罚和徭役，采取休养生息、分封与郡县并行的过渡方案。',
    socialContribution: '建立西汉并把秦帝国制度调整为更能长期维持的汉初国家模式，开启两汉政治传统。',
    impactSummary: '刘邦的成功来自基层动员、人才组合和制度妥协，说明王朝建立既要取得战争胜利，也要处理秦制遗产与社会恢复。'
  } },
  { id: 'han-xin', merge: {
    background: '韩信早年贫困，曾在项羽阵营任职但未受重用，转投刘邦后由萧何推荐，先后完成定三秦、灭魏赵、降燕齐等军事行动。',
    childhood: '贫困、受辱和长期不被赏识的经历是传统叙事重点，虽有文学加工，却能说明其进入战争社会前的边缘处境。',
    personality: '军事判断大胆、善于利用地形和敌方心理，个人功业意识强；对政治封赏和自身安全的判断不如战场能力。',
    policyInclination: '军事上主张分进合击、迂回和快速建立局部优势，政治上希望以军功换取独立地位和封国。',
    socialContribution: '代表楚汉战争中的大兵团统帅和战略机动，丰富了中国古代军事史对后勤、地形和联盟的理解。',
    impactSummary: '韩信的悲剧说明军事功劳不必然带来政治安全，刘邦的皇权建构与异姓诸侯的矛盾同样决定其结局。'
  } },
  { id: 'xiao-he', merge: {
    background: '萧何原为沛县吏，刘邦起兵后负责关中留守、粮道、户籍和文书，楚汉战争中持续为前线提供兵员与物资。',
    childhood: '基层吏员经历使其熟悉秦代县级行政、户籍和赋役体系，这种技术性能力成为汉初治理的重要基础。',
    personality: '稳健、细密、耐心，重视档案、后勤和制度连续性，不以战场声望争夺政治中心。',
    policyInclination: '承接秦制行政框架但降低社会冲击，优先恢复户籍、税粮、地方秩序和中央财政。',
    socialContribution: '把秦末军事集团转化为可治理的汉初国家，说明丞相和地方行政在王朝建国中的基础作用。',
    impactSummary: '萧何的贡献不止是“月下追韩信”，更在于后方治理、文书制度和汉初行政恢复。'
  } },
  { id: 'zhang-liang', merge: {
    background: '张良出身韩国贵族，秦灭韩后长期怀有复国和反秦目标，先后参与博浪沙刺秦、鸿门宴应对和楚汉战争战略规划。',
    childhood: '亡国贵族家庭和复仇教育塑造其早年政治动机，后在乱世中逐渐从单次刺杀转向联盟、时机和制度判断。',
    personality: '冷静、审慎、能识别全局利益，善于在关键节点劝止刘邦或调整战略；晚年主动淡出权力中心。',
    policyInclination: '重视联盟、名分、时机和低成本决策，倾向以谋略减少正面冲突和政治消耗。',
    socialContribution: '代表战国遗民和楚汉谋士的政治作用，体现军事胜负背后对联盟、舆论和合法性的经营。',
    impactSummary: '张良的谋略必须放在刘邦、项羽、诸侯和秦制崩溃的共同背景中，个人智慧并不能脱离组织与资源发挥作用。'
  } },
  { id: 'zi-ying', merge: {
    background: '子婴在秦二世和赵高相继失势后被推到秦国最后的统治位置，曾设计诛杀赵高，但秦军、地方和关中民心已无法重新整合。',
    childhood: '宗室世系与早年经历存在不同说法，确定信息主要集中于秦末宫廷危机和短暂执政。',
    personality: '临危时有判断和决断，能够识别赵高威胁；但执政时间极短，缺乏重建军政秩序的条件。',
    policyInclination: '试图结束赵高近侍专权、恢复宗室和朝廷秩序，并以投降保存关中人口和宗庙。',
    socialContribution: '连接赵高覆灭、刘邦入关和秦朝灭亡，帮助理解末代统治者在结构性崩溃中的有限选择。',
    impactSummary: '子婴诛赵高并不能挽救秦朝，秦亡的核心原因已经转为中央失信、各地起义和军队体系瓦解。'
  } },
  { id: 'han-wen-di', merge: {
    background: '汉文帝刘恒是刘邦之子，吕后时期长期居代地，吕氏势力退出后在诸侯和功臣平衡中即位。其统治面对的是秦末战争、楚汉战争和汉初分封留下的财政与社会恢复问题。',
    childhood: '幼年生活在汉初宗室和诸侯王环境中，代地远离长安权力中心，形成对地方民情、边地军政和宫廷风险的实际观察。',
    personality: '谨慎节俭、重视听取臣下意见，处理政务较少追求个人威势；同时能在削弱诸侯、稳定皇权和维护民生之间保持克制。',
    policyInclination: '主张轻徭薄赋、减少刑罚和宫室开支，以休养生息恢复户口和农业，并保留秦汉行政框架而降低统治成本。',
    socialContribution: '推动汉初国家从战争动员转向经济恢复，形成文景之治的制度和财政基础。',
    impactSummary: '汉文帝说明早期帝国的稳定不只依靠扩张，也依靠节制财政、降低行政扰动和让地方社会恢复生产。',
    resume: [
      { timeText: '前196-前180年', periodLabel: '西汉代王时期', title: '代王', nominalDuty: '刘氏诸侯王，负责代地军政和地方行政。', authorityScope: '代地户籍、赋税、粮储、地方官吏、边防军队及与中央的宗室关系。', actualInfluence: '长期在代地经营，积累了地方治理和边地安全经验，并因远离吕氏核心而成为较可接受的继承人。', modernEquivalent: '职能近似中央分封体系下的区域行政与军事负责人，但不等同现代地方政府首长。', impact: '代地经历影响其即位后对财政节制、地方秩序和诸侯政治的判断。' },
      { timeText: '前180-前157年', periodLabel: '汉文帝时期', title: '皇帝', nominalDuty: '西汉最高统治者，负责全国军政、财政、人事、司法和礼制方向。', authorityScope: '中央九卿与郡国行政、官员任免、刑法调整、国家粮税、诸侯关系和对匈奴外交。', actualInfluence: '通过节制宫廷开支、听取丞相和列侯意见，实际推动国家从战后动员转为恢复型治理。', modernEquivalent: '国家元首与最高行政决策者的职能近似，古代皇权不能直接等同现代职位。', impact: '为汉景帝平定七国之乱和汉武帝扩张积累人口、财政与政治信任。' }
    ]
  } },
  { id: 'han-wu-di', merge: {
    background: '汉武帝刘彻即位时，西汉已拥有文景时期积累的财政和人口，但诸侯、匈奴压力与皇权整合仍是核心问题。他把内政集权、对外战争、思想制度和交通贸易连接成一套国家战略。',
    childhood: '幼年处在后宫、外戚和皇位继承安排交织的环境中，早期即接受帝国礼制、军事和宗室政治教育。',
    personality: '雄心强、行动果断、善于调动人才和资源，但也容易把国家目标推向高强度动员，晚年因巫蛊之祸暴露其猜疑和安全焦虑。',
    policyInclination: '强化中央集权，重用儒生与法吏，实施盐铁官营、均输平准等财政措施，并以持续战争削弱匈奴和诸侯影响。',
    socialContribution: '扩大西汉政治、军事和文化影响，推动西域交通、国家财政和儒学政治表达进入新的规模。',
    impactSummary: '汉武帝塑造了强势帝国的经典形象，但战争、财政与刑罚压力也迫使后继者在昭宣时期转向调整和修复。',
    resume: [
      { timeText: '前141-前135年', periodLabel: '汉武帝即位初期', title: '皇帝 / 太皇太后与外戚制衡下的最高统治者', nominalDuty: '西汉最高统治者，但重大人事和政策仍受宫廷长辈、外戚与列侯集团约束。', authorityScope: '诏令、官员任用、诸侯关系、礼制和军政方向，具体政策需经中枢与宫廷权力协调。', actualInfluence: '逐步摆脱窦太后等长辈政治影响，建立自己的用人和思想政策路线。', modernEquivalent: '国家最高决策者的职能近似，不对应单一现代行政职位。', impact: '为后续推恩令、独尊儒术和对匈奴战争准备政治条件。' },
      { timeText: '前134-前91年', periodLabel: '汉武帝中后期', title: '皇帝 / 帝国动员中枢', nominalDuty: '统筹全国行政、军队、财政、外交和礼制。', authorityScope: '中央官僚与郡国体系、边疆军团、国家财政、盐铁运输、人才选拔和对外战争决策。', actualInfluence: '通过卫青、霍去病、桑弘羊、张骞等人，把军政、财政和交通转化为皇权扩张能力。', modernEquivalent: '国家元首兼最高国防、财政和行政决策者的复合职能，不能直接等同现代职位。', impact: '西汉疆域、国家制度和国际交通显著扩展，但社会负担同步增加。' },
      { timeText: '前91-前87年', periodLabel: '巫蛊之祸与轮台调整前后', title: '晚年皇帝 / 继承安全决策者', nominalDuty: '维护皇位继承、宫廷安全和帝国基本秩序。', authorityScope: '宫廷监察、太子与外戚关系、军政人事、继承安排和重大政策纠偏。', actualInfluence: '巫蛊之祸中的猜疑造成太子及大量人员死亡，晚年又意识到过度扩张风险并安排霍光辅政。', modernEquivalent: '不宜直接类比；这是高度集中的君主制继承与安全权力。', impact: '晚年政策调整为昭宣中兴提供方向，也留下皇权安全逻辑过度扩张的历史教训。' }
    ]
  } },
  { id: 'sima-qian', merge: {
    background: '司马迁出身史官家庭，父亲司马谈任太史令。其经历汉武帝盛世、对外战争和宫廷政治，以太史令身份接触档案，又因李陵事件受宫刑，最终完成《史记》。',
    childhood: '幼年接受家学和经典教育，青年时期游历各地，考察山川、遗迹和地方传说；这种行走经验使他的历史书写兼具档案与社会观察。',
    personality: '求真、坚忍、重视人物处境和历史因果，既能记录帝王将相，也能为刺客、游侠、商人和失败者保留叙事位置。',
    policyInclination: '不以单一成败评价人物，强调天命、制度、个人选择和社会环境的交错，带有强烈的历史批判和人文关怀。',
    socialContribution: '创立纪传体通史的成熟范式，保存先秦至汉代大量政治、军事、思想和社会记忆。',
    impactSummary: '司马迁把史官档案、实地调查和个人生命创伤转化为《史记》，影响中国史学、文学和人物评价方式两千年。',
    resume: [
      { timeText: '约前126-前110年', periodLabel: '西汉前中期', title: '游历学者 / 史官预备者', nominalDuty: '尚无固定中央官职，以家学、游历和考察积累史学材料。', authorityScope: '可接触地方遗迹、传说和社会见闻，但没有行政或军事指挥权。', actualInfluence: '通过实地调查和家族史官传统形成对中国历史整体叙述的准备。', modernEquivalent: '职能近似历史研究者、田野调查者和档案学者。', impact: '为《史记》的地理、人物和制度材料建立基础。' },
      { timeText: '约前110-前99年', periodLabel: '汉武帝时期', title: '太史令', nominalDuty: '掌管天文历法、国家档案、祭祀记录和重要历史文书。', authorityScope: '服务于皇帝和中央礼制，参与历法、天象、祭祀及史料编纂，但不直接统领地方行政。', actualInfluence: '能够接触宫廷档案和国家记载，承担承继父志、编撰通史的核心条件。', modernEquivalent: '职能近似国家档案机构负责人兼历史编纂机构负责人，不等同现代行政级别。', impact: '掌握的文献与宫廷记录成为《史记》制度和人物叙事的重要来源。' },
      { timeText: '前99年以后', periodLabel: '《史记》撰述时期', title: '受刑史官 / 通史作者', nominalDuty: '不再以正常官职施展权力，主要承担史书撰述和家学传承。', authorityScope: '无行政管辖权，但通过史书选择、编排和评价影响后世历史记忆。', actualInfluence: '将个人遭遇、实地材料和官方档案整理为从黄帝至汉武帝的通史。', modernEquivalent: '职能近似独立历史学者与国家级历史工程主编。', impact: '《史记》成为后世纪传体正史和人物传记写作的根本范式。' }
    ]
  } },
  { id: 'liu-xiu', merge: {
    background: '刘秀是汉景帝后裔，王莽改制和赤眉、绿林起义造成秩序崩溃后，他在河北依靠宗室名义、地方豪强与军政人才逐步扩大力量，最终重建东汉。',
    childhood: '早年并非最受重视的宗室继承人，曾从事农业并接触地方社会。相对基层的经历使其在战争中更能利用地方豪强、郡县官吏和民众资源。',
    personality: '谨慎克制、善于等待和整合，重视军纪与政治安抚；能够在军事胜利后保留地方势力，减少重新统一的治理成本。',
    policyInclination: '以恢复汉室名义凝聚合法性，战后采取休养生息、抑制功臣和加强尚书台的路线，形成较稳健的中兴政治。',
    socialContribution: '结束新末大规模战争，恢复东汉中央秩序和郡县行政，为后来的东汉文化、科技与西域经营提供稳定环境。',
    impactSummary: '光武中兴展示了由地方军事集团重建帝国的路径：既依靠战争，也依靠合法性、赦免和低成本治理。',
    resume: [
      { timeText: '23-25年', periodLabel: '新末河北起兵', title: '宗室军事领袖', nominalDuty: '以汉室宗亲身份组织地方军队，争取郡县、豪强和民众支持。', authorityScope: '控制所部军队、粮道、地方盟友和临时任命，尚未拥有全国行政权限。', actualInfluence: '在昆阳战后声望上升，通过河北经营把局部军事实力转为政治合法性。', modernEquivalent: '职能近似地方军事政治联盟的最高指挥者，不对应现代地方官职。', impact: '形成重建汉室的核心集团和北方根据地。' },
      { timeText: '25-36年', periodLabel: '东汉统一战争', title: '皇帝 / 统一战争最高统帅', nominalDuty: '统筹新朝廷的军政、外交、财政和地方归附。', authorityScope: '任命将领和地方长官、调度军队与粮道、处理割据政权归降和战争后的安置。', actualInfluence: '以冯异、吴汉、邓禹等将领分区作战，同时通过招抚和封赏降低统一成本。', modernEquivalent: '国家元首兼最高军事决策者的职能近似，古代军政权高度合一。', impact: '完成对关东、陇右、巴蜀等地的整合，东汉疆域和官僚秩序重新建立。' },
      { timeText: '36-57年', periodLabel: '光武中兴', title: '东汉皇帝', nominalDuty: '负责全国行政、军政、财政、司法、礼制和边疆政策。', authorityScope: '通过三公、尚书台和郡国体系管理官员任免、赋税、刑法、军队和对外关系。', actualInfluence: '裁抑功臣外戚、减少宫室开支、恢复生产并重建中央与地方的稳定关系。', modernEquivalent: '国家元首与最高行政决策者的职能近似。', impact: '为东汉长期统治和章帝、和帝时期的文化与边疆发展奠定基础。' }
    ]
  } },
  { id: 'cao-cao', merge: {
    background: '曹操成长于东汉外戚与宦官交错的政治环境，黄巾起义后以军事实力进入中央和地方竞争。挟天子迁许后，他把汉廷名义、屯田财政和北方军事整合起来。',
    childhood: '出身宦官养子家族，既接触权力中心也承受士人社会的身份评价。少年时期的机敏和对政治风险的感知，后来转化为善于用人和控制信息的能力。',
    personality: '果断、现实、重视效率和组织能力，能容纳不同背景人才；同时猜忌、严厉，政治判断常以军政安全和权力集中为优先。',
    policyInclination: '以恢复秩序和控制军政资源为核心，实行屯田、抑制地方割据、重建中央名义，并以法令和军纪提高动员效率。',
    socialContribution: '统一北方、恢复农业和行政秩序，推动建安文学繁荣，为曹魏国家形成提供政治军事基础。',
    impactSummary: '曹操既是东汉秩序的挽救者也是汉室权力的架空者，其经历适合放在军阀竞争、国家重建和合法性转换中理解。',
    resume: [
      { timeText: '184-196年', periodLabel: '东汉末地方军政竞争', title: '军队领袖 / 兖州牧', nominalDuty: '以地方官和军事集团身份平定黄巾、争夺兖州并建立根据地。', authorityScope: '所部军队、屯粮、地方郡县任命和战时征发，权限取决于实际控制区域。', actualInfluence: '从讨伐黄巾和兖州冲突中建立独立军政体系，逐渐超出普通州牧权限。', modernEquivalent: '职能近似战区最高指挥与地方行政负责人合一，不对应现代单一职位。', impact: '形成曹魏政权的北方军政核心和后勤基础。' },
      { timeText: '196-208年', periodLabel: '许都汉廷时期', title: '司空 / 丞相', nominalDuty: '名义上负责中央行政、监察、工程和百官统筹，后以丞相主持朝廷政务。', authorityScope: '控制汉廷诏令、官员任免、军事调度、屯田财政和对地方军阀的战争安排。', actualInfluence: '通过奉天子令不臣、许都中枢和屯田制度成为东汉末实际最高决策者。', modernEquivalent: '名义官职可类比中央政府首长的一部分职能，实际权力接近最高军政决策者。', impact: '把分散军队转为有财政和文书支持的中央化政权。' },
      { timeText: '208-220年', periodLabel: '曹操晚年', title: '魏王', nominalDuty: '在汉廷名义下拥有王国军政与封地权力。', authorityScope: '统辖北方大部军队、财政、官僚和外交，掌握禅代前的实际国家资源。', actualInfluence: '赤壁受挫后继续巩固北方，保留汉帝名义但将继承和制度资源交给曹丕集团。', modernEquivalent: '不宜直接类比，属于君主制王国与帝国中枢之间的过渡权力。', impact: '为曹丕代汉和曹魏建立准备了完整的军政、财政和政治合法性资源。' }
    ]
  } },
  { id: 'zhuge-liang', merge: {
    background: '诸葛亮在东汉末避乱荆州，以刘备三顾和隆中对进入蜀汉政治核心。刘备去世后，他接受托孤，承担内政、军队、外交和继承秩序的综合责任。',
    childhood: '早年经历记载有限，家族避乱和荆州士人环境使其熟悉地方豪强、学术交游与天下形势。隐居形象既有现实基础，也受到后世文学强化。',
    personality: '谨慎、勤勉、重视制度和责任，强调法度与组织纪律；用兵偏稳健，政治上倾向亲自掌控关键流程。',
    policyInclination: '以恢复汉室为长期目标，内政上整顿吏治、发展农业和军粮，外交上联吴抗魏，军事上采取分阶段北伐。',
    socialContribution: '稳定蜀汉政权、整合益州行政和军队，留下治蜀、出师表和丞相政治的经典形象。',
    impactSummary: '诸葛亮的历史价值不只在北伐成败，也在于把一个资源有限的地方政权维持为有制度、有财政和有文化认同的国家。',
    resume: [
      { timeText: '207-221年', periodLabel: '刘备集团与蜀汉建立', title: '军师中郎将 / 军政谋士', nominalDuty: '为刘备提供战略规划、联盟建议和军事政务支持。', authorityScope: '主要负责战略判断、外交联吴、军队筹划和部分政务，不独立统辖全国行政。', actualInfluence: '从隆中对到入蜀、汉中争夺，逐渐成为刘备集团最重要的战略与政务人物。', modernEquivalent: '职能近似国家战略顾问、中央办公和军政协调负责人。', impact: '帮助刘备把地方军事集团转化为拥有根据地和合法性叙事的蜀汉政权。' },
      { timeText: '221-223年', periodLabel: '蜀汉刘备时期', title: '丞相', nominalDuty: '统筹蜀汉中央行政、财政、军政和百官事务。', authorityScope: '成都中央官僚、益州郡县、军粮征发、外交联吴和战时后勤。', actualInfluence: '在刘备东征和夷陵失败后负责稳定后方，并参与刘禅继承秩序安排。', modernEquivalent: '职能近似政府首脑兼中央军政协调者，但古代丞相权力受皇帝和军政环境限制。', impact: '完成蜀汉战后秩序修复，为后续北伐建立财政和军队基础。' },
      { timeText: '223-234年', periodLabel: '蜀汉后主时期', title: '丞相 / 托孤重臣', nominalDuty: '受遗诏辅政，负责皇帝成长阶段的全国政务和军队。', authorityScope: '中央人事、财政、地方行政、南中平定、对吴外交和北伐军队调度。', actualInfluence: '实际承担国家最高行政与军事决策，但通过制度、奏议和对后主的教育维持名义秩序。', modernEquivalent: '职能近似摄政政府首脑兼国防统帅，不等同现代单一职位。', impact: '稳定蜀汉并塑造“鞠躬尽瘁”的政治伦理形象，北伐则体现资源有限条件下的战略选择。' }
    ]
  } },
  { id: 'tang-taizong', merge: {
    background: '李世民出身关陇军事贵族集团，隋末天下动荡时参与李渊起兵和唐朝建立。玄武门之变后即位，他需要把军事功臣集团转为稳定的皇帝官僚国家。',
    childhood: '成长于隋唐交替的军政家庭，较早接触骑射、兵法、贵族联盟和地方动员。乱世经验使其重视人才、情报、后勤和政治整合。',
    personality: '善于纳谏、重视实际效果和人才使用，兼具军事果断与政治自省；但玄武门之变说明其在继承竞争中同样采取高风险权力手段。',
    policyInclination: '以制度整合、纳谏、轻徭薄赋和对外军事防御为主，吸收前代经验并维护皇帝对军政体系的最终控制。',
    socialContribution: '形成贞观之治的政治样板，推动唐初律令、科举、府兵、外交和多民族帝国秩序发展。',
    impactSummary: '唐太宗把征服集团转化为治理集团，贞观形象既来自制度与纳谏，也不能脱离玄武门继承和军事扩张背景。',
    resume: [
      { timeText: '617-626年', periodLabel: '唐初统一战争', title: '秦王 / 最高军事统帅之一', nominalDuty: '统率唐军主要战区，参与灭隋和统一关中、河南、河北等地。', authorityScope: '所部军队、战区将领、粮道、战时俘降与地方安置，权限在皇帝和军府体系内逐步扩大。', actualInfluence: '凭借战功、府兵和将领网络成为唐初最有影响力的军事政治集团。', modernEquivalent: '职能近似国家级战区总司令兼军事政治集团领袖。', impact: '军事威望和政治集团为玄武门之变及其即位奠定基础。' },
      { timeText: '626-649年', periodLabel: '贞观时期', title: '皇帝', nominalDuty: '唐朝最高统治者，负责全国军政、财政、人事、法律、外交和礼制。', authorityScope: '三省六部、府兵与边疆军镇、州县行政、官员任免、律令修订和对外战争。', actualInfluence: '通过房玄龄、杜如晦、魏征等人形成相对活跃的决策咨询，同时牢牢控制皇权和军事方向。', modernEquivalent: '国家元首与最高行政、国防决策者的职能近似。', impact: '建立唐初长期运转的政治制度和对外秩序，成为后世君主学习的治理范本。' }
    ]
  } },
  { id: 'wu-zetian', merge: {
    background: '武则天从唐太宗后宫进入唐高宗政治核心，在高宗疾病和政务处理中逐步形成与皇帝共同决策的局面，后以太后身份临朝并建立武周。',
    childhood: '出身并州武氏家庭，早年接受宫廷教育并经历后宫等级秩序。入宫、出家、再入宫的经历塑造了她对制度、信息和继承安全的敏感。',
    personality: '政治意志强、善于控制人事和信息、敢于突破礼制边界；同时使用严密监察和刑狱，统治评价存在明显的功业与高压两面。',
    policyInclination: '扩大皇帝直接控制，重用科举出身和非关陇集团人才，利用监察、告密与官僚轮换削弱旧贵族，同时延续唐代国家框架。',
    socialContribution: '延续并调整科举、官僚和农业政策，扩大女性进入最高政治权力的历史想象，推动唐代政治集团重组。',
    impactSummary: '武则天既是唐代皇权集中和官僚流动的重要推动者，也是以高压监察维持权力的代表人物，不能只用“女皇”单一标签概括。',
    resume: [
      { timeText: '649-683年', periodLabel: '唐高宗时期', title: '皇后 / 共同决策者', nominalDuty: '名义上负责后宫与皇室事务，后参与皇帝对军政国事的决策。', authorityScope: '通过内廷、外朝人事、诏令草拟和皇位继承影响中央政治，实际权限随高宗健康状况扩大。', actualInfluence: '与高宗并称“二圣”，成为官员任免、继承和政策方向的核心参与者。', modernEquivalent: '不宜直接类比，属于君主制中的皇后与最高决策共同体成员。', impact: '为其临朝称制和后续改朝建立人事、文书与政治合法性基础。' },
      { timeText: '683-690年', periodLabel: '武周建立前', title: '皇太后 / 临朝称制者', nominalDuty: '以太后身份代理年幼或受控制皇帝处理朝政。', authorityScope: '中央官员任免、军政调动、司法监察、财政和继承安排，实际控制朝廷中枢。', actualInfluence: '通过狄仁杰等不同类型官员和酷吏系统平衡反对力量，逐步将唐室继承转为个人皇权。', modernEquivalent: '职能近似摄政者与最高行政决策者，但权力基础来自宫廷和君主制继承。', impact: '完成从后宫政治到公开皇权的制度转换。' },
      { timeText: '690-705年', periodLabel: '武周时期', title: '皇帝', nominalDuty: '武周最高统治者，负责全国行政、军政、财政、人事和礼制。', authorityScope: '通过尚书省、御史台、内廷和地方州县管理官员、军队、赋税、科举及继承。', actualInfluence: '重组关陇贵族与新进官僚关系，扩大科举和监察作用，同时以酷吏和告密维护安全。', modernEquivalent: '国家元首与最高行政决策者的职能近似。', impact: '武周最终复唐，但其用人、科举和皇权技术被中宗、睿宗及后续唐朝继续吸收。' }
    ]
  } },
  { id: 'wang-anshi', merge: {
    background: '王安石出身士大夫家庭，长期任地方官，亲见北宋财政、军备、贫富和行政问题。宋神宗即位后，他以变法解决积贫积弱，推动熙宁新法。',
    childhood: '接受经学和科举教育，家庭与地方任官经历使其重视县级行政、农民负担和国家财政，而非只从宫廷视角讨论改革。',
    personality: '意志坚定、重视原则和执行，能长期承受政治攻击；也因改革节奏快、对执行层级控制不足而显得固执和理想化。',
    policyInclination: '主张国家主动干预财政、信贷、农业和军政，通过青苗、免役、市易、保甲等政策提升国家组织能力。',
    socialContribution: '推动北宋财政、役法、军政和教育制度改革，留下国家能力与社会负担如何平衡的经典案例。',
    impactSummary: '王安石变法不是简单的“好政策或坏政策”，关键在于国家目标、地方执行、财政汲取和士大夫政治之间的张力。',
    resume: [
      { timeText: '约1040-1068年', periodLabel: '北宋地方任官时期', title: '知县、知州等地方官', nominalDuty: '负责州县行政、赋税、司法、治安、水利和基层动员。', authorityScope: '管辖所属州县户籍、仓储、差役、诉讼、公共工程和地方官吏。', actualInfluence: '通过基层治理观察财政、役法和民生问题，形成系统改革方案。', modernEquivalent: '职能近似地方政府主要负责人兼基层行政、财政和司法协调者。', impact: '地方经验成为熙宁新法的现实依据。' },
      { timeText: '1069-1076年', periodLabel: '熙宁变法', title: '参知政事 / 宰相', nominalDuty: '参与并主持中央政务，向皇帝提出全国财政、军政和行政改革。', authorityScope: '中央财政、役法、农业信贷、市场管理、军队编制、学校和地方执行体系。', actualInfluence: '与宋神宗形成改革联盟，推动新法在全国州县施行，但也受到吕惠卿等新党内部和司马光等旧党的争论。', modernEquivalent: '职能近似政府首脑或国务院重要改革负责人，实际权限取决于皇帝支持。', impact: '改变北宋国家与社会的财政关系，也造成党争、执行变形和政治对立。' },
      { timeText: '1076年以后', periodLabel: '退居金陵', title: '退居宰相 / 政策思想家', nominalDuty: '离开中央行政后不再直接管理国家事务，主要从事著述与学术思考。', authorityScope: '无直接行政管辖权，但通过文章、经学解释和改革遗产影响后世政策讨论。', actualInfluence: '继续维护变法理念，并在后世新旧党争中成为长期评价对象。', modernEquivalent: '职能近似卸任政治家与公共政策思想家。', impact: '其制度实验被后世反复讨论，影响财政国家和改革政治的历史理解。' }
    ]
  } },
  { id: 'yue-fei', merge: {
    background: '岳飞成长于北宋末、金兵南侵和靖康之变的社会动荡中，入伍后以纪律、训练和战斗力在南宋抗金军队中崛起，最终因宋高宗与秦桧的和战及权力判断被杀。',
    childhood: '出身北方普通家庭，早年经历与乡里社会、灾乱和军事传统有关。精忠报国、尽忠等形象有后世塑造，但其抗金经历具有明确历史基础。',
    personality: '重视军纪、训练和部属约束，作战积极，政治上强调恢复失地和维护宋室；也缺乏在朝廷和军队政治中保护自身的空间。',
    policyInclination: '主张整顿军队、积极抗金、恢复中原，同时依靠纪律和军民关系维持战区秩序。',
    socialContribution: '提升南宋抗金军队的组织形象，成为后世忠诚、军事纪律和民族国家记忆的重要符号。',
    impactSummary: '岳飞的历史评价应区分军事功绩、南宋和战决策、秦桧责任以及后世忠烈叙事，避免把复杂战争压缩成单一忠奸故事。',
    resume: [
      { timeText: '1122-1134年', periodLabel: '北宋末至南宋初', title: '基层军官 / 抗金将领', nominalDuty: '统率地方军队和禁军编制中的部队，承担防御、收复和治安任务。', authorityScope: '所部兵员训练、战时调度、军粮纪律和占领地区的临时秩序。', actualInfluence: '依靠严格军纪、训练和战斗表现逐步获得部队信任与朝廷升迁。', modernEquivalent: '职能近似战区野战部队指挥官，具体级别随时期变化。', impact: '形成岳家军的组织与声望基础。' },
      { timeText: '1134-1141年', periodLabel: '南宋绍兴抗金时期', title: '节度使、枢密副使等高级将领', nominalDuty: '负责一路或战区军队的作战、防御、训练和军政协调。', authorityScope: '统辖主力军、战区粮道、将领任用和收复地区的军政安排，但受枢密院、皇帝和其他将领制约。', actualInfluence: '在襄阳、郾城等战事中拥有较高军队威望，成为南宋主战力量代表。', modernEquivalent: '职能近似战区司令或集团军司令，枢密院相当于中央军政决策中枢的一部分。', impact: '抗金战果和“直捣黄龙”目标强化了南宋社会的恢复失地愿望。' }
    ]
  } },
  { id: 'zhang-juzheng', merge: {
    background: '张居正出身湖广士人家庭，嘉靖、隆庆时期进入内阁，万历初年作为首辅和太后、皇帝之间的核心辅政者，集中推动财政、考成和边防改革。',
    childhood: '少年科举成名，成长于明代中后期财政紧张、边患和官僚党争并存的环境。地方社会与科举经历使其重视国家账目、官员考核和行政执行。',
    personality: '精于权衡、执行力强、重视权威和制度结果；政治上集中权力的方式有效但容易引发同僚和既得利益集团的反弹。',
    policyInclination: '主张以考成法约束官员，以一条鞭法清理赋役，以边防、漕运和财政整顿提升国家能力。',
    socialContribution: '改善晚明财政和行政效率，推动赋役货币化和官员责任制，为理解明代国家治理困境提供典型样本。',
    impactSummary: '张居正改革在短期内提高了国家动员能力，但过度依赖首辅权威和皇室支持，身后清算说明制度成果未能完全转化为稳定共识。',
    resume: [
      { timeText: '1567-1572年', periodLabel: '隆庆、万历初年', title: '内阁大学士', nominalDuty: '参与皇帝决策、票拟诏令、协调六部和地方行政。', authorityScope: '通过内阁票拟、奏章处理和人事建议影响中央财政、边防、漕运和官员考核。', actualInfluence: '在高拱等人退出后成为内阁核心，逐步形成改革所需的中枢协调能力。', modernEquivalent: '职能近似中央政府政策协调与行政中枢成员，不等同现代宰相。', impact: '为万历初年集中改革和边防调整建立文书与人事基础。' },
      { timeText: '1572-1582年', periodLabel: '万历初年', title: '首辅 / 皇帝辅政者', nominalDuty: '主持内阁政务，辅导幼年皇帝并协调全国官僚、财政和军事。', authorityScope: '内阁票拟、官员考成、赋役清查、漕运、边防、军饷和地方执行督察。', actualInfluence: '借助李太后和张居正的皇帝教育获得高集中度决策权，推动一条鞭法、考成法等改革。', modernEquivalent: '职能近似政府首脑兼中央改革总协调者，但权力基础来自皇帝信任。', impact: '短期改善国库、边防和行政效率，也激化了官僚集团对首辅集权的抵触。' },
      { timeText: '1582年以后', periodLabel: '张居正身后', title: '改革者与被清算对象', nominalDuty: '去世后不再拥有官职，个人政治保护随皇帝亲政而消失。', authorityScope: '无现实行政权限，但其家产、名誉和改革政策成为朝廷重新评价对象。', actualInfluence: '身后被夺谥、抄家等清算，部分政策被调整，但财政和赋役改革影响并未完全消失。', modernEquivalent: '职能近似卸任或去世改革者在政治记忆中的政策遗产。', impact: '体现个人权威型改革对制度化和政治共识的依赖。' }
    ]
  } },
  { id: 'li-hongzhang', merge: {
    background: '李鸿章出身淮河流域士绅家庭，科举入仕后在太平天国战争中组织淮军，逐步成为晚清地方军政、洋务和外交的综合型重臣。',
    childhood: '接受传统经学和科举教育，成长于内忧外患、地方团练兴起和清廷财政军政失衡的时代。早年经验使其重视军队、财政和技术的现实作用。',
    personality: '务实、善于组织和谈判，能够在传统官僚体系与外来技术之间寻找折中；同时依赖地方军政网络，改革范围受政治和财政结构限制。',
    policyInclination: '主张以自强、求富、练兵、办厂、办学和外交交涉增强清朝能力，倾向渐进改良而非立即改变君主制度。',
    socialContribution: '推动北洋海军、近代工业、电报、铁路和新式教育等建设，参与晚清重要外交并承担复杂历史责任。',
    impactSummary: '李鸿章既是洋务运动的建设者，也是甲午失败和不平等条约的签署者之一，评价必须同时放入国家能力、制度局限和外交压力。',
    resume: [
      { timeText: '1862-1870年', periodLabel: '太平天国战争时期', title: '淮军统领 / 江苏巡抚', nominalDuty: '组织地方军队、平定战乱并负责战区省级行政。', authorityScope: '淮军招募训练、军饷粮道、地方治安、税赋和战时官员协调。', actualInfluence: '把地方团练转化为可持续军政集团，凭战功进入清廷权力核心。', modernEquivalent: '职能近似省级行政长官兼战区部队司令，但古代督抚权力并非现代军政分工。', impact: '淮军和地方督抚网络成为晚清政治、财政和洋务建设的重要资源。' },
      { timeText: '1870-1894年', periodLabel: '晚清洋务与北洋时期', title: '直隶总督、北洋大臣', nominalDuty: '统辖直隶地区行政，并代表清廷处理北方外交、海防和洋务事务。', authorityScope: '直隶州县、海关与地方财政协调、北洋军队和海防、外交交涉、军工与新式企业。', actualInfluence: '依托淮军、北洋集团和中央支持，推动天津机器局、北洋海军、电报铁路等项目。', modernEquivalent: '职能近似省级政府主要负责人兼区域国防、外交和经济建设协调者。', impact: '推动晚清部分近代化建设，但地方军政分权和财政分散也限制了整体改革。' },
      { timeText: '1895-1901年', periodLabel: '甲午战后晚清外交', title: '钦差大臣 / 条约谈判代表', nominalDuty: '代表清廷处理战争善后、外交谈判和部分改革事务。', authorityScope: '在皇帝授权范围内与外国政府谈判，涉及赔款、通商、领土、铁路和外交安排。', actualInfluence: '承担马关条约等重大外交压力的谈判与签署责任，晚年参与新政前期调整。', modernEquivalent: '职能近似特命全权大使兼国家级谈判代表，不等同现代外交体系的常任职位。', impact: '成为晚清国家困境和外交屈辱的代表性人物，也促使社会进一步反思洋务路线和政治制度。' }
    ]
  } },
  { id: 'wang-ben', merge: {
    background: '王贲出身秦国王氏将门，是王翦之子。秦统一战争后期，秦国需要把前线突破、长期围城和新占领区控制连接起来，王贲承担了东方战场的重要任务。',
    childhood: '史料对其幼年记载很少，但王氏家族长期掌握秦军高级指挥资源，王贲大概率在军事、地图、后勤和宗族政治环境中成长。',
    personality: '执行力强、重视战役节奏和军队协同，历史形象较少有个人逸闻，更多通过持续完成灭国任务体现其职业军人特征。',
    policyInclination: '服务秦王政统一战略，倾向以集中兵力、攻取交通节点和瓦解敌国政治中心完成兼并。',
    socialContribution: '参与灭魏、攻燕和灭齐等战役，推动秦从军事胜利进入全国行政整合阶段。',
    impactSummary: '王贲说明秦统一并非单一名将完成，而是王翦、王贲等将领在不同方向长期执行、后勤和占领治理共同作用的结果。',
    resume: [
      { timeText: '前226-前225年', periodLabel: '秦灭六国后期', title: '秦军将军 / 灭魏主将', nominalDuty: '统率秦军执行对魏作战和攻城灭国任务。', authorityScope: '前线军队、攻城器械、粮道、俘降安置和新占地区的军事控制。', actualInfluence: '以水攻大梁等方式迫使魏国灭亡，打开秦军继续东进的通道。', modernEquivalent: '职能近似集团军司令兼战区攻坚指挥官，不对应现代单一军衔。', impact: '削弱六国防线，为秦攻燕、齐和最终统一创造条件。' },
      { timeText: '前222-前221年', periodLabel: '秦统一战争收束', title: '秦军东方战区统帅', nominalDuty: '负责燕、齐方向的最后兼并与战后控制。', authorityScope: '东方战区军队调度、地方降服、交通线和新设行政区域的安全。', actualInfluence: '灭燕、代和齐，完成秦统一战争的最后阶段。', modernEquivalent: '职能近似方面军总司令兼占领区军事负责人。', impact: '使前221年秦帝国建立具有完整的军事收束和区域控制基础。' }
    ]
  } },
  { id: 'wu-guang', merge: {
    background: '吴广是秦末戍卒，因雨误期面临秦法惩罚，与陈胜共同在大泽乡发动起义。其身份体现秦帝国基层征发、军役和法律压力如何转化为集体反抗。',
    childhood: '史料没有留下连续的幼年记载，可以确定的是他来自需要服徭役、被编入戍卒队伍的普通社会层，缺乏贵族或官僚保护。',
    personality: '敢于承担风险，能够在极端压力下参与组织同伴；关于其具体谋略和领导风格的材料有限，不宜完全被后世戏剧化形象替代。',
    policyInclination: '核心诉求是逃避秦法惩罚、反抗强制征发并推翻地方统治，早期尚未形成完整的新国家制度方案。',
    socialContribution: '与陈胜共同打破秦朝基层恐惧机制，为各地反秦力量提供公开起事的示范。',
    impactSummary: '吴广的意义在于普通戍卒也能成为历史转折的发动者，大泽乡起义把基层生存压力转化为全国性政治危机。',
    resume: [
      { timeText: '前209年', periodLabel: '秦二世时期', title: '戍卒 / 起义组织者', nominalDuty: '原本承担秦帝国边地戍守和军事征发任务。', authorityScope: '起义后仅能控制身边戍卒和早期反秦队伍，缺乏稳定行政辖区和财政体系。', actualInfluence: '与陈胜利用误期必死的共同处境组织起义，成为反秦战争的最初公开领袖。', modernEquivalent: '不能类比现代职位，更接近基层武装动员者。', impact: '大泽乡起义成为秦末战争的引爆点，促成地方势力和六国遗民纷纷响应。' }
    ]
  } },
  { id: 'wang-he', merge: {
    background: '王龁是秦昭襄王后期秦军将领，长期在韩、赵方向作战。长平之战中，他先率军与赵军相持，白起接替后仍处于秦军指挥链和战场执行体系之中。',
    childhood: '可靠史料没有记载其幼年和家世，宜把他作为秦国职业军事系统中的中高级将领来理解，而不是补写无依据的传奇经历。',
    personality: '史料呈现较少，主要可见其服从军令、持续执行攻势和承担前线作战任务的特征。',
    policyInclination: '服从秦国东进和削弱赵国的战略，以持续压迫、攻城和阵地推进消耗对手。',
    socialContribution: '体现秦军并非只有白起一个名将，而是由多层指挥官、粮道和军功体系共同维持作战能力。',
    impactSummary: '王龁是理解长平之战指挥更替的重要人物：白起的胜利建立在秦军前期推进、后勤和持续施压之上。',
    resume: [
      { timeText: '前264-前260年', periodLabel: '秦赵长平战争前期', title: '秦将', nominalDuty: '率领秦军在上党、长平方向执行攻城和战场压迫。', authorityScope: '前线部队、营垒、攻城行动、军粮协同和局部战场调度。', actualInfluence: '在白起接替前维持秦军攻势，形成赵军被迫应战的战场条件。', modernEquivalent: '职能近似方面军前线指挥官或集团军军长。', impact: '为长平决战的秦军优势积累地形、阵地和后勤条件。' },
      { timeText: '前260年', periodLabel: '长平之战秦军指挥调整', title: '前线主将 / 作战执行者', nominalDuty: '执行秦军统帅部的兵力部署和对赵作战计划。', authorityScope: '负责所部作战和军令传达，重大诱敌、包围和决战方案由更高层统筹。', actualInfluence: '其公开指挥与白起秘密接替形成信息差，帮助秦军诱使赵括改变坚守策略。', modernEquivalent: '职能近似战区副司令或前线集团军指挥官。', impact: '长平之战显示将领个人能力必须嵌入国家动员与指挥保密体系。' }
    ]
  } },
  { id: 'zhao-kuo', merge: {
    background: '赵括出身赵国军事家族，是赵奢之子。长平之战长期相持后，赵王和主战压力要求改变廉颇的防守方案，赵括因此被任命为赵军主将。',
    childhood: '从小接触将门教育，熟悉兵书、阵法和赵国军事传统；但史料对其实际训练和战场经验记载不足，不能简单把“纸上谈兵”当作完整幼年传记。',
    personality: '自信、善于理论表达、倾向主动决战，但在敌情判断、后勤承受和秦军诱敌策略面前缺乏足够实战校正。',
    policyInclination: '主张改变廉颇的长期坚守，集中兵力主动出击，试图通过决战结束赵国的财政和粮道压力。',
    socialContribution: '作为长平决战中的关键决策者，帮助后人理解军事理论、政治压力、粮道约束与临阵换将之间的关系。',
    impactSummary: '赵括不能只被归结为“纸上谈兵”：赵国国内主战压力、秦军换将保密和长期粮道危机共同造成了他的失败。',
    disputeTabs: [
      { title: '传统评价', body: '后世常以“纸上谈兵”概括赵括，强调其理论知识不能替代真实战场经验。' },
      { title: '结构视角', body: '赵括接手的是长期消耗、粮道困难和秦军诱敌后的极端局面，责任应放在个人判断与赵国决策结构共同分析。' }
    ],
    resume: [
      { timeText: '前260年', periodLabel: '长平之战后期', title: '赵军主将', nominalDuty: '统率赵国主力，负责战线部署、突围、粮道和与秦军决战。', authorityScope: '长平赵军主力、将领调度、营垒部署、出击与撤退命令。', actualInfluence: '替代廉颇后拥有前线最高指挥权，但战略方向受赵王、国内舆论和粮食压力影响。', modernEquivalent: '职能近似战区集团军司令，重大政治目标仍受国家最高决策层约束。', impact: '主动出击后被白起分割包围，赵军主力覆灭，赵国国力受到决定性打击。' }
    ]
  } },
  { id: 'tang-gaozu', merge: {
    background: '李渊出身关陇贵族和隋朝军政体系，隋末动乱时以太原为根据地起兵。建立唐朝后，他需要在李世民等宗室军事集团、功臣和地方势力之间完成国家整合。',
    childhood: '成长于北周、隋代贵族政治和军事家庭，熟悉关中地理、府兵传统、宗室联盟和朝廷礼法。',
    personality: '谨慎、善于借助家族与部属资源，能够在群雄竞争中保留政治回旋；但在继承竞争中逐渐失去对李世民军事集团的控制。',
    policyInclination: '承接隋制而减轻末期高压，优先稳定关中、恢复户籍和财政，并通过分封、任官和军事征服建立新王朝。',
    socialContribution: '结束隋末主要割据，建立唐朝中央框架，为贞观时期的制度、疆域与文化发展提供起点。',
    impactSummary: '唐高祖的历史作用常被玄武门之变遮蔽，但唐朝的都城、官僚、军队和统一战争首先是在其名义下完成的。',
    resume: [
      { timeText: '617-618年', periodLabel: '太原起兵与唐国公集团', title: '太原留守 / 起兵领袖', nominalDuty: '名义上负责太原及北方军政，实际转为组织反隋和争夺天下。', authorityScope: '太原军队、粮道、地方官吏、盟友和入关路线。', actualInfluence: '借隋末秩序崩溃和李世民、刘文静等人的支持建立关中根据地。', modernEquivalent: '职能近似区域军政长官兼战时政治联盟领袖。', impact: '太原起兵为唐朝建立提供军队、合法性和地缘基础。' },
      { timeText: '618-626年', periodLabel: '唐初统一战争', title: '皇帝 / 开国统治者', nominalDuty: '统筹唐朝中央行政、财政、军队、人事和对外关系。', authorityScope: '长安朝廷、州县官僚、军队调度、封赏任命、地方归附和统一战争。', actualInfluence: '依靠李世民、李靖、李勣等将领平定群雄，并以隋制改造新朝行政。', modernEquivalent: '国家元首与最高行政、国防决策者的职能近似。', impact: '唐朝统一框架和制度承继在其时期形成，但皇位继承冲突最终导致玄武门之变。' }
    ]
  } },
  { id: 'tang-gaozong', merge: {
    background: '唐高宗李治继承贞观遗产，即位后面对宗室、功臣、外戚和后宫力量重新分配。唐朝在其时期继续扩张，宫廷决策也逐渐转向武则天参与的共同政治。',
    childhood: '作为太子成长于贞观宫廷，接受儒家礼法、帝王教育和行政训练；玄武门之后的继承环境使他需要平衡不同功臣集团。',
    personality: '相对温和、重视制度延续和专业官僚，但健康状况与宫廷权力变化限制了其独立处理政务的能力。',
    policyInclination: '延续唐太宗的律令与官僚秩序，重视边疆经营，同时允许武则天进入最高决策圈，形成“二圣”政治。',
    socialContribution: '推动唐律疏议、疆域扩展和初唐行政成熟，连接贞观之治与武周政治转折。',
    impactSummary: '唐高宗不是武则天政治的单纯背景人物，他的授权、健康和继承安排共同决定了唐代权力结构如何转向武周。',
    resume: [
      { timeText: '649-655年', periodLabel: '永徽前期', title: '皇帝 / 亲政统治者', nominalDuty: '统筹唐朝全国军政、财政、人事、法律、礼制和外交。', authorityScope: '三省六部、州县、军队、边疆、官员任免和律令执行。', actualInfluence: '延续贞观制度，处理长孙无忌等功臣集团与皇权关系，形成较稳定的前期政治。', modernEquivalent: '国家元首与最高行政、国防决策者的职能近似。', impact: '为唐朝法制和边疆扩展提供连续的行政基础。' },
      { timeText: '655-683年', periodLabel: '高宗后期 / 二圣临朝', title: '皇帝 / 共同决策者', nominalDuty: '与皇后共同处理中央军政、人事、财政和继承事务。', authorityScope: '诏令、宰相任免、宫廷与外朝关系、对外战争和储位安排。', actualInfluence: '疾病使武则天参与政务的程度上升，皇帝与皇后共同决策逐渐成为政治常态。', modernEquivalent: '不宜直接类比，属于君主制中的最高权力共治结构。', impact: '“二圣”政治为武周建立、唐室复辟和女性进入最高权力提供制度前史。' }
    ]
  } },
  { id: 'song-renzong', merge: {
    background: '宋仁宗赵祯幼年即位，前期由刘太后临朝，亲政后面对北宋文官政治成熟、财政压力、边患与庆历改革等问题。',
    childhood: '在宫廷摄政和储位教育中成长，早期政治经验来自太后、宰执和文官集团的共同管理，因此形成重协商的统治风格。',
    personality: '宽厚、能容纳士大夫意见，重视稳定和程序；但在财政、军政和改革问题上较为谨慎，容易被评价为决断不足。',
    policyInclination: '维护文官政治和制度协商，尝试通过范仲淹等人的庆历新政改善吏治，但不愿让改革破坏整体稳定。',
    socialContribution: '仁宗朝形成北宋文化高峰，科举、文学、史学和士大夫公共表达高度活跃，人才网络影响后世。',
    impactSummary: '宋仁宗时期的“仁政”与文化繁荣并存于财政、军备压力之中，正是理解王安石变法为何出现的前置背景。',
    resume: [
      { timeText: '1022-1033年', periodLabel: '刘太后临朝', title: '皇帝 / 名义统治者', nominalDuty: '名义上统领北宋军政和行政，实际由太后与中枢官僚共同处理政务。', authorityScope: '诏令、继承、礼制和部分人事，但重要决策受摄政体系约束。', actualInfluence: '接受宫廷与宰执教育，逐步形成对文官程序和政治平衡的依赖。', modernEquivalent: '国家元首的名义职能近似，不对应现代摄政制度。', impact: '太后临朝使仁宗亲政后更重视程序、协商和避免宫廷冲突。' },
      { timeText: '1033-1063年', periodLabel: '北宋仁宗亲政', title: '皇帝 / 文官国家最高决策者', nominalDuty: '统筹中央财政、军队、官员任免、司法、科举和对外关系。', authorityScope: '中书门下、枢密院、三司和州县官僚，最终决定改革、战争与外交方向。', actualInfluence: '通过任免范仲淹、韩琦、富弼、欧阳修等人调节改革与守成，维持文官政治的连续性。', modernEquivalent: '国家元首与最高行政、国防决策者的职能近似。', impact: '文化繁荣和制度稳定成为北宋典范，也让财政冗费与边防问题积累到后继时期。' }
    ]
  } },
  { id: 'song-shenzong', merge: {
    background: '宋神宗赵顼即位时，北宋面临冗官、冗兵、财政赤字和边防压力。王安石的改革方案使皇帝把“富国强兵”从士人讨论转为中央政策。',
    childhood: '成长于仁宗、英宗之后的文官政治环境，接受经学和帝王教育，对财政军政困境有较早认识。',
    personality: '有改革雄心、求治心切，能够授权王安石推动新法；但在新旧党争、边疆战争和政策成本面前承受持续压力。',
    policyInclination: '支持国家主动介入财政、农业、役法、军政和边防，倾向以行政组织能力改善北宋积弱积贫。',
    socialContribution: '推动北宋最大规模的制度改革尝试，使基层财政、国家信贷、军队编制和官僚执行问题集中暴露并被讨论。',
    impactSummary: '宋神宗与王安石共同塑造熙宁变法，但改革成效受地方执行、党争、财政目标和边疆战争多重影响。',
    disputeTabs: [
      { title: '改革支持者视角', body: '宋神宗主动面对财政和军事问题，支持新法是北宋提升国家能力的重要尝试。' },
      { title: '改革反思视角', body: '改革过度追求财政和军政目标，执行层可能加重地方负担，也扩大了新旧党争。' }
    ],
    resume: [
      { timeText: '1067-1069年', periodLabel: '熙宁变法前期', title: '皇帝 / 改革发起者', nominalDuty: '决定北宋财政、军政、人事和制度调整方向。', authorityScope: '任免宰执、批准新法、调度中央财政和枢密院，命令州县执行改革。', actualInfluence: '在司马光等不同意见之间选择王安石，形成皇帝与改革派的政治联盟。', modernEquivalent: '国家元首兼中央改革总负责人，古代政策执行仍受官僚层级影响。', impact: '使新法进入全国行政体系，并改变北宋党争结构。' },
      { timeText: '1069-1085年', periodLabel: '熙宁元丰时期', title: '皇帝 / 富国强兵政策中枢', nominalDuty: '统筹新法、边防、财政和中央官僚体系。', authorityScope: '青苗、免役、市易、保甲、学校、财政收支、对西夏战争及官员考成。', actualInfluence: '持续支持改革并参与边防决策，但新法执行变形和对外战争成本削弱了政策效果。', modernEquivalent: '国家最高行政与国防决策者的复合职能。', impact: '改革遗产延续至北宋后期，党争和政策反复也加深了政治分裂。' }
    ]
  } },
  { id: 'song-gaozong', merge: {
    background: '宋高宗赵构在靖康之变后继承南宋政权，面对北方失陷、宗室离散、金军压力和地方武将崛起，首要目标是保住南宋国家框架。',
    childhood: '出身北宋宗室，青年时期经历靖康巨变和南渡逃亡，政治经验由亡国危机、军队重建与江南财政恢复塑造。',
    personality: '谨慎、求稳、重视皇位和政权延续，对武将独立势力高度警惕；其和战选择因此长期受到后世争议。',
    policyInclination: '优先重建江南财政和中央行政，倾向议和与守成，并通过枢密院、文官和封赏控制岳飞等武将。',
    socialContribution: '使南宋延续并推动江南经济、文化与科举体系发展，但牺牲北方恢复目标，造成岳飞冤案等历史记忆。',
    impactSummary: '宋高宗的核心选择是“保全一个南宋国家”而不是“立即恢复全部北方”，理解这一约束有助于区分政治责任与后世忠奸叙事。',
    disputeTabs: [
      { title: '政权延续视角', body: '在金军压力和内部军政分裂下，宋高宗通过南渡、财政重建和议和保存了南宋政权。' },
      { title: '恢复中原视角', body: '其压制主战将领、接受绍兴和议并促成岳飞遇害，常被视为放弃恢复中原的代表。' }
    ],
    resume: [
      { timeText: '1127-1134年', periodLabel: '南宋建立与军政重建', title: '皇帝 / 流亡朝廷最高统治者', nominalDuty: '重建中央官僚、财政、军队和临时都城秩序。', authorityScope: '南宋朝廷、江南州县、勤王军、军饷和对金外交。', actualInfluence: '在金军追击和地方武将竞争中不断迁徙，通过任命、封赏和联盟维持皇权。', modernEquivalent: '国家元首与战时政府最高决策者的职能近似。', impact: '建立南宋中央框架，为后续抗金和议和留下制度空间。' },
      { timeText: '1135-1162年', periodLabel: '绍兴和议前后', title: '皇帝 / 南宋军政与外交决策者', nominalDuty: '统筹南宋军队、财政、官员、人事和对金外交。', authorityScope: '枢密院、地方军队、军粮、边防、和议谈判、武将任免和继承安排。', actualInfluence: '在秦桧等主和力量支持下压制部分主战路线，促成岳飞被杀和绍兴和议。', modernEquivalent: '国家元首兼战时外交、国防最高决策者。', impact: '南宋获得相对稳定的发展窗口，但北方恢复和岳飞评价成为长期争议。' }
    ]
  } },
  { id: 'ming-shenzong', merge: {
    background: '明神宗朱翊钧幼年即位，万历初年由张居正辅政，后亲政并面对财政、边防、党争和皇位继承问题。其前后期形象差异很大。',
    childhood: '早年接受李太后、张居正和宫廷文官教育，日常政务受到严格约束；亲政后对首辅和文官集团的控制产生强烈反作用。',
    personality: '前期勤于学习和接受辅政，后期重视皇权自主、消极应对文官和继承争议，长期不上朝成为其政治形象的核心。',
    policyInclination: '前期支持财政、考成和边防整顿，后期倾向以拖延、留中和人事控制维护皇权，改革连续性因此下降。',
    socialContribution: '万历前期改善国库和行政效率，后期三大征、党争与财政压力又加剧明末国家治理困境。',
    impactSummary: '明神宗不能只被概括为“万历怠政”：其早年改革成效、亲政后的皇权反弹和晚明财政军政压力共同构成明末转折。',
    disputeTabs: [
      { title: '前期改革视角', body: '万历初年在张居正辅政下，财政、考成、边防和漕运均有明显整顿。' },
      { title: '后期怠政视角', body: '长期不上朝、矿税和继承争议削弱了中央决策效率，使晚明问题难以及时处理。' }
    ],
    resume: [
      { timeText: '1572-1582年', periodLabel: '万历初年', title: '幼年皇帝 / 张居正辅政下的最高名义权力', nominalDuty: '名义上统领国家军政、财政、人事和礼制，实际由辅政集团协助处理。', authorityScope: '诏令、官员任免、改革批准和皇室事务，具体执行由内阁、六部和地方完成。', actualInfluence: '在太后和张居正引导下接受考成、赋役和边防政策，皇帝个人决策空间有限。', modernEquivalent: '国家元首的名义职能近似，不对应现代摄政制度。', impact: '为万历初年改革提供皇权合法性。' },
      { timeText: '1582-1620年', periodLabel: '万历亲政时期', title: '皇帝 / 皇权与文官博弈中枢', nominalDuty: '决定中央财政、军政、人事、继承和对外战争方向。', authorityScope: '内阁票拟批红、六部任免、边防军饷、三大征、矿税和皇位继承安排。', actualInfluence: '通过留中、不见朝和直接控制任命维护皇权，但也导致行政空缺和政策积压。', modernEquivalent: '国家元首兼最高行政、国防决策者的职能近似。', impact: '明末财政、党争和边防问题在其后期持续累积，并影响明清鼎革。' }
    ]
  } },
  { id: 'daoguang-emperor', merge: {
    background: '道光帝即位时，清朝已从乾嘉盛世转入财政、吏治、白银外流和边疆压力上升阶段。鸦片贸易与英国海权把原有内政问题转化为国际冲突。',
    childhood: '成长于嘉庆时期的皇室和传统天下秩序中，接受勤俭、经学和军政教育，但缺乏近代国际法、海军和工业体系知识。',
    personality: '勤俭、谨慎、重视整顿和禁烟，面对新型外部力量时常在强硬与妥协之间摇摆。',
    policyInclination: '维护传统朝贡和海禁秩序，支持禁烟与惩治走私，主要依靠传统督抚、绿营和地方行政应对外患。',
    socialContribution: '任用林则徐禁烟，使鸦片问题成为国家政策；同时鸦片战争暴露清朝海防、财政和信息体系的局限。',
    impactSummary: '道光帝是传统帝国面对近代国际体系的转折君主，问题不只在个人判断，也在制度工具已经无法匹配外部冲击。',
    resume: [
      { timeText: '1820-1839年', periodLabel: '道光前期', title: '皇帝 / 内政整顿者', nominalDuty: '统筹清朝财政、吏治、军政、边疆和对外关系。', authorityScope: '六部、军机处、地方督抚、漕运、河工、盐政和边防。', actualInfluence: '通过节俭、整顿和官员任免应对财政衰退，但无法根治地方行政与白银流失问题。', modernEquivalent: '国家元首与最高行政决策者的职能近似。', impact: '清朝由盛转衰的内部矛盾逐步显现。' },
      { timeText: '1839-1850年', periodLabel: '鸦片战争前后', title: '皇帝 / 禁烟与战和决策者', nominalDuty: '决定禁烟、战争、外交和战后善后政策。', authorityScope: '任用钦差、调动沿海军队、处理贸易和外交诏令、批准条约与赔款安排。', actualInfluence: '任用林则徐禁烟，战争失利后在信息不足、军备落后与地方执行不一中被迫调整路线。', modernEquivalent: '国家元首兼最高国防、外交决策者。', impact: '南京条约开启近代不平等条约体系，清朝传统对外秩序受到冲击。' }
    ]
  } },
  { id: 'guangxu-emperor', merge: {
    background: '光绪帝载湉因同治帝无嗣入承大统，幼年由慈禧太后影响政务。甲午战败后，他支持康有为、梁启超等推动戊戌变法，但缺少独立军政基础。',
    childhood: '在高压宫廷和摄政结构中成长，接受传统经学与帝王教育，却无法像正常成年君主一样建立稳定的亲信、军队和财政网络。',
    personality: '有求变愿望、情感强烈、政治经验不足，面对守旧集团和慈禧太后时缺少执行改革所需的组织资源。',
    policyInclination: '倾向学习西方制度、改革官制和教育、发展实业与军事，试图通过皇帝诏令快速改变清朝国家结构。',
    socialContribution: '使维新思想进入中央政治，戊戌变法成为晚清制度转型和近代教育、舆论发展的重要节点。',
    impactSummary: '光绪帝的失败体现改革目标、皇权名义、军政控制和官僚执行之间的断裂，不能简单归因于个人软弱。',
    disputeTabs: [
      { title: '改革推动者视角', body: '光绪帝在甲午失败后主动支持维新派，试图改革官制、教育、军事和经济。' },
      { title: '权力受限视角', body: '慈禧太后、军机和地方督抚体系掌握大量实际资源，光绪帝缺少完成改革的军政执行网络。' }
    ],
    resume: [
      { timeText: '1875-1898年', periodLabel: '同治后至戊戌变法', title: '皇帝 / 名义最高统治者', nominalDuty: '统领清朝行政、军政、财政、外交和人事。', authorityScope: '发布诏令、任免官员、批准制度调整，但军机、太后和地方督抚影响重大。', actualInfluence: '甲午战败后主动接近维新派，试图借诏令突破旧有政治惯性。', modernEquivalent: '国家元首与最高行政决策者的名义职能近似，实际权力受宫廷结构制约。', impact: '为戊戌变法提供皇权入口。' },
      { timeText: '1898-1908年', periodLabel: '戊戌变法失败后', title: '被约束的皇帝', nominalDuty: '继续承担国家元首名义和诏令发布职责。', authorityScope: '实际无法自由任免军政要员，重要决策受慈禧太后、宫廷和守旧集团控制。', actualInfluence: '变法失败后被幽禁，后续新政和对外政策缺乏自主决定能力。', modernEquivalent: '名义国家元首，不宜类比有完整行政权的现代总统或君主。', impact: '成为晚清改革失败、皇权分裂和制度僵化的象征。' }
    ]
  } },
  { id: 'ban-chao', merge: {
    background: '班超出身史学家班彪家庭，是班固之弟。东汉在明帝、章帝时期需要重新经营西域，他以使者、军政官和地方协调者身份长期处理西域诸国关系。',
    childhood: '成长于史官和儒学家庭，早年有抄书谋生经历，后因投笔从戎进入军政系统。家学使他熟悉汉朝历史与外交名分，基层经历又增强了实际行动能力。',
    personality: '果断、坚忍、善于判断地方联盟与风险，能够在有限兵力下利用外交、威慑和分化处理复杂边疆局面。',
    policyInclination: '主张维持东汉在西域的政治影响，通过驻军、使节、质子、盟约和贸易交通建立低成本控制。',
    socialContribution: '恢复并维持东汉对西域的经营，促进汉与中亚交通，也使后世理解边疆治理不只是军事征服。',
    impactSummary: '班超的贡献在于把外交、军事和地方政治结合起来；他的“投笔从戎”形象背后是长期驻边和持续协商的行政工作。',
    resume: [
      { timeText: '73-91年', periodLabel: '东汉明帝至章帝', title: '使者 / 西域军事外交官', nominalDuty: '代表东汉出使西域、联络诸国并维护汉朝交通和政治影响。', authorityScope: '使团、驻边军队、质子与盟约、驿路和西域地方政权协商。', actualInfluence: '通过分化北匈奴影响、扶持亲汉政权和军事威慑恢复汉朝存在。', modernEquivalent: '职能近似驻外特使兼区域安全与外交事务负责人。', impact: '重新打开汉朝与西域的交通和政治网络。' },
      { timeText: '91-102年', periodLabel: '东汉西域都护体系', title: '西域都护 / 边疆最高协调者', nominalDuty: '负责西域诸国的军事、外交、交通和汉朝驻军协调。', authorityScope: '边疆军队、屯田粮道、地方盟友、使节往来和对叛乱的处置。', actualInfluence: '在复杂多国环境下维持汉朝影响，但治理依赖个人威望、交通和地方合作。', modernEquivalent: '职能近似边疆战区司令兼区域外交事务总负责人。', impact: '东汉经营西域的经典案例，也显示中央帝国边疆控制的成本和限度。' }
    ]
  } },
  { id: 'zhang-heng', merge: {
    background: '张衡生活在东汉政治、学术和城市文化发达的时代，兼具文学家、天文学家、数学和仪器研究者身份，并曾在中央和地方任职。',
    childhood: '出身南阳士人家庭，早年接受经学与文学教育，青年时期通过著述和学术声望进入官僚体系。',
    personality: '严谨、好学、重视观测与推理，对政治现实也保持敏感；能够在文学表达、自然研究和行政职责之间切换。',
    policyInclination: '行政上重视秩序与实证，学术上强调通过天文、历法和仪器认识自然，反对把灾异简单作为政治迷信工具。',
    socialContribution: '在天文学、地震观测、数学、文学和地图表达方面留下重要成果，是东汉科学与人文结合的代表。',
    impactSummary: '张衡提醒用户，古代科学家常同时是官僚、文学家和知识生产者，科学成就不能脱离当时的历法、礼制与行政需求。',
    resume: [
      { timeText: '约100-116年', periodLabel: '东汉地方与中央入仕', title: '士人 / 文学与历算学者', nominalDuty: '以著述、学术和地方仕途积累进入中央政治与知识网络。', authorityScope: '尚无全国行政权，主要承担地方文书、学术交流和个人研究。', actualInfluence: '凭借文学和历算才能获得中央任用，形成跨学科声望。', modernEquivalent: '职能近似研究者、公共知识分子和行政候补官员。', impact: '为后续天文仪器、历法和文学创作建立基础。' },
      { timeText: '116-139年', periodLabel: '东汉安帝至顺帝', title: '太常、侍中等中央官员 / 科学家', nominalDuty: '参与礼制、历法、天文、诏令和中央政务。', authorityScope: '可参与天文观测、历法修订、礼制事务和皇帝顾问工作，但不直接统领全国行政。', actualInfluence: '把自然观测和仪器设计带入国家历法与灾异讨论，发明候风地动仪等代表性成果。', modernEquivalent: '职能近似国家天文机构专家兼中央政策顾问。', impact: '推动东汉科学知识进入国家制度和公共文化。' }
    ]
  } },
  { id: 'cai-lun', merge: {
    background: '蔡伦是东汉宦官，长期服务宫廷并参与尚方等技术和器物管理。其改进造纸术的记载与宫廷技术系统、书写需求和材料工艺密切相关。',
    childhood: '早年经历记载有限，入宫后接受宫廷事务和技术管理训练。其身份说明古代技术创新并不只来自民间工匠，也可能在国家工官和宫廷作坊中完成。',
    personality: '重视工艺改进、材料选择和生产效果，政治上善于在宫廷权力结构中生存，但晚年卷入继承与宫廷斗争。',
    policyInclination: '主要影响在技术和宫廷生产，而非独立行政政策；其工作方向服务于书写、档案、礼制和国家器物需求。',
    socialContribution: '改进纸张原料、加工和质量，使书写材料更易推广，对教育、档案、宗教传播和文明交流产生长远影响。',
    impactSummary: '“蔡伦造纸”更准确的理解是改进和推广纸张工艺，不应把他写成凭一人突然发明全部造纸技术。',
    resume: [
      { timeText: '约75-105年', periodLabel: '东汉宫廷', title: '宦官 / 宫廷事务官', nominalDuty: '服务皇室，办理宫廷文书、器物、内廷事务和技术生产相关工作。', authorityScope: '内廷作坊、材料供应、器物制作和部分宫廷信息流转。', actualInfluence: '凭借宫廷位置接触国家工艺资源，并在宫廷需求中推动纸张材料改进。', modernEquivalent: '职能近似中央机关事务管理与国家工艺研发负责人，但不对应现代行政级别。', impact: '为纸张改进、生产标准和传播提供宫廷支持。' },
      { timeText: '105年以后', periodLabel: '造纸术改进与传播', title: '尚方技术管理者 / 工艺改进者', nominalDuty: '负责或参与宫廷器物和材料工艺改进。', authorityScope: '工匠、原料、制作流程和成品质量，影响范围主要在宫廷和官方生产体系。', actualInfluence: '利用树皮、麻头、破布、渔网等材料改进纸张，推动纸张成为更可用的书写媒介。', modernEquivalent: '职能近似国家级工艺研发与生产标准负责人。', impact: '纸张成本和使用便利性改善，长期促进文书、教育和知识传播。' }
    ]
  } },
  { id: 'king-wen-zhou', merge: {
    background: '周文王姬昌是商末周族的核心领袖，活动于商王权威下降、诸侯关系重组和周族向关中与中原扩张的阶段。传统叙事把他塑造成“以德兴周”的奠基者。',
    childhood: '早年具体材料不足，可靠的历史线索主要来自周族世系、岐周根据地和与商王朝的政治关系。后世关于拘羑里、演《周易》的叙述带有明显的文化塑造。',
    personality: '形象上重视礼贤、忍耐和政治经营，能在商王压力下保存周族实力；其“文王之治”更多体现周人对合法性的追述。',
    policyInclination: '以整合宗族、诸侯和农业资源为基础，通过礼制、德治和对商的名义臣属积累政治声望，为武王军事行动准备条件。',
    socialContribution: '推动周族从区域部落成长为能够替代商王朝的政治集团，形成后世“敬德保民”和周礼政治的源头叙事。',
    impactSummary: '周文王的主要作用是奠基而非亲自灭商，他把族群资源、诸侯联盟和政治合法性连接起来，使周武王的牧野决战具有长期准备。',
    resume: [
      { timeText: '商末', periodLabel: '周族兴起', title: '西伯 / 周族领袖', nominalDuty: '管理周族领地、宗族、农业资源和对商关系。', authorityScope: '周族内部宗族秩序、地方生产、盟友往来和战时动员。', actualInfluence: '在关中经营根据地并吸纳诸侯，逐渐形成超出普通方国首领的政治影响。', modernEquivalent: '职能近似区域政治联盟领袖与地方行政、军事负责人。', impact: '为周灭商、分封和礼制建构提供资源和合法性。' }
    ]
  } },
  { id: 'king-wu-zhou', merge: {
    background: '周武王姬发继承文王积累的周族实力，面对商纣王统治危机和诸侯联盟机会，选择以军事行动完成王朝更替。',
    childhood: '具体幼年材料有限，作为周族核心继承人接受宗族、礼仪、军事和联盟政治教育。其形象主要由《尚书》、周礼传统和后世正统叙事共同塑造。',
    personality: '具有决断和动员能力，能在牧野前后把诸侯联盟转为军事行动；同时需要依靠周公、姜尚等辅臣稳定新王朝。',
    policyInclination: '以“伐纣”建立政治合法性，强调天命与民心，灭商后采用分封、宗法和礼制安排扩大周族控制。',
    socialContribution: '建立西周，开启以宗法分封和礼乐秩序组织广域政治的历史阶段。',
    impactSummary: '周武王的历史意义不只在牧野胜利，还在于把军事征服转化为新王朝的分封和礼制安排。',
    resume: [
      { timeText: '约前1046年', periodLabel: '牧野之战', title: '周族军事领袖', nominalDuty: '统率周人与诸侯联军，执行推翻商王朝的军事行动。', authorityScope: '联军调度、盟友承诺、战场决策和战后商地处置。', actualInfluence: '在商军离心和诸侯响应的条件下取得牧野胜利，控制殷商政治中心。', modernEquivalent: '职能近似联军最高统帅兼新政权开创者。', impact: '完成商周王朝更替，并为分封秩序建立军事基础。' },
      { timeText: '灭商后', periodLabel: '西周建立初期', title: '开国君主', nominalDuty: '统筹新王朝疆域、宗族、诸侯分封和政治合法性。', authorityScope: '王畿、诸侯任命、宗法继承、军事征伐和礼制方向。', actualInfluence: '通过分封和宗族安排把周族统治扩展到东方，但早逝使周公承担后续稳定任务。', modernEquivalent: '国家元首与开国最高决策者的职能近似。', impact: '西周制度的初步形态在其时期形成。' }
    ]
  } },
  { id: 'duke-of-zhou', merge: {
    background: '周公旦是周武王之弟、成王时期的重要辅政者。武王去世后，周公面对管叔、蔡叔等叛乱、东方旧势力和幼主继承问题，需要把征服转为制度治理。',
    childhood: '作为周王室宗亲成长于周族扩张和礼制传统中，早年具体生活缺乏连续记载，但其宗亲身份使他熟悉军事、祭祀和政治礼仪。',
    personality: '谨慎、能承担责任、重视制度和礼仪，后世将其塑造成“摄政而不篡位”的政治伦理典范；具体形象也有儒家追述和理想化成分。',
    policyInclination: '主张以分封、宗法、礼乐和成文制度整合新征服地区，同时通过封建亲戚和军事镇抚控制东方。',
    socialContribution: '稳定西周初年、完善分封宗法礼乐秩序，成为后世儒家政治理想、周礼和辅政伦理的核心人物。',
    impactSummary: '周公的贡献在于制度化：他把周人的胜利转成继承、封建、祭祀和官制安排，影响远超一次军事胜利。',
    resume: [
      { timeText: '约前1043-前1036年', periodLabel: '周成王初年', title: '摄政 / 周王室最高辅政者', nominalDuty: '辅佐幼年成王，处理全国军政、礼制、分封和继承秩序。', authorityScope: '中央官署、王畿军队、诸侯分封、东方征伐和祭祀礼仪。', actualInfluence: '在三监之乱后亲自东征并重新分封，实际掌握周初最高决策权但维护成王名义。', modernEquivalent: '职能近似摄政政府首脑兼国防和制度建设负责人。', impact: '确保周朝没有因幼主和叛乱而瓦解。' },
      { timeText: '西周初年', periodLabel: '周礼制度形成', title: '礼制与国家制度设计者', nominalDuty: '整理礼仪、宗法、分封、官制和国家祭祀秩序。', authorityScope: '规范王室、诸侯、卿大夫和宗族的权利义务与政治等级。', actualInfluence: '通过制度和典章把周族政治经验转化为可复制的秩序，后世“周公制礼”成为文化记忆。', modernEquivalent: '职能近似宪制设计者、中央制度总协调者和政治伦理塑造者。', impact: '周礼成为儒家政治和中国传统国家制度想象的重要资源。' }
    ]
  } },
  { id: 'mozi', merge: {
    background: '墨子生活在战国诸侯兼并、城防战争和士阶层流动的时代，传统上以墨翟为名。墨家既是思想学派，也是具有组织纪律、技术能力和游说实践的团体。',
    childhood: '具体家世和幼年记载不足，思想文本显示其熟悉工匠、城防和社会基层经验。后世传记把其出身解释为平民或工匠背景，但仍应标注史料边界。',
    personality: '重实践、重纪律、反对奢侈和无谓战争，能够把伦理主张转化为守城、游说和技术活动。',
    policyInclination: '主张兼爱、非攻、尚贤、尚同、节用和节葬，要求政治减少贵族奢侈并以公共利益、能力和功用评价制度。',
    socialContribution: '提出兼爱非攻等思想，发展逻辑、光学、力学和城防知识传统，代表战国思想中重社会实践的一支。',
    impactSummary: '墨家不是简单的“反战学说”，还包含组织、技术、功利伦理和政治平等诉求；其衰落与战国国家吸收、兼并和制度变化有关。',
    disputeTabs: [
      { title: '思想核心', body: '兼爱强调不以亲疏决定基本关怀，非攻反对侵略战争，尚贤和节用则关注国家用人和资源分配。' },
      { title: '历史位置', body: '墨家在先秦影响很大，但秦汉以后不再像儒学、道家那样成为主流国家意识形态，相关技术和逻辑内容仍有传承。' }
    ],
    resume: [
      { timeText: '战国中期', periodLabel: '诸子游说与墨家形成', title: '思想家 / 墨家组织者', nominalDuty: '通过游说、讲学和组织门徒传播政治伦理与社会方案。', authorityScope: '门徒纪律、思想训练、诸侯游说和城防技术协助，没有固定国家官职。', actualInfluence: '把兼爱、非攻、尚贤转化为可执行的组织规范，影响多个诸侯国的战争与外交讨论。', modernEquivalent: '职能近似公共思想家、社会组织领袖和技术顾问。', impact: '形成先秦儒墨对照和中国早期功利伦理、和平思想传统。' }
    ]
  } },
  { id: 'sun-bin', merge: {
    background: '孙膑活动于战国中期齐魏竞争时期，传统上与庞涓同学兵法，后因受刑投齐，在田忌、齐威王支持下参与桂陵、马陵等战役。',
    childhood: '家世和幼年细节不详，主要记载集中于兵法学习、魏国受害和齐国重用。孙膑故事含有后世兵家传说，应区分可确认的战役与戏剧化细节。',
    personality: '善于隐忍、观察敌情和利用心理，重视诱导、机动、避实击虚与战场信息，不以正面蛮力取胜。',
    policyInclination: '主张以谋略、机动和资源消耗打击强敌，强调统帅判断、地形、士气与敌方心理的综合作用。',
    socialContribution: '参与塑造战国兵家传统，桂陵与马陵的战术叙事影响后世对“围魏救赵”和诱敌歼灭的理解。',
    impactSummary: '孙膑的历史形象不能只理解为庞涓的复仇对手，他代表战国军事从贵族勇力转向信息、组织和谋略竞争。',
    resume: [
      { timeText: '约前354年', periodLabel: '桂陵之战', title: '齐军谋士 / 军事策划者', nominalDuty: '为齐军提供战略和战役设计，协助田忌处理魏军压力。', authorityScope: '参与路线、诱敌、援救赵国和战场节奏安排，未必直接统率全部军队。', actualInfluence: '以围魏救赵迫使庞涓回师，在桂陵形成齐国对魏国的战略反制。', modernEquivalent: '职能近似战区战略顾问和作战计划负责人。', impact: '改变齐魏力量对比，奠定其兵家声望。' },
      { timeText: '约前342年', periodLabel: '马陵之战', title: '齐军军事谋士', nominalDuty: '设计对魏军的诱导、行军和伏击方案。', authorityScope: '为田忌和齐军提供情报判断、路线与伏击部署，实际权限取决于主将采纳。', actualInfluence: '利用减灶、地形和夜战击败庞涓，魏国霸权遭受重大打击。', modernEquivalent: '职能近似联合作战参谋长或情报作战顾问。', impact: '成为中国古代军事谋略和以弱胜强叙事的代表。' }
    ]
  } },
  { id: 'dong-zhongshu', merge: {
    background: '董仲舒是西汉景帝、武帝时期的经学家和政治思想家，活动于诸侯势力收缩、皇权集中和国家需要统一政治伦理的阶段。',
    childhood: '早年家世和具体生活记载有限，主要线索是其长期研习《春秋》公羊学并通过讲学、对策和任官进入中央政治视野。',
    personality: '重视经典解释、政治秩序与伦理教化，善于把经学语言转化为国家政策论证；其思想也带有汉代天人感应的时代限制。',
    policyInclination: '主张以儒学确立政治名分和伦理秩序，强调皇帝受天命约束、选贤任能和教化百姓，同时支持大一统国家。',
    socialContribution: '推动儒学从诸子学说转为帝国政治的重要思想资源，影响察举、礼制、教育与后世君臣伦理。',
    impactSummary: '“罢黜百家、独尊儒术”不能简单理解为董仲舒一人提出并立即执行的单一命令，更适合看作经学、皇权和官僚制度长期合流。',
    disputeTabs: [
      { title: '制度影响', body: '董仲舒的经学政治为汉代大一统提供名分和伦理语言，帮助儒学进入国家教育与官僚体系。' },
      { title: '历史边界', body: '后世常把复杂的汉武帝思想政策归结为“独尊儒术”，实际还包含法家行政、阴阳五行和国家财政军事等多种资源。' }
    ],
    resume: [
      { timeText: '景帝至武帝前期', periodLabel: '西汉经学教育', title: '博士 / 经学教师', nominalDuty: '讲授儒家经典，参与礼制、政治和人才教育讨论。', authorityScope: '主要影响太学和士人教育，没有独立行政或军事指挥权。', actualInfluence: '通过《春秋》公羊学和门徒网络扩大儒学的政治解释力。', modernEquivalent: '职能近似国家高等教育与公共政策思想顾问。', impact: '为汉武帝时期的思想整合准备学术和人才基础。' },
      { timeText: '前134年前后', periodLabel: '汉武帝策问', title: '贤良对策者 / 政治思想家', nominalDuty: '针对国家治理、诸侯、教育和政治名分提出政策论证。', authorityScope: '没有直接行政管辖，但可影响皇帝诏令、学校、选官和礼制方向。', actualInfluence: '以天人三策等论述回应汉武帝对大一统政治的需求，成为儒学国家化的重要代表。', modernEquivalent: '职能近似中央政策研究者、宪制思想顾问和高等教育设计者。', impact: '影响汉代儒学官学化，但后世对其思想与实际政策的对应关系存在不同解释。' }
    ]
  } },
  { id: 'zhang-qian', merge: {
    background: '张骞生活在汉武帝对匈奴战争和西域交通开拓时期，原本以使者身份寻找大月氏联盟，途中被匈奴扣留多年，最终完成出使并返回汉朝。',
    childhood: '具体幼年材料很少，进入汉朝使团体系后接受外交、地理和军事路线训练。长期被扣留和多次穿越西域使他积累了常人难以获得的区域信息。',
    personality: '坚忍、守信、适应复杂环境，能够在被扣留、逃亡和外交不确定性中持续执行任务；同时具有较强的观察和汇报能力。',
    policyInclination: '支持通过联盟、交通、贸易和军事据点削弱匈奴，扩大汉朝对西域的战略视野，而非只依靠单次战争。',
    socialContribution: '推动汉朝认识中亚、西域和南北交通，促进河西经营、马匹贸易和丝绸之路形成。',
    impactSummary: '张骞并非“亲自开通一条固定道路”，而是提供地理信息、外交节点和交通想象，使后续军事与商贸网络成为可能。',
    resume: [
      { timeText: '前138-前126年', periodLabel: '第一次出使西域', title: '郎官 / 汉朝使者', nominalDuty: '出使大月氏，争取其与汉朝共同牵制匈奴。', authorityScope: '使团成员、外交文书、路线和沿途谈判，没有对西域各国的行政权。', actualInfluence: '被匈奴扣留多年后逃脱，仍继续向大月氏和大宛等地前进并带回区域情报。', modernEquivalent: '职能近似国家特命外交使者与战略情报调查官。', impact: '汉廷首次系统获得中亚和西域政治地理信息。' },
      { timeText: '前119年以后', periodLabel: '汉武帝对外战略', title: '中郎将 / 西域交通规划者', nominalDuty: '参与对西域、河西和西南方向的外交、军政与交通规划。', authorityScope: '可代表中央接触地方政权、组织使团和提供路线判断，但具体军队与郡县仍由其他官署管理。', actualInfluence: '协助汉朝经营河西、开拓西域交通，推动乌孙等外交路线。', modernEquivalent: '职能近似区域外交与战略交通顾问。', impact: '张骞经历成为丝绸之路和中外交流史的重要起点。' }
    ]
  } },
  { id: 'wei-qing', merge: {
    background: '卫青出身低微，早年在平阳公主府中生活，因姐姐卫子夫进入宫廷而获得政治机会。汉武帝对匈奴战争扩大后，他从侍从和骑将成长为大将军。',
    childhood: '早年经历反映汉代社会身份流动和宫廷机会，缺少贵族军事教育的背景使其更依赖战功、纪律和皇帝信任建立地位。',
    personality: '稳健、克制、善于组织大规模军队和后勤，较少以个人冒险争功；能够处理外戚身份与军功集团之间的政治风险。',
    policyInclination: '执行汉武帝北击匈奴和经营河套、河西的战略，重视多路协同、粮道和边郡安全，而非只追求单次战果。',
    socialContribution: '改变汉匈力量关系，收复河套、推进北方边防和交通，成为西汉军事与国家动员能力的代表。',
    impactSummary: '卫青的成功体现将门之外的军功上升路径，也说明汉武帝战争依赖骑兵、后勤、边郡和制度化指挥体系。',
    resume: [
      { timeText: '前138-前129年', periodLabel: '汉武帝对匈奴战争前期', title: '侍中 / 骑将', nominalDuty: '承担宫廷侍从和北方军事行动任务。', authorityScope: '所部骑兵、边郡侦察和战时突袭，权限随战功逐步扩大。', actualInfluence: '在龙城等战事中取得战果，证明非传统贵族出身将领也能进入帝国军政核心。', modernEquivalent: '职能近似中央警卫与战区机动作战指挥官。', impact: '为后续大规模北伐建立个人声望。' },
      { timeText: '前129-前106年', periodLabel: '汉匈战争中期', title: '大将军 / 北方战区统帅', nominalDuty: '统率汉朝北方主力军队，负责边防、远征和战后安置。', authorityScope: '多路骑兵、边郡粮道、将领调度、河套驻军和俘降处理。', actualInfluence: '组织多次远征并收复河套，成为汉武帝最重要的军事执行者和外戚集团核心。', modernEquivalent: '职能近似国防军总司令兼北方战区总指挥。', impact: '汉朝获得北方战略纵深，匈奴南下压力阶段性下降。' }
    ]
  } },
  { id: 'huo-qubing', merge: {
    background: '霍去病是卫青外甥，成长于汉武帝宫廷和军事扩张环境，少年即被任用为骑兵将领。其短暂生命集中于河西、漠南等关键战场。',
    childhood: '幼年受宫廷外戚和军政资源影响，较早接受骑兵、边疆和皇帝军事目标教育；早年具体训练细节多不详。',
    personality: '果断、快速、敢于深入敌境，善于利用骑兵机动和远程突袭；同时缺乏长期行政治理和政治生涯材料。',
    policyInclination: '以主动进攻和远程机动打击匈奴，强调破坏对方补给、牧地和指挥中心，服务汉武帝扩大边疆的战略。',
    socialContribution: '开拓河西走廊，削弱匈奴在西部的控制，推动汉朝设置郡县、屯田和交通路线。',
    impactSummary: '霍去病的军事形象来自短期高强度胜利，不能直接等同于完整国家治理能力；其战果依赖汉朝财政、骑兵和后勤体系。',
    resume: [
      { timeText: '前123年', periodLabel: '漠南战役', title: '骠姚校尉 / 骑兵将领', nominalDuty: '率骑兵深入匈奴战区，执行侦察、突袭和歼灭任务。', authorityScope: '所部骑兵、战场路线和局部战术决策，受卫青和皇帝总体部署约束。', actualInfluence: '以少量精锐快速穿插并取得战果，显示独立作战能力。', modernEquivalent: '职能近似特战部队或远程机动作战指挥官。', impact: '成为汉武帝重点培养的年轻将领。' },
      { timeText: '前121-前119年', periodLabel: '河西、漠北远征', title: '骠骑将军', nominalDuty: '统率大规模骑兵远征，负责河西和匈奴核心区域打击。', authorityScope: '远征军队、战区粮道、俘降安置和新占牧地的军事控制。', actualInfluence: '两次河西远征重创匈奴，推动汉朝控制河西走廊并打通西域方向。', modernEquivalent: '职能近似方面军机动突击司令。', impact: '河西郡县和丝绸之路前置条件形成，汉朝西北战略格局改变。' }
    ]
  } },
  { id: 'ban-gu', merge: {
    background: '班固出身史官与文学家庭，父亲班彪整理前汉史料，班固继承家学并在东汉中央完成《汉书》主要编撰工作。',
    childhood: '成长于东汉恢复秩序后的士人家庭，早年接受经学、史学和文学教育，家族档案与父亲著述为其提供重要基础。',
    personality: '重视文献、体例和正统叙事，兼具文学表达与史官谨慎；在政治上也受外戚、宫廷和仕途环境影响。',
    policyInclination: '通过断代史整理西汉制度和人物，强调王朝正统、礼制与国家秩序，既继承《史记》也调整其叙事重点。',
    socialContribution: '完成《汉书》本纪、列传和志表的重要部分，确立断代正史的结构和后世史学范式。',
    impactSummary: '班固的史学工作是家族积累、国家档案与东汉政治需要的结合，《汉书》既记录历史也参与塑造汉代正统记忆。',
    resume: [
      { timeText: '约60-80年', periodLabel: '东汉早中期', title: '校书郎 / 兰台史官', nominalDuty: '整理国家图书、档案和前代历史材料。', authorityScope: '中央藏书、史料校勘、文书编纂和官方知识传播，没有地方行政权。', actualInfluence: '利用兰台资料和家学完成《汉书》框架，成为东汉史学和文学的重要人物。', modernEquivalent: '职能近似国家档案馆研究员兼正史编纂者。', impact: '为断代史写作建立标准。' },
      { timeText: '约80-92年', periodLabel: '东汉章和年间', title: '史官 / 典军校尉相关人物', nominalDuty: '参与国家史书、文学和部分军事文书工作。', authorityScope: '主要是史料、文书和宫廷文化领域，实际行政权有限。', actualInfluence: '随窦宪北击匈奴并记录时代，个人仕途与外戚政治发生关联。', modernEquivalent: '职能近似国家历史编纂者兼军政文书顾问。', impact: '《汉书》在其身后由家族和后继者补成，成为东汉文化遗产。' }
    ]
  } },
  { id: 'sima-yi', merge: {
    background: '司马懿出身河内士族家庭，曹魏建立后逐步进入中枢，在曹丕、曹叡时期积累军政经验，最终通过高平陵之变掌握曹魏实权。',
    childhood: '成长于东汉末士族、军阀和名教秩序交错的环境，家族兄弟多人入仕，使其熟悉曹魏官僚和地方士族网络。',
    personality: '谨慎、能忍、重视保密和长期布局，擅长防御、后勤与政治等待；同时权力集中和高平陵政变使其成为权臣形象。',
    policyInclination: '以维护司马氏集团安全、控制军队和中枢为核心，军事上重防守与持久，政治上逐步削弱曹魏宗室和外戚。',
    socialContribution: '在曹魏后期维持对蜀汉、辽东等方向的军政压力，并为西晋建立准备官僚、军队和政治资源。',
    impactSummary: '司马懿的历史影响既包括军事防御和国家治理，也包括权臣夺权、政变与魏晋禅代的制度争议。',
    resume: [
      { timeText: '208-239年', periodLabel: '曹操、曹丕、曹叡时期', title: '侍中、尚书、都督等军政官员', nominalDuty: '参与中央决策、军队调度、地方防务和皇帝顾问工作。', authorityScope: '中枢文书、关中防务、对蜀军作战和地方军镇，权限随皇帝信任变化。', actualInfluence: '通过对蜀防御和辽东战事积累军功，同时避免过早卷入曹魏继承斗争。', modernEquivalent: '职能近似中央军政顾问兼重要战区司令。', impact: '为司马氏在曹魏军政体系中的上升建立基础。' },
      { timeText: '249年以后', periodLabel: '高平陵之变与司马氏掌权', title: '太尉 / 大将军 / 实际最高权臣', nominalDuty: '名义上统领军队、参与中央政务和百官协调。', authorityScope: '洛阳禁军、中央官员、地方军镇、皇帝出行和重大人事任免。', actualInfluence: '发动高平陵之变，控制曹爽集团和中枢，司马师、司马昭继承其政治资源。', modernEquivalent: '职能近似最高军事统帅兼实际政府控制者，但不等同现代宪政职位。', impact: '司马氏代魏建晋的直接政治基础形成。' }
    ]
  } },
  { id: 'zhou-yu', merge: {
    background: '周瑜出身庐江士族，与孙策结交并参与江东政权建立，孙权时期成为孙吴核心将领。赤壁之战中，他负责联吴抗曹的军事统筹。',
    childhood: '成长于东汉末江淮士族与军阀竞争环境，早年与孙策交往，熟悉水网地理、地方豪族和江东军队。',
    personality: '年轻有才、善于组织、重视礼法与外交，能够把孙权、刘备和荆州问题纳入水军与联盟战略；后世“美周郎”形象有文学加工。',
    policyInclination: '主张以江东水军和长江防线抗击北方强敌，通过联盟和控制荆州保持孙吴独立。',
    socialContribution: '建立孙吴水军与江防体系，在赤壁之战中阻止曹操南下，为三国鼎立创造关键条件。',
    impactSummary: '周瑜的历史作用不仅是赤壁火攻，而是江东政权的军队、外交、地理和后勤组织在其手中形成合力。',
    resume: [
      { timeText: '199-200年', periodLabel: '孙策经营江东', title: '中护军 / 江东军事骨干', nominalDuty: '协助孙策整合江东军队、地方势力和水陆交通。', authorityScope: '江东军队训练、战区调度、地方归附与水军建设。', actualInfluence: '参与稳固孙氏政权，使江东由私人军队向区域政权转变。', modernEquivalent: '职能近似区域军队副司令兼地方安全负责人。', impact: '为孙权继承和孙吴政权建立军事基础。' },
      { timeText: '208-210年', periodLabel: '赤壁与南郡争夺', title: '大都督 / 水军统帅', nominalDuty: '统率孙吴主力水军，负责长江防御、联盟作战和荆州攻取。', authorityScope: '水军、战船、粮道、联军协调、荆州战后驻防和地方军政。', actualInfluence: '联合刘备在赤壁击败曹操，并继续争夺南郡和长江中游。', modernEquivalent: '职能近似战区总司令兼海军舰队司令。', impact: '赤壁胜利使孙吴获得独立空间，三国鼎立开始成形。' }
    ]
  } },
  { id: 'hua-tuo', merge: {
    background: '华佗是东汉末医学人物，活动于战争、疫病和地方社会动荡时期。传统记载将其与针灸、外科、麻沸散和“五禽戏”联系起来，但具体细节需要标注史料边界。',
    childhood: '生卒、家世和系统教育情况不详，传记主要记录其行医、诊疗和与曹操等权力人物的交往。',
    personality: '重视临床观察和实际疗效，敢于根据病情提出手术或长期治疗建议；与权力中心交往的细节带有传奇色彩。',
    policyInclination: '主要贡献在医学实践而非行政政策，强调辨识病因、针药并用、外科处理和身体锻炼。',
    socialContribution: '成为中国古代医学、外科和体育养生传统的代表人物，推动后世对临床经验与医者独立性的想象。',
    impactSummary: '华佗的历史价值应区分可确认的名医传统与后世附会的麻醉、开颅等细节，但东汉医学实践高度发展是明确的时代背景。',
    disputeTabs: [
      { title: '传统医者形象', body: '传统传记强调华佗精通内外科、针灸、麻沸散和养生，形成神医形象。' },
      { title: '史料边界', body: '关于麻沸散配方、外科手术和曹操杀华佗的具体细节，应与后世文学和医学传说区分。' }
    ],
    resume: [
      { timeText: '东汉末', periodLabel: '地方行医时期', title: '医者 / 临床实践者', nominalDuty: '为地方士民、军队和患者提供诊断、针灸、药物与外科治疗。', authorityScope: '没有行政管辖权，主要通过医术、师承和患者网络发挥影响。', actualInfluence: '以多种治疗方式应对战争创伤、疫病和慢性疾病，形成名医声望。', modernEquivalent: '职能近似临床医生兼医学技术研究者。', impact: '其医术传统成为东汉医学史的重要节点。' },
      { timeText: '东汉末', periodLabel: '权力人物医疗关系', title: '宫廷与军政人物医者', nominalDuty: '为重要政治、军事人物诊疗并提出治疗方案。', authorityScope: '只拥有医疗专业建议权，没有对患者政治或军事事务的决定权。', actualInfluence: '与曹操等人的医疗交往被写入传记，反映名医与权力中心之间的信任与风险。', modernEquivalent: '职能近似国家领导人医疗专家或军队高级医官。', impact: '华佗形象成为医者专业判断与权力不耐受之间张力的文化案例。' }
    ]
  } },
  { id: 'wei-zheng', merge: {
    background: '魏征早年经历隋末群雄竞争，先后服务李密、太子李建成，玄武门之变后被唐太宗任用。其从政治对手转为谏臣，是贞观政治纳谏形象的核心。',
    childhood: '具体幼年材料有限，成长于隋末士人和军政动荡环境，较早接触地方组织、政权竞争和政治文书。',
    personality: '直率、敢于公开批评、重视制度和国家长远利益；其直谏并非没有政治判断，而是建立在对皇帝信任和公共责任的把握上。',
    policyInclination: '主张吸取隋亡教训、轻徭薄赋、慎用刑罚、限制宫廷扩张，并通过公开纳谏提高皇帝决策质量。',
    socialContribution: '塑造中国传统政治中的谏诤、君臣互信和史官记录传统，帮助后世理解贞观之治的制度与伦理面向。',
    impactSummary: '魏征的价值不只是“敢说话”，还在于把个人直谏嵌入唐初国家恢复、皇帝自我约束和官僚监督的结构。',
    resume: [
      { timeText: '617-626年', periodLabel: '隋末唐初', title: '太子洗马 / 东宫谋士', nominalDuty: '为太子李建成提供政务、文书和政治谋划。', authorityScope: '东宫属官、政治文书、宗室关系和继承竞争中的建议权。', actualInfluence: '参与李建成集团的政治活动，玄武门后身份风险极高。', modernEquivalent: '职能近似储君办公室高级政策顾问。', impact: '其身份转换成为唐太宗展示用人和收拢政治对手的典型案例。' },
      { timeText: '626-643年', periodLabel: '贞观时期', title: '谏议大夫 / 门下省重臣', nominalDuty: '审核诏令、提出谏议、参与国家政策和皇帝决策纠偏。', authorityScope: '对诏令、军政、财政、刑法和礼制提出公开意见，但不直接统率军队或地方。', actualInfluence: '多次针对征伐、宫室、继承和官员治理批评唐太宗，成为纳谏制度的象征。', modernEquivalent: '职能近似国家监察、政策审议和最高领导决策顾问。', impact: '推动贞观政治形成“君主有最终决定权、臣下有公开纠错责任”的治理形象。' }
    ]
  } },
  { id: 'fang-xuanling', merge: {
    background: '房玄龄出身山东士族，隋末投奔李世民，长期负责秦王府和唐初中央政务。其优势在于熟悉文书、人才、制度和战争后勤。',
    childhood: '接受士族经学和行政教育，隋末政治崩溃让其看到旧官僚体系与新军事集团的连接需求。',
    personality: '谨慎、善于识人、重视协作和文书细节，能够把复杂军事政治方案转化为可执行的中央政务。',
    policyInclination: '倾向以制度、人才和行政连续性巩固唐朝，支持轻徭薄赋、修订律令和三省六部协调。',
    socialContribution: '参与唐朝建国、贞观律令和官僚体系建设，是将军事征服转化为文官国家的重要宰辅。',
    impactSummary: '房玄龄与杜如晦常被并称“房谋杜断”，其作用说明国家治理需要谋划、文书、人才和执行链的持续配合。',
    resume: [
      { timeText: '618-626年', periodLabel: '秦王府与唐初统一', title: '秦王府属官 / 政务谋士', nominalDuty: '处理军政文书、人才任用、粮道和战后地方安置。', authorityScope: '秦王府官属、军队后勤、奏议文书和地方归附事务。', actualInfluence: '协助李世民在统一战争和继承竞争中建立稳定的政治与行政网络。', modernEquivalent: '职能近似战时政府办公厅主任兼战略政策顾问。', impact: '为唐初中枢和贞观宰辅体系准备人才。' },
      { timeText: '626-648年', periodLabel: '贞观时期', title: '中书令 / 尚书左仆射', nominalDuty: '参与诏令起草、中央行政协调和六部政务执行。', authorityScope: '中书门下与尚书省之间的政策协调、官员任免、财政、律令和地方行政。', actualInfluence: '与杜如晦、魏征等共同把唐太宗的政策转为制度和行政流程。', modernEquivalent: '职能近似中央政府办公与行政协调首长。', impact: '促进唐初文官体系稳定，减少开国军事集团对行政的冲击。' }
    ]
  } },
  { id: 'du-ruhui', merge: {
    background: '杜如晦出身关中士族，早年在秦王府参与谋划，擅长在复杂政治局势中迅速判断人事和行动方案。',
    childhood: '家族和士人教育使其熟悉礼法、文书和官僚传统，隋唐战争又要求其理解军政集团和继承政治。',
    personality: '果断、敏锐、重视关键节点，能够与房玄龄形成一谋一断的互补；生命较短，政治影响主要集中在唐初。',
    policyInclination: '支持皇权与官僚制度整合，强调及时处理人事、军政和继承危机，避免议而不决。',
    socialContribution: '参与秦王府和贞观初年制度建设，为唐朝开国集团稳定和中枢决策效率提供重要作用。',
    impactSummary: '杜如晦体现初唐宰辅的“决断”功能：在开国、继承和制度调整阶段，及时选择比单纯提出方案更重要。',
    resume: [
      { timeText: '617-626年', periodLabel: '秦王府政治', title: '秦王府属官 / 军政谋士', nominalDuty: '参与军事、政务、人事和继承策略的快速决策。', authorityScope: '对秦王府内部行动、将领任用和政治联盟有重要建议权。', actualInfluence: '参与玄武门之变等关键政治节点，帮助李世民稳定核心集团。', modernEquivalent: '职能近似国家最高领导人核心幕僚和危机决策顾问。', impact: '推动秦王集团从军事力量转为皇权中枢。' },
      { timeText: '626-629年', periodLabel: '贞观初期', title: '尚书右仆射', nominalDuty: '协助处理中央行政、官员任免和诏令执行。', authorityScope: '尚书省六部政务、中央官僚协调和地方行政反馈。', actualInfluence: '与房玄龄配合提高唐初政务处理速度和决策质量。', modernEquivalent: '职能近似中央行政副总协调者。', impact: '其早逝使房谋杜断成为初唐政治合作的历史定型。' }
    ]
  } },
  { id: 'xuan-zang', merge: {
    background: '玄奘生活于唐初佛教传播、国家统一和中外交通扩展时期，因求取更准确佛经和解决宗派疑义而西行天竺，回国后主持翻译。',
    childhood: '早年出家并接受佛学教育，隋唐战乱和佛教经典传承不一促使他产生远行求法的愿望。',
    personality: '求知严谨、意志坚强、重视原典和语言准确，能够在长途旅行、政治许可和翻译团队管理中坚持学术目标。',
    policyInclination: '主要影响在宗教、教育和文化交流，倾向通过原典翻译、学术辩论和制度化寺院教育提升佛学质量。',
    socialContribution: '促进中国与中亚、印度交通和佛教思想交流，建立大规模佛经翻译和知识整理传统。',
    impactSummary: '玄奘西行不只是个人旅行，也是唐代国家统一、丝路交通和宗教知识需求共同作用的结果。',
    resume: [
      { timeText: '约629-645年', periodLabel: '西行求法', title: '僧人 / 佛学旅行者', nominalDuty: '游学、访师、求取佛经并参与宗教交流。', authorityScope: '没有行政权，主要依靠寺院网络、地方保护和个人学术声望。', actualInfluence: '跨越中亚、天竺等地，记录地理、政权、宗教和社会见闻。', modernEquivalent: '职能近似宗教研究者、国际学术访问者和文化记录者。', impact: '提供中亚南亚历史和唐代中外交流的重要材料。' },
      { timeText: '645-664年', periodLabel: '唐太宗至高宗时期', title: '译经僧 / 大慈恩寺主持', nominalDuty: '主持佛经翻译、校勘、讲学和僧团教育。', authorityScope: '译场人员、经籍整理、寺院教育和佛教知识传播。', actualInfluence: '组织团队翻译大量经典，并通过《大唐西域记》影响国家和后世地理知识。', modernEquivalent: '职能近似国家级宗教文献翻译中心负责人兼学术机构主持。', impact: '推动佛学汉译和中外文化交流达到新阶段。' }
    ]
  } },
  { id: 'jian-zhen', merge: {
    background: '鉴真是唐代扬州高僧，精通戒律和寺院制度。日本僧人求法后，他在多次失败和失明后仍东渡，建立日本律宗和唐代文化传播网络。',
    childhood: '早年经历以出家、受戒和学习戒律为主，具体家庭材料有限。扬州商业和交通环境使其接触不同地区的僧侣与海上航路。',
    personality: '坚定、守戒、重视传承和实践，面对航海失败、政治阻拦与身体损伤仍坚持完成宗教使命。',
    policyInclination: '主要影响在宗教制度、教育和文化交流，强调正规受戒、寺院组织和经典传播。',
    socialContribution: '东渡日本传播戒律、医药、建筑和艺术，成为唐日文化交流与东亚佛教制度化的代表。',
    impactSummary: '鉴真东渡说明文化传播需要个人坚持、海上交通、国家关系和接受地制度共同作用，并非单向输出。',
    resume: [
      { timeText: '唐玄宗开元至天宝前期', periodLabel: '扬州佛教教育', title: '高僧 / 戒律导师', nominalDuty: '主持受戒、讲经、寺院教育和僧团管理。', authorityScope: '寺院僧团、戒律传承、信众教育和佛教仪式。', actualInfluence: '在江淮佛教网络中形成声望，受到日本求法僧侣关注。', modernEquivalent: '职能近似宗教教育机构负责人和宗教制度专家。', impact: '为东渡和东亚戒律传播准备学术与组织基础。' },
      { timeText: '743-763年', periodLabel: '鉴真东渡', title: '赴日传戒与文化使者', nominalDuty: '向日本僧团传授戒律、组织受戒并传播文化技术。', authorityScope: '日本寺院戒坛、僧团教育、经籍、医药和建筑艺术传播。', actualInfluence: '经历多次失败最终抵日，主持唐招提寺并形成长期文化影响。', modernEquivalent: '职能近似国际宗教文化交流代表兼教育机构创办人。', impact: '推动东亚佛教制度、建筑、医药和艺术交流。' }
    ]
  } },
  { id: 'li-bai', merge: {
    background: '李白生活在盛唐文化、交通和士人流动活跃的时代，曾游历各地、入长安供奉翰林，也卷入安史之乱后的政治风险。',
    childhood: '出生地与早年经历存在不同说法，少年时期接受诗文、剑术和道教文化影响，长期游历形成开阔的山川与社会想象。',
    personality: '想象力强、重视个性和自由、情感外放，既有入仕建功的政治愿望，也有对权贵和制度约束的不耐。',
    policyInclination: '不以具体行政改革见长，更多通过诗歌表达对功业、自由、山水和政治失意的态度，受道家与游侠精神影响。',
    socialContribution: '将盛唐诗歌的想象、乐府传统、山水审美和个人表达推向高峰，成为中国文学中浪漫主义诗人的代表。',
    impactSummary: '李白并非脱离政治的“纯诗人”，其入长安、永王幕府和流放经历都说明诗歌人格与唐代政治秩序相互作用。',
    resume: [
      { timeText: '约725-742年', periodLabel: '游历与求仕', title: '游士 / 诗人', nominalDuty: '无固定官职，通过交游、献赋和诗文寻求政治机会。', authorityScope: '没有行政管辖权，主要以文学声望影响士人和地方文化圈。', actualInfluence: '通过游历和诗歌建立盛唐文名，获得进入长安的机会。', modernEquivalent: '职能近似自由作家、公共文化人物和政治文化圈参与者。', impact: '形成浪漫主义诗歌和盛唐文化人格。' },
      { timeText: '742-744年', periodLabel: '唐玄宗长安时期', title: '供奉翰林', nominalDuty: '以文学才华服务宫廷，撰写应制诗文和参与文化仪式。', authorityScope: '主要是宫廷文学和文化表达，没有军政、财政或地方行政权。', actualInfluence: '获得皇帝与宫廷认可，但无法将文学声望稳定转为政治职位。', modernEquivalent: '职能近似国家文化顾问和宫廷文翰。', impact: '长安经历成为其诗歌中宫廷、权力与个人自由冲突的背景。' }
    ]
  } },
  { id: 'du-fu', merge: {
    background: '杜甫生活于唐玄宗盛世后期和安史之乱前后，长期经历科举失意、仕途困顿、战乱流离和地方生活，诗歌因此兼具个人与社会记录。',
    childhood: '出身士族家庭，早年接受儒学和诗文教育，青年时期游历吴越齐赵并寻求科举、献赋和入仕机会。',
    personality: '责任感强、重视家国和民生、观察细密，能够把个人困境转化为对战争、赋役、官僚和普通百姓的记录。',
    policyInclination: '认同儒家政治责任和国家秩序，关注减轻赋役、恢复生产、任用贤能和避免战争对民众的伤害。',
    socialContribution: '以诗歌保存安史之乱、流民、军役、家庭和地方社会经验，被后世称为“诗史”和“诗圣”。',
    impactSummary: '杜甫的价值在于把宏大政治转化为具体生活经验，诗歌不是史书替代品，却保存了官方材料难以呈现的社会感受。',
    resume: [
      { timeText: '约735-755年', periodLabel: '盛唐求仕', title: '布衣士人 / 诗人', nominalDuty: '通过科举、献赋和交游寻求官职。', authorityScope: '没有稳定行政权，主要依靠士人网络和文学声望。', actualInfluence: '积累社会观察和诗歌表达能力，形成对官僚与民生问题的持续关注。', modernEquivalent: '职能近似公共知识分子和政策观察型作家。', impact: '为安史之乱后的社会书写提供个人经验基础。' },
      { timeText: '755-770年', periodLabel: '安史之乱及战后', title: '左拾遗、地方参军等小官 / 战乱记录者', nominalDuty: '参与谏议、文书和地方行政，后在蜀地、夔州等地生活。', authorityScope: '官职时期仅能影响诏议和小范围行政，战乱中常失去稳定管辖区域。', actualInfluence: '以亲历、听闻和地方生活写下兵役、饥荒、流民和家国危机。', modernEquivalent: '职能近似基层公务员兼社会记录者。', impact: '形成“诗史”传统，影响后世现实主义文学与历史记忆。' }
    ]
  } },
  { id: 'an-lushan', merge: {
    background: '安禄山出身边地多族群环境，凭语言、骑射和军功进入唐玄宗、杨贵妃及边镇政治中心，兼领范阳、平卢、河东等重镇后发动叛乱。',
    childhood: '早年家世和族属存在不同记载，边疆贸易、军镇和多民族社会塑造其机会；他通过军功和宫廷关系超越传统身份限制。',
    personality: '善于逢迎、利用关系和组织军队，外表亲近宫廷而实际积累独立权力；政治判断带有强烈的个人野心和安全焦虑。',
    policyInclination: '以边镇军队、财赋和个人集团为基础争夺中央权力，缺乏稳定整合唐朝官僚和地方社会的长期方案。',
    socialContribution: '其叛乱暴露唐代节度使、边军、财政和宫廷权力结构的矛盾，成为唐由盛转衰的关键负面人物。',
    impactSummary: '安史之乱不能只理解为安禄山个人反叛，唐玄宗的边镇政策、宦官与外戚关系、军队资源集中共同制造了风险。',
    disputeTabs: [
      { title: '个人野心视角', body: '安禄山利用玄宗宠信和边镇兵力发动叛乱，个人权力欲是直接导火索。' },
      { title: '制度结构视角', body: '节度使长期掌握军队、财赋和地方人事，中央对边镇监督不足，个人叛乱因此拥有超常破坏力。' }
    ],
    resume: [
      { timeText: '约732-755年', periodLabel: '唐玄宗后期边镇', title: '平卢、范阳等节度使', nominalDuty: '负责东北边防、军队、粮道和对契丹、奚等势力的防御。', authorityScope: '边镇军队、军饷、屯田、地方人事和与周边政权的军事外交。', actualInfluence: '兼领多个重镇后形成庞大独立军政集团，实际权力超过普通地方官。', modernEquivalent: '职能近似多个战区总司令兼区域行政长官，属于高风险军镇权力。', impact: '边镇权力集中成为安史之乱的军事基础。' },
      { timeText: '755-757年', periodLabel: '安史之乱前期', title: '叛军领袖 / 燕帝', nominalDuty: '以叛军和新政权名义统辖占领地区。', authorityScope: '叛军兵力、占领城市、粮道和临时官僚，实际控制受战场和内部斗争限制。', actualInfluence: '攻陷洛阳、长安并重创唐廷，但内部继承和军队关系很快失控。', modernEquivalent: '不宜类比现代职位，属于军事割据政权首领。', impact: '其叛乱改变唐代财政、军镇和中央权力结构数百年。' }
    ]
  } },
  { id: 'guo-ziyi', merge: {
    background: '郭子仪是唐朝名将，安史之乱爆发后承担收复长安、洛阳和维持唐室的核心军事任务，晚年又在藩镇与朝廷之间保持政治安全。',
    childhood: '出身军人家庭或军镇环境的具体材料有限，早期仕途主要依靠军功和唐代边防体系上升。',
    personality: '稳健、善于忍让和协调，能在皇帝、宦官、藩镇和回纥之间保持弹性；晚年政治自保能力尤其突出。',
    policyInclination: '以恢复唐室、维持军队秩序和避免藩镇失控为目标，重视军事胜利与政治安抚并用。',
    socialContribution: '参与平定安史、维护唐朝延续，形成忠诚、功高不危和将帅与中央关系的经典形象。',
    impactSummary: '郭子仪的成功不仅来自战场，也来自对朝廷猜忌、地方军镇和外援关系的谨慎处理。',
    resume: [
      { timeText: '755-763年', periodLabel: '安史之乱', title: '朔方节度使 / 唐军统帅', nominalDuty: '统率朔方军及援军，收复关中、长安和洛阳。', authorityScope: '战区军队、粮道、回纥援军协调、收复地区和战后安抚。', actualInfluence: '与李光弼等共同承担反攻，成为唐廷重新获得军事实力的核心将领。', modernEquivalent: '职能近似战区总司令兼战后秩序恢复负责人。', impact: '帮助唐室避免立即覆亡，但藩镇问题由此长期化。' },
      { timeText: '763-781年', periodLabel: '唐代宗至德宗前期', title: '中书令 / 汾阳王 / 藩镇协调者', nominalDuty: '参与中央军政、边疆防务和地方军镇安抚。', authorityScope: '可调度部分军队、处理藩镇关系、代表朝廷谈判与处理边疆危机。', actualInfluence: '以谦退和不结党避免被皇帝猜忌，维持军功集团与中央之间的平衡。', modernEquivalent: '职能近似国家级军政顾问兼军区协调者。', impact: '郭子仪成为唐代后期少数功高而能善终的将领。' }
    ]
  } },
  { id: 'huang-chao', merge: {
    background: '黄巢活动于唐末财政困窘、盐业控制、灾荒和藩镇割据加剧的时期，早年与盐商、流民和地方武装网络相关，后成为大规模起义领袖。',
    childhood: '家世与早年生活记载不完整，传统材料强调其屡试不第和盐业背景，具体细节应与后世反唐叙事区分。',
    personality: '具有动员、组织和宣传能力，能够利用唐末社会不满迅速扩张；但占领城市后缺乏稳定财政、官僚和地方治理方案。',
    policyInclination: '以反抗唐廷税赋、盐禁和地方压迫为号召，后期试图建立新政权，但治理体系和军政联盟未能巩固。',
    socialContribution: '迫使唐末社会矛盾公开爆发，推动盐业、民变、藩镇和中央衰败进入王朝更替过程。',
    impactSummary: '黄巢起义既有社会反抗基础，也有军事集团竞争和地方控制局限；其失败不能抹去对唐末国家结构的破坏作用。',
    disputeTabs: [
      { title: '社会反抗视角', body: '盐业管控、赋税、灾荒和地方压迫为起义提供了广泛社会基础。' },
      { title: '政权治理视角', body: '起义军占领长安后未能建立稳定的粮税、官僚和地方联盟，说明军事动员不等于国家治理。' }
    ],
    resume: [
      { timeText: '875-880年', periodLabel: '唐末起义扩张', title: '起义军领袖', nominalDuty: '组织武装、控制交通与粮道、争取地方民众和盐商支持。', authorityScope: '起义军、流动作战区域、占领城市和临时分配体系。', actualInfluence: '由地方武装扩展为横跨数省的大规模军队，迫使唐廷依赖藩镇和外援。', modernEquivalent: '不能类比现代职位，属于大规模武装反抗组织领袖。', impact: '改变唐末军事力量和中央财政格局。' },
      { timeText: '880-884年', periodLabel: '长安政权与败亡', title: '大齐政权首领', nominalDuty: '名义上统辖占领区行政、军队、粮税和官员任命。', authorityScope: '长安及部分关中地区的临时政权、军队和资源分配。', actualInfluence: '占领长安但无法稳定控制藩镇、粮道和地方社会，最终被唐军与地方势力击败。', modernEquivalent: '不宜类比现代政府职位。', impact: '为朱温和五代军镇崛起创造了直接政治空间。' }
    ]
  } },
  { id: 'fan-zhongyan', merge: {
    background: '范仲淹出身寒微，早年刻苦求学并通过科举入仕，经历地方治理、边防和庆历新政。他的政治理想把儒家责任、财政民生和国家边防联系起来。',
    childhood: '幼年家庭环境并不优裕，早年寄居和求学经历强化了自立、勤学与对普通社会生活的理解。',
    personality: '有责任感、敢于担当、重视实际治理和公共名节，能够在边防与中央改革之间承担风险。',
    policyInclination: '主张整顿吏治、选贤任能、减轻赋役、发展教育和改善边防，以渐进改革提升北宋国家能力。',
    socialContribution: '主持庆历新政、建设边防和兴办教育，形成“先天下之忧而忧”的士大夫公共责任形象。',
    impactSummary: '范仲淹的影响不止在名句和文学，也在于把地方行政、边防经验和政治改革连接为北宋士大夫的国家方案。',
    resume: [
      { timeText: '约1020-1040年', periodLabel: '北宋地方任官', title: '知县、知州 / 边防官', nominalDuty: '负责州县行政、赋税、治安、水利和边防军政。', authorityScope: '所属州县户籍、仓储、诉讼、公共工程和地方军队协调。', actualInfluence: '在地方和西北边防积累治理经验，提出兼顾民生与军备的政策。', modernEquivalent: '职能近似地方政府主要负责人兼区域防务协调者。', impact: '地方实践成为庆历改革的重要现实基础。' },
      { timeText: '1043-1045年', periodLabel: '庆历新政', title: '参知政事 / 改革主持者', nominalDuty: '参与中央政务并提出官僚、教育、选官和边防改革。', authorityScope: '官员考核、科举学校、地方行政、财政军政和改革诏令协调。', actualInfluence: '与欧阳修、富弼等推动新政，但受到既得利益、执行成本和政治反对而退居地方。', modernEquivalent: '职能近似副政府首脑兼中央改革协调者。', impact: '为王安石变法提供问题清单和改革前史。' }
    ]
  } },
  { id: 'ouyang-xiu', merge: {
    background: '欧阳修生活在北宋文官政治和古文复兴时期，兼任文学家、史学家和政治官员，参与庆历新政并主持《新唐书》等编纂。',
    childhood: '幼年家境清寒，母亲以荻画地教字的故事虽有文学加工，却反映其早年求学和科举上升经历。',
    personality: '重视文章、史识和人才培养，能容纳不同风格；政治上坚持原则但也会在党争与改革压力中调整。',
    policyInclination: '支持文官政治、教育和选官改革，强调文章与道德、历史与现实治理相结合。',
    socialContribution: '推动北宋古文运动、培养苏轼等后辈、参与史书编纂和地方治理，深刻影响宋代文化和士大夫网络。',
    impactSummary: '欧阳修是文学、史学和政治三条线的连接者，其最大影响之一是建立北宋文人公共文化和人才提携网络。',
    resume: [
      { timeText: '1030-1045年', periodLabel: '北宋中期文官政治', title: '馆阁校勘 / 谏官', nominalDuty: '校订典籍、参与诏议并向皇帝提出政治意见。', authorityScope: '中央文书、史籍校勘、谏议和官员考察建议。', actualInfluence: '参与庆历新政和古文运动，成为文官舆论与政策讨论的重要节点。', modernEquivalent: '职能近似国家文献机构研究员兼政策监察官。', impact: '推动文官公共表达和古文写作。' },
      { timeText: '约1050-1070年', periodLabel: '地方治理与史书编纂', title: '知州、翰林学士 / 史官', nominalDuty: '负责州县行政、中央文翰和国家史书编纂。', authorityScope: '地方税赋、司法、治安和水利，以及史书、诏令和文学政策。', actualInfluence: '主持《新唐书》编纂、提携苏轼等人，并以地方经验参与政治议论。', modernEquivalent: '职能近似地方政府负责人兼国家文史机构负责人。', impact: '奠定宋代古文与史学传统，影响宋元文学。' }
    ]
  } },
  { id: 'sima-guang', merge: {
    background: '司马光出身士大夫家庭，经历仁宗、英宗、神宗和哲宗时期，主持编纂《资治通鉴》，并在王安石变法中成为旧党的主要代表。',
    childhood: '接受经学和史学教育，幼年砸缸故事体现后世对其机敏、克制和重理性的文化塑造。',
    personality: '谨慎、守成、重视史鉴和官僚程序，反对快速改变制度；政治上有原则，也可能低估财政和国家主动干预的必要性。',
    policyInclination: '主张恢复祖宗法度、减少扰民和政策反复，反对青苗、免役等新法的强制性和执行风险。',
    socialContribution: '主持《资治通鉴》编纂，提供从战国到五代的编年史框架，并成为宋代改革争论的重要反方。',
    impactSummary: '司马光既是史学家也是政治家，历史叙述与政策立场相互影响，不能把《资治通鉴》当作完全脱离现实政治的作品。',
    disputeTabs: [
      { title: '守成视角', body: '司马光强调祖宗法度、减轻民间扰动和避免财政政策变形，代表北宋旧法与文官程序立场。' },
      { title: '改革批评视角', body: '其政策偏向可能无法充分解决北宋财政、军备和贫富问题，反映守成与国家能力之间的张力。' }
    ],
    resume: [
      { timeText: '1060-1084年', periodLabel: '《资治通鉴》编纂', title: '史官 / 编年史主持者', nominalDuty: '组织史料、校勘、编年和政治评价，服务皇帝与士大夫教育。', authorityScope: '史馆人员、国家档案、编纂体例和历史解释方向。', actualInfluence: '统筹大量材料形成通史，并将历史因果与现实政治判断结合。', modernEquivalent: '职能近似国家历史编纂工程总负责人。', impact: '塑造中国传统“以史为鉴”的政治史学传统。' },
      { timeText: '1085-1086年', periodLabel: '哲宗初年', title: '宰相 / 旧法主持者', nominalDuty: '主持中央政务，调整新法、人事和财政政策。', authorityScope: '中书门下、官员任免、法令调整和中央行政协调。', actualInfluence: '短期废止部分新法并试图恢复旧制，但新旧党争未能真正消除。', modernEquivalent: '职能近似政府首脑兼政策纠偏负责人。', impact: '北宋党争和政策反复进入更深阶段。' }
    ]
  } },
  { id: 'su-shi', merge: {
    background: '苏轼生活在北宋新旧党争、地方行政和文化繁荣时期，既是诗词文书画大家，也曾在多地任官，直接接触水利、赈济、司法和民生。',
    childhood: '成长于眉山士大夫家庭，接受父苏洵和弟苏辙影响，早年科举成功后进入中央文官体系。',
    personality: '旷达、敏锐、重情义和实际民生，善于把政治挫折转为文学表达；同时政治立场并非简单固定，常根据具体政策提出不同意见。',
    policyInclination: '反对新法执行中过度扰民和财政逐利，但不等于拒绝所有改革，重视地方治理、赈灾、水利和司法公正。',
    socialContribution: '推动宋代诗词、散文、书画和地方文化发展，留下关于民生、自然、政治和个人精神的丰富表达。',
    impactSummary: '苏轼的历史价值在于文学与行政实践并存：赤壁、黄州和杭州等经历让作品具有具体的制度与社会背景。',
    resume: [
      { timeText: '1061-1079年', periodLabel: '北宋中央与地方任官', title: '制科入仕 / 地方官', nominalDuty: '参与中央文书、科举和州县行政，处理赋税、司法、水利与赈济。', authorityScope: '任职州县的户籍、仓储、诉讼、工程、灾荒救济和地方官吏。', actualInfluence: '在杭州、密州等地以务实治理赢得民众声誉，同时因反对部分新法受到政治牵连。', modernEquivalent: '职能近似地方政府主要负责人兼公共政策执行者。', impact: '地方经验丰富了其文学和政治思想。' },
      { timeText: '1080-1101年', periodLabel: '元祐与绍圣以后', title: '翰林学士 / 贬谪官与文化人物', nominalDuty: '参与诏令、礼制和中央文翰，贬谪时期承担有限地方行政。', authorityScope: '中央时期掌握文书和政策表达，地方时期掌握一州或一地的有限治理权。', actualInfluence: '在党争、贬谪和地方生活中持续创作，影响士人、民间和后世审美。', modernEquivalent: '职能近似中央文化顾问、地方行政官和公共知识分子。', impact: '形成宋代士大夫“出处进退”与文化人格的经典形象。' }
    ]
  } },
  { id: 'shen-kuo', merge: {
    background: '沈括是北宋官员、科学家和《梦溪笔谈》作者，活动于王安石变法、边防、工程和知识生产高度活跃的时代。',
    childhood: '出身官宦家庭，幼年随父亲任所接触不同地方，较早观察地理、水利、医药和地方生产。',
    personality: '好奇、重实证、善于跨学科记录，能在官僚、军事、工程和自然研究之间转换；政治经历也有失误和争议。',
    policyInclination: '支持国家改善财政、边防和工程能力，重视测量、历法、军器和地方知识服务于行政。',
    socialContribution: '在天文、历法、数学、地理、医药、工程和技术史方面留下系统记录，《梦溪笔谈》保存大量宋代知识。',
    impactSummary: '沈括的科学实践嵌入北宋官僚国家，不是脱离政治的个人爱好；其观察、记录和验证方法具有重要历史价值。',
    resume: [
      { timeText: '约1060-1070年', periodLabel: '北宋地方与中央任官', title: '地方官 / 馆阁学士', nominalDuty: '处理州县行政、工程、财政和中央文书、历法知识。', authorityScope: '地方水利、仓储、税赋与中央典籍、观测和技术咨询。', actualInfluence: '把地方观察和技术知识带入国家行政，逐渐形成跨学科声望。', modernEquivalent: '职能近似地方行政官兼国家技术政策研究者。', impact: '为后续工程、天文和技术写作积累材料。' },
      { timeText: '1070-1085年', periodLabel: '熙宁元丰时期', title: '三司使、翰林学士 / 边防官', nominalDuty: '参与财政、军事、文书和边疆事务。', authorityScope: '财政收支、军器、边防、官僚文书和技术项目协调。', actualInfluence: '参与王安石新法和西北边防，虽有政治失误仍保存大量技术与行政经验。', modernEquivalent: '职能近似中央财政技术官、军工顾问和边疆行政负责人。', impact: '《梦溪笔谈》成为宋代科学技术和官僚知识的综合记录。' }
    ]
  } },
  { id: 'zhu-xi', merge: {
    background: '朱熹生活在南宋偏安、宋金战争和士大夫重建秩序的时代，继承二程理学并完成理气、心性、格物和教育体系的综合。',
    childhood: '出身士大夫家庭，早年接受儒学和科举教育，后长期游学、讲学、任地方官，在学术与现实治理之间往返。',
    personality: '严谨、勤学、重视道德实践和教育秩序，能够组织学派与书院；其思想也因强调等级伦理而受到现代多角度评价。',
    policyInclination: '主张以理学、教育、礼制和地方教化重建社会秩序，强调格物致知、修身和君臣父子伦理。',
    socialContribution: '集成宋代理学、整理四书章句、推动书院教育，深刻影响元明清科举、教育和社会伦理。',
    impactSummary: '朱熹既是思想家也是教育制度塑造者，其影响来自著述、讲学、书院和后世国家选定，而非单一哲学命题。',
    disputeTabs: [
      { title: '理学传统', body: '朱熹以理气、心性、格物致知建立系统哲学，强化儒学作为教育和社会秩序的解释框架。' },
      { title: '现代反思', body: '后世科举化和礼教化可能把复杂理学压缩为服从规范，评价时应区分朱熹原始思想、国家制度化和社会实践。' }
    ],
    resume: [
      { timeText: '1150-1170年', periodLabel: '南宋地方任官与游学', title: '县令、知南康军等地方官', nominalDuty: '负责地方赋税、司法、学校、灾荒和治安。', authorityScope: '所属州县户籍、仓储、诉讼、水利和学校教育。', actualInfluence: '以地方治理和书院教育实践检验理学，形成“经世与讲学”结合的路径。', modernEquivalent: '职能近似地方政府主要负责人兼教育行政负责人。', impact: '地方经验成为其政治伦理和教育思想的现实基础。' },
      { timeText: '1170-1200年', periodLabel: '南宋理学集成', title: '书院山长 / 理学宗师', nominalDuty: '讲学、编书、培养弟子并参与礼制和教育政策讨论。', authorityScope: '书院、门徒、经典解释和地方士人网络，没有全国行政权。', actualInfluence: '整理四书、构建理学体系并通过弟子和书院扩大影响。', modernEquivalent: '职能近似大学校长、思想学派领袖和教育政策顾问。', impact: '其学说被元明清国家教育体系吸收，影响延续数百年。' }
    ]
  } },
  { id: 'yuan-hao', merge: {
    background: '元昊是党项拓跋氏领袖，继承西北部落、河套和河西资源，在宋辽之间争取独立国家地位，1038年建立西夏。',
    childhood: '成长于边疆多族群、贸易和军事环境，接受党项传统与中原制度双重影响，早年即参与部落和边防事务。',
    personality: '有建国雄心、善于整合部落与制度，能够在宋辽之间周旋；后期统治和继承冲突也显露强硬与控制欲。',
    policyInclination: '主张独立称帝、建立文字和官制，通过军事、贸易和外交维护西夏在河套、河西的战略利益。',
    socialContribution: '建立西夏国家，创制西夏文字、推动制度和佛教文化，形成宋辽夏多政权交流格局。',
    impactSummary: '元昊不是简单的边疆反叛者，而是把党项政治资源转为具有皇帝、文字和官僚体系的区域国家。',
    resume: [
      { timeText: '约1028-1038年', periodLabel: '党项首领时期', title: '党项大首领', nominalDuty: '整合部落、领地、军队和对宋辽外交。', authorityScope: '部落联盟、河套资源、贸易通道和对外战争。', actualInfluence: '逐步摆脱宋朝羁縻与封号，建立独立政权所需的军事和政治基础。', modernEquivalent: '职能近似区域政权最高领袖和军政统帅。', impact: '为西夏建国奠定制度和疆域基础。' },
      { timeText: '1038-1048年', periodLabel: '西夏建国初期', title: '西夏皇帝', nominalDuty: '统领西夏军政、财政、官制、外交和宗教礼仪。', authorityScope: '西夏部落与州县、军队、河西贸易、对宋辽战争和文字官制。', actualInfluence: '称帝、创制文字、建立官署并与宋长期战争和议和。', modernEquivalent: '国家元首与最高行政、国防决策者的职能近似。', impact: '宋辽夏三足格局形成，西北历史从属关系发生改变。' }
    ]
  } },
  { id: 'wanyan-aguda', merge: {
    background: '完颜阿骨打是女真完颜部首领，活动于辽朝衰落、女真部落整合和宋辽关系变化时期，1115年建立金朝。',
    childhood: '成长于女真部落、森林贸易、狩猎和辽朝边疆压力环境，早年积累部落联盟、军事和资源分配经验。',
    personality: '善于整合部落、重视军纪和战机，能够把分散女真力量转为高机动军事组织；其政权建设仍处于早期阶段。',
    policyInclination: '以统一女真、摆脱辽朝控制和扩大资源空间为核心，通过猛安谋克、军事联盟和对辽战争建立国家。',
    socialContribution: '建立金朝并迅速改变辽宋格局，开启女真政权从部落联盟向帝国国家转型。',
    impactSummary: '金朝建立既是女真内部整合结果，也利用辽衰落和宋朝外交选择，最终成为北宋靖康之变的前置力量。',
    resume: [
      { timeText: '约1112-1115年', periodLabel: '女真统一与反辽', title: '女真部落联盟首领', nominalDuty: '整合部落、组织军队并处理与辽朝关系。', authorityScope: '部落人口、战士、猎场、贸易和联盟承诺。', actualInfluence: '击败或吸收女真竞争者，建立共同军政组织。', modernEquivalent: '职能近似区域军事联盟领袖。', impact: '为金朝建国提供统一女真和军队基础。' },
      { timeText: '1115-1123年', periodLabel: '金朝建立与灭辽前期', title: '金太祖 / 金朝开国皇帝', nominalDuty: '统辖新建金朝军政、官制、部落和对辽战争。', authorityScope: '猛安谋克、战争动员、俘降安置、土地分配和对外外交。', actualInfluence: '建立金国号并击败辽军，金朝迅速取得东北和北方战略优势。', modernEquivalent: '开国君主与最高军事统帅的职能近似。', impact: '辽朝衰亡、宋金关系和北宋灭亡的历史链条由此启动。' }
    ]
  } },
  { id: 'kublai-khan', merge: {
    background: '忽必烈是蒙古宗王，继承草原军事传统并吸收中原官僚、财政和城市治理经验，最终建立元朝并完成对南宋的征服。',
    childhood: '成长于蒙古帝国扩张和宗王竞争环境，接受骑射、军政、联盟与中原文化影响，早年即关注农业、税赋和汉地治理。',
    personality: '重视人才和制度整合，能在蒙古贵族、色目官僚、汉地士人和南宋降臣之间平衡；同时统治依赖征服和等级秩序。',
    policyInclination: '主张以蒙古军事权威结合中原行省、赋税和官僚体系，推动多区域帝国统一和交通管理。',
    socialContribution: '建立元朝、推行行省制、扩展欧亚交通和多族群交流，改变中国政治疆域与行政结构。',
    impactSummary: '忽必烈的建国是蒙古征服与中原治理之间的长期调适，元朝制度既有草原帝国特征，也吸收宋金行政遗产。',
    resume: [
      { timeText: '1251-1260年', periodLabel: '漠南与汉地经营', title: '蒙古宗王 / 汉地军政负责人', nominalDuty: '统领部分军队、治理汉地属地并筹集粮税。', authorityScope: '军队、州县官吏、粮税、屯田和与汉地士人的政治关系。', actualInfluence: '任用汉地和中亚人才，建立适合农业区域的财政和行政经验。', modernEquivalent: '职能近似战区行政长官兼区域军事统帅。', impact: '为忽必烈建元和南下灭宋准备国家治理能力。' },
      { timeText: '1260-1294年', periodLabel: '元朝建立与统一', title: '大汗 / 元朝皇帝', nominalDuty: '统辖蒙古帝国东部、元朝全国行政、军队、财政和外交。', authorityScope: '中书省、行省、军队、户籍赋税、交通驿站和对宋战争。', actualInfluence: '以大都为中心建立元朝，完成南宋征服并组织多族群帝国。', modernEquivalent: '国家元首与最高行政、国防决策者的职能近似。', impact: '行省制、驿站和欧亚交流影响后世，但等级制度和战争成本也造成社会矛盾。' }
    ]
  } },
  { id: 'guo-shoujing', merge: {
    background: '郭守敬是元代天文学家、水利工程师和历法专家，受到忽必烈重用，参与水利、天文观测和授时历制定。',
    childhood: '出身河北技术和地方士人环境，早年受刘秉忠等人影响，接触水利、数学和工程实践。',
    personality: '重实测、善工程、重视标准和协作，能够把天文学理论转为观测仪器、测量网络和国家历法。',
    policyInclination: '主要服务国家时间、交通、水利和行政需求，强调实地测量、统一标准和技术官僚协作。',
    socialContribution: '主持大规模天文观测、编制授时历、改进仪器并参与水利工程，是元代科学与国家治理结合的代表。',
    impactSummary: '郭守敬的科学成就依赖国家资源、跨地区观测和官僚组织，体现古代技术如何进入帝国行政体系。',
    resume: [
      { timeText: '1260-1280年', periodLabel: '元初水利与工程', title: '都水监官 / 工程负责人', nominalDuty: '负责河道、漕运、水利和工程测量。', authorityScope: '河渠、闸坝、漕运路线、工匠和工程质量。', actualInfluence: '把工程测量与地方治理结合，提高元朝北方交通和粮运能力。', modernEquivalent: '职能近似国家水利工程总工程师。', impact: '为元代大都、漕运和天文工程建设积累实践。' },
      { timeText: '1280-1290年', periodLabel: '授时历制定', title: '太史令 / 国家天文技术负责人', nominalDuty: '统筹天文观测、历法编制和时间标准。', authorityScope: '观测站、天文仪器、历官、数据校验和全国历法发布。', actualInfluence: '组织南北多地观测，制定授时历并改进简仪、仰仪等仪器。', modernEquivalent: '职能近似国家天文台负责人兼标准时间与历法机构负责人。', impact: '授时历成为元代科技和国家标准化的重要成果。' }
    ]
  } },
  { id: 'ming-taizu', merge: {
    background: '朱元璋出身贫苦农民家庭，经历灾荒、寺院生活和红巾军起义，最终在群雄竞争中建立明朝。即位后重点重建户籍、土地、军卫和皇权体系。',
    childhood: '幼年经历饥荒、家庭离散和社会底层生活，早年入皇觉寺，亲历元末基层赋役与地方秩序崩溃。',
    personality: '意志坚强、猜疑谨慎、重视组织和控制，对民生有现实感但对功臣、官僚和地方势力高度不信任。',
    policyInclination: '强化皇权、整顿户籍和里甲、恢复农业、建立卫所与严密监察，倾向以高压法令防止地方和功臣坐大。',
    socialContribution: '结束元末分裂、重建统一王朝和基层行政，推动户籍、赋役、军卫与科举制度重新运行。',
    impactSummary: '明太祖的建国同时包含社会恢复和皇权高度集中两面，洪武制度为明代长期治理提供框架，也埋下政治高压与制度僵化问题。',
    resume: [
      { timeText: '1352-1368年', periodLabel: '元末群雄竞争', title: '红巾军将领 / 江南政权领袖', nominalDuty: '组织军队、占领地方并建立粮税、官吏和盟友网络。', authorityScope: '所部军队、占领区户籍粮道、地方官任命和战时行政。', actualInfluence: '从郭子兴部将成长为江南最大军事政治集团，先后击败陈友谅、张士诚等对手。', modernEquivalent: '职能近似地方军政集团最高负责人。', impact: '完成从起义军到统一政权的组织转化。' },
      { timeText: '1368-1398年', periodLabel: '明朝洪武时期', title: '皇帝 / 开国制度设计者', nominalDuty: '统筹全国行政、财政、军队、司法、礼制和皇位继承。', authorityScope: '中书省及六部、州县、卫所、户籍赋役、官员任免和监察司法。', actualInfluence: '废丞相、强化六部与皇帝直接决策，建立里甲、卫所和严密监察体系。', modernEquivalent: '国家元首兼最高行政、国防和司法决策者的职能近似。', impact: '明代皇权和基层国家结构基本定型。' }
    ]
  } },
  { id: 'ming-chengzu', merge: {
    background: '朱棣是朱元璋之子，封燕王镇守北平，建文帝削藩后发动靖难之役。即位后迁都北京、经营北方并通过郑和远航扩大明朝外交。',
    childhood: '成长于明初宗室和军事家庭，早年接受北方军镇、骑射和皇室教育，长期接触蒙古边防与燕地军政。',
    personality: '果断、善于军事机动和权力组织，重视皇权威势、交通和文治；继承合法性争议使其对政治记忆和文官控制十分敏感。',
    policyInclination: '强化北方边防和皇帝直接权力，迁都北京、修运河、编纂大典并开展朝贡外交，兼顾军事与文化威望。',
    socialContribution: '推动北京成为全国政治中心，扩大明代海上交流和文献整理，巩固明朝北方与多区域国家格局。',
    impactSummary: '永乐盛世的建设与靖难夺位不可分割，朱棣既扩大国家能力，也加深了皇权、宗室和文官之间的紧张。',
    resume: [
      { timeText: '1370-1402年', periodLabel: '燕王与靖难之役', title: '藩王 / 北平军政首领', nominalDuty: '镇守北平、负责北方边防和宗室封地行政。', authorityScope: '燕地军队、边防粮道、地方军政和与蒙古势力交涉。', actualInfluence: '依托北方军镇和部属网络起兵，击败建文帝军队并攻入南京。', modernEquivalent: '职能近似边区军政长官兼宗室政治集团领袖。', impact: '改变明初继承顺序和中央权力结构。' },
      { timeText: '1402-1424年', periodLabel: '永乐时期', title: '皇帝 / 帝国建设者', nominalDuty: '统筹全国军政、财政、都城、边疆和对外关系。', authorityScope: '迁都、运河、北伐、行省和卫所、内阁文书、海上外交与官员任免。', actualInfluence: '以北京和北方边防为中心重塑国家空间，并支持郑和、永乐大典等大型工程。', modernEquivalent: '国家元首与最高行政、国防、外交决策者。', impact: '明朝政治地理和对外影响显著扩展。' }
    ]
  } },
  { id: 'yu-qian', merge: {
    background: '于谦是明代文官和军事防御人物，土木堡之变后面对英宗被俘、瓦剌逼近和京师人心动摇，主持北京保卫战。',
    childhood: '出身士大夫家庭，接受科举、经学和行政教育，早期在地方和边疆任官，熟悉漕运、军粮和治安。',
    personality: '刚直、果断、重视国家安全和制度责任，在皇帝危机时敢于承担决策；也因此与复辟后的皇权和政治集团发生冲突。',
    policyInclination: '主张坚守京师、整顿军队、保障粮道和稳定民心，反对在没有准备时迁都或屈服。',
    socialContribution: '组织北京保卫战、维护明朝政权延续，成为文官承担国防责任和危机治理的代表。',
    impactSummary: '于谦的历史作用体现文官、军队、皇权和国家安全的复杂关系，后世忠臣形象建立在真实的危机决策基础上。',
    resume: [
      { timeText: '约1430-1449年', periodLabel: '明代地方与漕运任官', title: '巡抚、兵部官员', nominalDuty: '负责地方行政、漕运、军粮和边防事务。', authorityScope: '州县税粮、河运、军饷、边镇和地方官吏协调。', actualInfluence: '积累处理财政、交通和军政危机的经验，进入中央国防决策层。', modernEquivalent: '职能近似省级行政长官兼国防后勤协调官。', impact: '为土木堡后接管明军和京师防务准备能力。' },
      { timeText: '1449-1450年', periodLabel: '北京保卫战', title: '兵部尚书 / 京师防御总协调者', nominalDuty: '统筹京师防御、军队调度、粮饷和外交。', authorityScope: '京营、各地勤王军、城防、军粮、将领任免和战时诏议。', actualInfluence: '拥立景泰帝、组织守城并击退瓦剌，维持明朝中央政权。', modernEquivalent: '职能近似国防部长兼首都防卫总指挥。', impact: '避免明朝因皇帝被俘而立即崩溃。' }
    ]
  } },
  { id: 'wang-yangming', merge: {
    background: '王守仁即王阳明，生活于明代中期官僚、宦官和地方叛乱并存的环境，兼具心学思想家、地方官和军事统帅身份。',
    childhood: '出身士大夫家庭，早年接受程朱理学和科举教育，经历廷杖、贬谪贵州和龙场悟道等思想转折。',
    personality: '重视主体实践、临事判断和道德自觉，能够把讲学思想转化为平叛、治理和教育行动；其心学也存在后世解释分化。',
    policyInclination: '主张知行合一、致良知和以民为本，行政上强调因地制宜、教化与军事安抚结合。',
    socialContribution: '建立阳明心学，平定宁王之乱并治理地方，深刻影响明清思想、东亚教育和近代启蒙。',
    impactSummary: '王阳明的思想不能与军事行政经历分开理解，心学的“实践”既是道德修养，也是面对现实政治和社会危机的行动方法。',
    disputeTabs: [
      { title: '心学传统', body: '心即理、致良知和知行合一强调主体道德实践，反对把学习停留在外在知识积累。' },
      { title: '历史评价', body: '后世既把心学视为个人解放与实践哲学，也批评其可能被简化为主观意念，需结合王阳明的行政与军事实践理解。' }
    ],
    resume: [
      { timeText: '1506-1515年', periodLabel: '龙场与地方任官', title: '贵州驿丞、知县、巡抚', nominalDuty: '负责地方行政、治安、教化和军政协调。', authorityScope: '州县赋税、司法、学校、土司关系、军队和地方叛乱处置。', actualInfluence: '在边远地区建立行政与教化秩序，形成知行合一的治理经验。', modernEquivalent: '职能近似基层政府负责人兼地方安全与教育协调者。', impact: '地方实践成为阳明心学成熟的重要背景。' },
      { timeText: '1519-1520年', periodLabel: '宁王之乱', title: '巡抚 / 平叛统帅', nominalDuty: '统筹江西及周边军队，平定宁王朱宸濠叛乱。', authorityScope: '战区军队、地方官吏、粮道、俘降和战后安抚。', actualInfluence: '快速调动地方资源并擒获宁王，展现文官军事动员能力。', modernEquivalent: '职能近似省级行政长官兼战区指挥官。', impact: '使心学思想与现实政治、军事行动紧密关联。' }
    ]
  } },
  { id: 'qi-jiguang', merge: {
    background: '戚继光是明代抗倭和北方边防将领，先在东南沿海整顿军队，后在蓟州训练边军，形成戚家军和严密的军事组织。',
    childhood: '出身世袭武官家庭，早年接受军籍、骑射和边防教育，面对倭寇和军队腐败形成强烈的训练意识。',
    personality: '重纪律、重训练、善于结合地形和武器，能够把不同来源士兵组织成稳定部队；政治上依赖张居正等支持。',
    policyInclination: '主张军队专业化、编制化和实战训练，重视鸳鸯阵、兵器配合、营垒和边防工程。',
    socialContribution: '平定东南倭患、整顿北方边军，留下《纪效新书》等军事训练和兵器经验。',
    impactSummary: '戚继光的抗倭成功来自军队改革、地方协作、海防和财政支持，不应只归因于个人勇武。',
    resume: [
      { timeText: '1555-1567年', periodLabel: '东南抗倭', title: '参将、总兵 / 戚家军统帅', nominalDuty: '负责沿海军队、海防、城寨和倭寇清剿。', authorityScope: '浙江、福建沿海军队训练、军粮、战船、屯寨和地方协防。', actualInfluence: '招募和训练新军，使用鸳鸯阵与协同战术，逐步稳定东南海防。', modernEquivalent: '职能近似战区陆军司令兼海防部队负责人。', impact: '提高明军基层专业化和抗倭作战效率。' },
      { timeText: '1567-1583年', periodLabel: '蓟州边防', title: '蓟镇总兵 / 北方边防将领', nominalDuty: '负责长城沿线军队、关隘、营寨和对蒙古防御。', authorityScope: '蓟镇军队、边墙工程、军饷、骑兵训练和战时调度。', actualInfluence: '与谭纶、张居正合作整顿边防，建立更系统的训练和防御体系。', modernEquivalent: '职能近似北方战区司令兼边防工程负责人。', impact: '把东南抗倭经验转化为北方防御制度。' }
    ]
  } },
  { id: 'li-shizhen', merge: {
    background: '李时珍出身医药家庭，明代医疗实践、药物贸易和本草知识积累为其研究提供条件。他长期修订《本草纲目》，以实地观察和访谈纠正旧说。',
    childhood: '早年随父学习医药，曾参加科举但最终以医学和自然观察为主要道路，长期接触地方药材与民间经验。',
    personality: '重实证、勤考察、能辨析古书与实际药性，具有长期整理和纠错的耐心。',
    policyInclination: '主要影响在医学知识和药物分类，强调实地采集、鉴别、炮制和临床经验，而非行政政策。',
    socialContribution: '编写《本草纲目》，系统整理药物、动物、植物和矿物知识，影响中国医学、博物学和世界科学史。',
    impactSummary: '李时珍的成就不是简单“发现新药”，而是通过实地考察、分类和文献批校，重建古代药物知识体系。',
    resume: [
      { timeText: '明代中期', periodLabel: '地方行医与药物考察', title: '医者 / 本草研究者', nominalDuty: '诊疗、采药、鉴别药材并整理医药经验。', authorityScope: '没有行政权，主要通过患者、药商、医家和地方知识网络获取材料。', actualInfluence: '走访山野、医家和药材市场，积累大量实物与口述资料。', modernEquivalent: '职能近似临床医生兼药物研究和田野调查者。', impact: '为《本草纲目》提供实证基础。' },
      { timeText: '约1552-1593年', periodLabel: '《本草纲目》编纂', title: '医学知识总整理者', nominalDuty: '编纂、分类、校勘和解释药物知识。', authorityScope: '掌握书稿体例、材料鉴别和知识分类，没有国家行政管辖权。', actualInfluence: '修正前人错误、补充地方经验，形成药物学百科式著作。', modernEquivalent: '职能近似国家级药典编纂者和博物学研究者。', impact: '《本草纲目》成为明代科学与医学著述代表。' }
    ]
  } },
  { id: 'xu-guangqi', merge: {
    background: '徐光启生活在晚明财政、边防、农业和西学传入的转折时期，兼具官员、农学家、数学家和天主教徒身份。',
    childhood: '出身江南士人家庭，接受传统经学和科举教育，后与利玛窦等交流，逐步把西方数学、天文与中国经世问题结合。',
    personality: '务实、好学、重视实验和国家应用，能在儒学、天主教和技术知识之间寻找合作，但也受晚明党争和仕途限制。',
    policyInclination: '主张改革历法、发展农业、改进火器和吸收西方数学天文，以实学服务国家财政、军政和民生。',
    socialContribution: '参与历法、农学、数学和中西文化交流，翻译《几何原本》，推动晚明西学东渐。',
    impactSummary: '徐光启的价值在于把西学从异域知识转为中国国家治理和学术实践资源，体现技术交流需要本土问题牵引。',
    resume: [
      { timeText: '约1600-1615年', periodLabel: '晚明入仕与西学交流', title: '翰林、礼部与地方官员', nominalDuty: '参与科举文书、礼制、地方行政和国家政策讨论。', authorityScope: '中央文书、地方赋税、礼仪与官员建议，实际权力随任职变化。', actualInfluence: '与利玛窦合作翻译数学著作，把西学带入士人学术圈。', modernEquivalent: '职能近似中央政策官员兼科技文化交流负责人。', impact: '为中西数学和科学知识在中国传播建立入口。' },
      { timeText: '1615年以后', periodLabel: '历法与实学实践', title: '礼部尚书 / 历法改革参与者', nominalDuty: '参与历法、天文、农业和军事技术政策。', authorityScope: '国家历法、天文官署、农业书籍、火器和技术人员协调。', actualInfluence: '推动崇祯历书等历法改革方向，主张以实学应对晚明国家危机。', modernEquivalent: '职能近似科技、农业和历法政策主管。', impact: '成为明清之际科学、农业和中西交流的重要桥梁。' }
    ]
  } },
  { id: 'li-zicheng', merge: {
    background: '李自成出身陕西普通社会，经历驿卒、灾荒和明末财政军政危机，加入农民军后成为重要领袖，1644年攻入北京。',
    childhood: '早年生活在关中灾荒、赋税和驿站压力环境，具体家庭材料有限，但基层经历使其熟悉军粮、交通和民众不满。',
    personality: '善于动员、行动果断、具有个人号召力，能够在流动战争中整合部众；但建立稳定官僚、财政和地方秩序的能力不足。',
    policyInclination: '以减税、均平和反抗明廷为号召，后期试图建立大顺政权，但政策、军队纪律和地方治理未能稳定。',
    socialContribution: '推动明末社会矛盾集中爆发，攻陷北京并促成明清鼎革的直接转折。',
    impactSummary: '李自成不能只被写成“闯王”或亡国责任者，他的兴起与明末财政、灾荒、军镇和基层社会危机相连。',
    disputeTabs: [
      { title: '社会危机视角', body: '明末税赋、军饷、灾荒和土地问题为农民军提供了广泛动员基础。' },
      { title: '政权失败视角', body: '大顺军入京后未能及时稳定官僚、粮税和军队纪律，使吴三桂、清军和地方势力获得反攻机会。' }
    ],
    resume: [
      { timeText: '约1630-1643年', periodLabel: '明末农民军', title: '起义军领袖', nominalDuty: '组织军队、控制关中和中原交通、建立粮税与盟友网络。', authorityScope: '流动作战区域、军队编制、粮道、占领城镇和临时政务。', actualInfluence: '从部将成长为农民军核心，利用明军内耗和地方不满扩大势力。', modernEquivalent: '不能类比现代职位，属于大规模武装反抗领袖。', impact: '成为明朝财政军政崩溃的主要外部压力。' },
      { timeText: '1644年', periodLabel: '大顺建国与北京', title: '大顺皇帝', nominalDuty: '统辖新政权的军队、官员、粮税和都城秩序。', authorityScope: '北京及占领区临时行政、军队和资源分配。', actualInfluence: '攻入北京导致崇祯帝自尽，但未能迅速整合吴三桂、山海关和江南资源。', modernEquivalent: '不宜类比现代职位。', impact: '为清军入关和明清鼎革创造了直接时机。' }
    ]
  } },
  { id: 'nurhaci', merge: {
    background: '努尔哈赤是建州女真首领，统一女真各部、建立八旗和后金，活动于明末辽东贸易、边防和部落竞争环境。',
    childhood: '早年经历家族冲突、部落竞争和明朝边疆贸易体系，继承父祖资源后通过战争、联姻和盟誓扩大权力。',
    personality: '坚忍、善于组织、重视军政纪律和资源分配，能把部落关系转化为长期政治联盟。',
    policyInclination: '以统一女真、扩大土地人口和摆脱明朝控制为目标，实行八旗组织、军事分配和对外战争。',
    socialContribution: '建立后金和八旗制度，为清朝建国、入关和多族群帝国形成奠定军事政治基础。',
    impactSummary: '努尔哈赤的历史作用不只是“清朝开创者”，更在于把女真社会组织、战争动员和政权合法性制度化。',
    resume: [
      { timeText: '1583-1615年', periodLabel: '统一女真各部', title: '建州女真首领', nominalDuty: '领导部落、处理贸易、战争、盟约和明朝边疆关系。', authorityScope: '部落人口、战士、猎场、贸易、俘获人口和联盟承诺。', actualInfluence: '逐步击败竞争部落，建立八旗前身和稳定的军政分配体系。', modernEquivalent: '职能近似区域政治军事联盟领袖。', impact: '为后金建国提供统一女真和组织基础。' },
      { timeText: '1616-1626年', periodLabel: '后金时期', title: '后金大汗', nominalDuty: '统辖后金军政、旗制、土地分配和对明战争。', authorityScope: '八旗、粮道、军事征伐、俘降安置、盟友和辽东边境。', actualInfluence: '建立后金并在萨尔浒等战役中击败明军，扩大辽东控制。', modernEquivalent: '开国君主兼最高军事统帅的职能近似。', impact: '改变明末东北力量格局，为皇太极改国号和清军入关奠基。' }
    ]
  } },
  { id: 'kangxi-emperor', merge: {
    background: '康熙帝玄烨幼年即位，面对鳌拜、三藩、台湾、准噶尔和沙俄等内外问题，逐步建立清朝长期稳定的中央统治。',
    childhood: '幼年接受满洲、汉文和帝王教育，亲政前经历鳌拜集团控制，形成对皇权、军队和信息的敏感。',
    personality: '勤勉、好学、善于用人和处理多族群关系，具有军事与行政能力；晚年继承安排和财政问题也存在局限。',
    policyInclination: '强化中央、平定割据、维护边疆，同时笼络汉族士人、修史编书和保留八旗、理藩院等多元治理机构。',
    socialContribution: '平三藩、收复台湾、签订尼布楚条约并稳定边疆，推动清朝从入关政权转为多区域帝国。',
    impactSummary: '康熙统治兼具统一、文化和高压控制多面，清前期稳定依赖军事、财政、旗制、官僚和皇帝个人协调。',
    resume: [
      { timeText: '1661-1669年', periodLabel: '康熙初年', title: '幼年皇帝 / 辅政体系下的最高名义权力', nominalDuty: '名义上统领清朝军政、财政和官僚。', authorityScope: '诏令和皇室事务受辅政大臣影响，地方军政由督抚和旗营执行。', actualInfluence: '接受帝王教育并观察鳌拜集团，逐步准备亲政。', modernEquivalent: '国家元首的名义职能近似，不对应现代摄政制度。', impact: '为清除鳌拜和皇权亲政建立条件。' },
      { timeText: '1673-1684年', periodLabel: '三藩与台湾', title: '皇帝 / 统一战争最高决策者', nominalDuty: '统筹全国军队、财政、官员和边疆。', authorityScope: '八旗绿营、粮饷、将领任免、三藩战区、海上军事和台湾治理。', actualInfluence: '平定三藩、派施琅收复台湾，重建中央对南方和海疆的控制。', modernEquivalent: '国家元首兼最高国防、财政决策者。', impact: '清朝全国统治基本稳固。' },
      { timeText: '1689-1722年', periodLabel: '康熙后期', title: '多区域帝国统治者', nominalDuty: '处理北方、西北、东北和内地官僚、财政与文化政策。', authorityScope: '理藩院、八旗、督抚、边疆军队、朝贡外交和国家文献工程。', actualInfluence: '通过亲征、会盟、制度和笼络士人维持多族群帝国，但继承问题长期悬而未决。', modernEquivalent: '国家元首兼最高行政、国防和外交决策者。', impact: '清前期疆域与行政体系成熟。' }
    ]
  } },
  { id: 'yongzheng-emperor', merge: {
    background: '雍正帝胤禛继承康熙晚年复杂的财政、继承和地方治理问题，执政时间虽短，却以高强度行政和财政整顿强化清朝中枢。',
    childhood: '成长于康熙皇子竞争和宗室教育环境，长期担任亲王并接触钱粮、奏折和地方事务，形成细密的行政风格。',
    personality: '勤政、谨慎、控制欲强，重视数字、奏折和官员责任；高压用人和文字狱也构成其统治的另一面。',
    policyInclination: '推行摊丁入亩、耗羡归公、官员考成、改土归流和军机处等措施，强化财政、吏治和皇帝直接控制。',
    socialContribution: '提高清朝财政透明度和中央行政效率，推动内地赋役和西南边疆制度整合。',
    impactSummary: '雍正改革把康熙时期的疆域成果转化为更强的中央财政和行政机器，为乾隆时期繁荣提供制度基础。',
    resume: [
      { timeText: '1722-1735年', periodLabel: '雍正时期', title: '皇帝 / 财政与吏治改革中枢', nominalDuty: '统筹清朝行政、财政、军政、边疆和官员任免。', authorityScope: '军机处、六部、督抚、钱粮、赋役、盐政和边疆改土归流。', actualInfluence: '通过密折、考成和直接任命压缩中间环节，推动财政与官僚制度快速整顿。', modernEquivalent: '国家元首兼最高行政、财政和国防决策者。', impact: '形成清代高效而集中的皇权行政模式。' },
      { timeText: '1726-1735年', periodLabel: '西南与边疆治理', title: '边疆制度整合者', nominalDuty: '处理土司、流官、军队和边疆财政关系。', authorityScope: '西南土司改流、驻军、赋税、地方官员和边疆交通。', actualInfluence: '借鄂尔泰等人推进改土归流，扩大中央对西南的行政控制。', modernEquivalent: '职能近似中央边疆治理和区域行政整合负责人。', impact: '清朝多民族帝国的地方治理更制度化。' }
    ]
  } },
  { id: 'lin-zexu', merge: {
    background: '林则徐是清代道光时期的官员，长期处理河工、盐政、地方治理和禁烟，1839年赴广东主持禁烟，成为中国近代转折的重要人物。',
    childhood: '出身福建士大夫家庭，接受经学与科举教育，早年地方任官经历使其熟悉财政、漕运、水利和基层行政。',
    personality: '勤勉、严谨、重视实务和公共责任，禁烟立场坚定；面对外部军事技术和国际关系时也逐渐意识到传统知识不足。',
    policyInclination: '主张禁烟、整顿海防和地方行政，逐步支持搜集外国资料、了解西方海军和技术以应对外患。',
    socialContribution: '主持虎门销烟、推动开眼看世界，为魏源等人的海防与世界知识整理提供直接材料。',
    impactSummary: '林则徐既是传统清官，也是近代转型前的学习者；禁烟行动需要放在贸易、外交、白银和英国军事压力中理解。',
    resume: [
      { timeText: '约1820-1838年', periodLabel: '地方督抚与内政整顿', title: '巡抚、河道和盐政官员', nominalDuty: '负责地方行政、漕运、河工、盐政、财政和治安。', authorityScope: '省级州县、钱粮、河道工程、盐务和地方官吏。', actualInfluence: '以严整行政和实务能力获得道光帝信任，进入禁烟政策核心。', modernEquivalent: '职能近似省级政府主要负责人兼财政、水利和治安协调者。', impact: '积累处理国家级财政和社会问题的经验。' },
      { timeText: '1839-1841年', periodLabel: '广东禁烟与鸦片战争', title: '钦差大臣 / 禁烟与海防负责人', nominalDuty: '代表皇帝处理广东禁烟、贸易、海防和外交危机。', authorityScope: '广东地方官员、海防军队、查禁鸦片、外商交涉和战时行政。', actualInfluence: '收缴销毁鸦片并组织防务，战事失利后被调任和流放。', modernEquivalent: '职能近似中央特派地方危机处理官兼区域海防负责人。', impact: '禁烟成为鸦片战争导火索，也推动中国知识界转向了解世界。' }
    ]
  } },
  { id: 'sun-yat-sen', merge: {
    background: '孙中山出生于晚清社会，接受传统和新式教育，经历海外求学、革命组织、武昌起义和民国建立，成为推翻清朝和共和政治的代表人物。',
    childhood: '成长于广东侨乡和近代中外交流环境，少年时期接触基督教教育、海外社会与西方政治观念，形成对清廷改革能力的批评。',
    personality: '理想坚定、善于组织和宣传，重视革命纲领与国际支持；政治实践中也面对军阀、财政、组织分裂和理念落地困难。',
    policyInclination: '提出民族、民权、民生三民主义，主张推翻君主专制、建立共和，并逐步重视政党、军队和社会动员。',
    socialContribution: '领导兴中会、同盟会和革命运动，推动清帝退位与共和建立，塑造近代中国民族国家和政治现代化话语。',
    impactSummary: '孙中山的历史作用包括革命组织、思想宣传和政权转型，辛亥革命的成功还依赖清廷、袁世凯和各省军政力量共同作用。',
    disputeTabs: [
      { title: '革命思想视角', body: '三民主义将民族独立、共和政治和社会民生联系起来，推动清末政治想象发生变化。' },
      { title: '政治实践视角', body: '革命后政权建设受到地方军政、财政和组织分裂限制，思想目标与现实国家能力之间存在距离。' }
    ],
    resume: [
      { timeText: '1894-1911年', periodLabel: '清末革命', title: '革命组织者 / 政治思想家', nominalDuty: '组织革命团体、筹款、宣传和武装起义。', authorityScope: '同盟会及海外网络、革命军、报刊和地方起义联系。', actualInfluence: '通过兴中会、同盟会和多次起义传播反清与共和理念。', modernEquivalent: '职能近似政党创始人、政治运动领袖和公共思想家。', impact: '使共和革命成为清末重要政治选项。' },
      { timeText: '1912-1925年', periodLabel: '民国初期', title: '临时大总统 / 政党与国家建设者', nominalDuty: '代表新政权处理国家元首、政府组建、军政和外交事务。', authorityScope: '中央政府、临时约法、外交承认和政党、军队关系，实际权力受袁世凯与地方军阀制约。', actualInfluence: '推动共和制度和国民党组织重建，尝试以政党、军队和地方动员统一国家。', modernEquivalent: '国家元首兼政党领袖的职能近似。', impact: '成为近代中国共和政治和革命传统的重要象征。' }
    ]
  } },
  { id: 'zhang-jue', merge: {
    background: '张角是东汉末太平道首领，活动于灾荒、疫病、土地兼并和地方豪强扩张的社会环境。其宗教组织把治病、救济和末世信仰转化为大规模政治动员。',
    childhood: '家世和幼年材料缺乏，主要记载集中于其行医、传教和组织信徒。应把具体神迹与东汉末社会现实区分开。',
    personality: '善于组织、宣传和建立跨地区信仰网络，能够把民众不满转化为共同身份；但起义后缺少稳定国家治理经验。',
    policyInclination: '以宗教救济、反抗宦官和地方压迫为号召，主张以新秩序替代东汉，但政权制度并未成熟。',
    socialContribution: '组织黄巾起义，揭示东汉基层社会、宗教网络和中央权力失控之间的关系。',
    impactSummary: '张角不能只被写成“农民起义领袖”，太平道的传播、医疗和组织能力是理解黄巾军迅速扩大的关键。',
    disputeTabs: [
      { title: '宗教组织视角', body: '太平道通过符水、治病、教义和基层传道建立跨地域网络，使分散民众形成共同身份。' },
      { title: '政治危机视角', body: '黄巾起义的爆发与灾荒、赋役、土地和地方豪强有关，不能只归结于宗教煽动。' }
    ],
    resume: [
      { timeText: '约170-184年', periodLabel: '东汉末太平道传播', title: '宗教领袖 / 民间组织者', nominalDuty: '传道、治病、组织信徒和提供宗教救济。', authorityScope: '地方信徒、传教网络、符水医疗和基层互助组织。', actualInfluence: '通过三十六方等组织形成跨州郡动员网络，突破了地方官府的信息边界。', modernEquivalent: '职能近似宗教社群领袖兼民间互助组织者。', impact: '为184年大规模起义形成组织基础。' },
      { timeText: '184年', periodLabel: '黄巾起义', title: '起义首领', nominalDuty: '统筹起义军动员、据点、粮道和政治号召。', authorityScope: '早期黄巾军及地方响应者，缺乏稳定州县行政和财政。', actualInfluence: '黄巾起义冲击东汉并促使州牧、豪强和军阀扩权。', modernEquivalent: '不能类比现代职位，属于宗教性武装反抗领袖。', impact: '东汉中央权威遭受根本打击。' }
    ]
  } },
  { id: 'guan-yu', merge: {
    background: '关羽是刘备集团的重要将领，经历徐州、荆州和樊城等战场。其死后被历代国家、宗教和民间共同塑造成忠义、武圣与地方保护神。',
    childhood: '早年家世和具体经历记载有限，主要线索是与刘备、张飞结交并在东汉末军阀竞争中形成军事身份。',
    personality: '勇猛、重承诺和名分、具有强烈自尊；同时在荆州与孙吴关系处理、用人和联盟判断上存在局限。',
    policyInclination: '以维护刘备集团、控制荆州和恢复汉室为目标，重视军纪与忠义，但对复杂外交联盟缺少足够弹性。',
    socialContribution: '参与蜀汉早期军事扩张，后世关帝信仰和忠义叙事深刻影响民间社会、商业伦理和国家祭祀。',
    impactSummary: '历史上的关羽与文化中的关公需要并置理解：前者是荆州军政将领，后者是历代国家和民间共同塑造的伦理符号。',
    disputeTabs: [
      { title: '历史人物', body: '关羽是刘备集团将领，长期控制荆州部分地区，最终在孙吴和曹魏夹击中失败。' },
      { title: '文化形象', body: '关公形象在宋元明清不断被加封，忠义、守信和武圣意义远超三国史料本身。' }
    ],
    resume: [
      { timeText: '约200-208年', periodLabel: '刘备集团早期', title: '将军 / 荆州军事骨干', nominalDuty: '统率部队、守卫据点并协助刘备争夺地方。', authorityScope: '所部军队、城镇防御、粮道和战时俘降。', actualInfluence: '在刘备流转荆州、益州前后保持军队和集团凝聚力。', modernEquivalent: '职能近似战区野战部队指挥官。', impact: '成为蜀汉军事集团的核心成员。' },
      { timeText: '208-219年', periodLabel: '荆州与樊城战事', title: '前将军 / 荆州方面统帅', nominalDuty: '负责荆州北部防务、曹魏方向作战和地方军政。', authorityScope: '荆州部分郡县、军队、粮道、外交与对曹魏战线。', actualInfluence: '水淹七军后声势达到高峰，但与孙权联盟破裂、后方空虚，最终败亡。', modernEquivalent: '职能近似方面军司令兼区域军政长官。', impact: '关羽失荆州成为三国格局和蜀汉战略转折点。' }
    ]
  } },
  { id: 'wang-xizhi', merge: {
    background: '王羲之生活于东晋门阀和士族文化环境，既任地方与中央官职，也以书法、兰亭雅集和行草艺术影响后世。',
    childhood: '出身琅邪王氏士族，接受家族书学和名士教育，南渡后的门阀社会为其文化身份提供资源。',
    personality: '重视自然、交游与审美表达，书法实践严谨而有创造性；政治上更接近士族官僚而非权力中心。',
    policyInclination: '没有系统改革政策，主要通过文书、书法和士族交游参与国家文化与官僚秩序。',
    socialContribution: '被后世尊为“书圣”，推动行书、草书和书法审美发展，兰亭文化成为中国文人传统的重要象征。',
    impactSummary: '王羲之的书法成就与东晋士族文化、文书行政和书写教育相关，不能只理解为脱离社会的个人天才。',
    resume: [
      { timeText: '约330-350年', periodLabel: '东晋士族仕途', title: '地方官与中央官员', nominalDuty: '处理州县行政、军政和中央文书事务。', authorityScope: '任职地区的赋税、司法、治安与官僚文书。', actualInfluence: '凭借士族身份和行政经验参与东晋官僚体系，同时保持文化声望。', modernEquivalent: '职能近似地方行政官兼中央文书官员。', impact: '官僚与书法身份共同构成其文化影响。' },
      { timeText: '约353年', periodLabel: '兰亭雅集', title: '士族文化领袖 / 书法家', nominalDuty: '组织文人交游、书写和文化表达，没有独立行政辖区。', authorityScope: '士人社交、书法教育和文书审美传播。', actualInfluence: '《兰亭序》成为书法与文人雅集的经典，后世摹本和教育传播不断扩大影响。', modernEquivalent: '职能近似文化机构领袖和书法艺术家。', impact: '奠定中国书法艺术的经典标准。' }
    ]
  } },
  { id: 'tao-yuanming', merge: {
    background: '陶渊明生活于东晋末至刘宋初的政权更替、门阀政治和地方社会环境，曾任小官，最终归隐田园，以诗文表达对官场和自然生活的选择。',
    childhood: '出身没落士族，接受儒学和文人教育，家族经济与政治资源有限，使其需要在仕途和田园之间反复选择。',
    personality: '重视诚实、自由和内在节制，不愿长期屈从官场礼法；“不为五斗米折腰”具有后世概括和文化加工。',
    policyInclination: '没有系统国家政策，作品关注基层生活、劳动、自然和个人伦理，对官僚功名保持距离。',
    socialContribution: '开创田园诗传统，以散文、诗歌和隐逸形象影响中国文学、士人生活观和后世审美。',
    impactSummary: '陶渊明的“归隐”既是个人选择，也是东晋政治不稳定、士族资源有限和田园经济现实交织的结果。',
    resume: [
      { timeText: '约393-405年', periodLabel: '东晋地方任官', title: '县令、参军等小官', nominalDuty: '处理县级文书、赋税、司法和地方事务。', authorityScope: '基层户籍、仓储、诉讼、治安和上级命令执行。', actualInfluence: '短期任官后因不愿适应官场关系而辞职，保留个人生活选择。', modernEquivalent: '职能近似基层行政官员。', impact: '仕途经验成为其归隐文学和社会批评的背景。' },
      { timeText: '405年以后', periodLabel: '浔阳田园生活', title: '隐逸作家 / 田园生活实践者', nominalDuty: '不再承担国家官职，以家庭劳动和文学创作维持生活。', authorityScope: '无行政权，主要影响文学、士人价值和后世隐逸传统。', actualInfluence: '以《归去来兮辞》《桃花源记》等作品表达理想社会和个人伦理。', modernEquivalent: '职能近似自由作家与乡村生活思想者。', impact: '田园诗与隐逸人格成为中国文学的重要传统。' }
    ]
  } },
  { id: 'xie-an', merge: {
    background: '谢安出身东晋陈郡谢氏，长期以名士身份活动，淝水之战前后进入中枢，承担国家防务、士族协调和皇权稳定。',
    childhood: '成长于门阀士族家庭，接受经学、清谈和政治交往教育，早年多次拒绝或推迟仕途，保持名士声望。',
    personality: '镇定、善于协调、重视士族和军队合作，能够在危机时保持政治信心；其从容形象也被后世文学化。',
    policyInclination: '主张以士族联盟、稳健外交和军事防守维护东晋，避免北伐冒进和内部权力冲突。',
    socialContribution: '主持淝水战前的国家协调，维护东晋江南政权，并代表东晋士族政治的组织与文化能力。',
    impactSummary: '谢安的功劳在于把士族声望、中央决策和谢玄军队联系起来，淝水胜利是政治、军事与地缘条件共同作用。',
    resume: [
      { timeText: '约360-377年', periodLabel: '东晋士族与地方政治', title: '征西大将军府、尚书等官员', nominalDuty: '参与中央政务、地方军政和士族协调。', authorityScope: '中央文书、官员任免、地方军镇和宗族政治关系。', actualInfluence: '从名士转为中枢重臣，逐步建立对桓氏、谢氏和皇权之间的平衡。', modernEquivalent: '职能近似中央政府高级协调者兼政治顾问。', impact: '为淝水时期的政治稳定准备中枢资源。' },
      { timeText: '378-385年', periodLabel: '淝水之战前后', title: '宰相 / 国家危机协调者', nominalDuty: '统筹东晋财政、军队、外交和士族政治。', authorityScope: '中枢官僚、荆扬防线、谢玄北府军和对前秦的战略决策。', actualInfluence: '任用谢玄、谢石等，保持内部稳定并支持淝水防御。', modernEquivalent: '职能近似政府首脑兼国家安全协调者。', impact: '东晋政权延续数十年，北方重新分裂。' }
    ]
  } },
  { id: 'zu-chongzhi', merge: {
    background: '祖冲之生活于南北朝，兼具数学家、天文学家和历法研究者身份，活动于南朝宋齐政权和江南士人技术网络。',
    childhood: '出身祖传天文历法家庭，早年接受数学、历法和经典教育，具体生活材料较少。',
    personality: '严谨、重计算和观测、能长期修订旧说，对数字精度和历法实用性要求很高。',
    policyInclination: '主要服务历法、时间标准和国家礼制，不以一般行政政策见长，强调精确计算和实测。',
    socialContribution: '把圆周率精确到小数范围、改进历法并参与机械设计，是中国古代数学和天文的代表人物。',
    impactSummary: '祖冲之的成就依赖家学、官府历法和南北朝知识传播，科学成果与国家时间秩序和农业社会密切相关。',
    resume: [
      { timeText: '南朝宋齐时期', periodLabel: '历法与数学研究', title: '官员 / 数学天文学者', nominalDuty: '参与历法、天文观测和国家时间计算。', authorityScope: '历官、观测数据、数学计算和历法改革建议。', actualInfluence: '改进历法并进行高精度圆周率计算，形成超越一般官员的学术声望。', modernEquivalent: '职能近似国家天文机构数学家和历法专家。', impact: '推动中古数学与天文学精度发展。' },
      { timeText: '约462-500年', periodLabel: '大明历与科技实践', title: '太守、长水校尉等 / 科学行政人物', nominalDuty: '兼任地方行政和历法、技术工作。', authorityScope: '任职地方的行政事务，以及国家历法和技术项目建议。', actualInfluence: '把数学和天文成果应用于历法、礼制与农业时间安排。', modernEquivalent: '职能近似地方行政官兼国家科技专家。', impact: '形成科学知识与行政服务相结合的传统。' }
    ]
  } },
  { id: 'han-yu', merge: {
    background: '韩愈生活于中唐安史之乱后，担任文官、教育和地方官职，倡导古文与儒学复兴，试图回应佛道传播、藩镇和官僚秩序问题。',
    childhood: '出身官宦家庭但早年经历家庭变故，接受经学教育并多次科举、求仕，形成强烈的儒家道统意识。',
    personality: '立场鲜明、敢于批评、文章雄健，政治上重视名教和中央秩序；性格刚直也使其屡遭贬谪。',
    policyInclination: '主张恢复儒家道统、强化礼法和官僚责任，反对佛教过度扩张及地方、宫廷势力削弱中央。',
    socialContribution: '推动古文运动、教育和儒学复兴，文章、师说和祭十二郎文影响中国散文与士人伦理。',
    impactSummary: '韩愈的古文运动既是文体革新，也与中唐政治秩序和儒家公共责任重建相关。',
    resume: [
      { timeText: '约793-820年', periodLabel: '中唐中央与地方任官', title: '监察御史、国子博士、地方官', nominalDuty: '参与监察、教育、文书和州县行政。', authorityScope: '官员监察、国子监教育、州县赋税司法和地方治理。', actualInfluence: '以文章和奏疏批评藩镇、佛教和官僚失责，频繁升降贬谪。', modernEquivalent: '职能近似监察官、国家教育官和地方行政官。', impact: '把儒学、官僚责任与古文写作连接起来。' },
      { timeText: '819年', periodLabel: '迎佛骨事件', title: '刑部侍郎 / 政治批评者', nominalDuty: '参与中央刑法、诏议和重大政治政策讨论。', authorityScope: '中央司法、政策奏议和官员意见表达，没有独立军政权。', actualInfluence: '上疏反对迎佛骨并被贬潮州，个人政治风险转化为后世思想象征。', modernEquivalent: '职能近似中央司法官兼公共政策批评者。', impact: '强化儒学复兴与古文运动的历史记忆。' }
    ]
  } },
  { id: 'bai-juyi', merge: {
    background: '白居易生活于中唐，经历科举、翰林、谏官、地方刺史和晚年闲居，诗歌关注政治、赋税、民生和个人生活。',
    childhood: '出身士人家庭，少年随家迁徙并勤学，早年科举成功进入文官体系，重视诗歌的社会传播和讽谕功能。',
    personality: '表达通俗、观察细密、关心民生，能在政治理想和个人退守之间调整；晚年也形成与官场保持距离的生活方式。',
    policyInclination: '主张减轻赋役、整顿吏治、限制宫廷和藩镇弊端，认为诗歌应当能够被普通人理解并反映社会问题。',
    socialContribution: '推动新乐府和现实主义诗歌，保存中唐宫廷、妇女、军役、税赋和市民生活经验。',
    impactSummary: '白居易把文学表达、官僚责任和民间传播结合起来，使诗歌成为社会观察和公共伦理的媒介。',
    resume: [
      { timeText: '约800-815年', periodLabel: '中唐中央任官', title: '翰林学士、左拾遗', nominalDuty: '起草诏令、参与谏议和皇帝政策咨询。', authorityScope: '中央文书、官员监察、财政赋税与民生政策奏议。', actualInfluence: '通过奏疏和讽谕诗批评宫廷、赋税和官僚问题。', modernEquivalent: '职能近似中央政策顾问、文书官和监察官。', impact: '新乐府与政治诗形成社会影响。' },
      { timeText: '约815-846年', periodLabel: '地方刺史与晚年', title: '州刺史 / 地方治理者', nominalDuty: '负责州县行政、财政、司法、水利和社会救济。', authorityScope: '州县户籍、赋税、仓储、诉讼、公共工程和地方官吏。', actualInfluence: '在杭州、苏州等地留下水利和公共治理记忆，晚年转向闲居与文学。', modernEquivalent: '职能近似地方政府主要负责人兼公共文化人物。', impact: '地方经验丰富了其现实主义诗歌。' }
    ]
  } },
  { id: 'wen-tianxiang', merge: {
    background: '文天祥是南宋末士大夫、宰相和抗元人物，面对临安陷落、朝廷投降和元军推进，组织抵抗并最终被俘。',
    childhood: '出身江西士大夫家庭，接受儒学和科举教育，早年仕途体现宋代文官国家的经典路径。',
    personality: '重视名节、忠诚和公共责任，具有组织和军事行动能力；其“正气”形象由真实选择与后世忠烈教育共同塑造。',
    policyInclination: '主张保卫南宋、拒绝以投降换取个人安全，重视地方动员、军队和士大夫责任。',
    socialContribution: '参与南宋末抗元，留下《过零丁洋》《正气歌》等作品，成为忠贞、民族气节和文官责任的文化象征。',
    impactSummary: '文天祥的历史意义不在于改变南宋军事败局，而在于在政权崩溃时以个人选择保存了士大夫政治伦理和文学记忆。',
    resume: [
      { timeText: '1260-1275年', periodLabel: '南宋文官仕途', title: '进士、地方官与中央官员', nominalDuty: '处理州县行政、财政、监察和中央诏议。', authorityScope: '地方赋税司法、中央文书、官员任免和战时政策建议。', actualInfluence: '以科举和文官身份进入南宋政治核心，积累危机治理经验。', modernEquivalent: '职能近似地方行政官兼中央政府高级公务员。', impact: '为南宋末危机中的组织与动员提供政治资历。' },
      { timeText: '1275-1283年', periodLabel: '南宋抗元', title: '右丞相 / 抗元统帅与被俘者', nominalDuty: '组织勤王、地方军队、粮道和南宋战时政府。', authorityScope: '抗元军队、州县动员、外交谈判和占领区临时行政。', actualInfluence: '在南宋灭亡后继续抵抗，兵败被俘仍拒绝降元。', modernEquivalent: '职能近似战时政府首脑兼抗战统帅。', impact: '形成中国传统忠烈与文官气节的经典案例。' }
    ]
  } },
  { id: 'zheng-he', merge: {
    background: '郑和本名马和，出身云南，明成祖时期因宫廷与军事经历被任用为大型远航船队统帅。其航海兼具朝贡外交、贸易、军事威慑和地理交流。',
    childhood: '早年经历与云南战乱、俘获和入宫有关，具体细节存在史料层累；进入明廷后接受军事、航海和宫廷事务训练。',
    personality: '组织能力强、善于协调多族群船员和外交礼仪，能够处理远航补给、港口关系与复杂政治任务。',
    policyInclination: '服务永乐皇帝扩大朝贡秩序、寻找建文帝和展示国威的战略，重视外交礼仪、贸易和海上安全。',
    socialContribution: '推动明代与东南亚、南亚、西亚和东非交流，留下航海、港口、物产和国际关系资料。',
    impactSummary: '郑和下西洋不是现代意义上的殖民远征，主要是朝贡外交与国家威望行动；其规模也依赖明代财政和宫廷支持。',
    resume: [
      { timeText: '1380年代-1404年', periodLabel: '燕王府与永乐政权初期', title: '燕王府内官 / 军政随从', nominalDuty: '在燕王府中承担内廷事务、信息传递和随军服务，权限来自燕王信任。', authorityScope: '活动范围主要在燕王府和相关军政任务，无独立中央行政或地方统治权。', actualInfluence: '通过长期侍奉和相关军政经历获得朱棣信任，成为永乐初年可承担大型远航与外交任务的内官。', modernEquivalent: '君主身边高级内廷人员兼军政联络人的职能近似，不等同现代公职。', impact: '积累宫廷信任、军政组织和人员协调经验，为后续统帅船队奠定基础。' },
      { timeText: '1405-1433年', periodLabel: '永乐至宣德远航', title: '太监 / 船队正使', nominalDuty: '统率船队、处理海外外交、贸易、礼仪和安全。', authorityScope: '远航船队、船员、补给、港口谈判、贡使和航海路线。', actualInfluence: '多次率大型船队到达印度洋沿岸，建立明朝与海外政权的联系。', modernEquivalent: '职能近似国家级海军远航编队司令兼特命外交使者。', impact: '扩大明代海上交通和世界认知。' }
    ]
  } },
  { id: 'wei-yuan', merge: {
    background: '魏源生活在鸦片战争前后，参与整理林则徐等人的海外资料，提出“师夷长技以制夷”，成为晚清开眼看世界的重要思想家。',
    childhood: '出身湖南士人家庭，接受经学、史学和科举教育，早年参与地方和幕府事务，逐步关注海防与国际局势。',
    personality: '务实、忧患意识强、重视资料和国家安全，能在传统经学框架内吸收西方地理、军事和政治信息。',
    policyInclination: '主张了解世界、改革海防、学习西方军事技术和制度经验，以增强清朝应对列强的能力。',
    socialContribution: '编撰《海国图志》，推动晚清知识界从天下观向近代世界地理和国家竞争视野转变。',
    impactSummary: '魏源的“师夷”是以国家自强为目标的选择，不等同于全面照搬西方，也受到信息来源和时代条件限制。',
    resume: [
      { timeText: '约1830-1842年', periodLabel: '清代地方与幕府', title: '士人 / 地方幕僚', nominalDuty: '参与地方文书、河工、军政和政策研究。', authorityScope: '没有独立行政权，主要以幕僚身份提供文书、财政和海防建议。', actualInfluence: '接触鸦片战争、林则徐资料和地方海防经验。', modernEquivalent: '职能近似政策研究者和地方政府高级幕僚。', impact: '为《海国图志》形成材料基础。' },
      { timeText: '1842-1852年', periodLabel: '《海国图志》与近代启蒙', title: '思想家 / 地理与海防著述者', nominalDuty: '通过著述整理世界地理、海防和国家竞争知识。', authorityScope: '没有行政管辖权，但影响士人教育、海防讨论和后续改革思想。', actualInfluence: '提出师夷长技以制夷，推动清末洋务与维新人物重新认识世界。', modernEquivalent: '职能近似公共知识分子、国防战略研究者和教育思想家。', impact: '成为中国近代“开眼看世界”传统的代表。' }
    ]
  } },
  { id: 'kang-youwei', merge: {
    background: '康有为出身广东士人家庭，经历甲午战败、列强压力和维新运动，以经学改制和政治组织推动戊戌变法。',
    childhood: '接受传统经学教育，后接触西方和日本制度信息，早年游学与讲学使其从传统士人转为制度改革倡导者。',
    personality: '理想强、善于论辩和组织，重视皇权改革与思想宣传；其经学解释、政治判断和后期保皇立场存在争议。',
    policyInclination: '主张君主立宪、教育改革、发展实业、变法图强和建立现代国家制度，反对直接以暴力革命推翻皇室。',
    socialContribution: '组织强学会、保国会和维新舆论，推动戊戌变法与近代政治思想传播。',
    impactSummary: '康有为把经学、君主立宪和现代国家结合起来，戊戌失败后其保皇路线与革命派分歧成为近代政治的重要对照。',
    disputeTabs: [
      { title: '维新改革视角', body: '康有为通过孔子改制和君主立宪论证改革合法性，推动教育、官制和政治制度更新。' },
      { title: '思想与实践争议', body: '其经学解释、政治组织和后期保皇立场受到批评，维新运动也因缺少军政和地方支持而失败。' }
    ],
    resume: [
      { timeText: '1895-1898年', periodLabel: '戊戌变法前后', title: '维新思想家 / 政治组织者', nominalDuty: '组织学会、报刊、请愿和改革方案，影响皇帝政策。', authorityScope: '维新士人网络、舆论、教育和中央改革建议，没有独立军队。', actualInfluence: '通过公车上书、保国会和奏议进入光绪帝政治视野。', modernEquivalent: '职能近似政党思想领袖、公共政策倡议者和舆论组织者。', impact: '使制度改革成为清末中央政治议题。' },
      { timeText: '1898年以后', periodLabel: '海外保皇活动', title: '保皇派领袖 / 流亡思想家', nominalDuty: '在海外组织政治宣传、筹款和保皇网络。', authorityScope: '海外社团、报刊、华侨网络和政治宣传，没有清廷实际行政权。', actualInfluence: '继续维护光绪与君主立宪路线，与孙中山革命派形成竞争。', modernEquivalent: '职能近似流亡政治组织领袖和公共思想家。', impact: '推动近代民族、宪政和政治组织话语传播。' }
    ]
  } },
  { id: 'qin-hui', merge: {
    background: '秦桧是南宋初期的宰相，经历靖康之变、金人南侵、宋高宗南渡和绍兴和议。其政治生涯既与南宋恢复秩序有关，也与主和路线、岳飞被害和权力集中紧密相连。',
    childhood: '出身江宁士人家庭，早年通过科举进入北宋官僚体系。靖康年间被金军俘获，后来南归，这段经历影响了他对战争、皇权安全和议和成本的判断。',
    personality: '谨慎、善于经营中枢关系和掌握信息，重视政治秩序与皇帝信任；其强硬排斥异议、利用司法和舆论压制政敌，也使其成为高度争议的人物。',
    policyInclination: '主张以议和、纳贡和南宋内部整顿换取政权稳定，倾向限制将领独立扩张和北伐压力，把皇权安全置于恢复北方失地之前。',
    socialContribution: '参与南宋财政、官僚和对金关系的重建，使偏安政权获得一段稳定期；同时制造岳飞冤案等严重政治后果，不能以单一功过概括。',
    impactSummary: '秦桧应放在南宋国家生存、宋高宗的继承安全、将领与文官关系以及金宋军事实力差距中理解。后世“奸相”形象有史实基础，也经过忠奸叙事和民族记忆不断强化。',
    disputeTabs: [
      { title: '主和与政权生存', body: '南宋军力、财政和北方形势限制了长期北伐，秦桧主张议和与宋高宗维护南方政权的选择相互配合，绍兴和议为南宋争取了稳定空间。' },
      { title: '权力压制与岳飞冤案', body: '秦桧通过控制中枢、排斥主战将领和制造冤案巩固权力，岳飞被杀是其政治责任和后世负面评价的核心。' },
      { title: '史料与后世形象', body: '宋金战争的责任不能只归结于个人，宋高宗、金国压力和文武关系同样重要；但政治审判和对异议的压制仍不能被主和目标抵消。' }
    ],
    resume: [
      { timeText: '约1115-1130年', periodLabel: '北宋末与南宋初', title: '尚书、御史与南归官员', nominalDuty: '参与中央文书、监察、外交和战乱时期的政务处理。', authorityScope: '中央诏令、官员弹劾、对金交涉和战时行政建议，实际权力随朝廷迁移而变化。', actualInfluence: '靖康之变后南归并重新取得宋高宗信任，逐步进入南宋中枢。', modernEquivalent: '职能近似中央高级公务员兼危机外交政策官员。', impact: '个人经历成为其后续主和路线的重要政治资本。' },
      { timeText: '1138-1155年', periodLabel: '南宋中枢与绍兴和议', title: '宰相 / 南宋政策核心', nominalDuty: '统筹中书门下、财政、官员任免、对金外交和中央政治。', authorityScope: '宰相机构、诏狱与官员升降、和议谈判、地方军政关系和对将领的约束。', actualInfluence: '推动绍兴和议，压制主战派，并通过岳飞案巩固文官和皇权控制。', modernEquivalent: '职能近似政府首脑兼国家安全、外交和人事协调者，但不对应现代法治权限。', impact: '稳定南宋中枢的同时造成政治冤案和长期忠奸评价。' }
    ]
  } },
  { id: 'yelv-chucai', merge: {
    background: '耶律楚材是契丹贵族后裔和蒙古帝国早期重臣，先后服务于成吉思汗、窝阔台，参与北方征服后的财政、户籍和行政重建。',
    childhood: '出身辽朝皇族后裔家庭，接受汉文经史、辽金官僚传统和多族群政治教育。金朝灭亡后，他将旧制度知识带入蒙古政权。',
    personality: '熟悉多种政治文化、擅长制度设计和劝谏，重视保存人口与税源；在征服战争的暴力环境中，其行政理想受到军事贵族约束。',
    policyInclination: '主张以户籍、税制、文书和地方官僚治理新占领区，反对把人口和城市全部视为一次性战利品，强调“以儒治国”的实用层面。',
    socialContribution: '推动蒙古在华北采用较稳定的赋税、户籍和官府治理，为从征服集团向帝国行政转型提供条件。',
    impactSummary: '耶律楚材不是简单的“儒臣救民”形象，他的政策既保护了一部分城市与人口，也服务于蒙古帝国的财政和扩张。',
    disputeTabs: [
      { title: '制度建设视角', body: '他劝阻屠城、建议按户征税并恢复文官和文书体系，使北方社会保留了可供长期统治使用的行政资源。' },
      { title: '帝国行政视角', body: '这些措施并未改变蒙古征服的等级和军事结构，耶律楚材的制度贡献应与帝国财政需求和权力斗争一起评价。' }
    ],
    resume: [
      { timeText: '1215-1227年', periodLabel: '成吉思汗时期', title: '中书令近似的文书与财政重臣', nominalDuty: '为蒙古大汗处理汉地文书、户籍、税赋和降城治理建议。', authorityScope: '华北占领区的官吏任用、税收登记、城市处置和行政文书，受大汗与诸王军事权力制约。', actualInfluence: '劝止部分屠杀并建议保留农户、工匠和税源，使征服区具有持续供给能力。', modernEquivalent: '职能近似中央政府办公与财政行政负责人，不等同于现代独立政府首脑。', impact: '为蒙古在华北建立常态化统治积累制度资源。' },
      { timeText: '1229-1241年', periodLabel: '窝阔台时期', title: '中书令 / 帝国财政行政顾问', nominalDuty: '统筹汉地赋税、官僚、驿站和对外征服所需的财政供给。', authorityScope: '中书省式行政系统、州县税粮、工匠户和驿传网络，不能直接指挥蒙古贵族军队。', actualInfluence: '推动税制和户籍整顿，努力限制把地方人口分封为私产的做法，后期因政争失势。', modernEquivalent: '职能近似中央财政与行政协调官。', impact: '体现蒙古帝国从军功分配向文官财政治理转型的张力。' }
    ]
  } },
  { id: 'guan-hanqing', merge: {
    background: '关汉卿是元代杂剧作家，生活在蒙古统治下的城市社会和多族群文化环境中。现存作品以戏剧冲突、民间语言和社会不平等观察著称。',
    childhood: '生平家世和出生年月缺少确定记载，可能熟悉医药、城市艺人和文人圈层。不能把后世戏曲传说当作完整传记。',
    personality: '观察敏锐、语言活泼、同情弱者，善于把复杂伦理冲突写成舞台行动；其个人形象也被后世塑造成不拘礼法的剧作家。',
    policyInclination: '不以官制改革为主要议题，而是通过戏剧揭示司法不公、婚姻压迫、贫富差距和女性处境，寄托民间正义。',
    socialContribution: '代表元杂剧成熟，作品让普通市民、妇女、商人和基层人物进入高影响力文学叙事，扩大了戏曲的社会表达能力。',
    impactSummary: '关汉卿的历史价值在于戏剧作为公共叙事的作用，而非一份可完全还原的官场履历。《窦娥冤》等作品的文学构造与社会现实需要同时阅读。',
    disputeTabs: [
      { title: '文学史视角', body: '关汉卿被视为元杂剧代表作家，善于使用口语、唱词和强烈戏剧冲突塑造基层人物。' },
      { title: '史料审慎视角', body: '关于其籍贯、职业和生活经历的材料并不完整，后世“浪子才子”形象有戏曲史叙事加工。' }
    ],
    resume: [
      { timeText: '13世纪后期', periodLabel: '元代城市文化', title: '杂剧作家 / 戏曲创作者', nominalDuty: '创作剧本、参与演出网络并面向城市观众传播故事。', authorityScope: '没有正式行政管辖权，主要影响剧场、艺人、书会和市民文化。', actualInfluence: '以《窦娥冤》《救风尘》等作品塑造民间正义和女性抗争形象。', modernEquivalent: '职能近似职业编剧、戏剧导演和公共文化创作者。', impact: '推动元杂剧成为中国戏曲史的重要成熟形态。' }
    ]
  } },
  { id: 'song-yingxing', merge: {
    background: '宋应星是明末实学家，《天工开物》系统记录农业、手工业、冶金、纺织和交通技术，反映晚明生产与知识传播的现实需求。',
    childhood: '出身江西士人家庭，长期参加科举而未中，曾任地方教谕和知县，接触乡村生产、手工业和基层社会后转向实学著述。',
    personality: '重观察、重实用、尊重工匠经验，对脱离生产的空疏议论持批评态度；其著述仍使用传统分类和术语，不能简单视为现代科学。',
    policyInclination: '主张把农业、手工业和物质生产纳入士人知识体系，强调技术、资源和民生之间的联系，支持以实用知识改善社会。',
    socialContribution: '保存了明代农业和手工业技术的大量细节，为理解中国古代生产组织、工匠知识和技术史提供重要材料。',
    impactSummary: '宋应星的贡献不只是“古代百科全书作者”，而是把地方观察、生产技术和士人写作连接起来，展示晚明知识结构的实学转向。',
    resume: [
      { timeText: '约1610-1630年', periodLabel: '晚明科举与地方任官', title: '教谕、知县 / 地方行政官', nominalDuty: '负责学校教育、地方文书、赋税、治安和基层司法。', authorityScope: '县级户籍、仓储、诉讼、教化、赋役和上级政令执行。', actualInfluence: '在地方任职中接触农业、矿冶、纺织和手工业生产，积累实地材料。', modernEquivalent: '职能近似基层教育行政官和县级政府行政负责人。', impact: '为后续技术观察和《天工开物》写作提供经验。' },
      { timeText: '1637年以后', periodLabel: '实学著述', title: '实学家 / 技术知识整理者', nominalDuty: '通过著述记录生产技术、工具、原料和工艺流程。', authorityScope: '没有行政权，但对技术教育、工匠知识保存和后世科学史研究有长期影响。', actualInfluence: '完成《天工开物》，把生产现场和工匠经验纳入系统性知识书写。', modernEquivalent: '职能近似技术史研究者、工程知识编辑和产业调查者。', impact: '成为中国古代技术史和明末实学传统的代表。' }
    ]
  } },
  { id: 'yuan-chonghuan', merge: {
    background: '袁崇焕是明末辽东防务将领，凭宁远、宁锦等防御战事获得声望，后因辽东战略、议和与朝廷猜疑被处死。',
    childhood: '出身广东士人家庭，通过科举进入官僚体系，转任辽东后接触边防、军饷、火器、城堡和军镇的实际问题。',
    personality: '重视守城、火器和军队训练，敢于承担责任、言辞直接；其战略判断与擅自议和、军纪和信息沟通问题长期存在争议。',
    policyInclination: '主张以坚城、火器、粮饷和局部作战牵制后金，必要时进行策略性谈判，不赞成无准备的全面决战。',
    socialContribution: '在明末辽东防御和火器城防方面留下重要经验，袁崇焕案也反映皇帝猜疑、边将信息不对称和战时政治责任问题。',
    impactSummary: '袁崇焕既不是单纯的民族英雄，也不能被“通敌”标签完全解释。宁远防御、后金战略压力、崇祯帝决策和军政信息链共同构成其悲剧。',
    disputeTabs: [
      { title: '边防功绩视角', body: '宁远、宁锦防御显示明军利用城堡、红夷大炮和局部兵力可以阻止后金快速突破，袁崇焕具有实际军事能力。' },
      { title: '责任争议视角', body: '其与后金议和、跨防区行动、军队纪律和对皇帝沟通存在问题，崇祯帝在高压猜疑下处置他，但处置方式并不等于事实判断已经可靠。' }
    ],
    resume: [
      { timeText: '1622-1626年', periodLabel: '辽东边防', title: '兵部主事、宁远守将', nominalDuty: '负责辽东城防、军队训练、火器配置、粮饷和对后金作战。', authorityScope: '宁远及相关防区城堡、守军、军械、粮道和地方军民协同。', actualInfluence: '修筑城防、整顿军队并在宁远防御战中遏制后金攻势。', modernEquivalent: '职能近似边境要塞防区司令兼国防工程负责人。', impact: '明军在辽东形成以坚城和火器为核心的防御经验。' },
      { timeText: '1627-1630年', periodLabel: '督师与政治危机', title: '蓟辽督师 / 辽东战区统帅', nominalDuty: '统筹关宁防线、各镇军队、粮饷和对后金的战略行动。', authorityScope: '跨省边防军镇、将领调度、关隘防务、军需和战时外交建议。', actualInfluence: '试图以防守和谈判争取时间，己巳之变后被捕并处死，辽东军政体系遭到冲击。', modernEquivalent: '职能近似战区司令兼边防军政协调者。', impact: '袁崇焕案加剧明末将帅与皇权之间的不信任。' }
    ]
  } },
  { id: 'zeng-guofan', merge: {
    background: '曾国藩是晚清文官、湘军创建者和洋务先导，经历太平天国战争、同治中兴和清朝地方军政结构变化。',
    childhood: '出身湖南耕读家庭，通过科举进入翰林和中央官僚体系，接受理学、经世和传统文官教育，后在地方危机中转为军事组织者。',
    personality: '自律、重视组织和人事训练，善于通过家书、幕府和纪律塑造团队；对镇压叛乱、地方军权和传统秩序的坚持也带来严厉后果。',
    policyInclination: '维护清朝君臣秩序和地方社会，强调整军、筹饷、理学教化与实务改革，支持制造局、翻译和军事技术引进但不主张全面制度革命。',
    socialContribution: '创建湘军、平定太平天国并推动洋务、教育和近代工业起步，促使晚清军政权力由八旗绿营部分转向地方督抚。',
    impactSummary: '曾国藩既是清廷秩序的维护者，也是地方军队和近代工业的推动者；其成功帮助清朝续命，却加重了督抚、军权和地方化的长期趋势。',
    disputeTabs: [
      { title: '中兴与改革视角', body: '曾国藩重建军队、整顿财政并支持安庆内军械所等洋务实践，为清朝恢复统治和引进近代技术提供组织基础。' },
      { title: '战争与地方化视角', body: '湘军平乱伴随严重战争破坏，军队私人化和地方督抚扩权也削弱了传统中央军制，不能只用“中兴名臣”概括。' }
    ],
    resume: [
      { timeText: '1852-1864年', periodLabel: '太平天国战争', title: '团练大臣 / 湘军统帅', nominalDuty: '组织地方团练、募兵、筹饷、军需和战区作战。', authorityScope: '湖南及长江中下游战区的募兵、粮饷、军法、将领任用和地方协同，部分权力依赖地方绅商。', actualInfluence: '创建湘军并通过水师、围城和地方财政逐步夺回安庆、南京等地。', modernEquivalent: '职能近似战时区域军政长官兼地方防务动员负责人。', impact: '清廷恢复对长江流域控制，但地方军事集团由此壮大。' },
      { timeText: '1864-1872年', periodLabel: '同治中兴与洋务起步', title: '两江总督、直隶总督 / 地方最高行政军政长官', nominalDuty: '负责数省行政、财政、漕运、司法、军队和外交事务。', authorityScope: '督抚辖区内的州县官吏、钱粮、河运、军队、洋务企业和地方治安，受军机处与皇帝监督。', actualInfluence: '裁湘军、整顿地方并支持军械制造、翻译和教育，同时维持传统政治秩序。', modernEquivalent: '职能近似跨省行政长官兼区域军政与经济协调者。', impact: '晚清国家能力恢复与地方化趋势同时展开。' }
    ]
  } },
  { id: 'cixi', merge: {
    background: '慈禧太后是晚清皇权核心人物，经历咸丰、同治、光绪三朝，在内忧外患、洋务、甲午战争、戊戌变法和清末新政中长期影响最高决策。',
    childhood: '出身叶赫那拉氏旗人家庭，入宫后成为咸丰帝妃嫔并生育皇子。咸丰去世后，她以两宫太后和皇太后身份参与摄政。',
    personality: '政治判断敏锐、善于平衡宗室、军机大臣和地方督抚，重视皇权安全与宫廷控制；其决策常在保守维护、有限改革和危机应对之间摇摆。',
    policyInclination: '优先维护皇权、清朝统治和满洲政治秩序，对洋务、教育和新政采取选择性接受，对可能削弱皇权的制度改革保持警惕。',
    socialContribution: '在晚清长期政局中推动或批准部分洋务、外交和新政，也对戊戌变法失败、义和团政策和改革延误承担重要政治责任。',
    impactSummary: '慈禧不能被简单归为“完全反改革”或“近代化推动者”。她支持能增强政权的技术与军事改革，却限制触及皇权和政治责任结构的制度变革。',
    disputeTabs: [
      { title: '保守专权视角', body: '戊戌政变、对光绪帝和维新派的处理，以及义和团时期的政策选择，体现了对皇权和政治安全的优先考虑。' },
      { title: '危机治理视角', body: '她也批准洋务、铁路、教育和清末新政，部分改革是在列强压力和财政危机下推动的，不能忽略宫廷之外地方督抚、军队和国际环境的作用。' }
    ],
    resume: [
      { timeText: '1861-1875年', periodLabel: '两宫垂帘与同治中兴', title: '皇太后 / 摄政核心', nominalDuty: '代表幼帝处理军机、官员任免、财政、外交和重大政务。', authorityScope: '军机处、内务府、中央官员任免和对地方督抚的最终裁决，实际权力与慈安太后、恭亲王等共治。', actualInfluence: '支持曾国藩、李鸿章等镇压太平天国并推动洋务，稳固清廷统治。', modernEquivalent: '职能近似幼主时期的国家摄政与最高行政决策者。', impact: '清廷从内战危机中恢复，但地方军政权力继续扩大。' },
      { timeText: '1875-1908年', periodLabel: '光绪朝与晚清危机', title: '两宫太后 / 最高政治仲裁者', nominalDuty: '处理皇帝亲政前后的人事、军政、外交和制度改革方向。', authorityScope: '皇帝继承、军机处、中央官员、外交政策、改革诏令和宫廷安全，权力受财政、列强和地方督抚制约。', actualInfluence: '介入甲午战后、戊戌变法、庚子事变和清末新政，在维护皇权与有限改革之间反复调整。', modernEquivalent: '不对应现代职位，属于君主制下的最高政治仲裁者。', impact: '其决策深刻影响清朝最后三十年，也集中体现晚清改革的结构性困境。' }
    ]
  } },
  { id: 'liang-qichao', merge: {
    background: '梁启超是晚清维新派思想家、报刊作者和民国学者，经历戊戌变法、海外流亡、立宪运动和民国政治文化转型。',
    childhood: '出身广东士人家庭，早年受康有为影响学习经学，随后接触日本和西方政治、历史、社会科学知识，形成跨传统与现代的写作方式。',
    personality: '学习速度快、表达有感染力、善于组织舆论和解释新概念；政治立场随局势从君主立宪到共和参与发生调整。',
    policyInclination: '主张国民教育、立宪政治、地方自治、发展实业和塑造现代国民，强调通过报刊、学校和公共讨论改变政治文化。',
    socialContribution: '以报刊、政论、史学和教育传播民族国家、国民和宪政概念，影响清末民初知识界和中学历史叙事。',
    impactSummary: '梁启超的核心影响力来自公共写作和概念创造，而非长期掌握行政权。他的思想既有立宪改革理想，也受国家竞争和政治动员逻辑影响。',
    resume: [
      { timeText: '1895-1898年', periodLabel: '戊戌变法', title: '维新派政论家 / 政治组织者', nominalDuty: '撰写奏议、组织学会、创办报刊并传播改革方案。', authorityScope: '没有正式行政管辖权，主要影响维新士人、舆论、教育和皇帝改革议程。', actualInfluence: '通过《时务报》等报刊把制度、国民和变法议题传播到更广泛的读者群。', modernEquivalent: '职能近似政策倡议者、政论家和公共传播负责人。', impact: '推动清末政治语言从臣民秩序转向国民与国家竞争。' },
      { timeText: '1898-1912年', periodLabel: '海外流亡与立宪运动', title: '报刊主笔 / 立宪派领袖', nominalDuty: '组织海外报刊、社团、筹款和政治宣传，影响清末立宪议题。', authorityScope: '海外华侨网络、报刊和政治社团，没有清廷正式行政权。', actualInfluence: '在流亡中批评革命与专制，宣传君主立宪、国民教育和地方自治。', modernEquivalent: '职能近似流亡政治组织者、媒体主编和公共知识分子。', impact: '塑造近代中国对国民、民族和宪政的理解。' }
    ]
  } },
  { id: 'tan-sitong', merge: {
    background: '谭嗣同是戊戌变法时期的思想家和改革行动者，受甲午战败、列强压力和新学影响，1898年政变后拒绝出逃而遇害。',
    childhood: '出身湖南官宦家庭，早年接触传统经学、佛学、王夫之思想和西方科学政治知识，长期游历使其关注边疆与国家危机。',
    personality: '激烈、重情义、敢于承担风险，倾向把思想改革转化为政治行动；对革命和改革的边界判断带有强烈时代紧迫感。',
    policyInclination: '主张变法、兴学、发展实业、改变君主专制和社会等级，认为政治制度与人的精神解放必须同时推进。',
    socialContribution: '以《仁学》和戊戌时期的行动成为近代改革与牺牲精神的象征，推动湖南及全国士人讨论政治、教育和社会变革。',
    impactSummary: '谭嗣同的实际行政经历有限，但他的思想、拒绝出逃和“我自横刀”式的后世记忆使其成为理解戊戌变法失败后政治选择的重要人物。',
    disputeTabs: [
      { title: '改革殉道视角', body: '他把制度改革、思想解放和国家救亡联系起来，政变后不逃亡的选择强化了近代政治牺牲者形象。' },
      { title: '行动条件视角', body: '维新派缺乏稳定军队、地方组织和财政资源，个人勇决无法弥补政治基础不足，戊戌失败具有结构性原因。' }
    ],
    resume: [
      { timeText: '约1895-1898年', periodLabel: '湖南维新与戊戌变法', title: '维新思想家 / 改革行动者', nominalDuty: '参与学会、讲学、报刊和改革方案讨论，协助地方新政。', authorityScope: '主要影响湖南士人、学校和改革舆论，没有独立军政权。', actualInfluence: '推动湖南新学和政治讨论，进入光绪帝与维新派的改革网络。', modernEquivalent: '职能近似公共知识分子、教育改革者和政治运动组织者。', impact: '使地方士人网络成为清末改革的重要社会基础。' },
      { timeText: '1898年', periodLabel: '戊戌政变', title: '维新派核心成员 / 政治牺牲者', nominalDuty: '协助维新派联络军政力量并维护改革诏令执行。', authorityScope: '实际没有稳定军队和行政系统，政治影响取决于皇帝、军机和地方力量。', actualInfluence: '政变后拒绝出走，接受逮捕并遇害，成为近代改革殉道象征。', modernEquivalent: '不能类比现代职位，属于失败政治改革中的核心行动者。', impact: '强化后世对戊戌变法、政治牺牲和制度改革紧迫性的记忆。' }
    ]
  } },
  { id: 'wu-zixu', merge: {
    background: '伍子胥是春秋末吴国重臣和军事谋略家，因楚平王杀害其父兄而出逃，辅佐吴王阖闾、夫差攻楚和争霸。',
    childhood: '出身楚国贵族家庭，父兄因太子案被楚平王杀害，伍子胥由此流亡宋、郑、吴等地，早年经历塑造了强烈复仇与政治警觉。',
    personality: '坚忍、重情、善于谋划和军事组织，具有强烈的复仇执念；后期多次劝谏夫差，直率与刚烈也导致政治冲突。',
    policyInclination: '主张先整军、用兵和扩大吴国战略纵深，再争夺中原霸权；后期反对夫差北上争霸和放任越国复起。',
    socialContribution: '参与吴国军政改革、攻楚和北上争霸，后世“掘墓鞭尸”与忠谏悲剧成为春秋人物伦理和政治警示的经典案例。',
    impactSummary: '伍子胥的故事同时包含家族复仇、国家竞争和忠臣悲剧三条线索。关于其具体谋略和神异叙事，应与《左传》《史记》及后世传说区分。',
    disputeTabs: [
      { title: '谋国与复仇视角', body: '伍子胥以个人家难转化为吴楚竞争的政治行动，帮助吴国攻破楚都，但复仇也使其政治判断带有强烈情绪色彩。' },
      { title: '忠谏悲剧视角', body: '他反复提醒夫差提防越国、避免北上空耗，最终被赐死，反映君主个人野心与重臣战略意见之间的冲突。' }
    ],
    resume: [
      { timeText: '约前515-前506年', periodLabel: '吴王阖闾时期', title: '行人、谋臣 / 吴国军政顾问', nominalDuty: '参与外交、军队训练、城防和对楚战略策划。', authorityScope: '主要提供国策和军事建议，实际执行依靠吴王、孙武及吴国军队。', actualInfluence: '协助阖闾整合政权并策划伐楚，吴军攻入郢都。', modernEquivalent: '职能近似国家安全顾问兼战略规划负责人。', impact: '吴国由地方强国跃升为春秋争霸力量。' },
      { timeText: '约前505-前484年', periodLabel: '吴王夫差时期', title: '太宰 / 吴国重臣', nominalDuty: '参与朝政、军队、外交和诸侯争霸决策。', authorityScope: '中枢政务、北上伐齐、对越战争和王室外交建议，受夫差个人决策支配。', actualInfluence: '主张灭越和慎重北上，意见不被采纳后被赐剑自尽。', modernEquivalent: '职能近似首席国务顾问兼国防战略负责人。', impact: '伍子胥之死成为吴国由盛转衰的政治象征。' }
    ]
  } },
  { id: 'hong-xiuquan', merge: {
    background: '洪秀全是太平天国运动的发动者和天王，生活在鸦片战争后清朝财政、土地、族群关系和基层社会矛盾加深的环境中。',
    childhood: '出身广东花县客家家庭，多次参加科举未中，接触基督教传教资料后形成独特宗教解释。屡试不第和地方社会压力成为其思想转折背景，但不能把起义简单归结为个人挫折。',
    personality: '具有强烈宗教号召力和组织动员能力，坚信自身使命；后期长期退居天京宫廷、依赖神权秩序，导致信息隔绝和决策失衡。',
    policyInclination: '以拜上帝教、反清和建立新秩序为号召，提出平均、禁欲和军政合一的制度设想，实际统治逐渐转向天王个人权威与等级宫廷。',
    socialContribution: '发动太平天国运动，冲击清朝统治和地方社会结构，迫使清廷改革军政财政；战争也造成巨大人口伤亡、城市破坏和社会流离。',
    impactSummary: '洪秀全应放在宗教传播、科举竞争、族群网络、土地压力与清廷危机中理解。太平天国既有基层动员和制度实验，也有神权专断、内斗和战争灾难。',
    disputeTabs: [
      { title: '社会危机与动员', body: '拜上帝教把灾荒、土地、赋税、地方冲突和反清情绪组织成跨地区运动，洪秀全提供了共同的宗教身份和政治目标。' },
      { title: '政权治理与失败', body: '定都天京后，天王权力集中、杨秀清等核心成员冲突、军事和财政管理失衡，天国的制度理想没有转化为稳定的国家治理。' },
      { title: '历史影响与代价', body: '运动重创清朝并推动地方军队、洋务和新政，但战争带来的生命、经济和文化损失也必须与反抗意义并置呈现。' }
    ],
    resume: [
      { timeText: '1843-1850年', periodLabel: '拜上帝教传播', title: '宗教领袖 / 基层组织者', nominalDuty: '讲道、传教、组织信徒和建立互助网络。', authorityScope: '地方教会、传教者、信徒纪律和基层筹粮，没有正式国家行政权。', actualInfluence: '在广西、广东等地发展信徒网络，把宗教信仰与反清、互助和社会不满连接起来。', modernEquivalent: '职能近似宗教社群创始人兼群众运动组织者。', impact: '为金田起义提供跨村落、跨地区的组织基础。' },
      { timeText: '1851-1853年', periodLabel: '太平天国建国与定都', title: '天王 / 新政权最高领袖', nominalDuty: '统领军队、官员、教会、粮税和新占领区秩序。', authorityScope: '太平军、王爵体系、军政文书、占领城市和宗教礼制，实际决策与杨秀清等东王分担。', actualInfluence: '建立太平天国并攻占南京，建立与清廷对峙的政权中心。', modernEquivalent: '不对应现代职位，属于宗教革命政权的最高统治者。', impact: '太平天国由流动起义转为长期政权竞争。' },
      { timeText: '1856-1864年', periodLabel: '天京内讧与后期战争', title: '天王 / 宫廷化政权领袖', nominalDuty: '名义统筹全国军政、外交、财政和将领任免。', authorityScope: '天京宫廷、王府和中央诏令，地方军队越来越依赖各王和将领，中央实际控制力下降。', actualInfluence: '天京事变后进一步集中神权与宫廷权威，未能恢复各战区协调，天京陷落前病逝。', modernEquivalent: '不对应现代职位，属于内战时期高度个人化的最高统治者。', impact: '太平天国因内斗、军政分裂和清军地方化围剿而失败。' }
    ]
  } },
  { id: 'pang-juan', merge: {
    background: '庞涓是战国魏国将领，传统史料把他与孙膑并列为同门对手，相关故事集中于桂陵、马陵等魏齐战争。',
    childhood: '关于其家世和幼年材料很少，后世多据孙膑传说叙述二人同学于鬼谷。可确认的历史线索主要来自战国军事竞争和魏国军政体系。',
    personality: '善于统兵、重视战功和魏国优势，对竞争者疑忌较深；桂陵和马陵的失败显示其追击、情报与地形判断受到孙膑诱导。',
    policyInclination: '服务魏国扩张和中原争霸，倾向以快速机动作战、追击和集中兵力解决战局，缺少对齐国长期战略与诱敌战术的充分防范。',
    socialContribution: '代表战国职业将领和军事竞争者，其与孙膑的对抗推动后世对《孙膑兵法》、军争和谋略的理解。',
    impactSummary: '庞涓的生平带有兵家传奇色彩，不能只写成“嫉贤妒能的反派”。他所在的魏国军事体系、齐魏竞争和战国战争规模是理解其行动的关键。',
    disputeTabs: [
      { title: '兵家对手叙事', body: '庞涓与孙膑的故事突出知己知彼、减灶诱敌和地形伏击，后世常以此说明军事判断和用人胸襟。' },
      { title: '史料审慎视角', body: '二人同门、刖刑和马陵细节主要由后世史书整理，战役经过应与《孙膑兵法》、出土材料和战国政治背景交叉阅读。' }
    ],
    resume: [
      { timeText: '约前354年', periodLabel: '桂陵之战前后', title: '魏国将军 / 伐赵统帅', nominalDuty: '统率魏军攻赵、控制交通和处理战场俘降、粮道。', authorityScope: '所部野战军、行军路线、攻城与追击决策，受魏王和魏国军政体系约束。', actualInfluence: '攻赵后追击齐军，遭孙膑围魏救赵策略牵制并在桂陵受挫。', modernEquivalent: '职能近似战区野战军司令。', impact: '魏国长期压制诸侯的军事优势受到挑战。' },
      { timeText: '约前342年', periodLabel: '马陵之战', title: '魏军主将', nominalDuty: '率军救援韩、魏方向，负责远距离机动、追击和决战。', authorityScope: '魏国远征军的编制、行军、侦察和战场部署，但对齐军情报掌握不足。', actualInfluence: '追击齐军至马陵，遭伏击兵败身亡，魏太子申被俘。', modernEquivalent: '职能近似远征军总指挥。', impact: '马陵之战削弱魏国霸权，齐国和孙膑的战略声望上升。' }
    ]
  } },
  { id: 'yuan-shao', merge: {
    background: '袁绍是东汉末四世三公家族出身的军政领袖，先后参与讨董卓、争夺冀州和北方统一，最终在官渡之战败于曹操。',
    childhood: '出身汝南袁氏，家族长期位居三公，拥有广泛士人和官僚网络。早年在洛阳任职并参与反宦官、反董卓政治，形成高门士族领袖身份。',
    personality: '重视名望、仪表和士人声誉，善于吸纳宾客和建立联盟；决策容易受内部派系、继承偏好和情报迟疑影响，难以把资源优势转化为统一指挥。',
    policyInclination: '以恢复汉室秩序、控制河北和联合地方军镇为目标，倾向依托士族、州郡和传统名分治理，不如曹操重视集中军政和屯田。',
    socialContribution: '代表东汉末地方军政、士族网络和名分政治的结合，其与曹操的竞争推动北方从群雄并立走向曹魏集中化。',
    impactSummary: '袁绍并非只有官渡失败这一面。他曾拥有河北人口、粮食和人才优势，但继承安排、派系政治、军事指挥和对曹操战略判断共同造成败局。',
    disputeTabs: [
      { title: '北方盟主视角', body: '袁绍凭家族声望和河北资源聚拢众多州郡，在讨董卓和北方兼并中一度是最有希望统一北方的势力。' },
      { title: '官渡失败视角', body: '内部审议迟疑、谋臣分裂、军令不一和轻视曹操的后勤组织，使其兵力优势未能形成持续作战能力。' }
    ],
    resume: [
      { timeText: '189-196年', periodLabel: '东汉末政治与讨董', title: '侍御史、冀州牧前后 / 反董卓联盟领袖', nominalDuty: '参与京师官僚政治、地方州牧事务和诸侯联军组织。', authorityScope: '洛阳士人网络、冀州州郡、联盟军队和地方粮道，实际权力依赖家族声望与诸侯支持。', actualInfluence: '在董卓控制朝廷后成为反董卓阵营的重要名义领袖，后夺取冀州。', modernEquivalent: '职能近似地方军政长官兼跨地区政治联盟召集人。', impact: '东汉中央崩解后，河北成为北方争霸核心。' },
      { timeText: '196-202年', periodLabel: '河北扩张与官渡', title: '冀州牧、车骑将军 / 北方军政首领', nominalDuty: '统辖冀、青、幽、并等地军政、赋税、军队和官员。', authorityScope: '多州郡户籍粮税、地方豪强、野战军、粮道和将领任用，中央汉廷实际控制有限。', actualInfluence: '击败公孙瓒并控制河北，官渡与曹操决战失败后集团迅速分裂。', modernEquivalent: '职能近似跨省区域军政长官和地方政权最高负责人。', impact: '袁绍败亡为曹操统一北方和挟天子令诸侯创造条件。' }
    ]
  } },
  { id: 'lu-xun-wu', merge: {
    background: '陆逊是孙吴名将、丞相和后期政治支柱，经历夷陵之战、石亭之战、东吴军政整合以及太子继承争议。',
    childhood: '出身江东吴郡士族陆氏，早年在孙吴地方和中枢体系中任职，熟悉江东宗族、屯田、军镇与长江防线。',
    personality: '沉着、善于等待和利用地形，重视军纪与政治协调；担任丞相后因坚持继承秩序触怒孙权，晚年承受宫廷压力。',
    policyInclination: '主张守江东、慎重进攻、利用联盟和水陆地形，维护孙吴内部宗族与军镇平衡，反对因宫廷继承争论破坏国家稳定。',
    socialContribution: '在夷陵击败刘备、石亭抗魏并长期主持吴国政务，维护三国后期孙吴的战略空间和江东行政秩序。',
    impactSummary: '陆逊的历史作用从夷陵名将延伸到丞相和政治调停者。其晚年遭孙权猜忌，体现吴国继承、宗族与军政权力的结构性矛盾。',
    disputeTabs: [
      { title: '军事统帅视角', body: '夷陵之战中陆逊避免被蜀军挑衅牵动，利用山地、火攻和纵深击破刘备，显示孙吴防御与反击能力。' },
      { title: '中枢政治视角', body: '陆逊担任丞相后参与太子与鲁王继承争议，因维护政治秩序和直谏受到孙权压力，说明名将进入中枢后面临不同风险。' }
    ],
    resume: [
      { timeText: '约210-222年', periodLabel: '孙吴地方与荆州', title: '地方长官、偏将军 / 江东军政官员', nominalDuty: '负责郡县治理、军队、粮道和荆州方向防务。', authorityScope: '江东郡县户籍、地方军队、屯田和对关羽、蜀汉方向的军事行动。', actualInfluence: '参与夺取荆州并在孙权集团中获得军政信任。', modernEquivalent: '职能近似区域军政长官兼地方行政负责人。', impact: '孙吴稳固长江中游和江东统治。' },
      { timeText: '222-245年', periodLabel: '夷陵、石亭与中枢', title: '大都督、丞相 / 国家军政统筹者', nominalDuty: '统筹吴国军队、边防、外交、官员和中枢政务。', authorityScope: '长江防线、荆州军镇、对魏蜀外交、丞相府和部分中央官员协调。', actualInfluence: '夷陵击败刘备，石亭抗魏，后主持国政并参与太子继承议论。', modernEquivalent: '职能近似国防部长兼政府首脑和国家安全协调者。', impact: '使孙吴在刘备败后保持独立，并把军事经验带入政治治理。' }
    ]
  } },
  { id: 'sima-zhao', merge: {
    background: '司马昭是曹魏后期权臣，继承司马懿、司马师的军政基础，平定淮南、灭蜀并为司马炎代魏建立条件。',
    childhood: '出身河内司马氏，接受士族经学和军事政治教育，早年随父兄参与曹魏中枢与战场，熟悉禁军、外镇和士族官僚网络。',
    personality: '谨慎而有权术，善于长期布局、分化对手和利用名分；权力集中、镇压政敌和对高贵乡公死亡承担政治责任。',
    policyInclination: '以司马氏控制中枢、稳定军队和统一北方为目标，保留曹魏官制外壳并逐步把皇帝变成合法性工具。',
    socialContribution: '完成灭蜀、推进北方整合和西晋统一前的制度准备；其权臣政治也显示三国后期皇权与士族军权的失衡。',
    impactSummary: '司马昭既是西晋建立的关键过渡人物，也是曹魏皇权被架空的责任者。评价代魏不能只看最终统一，还要看权力夺取的过程与代价。',
    disputeTabs: [
      { title: '统一准备视角', body: '司马昭整合中枢和地方军队，灭蜀后北方资源集中到司马氏手中，为司马炎灭吴和建立西晋提供条件。' },
      { title: '权臣与合法性视角', body: '高贵乡公遇害、曹魏皇帝被控制和封爵受禅说明“禅让”背后存在强制性权力结构，统一成果不能抹平这一过程。' }
    ],
    resume: [
      { timeText: '249-255年', periodLabel: '司马氏中枢掌权', title: '大将军、录尚书事 / 曹魏军政核心', nominalDuty: '统率禁军、处理尚书台政务和镇压地方反抗。', authorityScope: '中央禁军、尚书台、地方军镇调度、官员任免和对淮南战事的决策。', actualInfluence: '继承司马师权力，平定诸葛诞等淮南反抗，扩大司马氏对曹魏军政控制。', modernEquivalent: '职能近似中央军政最高负责人兼政府常务协调者。', impact: '曹魏皇帝的实际权力进一步下降。' },
      { timeText: '255-265年', periodLabel: '灭蜀与代魏前夜', title: '相国、晋公 / 曹魏实际最高权力者', nominalDuty: '统筹全国军政、外交、财政和重大官员任免。', authorityScope: '中枢政务、关中与蜀汉战区、禁军、封爵制度和对皇帝的政治控制。', actualInfluence: '主持灭蜀，处理高贵乡公事件并接受晋公、晋王封号，死后由司马炎完成代魏。', modernEquivalent: '不对应现代职位，属于君主制下掌握军政而未正式称帝的权臣。', impact: '司马氏代魏与西晋统一进入不可逆阶段。' }
    ]
  } },
  { id: 'li-jing-tang', merge: {
    background: '李靖是隋末唐初名将和军事理论人物，先后参与唐统一战争、平定突厥和吐谷浑，代表唐初军队机动作战与边疆经营能力。',
    childhood: '出身关陇军事贵族家庭，接受经史与武艺教育，隋末任职后观察李渊、李世民集团的力量变化，最终归唐。',
    personality: '谨慎、善于侦察和长途机动，能将战略目标转化为具体军队行动；也重视功成身退和避免卷入皇室权力争斗。',
    policyInclination: '主张集中兵力、快速突袭和利用敌方内部矛盾，边疆治理兼顾军事威慑、俘降安置和交通补给，不以无止境扩张为唯一目标。',
    socialContribution: '参与唐朝统一、击破东突厥和吐谷浑，推动唐初北方边疆和丝路交通安全，军事经验影响后世兵学叙事。',
    impactSummary: '李靖的贡献不仅是“战无不胜”，还在于唐初国家把机动骑兵、关陇资源、外交和边疆行政整合为帝国军政能力。',
    resume: [
      { timeText: '约617-626年', periodLabel: '隋末唐初统一战争', title: '行军总管、秦王府将领', nominalDuty: '率军平定江南和南方割据，负责攻城、机动、粮道与俘降安置。', authorityScope: '所部野战军、沿江交通、地方军政和战时俘降政策，受李渊、李世民战略调度。', actualInfluence: '参与攻灭萧铣等势力，为唐朝控制长江中下游提供军事支撑。', modernEquivalent: '职能近似方面军司令兼战区后勤与地方接管负责人。', impact: '唐朝南北统一的军事基础逐步形成。' },
      { timeText: '629-641年', periodLabel: '唐初北方与西域边疆', title: '兵部尚书、卫国公 / 边疆远征统帅', nominalDuty: '统率北方、西北战区军队，处理突厥、吐谷浑及边疆外交。', authorityScope: '远征军、边防军镇、粮道、俘降部众和与草原政权的军事外交。', actualInfluence: '击破东突厥、平定吐谷浑，扩大唐朝对北方和西北交通线的控制。', modernEquivalent: '职能近似国防部长兼跨区域战区总司令。', impact: '为贞观时期的边疆稳定和国际影响奠定军事实力。' }
    ]
  } },
  { id: 'kou-zhun', merge: {
    background: '寇准是北宋真宗时期宰相，在契丹南下时主张宋真宗亲征并参与澶渊之盟，后来因党争和政治判断多次起落。',
    childhood: '出身陕西士人家庭，通过科举入仕，早年任地方和中央官职，积累边防、财政、刑狱和文书经验。',
    personality: '刚直、敢于当面进谏、重视决断和名节；不善于长期经营党争关系，锋利的政治风格也使其容易被排斥。',
    policyInclination: '主张皇帝亲临前线稳定军心、强化中央决断和守边，愿意在军事压力下谈判，但不接受仓促退让和地方军政失控。',
    socialContribution: '在澶渊之战和北宋政治中维护了中央权威，推动宋辽关系从战争转入长期议和，同时成为宋代直臣形象代表。',
    impactSummary: '寇准的关键不只是“劝真宗亲征”，而是把皇帝、边防军心、财政承受和外交议和放进一次危机决策中。其后党争说明个人刚直不能替代制度协调。',
    resume: [
      { timeText: '约990-1003年', periodLabel: '北宋中央与边防任官', title: '枢密副使、参知政事 / 军政决策官', nominalDuty: '参与军队调度、边防、财政和中央诏议。', authorityScope: '枢密院军事文书、边将任命、军需与对辽政策建议，需与中书、皇帝共同决策。', actualInfluence: '以直谏和边防判断进入真宗核心决策圈。', modernEquivalent: '职能近似国家安全与国防政策副主管。', impact: '为澶渊危机中的快速决策积累政治资历。' },
      { timeText: '1004-1023年', periodLabel: '澶渊之战与政治起落', title: '宰相 / 宋辽危机协调者', nominalDuty: '统筹中枢政务、军队、财政和对辽外交。', authorityScope: '中书门下、枢密院协调、前线军心、和议条款和官员任免建议，实际受真宗信任与党争影响。', actualInfluence: '推动真宗亲征并参与澶渊之盟，随后在政治斗争中被罢相、贬谪。', modernEquivalent: '职能近似政府首脑兼国家安全与外交协调者。', impact: '澶渊之盟稳定北宋北部边境，寇准个人则成为直臣与党争的双重象征。' }
    ]
  } },
  { id: 'xiao-chuo', merge: {
    background: '萧绰即萧太后，是辽景宗皇后、辽圣宗时期摄政者，长期处理辽宋战争、契丹贵族、汉地行政和皇位继承。',
    childhood: '出身辽国后族和贵族家庭，接受契丹宫廷、军事和汉地行政教育，入宫后成为皇后并参与景宗时期政治。',
    personality: '果断、善于用人和处理多族群政治，能够在幼主时期维持军政；对宋战争与宫廷权力的掌控也带有强势和集中倾向。',
    policyInclination: '维护辽国皇权与契丹贵族利益，同时吸收汉地官僚、赋税和城市治理经验；对宋采取军事压力与谈判并用。',
    socialContribution: '在辽圣宗时期稳定辽国政局、推动辽宋和议与多元行政，展示女性摄政者在契丹帝国政治中的实际权力。',
    impactSummary: '萧太后不是只在澶渊之盟中出现的女性角色，她参与了辽国从部族联盟向双轨官僚帝国的制度和军事转型。',
    disputeTabs: [
      { title: '辽国政治视角', body: '她依靠后族、耶律氏和汉地官僚维持幼主统治，兼顾契丹传统与南面官行政，使辽国政权延续并增强。' },
      { title: '宋辽关系视角', body: '辽军南下和澶渊议和既是军事较量，也是双方财政、边防和国内稳定的权衡，不能只写成某一方的胜负。' }
    ],
    resume: [
      { timeText: '982-1009年', periodLabel: '辽圣宗幼年摄政', title: '皇太后 / 辽国摄政核心', nominalDuty: '代表幼主处理辽国军政、财政、官员和外交。', authorityScope: '北面官、南面官、契丹军队、汉地州县、宫廷任免和对宋军事决策。', actualInfluence: '稳定皇位继承，任用韩德让等人，推动辽国对宋战争和内部行政整合。', modernEquivalent: '职能近似君主制下的国家摄政兼最高行政和国防决策者。', impact: '辽国在其摄政时期形成较强的中央协调能力。' },
      { timeText: '1004-1005年', periodLabel: '澶渊战争与议和', title: '辽国最高军事与外交决策者', nominalDuty: '统筹南下军队、边防补给、谈判和辽宋关系。', authorityScope: '辽军主力、边境城镇、外交使节、岁币与边界安排。', actualInfluence: '在军事压力与后勤成本之间选择与宋议和，促成澶渊之盟。', modernEquivalent: '职能近似国家元首兼战时外交与国防负责人。', impact: '辽宋长期和平与贸易由此形成，两国都获得稳定但保留竞争。' }
    ]
  } },
  { id: 'han-shizhong', merge: {
    background: '韩世忠是南宋初年抗金名将，经历黄天荡、淮东防线和绍兴和议，晚年在秦桧主和与宋高宗收兵政策下逐渐退出军政核心。',
    childhood: '出身延安军户或基层武人环境，早年从军，在北宋末与南宋初战争中凭骑射、勇敢和战场经验晋升。具体家世记载不如其军旅生涯清晰。',
    personality: '勇猛、善于水陆作战和鼓舞士卒，重视军队荣誉与边防；晚年不愿与秦桧同流合污，选择退居也带有对政治风险的判断。',
    policyInclination: '主张守住江淮、积极抗金和恢复北方，不赞成在军队尚有战力时过早收兵；同时理解南宋财政、粮饷和皇权安全的限制。',
    socialContribution: '参与南宋初年抗金、防守江淮和重建军队，黄天荡等战事保留了南宋抵抗能力与将领群体的历史记忆。',
    impactSummary: '韩世忠与岳飞共同代表南宋主战派，但其军事行动也依赖水网、城防、粮道和朝廷支持。评价其失败不能只归咎秦桧或单次战役。',
    disputeTabs: [
      { title: '抗金名将视角', body: '黄天荡等战事显示韩世忠能利用江南水网牵制金军，长期守卫淮东，对南宋政权生存有重要贡献。' },
      { title: '南宋政治视角', body: '宋高宗需要限制将领和恢复皇权，秦桧主和也反映军费、议和与中枢控制的压力，韩世忠退出军政是结构性结果。' }
    ],
    resume: [
      { timeText: '约1127-1134年', periodLabel: '南宋初年抗金', title: '浙西制置使、镇抚使 / 战区将领', nominalDuty: '负责江南、两淮方向军队、城防、粮运和流民安置。', authorityScope: '地方军镇、募兵、粮道、水军和战时州县协同，权力受朝廷和其他将领分割。', actualInfluence: '在南宋政权重建期收拢部队、阻止金军南下并稳定江淮防线。', modernEquivalent: '职能近似战区军政长官兼边防动员负责人。', impact: '南宋得以保住江南核心区域。' },
      { timeText: '1130-1141年', periodLabel: '黄天荡与绍兴和议前后', title: '建康、淮东方面统帅 / 抗金主将', nominalDuty: '统率水陆军、处理长江防务、军需和对金作战。', authorityScope: '长江下游与淮东战区的军队、水运、城防、将领和地方粮税协同。', actualInfluence: '黄天荡阻击金军并持续守边，后因朝廷收兵和政治压力逐步交出军权。', modernEquivalent: '职能近似方面军司令兼江防战区负责人。', impact: '与岳飞、刘光世等共同构成南宋初年抗金将领群像。' }
    ]
  } },
  { id: 'li-qingzhao', merge: {
    background: '李清照是北宋末至南宋初女词人、金石学者，经历靖康之变、南渡流离和文物散失，作品兼具闺阁生活、家国动荡与个人生命经验。',
    childhood: '出身济南士大夫家庭，父亲李格非参与文坛，早年接受诗词、书画、金石和经史教育，与赵明诚共同收藏研究金石。',
    personality: '审美敏锐、表达细密、坚韧而有自尊，能够把日常生活和时代创痛写入词章；晚年处境艰难，作品真伪和经历细节有史料辨析空间。',
    policyInclination: '没有正式政治政策，但作品与题跋体现对文物、学术、家国变故和女性生命处境的关注，对南渡社会有独特观察。',
    socialContribution: '拓展宋词的女性视角和个人经验，保存靖康南渡、收藏文化与士大夫家庭生活的情感史料，成为中国文学史重要作家。',
    impactSummary: '李清照不能只被归纳为“婉约词人”。她的前后期创作连接北宋文化繁荣、战争流离、文物收藏和女性主体表达。',
    disputeTabs: [
      { title: '文学与家国视角', body: '前期词作多写生活、审美和情感，南渡后作品转向离乱、故国和个人失所，形成宋词中罕见的生命史转折。' },
      { title: '史料辨析视角', body: '关于改嫁、晚年经历、部分作品归属和“易安体”评价存在争议，应区分可靠文献、后世传记和文学想象。' }
    ],
    resume: [
      { timeText: '约1100-1127年', periodLabel: '北宋士大夫文化', title: '词人 / 金石收藏与学术合作者', nominalDuty: '无正式行政职务，参与家庭文献、金石、书画收藏和文学创作。', authorityScope: '没有官职管辖权，主要影响士人文艺圈、收藏网络和词体表达。', actualInfluence: '与赵明诚共同整理金石书画，形成清丽、细密且具有女性主体性的词风。', modernEquivalent: '职能近似职业作家、艺术史资料整理者和文化评论者。', impact: '北宋城市与士大夫文化留下重要女性声音。' },
      { timeText: '1127年以后', periodLabel: '南渡流离与后期创作', title: '流离文人 / 词学代表', nominalDuty: '不承担国家官职，主要通过诗词、题跋和文献保存表达个人与时代经验。', authorityScope: '没有行政权，但作品进入士人传播、文集抄刻和后世教育体系。', actualInfluence: '在文物散失、亲友离散和南北政局变化中创作，重写词的情感范围与历史感。', modernEquivalent: '职能近似公共文化作者、文献记忆保存者和独立作家。', impact: '成为宋词、女性文学和靖康南渡记忆的核心人物。' }
    ]
  } },
  { id: 'lu-you', merge: {
    background: '陆游是南宋诗人、词人和官员，经历隆兴和议、乾道北伐希望、地方任职与晚年闲居，作品持续表达抗金、乡村生活和个人理想。',
    childhood: '出身越州士大夫家庭，幼年经历靖康南渡后的家国记忆，接受经史与诗文教育。科举入仕后多次因主战立场、党争和政见不合被调任或罢职。',
    personality: '热烈、执着、重视实践和家国责任，既有军政抱负，也能细致记录乡村生产、民俗和家庭生活；晚年反复书写理想与现实的落差。',
    policyInclination: '主张恢复失地、整顿军备和任用实干官员，反对把议和当作永久国策；地方任官时关注水利、农事、治安和基层民生。',
    socialContribution: '留下大量诗词、游记和家居记录，连接南宋边防政治与普通乡村社会，是理解南宋士大夫家国意识和日常生活的重要作者。',
    impactSummary: '陆游不只是“爱国诗人”，还经历了中央与地方官僚体系、军事理想与财政现实的冲突。其作品中的抗金情绪与乡村观察应同时阅读。',
    disputeTabs: [
      { title: '抗金政治视角', body: '陆游反复主张恢复中原、整军备战，作品保存了南宋士大夫对失地、边防和国家责任的长期关注。' },
      { title: '地方社会与文学视角', body: '他在蜀地、闽地等地任职和生活，写下农事、风俗与民间经验，文学价值不应被单一的政治标签遮蔽。' }
    ],
    resume: [
      { timeText: '约1153-1172年', periodLabel: '南宋科举与中央任官', title: '进士、隆兴通判前后 / 文官', nominalDuty: '参与州县行政、中央文书、礼制和军政政策建议。', authorityScope: '地方赋税、司法、治安与中央诏议，实际影响受主和派与宰相人事安排限制。', actualInfluence: '因主战和直言多次调动，形成对南宋中枢政治和边防政策的切身认识。', modernEquivalent: '职能近似地方行政官兼中央政策研究与文书官。', impact: '政治失意转化为持续的诗歌、史论和家国书写。' },
      { timeText: '1172-1210年', periodLabel: '蜀地、地方任官与晚年', title: '夔州通判、地方官 / 文学观察者', nominalDuty: '处理地方军政、赋税、治安、农事和公共工程。', authorityScope: '州县户籍、仓储、道路水利、地方军队和民事诉讼，受上级转运使与朝廷监督。', actualInfluence: '在蜀地和山阴等地记录边防、乡村和民生，晚年以诗文保留抗金理想。', modernEquivalent: '职能近似基层政府主要负责人兼公共文化作者。', impact: '形成南宋文学中家国、乡土与个人生活交织的长时段记录。' }
    ]
  } },
  { id: 'xin-qiji', merge: {
    background: '辛弃疾是南宋词人、将领和地方官，出生于金统治下的济南，青年时期参加抗金起义，南归后长期在南宋官场中等待北伐机会。',
    childhood: '成长于金人统治的北方汉地，接受经史教育并熟悉当地社会。少年参与耿京义军，带人南归后因语言、经历和军政立场进入南宋体系。',
    personality: '勇决、善于组织和富有战略想象，既有武将行动力又有词人敏感；长期闲置和被弹劾使其作品充满豪情、忧患与自我反省。',
    policyInclination: '主张整军、屯田、训练民兵和恢复失地，重视地方财政与边防实务；反对以短期议和替代长期国家战略。',
    socialContribution: '将南宋边防、北方遗民、乡村生活和个人政治失意写入词体，拓展豪放词与爱国文学的表现边界。',
    impactSummary: '辛弃疾的军事经历和文学形象相互影响，但不能把词中夸张语气等同于完整军事履历。他是南宋政治理想、地方治理和文学创新的交汇人物。',
    disputeTabs: [
      { title: '抗金与经世视角', body: '辛弃疾曾提出整军、屯田和边防方案，说明他的抗金并非只有情绪表达，也包含对国家财政和军政机制的思考。' },
      { title: '文学人格视角', body: '南宋长期不用使其把壮志难酬、乡村观察和历史记忆融入词作，文学中的英雄自我与现实政治处境并不完全相同。' }
    ],
    resume: [
      { timeText: '1161-1162年', periodLabel: '北方抗金与南归', title: '抗金义军首领 / 南归使者', nominalDuty: '组织地方武装、联络抗金力量、处理军粮和人员转移。', authorityScope: '义军所部、地方据点、军需和与南宋官府的联络，缺乏稳定国家行政权。', actualInfluence: '参与耿京集团并擒杀叛将张安国，率部南归，获得南宋朝廷任用。', modernEquivalent: '职能近似地方武装组织者兼战区联络官。', impact: '把北方抗金经验带入南宋军政和文学记忆。' },
      { timeText: '1162-1207年', periodLabel: '南宋地方任官与闲置', title: '地方官、安抚使 / 边防政策倡议者', nominalDuty: '负责州县行政、军队训练、粮饷、屯田和边防治理。', authorityScope: '地方路分的军政、财政、治安和民兵组织，实际权力受朝廷主和政策与党争限制。', actualInfluence: '多次提出恢复和整军方案，任职与闲居交替，最终以词文表达北伐理想和政治失意。', modernEquivalent: '职能近似省级行政军政长官兼国防政策顾问。', impact: '豪放词和爱国文学成为南宋历史记忆的重要载体。' }
    ]
  } },
  { id: 'li-kui', merge: {
    background: '李悝是战国魏文侯时期的政治家和改革者，主持魏国法制、农业和粮食政策，被视为战国变法的重要先行者。',
    childhood: '生平家世和幼年材料有限，主要活动在魏国由分封诸侯向中央集权国家转型的阶段，接受当时士人、法术和经济治理知识。',
    personality: '重实用、重制度和重农业生产，能够把法律、选官和粮食政策联系起来；其法制思想同时带有战国国家竞争的严厉性。',
    policyInclination: '主张任贤、赏罚分明、编定法律、发展农业和稳定粮价，以国家掌握粮食与军役资源来增强魏国竞争力。',
    socialContribution: '推动魏国早期变法和法制化治理，为李悝《法经》、平籴和后续商鞅变法提供重要制度传统。',
    impactSummary: '李悝的历史意义在于把战国改革从个人道德转向国家制度、土地生产和资源管理；《法经》具体篇目和流传情况仍有史料层累。',
    disputeTabs: [
      { title: '变法先驱视角', body: '李悝将选官、法律、农业与粮价结合，体现魏国通过制度改革建立中央集权和军事优势的努力。' },
      { title: '史料辨析视角', body: '关于《法经》原貌、李悝具体法条和后世法家继承关系，主要依赖后出文献，应区分可考事实与制度谱系推论。' }
    ],
    resume: [
      { timeText: '约前445-前396年', periodLabel: '魏文侯时期', title: '相国 / 魏国变法主持者', nominalDuty: '统筹官员任用、法律、农业、财政和国家治理改革。', authorityScope: '魏国中央官署、州县官员、土地粮税、市场粮价和司法制度建议。', actualInfluence: '编定法律、推行平籴并鼓励农业，帮助魏国形成战国早期强国优势。', modernEquivalent: '职能近似国务院常务协调者兼财政、农业和司法制度设计负责人。', impact: '为战国变法和法家国家治理提供先例。' }
    ]
  } },
  { id: 'wu-qi', merge: {
    background: '吴起是战国军事家和改革者，先后服务鲁、魏、楚，擅长训练军队和组织战役，最终在楚国变法中被贵族杀害。',
    childhood: '出身卫国，早年求仕和游学经历带有强烈功名色彩；其母死不归、杀妻求将等故事可能经过后世道德化加工，生平应以军事和政治活动为主。',
    personality: '重军纪、能与士卒同甘共苦、行动果断，追求功业；同时善于权变和树敌，缺少贵族联盟支持成为其改革失败的重要原因。',
    policyInclination: '主张任贤、整军、削弱贵族世袭和将领私门，依据国家军功与行政能力配置资源，以中央集权应对诸侯竞争。',
    socialContribution: '参与魏国西河防务和楚国变法，军事思想与《吴子》传统影响后世兵学，展示战国军政改革的另一条路径。',
    impactSummary: '吴起不能只写成“善战名将”或“刻薄人物”。他的经历体现军事专业化、贵族利益、国家改革与个人功名之间的冲突。',
    disputeTabs: [
      { title: '军事改革视角', body: '吴起重视训练、军纪、将领与士卒关系以及根据地形用兵，在魏国西河防御中形成较强的实战声望。' },
      { title: '楚国变法视角', body: '楚悼王支持吴起削弱贵族、整顿官制和迁徙贵族，但悼王死后旧贵族反扑，说明改革缺少稳定继承和政治联盟。' }
    ],
    resume: [
      { timeText: '约前412-前381年', periodLabel: '鲁国与魏国', title: '将军 / 西河守', nominalDuty: '负责军队训练、边防城邑、战场指挥和地方防御。', authorityScope: '西河郡军队、城防、屯田、边民安置和对秦边界防务。', actualInfluence: '在魏国西河训练军队、抵御秦国，形成战国名将声望。', modernEquivalent: '职能近似边境战区司令兼防务行政负责人。', impact: '魏国西部防线和军事改革得到加强。' },
      { timeText: '前386-前381年', periodLabel: '楚国变法', title: '令尹 / 楚国军政改革者', nominalDuty: '统筹楚国官制、贵族、军队和地方行政改革。', authorityScope: '中央官署、贵族封地、军队、地方官吏和赋税制度，实际依赖楚悼王支持。', actualInfluence: '整顿官制、削弱贵族并强化军政，楚悼王死后遭贵族围攻而死。', modernEquivalent: '职能近似政府首脑兼军政改革总负责人。', impact: '楚国改革中断，但吴起传统成为后世法家和兵家讨论的重要案例。' }
    ]
  } },
  { id: 'xinling-jun', merge: {
    background: '信陵君魏无忌是战国四公子之一，长期活动于魏国与赵、秦、楚等国竞争环境，以窃符救赵和礼贤下士著称。',
    childhood: '出身魏国王室，是魏昭王之子、安釐王异母弟，拥有宗室身份和宾客资源；其成长环境使他熟悉宫廷、诸侯和士人网络。',
    personality: '礼贤下士、重承诺、敢于承担风险，善于凝聚门客；但行动常绕过君主和正式官制，体现战国权力结构的灵活与危险。',
    policyInclination: '主张联合诸侯、遏制秦国扩张并维护魏赵安全，重视宾客、游说和军事救援，不完全依赖魏王的正式命令体系。',
    socialContribution: '窃符救赵保存赵国都城，参与合纵抗秦，公子养士和门客政治成为战国社会流动与人才竞争的代表现象。',
    impactSummary: '信陵君的“仁义”与越权并存。他的救赵行动有战略价值，也暴露宗室贵族、君主权力和私人宾客网络之间的张力。',
    disputeTabs: [
      { title: '合纵抗秦视角', body: '魏无忌以宗室威望和门客网络联合诸侯，窃符救赵阻止秦军迅速灭赵，改变战国后期力量平衡。' },
      { title: '公子政治视角', body: '他绕过魏王夺取兵符，说明战国正式官制尚未完全替代宗族、门客和私人信任；救赵成功后也因猜疑失去实际军政权。' }
    ],
    resume: [
      { timeText: '约前260年', periodLabel: '魏国公子与养士', title: '信陵君 / 宗室政治人物', nominalDuty: '以宗室身份参与魏国外交、宾客接待和诸侯关系协调。', authorityScope: '王室声望、门客、游士和私人外交网络，没有稳定的国家行政辖区。', actualInfluence: '招纳侯嬴、朱亥等宾客，在魏赵危机中形成独立于常规官僚的行动能力。', modernEquivalent: '不能直接类比现代职位，职能近似王室政治顾问兼跨国联盟协调者。', impact: '门客网络成为战国政治和知识传播的重要媒介。' },
      { timeText: '前257年', periodLabel: '窃符救赵', title: '魏军实际统帅 / 赵国救援者', nominalDuty: '调动魏军、解除邯郸之围并处理与赵国的军事协同。', authorityScope: '魏军援赵部队、行军路线、战场指挥和与赵国的盟军关系，行动合法性来自兵符和宗室威望。', actualInfluence: '通过窃符和朱亥击杀晋鄙取得兵权，击退秦军并解除邯郸之围。', modernEquivalent: '职能近似联军战区指挥官，但不具现代法定授权。', impact: '赵国得以延续，秦国东进速度受阻。' }
    ]
  } },
  { id: 'jing-ke', merge: {
    background: '荆轲是战国末年燕国谋士和刺客，受燕太子丹委托刺杀秦王政，行动失败后被杀，成为中国历史中最著名的刺客形象之一。',
    childhood: '籍贯和早年经历记载不一，曾游历赵、燕等地并结交田光、高渐离等人。关于其剑术、游侠生活和个人性格的细节带有《史记》文学化叙事。',
    personality: '沉着、重承诺、有悲剧性义烈形象，行动前能等待时机；战略上依赖一次刺杀改变国家格局，缺少对秦国组织和替代方案的充分评估。',
    policyInclination: '服务燕国抗秦和太子丹的政治目标，主张以刺杀、外交和个人牺牲阻止秦军东进，不代表成熟的国家治理方案。',
    socialContribution: '其故事保存了战国游侠、士人报知遇和反抗强权的文化记忆，对后世文学、戏剧和忠勇叙事影响深远。',
    impactSummary: '荆轲刺秦王需要区分史实行动与“风萧萧兮易水寒”等后世文学形象。刺客的勇气不能掩盖燕国战略资源有限和秦国国家能力的差距。',
    disputeTabs: [
      { title: '义士与游侠视角', body: '荆轲以个人生命承担燕国危机，体现战国士人重诺、报知遇和以身许国的伦理想象。' },
      { title: '战略失败视角', body: '刺杀行动缺乏后续政治方案，即使成功也未必能阻止秦国长期统一；失败后燕国军政压力迅速加剧。' }
    ],
    resume: [
      { timeText: '约前230-前227年', periodLabel: '燕国抗秦准备', title: '游士 / 太子丹门客', nominalDuty: '参与燕国情报、外交、游说和刺杀计划。', authorityScope: '没有正式官职，主要依靠太子丹、田光等私人信任和游侠网络行动。', actualInfluence: '接受樊於期首级、燕督亢地图等条件，准备进入秦廷接近秦王。', modernEquivalent: '职能近似秘密外交与特种行动人员，但不具有现代国家授权体系。', impact: '将燕国抗秦从常规外交转向高风险个人行动。' },
      { timeText: '前227年', periodLabel: '荆轲刺秦王', title: '燕国刺客 / 失败的政治行动者', nominalDuty: '以外交使者身份接近秦王并执行刺杀，争取燕国战略时间。', authorityScope: '没有独立行政权，行动范围局限于使团、匕首和秦廷接见场合。', actualInfluence: '刺杀失败并被秦王反击杀死，秦国随后加强对燕的军事压力。', modernEquivalent: '不能类比现代职位，属于战国政治暴力行动者。', impact: '成为秦统一前夜最具象征性的反抗事件。' }
    ]
  } },
  { id: 'lu-zhi', merge: {
    background: '吕后即吕雉，是汉高祖刘邦皇后和汉惠帝时期的实际政治核心，经历楚汉战争、皇位继承、诸吕集团与中央集权重建。',
    childhood: '出身沛县地方家庭，嫁给刘邦后经历秦末起义、楚汉战争和流亡，长期参与家庭、军队和政治联盟的生存压力。',
    personality: '坚韧、果断、善于控制宫廷和官员，重视家族安全与皇权秩序；处理戚夫人、韩信和诸侯的方式体现高压权力逻辑。',
    policyInclination: '延续休养生息和黄老政治方向，维持刘氏皇权与吕氏外戚网络，采用分封、任官、宫廷控制和严厉惩罚平衡诸侯。',
    socialContribution: '在汉初恢复和权力过渡中维持中央政权，推动文景时期稳定条件形成；其外戚专权和政治暴力也留下深刻争议。',
    impactSummary: '吕后不是单纯的“狠毒皇后”，而是从战争家庭成员转为最高政治决策者。她的统治展示女性掌权、外戚政治、皇位继承和汉初休养生息的复杂结合。',
    disputeTabs: [
      { title: '汉初秩序视角', body: '吕后在刘邦去世后维持中央政府、继续轻徭薄赋和黄老路线，为汉初恢复提供稳定环境。' },
      { title: '外戚与政治暴力视角', body: '她通过宫廷、外戚和诛杀手段清除威胁，诸吕之乱最终反噬吕氏家族，说明个人控制不能替代继承制度。' }
    ],
    resume: [
      { timeText: '前206-前195年', periodLabel: '楚汉战争与汉初皇后', title: '汉王妃、皇后 / 后方政治组织者', nominalDuty: '管理后方宫廷、家庭、粮食、人质和与诸侯的政治关系。', authorityScope: '汉王后方、关中家属、宫廷资源和部分人事建议，权力依赖刘邦集团军政安排。', actualInfluence: '在刘邦长期外战期间维持家族和后方网络，参与处理韩信、彭越等功臣关系。', modernEquivalent: '职能近似战时国家元首配偶兼后方政治协调者。', impact: '为汉初皇权和宫廷网络形成积累政治经验。' },
      { timeText: '前195-前180年', periodLabel: '吕后临朝', title: '皇太后 / 汉朝实际最高决策者', nominalDuty: '代表幼帝处理官员任免、诸侯、财政、军队和外交。', authorityScope: '中央官僚、宫廷、诸侯王、吕氏外戚和诏令体系，实际权力高于惠帝及后少帝。', actualInfluence: '维持汉初休养生息并扩大吕氏政治影响，死后诸吕被周勃、陈平等清除。', modernEquivalent: '职能近似幼主时期的国家摄政与最高行政决策者。', impact: '汉初中央集权和外戚政治的双重传统由此定型。' }
    ]
  } },
  { id: 'huo-guang', merge: {
    background: '霍光是汉武帝晚年的辅政重臣，受遗诏辅佐昭帝，后参与废昌邑王、拥立宣帝，长期掌握西汉中枢军政。',
    childhood: '出身河东霍氏，因兄长霍去病关系进入宫廷，长期担任禁中近臣，熟悉皇帝诏令、宫廷安全和中央人事。',
    personality: '谨慎、沉默、善于维护中枢平衡和控制信息，不以公开才辩著称；霍氏家族后期扩张和骄纵造成严重政治反作用。',
    policyInclination: '继承昭帝时期减轻战争负担、恢复财政与谨慎对外政策，优先维护皇权连续和中枢稳定，避免汉武帝后期的过度扩张。',
    socialContribution: '在汉武帝死后避免继承危机，推动昭宣中兴和西汉恢复；其家族专权也促成外戚政治风险的反复。',
    impactSummary: '霍光的辅政体现“权臣保皇”模式：他可以稳定帝国，也可能因控制皇帝、废立继承和家族扩张而威胁皇权。',
    disputeTabs: [
      { title: '昭宣中兴视角', body: '霍光减少对外战争、整顿财政和官员，使汉朝从武帝晚年的高压扩张转向恢复，昭帝与宣帝时期社会逐步稳定。' },
      { title: '权臣与外戚视角', body: '废昌邑王、拥立宣帝说明霍光拥有超越普通宰相的废立权，霍氏家族后来的灭亡反映权臣政治的制度风险。' }
    ],
    resume: [
      { timeText: '前87-前74年', periodLabel: '昭帝辅政', title: '大司马大将军 / 遗诏辅政重臣', nominalDuty: '辅佐幼帝处理军政、财政、官员和对外政策。', authorityScope: '大将军府、禁军、尚书、官员任免和重大诏令，与金日磾、上官桀等共同决策。', actualInfluence: '平衡辅政集团、压制政变并推动减轻徭役和战争负担。', modernEquivalent: '职能近似幼主时期国家安全与政府常务负责人。', impact: '汉朝从武帝后期的扩张状态转入恢复阶段。' },
      { timeText: '前74-前68年', periodLabel: '宣帝即位与中枢控制', title: '大司马大将军 / 皇位继承仲裁者', nominalDuty: '决定皇帝人选、统筹中枢军政和地方官员。', authorityScope: '宫廷继承、禁军、中央官署和对诸侯、外戚的控制，实际权力接近最高统治者。', actualInfluence: '废昌邑王并拥立汉宣帝，后继续控制政务，死后霍氏家族被宣帝清算。', modernEquivalent: '不对应现代职位，属于君主制下拥有废立权的辅政权臣。', impact: '昭宣中兴建立，也留下西汉外戚与权臣政治的制度警示。' }
    ]
  } },
  { id: 'zhang-zhongjing', merge: {
    background: '张仲景是东汉末医学家，《伤寒杂病论》传统将外感热病、杂病辨证和方剂经验系统整理，后世尊为医圣。',
    childhood: '家世和具体幼年经历记载有限，活动于疫病、战争和人口流动频繁的东汉末社会。其是否担任长沙太守以及部分传记细节存在传统说法。',
    personality: '重视临床观察、辨证和方药实践，关注疾病变化而非单一症状；“医圣”称号是后世尊崇，不应倒推其掌握现代医学知识。',
    policyInclination: '没有国家行政政策，主要以医术、诊疗规范和方剂整理回应疫病与民众健康问题，强调因时、因地、因人施治。',
    socialContribution: '整理伤寒与杂病诊疗经验，为中医辨证论治、经方体系和后世医学教育提供重要基础，保存东汉末疾病社会史线索。',
    impactSummary: '张仲景的医学贡献属于古代经验医学体系，不能与现代病原学和临床试验直接等同；《伤寒杂病论》的成书、散佚和后世重编也需标注版本层次。',
    disputeTabs: [
      { title: '医学史视角', body: '《伤寒论》《金匮要略》形成六经辨证、杂病辨治和经方传统，对东亚传统医学教育影响深远。' },
      { title: '史料与现代医学边界', body: '张仲景个人履历、长沙太守经历和著作原貌存在史料问题，古代方药经验不能替代现代诊断、药理和公共卫生。' }
    ],
    resume: [
      { timeText: '东汉末年', periodLabel: '地方与疫病社会', title: '医家 / 临床经验整理者', nominalDuty: '诊治伤寒、杂病和流行性疾病，观察病程并整理方药。', authorityScope: '没有稳定行政管辖权，主要服务地方患者、士人和军民群体。', actualInfluence: '把战争、疫病和临床观察中的经验整理为可传授的辨证与方剂知识。', modernEquivalent: '职能近似临床医生兼医学知识整理者。', impact: '为后世中医经典和经方教育提供基础。' },
      { timeText: '后世流传', periodLabel: '经典重编与医学教育', title: '医学经典作者 / 医学传统象征', nominalDuty: '通过著作影响诊疗、医家教育和方剂传承，不承担现实行政职务。', authorityScope: '影响医学文本、师承和临床实践，具体版本由后世医家整理、注释和再传播。', actualInfluence: '《伤寒论》《金匮要略》成为中医辨证论治的重要经典。', modernEquivalent: '职能近似医学经典作者与临床理论奠基者。', impact: '“医圣”形象体现中国医学传统对经典、经验和医德的长期尊崇。' }
    ]
  } },
  { id: 'wang-meng', merge: {
    background: '王猛是前秦苻坚时期的丞相和改革者，整顿吏治、发展农业、训练军队并辅佐前秦统一北方大部。',
    childhood: '出身北方汉人士族，早年隐居华阴并以经史、兵法和治国见识闻名，后被苻坚礼聘进入前秦中枢。',
    personality: '勤勉、严整、洞察力强，敢于惩治权贵并重视行政执行；对苻坚统一天下的战略有清醒判断，临终劝其慎伐东晋。',
    policyInclination: '主张法令、吏治、户籍、农业和军政同步整顿，尊重汉地官僚经验，同时服务氐族政权向多族群国家转型。',
    socialContribution: '使前秦短期内形成较强中央集权并统一黄河流域，推动十六国时期北方制度、民族和政治整合。',
    impactSummary: '王猛的功业说明十六国并非只有战乱和政权更替，也有官僚、农业、军队和族群整合；前秦淝水失败与其去世后的决策变化密切相关。',
    disputeTabs: [
      { title: '前秦改革视角', body: '王猛通过整顿吏治、压制权贵、恢复生产和训练军队，帮助苻坚建立十六国时期少见的集中行政体系。' },
      { title: '统一战略视角', body: '王猛晚年提醒苻坚不要在东晋尚强时贸然南征，淝水之战前后决策改变说明个人顾命重臣缺位的影响。' }
    ],
    resume: [
      { timeText: '约357-370年', periodLabel: '前秦中枢改革', title: '丞相 / 前秦行政整顿者', nominalDuty: '统筹官员任免、刑法、户籍、农业、财政和军队。', authorityScope: '前秦中央官署、关中与关东州郡、地方豪强、屯田和军需，权力依赖苻坚支持。', actualInfluence: '严惩权贵、恢复生产并整合汉地官僚，使前秦国力迅速增强。', modernEquivalent: '职能近似政府首脑兼组织、财政和国防改革负责人。', impact: '前秦由关中政权扩张为北方强国。' },
      { timeText: '370-375年', periodLabel: '统一北方与南征争论', title: '丞相 / 北方统一战略顾问', nominalDuty: '处理北方诸国兼并后的行政整合、军队和对东晋战略。', authorityScope: '新占领州郡、地方官员、军队、人口迁徙和外交决策建议。', actualInfluence: '参与灭前燕、代国等战争并反复劝苻坚整顿内政、慎重南征，死后前秦仍发动淝水远征。', modernEquivalent: '职能近似国家总理兼国家安全战略顾问。', impact: '王猛死后前秦失去关键协调者，统一成果和多族群秩序迅速暴露脆弱性。' }
    ]
  } },
  { id: 'marco-polo', merge: {
    background: '马可·波罗是13世纪威尼斯商人和旅行者，长期活动于蒙古帝国控制的欧亚交通网络，后世以《马可·波罗游记》认识元代中国和亚洲贸易。',
    childhood: '出生于威尼斯商人家庭，少年时期处在地中海贸易、十字军余波和蒙古西征后的欧亚交流环境。其是否亲自到达全部书中地点，部分细节一直存在学术讨论。',
    personality: '观察敏锐、善于记述城市、商品、税制和宫廷见闻，表达中夹有商人视角和听闻材料；不能把游记中的每一项异闻都当作直接实录。',
    policyInclination: '没有元朝正式政策权，主要通过旅行、贸易和叙述传播欧亚地理、城市和政权信息，影响欧洲对亚洲的想象。',
    socialContribution: '《马可·波罗游记》保存了欧洲读者对元大都、运河、纸币、盐业和亚洲贸易的早期认识，推动后世地理探索与跨文化交流。',
    impactSummary: '马可·波罗的价值在于跨区域信息传播，而不在于一份完整可靠的元廷履历。游记由口述、翻译和编纂共同形成，应把亲历、转述和文学加工区分开。',
    disputeTabs: [
      { title: '旅行交流视角', body: '其叙述让欧洲社会看到元代城市、道路、商业和行政规模，反映蒙古帝国打通欧亚交通后的信息流动。' },
      { title: '史料争议视角', body: '书中未提到长城、筷子等细节，不能单独证明其未到中国；同时也不能把所有记载都视为亲历，需要与元代中文、波斯和考古材料互证。' }
    ],
    resume: [
      { timeText: '约1271-1291年', periodLabel: '蒙古帝国与元代欧亚交通', title: '商人、旅行者 / 使团成员', nominalDuty: '参与商贸、使团往来和长途交通，记录沿途城市、物产与制度。', authorityScope: '没有元朝行政管辖权，依托商队、驿站、地方领主和宫廷接见网络旅行。', actualInfluence: '通过往返欧亚的旅行与口述，把元代中国和亚洲贸易信息带回地中海世界。', modernEquivalent: '职能近似国际商务旅行者兼跨文化调查记者。', impact: '扩大欧洲对东亚和蒙古帝国的地理认识。' },
      { timeText: '1298年以后', periodLabel: '游记传播', title: '旅行叙事作者 / 信息传播者', nominalDuty: '通过口述和文本整理传播欧亚地理、城市和商品知识。', authorityScope: '没有行政权，影响集中在商人、航海者、地理学者和欧洲读者。', actualInfluence: '《马可·波罗游记》经鲁斯蒂谦等人整理流传，成为后世探索亚洲的重要知识来源之一。', modernEquivalent: '职能近似国际纪实作者和地理知识传播者。', impact: '欧亚交流从商路经验转化为欧洲公共地理想象。' }
    ]
  } },
  { id: 'zhao-mengfu', merge: {
    background: '赵孟頫是南宋宗室后裔、元代书画家、文学家和官员，生活在宋元政权更替与士人身份重组时期，书法、绘画和篆刻影响深远。',
    childhood: '出身宋室宗亲家庭，南宋灭亡后面对遗民身份与元朝征召的选择，接受经史、书画和文人传统教育，逐渐以艺术和学术建立新的社会位置。',
    personality: '博学、审美敏锐、善于融会古今，政治选择常被后世置于“仕元还是守节”的评价中；其艺术实践显示对传统技法的主动复兴。',
    policyInclination: '任元朝官职期间参与文书、礼制和文化事务，主要通过书画、古文字和教育传播维系汉地文人传统，而非推动激烈政治改革。',
    socialContribution: '复兴晋唐书法和古典绘画语言，推动文人画、篆刻和书画鉴藏发展，其艺术风格影响元明清士人文化。',
    impactSummary: '赵孟頫的历史意义同时包含艺术革新、文化传承和遗民身份争议。仕元并不等于放弃宋文化，他以元代官僚身份保存和重构了大量传统艺术资源。',
    disputeTabs: [
      { title: '艺术史视角', body: '赵孟頫以复古为创新，重建晋唐书法和文人画的笔墨体系，影响元四家及明清书画传统。' },
      { title: '遗民与仕元视角', body: '作为宋室后裔，他入元任官受到后世节义评价，但元朝也依靠其文书、礼制和文化能力治理汉地，不能只按忠奸二分。' }
    ],
    resume: [
      { timeText: '1286-1299年', periodLabel: '元初征召与中央任官', title: '翰林待制、集贤直学士 / 文教官员', nominalDuty: '参与制诰、礼制、史学和宫廷文化事务。', authorityScope: '中央文书、翰林院与集贤院学术、礼制建议和文人任用，缺少地方军政权。', actualInfluence: '以宋室宗亲和书画声望进入元廷，为新王朝提供汉地文书与文化资源。', modernEquivalent: '职能近似中央文教机构高级官员兼国家文化顾问。', impact: '元朝汉地文官与文化秩序获得一位重要桥梁人物。' },
      { timeText: '1299-1322年', periodLabel: '江南与晚年书画', title: '地方官、翰林学士 / 书画宗师', nominalDuty: '处理地方行政、赋税、学校和中央文史事务，并进行书画创作。', authorityScope: '任职地方的户籍、钱粮、学校和司法，艺术影响则扩展到士人、画院和鉴藏圈。', actualInfluence: '在政务与创作之间往返，以书画、题跋和弟子网络重建古典艺术传统。', modernEquivalent: '职能近似地方行政官兼国家级艺术家和文化教育者。', impact: '元代文人画和书法复古运动形成长期风格。' }
    ]
  } },
  { id: 'huang-daopo', merge: {
    background: '黄道婆是宋末元初棉纺织技术传播者，长期生活在海南黎族地区，返回松江后改进纺车、纺织工艺和棉花加工，推动江南棉业发展。',
    childhood: '关于出生、家庭和具体经历的史料很少，传统记载说她因生活困顿到海南，在当地学习黎族纺织技术，后来把经验带回松江。',
    personality: '重实践、善观察和改良工具，能够跨地域学习并把不同群体的工艺结合；后世“纺织女神”形象包含民间崇敬和传说成分。',
    policyInclination: '没有国家官职，主要通过技术改进、师徒传授和生产组织改变民间产业，回应江南棉布需求和家庭手工业发展。',
    socialContribution: '推动松江棉纺织技术和生产规模提升，改善纺纱、织布和轧棉流程，使棉布逐渐成为江南民众服用和商品生产的重要材料。',
    impactSummary: '黄道婆的贡献不是单一的“发明者故事”，而是海南黎族经验、江南市场、妇女劳动和工具改良共同作用的技术传播案例。',
    resume: [
      { timeText: '宋末元初', periodLabel: '海南学习纺织', title: '民间纺织劳动者 / 技术学习者', nominalDuty: '参与棉花加工、纺纱和织布生产，学习当地工艺。', authorityScope: '没有行政权，影响范围主要在家庭作坊、村落生产和师徒网络。', actualInfluence: '在海南接触黎族纺织技术并形成对纺车、纱线和织布流程的实践理解。', modernEquivalent: '职能近似产业工匠和技术培训者。', impact: '跨地域技术交流为后续江南棉业改良提供条件。' },
      { timeText: '元代松江', periodLabel: '棉纺织技术传播', title: '民间技术改良者', nominalDuty: '改进轧棉、弹棉、纺纱和织布工具并传授工艺。', authorityScope: '影响松江及周边家庭手工业、妇女劳动和地方棉布生产，没有官府辖区。', actualInfluence: '把海南工艺与江南生产需求结合，推动棉布产量、质量和商品化。', modernEquivalent: '职能近似纺织工艺工程师兼社区技术推广者。', impact: '江南棉业成为元明时期重要手工业和商品经济基础。' }
    ]
  } },
  { id: 'wei-zhongxian', merge: {
    background: '魏忠贤是明熹宗时期掌握司礼监和东厂权力的宦官，依托宫廷、厂卫、内阁和阉党网络影响天启朝政，后在崇祯初年失势自尽。',
    childhood: '早年家世和入宫经历记载不详，进入宫廷后因与客氏、明熹宗关系密切而获得内廷信任。其权力成长与皇帝怠政、宫廷信息封闭和党争有关。',
    personality: '善于经营宫廷关系、控制奏报和利用人事网络，缺乏长期国家治理能力；后世“九千岁”形象包含东林政治对手的批判和民间戏剧化表达。',
    policyInclination: '以维护内廷权力、厂卫侦缉和个人集团为核心，支持对东林党人及异己的压制，财政和边防政策多服务于权力控制。',
    socialContribution: '其专权促使明末政治集团、宦官制度和皇权监督问题集中暴露，也反向推动后世对东林、厂卫和内廷政治的讨论。',
    impactSummary: '魏忠贤不能被写成明亡唯一责任人。辽东军费、财政困局、党争、皇帝决策和地方社会危机共同构成晚明危局，但他的厂卫专权确实破坏了政治信任。',
    disputeTabs: [
      { title: '宦官专权视角', body: '魏忠贤利用司礼监批红、东厂侦缉和阉党人事网络排斥异己，使内廷权力直接干预外朝官僚和司法。' },
      { title: '晚明结构危机视角', body: '明朝衰败还与财政、辽东战争、税役、党争和皇帝怠政有关，不能把复杂的国家危机全部归结为魏忠贤个人。' }
    ],
    resume: [
      { timeText: '1620-1625年', periodLabel: '天启初年宫廷崛起', title: '司礼监秉笔太监 / 内廷近臣', nominalDuty: '处理皇帝批红、诏令传达、宫廷事务和部分监察信息。', authorityScope: '司礼监文书、内廷人事、厂卫奏报与皇帝信息入口，实际权力依赖明熹宗信任。', actualInfluence: '联合客氏并逐步控制奏报、人事和宫廷舆论，形成阉党核心。', modernEquivalent: '不对应现代职位，属于君主制内廷文书与安全权力核心。', impact: '内廷对外朝的干预达到晚明高峰。' },
      { timeText: '1625-1627年', periodLabel: '魏忠贤专权', title: '司礼监掌印系统核心 / 厂卫政治操控者', nominalDuty: '协助皇帝处理诏令、官员考察、厂卫侦缉和政治案件。', authorityScope: '东厂、锦衣卫协同，影响内阁、六部、地方官员和东林党人，缺少公开行政责任。', actualInfluence: '以党同伐异和厂卫案件巩固集团，崇祯即位后被削职，最终自缢。', modernEquivalent: '不对应现代职位，属于宫廷安全与秘密监察权力的个人化掌控者。', impact: '加剧晚明官僚不信任和皇权监督失衡。' }
    ]
  } },
  { id: 'zheng-chenggong', merge: {
    background: '郑成功是明末清初海上军事领袖，继承郑芝龙集团的海商、船队和沿海网络，以“反清复明”为政治号召，最终从荷兰殖民者手中收复台湾。',
    childhood: '出生于平户，父亲郑芝龙兼具海商、海盗和明朝海防身份，母亲田川氏。郑成功在闽南、海上和明廷教育中成长，熟悉沿海贸易、宗族与军队。',
    personality: '纪律严明、意志坚决、重视名分和组织，能够整合海商、明军遗部与地方资源；对部属和异议也较为严厉，政治选择受家族与时代夹缠。',
    policyInclination: '以延续南明、控制东南沿海和建立海上根据地为目标，重视屯田、军粮、船队和对外贸易，兼具军事反清与区域政权经营。',
    socialContribution: '收复台湾并建立郑氏政权，推动台湾汉人社会、农业、港口和海上贸易发展；其政治身份在明清鼎革与台湾历史中具有多重解释。',
    impactSummary: '郑成功既是南明抗清将领，也是海上政权建立者和台湾开发者。收复台湾不能脱离荷兰殖民、原住民社会、郑氏军政和东亚海域贸易共同理解。',
    disputeTabs: [
      { title: '抗清复明视角', body: '郑成功以明朝正朔和南明永历帝名义组织海上力量，长期袭扰东南沿海并试图恢复明朝政治。' },
      { title: '台湾政权视角', body: '收复台湾后郑氏建立军政、屯田和贸易体系，但也与当地原住民、荷兰人和移民社会发生复杂关系，不能只用民族英雄单一叙事概括。' }
    ],
    resume: [
      { timeText: '1646-1659年', periodLabel: '南明沿海抗清', title: '延平王、招讨大将军 / 海上抗清统帅', nominalDuty: '统率船队、沿海军镇、粮饷、港口和南明外交。', authorityScope: '福建、广东沿海部分港口、海上船队、屯田和贸易网络，实际不受清廷管辖。', actualInfluence: '整合郑氏海商与明军残部，控制厦门、金门等据点并多次北伐清军。', modernEquivalent: '职能近似海上战区司令兼流亡政权军事负责人。', impact: '南明抗清力量在东南沿海长期延续。' },
      { timeText: '1661-1662年', periodLabel: '收复台湾', title: '台湾政权开创者 / 海上军政领袖', nominalDuty: '统筹远征、港口、军队、屯田、移民和台湾行政。', authorityScope: '台湾西部港口与据点、郑氏军队、农屯、贸易和对荷兰谈判。', actualInfluence: '登陆台湾、围攻热兰遮城并迫使荷兰撤离，建立郑氏在台统治。', modernEquivalent: '职能近似战区统帅兼新占领地区最高行政负责人。', impact: '台湾进入以汉人军政、农业和海贸为核心的新阶段。' }
    ]
  } },
  { id: 'shi-lang', merge: {
    background: '施琅是清初海军将领，早年属于郑氏海上集团，后归清并长期研究台湾、澎湖和闽海水文，1683年率军击败郑氏政权。',
    childhood: '出身福建晋江沿海军户和海商环境，熟悉船队、潮汐、岛屿和闽南社会。其父兄与郑氏集团关系复杂，个人经历影响了归清后的军事选择。',
    personality: '善于海战、重视准备和情报，行动坚决；降清经历和对郑氏旧部的严厉处置使其历史评价同时包含军事才能与政治争议。',
    policyInclination: '主张以海军、炮船、封锁和招抚并用解决台湾问题，支持将台湾纳入清朝行政，但对沿海军民和旧部采取严格控制。',
    socialContribution: '结束郑氏在台湾的军事政权并促成清朝设置台湾府，推动清廷将海疆治理纳入省级行政和海防体系。',
    impactSummary: '施琅收台不能只理解为一次海战胜负，还涉及郑清关系、海禁贸易、台湾行政、沿海移民和清朝海疆观念转型。',
    disputeTabs: [
      { title: '军事与海防视角', body: '施琅通过熟悉闽台海域、集中水师和切断澎湖支援击败郑氏，显示清军在海战组织上的转变。' },
      { title: '台湾治理视角', body: '清廷设置台湾府并实行渡台、番界和海防制度，统一带来行政与贸易联系，也伴随对沿海人口和原住民社会的管控。' }
    ],
    resume: [
      { timeText: '1663-1681年', periodLabel: '清初福建海防', title: '水师提督 / 闽海军事负责人', nominalDuty: '统辖福建水师、海防、岛屿、船厂和沿海军民。', authorityScope: '福建沿海港口、澎湖航线、水师船队、军粮和对郑氏的军事外交。', actualInfluence: '整顿清军水师并反复研究潮汐、岛屿和郑氏防线，为收台准备。', modernEquivalent: '职能近似海军战区司令兼海防行政负责人。', impact: '清朝海军与海疆政策逐渐制度化。' },
      { timeText: '1683-1684年', periodLabel: '澎湖海战与台湾建府', title: '靖海将军 / 收台统帅', nominalDuty: '统率渡海作战、受降、岛屿驻防和台湾行政接管。', authorityScope: '福建水师、澎湖与台湾清军、投降官兵、海贸和地方建置建议。', actualInfluence: '攻克澎湖并促成郑克塽投降，建议清廷设台湾府隶福建。', modernEquivalent: '职能近似海军远征军司令兼新领土接管负责人。', impact: '台湾纳入清朝版图与行政体系。' }
    ]
  } },
  { id: 'heshen', merge: {
    background: '和珅是乾隆晚年权臣，出身满洲正红旗，凭军机处、内务府和皇帝宠信掌握人事、财政与外交事务，嘉庆即位后被抄家处死。',
    childhood: '出身旗人家庭，早年入侍乾隆并接受宫廷文书、满汉语言和骑射教育。其迅速升迁与乾隆晚年对近臣、密折和内廷控制的依赖密切相关。',
    personality: '聪敏、善于揣摩皇帝意图、处理复杂事务和经营人际网络；重视财富与家族利益，权力扩张造成官场腐败和对皇权的过度依附。',
    policyInclination: '倾向以皇帝近臣、军机处和内务府的集中渠道处理财政、边疆和官员事务，重视短期供给与宫廷利益，缺少公开监督。',
    socialContribution: '参与乾隆晚年国家财政、外交和宫廷事务，其倒台暴露清代官僚、内务府、捐纳和权力监督的结构问题；财富传说存在夸张成分。',
    impactSummary: '和珅不是清朝衰败唯一原因，但其专权、受贿和乾隆政治模式加剧了财政与官僚信任危机。评价其家产数字应区分档案、抄家清单与民间传说。',
    disputeTabs: [
      { title: '权臣与腐败视角', body: '和珅利用军机处、内务府、官员升迁和工程采购积累财富，形成皇帝宠臣与官僚利益网络。' },
      { title: '行政能力视角', body: '他也处理过外交、军需、河工和宫廷事务，嘉庆抄家部分清单和“富可敌国”数字被后世放大，不能替代具体档案分析。' }
    ],
    resume: [
      { timeText: '1772-1789年', periodLabel: '乾隆中后期崛起', title: '侍卫、内务府大臣、军机大臣', nominalDuty: '处理宫廷文书、皇帝传令、财政、工程和官员奏报。', authorityScope: '内务府财物、军机处机密、宫廷工程、盐政与部分地方官员沟通，权力来自皇帝信任。', actualInfluence: '以语言能力和办事效率获得乾隆重用，逐步进入军政、财政和外交核心。', modernEquivalent: '职能近似国家元首办公与财政事务高级协调者，但缺乏现代公开监督。', impact: '晚清式权臣网络在乾隆晚年形成。' },
      { timeText: '1789-1799年', periodLabel: '乾隆晚年权力高峰', title: '首席军机大臣 / 宫廷权臣', nominalDuty: '协助皇帝处理军机、官员、财政、边疆和重大案件。', authorityScope: '军机处、内务府、官员任免建议、宫廷采购和地方督抚信息渠道，实际权力远超普通官员。', actualInfluence: '维持乾隆晚年政治运转并扩大个人财富与家族势力，嘉庆亲政后被查抄处死。', modernEquivalent: '不对应现代职位，属于君主制下的最高近臣和行政资源中介。', impact: '和珅案成为清代官僚腐败与皇权监督失衡的典型。' }
    ]
  } },
  { id: 'zuo-zongtang', merge: {
    background: '左宗棠是晚清湘军系统出身的政治家、军事家和洋务人物，参与镇压太平天国、收复新疆、治理西北并推动福州船政。',
    childhood: '出身湖南湘阴士人家庭，科举仕途不顺但长期研习经世、农政、舆地和兵法，后来以幕僚和地方军政经验进入晚清危机中心。',
    personality: '自信、果断、重实务和战略纵深，善于筹粮、练兵与经营交通；性格强硬、与李鸿章等存在路线竞争。',
    policyInclination: '主张维护领土、发展军工和农业、重视西北屯田与边防，支持引进近代船政技术，同时坚持清朝中央名义和传统秩序。',
    socialContribution: '收复新疆、推动西北建省和福州船政，对晚清边疆、军工、教育和国家领土观念产生深远影响。',
    impactSummary: '左宗棠既是传统士大夫式疆臣，也是洋务军工的推动者。收复新疆依赖清廷财政、湘军、地方民屯和国际形势，不能只归功个人。',
    disputeTabs: [
      { title: '边疆与领土视角', body: '左宗棠坚持出兵新疆并以粮道、屯田和行政建置巩固战果，推动清廷把西北从军事占领转为行省治理。' },
      { title: '洋务与地方军权视角', body: '他支持船政、枪炮和新式军工，但其军队和地方资源也强化了晚清督抚权力，体现自强与地方化同时发生。' }
    ],
    resume: [
      { timeText: '1860-1868年', periodLabel: '湘军与洋务军政', title: '浙江巡抚、闽浙总督 / 战区军政长官', nominalDuty: '负责地方行政、军队、粮饷、海防和洋务工厂建设。', authorityScope: '浙江、福建等省州县、湘军部队、海防、船政和地方财政，受中央与地方督抚协同约束。', actualInfluence: '参与平定太平天国和捻军，支持福州船政与近代海军建设。', modernEquivalent: '职能近似省级行政长官兼区域军政和工业建设负责人。', impact: '晚清地方军政与近代军工体系进一步发展。' },
      { timeText: '1875-1881年', periodLabel: '收复新疆与设省', title: '钦差大臣、陕甘总督 / 西北战区统帅', nominalDuty: '统筹西北军队、粮道、屯田、外交和战后行政建置。', authorityScope: '陕甘、新疆战区的军队、驿道、粮运、地方官员和驻军，受中央财政与外交支持制约。', actualInfluence: '率军收复新疆大部并推动新疆建省，反对放弃西北。', modernEquivalent: '职能近似跨省战区司令兼边疆重建与开发负责人。', impact: '清朝西北疆域和行省治理结构得到巩固。' }
    ]
  } },
  { id: 'zhang-zhidong', merge: {
    background: '张之洞是晚清督抚、洋务和教育改革人物，先后治理山西、湖北、两广和湖广，创办汉阳铁厂、湖北新军和新式学校。',
    childhood: '出身贵州兴义士人家庭，科举入翰林，早年以清流言论闻名，后来转向地方实务、军工、教育和实业建设。',
    personality: '重视传统名教又关注实业技术，行政执行力强、用人有组织性；其“中学为体、西学为用”体现了有限改革和制度保守并存。',
    policyInclination: '主张以儒学伦理维护政治秩序，同时引进铁路、军工、教育和工业技术，支持新式军队但不主张立即推翻君主制度。',
    socialContribution: '推动湖北新军、武昌教育、汉阳铁厂和铁路建设，培养近代技术与军事人才，晚清新政和辛亥革命都受到其建设的间接影响。',
    impactSummary: '张之洞的改革具有“以传统保改革”的特点，工业、教育和新军既增强清朝国家能力，也培养了要求宪政和革命的社会力量。',
    disputeTabs: [
      { title: '洋务建设视角', body: '张之洞把军工、铁路、学堂和实业纳入地方治理，推动湖北成为晚清近代工业和新军中心。' },
      { title: '保守改革视角', body: '他坚持君主秩序和传统伦理，对制度权力结构改革有限；其建设成果后来反过来成为清朝政治转型的资源。' }
    ],
    resume: [
      { timeText: '1881-1894年', periodLabel: '地方督抚与洋务建设', title: '山西巡抚、两广总督 / 地方行政与洋务负责人', nominalDuty: '管理省级行政、财政、军队、教育和对外交涉。', authorityScope: '辖区州县、钱粮、军营、矿务、学堂、海防和地方官员任免建议。', actualInfluence: '整顿地方、兴办洋务并推动广东、湖广军政与教育改造。', modernEquivalent: '职能近似省级政府主要负责人兼工业、教育和国防协调者。', impact: '地方督抚成为晚清国家建设与改革的重要执行层。' },
      { timeText: '1896-1907年', periodLabel: '湖北新军与教育实业', title: '湖广总督 / 近代化建设主持者', nominalDuty: '统筹湖北、湖南军政、财政、教育、铁路、工厂和新军。', authorityScope: '湖广两省州县、湖北新军、汉阳铁厂、铁路和各级学堂，受中央财政和督抚权力制约。', actualInfluence: '创办武备学堂、师范学堂、汉阳铁厂和新式军队，形成武昌近代政治社会。', modernEquivalent: '职能近似跨省行政长官兼工业、教育与国防建设负责人。', impact: '新军和新学堂成为辛亥革命前夕的重要社会力量。' }
    ]
  } },
  { id: 'deng-shichang', merge: {
    background: '邓世昌是清末北洋海军将领，任致远舰管带，参加甲午黄海海战并战死，后世以其忠勇形象记忆甲午战争。',
    childhood: '出身广东番禺商人家庭，接受福州船政学堂等近代海军教育，熟悉舰炮、航海、编队和新式海军训练。',
    personality: '勇敢、服从舰队指挥、重视战斗纪律和舰员责任，在弹药、舰体受损时仍试图接近敌舰；具体撞舰细节有后世叙事加工。',
    policyInclination: '主要服务北洋海军作战和海防建设，主张通过训练、舰炮和编队作战维护海疆，不属于独立政治政策制定者。',
    socialContribution: '以甲午黄海海战中的战死成为近代海军教育、民族危机和公共牺牲记忆的重要象征，体现洋务海军建设的成就与局限。',
    impactSummary: '邓世昌的牺牲值得纪念，但甲午失败不能归因于个人勇怯。舰队训练、弹药补给、指挥系统、财政和全国军政协调共同决定战果。',
    resume: [
      { timeText: '1880-1894年', periodLabel: '北洋海军建设', title: '副将、舰长 / 海军训练官', nominalDuty: '负责舰艇航海、炮术训练、舰员管理和海防巡航。', authorityScope: '所辖舰艇、舰员、武器、航线和港口任务，受北洋海军提督与舰队编制约束。', actualInfluence: '在近代海军训练和舰艇编制中积累经验，成为北洋舰队骨干。', modernEquivalent: '职能近似海军舰长兼舰艇训练负责人。', impact: '洋务海军形成一批受现代训练的职业军官。' },
      { timeText: '1894年', periodLabel: '甲午黄海海战', title: '致远舰管带 / 海战指挥官', nominalDuty: '指挥致远舰执行编队作战、炮击、救援和脱离战场。', authorityScope: '致远舰舰员、舰炮、航行和战场临机决策，服从北洋舰队总体指挥。', actualInfluence: '在舰体重创、弹药紧张时仍向日舰发起攻击，最终与舰同沉。', modernEquivalent: '职能近似海军主力舰舰长。', impact: '成为甲午战争和中国近代海军史中的牺牲象征。' }
    ]
  } },
  { id: 'yuan-shikai', merge: {
    background: '袁世凯是晚清北洋军政首领、中华民国临时大总统和民国首任正式大总统，经历朝鲜事务、北洋新军、辛亥革命、帝制尝试和军阀政治开端。',
    childhood: '出身河南项城袁氏家庭，早年科举未成后投身淮军与朝鲜事务，凭军事、外交和新军训练进入清廷最高权力中心。',
    personality: '善于权衡、组织军队和利用政治机会，行政与军事能力强；同时重视个人权力、缺乏对议会和政党制衡的信任，晚年判断严重失误。',
    policyInclination: '主张以强有力中央政府、北洋军队和渐进式立宪维持国家统一，反对地方分裂；后期试图恢复帝制，背离共和政治。',
    socialContribution: '编练北洋新军、推动清末新政和清帝退位谈判，建立民国初期中央机构；其军政个人化也为北洋军阀和长期政治分裂埋下基础。',
    impactSummary: '袁世凯既参与中国近代国家能力建设，也因逼宫、解散国会和称帝破坏共和制度。评价他必须同时观察军事现代化、国家统一和权力专断。',
    disputeTabs: [
      { title: '国家建设视角', body: '袁世凯训练北洋新军、参与清末官制改革并在南北谈判中促成清帝退位，具备强大的行政和军政组织能力。' },
      { title: '共和破坏视角', body: '他利用军队和总统权力压制议会、刺杀政治对手并称帝，导致护国战争和中央权威进一步崩解。' }
    ],
    resume: [
      { timeText: '1885-1909年', periodLabel: '朝鲜与北洋新军', title: '驻朝官员、直隶总督 / 新军建设者', nominalDuty: '处理朝鲜外交、地方行政、军队训练、财政和新政事务。', authorityScope: '朝鲜驻军与外交、直隶州县、北洋新军、军械、学堂和铁路等资源。', actualInfluence: '编练北洋新军并利用新式军政体系成为清廷最有实力的地方大员。', modernEquivalent: '职能近似区域军政长官兼军队现代化与地方行政负责人。', impact: '北洋军政集团成为清末民初政治主导力量。' },
      { timeText: '1911-1916年', periodLabel: '民国建立与帝制失败', title: '临时大总统、正式大总统 / 国家最高行政者', nominalDuty: '统辖中央政府、军队、财政、外交和省级政治关系。', authorityScope: '总统府、北洋军队、中央各部、外交与省级督军，实际权力受议会、地方势力和财政制约。', actualInfluence: '通过南北谈判接任总统并迫使清帝退位，随后解散国会、强化个人权力并称帝失败。', modernEquivalent: '形式上相当于国家元首兼政府首脑，实际权力高度依赖军队。', impact: '共和制度遭受重创，北洋军阀政治开始公开化。' }
    ]
  } },
  { id: 'qiu-jin', merge: {
    background: '秋瑾是晚清革命者、女性教育倡导者和作家，参与留日学生运动、光复会与革命宣传，1907年在绍兴被捕就义。',
    childhood: '出身福建侯官官宦家庭，成长于江浙士人环境，婚后赴日本留学并接触民族革命、女学和近代报刊，逐步突破传统女性身份。',
    personality: '果断、富有行动力和公共表达能力，重视女性解放与国家救亡；革命网络和武装计划准备不足，个人牺牲带有强烈象征性。',
    policyInclination: '主张推翻清朝、建立现代国家，提倡女子教育、婚姻自主和女性参与公共事务，依靠学校、报刊和革命团体传播理念。',
    socialContribution: '把民族革命与女性解放联系起来，创办或参与女学、报刊和革命组织，成为辛亥革命前女性公共参与和牺牲精神的代表。',
    impactSummary: '秋瑾的影响来自思想传播、教育实践和被捕就义后的公共记忆。她并非单纯“侠女”，而是近代国民、女性和革命组织同时形成的历史人物。',
    disputeTabs: [
      { title: '革命与女权视角', body: '秋瑾把反清、民族国家和女子教育结合起来，挑战女性只能处于家庭内部的传统角色。' },
      { title: '史实与文学形象', body: '后世戏剧和纪念叙事强化了她的侠女形象，具体革命联络、武装计划和临刑言行应以史料而非传说为依据。' }
    ],
    resume: [
      { timeText: '1904-1906年', periodLabel: '留日与革命宣传', title: '留日学生、女学倡导者 / 革命宣传者', nominalDuty: '参与留学生社团、女学、报刊和革命组织活动。', authorityScope: '没有国家行政权，主要影响留日学生、女性教育网络、报刊读者和革命社团。', actualInfluence: '在日本接触革命思想，组织演讲和写作，倡导女性教育与民族救亡。', modernEquivalent: '职能近似公共知识分子、教育倡导者和政治宣传组织者。', impact: '近代女性公共参与和革命话语获得更强社会能见度。' },
      { timeText: '1907年', periodLabel: '绍兴起义计划与就义', title: '革命联络者 / 牺牲者', nominalDuty: '联络革命党人、筹划武装起义并传播反清政治。', authorityScope: '地方会党、学生、报刊和革命网络，没有稳定军队或行政辖区。', actualInfluence: '因徐锡麟起义牵连被捕，在绍兴就义，成为革命宣传和女性解放象征。', modernEquivalent: '不能类比现代职位，属于失败革命运动的地方组织者。', impact: '其牺牲扩大了清末革命与女权思想的公共影响。' }
    ]
  } },
  { id: 'yan-taizi-dan', merge: {
    background: '燕太子丹是战国末年燕国太子，曾在秦国为质，归燕后面对秦军东进，组织田光、荆轲等人策划刺秦，最终燕国被秦灭。',
    childhood: '出身燕国王室，早年在秦国为质的经历可能加深了对秦王政和秦国权力的恐惧。具体童年材料有限，后世多从刺秦故事倒推其性格。',
    personality: '重视国家存亡、急于求成、善于聚集游士但缺少长期军政方案；对荆轲和樊於期的依赖体现战国末弱国的危机心理。',
    policyInclination: '以保存燕国、延缓秦军进攻和联络诸侯为目标，选择刺杀、外交和个人牺牲，而未能建立足以抵抗秦军的财政和军队体系。',
    socialContribution: '组织刺秦使团和反秦行动，留下太子丹、荆轲与易水的历史记忆，反映战国游侠伦理和弱国抗强的政治想象。',
    impactSummary: '太子丹不能只被写成“爱国太子”或刺杀失败的策划者。燕国资源、秦国军事压力、诸侯离散和宫廷决策共同决定了行动结局。',
    disputeTabs: [
      { title: '弱国抗秦视角', body: '太子丹在常规外交和军事支援不足时借助游士与刺客，体现燕国寻求非常手段自救的处境。' },
      { title: '战略判断视角', body: '刺杀秦王即使成功也缺少后续国家方案，且燕国军政基础薄弱，行动的象征价值大于改变统一战争的实际能力。' }
    ],
    resume: [
      { timeText: '战国末年', periodLabel: '秦燕外交与质子经历', title: '燕国太子 / 宫廷继承人', nominalDuty: '代表王室处理外交、人质关系和继承事务。', authorityScope: '王室使团、宫廷资源和部分外交联络，没有独立控制全国军队的权力。', actualInfluence: '在秦燕关系恶化后回到燕国，成为反秦政治行动的核心发起者。', modernEquivalent: '职能近似王室继承人兼国家外交事务参与者。', impact: '秦燕冲突被推向刺杀和灭国战争。' },
      { timeText: '前230-前227年', periodLabel: '刺秦计划', title: '反秦行动组织者', nominalDuty: '筹划使团、联络游士、处理情报与刺杀行动。', authorityScope: '燕国宫廷、门客、使团和部分地方支持者，没有稳定战区指挥权。', actualInfluence: '接纳田光、荆轲等人，提供督亢地图和樊於期首级，推动荆轲入秦。', modernEquivalent: '不能类比现代职位，属于战争危机中的政治行动策划者。', impact: '刺秦失败后秦军加速攻燕，太子丹和燕国很快失去政治空间。' }
    ]
  } },
  { id: 'zhou-bo', merge: {
    background: '周勃是秦末汉初将领和西汉开国功臣，跟随刘邦平定诸侯，汉文帝初年联合陈平清除诸吕并迎立代王刘恒。',
    childhood: '出身沛县基层，早年以编织养蚕器具和吹箫为生，后加入刘邦军队，凭勇力、军功和长期征战进入汉初功臣集团。',
    personality: '朴实、少文而有军队威望，能够在危机时果断行动；不擅长长期文官治理，晚年被诬告下狱也显示功臣政治的不安全。',
    policyInclination: '重视刘氏皇权、军队秩序和功臣联盟，反对外戚吕氏独占中枢；执政时倾向谨慎恢复而非大规模制度革新。',
    socialContribution: '参与建立西汉、平定异姓诸侯和清除诸吕，帮助汉初皇位从惠帝系转入文帝系；其经历体现军功集团与文官政治的衔接。',
    impactSummary: '周勃不是只会打仗的粗将。他在汉初继承危机中拥有禁军和功臣网络，但也因不熟文法、家族政治和权力猜疑遭遇风险。',
    resume: [
      { timeText: '前209-前202年', periodLabel: '秦末楚汉战争', title: '汉军将领 / 开国功臣', nominalDuty: '率军作战、攻城、平定地方和保护刘邦集团后方。', authorityScope: '所部军队、战区粮道、俘降和地方接管，服从刘邦与韩信等整体战略。', actualInfluence: '参与关中、彭城、垓下等战事，成为刘邦依赖的核心武将。', modernEquivalent: '职能近似方面军将领兼战后地方接管负责人。', impact: '为西汉建立和功臣封侯体系提供军功基础。' },
      { timeText: '前180-前179年', periodLabel: '诸吕之乱与文帝即位', title: '太尉、丞相 / 宫廷危机处置者', nominalDuty: '掌握京师军队、参与中央行政和皇位继承决策。', authorityScope: '北军、南军、宫廷安全、功臣与宗室关系，实际影响超出普通丞相。', actualInfluence: '与陈平联合控制军队、清除诸吕并迎立刘恒为汉文帝。', modernEquivalent: '职能近似国防与政府首脑共同主持的政权危机处置。', impact: '文景之治的皇位和政治联盟基础由此确立。' }
    ]
  } },
  { id: 'chao-cuo', merge: {
    background: '晁错是西汉景帝时期政治家、御史大夫，主张削弱诸侯王、加强中央并充实边防，七国之乱中因政治责任被景帝牺牲。',
    childhood: '出身颍川士人家庭，学习法家和经术，曾向张恢等学习，入仕后以敏锐的边疆、财政和诸侯问题分析获得文帝、景帝信任。',
    personality: '敢于提出激进政策、重制度和国家安全，但对诸侯反弹与政治联盟判断不足；政变压力下成为替罪羊。',
    policyInclination: '主张削藩、迁徙人口实边、整顿财政和改善边防，强调中央必须掌握军队、税收和任官权。',
    socialContribution: '推动汉初中央集权议题，削藩虽引发七国之乱，却为景帝以后诸侯权力下降和汉武帝制度扩张提供政治条件。',
    impactSummary: '晁错的失败不等于削藩没有必要。七国之乱的爆发涉及诸侯利益、景帝决策、吴楚资源和中央政治责任，不能把所有后果归到晁错个人。',
    disputeTabs: [
      { title: '中央集权视角', body: '晁错看到诸侯王拥有土地、军队和官吏任免权会威胁皇权，削藩与实边是解决汉初结构问题的制度方案。' },
      { title: '政治判断视角', body: '削藩顺序、速度和沟通方式激化反弹，景帝在七国起兵后杀晁错以求和解，但叛乱并未因此停止。' }
    ],
    resume: [
      { timeText: '前180-前157年', periodLabel: '文帝至景帝中枢', title: '太子家令、博士、御史大夫 / 政策顾问', nominalDuty: '参与礼制、边防、财政、诸侯和皇太子事务建议。', authorityScope: '中央奏议、监察与法令建议，实际执行依靠皇帝、丞相和地方官。', actualInfluence: '连续上疏分析诸侯和边疆问题，成为景帝改革的重要政策设计者。', modernEquivalent: '职能近似中央政策研究与监察高级官员。', impact: '汉初国家治理从休养生息转向中央集权议程。' },
      { timeText: '前154年', periodLabel: '七国之乱', title: '御史大夫 / 削藩政策负责人', nominalDuty: '负责监察、法令和削藩政策执行建议。', authorityScope: '中央官员与诸侯王监察、诏令执行和政策解释，没有独立调兵权。', actualInfluence: '七国起兵后被景帝处死以安抚诸侯，周亚夫随后平定叛乱。', modernEquivalent: '职能近似中央监察与制度改革负责人，政治责任受皇帝最终决策支配。', impact: '晁错之死成为改革者承担政治代价的经典案例。' }
    ]
  } },
  { id: 'xie-xuan', merge: {
    background: '谢玄是东晋将领、北府军创建与淝水之战的主要指挥者，出身陈郡谢氏，长期负责京口和淮水方向防务。',
    childhood: '成长于东晋门阀士族家庭，受到谢安、谢石等家族政治和军事资源支持，熟悉北方流民、京口军镇与长江防线。',
    personality: '善于识人、训练和临战指挥，能够保持军队纪律与士气；其功业依赖谢安中枢支持、北府兵组织和东晋地缘优势。',
    policyInclination: '主张以精锐防守、整合流民军队和有限反击维护东晋，不轻易把江南资源投入无准备的北伐。',
    socialContribution: '创建并统率北府军，在淝水击败前秦，保护东晋政权和江南社会，为南北长期分裂格局提供军事基础。',
    impactSummary: '谢玄的胜利不能只解释为“以少胜多的奇迹”，军队训练、秦军内部族群与补给问题、东晋政治协调和淝水地形共同决定战果。',
    resume: [
      { timeText: '约377-383年', periodLabel: '北府军建设', title: '兖州刺史、广陵相 / 京口军政负责人', nominalDuty: '负责流民安置、地方行政、军队训练和淮泗防线。', authorityScope: '京口及淮泗军镇、北府兵、屯田、粮道和地方州郡协同。', actualInfluence: '从流民和地方武人中选练精兵，形成东晋最具战斗力的北府军。', modernEquivalent: '职能近似边境战区司令兼军民安置负责人。', impact: '东晋获得抵抗前秦南侵的核心军力。' },
      { timeText: '383年', periodLabel: '淝水之战', title: '前锋都督 / 东晋北线统帅', nominalDuty: '统率北府军、协调各路晋军并负责淝水防御。', authorityScope: '淝水战区军队、粮道、将领调度和前线外交，受谢安中枢决策支持。', actualInfluence: '与谢石、刘牢之等击破前秦军，随后收复部分淮北地区。', modernEquivalent: '职能近似战区野战军总司令。', impact: '东晋延续，前秦统一北方的计划崩溃。' }
    ]
  } },
  { id: 'gu-kaizhi', merge: {
    background: '顾恺之是东晋画家、文学家和官员，以人物画、山水画理论和“传神写照”著称，代表中古绘画从形似走向神韵表达。',
    childhood: '出身江南士族，生活在东晋门阀和佛教、玄学、书画文化繁盛的环境，接受经史、文学和绘画教育。',
    personality: '想象力丰富、重视人物内在精神，行为传说带有名士式诙谐和后世艺术家传奇；其画迹多已不存，主要依靠摹本、画论和记载研究。',
    policyInclination: '没有重要行政改革主张，主要通过绘画、画论和文学影响视觉文化，关注人物神情、道德气质和宗教叙事。',
    socialContribution: '推动东晋人物画、佛教画和山水画理论发展，《女史箴图》等传统摹本成为中国绘画史和女性伦理图像研究的重要材料。',
    impactSummary: '顾恺之的价值不只在“画得像”，而在于把人物精神、文学叙事和视觉笔墨联系起来。现存作品多为摹本，年代与真伪需要审慎标注。',
    resume: [
      { timeText: '东晋中期', periodLabel: '士族文化与宫廷绘画', title: '散骑常侍等 / 宫廷与士人画家', nominalDuty: '参与宫廷文书、礼仪和人物、宗教绘画项目。', authorityScope: '正式行政权有限，主要影响宫廷图像、士族宴集和寺院绘画。', actualInfluence: '为人物、佛教和山水题材建立重视神情、构图和气韵的艺术语言。', modernEquivalent: '职能近似国家文化机构艺术家兼视觉叙事顾问。', impact: '东晋绘画理论和人物画传统进入经典化阶段。' },
      { timeText: '约4世纪后期', periodLabel: '画论与艺术传播', title: '画家 / 艺术理论传播者', nominalDuty: '创作绘画、撰写画论并通过师承、摹本和文人网络传播技法。', authorityScope: '没有地方管辖权，影响集中在书画家、宫廷、寺院和士族收藏。', actualInfluence: '以“传神写照”等观念说明绘画应表现人物精神，影响后世人物画评价。', modernEquivalent: '职能近似职业艺术家兼艺术理论家。', impact: '中国古代绘画从技巧记录转向精神表达的传统得到强化。' }
    ]
  } },
  { id: 'li-daoyuan', merge: {
    background: '郦道元是北魏地理学家、官员和文学家，《水经注》以水道为线索记录河流、地貌、城邑、交通和历史遗迹。',
    childhood: '出身范阳郦氏，接受北魏士族经史教育，随父任官和游历，接触北方河流、州郡、边地与多族群社会。',
    personality: '重实地观察、考据和文献互证，文字细密而富有山水审美；担任地方官时执法严厉，最终在阴盘驿被害。',
    policyInclination: '作为地方官重视治安、交通、水利和行政秩序，作为地理作者关注河流如何连接城镇、农业、军事和文化传播。',
    socialContribution: '《水经注》保存北魏以前中国水系、地理、城市和历史记忆，对地理学、历史学、文学和水利研究影响深远。',
    impactSummary: '郦道元的地理书不是现代测绘图册，而是水道、历史、传说和实地见闻交织的综合文本；其中传说与观察应区分阅读。',
    resume: [
      { timeText: '约500-515年', periodLabel: '北魏地方任官', title: '刺史、太守 / 地方行政官', nominalDuty: '负责州郡治安、司法、赋税、交通和地方官吏。', authorityScope: '州郡户籍、仓储、河道、道路、军民治安和诉讼，权力受北魏中央和地方豪强制约。', actualInfluence: '在多地任官并沿河流、道路观察山川城邑，积累地理和行政材料。', modernEquivalent: '职能近似地方政府主要负责人兼区域水利交通观察者。', impact: '地方治理经验成为《水经注》的资料基础。' },
      { timeText: '约515-527年', periodLabel: '《水经注》整理与边地任职', title: '御史中尉、关右行台 / 地理著述者', nominalDuty: '参与监察、地方军政和河流、道路、城邑信息整理。', authorityScope: '监察官员、关中与北方地方治理和军政交通，具体权力随任职变化。', actualInfluence: '综合前代地理书、碑刻和实地见闻，完成四十卷水道地理叙述传统。', modernEquivalent: '职能近似国家地理调查官兼监察与地方行政官。', impact: '中国古代地理著作兼具科学、历史和文学价值。' }
    ]
  } },
  { id: 'gao-jiong', merge: {
    background: '高颎是隋文帝时期宰相、军事和财政重臣，参与灭陈统一、开皇制度建设和隋初政治整合，后因皇位继承和政治猜疑失势。',
    childhood: '出身北周至隋初官僚家庭，早年服务杨坚，熟悉关陇军政、府兵和北方士族网络，成为隋文帝最信任的辅政者之一。',
    personality: '谨慎、能谋划、重效率和军政组织，善于把军事行动与粮运、户籍、官制配合；晚年对太子废立的判断使其触怒隋文帝。',
    policyInclination: '支持中央集权、简化官制、整顿财政和府兵，主张以粮运、造船、情报和分进合击降低统一战争成本。',
    socialContribution: '参与隋朝统一南北和开皇制度建设，推动三省六部、科举、户籍和军事行政的早期整合。',
    impactSummary: '高颎是隋初高效治理的重要执行者，也显示开皇政治依赖皇帝与重臣信任。其失势后隋朝失去一位能协调军政财政的核心人物。',
    resume: [
      { timeText: '581-589年', periodLabel: '开皇制度与灭陈战争', title: '尚书左仆射、晋王府长史 / 中枢军政重臣', nominalDuty: '统筹中央官制、财政、军粮、将领和统一战争部署。', authorityScope: '尚书省政务、户籍赋役、府兵、粮运和南方战区协调，受隋文帝直接监督。', actualInfluence: '参与开皇新制和灭陈战略，以多路进攻、粮运和水军协同完成统一。', modernEquivalent: '职能近似政府常务负责人兼国防与财政协调者。', impact: '隋朝中央集权和南北统一获得制度与军事支撑。' },
      { timeText: '590-600年', periodLabel: '统一后治理与失势', title: '宰相 / 国家行政整合者', nominalDuty: '处理地方叛乱、赋役、官员任免、边疆和宫廷政策。', authorityScope: '中央六部、地方州县、府兵和财政信息，实际权力受皇帝和宗室政治影响。', actualInfluence: '继续整顿国家但因反对废太子、与独孤皇后意见不合而被排斥，晚年退居。', modernEquivalent: '职能近似政府首脑兼国家组织改革负责人。', impact: '隋初重臣政治转向皇帝个人与宗室竞争。' }
    ]
  } },
  { id: 'yang-su', merge: {
    background: '杨素是隋初将领、宰相和诗人，参与平陈、平定江南叛乱、北伐突厥与隋炀帝继承，军政权力和家族影响都很强。',
    childhood: '出身弘农杨氏，父亲杨敷为北周将领，早年接受关陇军事贵族教育，凭军功和政治判断进入杨坚集团。',
    personality: '果断、善于用兵和组织工程，能在复杂战局中快速决策；政治上重权势、善经营家族，对隋文帝晚年权力斗争负有责任。',
    policyInclination: '支持统一、中央集权和强军，擅长以水陆军、工程、粮运和严厉军法扩大国家动员；对地方叛乱采取高压镇压。',
    socialContribution: '参与隋朝统一和边疆军事，推动隋初国家军政能力形成；其家族与隋炀帝继位、隋末政治集中化有重要关联。',
    impactSummary: '杨素既是隋朝军事建设者，也属于权力集中和高压动员集团。其死后隋炀帝失去制衡与经验丰富的重臣，政治风险进一步上升。',
    resume: [
      { timeText: '581-589年', periodLabel: '隋朝统一战争', title: '信州总管、行军元帅 / 南方战区统帅', nominalDuty: '统率水陆军、攻城、粮运和南方地方接管。', authorityScope: '长江战区军队、船队、城防、俘降和地方军政，受隋文帝总体战略领导。', actualInfluence: '参与灭陈和江南平定，凭快速机动与军事组织建立名将地位。', modernEquivalent: '职能近似战区总司令兼占领区军政接管负责人。', impact: '南北统一和隋朝军事威望迅速形成。' },
      { timeText: '590-606年', periodLabel: '中枢与北方边疆', title: '尚书令、太师 / 国家军政重臣', nominalDuty: '统筹中央行政、边疆、军队、工程和皇位继承相关建议。', authorityScope: '中央官署、北方军镇、突厥方向、地方叛乱和宗室政治，权力接近皇帝重臣。', actualInfluence: '平定江南余部、参与北伐与宫廷继承，家族与杨广夺嫡关系密切。', modernEquivalent: '职能近似政府首脑兼国防与国家安全负责人。', impact: '隋朝国家能力增强，同时个人权力和宫廷政治风险积累。' }
    ]
  } },
  { id: 'yang-guifei', merge: {
    background: '杨贵妃是唐玄宗后期宠妃，经历开元盛世、宫廷外戚与安禄山关系、安史之乱和马嵬驿之变，后世成为唐代宫廷文化和盛衰记忆的象征。',
    childhood: '出身弘农杨氏，幼年在蜀地成长，先为寿王妃，后入宫成为玄宗贵妃。她接受音乐、舞蹈和宫廷礼仪教育，具体幼年细节多来自后世叙述。',
    personality: '聪慧、审美与音乐才能突出，善于获得皇帝宠信；她的宫廷地位依赖玄宗，不能简单承担安史之乱的国家责任。',
    policyInclination: '没有独立的国家政策权，主要通过宫廷亲属、赏赐和文化消费影响人事与资源分配；杨国忠等外戚政治与其身份相互关联。',
    socialContribution: '推动唐代宫廷音乐、舞蹈、服饰和女性文化记忆，后世诗歌、戏曲和绘画不断重塑其形象；马嵬之死成为盛唐转衰的象征。',
    impactSummary: '杨贵妃不是安史之乱的个人原因。唐玄宗后期边镇、财政、宰相和军政制度已出现结构问题，贵妃与杨国忠更多是宫廷权力和后世叙事的聚焦点。',
    disputeTabs: [
      { title: '宫廷文化视角', body: '杨贵妃代表盛唐宫廷音乐、舞蹈、服饰与审美，和玄宗的文化政治共同构成开元天宝时代的宫廷形象。' },
      { title: '安史之乱责任视角', body: '杨贵妃及杨国忠影响宫廷人事，但安史之乱根源在节度使、财政、边防和中央地方关系，不能用“红颜祸水”解释。' }
    ],
    resume: [
      { timeText: '约735-745年', periodLabel: '寿王妃与入宫', title: '寿王妃、贵妃候选 / 宫廷女性', nominalDuty: '承担王府与宫廷礼仪、宗室婚姻和文化活动。', authorityScope: '没有独立行政权，影响取决于宗室、内廷和皇帝关系。', actualInfluence: '由寿王妃转入玄宗后宫，成为宫廷权力与文化资源中心。', modernEquivalent: '不对应现代职位，属于君主制宫廷核心成员。', impact: '玄宗后期内廷政治和宫廷文化发生转向。' },
      { timeText: '745-756年', periodLabel: '天宝宫廷与马嵬驿', title: '贵妃 / 皇帝近身宫廷人物', nominalDuty: '参与宫廷礼仪、文化活动和皇室内廷事务。', authorityScope: '个人无正式行政辖区，但亲属杨国忠等受到重用，影响宫廷人事和赏赐。', actualInfluence: '成为玄宗宠信对象，安史之乱爆发后随驾西逃并在马嵬驿被迫死。', modernEquivalent: '不对应现代职位，不能将宫廷宠信等同于行政权。', impact: '马嵬驿之变成为唐由盛转衰、皇权与军队关系改变的象征。' }
    ]
  } },
  { id: 'shi-siming', merge: {
    background: '史思明是安史之乱后期的主要叛军首领，原为安禄山部将，后在范阳独立，建立大燕并与唐军长期争夺河北。',
    childhood: '出身营州杂胡或边地军人环境，熟悉契丹、奚和汉地边镇社会，多语言和边疆经历帮助他在安禄山集团中建立军政地位。',
    personality: '机警、善于利用边镇关系和战场机会，行动果断而猜忌多疑；对部属和儿子严厉，最终被史朝义等人谋杀。',
    policyInclination: '以控制范阳、河北军镇和人口粮道为目标，借唐廷与安庆绪、地方豪强矛盾扩张，更多依靠军事分封而非稳定官僚治理。',
    socialContribution: '延续安史叛乱、改变唐朝藩镇与河北格局，促使唐廷借助回纥等外援并进一步依赖地方节度使。',
    impactSummary: '史思明不是安禄山叛乱的附属人物。他的独立使战争从一次叛乱转为河北长期军镇竞争，唐朝即使平乱也难以恢复旧有中央控制。',
    disputeTabs: [
      { title: '边镇军事视角', body: '史思明熟悉范阳、河北和边地军队，能够在安禄山死后重新聚拢力量，说明节度使已具有独立政权基础。' },
      { title: '叛乱与地方化视角', body: '其统治依靠军队、粮道和个人威望，继承安排和官僚体系薄弱，最终被亲子集团谋杀，暴露军镇政权不稳定。' }
    ],
    resume: [
      { timeText: '755-757年', periodLabel: '安禄山部将与河北战事', title: '范阳将领 / 叛军方面军统帅', nominalDuty: '统率边镇军队、攻城、守卫交通和控制河北州县。', authorityScope: '范阳及河北军镇、边军、粮道和地方降附，权力依赖安禄山军事集团。', actualInfluence: '在安禄山叛乱中控制重要战区，熟悉唐军和河北地方社会。', modernEquivalent: '职能近似边境战区司令兼地方军政长官。', impact: '河北成为安史叛军持续作战的核心区域。' },
      { timeText: '759-761年', periodLabel: '大燕后期', title: '大燕皇帝 / 河北军镇领袖', nominalDuty: '统辖叛军、河北州县、军粮和对唐战争。', authorityScope: '范阳、魏博等地军队、城镇、赋税和将领任免，实际行政高度军事化。', actualInfluence: '杀安庆绪并自立，继续与唐军、回纥和地方藩镇作战，后被史朝义谋杀。', modernEquivalent: '不对应现代职位，属于叛乱军镇政权的最高统治者。', impact: '安史之乱延长并固化唐后期藩镇割据格局。' }
    ]
  } },
  { id: 'yan-zhenqing', merge: {
    background: '颜真卿是唐代书法家、文官和忠烈人物，经历安史之乱、地方节度使政治和李希烈叛乱，以楷书和忠于朝廷的政治选择著称。',
    childhood: '出身琅琊颜氏士族，接受经学、书法和官僚教育，早年任监察、地方官，熟悉唐代州县行政与军镇秩序。',
    personality: '端正、刚直、重名节和公共责任，书法与人格形象相互强化；在复杂军镇政治中坚持立场，也使其屡遭排斥和牺牲。',
    policyInclination: '维护唐朝中央、地方官僚和儒家名教，主张在叛乱与藩镇环境中守住法统和官员责任，不以个人安全换取妥协。',
    socialContribution: '在安史之乱中组织平原防御并传递勤王号召，书法形成雄浑端庄的颜体，后世忠臣、书法和公共伦理记忆高度重叠。',
    impactSummary: '颜真卿的政治与艺术不能割裂。颜体并非单纯“忠臣字”，其笔法、碑刻和书学实践有独立艺术价值，但人格传统确实影响了后世接受。',
    disputeTabs: [
      { title: '忠烈与地方防御视角', body: '安史之乱中颜真卿在平原组织军民抵抗并联络诸郡，显示文官在中央失灵时承担军政与社会动员责任。' },
      { title: '书法史视角', body: '颜体以结构宽博、骨力沉着和法度严整著称，后世将其人格与书风相连，但艺术评价不应只靠道德标签。' }
    ],
    resume: [
      { timeText: '约750-755年', periodLabel: '唐代地方与监察任官', title: '监察御史、平原太守 / 地方行政官', nominalDuty: '负责监察、州县赋税、治安、水利和地方官吏。', authorityScope: '州郡户籍、仓储、司法、军民防务和地方文书，受节度使与中央政令制约。', actualInfluence: '在平原提前整修城防、储粮并保持地方秩序，为安史爆发后的抵抗作准备。', modernEquivalent: '职能近似地方政府主要负责人兼监察官。', impact: '文官地方治理与战时动员相结合。' },
      { timeText: '755-785年', periodLabel: '安史之乱与反藩镇', title: '鲁郡太守、刑部尚书 / 忠烈文官', nominalDuty: '组织地方勤王、参与中央政务和处理叛乱后的官员、司法事务。', authorityScope: '地方军民动员、中央六部、叛乱地区使者联络和外交谈判，实际常受军镇控制。', actualInfluence: '坚持反叛与拒绝向李希烈屈服，最终被杀；书法和文章同时传播其政治人格。', modernEquivalent: '职能近似战时地方行政长官兼中央高级公务员。', impact: '成为唐代忠臣、楷书和公共责任的经典象征。' }
    ]
  } },
  { id: 'liu-zongyuan', merge: {
    background: '柳宗元是中唐文官、思想家和文学家，参与永贞革新失败后长期贬谪，担任永州、柳州等地官员，古文、寓言和山水游记影响深远。',
    childhood: '出身河东柳氏士族，接受经史和文章教育，早年进入中央官僚体系。安史之乱后的藩镇、宦官和政治改革环境塑造了他的公共责任意识。',
    personality: '理性、敏锐、敢于改革，文章冷峻而富有同情心；政治失意后把社会批判、地方治理和个人孤独转化为文学表达。',
    policyInclination: '支持整顿官僚、限制宦官和藩镇、改善地方治理，重视民生与官员责任；其思想也包含对佛教、传统名教和地方社会的复杂观察。',
    socialContribution: '参与永贞革新、推动古文运动，留下《捕蛇者说》《永州八记》等作品，记录中唐基层赋役、山水和被贬官员的政治经验。',
    impactSummary: '柳宗元不是只会写山水的文人。永贞革新、贬谪制度、地方行政和古文写作共同构成其历史意义，文学中的山水往往包含现实政治观察。',
    disputeTabs: [
      { title: '改革与民生视角', body: '柳宗元参与永贞革新并在地方任官，关注赋役、刑法和基层百姓处境，古文因此具有强烈公共批评性质。' },
      { title: '文学与思想视角', body: '他的山水游记、寓言和论说把政治失意转化为审美与哲学表达，不能把作品完全当作行政报告或个人自传。' }
    ],
    resume: [
      { timeText: '约793-805年', periodLabel: '中唐中央任官与永贞革新', title: '监察御史、礼部员外郎 / 改革参与者', nominalDuty: '参与监察、文书、礼制和中央改革政策讨论。', authorityScope: '中央官署、官员监察、诏令和制度建议，没有独立军政权。', actualInfluence: '与王叔文等推动改革，试图限制宦官和改善官僚制度，失败后被贬。', modernEquivalent: '职能近似中央监察官兼公共政策改革顾问。', impact: '改革失败成为其政治和文学创作的长期背景。' },
      { timeText: '805-819年', periodLabel: '永州、柳州贬谪任官', title: '司马、刺史 / 地方治理者', nominalDuty: '负责州县赋税、司法、户籍、教育和社会救济。', authorityScope: '地方州县、道路水利、民事诉讼、学校和地方官吏，受上级观察使监督。', actualInfluence: '在贬谪地改善地方秩序并观察赋役与民生，写作形成中唐古文与山水文学高峰。', modernEquivalent: '职能近似基层地方政府主要负责人兼公共作家。', impact: '地方治理经验与古文、寓言和游记互相塑造。' }
    ]
  } },
  { id: 'zhao-pu', merge: {
    background: '赵普是北宋初年宰相和宋太祖、宋太宗的重要谋臣，参与陈桥兵变、宋朝建国、杯酒释兵权和中央集权制度安排。',
    childhood: '出身幽州或河北士人家庭，早年服务后周，熟悉军镇、文书和地方政治，因与赵匡胤关系密切进入宋初中枢。',
    personality: '务实、善于权力协调和制度设计，重视皇权与文官体系；政治上有强烈控制欲，曾因结党、任人和与皇帝关系起伏而罢相。',
    policyInclination: '主张削弱节度使和武将独立权，扩大文官、枢密院与中央财政控制，以分割军政权避免唐末五代重演。',
    socialContribution: '参与宋朝建国和重文抑武格局形成，推动中央集权、官员任免和军队收编，对北宋政治结构影响深远。',
    impactSummary: '赵普的“半部论语”是后世概括，不能代替其具体的军政、财政和官僚制度工作。宋初稳定与武将权力受限是同一政策的两面。',
    resume: [
      { timeText: '960-976年', periodLabel: '宋太祖建国与统一', title: '枢密直学士、宰相 / 中央制度设计者', nominalDuty: '参与军政、官员任免、财政和统一战争决策。', authorityScope: '中书门下、枢密院协调、禁军收编、州郡官员和军粮，受宋太祖直接信任。', actualInfluence: '参与陈桥兵变后的政权组织、杯酒释兵权和南方统一政策。', modernEquivalent: '职能近似政府首脑兼国家安全与组织改革负责人。', impact: '宋朝从五代军镇政治转向皇帝与文官中枢。' },
      { timeText: '976-992年', periodLabel: '宋太宗时期的中枢起落', title: '宰相 / 皇权与文官协调者', nominalDuty: '统筹中央行政、财政、官员任免和对辽、北汉政策。', authorityScope: '中书门下、枢密院和地方官僚，实际权力受皇帝猜疑、党争和内阁人事影响。', actualInfluence: '继续推动文官与中央集权，数次罢相复出并影响太宗早期政治。', modernEquivalent: '职能近似政府首脑兼中央组织与军政协调者。', impact: '宋初制度选择在赵普等重臣手中逐渐定型。' }
    ]
  } },
  { id: 'shi-shouxin', merge: {
    background: '石守信是后周至北宋初年将领，参与陈桥兵变、宋初统一和杯酒释兵权，后转任节度使、检校官和地方军政人物。',
    childhood: '出身军人或武将家庭，早年在后周军队服役，与赵匡胤同属禁军核心，熟悉五代军镇和宫廷兵变环境。',
    personality: '忠于集团、善于识时务、具有战场经验；在宋初主动交出兵权，体现武将面对皇权猜疑和制度重建的现实选择。',
    policyInclination: '重视军队作战和政权安全，接受宋太祖削弱将领直属兵权、以文官控制地方的安排，转向以荣典和财富保持政治地位。',
    socialContribution: '参与结束后周、建立北宋和统一战争，成为宋初“杯酒释兵权”中武将群体的代表，帮助理解宋代文官国家的形成成本。',
    impactSummary: '石守信并非被动失势的单一人物，他与宋太祖共同完成权力重组。兵权交出减少军阀割据，也削弱了宋代临战指挥和武将自主性。',
    resume: [
      { timeText: '951-960年', periodLabel: '后周禁军与陈桥兵变', title: '禁军将领、马步军都指挥使', nominalDuty: '统率京师禁军、宫廷警卫和对外作战部队。', authorityScope: '禁军编制、驻屯、军粮和兵变时的京师军事秩序，受后周与赵匡胤集团调度。', actualInfluence: '参与陈桥兵变和宋太祖受禅，成为新朝建立的军事功臣。', modernEquivalent: '职能近似首都卫戍与中央军队高级指挥官。', impact: '军队拥立皇帝成为五代军政转型的最后一次关键兵变。' },
      { timeText: '960-976年', periodLabel: '北宋统一与交兵权', title: '侍卫亲军都指挥使、节度使', nominalDuty: '参与南方统一、地方军镇和中央禁军管理。', authorityScope: '所部军队、战区、节度使辖区和军事资源，后在宋太祖安排下退出直接禁军指挥。', actualInfluence: '参与平定李筠、李重进等反抗，并在杯酒释兵权后转为荣典与地方管理。', modernEquivalent: '前期近似中央军队高级将领，后期转为荣誉性地方军政长官。', impact: '武将集团完成制度化退场，宋代皇权和文官控制增强。' }
    ]
  } },
  { id: 'bao-zheng', merge: {
    background: '包拯是北宋仁宗时期官员，历任地方知县、转运使、开封府尹、御史和枢密副使，后世以清廉断案和包青天形象流传。',
    childhood: '出身庐州士人家庭，科举入仕后曾因奉养父母暂缓仕途，接受经学、法律和地方行政训练。',
    personality: '刚直、节俭、重事实和官员责任，敢于弹劾权贵；后世戏曲将其塑造成月牙、铡刀和神断形象，部分细节不属史实。',
    policyInclination: '主张限制权贵、整顿吏治、保障诉讼公平和减轻基层行政侵扰，重视监察与地方财政秩序。',
    socialContribution: '参与北宋监察、财政、边防和地方治理，后世包公文化把司法公正、清官伦理和民间申冤愿望结合起来。',
    impactSummary: '历史上的包拯是多岗位行政官和监察官，不是只在开封府断案的传奇人物。其清廉形象有史实基础，也经过戏曲、小说和民间信仰放大。',
    disputeTabs: [
      { title: '史实官员视角', body: '包拯长期处理转运、监察、财政和军政事务，开封府任职只是其官僚履历的一部分。' },
      { title: '民间包公视角', body: '后世戏曲把包拯塑造成不畏权贵、以铡刀惩恶的理想清官，反映民众对公正司法的期待，不能与全部史实混同。' }
    ],
    resume: [
      { timeText: '约1037-1057年', periodLabel: '地方与监察任官', title: '知县、转运使、提点刑狱 / 财政司法官', nominalDuty: '负责州县行政、漕运、盐税、监察和刑狱复核。', authorityScope: '地方户籍、钱粮、仓储、司法、官员考核和交通，受中央转运与提刑系统监督。', actualInfluence: '以清查财政、整顿官吏和复核案件积累清名，进入仁宗中枢。', modernEquivalent: '职能近似地方政府负责人兼财政审计、司法监督官。', impact: '北宋文官制度中的监察和财政责任得到具体体现。' },
      { timeText: '1057-1062年', periodLabel: '开封府与枢密院', title: '开封府尹、枢密副使 / 中央高级官员', nominalDuty: '管理首都治安、司法、户籍并参与军政和边防决策。', authorityScope: '开封府城市行政、刑狱、治安以及枢密院军政文书，实际不能独立决定所有重大案件。', actualInfluence: '处理首都与中央事务，继续弹劾不法官员，死后成为清官典型。', modernEquivalent: '职能近似首都政府主要负责人兼中央监察和国防政策官员。', impact: '包公文化将北宋官僚司法经验转化为长期公共伦理。' }
    ]
  } },
  { id: 'su-song', merge: {
    background: '苏颂是北宋官员、天文学家、药学家和工程技术者，主持水运仪象台和《新仪象法要》，兼任宰相和地方官。',
    childhood: '出身福建泉州士人家庭，科举入仕，接受经史、数学、历法和医药知识，长期在馆阁、地方和中央行政中工作。',
    personality: '严谨、重观测与工艺协作，能够把官僚资源转化为科学工程；其研究依赖工匠、天文官和国家机构，并非个人闭门发明。',
    policyInclination: '支持历法、天文、药物和技术服务国家治理，重视标准化观测、仪器制造和知识编纂，主要以行政和科学项目改善实际事务。',
    socialContribution: '建造水运仪象台、编修药典和天文仪器资料，推动宋代天文学、计时技术、药学和工程知识发展。',
    impactSummary: '苏颂的价值在于科学、工程和官僚组织结合。水运仪象台需要机械、天文与行政资源，其成就不是简单的个人“发明”。',
    resume: [
      { timeText: '约1050-1085年', periodLabel: '馆阁、地方与药政任官', title: '知制诰、地方官、校书官 / 学术行政者', nominalDuty: '参与诏令、地方行政、医药典籍和国家文献编修。', authorityScope: '地方州县户籍赋税，以及馆阁、医官和文献编修项目协调。', actualInfluence: '积累天文、药物和官僚资料，参与《本草图经》等知识整理。', modernEquivalent: '职能近似地方行政官兼国家科技与医药项目管理者。', impact: '科学工程逐渐成为宋代国家文书与公共项目的一部分。' },
      { timeText: '1086-1094年', periodLabel: '元祐政治与天文工程', title: '刑部尚书、尚书右仆射 / 水运仪象台主持者', nominalDuty: '统筹中央行政、财政、司法及天文仪器工程。', authorityScope: '中书门下和中央官署，并协调天文官、工匠、铜铁材料和仪器制造。', actualInfluence: '主持水运仪象台建设，编写《新仪象法要》，把观测、机械和国家计时结合。', modernEquivalent: '职能近似政府首脑兼国家天文与工程项目总负责人。', impact: '宋代天文、机械和计时技术达到重要高峰。' }
    ]
  } },
  { id: 'cheng-yi', merge: {
    background: '程颐是北宋理学家，与程颢并称二程，讲学于洛阳、嵩阳等地，围绕天理、性命、格物和君臣伦理重建儒学体系。',
    childhood: '出身河南士人家庭，与兄程颢共同接受经学和政治教育，经历王安石变法及新旧党争，长期以讲学和著述影响士人。',
    personality: '严谨、重原则和道德秩序，善于系统化经典义理；政治与学术立场鲜明，也因排斥异端、党争和门人传播产生后世争论。',
    policyInclination: '主张以天理、名分、修身和官员责任约束政治，重视学校、经学和士大夫道德，反对以功利财政完全支配国家治理。',
    socialContribution: '建立宋代理学的重要概念和讲学传统，影响朱熹、陆九渊以及元明清科举、教育和社会伦理。',
    impactSummary: '程颐的历史作用在思想教育而非行政职位。理学既包含自我修养和公共责任，也可能被后世制度化为等级与性别规范，需要区分思想原貌和社会使用。',
    disputeTabs: [
      { title: '理学建构视角', body: '程颐把经典、天理、心性和日常伦理结合，形成可讲授、可传承的儒学哲学体系。' },
      { title: '政治与社会影响视角', body: '理学后来进入科举、教育和宗族秩序，既提供公共责任语言，也强化了等级、礼法和性别规范。' }
    ],
    resume: [
      { timeText: '约1060-1085年', periodLabel: '北宋讲学与仕途', title: '教授、著作郎前后 / 经学教师', nominalDuty: '参与学校教育、经典讲授和地方文官事务。', authorityScope: '学校、弟子、书院和经学文本传播，没有独立军政或财政权。', actualInfluence: '与程颢讲学，形成以天理、性命和修身为核心的理学讨论。', modernEquivalent: '职能近似大学教授兼公共伦理思想家。', impact: '宋代儒学从经学解释转向系统哲学。' },
      { timeText: '1085-1107年', periodLabel: '党争与理学传播', title: '崇政殿说书、地方学者 / 理学宗师', nominalDuty: '为皇帝讲经、参与官员教育和经典解释。', authorityScope: '宫廷讲学、士人弟子网络和书院传播，政治权力受新旧党争和皇帝态度影响。', actualInfluence: '在元祐与绍圣政治变化中进退，著述和弟子网络推动二程学说流传。', modernEquivalent: '职能近似国家教育顾问兼大学学术领袖。', impact: '为朱熹理学和后世科举教育提供思想源头。' }
    ]
  } },
  { id: 'lu-jiuyuan', merge: {
    background: '陆九渊是南宋思想家、教育家和官员，创立心学传统，强调本心、良知和自我体认，与朱熹围绕理、心、格物展开鹅湖之会等思想论辩。',
    childhood: '出身江西金溪士人家庭，接受经学和地方教育，早年科举入仕并在地方任官，长期通过书院、讲学和书信传播思想。',
    personality: '自信、重直觉和道德实践，强调人人具有道德本心；讲学富有感染力，但其简约表达容易被后世简化为脱离经典和制度。',
    policyInclination: '主张以本心、良知和道德主体性改善政治，不把治理完全依赖繁琐章句；同时重视地方教化、司法和官员自律。',
    socialContribution: '奠定宋明心学重要方向，影响王阳明及后世思想，推动士人关注内在主体、道德行动和教育实践。',
    impactSummary: '陆九渊与朱熹的差异不是“心学反理学”的简单对立，而是围绕知识来源、修养方法和经典实践的长期讨论。',
    disputeTabs: [
      { title: '心学思想视角', body: '陆九渊强调“宇宙便是吾心”等命题，认为道德本心可以通过反省和实践获得，不必把知识完全外求于章句。' },
      { title: '鹅湖论学视角', body: '与朱熹的论辩体现南宋士人对修养、格物、经典和教育方法的不同选择，后世“朱陆异同”并非一次会谈即可概括。' }
    ],
    resume: [
      { timeText: '约1160-1180年', periodLabel: '南宋科举与地方任官', title: '进士、地方官 / 经学思想家', nominalDuty: '处理州县行政、司法、赋税和学校教育，并参与经典讲学。', authorityScope: '州县户籍、诉讼、官吏和学校，思想影响扩展到弟子与地方士人。', actualInfluence: '在地方任官和讲学中形成以本心、良知和实践为核心的思想。', modernEquivalent: '职能近似地方行政官兼大学哲学教授。', impact: '心学从个人修养进入士人教育网络。' },
      { timeText: '1180-1193年', periodLabel: '书院讲学与思想传播', title: '地方官、书院讲师 / 心学奠基者', nominalDuty: '通过讲学、书信和著述传播儒学修养与政治伦理。', authorityScope: '没有中央行政权，主要影响书院、弟子、地方教化和士人公共讨论。', actualInfluence: '与朱熹论学并形成朱陆两条理学传统，影响后世王阳明心学。', modernEquivalent: '职能近似公共知识分子、书院院长和伦理思想家。', impact: '宋明思想史中的心学谱系由此确立。' }
    ]
  } },
  { id: 'yu-dayou', merge: {
    background: '俞大猷是明代抗倭将领、武术家和军事著述者，与戚继光共同参与东南沿海抗倭，长期治理福建、浙江和广东海防。',
    childhood: '出身福建晋江武官家庭，早年学习兵法、剑术和海防，熟悉沿海港口、岛屿和倭寇活动路线。',
    personality: '沉着、重训练和实战，能在不同兵员、地形和水陆战场中调整战法；与戚继光有竞争和相互借鉴关系。',
    policyInclination: '主张整顿卫所、训练步兵和水军、改善军械与海防巡逻，以地方军镇、民兵和中央调度共同应对倭寇。',
    socialContribution: '参与平定东南倭寇、改进水陆战术和武术训练，留下兵法、武术与海防经验，推动明代海疆治理。',
    impactSummary: '俞大猷不应被戚继光光环遮蔽。他的长期海防经验、兵法和水军建设是抗倭胜利的重要组成，也暴露明代卫所和军饷问题。',
    resume: [
      { timeText: '约1530-1555年', periodLabel: '福建、浙江海防', title: '指挥、参将 / 抗倭战区将领', nominalDuty: '负责沿海卫所、水军、城寨、巡海和地方军民协同。', authorityScope: '福建、浙江部分海域和沿岸军队、船只、港口与战时粮饷。', actualInfluence: '训练水陆兵，参与打击倭寇和海上武装，积累沿海作战经验。', modernEquivalent: '职能近似海防战区司令兼沿海治安负责人。', impact: '东南海防从单纯卫所守备转向水陆协同。' },
      { timeText: '1555-1588年', periodLabel: '抗倭与兵法传播', title: '总兵、提督 / 海防统帅', nominalDuty: '统率多省军队、组织训练、处理倭寇和地方军政。', authorityScope: '福建、广东、浙江等地的海防军队、战船、城寨和地方协同。', actualInfluence: '与戚继光等并肩作战，改进棍法、阵法和水战经验，晚年仍参与南方防务。', modernEquivalent: '职能近似跨省海防战区总司令。', impact: '明代抗倭军政和武术兵法传统得到系统化。' }
    ]
  } },
  { id: 'zhu-chenhao', merge: {
    background: '宁王朱宸濠是明武宗时期的宗室藩王，1519年在南昌发动叛乱，试图利用宁王府、地方豪强和武装夺取皇位，最终被王守仁平定。',
    childhood: '出身明太祖后裔宗室，袭封宁王并在江西拥有王府、护卫和经济资源。宗室身份、地方势力和对中央权力的觊觎构成其政治背景。',
    personality: '野心强、善于结交和聚集地方势力，但政治判断冒进、对朝廷反应估计不足；叛乱依靠王府和临时军队，缺少合法性与长期治理计划。',
    policyInclination: '试图突破藩王不得干政和不得掌兵的制度限制，以拥立、兵变和地方动员争夺最高权力，未提出稳定的行政改革方案。',
    socialContribution: '宁王之乱暴露明代藩王、地方军政、宦官和皇权关系，促使王守仁的平叛、心学声望和江西地方政治受到关注。',
    impactSummary: '朱宸濠是一次宗室叛乱的发动者，不宜与正统皇帝并列。其失败说明明代藩王拥有资源却缺乏全国性军政和合法性基础。',
    disputeTabs: [
      { title: '宗室制度视角', body: '宁王拥有封地、王府和护卫，但明代制度禁止藩王干预地方政务和统领外军，制度矛盾给叛乱提供了资源也限制了扩张。' },
      { title: '王守仁平叛视角', body: '王守仁以江西地方军政和快速决断平定叛乱，朱宸濠的失败与其联盟松散、军队训练不足和中央合法性缺失有关。' }
    ],
    resume: [
      { timeText: '约1506-1518年', periodLabel: '宁王府经营', title: '宁王 / 宗室藩王', nominalDuty: '管理王府、宗室祭祀、封地俸禄和护卫，原则上不得干预地方行政。', authorityScope: '南昌王府、护卫、宗室财产和地方关系，受江西巡抚、按察和中央宗人府约束。', actualInfluence: '利用王府资源结交地方官绅、宦官和武人，积累超越制度权限的政治网络。', modernEquivalent: '不对应现代职位，属于受限制的世袭宗室领主。', impact: '明代藩王与地方行政的紧张关系加深。' },
      { timeText: '1519年', periodLabel: '宁王之乱', title: '叛乱藩王 / 南昌政权首领', nominalDuty: '组织叛军、夺取地方城镇并争取朝廷、军队和宗室支持。', authorityScope: '南昌及赣江流域叛军、王府护卫、地方粮饷和临时官署，缺少全国行政权。', actualInfluence: '攻占南昌并沿江东进，王守仁集结地方军队后在鄱阳湖等地击败其军。', modernEquivalent: '不能类比现代职位，属于封建宗室武装叛乱首领。', impact: '明代中央对藩王和地方军政控制进一步加强。' }
    ]
  } },
  { id: 'tang-xianzu', merge: {
    background: '汤显祖是明代戏曲家、文学家和地方官，《牡丹亭》以杜丽娘、柳梦梅的爱情与梦境突破礼教边界，成为传奇戏曲经典。',
    childhood: '出身江西临川士人家庭，早年接受经学和文章教育，科举入仕后因反对权臣和政治环境多次调任，熟悉明代地方社会。',
    personality: '富有想象力、重情感和个体生命，政治上有批评精神；戏曲表达并非简单反礼教，而是把情欲、才情、家庭和社会秩序置于冲突中。',
    policyInclination: '地方任官时关注民生和司法，文学上强调情感与人的主体性，借戏曲讨论婚姻、女性、功名和礼法约束。',
    socialContribution: '推动明代传奇戏曲成熟，扩大舞台文学对女性情感、民间生活和个人选择的表达，影响昆曲、戏剧和后世文艺。',
    impactSummary: '汤显祖不是只写爱情的文人。《牡丹亭》以梦境和舞台形式讨论礼教、生命与社会身份，作品的浪漫性与明代制度社会并存。',
    resume: [
      { timeText: '约1583-1598年', periodLabel: '明代科举与地方任官', title: '进士、南京太常博士、遂昌知县 / 文官', nominalDuty: '处理地方赋税、司法、治安、教育和礼仪文书。', authorityScope: '县级户籍、诉讼、仓储、学校和公共工程，受巡抚、按察和中央考核。', actualInfluence: '在地方任官中处理民事与司法问题，同时形成对官场和社会礼法的观察。', modernEquivalent: '职能近似县级政府主要负责人兼文化作者。', impact: '行政经验进入传奇戏曲和社会批评。' },
      { timeText: '1598-1616年', periodLabel: '退居与戏曲创作', title: '文学家 / 传奇戏曲作者', nominalDuty: '通过戏曲、诗文和文集表达社会、情感和个体生命经验。', authorityScope: '没有行政权，影响集中在剧场、昆曲班社、文人和民间观众。', actualInfluence: '创作《牡丹亭》等作品，改变传奇戏曲对女性、爱情和梦境的表现方式。', modernEquivalent: '职能近似职业剧作家、公共文化作者和戏剧思想者。', impact: '晚明戏曲成为社会情感和个体意识的重要载体。' }
    ]
  } },
  { id: 'xu-xiake', merge: {
    background: '徐霞客是明代旅行家、地理学家和散文家，长期实地考察江河、山脉、洞穴、道路与地方社会，著有《徐霞客游记》。',
    childhood: '出身江阴士绅家庭，早年受经史教育但不热衷仕途，受到母亲支持和家族文化影响，选择以旅行、观察和写作为主要人生实践。',
    personality: '独立、坚忍、重实地验证和细节记录，能够跋山涉水考察；旅行也依赖向导、寺院、乡民和地方交通，不能完全脱离社会网络。',
    policyInclination: '没有正式政策权，主要通过实地观察纠正旧地理记载，关注水系、地貌、矿产、交通和地方生产生活。',
    socialContribution: '把旅行笔记提升为系统地理观察，尤其在喀斯特地貌、江河源流和西南地理方面留下重要资料，影响后世地理学和散文。',
    impactSummary: '徐霞客不是现代意义的科学考察队，他的笔记兼具个人游历、地理测察、文学审美和地方传闻；其“实地精神”仍是中国科学史的重要传统。',
    resume: [
      { timeText: '约1607-1630年', periodLabel: '东南与中原游历', title: '旅行者 / 地理观察者', nominalDuty: '考察山川、道路、寺院、城镇和地方物产并记录见闻。', authorityScope: '没有行政管辖权，依靠家族资助、地方社会、寺院和向导完成旅行。', actualInfluence: '实地记录江南、华北、西南多地地貌和水系，纠正部分旧地理传说。', modernEquivalent: '职能近似独立地理调查者兼纪实作家。', impact: '形成持续多年、跨区域的实地观察资料。' },
      { timeText: '1630-1641年', periodLabel: '西南考察与游记整理', title: '旅行家 / 地理学著述者', nominalDuty: '深入云南、广西等地考察洞穴、河流、山脉和地方交通。', authorityScope: '没有行政权，主要影响士人地理知识、地方记忆和后世科学史研究。', actualInfluence: '完成西南重要考察并留下《徐霞客游记》传统，临终前仍关注资料整理。', modernEquivalent: '职能近似国家地理考察专家兼非虚构作者。', impact: '明代实学和地理观察达到新的实践深度。' }
    ]
  } },
  { id: 'matteo-ricci', merge: {
    background: '利玛窦是明末来华耶稣会士、天文学家、地图学家和中西文化交流人物，长期在澳门、肇庆、南昌、南京和北京活动。',
    childhood: '出生于意大利马切拉塔，接受耶稣会教育、数学、天文和古典学训练，1582年抵达澳门后学习汉语和中国经典。',
    personality: '善于适应文化环境、重视知识交流和士人交往，采取以科学、地图和礼仪进入中国社会的策略；其传教目标与文化适应也存在张力。',
    policyInclination: '没有明朝正式行政权，主张以天文、数学、地理、钟表和儒学对话建立信任，采取“利玛窦规矩”式的传教与文化翻译方法。',
    socialContribution: '传播世界地图、欧几里得几何、天文仪器和西方历法知识，参与《几何原本》《天主实义》等译著，推动晚明士人重新认识世界。',
    impactSummary: '利玛窦不是明朝科技官员，也不是单纯传教者。他的知识交流服务于宗教传播，同时与徐光启等士人合作，开启明末中西科学、宗教和思想互动。',
    disputeTabs: [
      { title: '科学交流视角', body: '世界地图、数学、天文和钟表使晚明士人接触到不同的地理与知识体系，徐光启等人的合作推动了本土化翻译。' },
      { title: '宗教与礼仪争议', body: '耶稣会对儒家礼仪、祖先祭祀和天主教教义的调和后来引发礼仪之争，文化适应与宗教教义之间并非没有冲突。' }
    ],
    resume: [
      { timeText: '1582-1601年', periodLabel: '澳门、肇庆与南昌', title: '耶稣会士 / 中西知识交流者', nominalDuty: '传教、学习汉文、制作地图和传播数学、天文知识。', authorityScope: '没有明朝行政权，主要依靠地方官员、士人和教会网络开展教育与出版。', actualInfluence: '通过《坤舆万国全图》、钟表和数学知识进入士人圈，建立与徐光启等人的交流。', modernEquivalent: '职能近似国际科技文化交流专家兼宗教教育者。', impact: '明末“西学东渐”形成稳定入口。' },
      { timeText: '1601-1610年', periodLabel: '北京宫廷与晚明士人网络', title: '宫廷外籍学者 / 传教与科学顾问', nominalDuty: '向宫廷展示天文、历法、地图、乐器和机械知识，开展宗教与学术交流。', authorityScope: '没有正式官职和国家决策权，影响集中在宫廷、翰林、士人和译书网络。', actualInfluence: '进入北京并与徐光启、李之藻等合作，推动西方科学文本翻译。', modernEquivalent: '职能近似驻华科学文化使者与学术顾问。', impact: '中西知识交流进入宫廷与学术机构。' }
    ]
  } },
  { id: 'yang-xiuqing', merge: {
    background: '杨秀清是太平天国东王，早年出身广西烧炭者，凭借“天父下凡”宗教权威和军政组织能力成为洪秀全之外最有实权的领袖，1856年天京事变中被杀。',
    childhood: '出身广西桂平贫苦家庭，早年从事烧炭等基层劳动，接触拜上帝教后通过宗教启示获得组织地位。具体神迹属于宗教叙事，不等同于可验证生平。',
    personality: '极具动员、指挥和行政能力，善于在危机中作出决定；权力欲强、对洪秀全和其他诸王施压，最终造成内部冲突。',
    policyInclination: '主张集中军政、强化东王府和宗教权威，以军队、粮道、城市行政和严密等级维持天国扩张，个人权力高度集中。',
    socialContribution: '推动金田起义、定都天京和太平军扩张，建立较强的中央军政执行体系；其专权和天京事变也摧毁天国核心领导层。',
    impactSummary: '杨秀清不能只被归入“洪秀全部下”。他是太平天国实际治理和军政动员的关键人物，天京事变反映神权、君权和军权之间无法调和的冲突。',
    disputeTabs: [
      { title: '组织与军政视角', body: '杨秀清通过军令、粮道和东王府行政把流动起义军转为攻城与守城能力较强的政权军队。' },
      { title: '神权与内斗视角', body: '“天父下凡”使其可以超越普通王爵约束，但对洪秀全的权力挑战、韦昌辉的报复和石达开的反应共同引发天京事变。' }
    ],
    resume: [
      { timeText: '1848-1853年', periodLabel: '拜上帝教与太平军扩张', title: '东王前身 / 宗教与军队组织者', nominalDuty: '传达宗教命令、组织信徒、筹集粮食并指挥起义军。', authorityScope: '广西教会网络、太平军部众、军粮和攻城行动，缺少稳定地方行政。', actualInfluence: '通过宗教启示和军事组织成为洪秀全集团的实际执行核心。', modernEquivalent: '职能近似宗教群众运动的执行领袖兼战区指挥官。', impact: '太平天国从地方教团扩展为跨地区武装政权。' },
      { timeText: '1853-1856年', periodLabel: '天京政权与东王府', title: '东王、九千岁 / 军政中枢实际负责人', nominalDuty: '统筹军队、粮道、城市行政、官员任用和宗教命令。', authorityScope: '天京及太平军各战区的军政文书、粮饷、将领和地方官，实际权力一度接近洪秀全。', actualInfluence: '推动定都、北伐和西征，并以东王府控制日常政务，最终在天京事变中被韦昌辉杀害。', modernEquivalent: '不对应现代职位，属于革命宗教政权的实际政府首脑兼军事总管。', impact: '其死导致太平天国核心权力结构断裂。' }
    ]
  } },
  { id: 'shi-dakai', merge: {
    background: '石达开是太平天国翼王，早期与杨秀清、洪秀全共同扩张，天京事变后率部出走，长期在湘、川、滇作战，1863年在大渡河被俘处死。',
    childhood: '出身广西贵县家庭，青年时期加入拜上帝教并参与金田起义，熟悉广西山地、民众和太平军早期组织。',
    personality: '有军事才能、重视部众和个人声誉，能够在分裂后保持队伍；对洪秀全、韦昌辉和天国宫廷失望，后期战略选择受到地理和补给制约。',
    policyInclination: '主张以独立军队、地方动员和流动作战保存实力，试图避免天京内斗；未能建立稳定财政、行政和地方联盟。',
    socialContribution: '参与太平天国扩张并留下流动作战、地方军政和族群关系的历史经验，出走反映天京事变后天国领导层的组织裂解。',
    impactSummary: '石达开不是单纯的“最有才华的翼王”。他的出走削弱天国，也受到洪秀全猜忌、部众结构、四川地形和清军围堵共同影响。',
    disputeTabs: [
      { title: '军事统帅视角', body: '石达开善于山地机动和整合部众，早期太平军扩张与其作战能力相关，出走后仍能保持较强军队。' },
      { title: '大渡河失败视角', body: '进入四川后粮道、渡河、地方关系和清军围堵同时恶化，投降谈判未能改变结局，不能只归因于个人判断。' }
    ],
    resume: [
      { timeText: '1851-1856年', periodLabel: '太平天国早期扩张', title: '翼王 / 太平军方面统帅', nominalDuty: '统率军队、攻城、地方动员和战区粮道。', authorityScope: '太平军所部、广西至长江战区的军队、城镇和俘降安置，受天京中枢调度。', actualInfluence: '参与永安建制、武汉和南京方向作战，在天国诸王中拥有较高军威。', modernEquivalent: '职能近似方面军司令兼战区军政负责人。', impact: '成为太平天国早期军事扩张的核心将领。' },
      { timeText: '1856-1863年', periodLabel: '出走与西征', title: '翼王独立部队首领', nominalDuty: '组织流动军队、筹粮、联络地方和寻找战略根据地。', authorityScope: '石达开部众、沿途城镇和临时军政，缺乏稳定中央财政与行政体系。', actualInfluence: '天京事变后率部出走，转战江西、湖南、广西、四川，最终在大渡河被俘。', modernEquivalent: '不能类比现代职位，属于分裂后的内战军队领袖。', impact: '太平天国领导层分裂和清军逐步反攻进一步加深。' }
    ]
  } },
  { id: 'hong-rengan', merge: {
    background: '洪仁玕是太平天国后期干王、洪秀全族弟和改革思想传播者，1859年进入天京后提出《资政新篇》，试图推动教育、交通、商业和近代技术。',
    childhood: '出身广东花县洪氏宗族，早年接触基督教教育和香港社会，因太平天国早期失败未能立即进入天京，长期在外观察西方制度和商业。',
    personality: '重视制度、教育和技术，具有比早期天国领导人更强的近代世界意识；实际军政资源有限，改革方案与天国宗教等级和战争现实脱节。',
    policyInclination: '主张兴办学校、医院、铁路、邮政、银行、工商业和外交，试图在宗教政权内引入近代国家与市场制度。',
    socialContribution: '《资政新篇》保存了晚清中国内部对近代交通、商业、教育和外交的早期设想，推动后世重新评价太平天国的改革可能。',
    impactSummary: '洪仁玕的方案具有近代化思想，但并未在太平天国大范围落实。战争、财政、领导层内斗和基层治理不足限制了其政策转化。',
    disputeTabs: [
      { title: '近代化思想视角', body: '《资政新篇》提出发展交通、商业、教育、新闻和技术，显示太平天国后期并非只有宗教和军事议题。' },
      { title: '政策落地视角', body: '洪仁玕进入天京较晚且缺少军队、财政和官僚支持，改革方案主要停留在建议，不能视为太平天国已经实行的制度。' }
    ],
    resume: [
      { timeText: '1850-1858年', periodLabel: '香港与外部联络', title: '宗教教育者 / 太平天国外部联系人', nominalDuty: '传播基督教、联络太平天国与香港社会并学习西方制度信息。', authorityScope: '没有太平天国正式行政权，主要依靠宗教、亲族和海外社会网络。', actualInfluence: '接触商业、教育和西方政治信息，为后续改革建议积累材料。', modernEquivalent: '职能近似海外联络官兼制度研究者。', impact: '太平天国与近代港口社会发生间接知识联系。' },
      { timeText: '1859-1864年', periodLabel: '后期天京与改革建议', title: '干王、军政顾问 / 改革倡议者', nominalDuty: '参与天京政务、外交、军政和制度建议。', authorityScope: '中央文书、外事、教育、商业和改革方案，但军队与地方控制权有限。', actualInfluence: '提出《资政新篇》，协助李秀成等处理后期政务，未能扭转军事败局。', modernEquivalent: '职能近似政府改革顾问兼外交与发展政策负责人。', impact: '成为太平天国近代改革思想的代表。' }
    ]
  } },
  { id: 'ding-ruchang', merge: {
    background: '丁汝昌是晚清北洋海军提督，早年参与淮军和镇压太平天国，后负责北洋舰队训练、海防和甲午战争威海卫防御。',
    childhood: '出身安徽庐江军人家庭，早年加入淮军，经历内战、海防和近代军队转型，后来由陆军将领转任海军统帅。',
    personality: '忠于职守、重视部属和舰队荣誉，勇于承担失败责任；海军专业训练不足和对上级协调受限，不能简单归咎为个人指挥无能。',
    policyInclination: '主张建设舰队、训练水手、维护海防和港口，主要执行李鸿章与清廷洋务海军政策，缺乏独立决定全国海军资源的权力。',
    socialContribution: '参与北洋海军建设并在甲午威海卫保卫战中坚守，留下近代海军军官、舰队制度和战败责任的历史记忆。',
    impactSummary: '丁汝昌承担北洋舰队提督职责，但甲午败局涉及舰艇维护、弹药、军费、指挥统属和全国动员。其自杀体现传统将领的责任伦理，也不等于个人是唯一责任人。',
    resume: [
      { timeText: '1860-1888年', periodLabel: '淮军与北洋海军创建', title: '总兵、北洋水师统领 / 海军建设者', nominalDuty: '负责陆军、舰队、港口、舰员训练和海防巡航。', authorityScope: '淮军部队、北洋舰队舰艇、舰员、军港和训练制度，受李鸿章与北洋大臣监督。', actualInfluence: '由陆军转入海军，参与舰队编制、训练和对外海防建设。', modernEquivalent: '职能近似军种高级将领兼海军创建期组织负责人。', impact: '北洋舰队形成清末最重要的近代海军力量。' },
      { timeText: '1888-1895年', periodLabel: '甲午战争与威海卫', title: '北洋海军提督 / 海军战区负责人', nominalDuty: '统率北洋舰队、威海卫军港、舰队训练和战时防御。', authorityScope: '北洋舰队舰艇、港口炮台、舰员、弹药和战区海防，受清廷军费与李鸿章系统制约。', actualInfluence: '参加黄海海战并组织威海卫防御，战败后拒绝投降并自尽。', modernEquivalent: '职能近似海军舰队司令兼主要军港防卫负责人。', impact: '甲午战败成为洋务海军能力与晚清制度问题的集中象征。' }
    ]
  } },
  { id: 'yan-fu', merge: {
    background: '严复是晚清海军教育者、翻译家和思想家，毕业于福州船政学堂并赴英国学习海军，甲午战后以《天演论》等译著传播进化、自由和国家竞争观念。',
    childhood: '出身福建侯官医家家庭，父亲早逝后接受船政学堂教育，少年进入近代海军训练体系，后赴英国格林威治等地学习。',
    personality: '重理性、忧患意识强、擅长用古文解释西学；翻译常有意改写和发挥，以适应中国政治语境，后期对激进革命和社会达尔文主义也有所反思。',
    policyInclination: '主张学习西方科学、教育、制度和国民能力，强调富强、竞争与思想启蒙，倾向渐进改革与精英教育，不是简单全盘西化。',
    socialContribution: '翻译《天演论》《原富》《群学肄言》等，创造“物竞天择、适者生存”等近代政治语汇，影响戊戌维新、革命和新文化知识界。',
    impactSummary: '严复的译著是思想转译而非逐字翻译，传播了国家竞争和进化论，也可能强化社会达尔文主义焦虑。应区分原作者观点、严复改写和中国读者接受。',
    disputeTabs: [
      { title: '启蒙与救亡视角', body: '严复把科学、自由、议会、教育和国家富强联系起来，使晚清士人接触到新的社会科学和政治概念。' },
      { title: '翻译与思想后果视角', body: '《天演论》对赫胥黎原作有删改和发挥，物竞天择被中国政治语境重新解释，既推动启蒙也加剧民族竞争和生存焦虑。' }
    ],
    resume: [
      { timeText: '1877-1894年', periodLabel: '船政教育与海军任官', title: '船政学堂学生、海军教员 / 海军教育官', nominalDuty: '教授航海、舰炮、英语和近代海军知识，参与舰队训练。', authorityScope: '船政学堂、舰队教育、海军教材和部分军事技术译介，受福州船政与清廷海军系统管理。', actualInfluence: '将英国海军教育经验带回中国，参与海军人才培养。', modernEquivalent: '职能近似海军院校教授兼军队技术教育负责人。', impact: '近代海军教育与西方科学知识获得传播渠道。' },
      { timeText: '1895-1912年', periodLabel: '翻译与近代思想传播', title: '海军学堂总教习、译者 / 公共思想家', nominalDuty: '编译西学、教授政治经济和组织教育改革讨论。', authorityScope: '没有直接行政辖区，主要影响学堂、报刊、维新派和新式知识分子。', actualInfluence: '通过译著传播进化论、经济学、社会学和自由政治概念。', modernEquivalent: '职能近似公共知识分子、大学教授和国家改革政策译介者。', impact: '近代中国政治与社会科学词汇体系快速形成。' }
    ]
  } },
  { id: 'rong-hong', merge: {
    background: '容闳是近代中国留学教育和实业倡导者，广东香山人，毕业于耶鲁大学，参与幼童留美计划、洋务教育和晚清改革活动。',
    childhood: '出身广东侨乡，少年在澳门接受西式教育，后赴美国学习并成为较早取得美国大学学位的中国人，熟悉中外教育与商业环境。',
    personality: '务实、重视教育和人才培养，善于连接官员、商人和海外华人；理想常受到清廷财政、政治不信任和战争环境限制。',
    policyInclination: '主张派遣学生出国、发展铁路、矿业、机器制造和现代学校，通过教育与实业增强国家能力，倾向渐进式改革。',
    socialContribution: '推动幼童留美、近代教育和铁路实业思想，培养和影响詹天佑等人才，成为中美教育与近代化的重要桥梁。',
    impactSummary: '容闳的贡献不只是“第一个留美学生”，更在于把个人留学经验转化为国家教育、工业和人才制度方案；计划中断也反映晚清改革的政治脆弱性。',
    resume: [
      { timeText: '1850-1872年', periodLabel: '留学与海外联络', title: '留学生、教育倡导者 / 中美交流者', nominalDuty: '学习西方教育、组织华侨联络并向清廷提出教育和实业建议。', authorityScope: '没有清廷行政权，影响集中在海外华人、洋务官员和教育倡议网络。', actualInfluence: '以耶鲁教育经历说明现代学校和技术人才的重要性，争取官员支持留学计划。', modernEquivalent: '职能近似国际教育项目倡导者和海外人才联络官。', impact: '幼童留美计划获得政策与社会基础。' },
      { timeText: '1872-1895年', periodLabel: '幼童留美与实业倡议', title: '留学事务负责人 / 近代化顾问', nominalDuty: '组织学生赴美、管理教育资源并提出铁路、矿业和工业建设建议。', authorityScope: '留美学生、驻外教育网络和洋务官员沟通，实际权力受清廷官场和财政限制。', actualInfluence: '推动幼童留美，培养近代技术人才，并参与铁路和实业讨论。', modernEquivalent: '职能近似国家海外教育项目负责人兼产业政策顾问。', impact: '中国近代教育和实业人才培养出现早期制度尝试。' }
    ]
  } },
  { id: 'zhang-jian', merge: {
    background: '张謇是晚清状元、实业家、教育家和地方自治倡导者，甲午后在南通创办大生纱厂、学校、医院和公共事业，形成“实业救国”实践。',
    childhood: '出身江苏海门士绅家庭，长期科举应试，1894年中状元进入清廷，甲午战败后转向实业、教育和地方建设。',
    personality: '重视组织、教育和地方实践，能把士人声望转化为商办企业；经营受市场、资金、官商关系和战争冲击，晚年也有理想与现实落差。',
    policyInclination: '主张以棉纺织、垦牧、铁路、学校和地方自治增强国家能力，支持立宪和渐进政治，不赞成只依赖宫廷改革。',
    socialContribution: '创办大生纱厂、师范、学校、博物苑和地方公共事业，推动近代民族工业、教育和地方社会组织发展。',
    impactSummary: '张謇把“实业救国”落到企业、学校和城市建设，但大生集团也受金融、市场和制度限制。其经验说明近代化需要企业、教育、交通和政治环境协同。',
    disputeTabs: [
      { title: '实业与教育视角', body: '张謇以状元身份创办纱厂和学校，把士人资源、商业资本和地方教育结合，形成南通近代化实验。' },
      { title: '企业与制度限制视角', body: '大生纱厂受资金、市场、债务和政局影响，个人声望不能替代现代金融、产权和产业制度。' }
    ],
    resume: [
      { timeText: '1894-1903年', periodLabel: '状元入仕与实业转向', title: '翰林院编修、商办实业倡导者', nominalDuty: '参与清廷文书、礼制和政策讨论，同时筹建纱厂、垦牧和教育项目。', authorityScope: '中央文官职权有限，实业方面依靠商股、地方官绅和海外设备网络。', actualInfluence: '甲午后放弃单纯仕途，筹办大生纱厂和新式学堂。', modernEquivalent: '职能近似政府文化官兼产业创业者和教育改革者。', impact: '“实业救国”从口号转为地方企业实践。' },
      { timeText: '1903-1924年', periodLabel: '南通地方建设', title: '实业家、教育家、地方自治倡导者', nominalDuty: '管理企业、学校和地方公共事业，参与立宪、商会与地方自治讨论。', authorityScope: '南通纱厂、师范学校、职业教育、慈善、城市公共设施和商会网络。', actualInfluence: '建设大生集团及教育、医疗、博物苑和市政项目，形成近代地方社会实验。', modernEquivalent: '职能近似产业集团负责人兼地方教育与公共事业建设者。', impact: '民族工业、职业教育和地方自治的结合影响民国初年社会建设。' }
    ]
  } },
  { id: 'jiang-ziya', merge: {
    background: '姜子牙是商末周初政治、军事人物，传统称其辅佐周文王、周武王灭商，受封齐国。其具体年代和早年经历带有传说与后世追述。',
    childhood: '关于出生、家世和早年生活没有可靠连续记载，后世以“渭水垂钓”等故事表现其晚年遇明主。可确认的历史框架是周族联盟和灭商战争。',
    personality: '善于谋略、耐心等待、重视政治联盟，后世传说突出其老成和识时务；具体事迹需要与《尚书》《史记》和神魔小说区分。',
    policyInclination: '主张联合诸侯、整合军队和利用商内部矛盾完成政权更替，受封齐后重视因地制宜、安抚土著与建立分封秩序。',
    socialContribution: '在周初灭商、分封和齐国开国记忆中占有核心位置，姜太公形象还影响兵家、民间信仰和《封神演义》等文学传统。',
    impactSummary: '姜子牙应标注“传说时代”和“史实存疑”。他既是周初政治记忆中的重要辅臣，也被后世不断神化，不能把小说法术和具体对话当作史实。',
    disputeTabs: [
      { title: '周初政治记忆', body: '姜子牙代表周族通过谋略、联盟和军事行动推翻商朝，并在分封体系中承担齐国开国者角色。' },
      { title: '传说与文学形象', body: '渭水垂钓、封神和法术故事经过战国、汉代史书与明代小说层层加工，具体生卒和战役细节不可完全坐实。' }
    ],
    resume: [
      { timeText: '商末', periodLabel: '周族联盟形成', title: '谋臣、军事顾问 / 周文王政治盟友', nominalDuty: '参与诸侯联络、军队组织、礼制和对商战略。', authorityScope: '周族贵族、盟友诸侯、军队和祭祀政治建议，实际权力依赖文王与周族联盟。', actualInfluence: '传统记载中帮助周文王扩展联盟并制定灭商方向。', modernEquivalent: '职能近似国家战略顾问兼军事联盟协调者。', impact: '周族从地方诸侯转向灭商国家的政治谋划获得象征性代表。' },
      { timeText: '约前1046年以后', periodLabel: '周初分封', title: '太师、齐国受封者 / 开国辅政人物', nominalDuty: '参与武王灭商后的分封、安抚和地方治理。', authorityScope: '齐地贵族、军队、赋税、祭祀和地方联盟，具体制度由周王室监督。', actualInfluence: '传统称受封于齐并建立东方封国秩序，后世将其视为齐国开国始祖。', modernEquivalent: '职能近似地方开国行政与军政负责人。', impact: '齐国及姜太公传统成为周代分封与兵家文化的重要记忆。' }
    ]
  } },
  { id: 'bi-sheng', merge: {
    background: '毕昇是北宋庆历年间活字印刷技术实践者，沈括《梦溪笔谈》记载其以胶泥刻字、烧制字模并按韵排版，改进雕版印刷的复制方式。',
    childhood: '生平、家世和确切职业经历记载很少，可能属于印刷工匠或书坊技术人员。其社会位置说明北宋技术创新往往来自工匠而非著名官员。',
    personality: '重视工具改良、模块化和重复使用，善于解决雕版刻字耗时、版面固定和错字替换问题；个人性格无法由技术记载完全还原。',
    policyInclination: '没有国家行政政策，主要通过字模、排版和印刷工艺改善书籍复制、教育传播和文献生产效率。',
    socialContribution: '活字印刷降低部分文本复制成本，展示宋代工匠、书坊、纸墨和市场共同推动技术传播，影响后世印刷史和知识史。',
    impactSummary: '毕昇的活字技术并未立即完全取代雕版，汉字字数多、排版和字模管理复杂使两种工艺长期并存；“发明活字”应与实际使用场景一并理解。',
    disputeTabs: [
      { title: '技术史视角', body: '胶泥活字体现可移动、可替换和重复使用的模块化思想，是印刷技术史的重要节点。' },
      { title: '传播与局限视角', body: '宋代书籍生产仍大量依靠雕版，活字的材料、字库管理和排版成本影响其普及，不能用现代印刷工业反推北宋应用规模。' }
    ],
    resume: [
      { timeText: '约1040-1048年', periodLabel: '北宋印刷技术实践', title: '印刷工匠 / 活字技术改良者', nominalDuty: '刻制、烧制、排版和印刷文字版面。', authorityScope: '字模、版面、纸墨、印刷工具和书坊生产流程，没有行政管辖权。', actualInfluence: '设计胶泥活字并按韵排列，解决雕版更换和小批量印刷问题。', modernEquivalent: '职能近似印刷工程师兼工艺改良师。', impact: '活字印刷成为中国技术史的重要创新节点。' },
      { timeText: '后世传播', periodLabel: '宋元明印刷传统', title: '技术传统代表 / 知识复制推动者', nominalDuty: '通过工匠传承和书坊实践影响活字、雕版及文献复制。', authorityScope: '影响印刷工坊、字模管理和书籍传播，不直接承担政府教育行政。', actualInfluence: '技术思想被后世印刷史记录，活字与雕版在不同书籍生产中并存发展。', modernEquivalent: '职能近似印刷技术发明人和工艺史人物。', impact: '知识复制工具的改进支持宋代教育、科举和文化传播。' }
    ]
  } },
  { id: 'tian-ji', merge: {
    background: '田忌是战国齐国将领和宗室，曾与孙膑合作对抗魏国，桂陵、马陵等战争体现齐国军政和谋略竞争；“田忌赛马”来自《史记》寓言式故事。',
    childhood: '出身齐国贵族或军政集团，具体家世与早年经历缺乏连续材料。其活动主要出现在齐威王、齐宣王时期的诸侯争霸。',
    personality: '善于听取谋臣意见、重视战场结果和军队组织，但政治地位受齐王、孙膑和邹忌等人关系影响；赛马故事强化了其能接受策略的形象。',
    policyInclination: '以维护齐国安全、击败魏国和扩大诸侯影响为目标，愿意采用孙膑的诱敌、避实击虚与机动战术。',
    socialContribution: '代表战国将领与谋士合作的军事模式，相关战役推动齐国在魏国霸权衰落后取得主动。',
    impactSummary: '田忌的历史价值不在“赛马”本身，而在将领能够识别和采用专业谋略。赛马故事是策略教育寓言，不能替代桂陵、马陵的战争史。',
    resume: [
      { timeText: '约前354年', periodLabel: '桂陵之战', title: '齐国将领 / 救赵战区统帅', nominalDuty: '率领齐军、执行围魏救赵、处理行军和战场部署。', authorityScope: '齐国援赵军队、行军路线、粮道和战场指挥，受齐威王与军政大臣安排。', actualInfluence: '采纳孙膑围魏救赵策略，使齐军避开魏军主力并在桂陵取得优势。', modernEquivalent: '职能近似战区野战部队指挥官。', impact: '魏国中原霸权受到第一次重大挑战。' },
      { timeText: '约前342年', periodLabel: '齐魏军事竞争', title: '齐军主将 / 孙膑战略执行者', nominalDuty: '统率齐军、选择战场并执行诱敌、伏击和追击。', authorityScope: '齐军编制、军粮、战场行动和对魏外交，实际受齐王决策制约。', actualInfluence: '与孙膑合作在马陵击败庞涓，齐国军事声望显著上升。', modernEquivalent: '职能近似方面军司令兼战略方案执行者。', impact: '齐魏格局改变，孙膑兵法和田忌用人故事流传后世。' }
    ]
  } },
  { id: 'yue-yi', merge: {
    background: '乐毅是战国中期燕国将领和外交家，受燕昭王重用，组织五国联军攻齐，后来因燕惠王猜疑出奔赵国，留下《报燕惠王书》等政治记忆。',
    childhood: '出身中山或赵地贵族传统，早年在赵、魏等国活动，熟悉诸侯外交和军政；燕昭王以礼贤招纳和复仇目标吸引他入燕。',
    personality: '善谋、重视联盟和政治秩序，能够克制军队掠夺并试图治理占领区；对君臣猜疑敏感，最终选择出奔保存自身。',
    policyInclination: '主张先孤立齐国、联合诸侯，再以军队和治理结合消化占领区，反对只追求一次战役胜利而忽视地方安抚。',
    socialContribution: '代表战国将领兼外交家，说明战争胜利依靠人才、联盟和治理；其与燕昭王的君臣关系成为后世贤君用人典型。',
    impactSummary: '乐毅伐齐的失败不是军事才能不足，而是燕昭王去世后君臣互信断裂。其出奔、复国书和田单反攻共同说明占领区治理与继承政治的重要性。',
    resume: [
      { timeText: '约前300-前285年', periodLabel: '燕昭王招贤与外交', title: '亚卿、上将军 / 燕国外交军事顾问', nominalDuty: '联络赵、楚、韩、魏等国，规划对齐战略和军队组织。', authorityScope: '诸侯使节、联军筹备、军粮和燕国军政建议，受燕昭王授权。', actualInfluence: '促成燕国与诸侯反齐联盟，成为燕国复仇和扩张的核心策划者。', modernEquivalent: '职能近似国家安全顾问兼多国联军协调者。', impact: '齐国长期霸权被孤立。' },
      { timeText: '前284-前279年', periodLabel: '五国伐齐与出奔', title: '联军统帅 / 齐国占领区治理者', nominalDuty: '统率联军、攻城、安抚占领区和处理齐地行政。', authorityScope: '联军主力、齐国七十余城、军粮与地方降附，实际受燕王和诸侯关系制约。', actualInfluence: '攻下临淄和齐地多数城邑，燕惠王即位后被猜疑，出奔赵国。', modernEquivalent: '职能近似联军总司令兼战后占领区负责人。', impact: '乐毅离开使燕军失去整合能力，田单得以复齐。' }
    ]
  } },
  { id: 'tian-dan', merge: {
    background: '田单是战国末年齐国将领，守即墨抗击燕军，利用反间、心理战和火牛阵收复齐国失地，并拥立齐襄王。',
    childhood: '出身齐国宗室或地方贵族，早期经历记载不多；齐国遭燕军占领后，他从临淄普通官员或地方人物成长为即墨守将。',
    personality: '善于组织民心、利用情报和制造心理优势，能在长期围困中保持纪律；其战术被后世传奇化，但核心是对城市社会和敌军弱点的判断。',
    policyInclination: '以保存齐国、保护即墨军民和恢复王统为目标，采取守城、反间、招抚与突然反攻结合的军事策略。',
    socialContribution: '代表战国城邑防御、民众动员和心理战经验，复齐后参与恢复齐国秩序，成为弱势一方逆转战争的经典人物。',
    impactSummary: '田单的成功依赖即墨城防、齐国遗民、燕军内部变化、王位继承和火牛战术多重因素。不能只用神奇计谋解释七十余城的复国。',
    resume: [
      { timeText: '前284-前279年', periodLabel: '即墨守城', title: '即墨守将 / 齐国地方军政负责人', nominalDuty: '负责城防、粮食、军民组织和对燕军的长期防御。', authorityScope: '即墨城内军民、粮仓、城墙、士绅和对外联络，受齐国残余王族支持。', actualInfluence: '维持即墨抵抗并利用燕军内部关系、降将和民众心理寻找反攻机会。', modernEquivalent: '职能近似战时要塞司令兼地方民防负责人。', impact: '齐国没有在燕军第一次攻势中完全灭亡。' },
      { timeText: '前279年以后', periodLabel: '火牛反攻与复齐', title: '齐国复国统帅、安平君 / 战后治理者', nominalDuty: '率军反攻、收复城邑、拥立齐王并恢复地方秩序。', authorityScope: '齐国复收地区军队、官员、粮税和王室安全，受齐襄王与齐国贵族共同制约。', actualInfluence: '以火牛阵突破燕军，连续收复七十余城，恢复齐国疆域。', modernEquivalent: '职能近似解放军统帅兼战后地方重建负责人。', impact: '战国后期齐国复国，燕国扩张成果崩溃。' }
    ]
  } },
  { id: 'jia-sixie', merge: {
    background: '贾思勰是北魏农学家和地方官，《齐民要术》系统记录北方耕作、选种、园艺、畜牧、酿造与食品加工技术。',
    childhood: '关于家世和幼年生活记载有限，可能出身山东士族或地方官僚家庭，长期接触北方农业、土地和基层生产经验。',
    personality: '重视观察、比较和操作步骤，既引用古书也记录农民和工匠经验；其著作体现实用知识优先于纯粹经典解释。',
    policyInclination: '没有中央政策权，作为地方官和农学整理者关注土地利用、作物选择、灾害应对、畜牧和家庭生产。',
    socialContribution: '保存北魏及更早时期农业、畜牧、食品和园艺知识，为中国农业史、技术史和环境史提供系统资料。',
    impactSummary: '贾思勰的价值不只是《齐民要术》作者称号，而在于把生产经验、地方差异和技术流程写成可传播文本；著作仍具有时代限制和经验性。',
    resume: [
      { timeText: '约530年前后', periodLabel: '北魏地方任官', title: '太守、地方官 / 农业观察者', nominalDuty: '负责州郡户籍、赋税、仓储、治安和农业生产秩序。', authorityScope: '地方土地、粮仓、农户、灌溉、赋役和基层官吏，受北魏中央监督。', actualInfluence: '在地方行政中接触不同地区的耕作、畜牧和灾害经验。', modernEquivalent: '职能近似地方行政官兼农业生产管理者。', impact: '行政经验为农书编纂提供实地材料。' },
      { timeText: '6世纪前期', periodLabel: '《齐民要术》编纂', title: '农学家 / 生产技术知识整理者', nominalDuty: '搜集、比较并编排农耕、园艺、畜牧、加工和生活技术。', authorityScope: '没有行政权，主要影响农户、地方官员、农书传播和后世农业教育。', actualInfluence: '完成系统农书，记录不同土地、气候和作物条件下的具体操作。', modernEquivalent: '职能近似农业技术专家兼生产知识编辑者。', impact: '中国古代农学形成具有连续影响的综合技术传统。' }
    ]
  } },
  { id: 'li-chun', merge: {
    background: '李春是隋代桥梁工程传统中的设计与施工负责人，通常与赵州桥建造相联系，代表隋朝统一后道路、水利和石拱技术的发展。',
    childhood: '个人家世、出生和教育资料几乎不存，史料主要通过赵州桥题记和后世桥梁记载保存其姓名，具体身份可能兼具工匠与工程管理者。',
    personality: '从工程成果可见重视结构、材料和洪水环境，能够把拱券、敞肩小拱和桥面荷载结合；个人性格不能由桥梁结构直接推断。',
    policyInclination: '没有独立政治政策权，主要以工程设计、工匠组织和公共交通建设回应隋代南北通行、漕运和防洪需求。',
    socialContribution: '赵州桥改善洨河交通并展示敞肩石拱桥技术，推动中国古代桥梁工程、材料组织和长期维护经验。',
    impactSummary: '李春的历史地位应标注“传统记载”和“具体生平存疑”。赵州桥是设计者、工匠、地方财政、石材和多次修缮共同完成的工程，不是个人神奇发明。',
    disputeTabs: [
      { title: '工程史视角', body: '敞肩拱和主拱结构减轻桥体重量、扩大泄洪空间，体现隋代工程师和工匠对材料与水文条件的综合处理。' },
      { title: '史料审慎视角', body: '关于李春具体官职、施工组织和桥梁原貌的资料有限，后世“千年不坏”叙述需要结合修缮、重建和考古材料。' }
    ],
    resume: [
      { timeText: '隋代开皇至大业时期', periodLabel: '道路与桥梁工程', title: '桥梁设计与施工负责人', nominalDuty: '负责桥梁选址、结构设计、石材组织、工匠施工和通行安全。', authorityScope: '工程现场、工匠班组、材料运输、桥面结构和地方交通协同，没有常规行政辖区。', actualInfluence: '主持或参与洨河石拱桥设计，形成主拱与敞肩小拱组合。', modernEquivalent: '职能近似大型桥梁总工程师兼施工项目负责人。', impact: '隋代南北交通与水利工程获得重要技术成果。' },
      { timeText: '隋唐以后', periodLabel: '赵州桥维护与技术传播', title: '古代工程传统代表', nominalDuty: '通过桥梁结构和后世修缮影响交通工程知识。', authorityScope: '没有后世行政权，影响集中在桥梁工匠、地方水利和工程史研究。', actualInfluence: '赵州桥长期作为石拱桥样本被维护、测绘和研究。', modernEquivalent: '职能近似历史工程设计代表与公共基础设施技术先驱。', impact: '中国古代桥梁工程的结构创新获得持续公共记忆。' }
    ]
  } },
  { id: 'yi-yin', merge: {
    background: '伊尹是商初政治人物，传统记载称其辅佐商汤灭夏、主持商初政务，并在太甲即位问题上承担辅政和纠偏责任。其具体年代和经历带有早期文献层累。',
    childhood: '《史记》等记载把伊尹写成出身有莘、曾为媵臣或厨师而入商的贤臣，早期细节兼具政治寓言和王朝合法性叙事，不能完全当作个人传记。',
    personality: '善于谋划、重视秩序和君主责任，后世理想化为“伊尹放太甲”的忠直辅政者；具体行为应结合商初王权和宗族制度理解。',
    policyInclination: '主张通过礼制、祭祀、官僚和农业资源稳定新王朝，强调君主失德时辅臣有纠偏责任，但这一观念也可能是后世儒家追述。',
    socialContribution: '在商汤灭夏、商初建国和贤臣辅政传统中具有核心地位，影响后世对宰辅、摄政、君臣责任和政治合法性的讨论。',
    impactSummary: '伊尹应标注“传说时代”和“史实存疑”。“五就桀”“放太甲”等故事保存早期政治理念，但具体年代、官职和事件过程无法完全复原。',
    disputeTabs: [
      { title: '商初辅政传统', body: '伊尹形象体现新王朝需要贤臣协助、约束和教育君主，后世将其视为宰辅政治和君臣责任的先例。' },
      { title: '文献层累视角', body: '《尚书》《史记》及后世经学不断重塑伊尹故事，放太甲等内容带有政治教化功能，不能直接视作商代逐日实录。' }
    ],
    resume: [
      { timeText: '商汤灭夏前后', periodLabel: '商初建国', title: '谋臣、右相 / 王朝创建辅臣', nominalDuty: '参与联盟、军事谋划、礼制和新政权组织。', authorityScope: '商王室、盟友诸侯、军队、祭祀和初期官署，实际权力依赖商汤。', actualInfluence: '传统记载中辅佐商汤灭夏并建立商朝秩序。', modernEquivalent: '职能近似开国政府首席战略顾问兼制度设计者。', impact: '贤臣辅佐新王朝的政治记忆形成。' },
      { timeText: '商初', periodLabel: '太甲辅政传统', title: '阿衡 / 摄政与君主教育者', nominalDuty: '辅佐幼主、处理政务、维持祭祀和官僚秩序。', authorityScope: '商王室中央政务、贵族关系、赋役、礼制和君主教育，具体权限因史料而存疑。', actualInfluence: '传统称太甲失德时将其放居桐宫，待其悔改后复位。', modernEquivalent: '职能近似幼主摄政与国家首席行政顾问，但不对应现代法定程序。', impact: '后世“辅臣可纠君”与贤臣政治的经典来源。' }
    ]
  } },
  { id: 'pan-geng', merge: {
    background: '盘庚是商代后期君主，传统记载称其将都城迁至殷，稳定商王室政治中心。关于具体年代和迁都次数，需结合甲骨文、殷墟考古和文献推定。',
    childhood: '商王世系和早年生活缺少连续传记，盘庚主要通过《尚书·盘庚》和后世商代王表被认识。不能把后世君王教育叙事当作真实童年。',
    personality: '决断、重视政治秩序和祖先祭祀，能够在贵族反对和迁徙成本之间推动迁都；具体性格来自诏辞与后世解释。',
    policyInclination: '以稳定王室、集中祭祀、控制方国和恢复生产为目标，通过迁都重组贵族、民众、土地和交通关系。',
    socialContribution: '迁殷使商后期政治中心相对稳定，殷墟甲骨文和王室遗存为研究商代国家、祭祀、战争和社会提供重要材料。',
    impactSummary: '盘庚迁殷不是简单的城市搬迁，而是王权、贵族、祭祀、农业和资源网络的重组；具体年代和迁都动因仍有学术争议。',
    resume: [
      { timeText: '商代中后期', periodLabel: '迁都前后的王室政治', title: '商王 / 迁都决策者', nominalDuty: '统筹王室、祭祀、方国、军队、农业和贵族关系。', authorityScope: '商王中央、宗族贵族、方国联盟、赋役和祭祀系统，实际控制依赖王室军政能力。', actualInfluence: '在政治中心不稳定的背景下提出迁都殷，重新安排王室和贵族资源。', modernEquivalent: '职能近似国家元首兼首都迁建与国家治理重组负责人。', impact: '商后期国家中心得到相对稳定。' },
      { timeText: '迁殷以后', periodLabel: '殷墟王朝秩序', title: '商王 / 祭祀与方国体系维护者', nominalDuty: '维持新都宫殿、祖先祭祀、军队、农业和对方国关系。', authorityScope: '殷都、王室贵族、祭祀机构、军队与周边方国，后续君主继续使用其政治中心。', actualInfluence: '迁都决策为武丁等商王时期的扩张和甲骨文记录提供稳定场所。', modernEquivalent: '职能近似国家元首兼中央行政与文化首都建设者。', impact: '殷墟成为商后期国家和文明考古的核心遗址。' }
    ]
  } },
  { id: 'wu-ding', merge: {
    background: '武丁是商代后期重要君主，甲骨卜辞记录其祭祀、战争、农业和疾病等国家事务，传统称其任用傅说并形成武丁中兴。',
    childhood: '商王世系记载缺少个人童年叙述，傅说故事和“梦得贤相”主要是后世政治寓言；甲骨文更能证明其成年后的王室活动。',
    personality: '重视祭祀、征伐和任用贵族与贤臣，能够通过战争与礼制扩大王权；具体心理和个性不能从卜辞的国家问事直接推断。',
    policyInclination: '以方国战争、人口和土地控制、祖先祭祀与贵族整合维持商王权，支持军事扩张并通过甲骨占卜进行决策。',
    socialContribution: '武丁时期的战争、甲骨文、王室墓葬和妇好事迹展示商代国家组织、文字、祭祀和军事能力，是研究商文明的核心阶段。',
    impactSummary: '“武丁中兴”是后世概括，商代强盛并非一位君主个人创造，而是王室、贵族、军队、俘获人口、农业和祭祀系统共同运作。',
    resume: [
      { timeText: '商代后期', periodLabel: '武丁即位与王室整合', title: '商王 / 祭祀与军事决策者', nominalDuty: '负责祖先祭祀、战争、农业、方国外交和王室人事。', authorityScope: '商王中央、贵族、军队、祭祀和甲骨记录体系，统治范围随军事能力变化。', actualInfluence: '通过卜辞决策、任用傅说传统和组织征伐强化王权。', modernEquivalent: '职能近似国家元首兼国防、农业与宗教事务最高决策者。', impact: '商王权威和甲骨文国家记录达到重要高峰。' },
      { timeText: '武丁在位时期', periodLabel: '对方国战争与甲骨政治', title: '商王 / 扩张型君主', nominalDuty: '统率对外战争、调配军粮、管理俘获人口和维持祖先礼制。', authorityScope: '多方国战区、王室军队、农业生产和祭祀资源，依靠贵族与将领执行。', actualInfluence: '频繁征伐土方、羌方等，甲骨文也记录妇好等王室成员参与军事。', modernEquivalent: '职能近似多区域国家最高统帅兼宗教礼制首脑。', impact: '为商后期政治、文字和考古材料留下集中记录。' }
    ]
  } },
  { id: 'fu-hao', merge: {
    background: '妇好是商王武丁的配偶、贵族和军事人物，甲骨卜辞记录其参与祭祀、征伐和王室事务，妇好墓出土物显示其拥有较高地位。',
    childhood: '关于出生和早年家世没有连续记载，妇好可能来自商王联姻的外部族群或贵族网络。墓葬、甲骨和器物是认识她的主要材料。',
    personality: '能够组织祭祀和军事行动，具备王室信任与政治资源；个人性格不应由后世“女将军”标签完全推断。',
    policyInclination: '主要服务商王室祭祀、战争和联盟关系，通过婚姻、军队和礼制承担王权整合功能，而非现代意义上的独立政策制定者。',
    socialContribution: '妇好材料证明商代女性贵族可以参与战争、祭祀和资源管理，拓展了对商代性别分工、王室政治和军事组织的认识。',
    impactSummary: '妇好是有甲骨和考古材料支持的重要商代女性，但具体战役、军队规模和个人言行仍需谨慎，不能被后世现代性别叙事完全重塑。',
    disputeTabs: [
      { title: '考古与甲骨视角', body: '妇好墓和卜辞显示其具有王室配偶、祭祀主持和军事参与身份，器物组合反映商代贵族权力与财富。' },
      { title: '称谓与角色边界', body: '“女将军”便于通识理解，但商代的军政、祭祀和婚姻权力不能直接套用现代军队职位或性别平等概念。' }
    ],
    resume: [
      { timeText: '商代武丁时期', periodLabel: '王室婚姻与祭祀', title: '王后或王室配偶 / 祭祀事务参与者', nominalDuty: '参与祖先祭祀、婚姻联盟、王室资源和礼仪活动。', authorityScope: '王室宗族、祭祀队伍、陪葬资源和部分贵族关系，没有现代意义的独立行政辖区。', actualInfluence: '通过王室身份和祭祀活动参与商王权力网络。', modernEquivalent: '职能近似国家元首配偶兼宗教与文化事务核心成员。', impact: '女性贵族在商代政治中的能见度得到考古支持。' },
      { timeText: '武丁在位时期', periodLabel: '对外战争与王室军政', title: '军事统帅、祭祀主持者 / 商王室重臣', nominalDuty: '率领军队、处理方国战争并主持或参与国家祭祀。', authorityScope: '所部军队、战区俘获人口、祭祀资源和王室外交，受武丁王权统属。', actualInfluence: '甲骨文记录其出征和祭祀，妇好墓出土兵器与礼器支持其军事贵族地位。', modernEquivalent: '职能近似王室高级军事与宗教事务负责人，但商代职位体系不能等同现代军衔。', impact: '妇好成为商代女性军事与祭祀权力的代表。' }
    ]
  } },
  { id: 'fan-li', merge: {
    background: '范蠡是春秋末年越国政治人物和谋臣，传统称其辅佐勾践灭吴，随后离开越国经商，形成“陶朱公”财富传说。',
    childhood: '出身和早年经历记载不一，主要形象来自《国语》《史记》及后世商业传说。其可确认身份是越国参与复国和吴越争霸的谋臣。',
    personality: '善于观察时势、长期布局和功成身退，重视国家资源与个人安全；后世商业智慧形象有理想化成分。',
    policyInclination: '主张越国积蓄粮食、训练军队、忍辱待机并利用吴国内部问题，政治成功后转向贸易、财富和家庭经营。',
    socialContribution: '参与越国复国、吴越争霸和灭吴传统，后世将其与商业经营、财富管理和隐退智慧联系，影响中国商业伦理叙事。',
    impactSummary: '范蠡的政治谋略、商业生涯和“三聚三散”故事分别来自不同叙事层次，不能简单证明其确实建立了后世传说中的商业帝国。',
    disputeTabs: [
      { title: '越国复国视角', body: '范蠡与文种帮助勾践积蓄国力、协调外交和等待时机，体现弱国在吴越竞争中的长期战略。' },
      { title: '陶朱公传说视角', body: '功成身退、经商致富和散财故事塑造了中国传统商人理想，但具体商业路线、财富规模和生卒资料并不确定。' }
    ],
    resume: [
      { timeText: '约前496-前473年', periodLabel: '越国复国与吴越战争', title: '大夫、谋臣 / 越国战略顾问', nominalDuty: '参与外交、军政、粮食、训练和对吴战略。', authorityScope: '越国中枢、军队、粮道和诸侯外交，受勾践王权与文种等重臣共同决策。', actualInfluence: '传统称协助勾践忍辱、积蓄国力并最终灭吴。', modernEquivalent: '职能近似国家安全与经济战略顾问。', impact: '越国从战败小国转为春秋末期强国。' },
      { timeText: '灭吴以后', periodLabel: '退隐与商业传说', title: '退隐者、商人 / 陶朱公', nominalDuty: '经营贸易、财富和家族生活，不再承担越国正式官职。', authorityScope: '没有行政权，影响集中在商业传说、财富伦理和后世商人自我想象。', actualInfluence: '后世传说称其改名经商、富而散财，成为商人智慧和功成身退的象征。', modernEquivalent: '职能近似企业经营者与财富管理者，但具体史实存疑。', impact: '政治谋臣与商业圣贤形象合并为独特文化传统。' }
    ]
  } },
  { id: 'baili-xi', merge: {
    background: '百里奚是春秋秦穆公时期重臣，传统称其由虞国、楚国辗转入秦，以“五羖大夫”身份受到重用，与蹇叔共同辅佐秦国西进。',
    childhood: '早年家世和游历细节主要来自《史记》及后世叙事，可能长期在诸侯间求仕。其“以五张羊皮赎回”的故事具有传奇和贤才识别寓意。',
    personality: '重视实务、识别地缘与人才，能够在秦国边疆环境中提出稳健建议；具体个人性格受后世贤臣叙事影响。',
    policyInclination: '主张任用有能力者、避免轻率东出、经营西戎和稳定关中，以战争、外交和资源治理增强秦国。',
    socialContribution: '代表春秋时期跨国求仕与秦国任贤传统，帮助秦穆公整合关中和西部资源，为秦国成为春秋大国提供制度与人才基础。',
    impactSummary: '百里奚的生平包含“贱而能贤”的政治寓言，但秦国西进、任贤和军政整合确有历史背景，应把传说细节与结构性贡献分开。',
    resume: [
      { timeText: '春秋中期', periodLabel: '诸侯求仕与入秦', title: '大夫 / 外来政治人才', nominalDuty: '参与诸侯国政务、外交、财政和军政建议。', authorityScope: '任职国的中央政务和君主咨询，具体官职与经历因史料而存疑。', actualInfluence: '辗转诸侯后进入秦国，以经验和贤名获得秦穆公信任。', modernEquivalent: '职能近似跨地区引进的高级政策顾问。', impact: '秦国吸纳外来人才的传统被后世反复书写。' },
      { timeText: '秦穆公时期', periodLabel: '秦国西进与内政', title: '相国近臣 / 秦国军政顾问', nominalDuty: '参与内政、外交、对西戎战争和晋秦关系决策。', authorityScope: '秦国中央、军队、诸侯外交和西部资源，实际与蹇叔、秦穆公共同决策。', actualInfluence: '传统称劝秦穆公经营西部、慎重东征，帮助秦国增强关中和陇右基础。', modernEquivalent: '职能近似政府首席战略顾问兼边疆政策负责人。', impact: '任贤与西进成为秦国长期崛起的重要记忆。' }
    ]
  } },
  { id: 'zou-ji', merge: {
    background: '邹忌是战国齐国重臣，参与齐威王时期政治，后世《战国策》以其“讽齐王纳谏”故事说明君主应突破身边人的信息遮蔽。',
    childhood: '出身和早年经历记载有限，主要通过齐国宫廷和政治寓言被认识。可将其放在齐威王整顿政治、任贤和改革的环境中理解。',
    personality: '善于自省、类比和政治表达，能够把家庭生活体验转化为君主治理建议；故事中的机敏形象经过文学编排。',
    policyInclination: '主张广开言路、用制度收集批评、避免权贵和亲近者扭曲信息，重视君主自我约束和官僚反馈。',
    socialContribution: '“邹忌讽齐王纳谏”成为中国教育和政治伦理中关于信息偏差、批评机制与领导者自省的经典案例。',
    impactSummary: '邹忌的史实官职和生卒不详，故事主要价值在政治思想而非个人履历。妻、妾、客的对话是寓言化结构，不能当作逐字史料。',
    resume: [
      { timeText: '战国中期', periodLabel: '齐威王时期', title: '齐国重臣 / 宫廷政策建议者', nominalDuty: '参与君主咨询、官员考核、政治表达和国家治理建议。', authorityScope: '齐国中枢政治、官员信息和君主决策建议，具体官职与辖区史料不足。', actualInfluence: '以个人经验说明亲近者赞誉不等于真实民意，促成齐威王重视进谏的政治寓言。', modernEquivalent: '职能近似政府政策顾问兼公共治理评估者。', impact: '君主听谏和信息纠错成为齐国贤君叙事的一部分。' },
      { timeText: '后世传播', periodLabel: '战国策与政治教育', title: '劝谏故事主角 / 政治伦理象征', nominalDuty: '通过故事传播批评、反馈和自我反省的治理原则。', authorityScope: '没有后世行政权，影响集中在经学、语文教育、领导伦理和政治思想。', actualInfluence: '故事被《战国策》及后世教材反复引用，成为纳谏和识别偏见的通识材料。', modernEquivalent: '职能近似公共管理案例人物与政治沟通思想者。', impact: '“邹忌讽齐王纳谏”成为中国政治寓言传统的重要篇章。' }
    ]
  } },
  { id: 'da-yu', merge: {
    background: '大禹是传说时代治水、夏王朝建立和部落联盟秩序形成的核心人物，鲧禹治水故事把洪水治理、土地开发和政治合法性联系起来。',
    childhood: '早期家世主要见于先秦文献，传说称其为鲧之子。三过家门而不入等故事强调公共责任，具体年代和个人经历无法按后世传记坐实。',
    personality: '坚忍、重实际工程和公共责任，善于组织部落、疏导水患和协调资源；其形象经过夏商周政治记忆不断重塑。',
    policyInclination: '以治水、分土、定贡和建立王权秩序为核心，强调通过水利、土地和部落联盟稳定早期国家。',
    socialContribution: '大禹治水成为中国早期文明关于水利、农业、公共工程和国家起源的核心叙事，也反映黄河流域社会对洪水治理的长期记忆。',
    impactSummary: '大禹应标注“传说时代”“史实存疑”。治水传统可能汇集多代工程经验，夏朝建立也不能只归因于个人英雄。',
    disputeTabs: [{ title: '治水与国家起源', body: '大禹形象体现从堵截到疏导的治水理念，以及水利、土地、赋贡和政治整合之间的关系。' }, { title: '传说层累', body: '三过家门、九州划分等内容经过先秦和汉代整理，不能当作可逐日核验的个人履历。' }],
    resume: [
      { timeText: '传说时代', periodLabel: '鲧禹治水', title: '治水首领 / 部落联盟公共工程组织者', nominalDuty: '组织治水、疏导河流、安置居民和恢复农业。', authorityScope: '部落劳力、河道、堤防、土地分配和灾害救济，具体制度属于传说层。', actualInfluence: '传统称其继承鲧的治水任务并以疏导成功获得联盟支持。', modernEquivalent: '职能近似国家级水利工程总负责人兼灾害治理协调者。', impact: '治水成为夏王朝政治合法性的重要来源。' },
      { timeText: '夏朝建立传统', periodLabel: '禹会诸侯与王权形成', title: '夏王 / 早期国家首领', nominalDuty: '统合部落、主持祭祀、分配土地贡赋并维护治水成果。', authorityScope: '早期联盟的军政、土地、水利、贡赋和礼仪，权力依赖部落首领承认。', actualInfluence: '传统称获得舜禅让并建立夏，开启王位世袭政治。', modernEquivalent: '不对应现代职位，属于早期国家联盟首领。', impact: '大禹成为中国王朝起源、公共责任和水利文明的象征。' }
    ]
  } },
  { id: 'qi-of-xia', merge: {
    background: '夏启是禹的继承者，传统记载称其打破禅让、建立王位世袭，甘之战体现夏王与有扈氏之间的权力冲突。',
    childhood: '作为禹的儿子成长于治水成功和部落联盟重组环境，关于其具体教育和母族的材料有限，主要由夏代王权传承故事保存。',
    personality: '重视王位继承、礼仪和军政权威，能够利用父辈声望整合支持；其形象也反映后世对世袭取代禅让的解释。',
    policyInclination: '主张将联盟首领权转化为家族世袭、强化王室军队和贡赋，必要时通过战争压制不承认王权的部落。',
    socialContribution: '在中国早期政治记忆中代表从禅让到世袭、从部落联盟到王朝国家的转折，夏启故事也提示国家形成伴随冲突。',
    impactSummary: '夏启的具体年代和战事存在史实争议，世袭制并非一人突然发明，而是早期社会权力、财富和军事组织长期变化的结果。',
    resume: [
      { timeText: '禹晚年', periodLabel: '夏王继承', title: '王子 / 王权继承人', nominalDuty: '参与祭祀、治水成果维护、部落联络和王室事务。', authorityScope: '王室亲族、盟友部落和继承支持者，实际权限受禹与部落首领制约。', actualInfluence: '在禹去世后凭王室血缘和政治联盟取得继承优势。', modernEquivalent: '职能近似早期世袭国家的法定继承人。', impact: '王位继承从推举转向家族延续的传统开始形成。' },
      { timeText: '夏初', periodLabel: '甘之战与世袭王权', title: '夏王 / 早期王朝统治者', nominalDuty: '统辖王室、军队、祭祀、贡赋和部落联盟。', authorityScope: '夏王直接控制的部落、军队、土地贡赋和对外征伐，行政体系尚不成熟。', actualInfluence: '传统称与有扈氏交战并巩固王位世袭。', modernEquivalent: '不对应现代职位，属于早期王朝最高首领。', impact: '夏启成为世袭王朝建立的象征人物。' }
    ]
  } },
  { id: 'jie-of-xia', merge: {
    background: '桀是传统记载中的夏朝末王，商汤伐夏和鸣条之战把其暴政形象与夏商更替联系起来，具体事迹带有王朝革命叙事。',
    childhood: '夏王世系和个人早年材料几乎不存在，后世以桀的成年统治、宫室、征伐和与妹喜传说说明末代王失德。',
    personality: '传统评价为强悍、奢侈、拒绝纳谏和依赖暴力；这些描述服务于商汤革命合法性，也不能完全替代夏末社会结构分析。',
    policyInclination: '维持夏王室贡赋、军队和贵族秩序，面对诸侯与部落反抗采取征伐和高压控制，缺少重建联盟的能力。',
    socialContribution: '桀的形象成为中国传统“暴君亡国”谱系的早期样本，帮助后世讨论天命、民心和王朝更替的政治合法性。',
    impactSummary: '夏桀是否如后世所述极端暴虐无法完全验证，夏亡还涉及商族崛起、诸侯联盟、资源竞争和早期国家整合能力。',
    disputeTabs: [{ title: '王朝革命叙事', body: '商汤以桀失德、民心背离说明伐夏合理，后世以此建立“天命转移、暴君亡国”的政治伦理。' }, { title: '历史结构视角', body: '夏末资料稀少，不能把宫室、妹喜和酷刑故事当作全部史实；商族军事、经济和联盟能力同样决定夏商更替。' }],
    resume: [
      { timeText: '夏末', periodLabel: '夏王室危机', title: '夏王 / 末代统治者', nominalDuty: '统辖王室、方国、军队、祭祀和贡赋。', authorityScope: '夏王室及其盟友、军队、土地和贡赋网络，实际控制因诸侯离心而下降。', actualInfluence: '传统称其征伐诸侯、加重高压和失去贵族支持。', modernEquivalent: '不对应现代职位，属于早期王朝最高统治者。', impact: '夏王朝政治合法性和联盟秩序走向崩解。' },
      { timeText: '约前16世纪传统', periodLabel: '鸣条之战与夏亡', title: '夏末君主 / 商汤战争对手', nominalDuty: '组织王室军队应对商族进攻和诸侯叛离。', authorityScope: '末期夏军、王室据点和方国关系，实际动员能力不及商汤联盟。', actualInfluence: '鸣条战败，夏朝结束，商汤建立新王朝。', modernEquivalent: '不对应现代职位。', impact: '成为后世王朝更替和失德亡国叙事的典型。' }
    ]
  } },
  { id: 'cheng-tang', merge: {
    background: '商汤是商族首领和商王朝建立者，传统记载称其联合伊尹等人讨伐夏桀，在鸣条之战后建立商朝。',
    childhood: '商族早期世系和个人童年材料有限，商汤在夏王朝体系中可能先以方国首领或诸侯身份成长，后逐步扩展联盟。',
    personality: '善于用人、重视联盟和战争准备，能够以伐桀、救民和天命话语争取诸侯；“宽仁”形象也由后世政治伦理塑造。',
    policyInclination: '主张整合方国、改善贡赋和军队、以贤臣辅政，建立以王室、祭祀、土地和贵族网络为核心的商代国家。',
    socialContribution: '建立商朝、形成早期王朝政治和商族文化传统，后世甲骨文、青铜礼器和王室祭祀证明商文明的持续发展。',
    impactSummary: '商汤伐夏是天命革命经典，但商朝建立也依赖商族长期积累、方国联盟、农业和军事资源，不能只看一场鸣条战役。',
    resume: [
      { timeText: '夏末', periodLabel: '商族扩张与联盟', title: '商族首领 / 诸侯联盟组织者', nominalDuty: '管理商族土地、军队、祭祀和与夏王室及诸侯关系。', authorityScope: '商族核心地区、盟友方国、军队、贡赋和祭祀，受部落贵族网络影响。', actualInfluence: '以伊尹、仲虺等辅臣整合力量，逐步形成伐夏条件。', modernEquivalent: '职能近似区域政治军事联盟领袖。', impact: '商族从地方方国上升为王朝竞争者。' },
      { timeText: '约前16世纪传统', periodLabel: '鸣条之战与商朝建立', title: '商王 / 开国君主', nominalDuty: '统辖新王朝军政、祭祀、贵族、土地与方国。', authorityScope: '商王中央、王室宗族、军队、贡赋和祭祀体系，行政依靠贵族与地方方国。', actualInfluence: '击败夏桀并建立商朝，建立新王朝合法性和政治秩序。', modernEquivalent: '国家元首兼开国最高军事统帅的职能近似。', impact: '夏商更替成为后世天命政治与王朝革命的经典。' }
    ]
  } },
  { id: 'shang-zhou-wang', merge: {
    background: '帝辛即商纣王是商朝末代王，传统记载把其与妲己、炮烙和酒池肉林联系，周武王伐纣和牧野之战最终终结商朝。',
    childhood: '商王世系缺少个人童年材料，甲骨和青铜资料显示商末王权仍有祭祀、征伐和方国管理能力，后世暴君传说不能覆盖全部现实。',
    personality: '传统评价强调勇力、聪辩、奢侈和拒谏，现代研究更关注其战争、祭祀、贵族冲突和资源压力，具体性格难以完整复原。',
    policyInclination: '维持商王室祭祀、军队和方国控制，可能加大对东南、周边方国和贵族的军事动员，最终无法抵御周族联盟。',
    socialContribution: '商纣王时期留下大量商末战争、青铜礼制和王权考古材料，成为理解商周更替与暴君政治叙事的关键人物。',
    impactSummary: '商纣王是史实与后世道德化形象高度叠合的人物。牧野之战、商贵族倒戈、周族崛起和资源竞争比单一“暴政”解释更完整。',
    disputeTabs: [{ title: '传统暴君视角', body: '《尚书》《史记》以失德、拒谏和残暴说明周武王伐商的合法性，形成后世商纣负面形象。' }, { title: '考古与制度视角', body: '殷墟材料显示商末仍有复杂国家组织，具体酷刑和宫廷逸事多经后世加工，应把王朝崩溃与联盟、战争和资源问题并置。' }],
    resume: [
      { timeText: '商末', periodLabel: '商王室与东南战争', title: '商王 / 末代国家统治者', nominalDuty: '主持祭祀、征伐、方国关系、贵族和农业贡赋。', authorityScope: '商王中央、军队、祭祀机构、贵族和方国，实际依赖王室军政网络。', actualInfluence: '维持对东南方国和周边地区的战争与政治控制，消耗商王室资源。', modernEquivalent: '不对应现代职位，属于青铜时代王朝最高统治者。', impact: '商末战争和贵族关系为周族联盟取代商朝创造条件。' },
      { timeText: '约前1046年传统', periodLabel: '牧野之战与商亡', title: '商末君主 / 周武王战争对手', nominalDuty: '组织商军、王室贵族和方国力量抵抗周族进攻。', authorityScope: '商军、王室据点、东土方国和祭祀政治，盟友在战前和战中出现离心。', actualInfluence: '牧野战败后自焚或死于鹿台的传统流传，商朝结束。', modernEquivalent: '不对应现代职位。', impact: '成为后世暴君亡国和天命转移的代表。' }
    ]
  } },
  { id: 'king-you-zhou', merge: {
    background: '周幽王是西周末代君主，面临王室权威下降、诸侯坐大和西部边患，废立太子与申侯关系破裂后，镐京在犬戎进攻中失守。',
    childhood: '周王室世系和王子教育资料有限，幽王即位时已经处于西周贵族联盟和王室财政军力下降的阶段。',
    personality: '传统形象强调宠爱褒姒、轻信近臣和废立失当，具体性格受“烽火戏诸侯”故事影响；实际危机还来自结构性王权衰退。',
    policyInclination: '试图通过宫廷婚姻、王位继承和对诸侯控制维持王室，但废太子、失去申侯支持和边防失守使政治联盟破裂。',
    socialContribution: '周幽王时期记录了西周向东周转折、王室继承和诸侯政治变化，是春秋争霸前夜的重要节点。',
    impactSummary: '周幽王不能只被写成“烽火戏诸侯”的昏君。骊山烽火故事未必为史实，犬戎压力、王室资源和贵族联盟才是西周灭亡的关键。',
    disputeTabs: [{ title: '传统故事视角', body: '褒姒、烽火和废太子故事通过戏剧化情节解释君主失德与诸侯离心，适合用于记忆王朝转折。' }, { title: '制度与边疆视角', body: '西周末期王室控制土地、军队和贡赋的能力下降，诸侯与外族关系变化是更深层原因。' }],
    resume: [
      { timeText: '前782-前771年', periodLabel: '西周末年', title: '周王 / 王室联盟最高首领', nominalDuty: '主持宗法、分封、祭祀、军队和诸侯关系。', authorityScope: '王畿、王室军队、诸侯封国、贡赋和礼制，实际控制逐步下降。', actualInfluence: '废立太子、调整王后与诸侯关系，王室内部矛盾扩大。', modernEquivalent: '职能近似宗法封建联盟的最高首领。', impact: '周王室政治联盟失去稳定。' },
      { timeText: '前771年', periodLabel: '犬戎进攻与镐京失守', title: '西周末王 / 边患危机决策者', nominalDuty: '组织王室军队、召集诸侯并维护镐京与西部边防。', authorityScope: '王畿军队、边防关隘、诸侯援军和宫廷继承，实际未能有效调度。', actualInfluence: '镐京失守并战死，周平王随后东迁洛邑。', modernEquivalent: '不对应现代职位。', impact: '西周终结，东周和诸侯争霸开始。' }
    ]
  } },
  { id: 'han-jing-di', merge: {
    background: '汉景帝刘启是西汉前期皇帝，继承文帝休养生息政策，推进削藩并平定七国之乱，中央对诸侯王的控制明显增强。',
    childhood: '作为文帝太子成长于汉初恢复、宫廷继承和诸侯王并立环境，接受经学、军政与皇室教育，早年经历与晁错等政策圈密切。',
    personality: '谨慎而重皇权，能够在危机中依靠周亚夫等将领；杀晁错以求缓和七国的决策显示其政治压力和责任取舍。',
    policyInclination: '延续轻徭薄赋、节制财政的同时削弱诸侯王、强化中央任官和军队，逐步把汉初分封格局纳入帝国行政。',
    socialContribution: '平定七国之乱、削弱诸侯和推动汉初中央集权，为汉武帝时期郡国并行向更强皇权转化奠定条件。',
    impactSummary: '汉景帝时期既有文景恢复，也有大规模内战。七国之乱不是晁错个人政策的单一后果，而是中央、诸侯、军队和继承制度长期矛盾爆发。',
    resume: [
      { timeText: '前157-前154年', periodLabel: '继承文景政治', title: '皇帝 / 汉初休养生息与削藩决策者', nominalDuty: '统筹财政、官员、诸侯、军队和礼制。', authorityScope: '中央三公九卿、郡国、诸侯王、赋税和禁军，权力受汉初制度和功臣集团制约。', actualInfluence: '延续文帝节俭和轻徭薄赋，同时支持晁错削藩。', modernEquivalent: '国家元首兼最高行政与国防决策者。', impact: '汉初中央集权议程进入关键阶段。' },
      { timeText: '前154-前141年', periodLabel: '七国之乱后', title: '皇帝 / 诸侯权力重组者', nominalDuty: '指挥平叛、重整郡国、任免官员并恢复财政和社会秩序。', authorityScope: '中央军队、郡国官员、诸侯封地和王国军政，实际通过周亚夫等将领执行。', actualInfluence: '平定吴楚七国，收回诸侯部分权力，推动郡国行政统一。', modernEquivalent: '国家元首兼内战平定和地方制度重组负责人。', impact: '为汉武帝集权、推恩令和对外扩张准备国家结构。' }
    ]
  } },
  { id: 'wang-mang', merge: {
    background: '王莽是西汉末外戚、摄政者和新朝皇帝，试图以古制改革土地、货币、商业和奴婢制度，但改革频繁变动、地方执行困难，最终在新末战争中失败。',
    childhood: '出身王氏外戚，父辈早逝后以节俭、礼贤和儒家名声获得士人支持，成长于西汉后期外戚、宦官和土地兼并加剧的环境。',
    personality: '善于经营名声、学习经典和组织官僚，具有改革理想与强烈权力欲；面对灾荒、反抗和官僚执行失败时缺少调整能力。',
    policyInclination: '主张恢复周礼、限制土地兼并、改革货币与商业、禁止或限制奴婢买卖，以古制和新文字制度重建国家秩序。',
    socialContribution: '新政留下中国古代土地、货币和社会改革的重要案例，王莽代汉与失败也推动后世思考理想制度、执行能力和政治合法性。',
    impactSummary: '王莽不是单纯的“伪君子”或“改革家”。其改革回应真实社会问题，却受财政、战争、地方豪强、行政能力和禅让合法性局限。',
    disputeTabs: [{ title: '改革视角', body: '王田、五均六筦、货币和奴婢政策试图回应土地兼并、贫富分化和财政问题，具有制度实验性质。' }, { title: '权力与执行视角', body: '王莽通过外戚、摄政和禅让夺取皇位，改革频繁改制、官僚贪腐和灾荒起义使政策难以落实。' }],
    resume: [
      { timeText: '前8年前后', periodLabel: '外戚摄政与禅让', title: '大司马、摄皇帝 / 新朝建立者', nominalDuty: '代表幼主处理官员、财政、礼制和对诸侯的中央政务。', authorityScope: '中央官署、外戚网络、宗室、郡国官员和禅让礼制，实际权力超过名义皇帝。', actualInfluence: '利用儒家名声和外戚资源逐步取得摄政与皇位。', modernEquivalent: '不对应现代职位，属于君主制摄政与权力转移核心。', impact: '西汉皇统被新朝取代。' },
      { timeText: '9-23年', periodLabel: '新朝改革与崩溃', title: '新朝皇帝 / 制度改革者', nominalDuty: '统筹土地、货币、财政、军事、官制和救灾。', authorityScope: '新朝中央、郡县、货币市场、土地和军队，实际执行受地方豪强与战争制约。', actualInfluence: '推行王田、货币和商业改革，面对绿林、赤眉和刘秀势力扩张，最终死于长安战乱。', modernEquivalent: '国家元首兼制度改革和危机治理负责人。', impact: '新朝失败，东汉复兴，理想改革与国家能力的矛盾成为后世案例。' }
    ]
  } },
  { id: 'liu-bei', merge: {
    background: '刘备是东汉末至三国蜀汉开国者，经历黄巾余波、徐州、荆州、益州和汉中战争，依靠宗室名分、同盟和地方经营建立蜀汉。',
    childhood: '出身涿郡地方家庭，自称汉室宗亲，早年家贫而织席贩履，受卢植、关羽、张飞和地方豪杰关系影响，长期在军阀竞争中流转。',
    personality: '善于笼络人心、重承诺和名分，能够在失败后重新组织集团；军事判断和联盟处理有局限，夷陵伐吴体现复仇、荆州和战略之间的冲突。',
    policyInclination: '以恢复汉室、联合孙吴、经营益州和保障地方军政为目标，重视人才与民众支持，试图以蜀汉正统整合多族群和地方势力。',
    socialContribution: '建立蜀汉、推动三国政治格局形成，后世《三国演义》把其仁义形象放大，历史人物与文学人物需要分开。',
    impactSummary: '刘备的成功依靠宗室名分、关张将领、诸葛亮等文臣、荆益地缘和人口资源，而非单一“仁德”。蜀汉政权的政治合法性和军事局限并存。',
    disputeTabs: [{ title: '历史人物视角', body: '刘备经历多次失败仍能依靠联盟、人才和地方经营建立蜀汉，体现东汉末政治流动和政权创业。' }, { title: '文学形象视角', body: '《三国演义》强化刘备仁慈、哭泣和汉室正统形象，关羽、诸葛亮和三顾茅庐细节也有文学加工。' }],
    resume: [
      { timeText: '184-208年', periodLabel: '东汉末流转与荆州', title: '州郡将领、豫州牧 / 地方军政领袖', nominalDuty: '组织军队、争夺州郡、处理地方官民和诸侯联盟。', authorityScope: '所部军队、徐州荆州据点、地方粮道和流民，实际辖区随战局变化。', actualInfluence: '在曹操、袁绍、刘表等势力之间辗转，保持刘备集团和汉室名分。', modernEquivalent: '职能近似流动战区军政首领兼地方政权创业者。', impact: '为赤壁后进入益州和建立蜀汉保留政治资本。' },
      { timeText: '208-223年', periodLabel: '益州、汉中与蜀汉', title: '汉中王、蜀汉昭烈帝 / 国家创建者', nominalDuty: '统筹蜀汉军政、财政、官员、外交和对魏吴战争。', authorityScope: '益州、汉中、蜀汉中央官署、军队和巴蜀地方社会，权力受地理与资源制约。', actualInfluence: '入蜀、取汉中并称帝，夷陵败后在白帝城托孤。', modernEquivalent: '国家元首兼最高军事统帅。', impact: '三国鼎立完成，蜀汉成为西南区域政权。' }
    ]
  } },
  { id: 'sun-quan', merge: {
    background: '孙权是孙吴开国皇帝，继承孙策江东基业，经历赤壁、荆州争夺、夷陵和对魏外交，长期经营长江中下游。',
    childhood: '出身孙氏军政家族，少年失父兄后在张昭、周瑜、鲁肃等臣属辅助下继承江东，熟悉宗族、军镇、水军和地方豪强关系。',
    personality: '善于用人、权衡联盟和适应形势，能在曹魏与蜀汉之间保持独立；晚年继承争议、猜疑和宫廷清洗削弱了政治稳定。',
    policyInclination: '重视长江防线、水军、江东开发和外交平衡，必要时与曹魏或蜀汉议和，以保存吴国资源和独立地位。',
    socialContribution: '建立孙吴、推动江南开发和南北人口流动，三国后期吴国的海上、长江和地方治理成为南方国家发展的基础。',
    impactSummary: '孙权不是只会“坐断东南”的地方领主，他完成了从地方军阀到皇帝的制度转型；晚年继承问题显示长期集权也会制造宫廷风险。',
    resume: [
      { timeText: '200-208年', periodLabel: '继承江东与赤壁', title: '讨虏将军、会稽太守 / 江东军政领袖', nominalDuty: '统辖江东郡县、军队、水师、粮道和对外外交。', authorityScope: '江东六郡、长江水军、宗族豪强和地方官员，需依赖周瑜、张昭等集团协同。', actualInfluence: '稳住孙策旧部并在赤壁选择抗曹，保住江东独立。', modernEquivalent: '职能近似区域军政长官兼地方政权最高负责人。', impact: '孙吴成为三国鼎立的重要一极。' },
      { timeText: '208-252年', periodLabel: '孙吴建国与江南经营', title: '吴王、吴大帝 / 江南国家统治者', nominalDuty: '统筹吴国军政、财政、水军、外交和地方开发。', authorityScope: '长江中下游、荆州部分地区、江南郡县、军队和海外交通，实际受宗族与将领制约。', actualInfluence: '完成称王称帝、经营江南并与魏蜀反复结盟作战，晚年处理太子继承失当。', modernEquivalent: '国家元首兼最高行政、国防和外交决策者。', impact: '孙吴维持近六十年，江南政治经济地位显著提升。' }
    ]
  } },
  { id: 'sima-yan', merge: {
    background: '司马炎是西晋开国皇帝，继承司马昭和司马氏控制的曹魏军政资源，265年代魏，280年灭吴完成短暂统一。',
    childhood: '出身河内司马氏，成长于曹魏后期权臣、士族和军镇政治环境，接受经史、礼制和军事教育，参与司马氏权力承继。',
    personality: '有统一目标、重视礼制和官僚整合，早期能够纳谏并处理灭吴，晚年分封宗室、继承和生活奢靡问题削弱政治判断。',
    policyInclination: '主张以禅让合法性、士族官僚、宗室分封和屯田财政维持统一，削弱地方军镇但又用诸王拱卫皇室，形成制度矛盾。',
    socialContribution: '结束三国分裂、建立西晋并恢复全国行政联系，推动户籍、律令和士族秩序重建；八王之乱说明宗室分封带来后患。',
    impactSummary: '司马炎统一中国是重大成就，但西晋稳定短暂，分封宗室、继承人能力和士族地方化使统一缺乏持久制度保障。',
    resume: [
      { timeText: '265-280年', periodLabel: '代魏与灭吴', title: '晋王、晋武帝 / 统一战争最高决策者', nominalDuty: '统筹中央官僚、军队、财政、外交和对吴战争。', authorityScope: '西晋中央、关中荆州军队、州郡粮运、宗室封国和对吴战略。', actualInfluence: '接受曹魏禅让建立晋朝，组织大规模水陆军灭吴。', modernEquivalent: '国家元首兼最高行政、国防和统一战争决策者。', impact: '三国鼎立结束，西晋统一全国。' },
      { timeText: '280-290年', periodLabel: '统一后治理与继承', title: '晋武帝 / 统一帝国制度整合者', nominalDuty: '管理全国州郡、律令、户籍、宗室、财政和边疆。', authorityScope: '全国中央与地方官僚、宗室封国、军队和户籍赋役，权力受士族与宗王关系制约。', actualInfluence: '推行太康政治并大封宗室，晚年在继承与宫廷生活上留下结构问题。', modernEquivalent: '国家元首兼统一后行政制度设计者。', impact: '西晋短暂统一为后续南北朝政治和士族社会奠定起点。' }
    ]
  } },
  { id: 'fu-jian', merge: {
    background: '苻坚是前秦君主，任用王猛整顿吏治、扩张军队并统一黄河流域，383年淝水之战败于东晋后前秦迅速瓦解。',
    childhood: '出身氐族苻氏政权，早年经历前秦宗室和关中政局，受王猛等汉人士族和多族群官僚影响，形成兼收并蓄的统治风格。',
    personality: '重用人才、具有统一理想和宗教宽容的一面，军事扩张后又低估东晋、族群与地方认同，晚年决策受个人威望和帝国规模牵制。',
    policyInclination: '主张以法令、农业、户籍、官僚和军事整合多族群北方，推动佛教和文化交流；统一东晋的战略最终超过财政、后勤与政治承受力。',
    socialContribution: '短暂统一北方、推动十六国多族群行政整合和佛教传播，淝水失败后北方重新分裂，显示统一与认同建设的难度。',
    impactSummary: '苻坚不是只有淝水失败的“前秦皇帝”。王猛治理、北方统一、族群整合和南征决策共同构成其历史作用，个人理想不能替代制度基础。',
    disputeTabs: [{ title: '北方统一视角', body: '苻坚任用王猛、吸收汉地官僚和各族人才，在十六国中形成较强中央行政，完成黄河流域大部统一。' }, { title: '淝水失败视角', body: '南征失败与军队多族群、后勤、东晋北府军、地方认同和战略判断有关，不能简单归为骄傲或偶然。' }],
    resume: [
      { timeText: '357-376年', periodLabel: '前秦中兴与北方统一', title: '秦王、天王 / 多族群国家建设者', nominalDuty: '统筹官僚、财政、军队、农业、宗教和征服后地方治理。', authorityScope: '关中与黄河流域中央、州郡、地方豪强和多族群军队，依靠王猛等重臣执行。', actualInfluence: '整顿政治并灭前燕、代等政权，建立十六国时期较大统一区域。', modernEquivalent: '国家元首兼最高行政、国防和多族群治理决策者。', impact: '北方政治和文化交流获得短暂统一平台。' },
      { timeText: '376-385年', periodLabel: '淝水前后', title: '前秦最高统治者 / 南征决策者', nominalDuty: '统率全国军队、处理外交和统一东晋的战略。', authorityScope: '前秦各族军队、粮道、州郡和宗室，实际控制受地方首领与族群关系制约。', actualInfluence: '大举南征东晋，淝水败后北方诸部和旧政权反叛，最终在姚苌势力中被杀。', modernEquivalent: '国家元首兼统一战争总司令。', impact: '前秦崩溃，十六国再分裂，淝水成为南北政治转折。' }
    ]
  } },
  { id: 'emperor-xiaowen-northern-wei', merge: {
    background: '北魏孝文帝拓跋宏是北魏改革与汉化的核心君主，迁都洛阳、改汉姓、改服制、推行均田和三长制，推动鲜卑政权转向中原官僚国家。',
    childhood: '幼年即位，在文明太后和冯氏政治教育下成长，接受鲜卑、汉文、佛教和儒家文化训练，亲政后面对迁都与贵族利益阻力。',
    personality: '重视制度、文化和中央集权，改革决断强；汉化速度和对鲜卑旧俗的压制引发六镇、军镇和族群矛盾，晚年改革后果复杂。',
    policyInclination: '以迁都洛阳、改汉姓、通婚、均田、三长制和官制改革整合北方，试图让鲜卑贵族进入中原礼法与文官秩序。',
    socialContribution: '促进北魏政治、语言、服饰、婚姻和城市文化转型，推动民族交融与北方统一后的制度建设。',
    impactSummary: '孝文帝改革既推动民族交融和中央集权，也造成部分鲜卑军镇不满，北魏后期问题不能全部归因改革或简单评价为汉化成功。',
    disputeTabs: [{ title: '制度改革视角', body: '均田制、三长制、迁都和官制改革增强北魏对户籍、土地和地方的控制，促进多族群官僚国家形成。' }, { title: '族群与军镇视角', body: '洛阳化和礼法改革削弱部分鲜卑军镇传统，六镇动乱与北魏分裂显示文化整合需要政治、经济和军事同步。' }],
    resume: [
      { timeText: '471-490年', periodLabel: '幼年即位与太后辅政', title: '北魏皇帝 / 改革准备者', nominalDuty: '名义统辖北魏军政、祭祀、官员和边疆，接受太后辅政与教育。', authorityScope: '北魏中央、州镇、鲜卑贵族和汉地官僚，实际决策由太后与重臣共同承担。', actualInfluence: '接受汉文化、佛教和官僚教育，逐步准备迁都与制度改革。', modernEquivalent: '国家元首兼摄政体系下的继承人。', impact: '北魏改革获得皇权和宫廷资源。' },
      { timeText: '490-499年', periodLabel: '迁都洛阳与孝文改革', title: '北魏皇帝 / 多族群制度改革者', nominalDuty: '统筹户籍、土地、官制、军队、礼制和都城迁建。', authorityScope: '全国州镇、均田户籍、三长制、洛阳都城、贵族和军镇。', actualInfluence: '迁都洛阳、改汉姓、禁胡服、推均田和三长制，推动北方制度转型。', modernEquivalent: '国家元首兼首都迁建、土地户籍和国家整合负责人。', impact: '北魏与中原政治文化深度融合，民族交融加速。' }
    ]
  } },
  { id: 'sui-wen-di', merge: {
    background: '隋文帝杨坚是隋朝开国皇帝，结束南北朝分裂，推行三省六部、州县整并、科举萌芽、均田赋役和府兵制度，建立开皇政治。',
    childhood: '出身关陇军事贵族，成长于北周宗室与外戚政治，女儿为北周皇后，凭外戚、军政和禅让取得皇位。',
    personality: '节俭、勤政、重视统一和行政效率，对官员与宗室控制严格；晚年猜疑、家庭矛盾和继承安排影响政治稳定。',
    policyInclination: '主张削弱地方割据、整并州县、统一法令、恢复户籍和农业，兼用关陇军政与南北官僚重建中央国家。',
    socialContribution: '完成南北统一、重建户籍财政和中央官制，为唐代制度和大一统国家提供基础；高压行政与徭役动员也留下负担。',
    impactSummary: '隋文帝的开皇之治依赖制度、战争后恢复和勤政个人风格，隋朝短命不能抹去其统一与行政建设，也不能忽视其后期政治问题。',
    resume: [
      { timeText: '581-589年', periodLabel: '隋朝建国与灭陈', title: '隋文帝 / 统一战争最高决策者', nominalDuty: '统筹中央官制、军队、财政、礼制和南北统一。', authorityScope: '中央三省六部、州县、府兵、粮运和南方战区，依靠高颎、杨素等重臣执行。', actualInfluence: '建立隋朝并以水陆大军灭陈，结束长期南北分裂。', modernEquivalent: '国家元首兼最高行政、国防和统一战争决策者。', impact: '中国重新建立统一王朝和中央行政体系。' },
      { timeText: '589-604年', periodLabel: '开皇政治与晚年', title: '统一帝国治理者', nominalDuty: '管理户籍、赋役、官员、法律、边疆和宗室继承。', authorityScope: '全国州县、户籍、均田赋役、府兵和宗室，权力高度集中于皇帝。', actualInfluence: '推行开皇制度、整顿地方和恢复经济，晚年改立太子并对继承人处置引发争议。', modernEquivalent: '国家元首兼中央行政与国家制度整合者。', impact: '隋唐三省六部、户籍和府兵传统获得制度起点。' }
    ]
  } },
  { id: 'sui-yang-di', merge: {
    background: '隋炀帝杨广是隋朝第二位皇帝，修建大运河、营建东都、开科举和多次征高句丽，国家工程与军事动员最终加剧隋末危机。',
    childhood: '出身隋文帝次子，早年封晋王并镇守江南，参与灭陈和地方治理，积累南北交通、军政与宫廷竞争经验。',
    personality: '雄心强、重视工程、文化和扩张，善于组织大规模项目；对民力、军粮、时间和地方承受能力估计不足，政治控制也趋于高压。',
    policyInclination: '主张以运河、都城、科举、巡游和对外战争把统一帝国连接起来，强化皇权和南北资源调度。',
    socialContribution: '大运河、科举和南北交通影响唐宋以后中国历史，但高强度徭役、辽东战争和宫室工程造成隋末人口与财政危机。',
    impactSummary: '隋炀帝不能只归结为“暴君”，其工程和制度有长期历史价值；也不能以大运河收益掩盖民夫负担、战争失败和国家动员失控。',
    disputeTabs: [{ title: '国家建设视角', body: '运河连接南北粮运，东都和科举推动行政、文化与经济整合，工程对唐宋国家具有长期价值。' }, { title: '高压动员视角', body: '三征高句丽、巡游和宫室工程消耗人口与财政，地方起义和军队离心使隋朝迅速崩解。' }],
    resume: [
      { timeText: '604-610年', periodLabel: '即位与国家工程', title: '隋炀帝 / 统一帝国建设者', nominalDuty: '统筹全国行政、财政、运河、都城、科举和边疆。', authorityScope: '全国州县、工程民夫、漕运、官僚、军队和东都洛阳，权力高度集中。', actualInfluence: '开凿大运河、营建东都并推动科举和南北巡行。', modernEquivalent: '国家元首兼大型基础设施、教育和行政整合最高决策者。', impact: '隋朝国家联系和资源调度显著增强。' },
      { timeText: '611-618年', periodLabel: '征高句丽与隋末起义', title: '隋炀帝 / 战时国家最高统帅', nominalDuty: '组织辽东战争、军粮、征兵和地方治安。', authorityScope: '全国军队、征发民夫、粮运、关隘和地方官，实际执行因距离和腐败失控。', actualInfluence: '多次征高句丽失败，面对大规模起义和军队叛变，最终在江都被宇文化及所杀。', modernEquivalent: '国家元首兼最高战争动员者。', impact: '隋朝灭亡，唐朝及群雄继承其统一制度和交通基础。' }
    ]
  } },
  { id: 'tang-xuanzong', merge: {
    background: '唐玄宗李隆基统治前期形成开元盛世，后期因边镇节度使、宰相、宫廷和财政问题积累，安禄山叛乱导致唐由盛转衰。',
    childhood: '出身武周复唐后的皇族，参与唐隆政变和先天政变，成长于中宗、韦后、太平公主等宫廷斗争环境，熟悉皇权与军队。',
    personality: '前期勤政、善用姚崇宋璟并有文化成就，后期沉溺宫廷、信任近臣和边将，决策从整顿转向享乐与信息封闭。',
    policyInclination: '前期整顿吏治、财政和边疆，支持开元文化；后期扩大节度使军权、依赖杨国忠和宫廷资源，对边镇风险控制不足。',
    socialContribution: '推动盛唐城市、诗歌、音乐、制度和国际交流，后期安史之乱又重塑藩镇、宦官、财政与中央地方关系。',
    impactSummary: '唐玄宗不是“前明后昏”的简单故事，开元治理成果和天宝制度风险连续发生。安史之乱由边镇、军政、财政和宫廷多重因素共同造成。',
    disputeTabs: [{ title: '开元盛世视角', body: '玄宗任用姚崇、宋璟等整顿吏治和财政，推动文化、城市与边疆发展，形成盛唐高峰。' }, { title: '安史转折视角', body: '节度使坐大、杨国忠与安禄山冲突、宫廷信息失真和军队结构变化使中央对危机失去控制。' }],
    resume: [
      { timeText: '712-741年', periodLabel: '开元时期', title: '唐玄宗 / 盛唐国家建设者', nominalDuty: '统筹官僚、财政、军队、边疆、文化和外交。', authorityScope: '全国三省六部、节度使、户籍赋役、宫廷和国际朝贡，依靠宰相与地方官执行。', actualInfluence: '任用姚崇、宋璟等整顿政治，推动开元盛世和边疆扩张。', modernEquivalent: '国家元首兼最高行政、国防和文化政策决策者。', impact: '唐朝国力、城市和文化达到高峰。' },
      { timeText: '742-756年', periodLabel: '天宝与安史之乱', title: '唐玄宗 / 危机中的最高统治者', nominalDuty: '处理边镇、财政、宫廷、人事和叛乱应对。', authorityScope: '中央官署、节度使、禁军、军粮和地方行政，但信息与军队控制逐步下降。', actualInfluence: '依赖杨国忠、安禄山等关系，叛乱后入蜀并在马嵬失去政治主动。', modernEquivalent: '国家元首兼最高国防决策者，但危机时实际控制受军队与继承政治制约。', impact: '唐朝由盛转衰，中央地方关系长期改变。' }
    ]
  } },
  { id: 'zhu-wen', merge: {
    background: '朱温是唐末宣武军节度使、黄巢叛军降将和后梁开国皇帝，控制汴州、挟持昭宗并于907年代唐，后被儿子朱友珪杀死。',
    childhood: '出身宋州砀山贫寒家庭，早年参加黄巢起义，后向唐廷投降，凭军队、粮道和汴州地缘建立独立军镇。',
    personality: '善于抓住乱局、用兵和政治交易，权力集中且猜忌残酷；其军事组织能力与对官僚、宦官和宗室的暴力并存。',
    policyInclination: '以控制中原交通、粮运和禁军为目标，利用唐廷名义、地方节度使和宫廷废立逐步夺取皇权。',
    socialContribution: '终结唐朝并建立后梁，推动五代十国政治格局形成；其军镇个人化、宫廷屠杀和财政掠夺也加剧社会破坏。',
    impactSummary: '朱温不是单纯“篡唐奸臣”，他代表唐末藩镇和军人政治的制度现实。代唐成功但无法建立稳定继承和多区域秩序，后梁很快陷入战争。',
    resume: [
      { timeText: '878-901年', periodLabel: '黄巢起义与宣武军', title: '叛军将领、宣武节度使 / 中原军镇首领', nominalDuty: '统率军队、镇压叛乱、控制州郡和维护汴州粮运。', authorityScope: '宣武军、汴州、运河交通、州县赋税和唐廷授予的节度使辖区。', actualInfluence: '降唐后击败黄巢、扩张军镇并成为唐末最强藩镇之一。', modernEquivalent: '职能近似区域军政长官兼独立军镇领袖。', impact: '唐中央对中原军政的控制进一步瓦解。' },
      { timeText: '901-912年', periodLabel: '挟唐与后梁建国', title: '梁王、后梁太祖 / 代唐开国君主', nominalDuty: '统筹宫廷、禁军、地方节度使、财政和中原战争。', authorityScope: '汴梁中央、黄河中下游、宫廷人事、州县赋税与对晋战争，实际依赖军镇。', actualInfluence: '控制唐昭宗、迁都洛阳并接受禅让，建立后梁；后被朱友珪杀害。', modernEquivalent: '国家元首兼军阀型最高统治者。', impact: '唐亡五代开始，中原长期分裂。' }
    ]
  } },
  { id: 'li-cunxu', merge: {
    background: '李存勖是后唐庄宗、沙陀军事领袖和五代君主，继承李克用势力，灭后梁并一度统一中原，后因军费、将领和宫廷失控在兴教门之变中死亡。',
    childhood: '出身沙陀李克用军镇家庭，少年随父征战，熟悉晋国军队、北方边疆和契丹关系，长期以复仇和灭梁为政治目标。',
    personality: '勇猛、善于亲临战场和利用军队声望，兼有戏曲表演与文化兴趣；建国后沉溺伶人、赏赐和宫廷，行政能力与军人忠诚脱节。',
    policyInclination: '前期以整合沙陀、汉地军镇和复仇灭梁为目标，后期试图继承唐制并控制地方，但对军费、财政和功臣安置失衡。',
    socialContribution: '灭后梁、建立后唐并短暂恢复中原统一，沙陀与汉地政治融合加深；其失败成为五代军人君主治理困境的典型。',
    impactSummary: '李存勖的盛衰在五代史中极具代表性：战争能力可以夺取天下，却不能自动建立财政、官僚和继承秩序。伶人误国只是象征，不是全部原因。',
    resume: [
      { timeText: '908-923年', periodLabel: '晋王与灭后梁', title: '晋王、河东节度使 / 沙陀军政领袖', nominalDuty: '统率河东军、处理边疆、联盟、军粮和对后梁战争。', authorityScope: '河东、河北部分州郡、沙陀军队、粮道和契丹外交，依赖军镇和部将。', actualInfluence: '继承李克用势力，击败刘仁恭、梁军并攻入汴梁。', modernEquivalent: '职能近似区域军政首领兼战区总司令。', impact: '后梁灭亡，后唐成为五代最强中原政权。' },
      { timeText: '923-926年', periodLabel: '后唐建国与兴教门之变', title: '后唐庄宗 / 中原王朝统治者', nominalDuty: '统辖中央官僚、地方节度使、财政、军队和唐制礼仪。', authorityScope: '后唐中原州郡、禁军、节度使、宫廷和税粮，实际仍受军人集团制约。', actualInfluence: '建立后唐并恢复部分唐代官制，后期因军饷、赏赐、伶人和将领不满而被杀。', modernEquivalent: '国家元首兼最高军事统帅。', impact: '后唐由统一希望转入军镇叛乱，五代更替继续。' }
    ]
  } },
  { id: 'shi-jingtang', merge: {
    background: '石敬瑭是后唐河东节度使、后晋开国皇帝，借契丹军队灭后唐并割让燕云十六州、称契丹辽帝为父，后世评价长期负面。',
    childhood: '出身沙陀军事集团，早年在后唐军中成长，娶李克用后代为妻并掌握河东，熟悉五代军镇和契丹边疆政治。',
    personality: '善于隐忍、结盟和利用对手矛盾，政治上重视个人皇位胜过中原领土与名分，受契丹军力和晋国将领制约。',
    policyInclination: '以借外力夺取皇位、维持河东军镇和后晋政权为优先，向辽称臣纳贡并割地，试图换取边境安全和统治合法性。',
    socialContribution: '建立后晋、推动五代与辽关系重组，燕云十六州长期成为宋辽、宋金边界和北方安全问题，影响数百年。',
    impactSummary: '石敬瑭“儿皇帝”称号来自后世批判，但割让燕云的原因还包括后唐内斗、河东军镇、辽国扩张和五代政权脆弱。',
    disputeTabs: [{ title: '政治交易视角', body: '石敬瑭借契丹军队取得皇位，向辽称臣并割让燕云，短期建立后晋但牺牲北方战略纵深。' }, { title: '五代军镇视角', body: '后唐内部继承和将领关系已经使中原政权不稳，契丹介入并非单一叛徒行为，而是边疆军事和国内权力共同作用。' }],
    resume: [
      { timeText: '923-936年', periodLabel: '后唐河东节度使', title: '河东节度使 / 中原军镇首领', nominalDuty: '负责河东军政、边防、州县和对后唐中央关系。', authorityScope: '河东军队、太原、边境粮道和地方官吏，实际拥有较强军镇自主权。', actualInfluence: '利用后唐末期继承冲突与契丹联络，准备夺取中原皇位。', modernEquivalent: '职能近似边疆军政长官兼地方军事集团首领。', impact: '契丹成为五代政权继承竞争的关键外部力量。' },
      { timeText: '936-942年', periodLabel: '后晋建国与燕云割让', title: '后晋高祖 / 辽援立国的君主', nominalDuty: '统辖后晋中央、地方节度使、财政和对辽外交。', authorityScope: '后晋中原州郡、河东、军队和燕云名义辖区，实际受辽军与地方将领制约。', actualInfluence: '借辽灭后唐，割让燕云十六州并称臣纳贡，后期难以控制国内军镇。', modernEquivalent: '国家元首兼依赖外援的军政统治者。', impact: '燕云问题成为北宋北方安全和宋辽战争的长期根源。' }
    ]
  } },
  { id: 'chai-rong', merge: {
    background: '柴荣是后周世宗，继承郭威政权后整顿禁军、财政、漕运和地方，南征后蜀、南唐并准备北伐契丹，英年早逝。',
    childhood: '出身郭威妻族或养子关系，早年参与后周军政，受五代军镇、北方边防和中原统一竞争影响，具备实际行军经验。',
    personality: '勤政、果断、重视改革和亲临战场，能够听取建议并推进工程；早逝使其统一计划和继承安排未完成。',
    policyInclination: '主张削弱藩镇、整顿禁军、恢复户籍财政、疏浚漕运和扩大中央直辖，以战争与行政建设共同实现统一。',
    socialContribution: '后周时期的财政、军队、寺院整顿和南方战争为北宋统一奠定基础，柴荣是五代最具国家建设能力的君主之一。',
    impactSummary: '柴荣的价值不只是“英主”形象，他把军镇政治转向中央国家的努力具体体现在军籍、漕运、土地和战区治理上。',
    resume: [
      { timeText: '951-954年', periodLabel: '后周建立与中原整顿', title: '后周皇帝 / 军政财政改革者', nominalDuty: '统筹中央官制、禁军、财政、寺院土地和地方节度使。', authorityScope: '后周中央、禁军、州县户籍、漕运和军镇，依赖王朴、郭荣等臣属执行。', actualInfluence: '整顿军籍、裁军、限制寺院兼并并恢复财政与漕运。', modernEquivalent: '国家元首兼军队、财政和组织改革最高负责人。', impact: '后周国家动员能力超过多数五代政权。' },
      { timeText: '954-959年', periodLabel: '南征与北伐准备', title: '后周世宗 / 统一战争统帅', nominalDuty: '统率对北汉、后蜀、南唐和契丹战争，处理占领区行政。', authorityScope: '后周野战军、漕运、战区州县、降附将领和边防工程。', actualInfluence: '高平击败北汉契丹、南征夺取淮南并准备北伐，临终前病逝。', modernEquivalent: '国家元首兼最高军事统帅和战后重建负责人。', impact: '北宋继承其军队和统一路线，五代结束进入宋代。' }
    ]
  } },
  { id: 'li-yu', merge: {
    background: '李煜是南唐末代君主和词人，前期处在江南相对稳定的文化宫廷，后期面对北宋进攻、金陵陷落和被俘，词作形成亡国书写。',
    childhood: '出身南唐皇族，接受宫廷文学、音乐、书画和礼制教育，原本不是最优先继承人，李璟去世后被迫承担国家统治。',
    personality: '敏感、重艺术和情感，政治与军事决断能力弱于赵匡胤、赵光义等北宋统治者；后世词作中的哀感不能完全等同于在位政策。',
    policyInclination: '倾向维护江南文人、宫廷文化和地方秩序，面对北宋要求时以纳贡、称臣和外交求存，未能建立足以抵抗北宋的军政体系。',
    socialContribution: '南唐文化、词体和宫廷艺术在其时期达到重要传播，亡国后词作推动婉约词、亡国文学和个人情感表达发展。',
    impactSummary: '李煜兼具君主和文学家身份，不能用词人的哀伤掩盖南唐政治软弱，也不能只用亡国君评价其艺术贡献。',
    resume: [
      { timeText: '961-975年', periodLabel: '南唐后期', title: '南唐后主 / 江南政权统治者', nominalDuty: '统辖江南行政、财政、军队、外交和宫廷文化。', authorityScope: '金陵中央、江南州县、军队、漕运和对北宋外交，军政资源明显弱于北宋。', actualInfluence: '维持江南文化与地方秩序，向北宋纳贡称臣以求保存政权。', modernEquivalent: '国家元首兼地方政权最高行政者。', impact: '南唐在北宋统一压力下失去独立空间。' },
      { timeText: '975-978年', periodLabel: '南唐灭亡与北宋囚居', title: '亡国君 / 被俘文学家', nominalDuty: '投降后不再拥有行政权，受北宋宫廷监控。', authorityScope: '无国家辖区，影响集中在词作、书画和后世文学记忆。', actualInfluence: '金陵陷落后被押往汴京，创作大量亡国与个人哀感词作，后被宋太宗处死。', modernEquivalent: '不对应现代职位。', impact: '南唐结束，李煜成为中国亡国文学和词史核心人物。' }
    ]
  } },
  { id: 'song-taizu', merge: {
    background: '宋太祖赵匡胤是北宋开国皇帝，凭后周禁军和陈桥兵变受禅，随后收回武将兵权、改革禁军并逐步统一南方。',
    childhood: '出身涿郡或洛阳军人家庭，父赵弘殷为后唐、后晋、后汉和后周将领，赵匡胤在五代军队和宫廷环境中成长。',
    personality: '善于用人、重视制度和权力平衡，能够以封赏、宴谈和文官安排降低功臣威胁；统一战争和对辽策略也有谨慎与限制。',
    policyInclination: '主张皇帝直接控制禁军、分割军政权、任用文官和稳定财政，以避免五代兵变循环，同时逐步完成南方统一。',
    socialContribution: '建立北宋、结束五代军人频繁篡位局面，推动中央集权、文官政治和统一市场发展，奠定宋代制度特色。',
    impactSummary: '宋太祖的政治选择带来长期稳定，也造成武将权力分散和宋代军事指挥问题。北宋国家并非单纯“重文弱武”，而是安全与战力之间的制度权衡。',
    resume: [
      { timeText: '951-960年', periodLabel: '后周禁军与陈桥兵变', title: '殿前都点检 / 禁军最高将领', nominalDuty: '统率京师禁军、宫廷警卫和对外作战。', authorityScope: '殿前司禁军、京师防务、军粮和将领关系，名义受后周皇帝与枢密院管理。', actualInfluence: '在高平、后周边战中建立军威，陈桥兵变后受禅建立宋朝。', modernEquivalent: '职能近似首都卫戍和中央军队最高指挥官。', impact: '五代军人拥立传统转化为北宋开国。' },
      { timeText: '960-976年', periodLabel: '北宋建国与中央集权', title: '宋太祖 / 王朝制度建设者', nominalDuty: '统筹中央官僚、禁军、财政、地方节度使和统一战争。', authorityScope: '中书门下、枢密院、三衙、州县官员、禁军和南方战区。', actualInfluence: '杯酒释兵权、削弱节度使、设转运使并平定南方割据，为宋太宗继续统一铺路。', modernEquivalent: '国家元首兼最高行政、国防和组织改革决策者。', impact: '北宋中央集权与文官国家框架基本确立。' }
    ]
  } },
  { id: 'yelv-abaoji', merge: {
    background: '耶律阿保机是契丹部落联盟首领和辽朝开国皇帝，通过统一契丹诸部、建立南北面官和吸收汉地制度，把草原联盟转为多族群王朝。',
    childhood: '出身契丹迭剌部贵族，成长于部落联盟、草原战争和与中原五代政权交往环境，熟悉牧业、军队、婚姻和部落政治。',
    personality: '有组织能力和扩张野心，重视制度、文字和城市，能够利用汉人文臣与契丹传统；统一过程中对反对部落采取强力压制。',
    policyInclination: '以部落军事整合、南北双轨官制、城郭农业和文字制度并用，既维护契丹贵族，又吸收汉地行政和农业资源。',
    socialContribution: '建立辽朝、创制契丹大字、发展上京和草原—农耕双重治理，对宋辽关系、东北亚族群和北方国家形态影响深远。',
    impactSummary: '耶律阿保机不是单纯草原征服者，他把契丹部落、汉地州县、城市和文字结合为辽帝国。辽的双轨制度体现多族群统治的现实选择。',
    resume: [
      { timeText: '约901-916年', periodLabel: '契丹部落统一', title: '契丹部落联盟长 / 军事首领', nominalDuty: '统率部落、调配牧地、处理婚盟、战争和对中原贸易。', authorityScope: '契丹诸部、骑兵、牧地、俘获人口和联盟议事，权力依赖部落贵族。', actualInfluence: '逐步击败竞争部落并建立可继承的军事和资源分配体系。', modernEquivalent: '职能近似草原政治军事联盟最高领袖。', impact: '契丹由松散部落联盟转向集中政权。' },
      { timeText: '916-926年', periodLabel: '辽朝建国', title: '辽太祖 / 多族群王朝开国者', nominalDuty: '统辖契丹、汉地、军队、城市、文字和对外战争。', authorityScope: '辽上京、契丹部落、南面汉地、骑兵和农业州县，后由南北面官分工治理。', actualInfluence: '建立辽朝、创制契丹文字并经营幽燕和东北亚地区。', modernEquivalent: '国家元首兼草原与农耕双轨国家创建者。', impact: '辽成为宋、契丹和东北亚长期政治力量。' }
    ]
  } },
  { id: 'hong-taiji', merge: {
    background: '皇太极是后金第二代大汗和清朝奠基者，整合满洲、蒙古、汉军力量，改国号为清，建立六部、八旗和对明战争体系。',
    childhood: '出身努尔哈赤第八子，成长于女真统一、八旗战争和明末辽东环境，熟悉宗室竞争、汉地城镇和蒙古联盟。',
    personality: '善于制度改革、吸收人才和处理族群关系，政治上重视皇权与多族群整合；对明战争和内部权力保持高压控制。',
    policyInclination: '从单纯女真部落政权转向满洲、蒙古、汉军和汉地官僚共同治理，推行文书、六部、科举、旗制和对明军事动员。',
    socialContribution: '把后金转化为清朝前身，改国号、建制度、整合蒙古和汉军，为1644年入关和多民族帝国形成奠定基础。',
    impactSummary: '皇太极的贡献不只是“清太宗”称号，而是将征服集团转化为具有官僚、财政、文字和多族群治理能力的国家。',
    resume: [
      { timeText: '1626-1635年', periodLabel: '后金改革与对明战争', title: '后金大汗 / 八旗与汉地治理改革者', nominalDuty: '统筹八旗、军队、俘降、粮道、官署和明朝边境战争。', authorityScope: '满洲八旗、蒙古盟友、汉军、辽东城镇和后金财政，实际受宗室议政影响。', actualInfluence: '整顿八旗、吸收汉人文官和降将，建立较稳定的中央文书与行政。', modernEquivalent: '国家元首兼军政制度改革与边疆统合负责人。', impact: '后金国家能力显著超过部落联盟阶段。' },
      { timeText: '1636-1643年', periodLabel: '清朝建国准备', title: '清太宗 / 多族群帝国奠基者', nominalDuty: '统辖满洲、蒙古、汉军和汉地占领区，主持改国号、官制与对明战争。', authorityScope: '清中央六部、八旗、蒙古诸部、汉军、辽东和长城边防。', actualInfluence: '改国号清、建立文官与科举体系、征服朝鲜并持续压迫明朝北方防线。', modernEquivalent: '国家元首兼多民族国家制度创建者。', impact: '清军入关前的国家形态和合法性基本形成。' }
    ]
  } },
  { id: 'shunzhi-emperor', merge: {
    background: '顺治帝福临是清军入关后的第一位皇帝，在多尔衮摄政下进入北京，亲政后处理南明、地方行政、汉官任用和满汉关系。',
    childhood: '幼年即位，成长于清军入关、北京建都、摄政王权和南明战争环境，接受满洲、汉文和帝王教育。',
    personality: '早年受摄政约束，亲政后重视汉官、佛教和个人情感，政治判断在满洲传统、汉地治理和皇权集中之间摇摆。',
    policyInclination: '延续八旗和满洲特权，同时采用汉地六部、科举、州县和礼制，推进剃发易服等强制政策以建立清朝统治。',
    socialContribution: '完成清朝入关初期行政重建、南明战争和科举恢复，为康熙时期中央集权和多民族统治打基础。',
    impactSummary: '顺治时期既有暴力征服和剃发令，也有汉地官僚与文化制度的吸收。清朝稳定不是单靠军事胜利，而是制度、旗制和地方合作共同形成。',
    resume: [
      { timeText: '1643-1650年', periodLabel: '入关与多尔衮摄政', title: '清世祖 / 幼年皇帝', nominalDuty: '名义统辖清廷、八旗、北京和对南明战争。', authorityScope: '皇帝诏令、宫廷礼制和名义国家权力，实际决策由多尔衮摄政与八旗贵族掌握。', actualInfluence: '随清军进入北京，清廷推行剃发、圈地和地方行政重建。', modernEquivalent: '国家元首的名义权力，实际处于摄政制度之下。', impact: '清朝首都和中央官僚体系在北京展开。' },
      { timeText: '1651-1661年', periodLabel: '亲政与南明战争', title: '顺治帝 / 入关初期国家整合者', nominalDuty: '处理中央官员、科举、地方治理、八旗和南明战争。', authorityScope: '清中央六部、地方督抚、八旗、绿营、科举与宫廷，实际受满洲贵族与战争限制。', actualInfluence: '清算多尔衮、恢复科举和汉官体系，推动南方征服与清朝统治合法化。', modernEquivalent: '国家元首兼最高行政与国防决策者。', impact: '康熙即位时清朝全国统治框架基本形成。' }
    ]
  } },
  { id: 'qianlong-emperor', merge: {
    background: '乾隆帝弘历是清朝在位时间很长的皇帝，前期扩张新疆、平定准噶尔和经营西藏，后期大兴文字狱、奢侈和依赖和珅，清朝由盛转衰的结构问题显现。',
    childhood: '出身雍正帝第四子，接受满洲骑射、汉文经史和帝王教育，成长于雍正整顿后的中央行政体系。',
    personality: '勤于巡视、好文学和自我纪功，善于多族群政治与军事统筹；晚年自满、重宫廷和近臣，社会财政压力增加。',
    policyInclination: '主张维护皇权、八旗和多民族帝国，扩张西北与西南边疆，编纂大型文献并控制思想；后期对财政与官僚腐败反应不足。',
    socialContribution: '完成清代疆域扩张高峰，推动《四库全书》、宫廷艺术和多族群行政，同时文字狱、白莲教前兆、人口与财政压力成为后续危机。',
    impactSummary: '乾隆时代不能只称“盛世”。疆域、人口、文化工程和商业繁荣与思想控制、军费、腐败和财政结构失衡同时存在。',
    disputeTabs: [{ title: '盛世与帝国视角', body: '乾隆前期完成准噶尔、回部等地征服，维护西藏和蒙古关系，清朝多民族帝国版图与行政达到高峰。' }, { title: '晚年转折视角', body: '十全武功、六下江南、四库禁毁、和珅专权与财政压力显示繁荣背后的制度成本，嘉庆时期危机由此累积。' }],
    resume: [
      { timeText: '1735-1760年', periodLabel: '乾隆前期扩张', title: '清高宗 / 帝国扩张最高决策者', nominalDuty: '统筹军政、财政、官员、边疆、宗教和文化工程。', authorityScope: '全国中央与地方、八旗绿营、理藩院、边疆军队和朝贡外交。', actualInfluence: '平定准噶尔与回部、经营西藏蒙古，强化多区域帝国行政。', modernEquivalent: '国家元首兼最高行政、国防和外交决策者。', impact: '清朝疆域和帝国治理达到高峰。' },
      { timeText: '1760-1795年', periodLabel: '文化工程与晚年危机', title: '清高宗 / 晚期皇权与文化控制者', nominalDuty: '管理官僚、财政、文化典籍、地方治安和边疆军务。', authorityScope: '军机处、六部、地方督抚、内务府、四库馆和边疆军政。', actualInfluence: '推动四库全书与宫廷文化，扩大文字审查，依赖和珅处理政务，晚年财政与官僚问题加深。', modernEquivalent: '国家元首兼文化与行政最高决策者。', impact: '清朝由高峰进入结构性衰退前夜。' }
    ]
  } },
  { id: 'king-helu-wu', merge: {
    background: '阖闾是春秋末吴国君主，依靠伍子胥、孙武等人整顿军政、修筑姑苏城并击败楚国，推动吴国成为长江流域强国。',
    childhood: '出身吴王室，早年参与王位竞争和宫廷冲突，继位后面对楚国压力、吴国内部贵族和越国边患。',
    personality: '善于任用外来人才、重视军队和工程，具有扩张野心；对王位和复仇问题态度强硬，战争与宫廷冲突代价高。',
    policyInclination: '以训练军队、修筑城防、发展水军和联合晋国为重点，先解决楚国威胁，再争夺中原和长江流域霸权。',
    socialContribution: '推动吴国军事国家化、姑苏城市建设和攻楚战争，吴国崛起改变春秋末年诸侯力量。',
    impactSummary: '阖闾的成功依靠伍子胥、孙武、吴国水陆条件和楚国政治问题，不能只归因于名将或单次郢都攻陷。',
    resume: [
      { timeText: '前515-前506年', periodLabel: '吴王即位与军政改革', title: '吴王 / 吴国强国建设者', nominalDuty: '统辖王室、军队、水军、城防和外交。', authorityScope: '吴国郡邑、军队、长江水网、工程和对楚联盟，依靠伍子胥、孙武等臣。', actualInfluence: '任用外来人才、建设姑苏并整训军队，准备攻楚。', modernEquivalent: '国家元首兼军事与城市建设最高决策者。', impact: '吴国由地方诸侯转为春秋强国。' },
      { timeText: '前506年', periodLabel: '柏举之战与入郢', title: '吴王 / 伐楚战争最高统帅', nominalDuty: '统率吴军、水军、粮道并处理战后楚地关系。', authorityScope: '吴国远征军、长江水运和楚国战区，实际依靠孙武、伍子胥指挥。', actualInfluence: '吴军击败楚军并攻入郢都，楚昭王出逃。', modernEquivalent: '职能近似国家元首兼远征军最高统帅。', impact: '楚国霸权受创，吴楚越争霸进入新阶段。' }
    ]
  } },
  { id: 'fuchai', merge: {
    background: '夫差是吴国末代强势君主，继承阖闾遗志击败越国，后北上争霸、修邗沟并忽视越王勾践复国，最终吴国灭亡。',
    childhood: '出身吴王室，父阖闾在伐越战争中受伤而死，夫差以复仇和继承王位为政治起点，成长于吴国军功扩张环境。',
    personality: '勇猛、重荣誉和争霸声望，能够采纳军事行动但不善于长期战略与内部治理；后期拒绝伍子胥警告，受北上称霸和宫廷影响。',
    policyInclination: '前期重视灭越和军队扩张，后期转向北上会盟、争夺中原和对外展示国威，牺牲对越监控和国内资源恢复。',
    socialContribution: '推动吴国达到疆域和军力高峰、开凿邗沟连接江淮；吴亡则成为争霸过度、忽视后方和君臣失衡的政治警示。',
    impactSummary: '夫差不是只因西施而亡国。越国复兴、吴国长期战争、粮道、诸侯争霸和伍子胥政治冲突共同导致吴国崩溃。',
    disputeTabs: [{ title: '吴国强盛视角', body: '夫差击败越国、北上伐齐并参与黄池会盟，说明吴国一度具备挑战中原霸主的军力和交通条件。' }, { title: '吴亡与后方视角', body: '放松对越国控制、长期北上争霸和拒绝伍子胥建议，使吴国军粮、民力和政治联盟逐渐透支。' }],
    resume: [
      { timeText: '前496-前482年', periodLabel: '复仇伐越与吴国扩张', title: '吴王 / 军事扩张君主', nominalDuty: '统辖吴军、水军、城防、越国战区和江淮交通。', authorityScope: '吴国军队、太湖水网、越地俘降和军粮，依靠伍子胥、伯嚭等臣。', actualInfluence: '击败勾践并迫使越国求和，修邗沟、北上争夺诸侯地位。', modernEquivalent: '国家元首兼最高军事和水利交通决策者。', impact: '吴国军事实力达到高峰。' },
      { timeText: '前482-前473年', periodLabel: '黄池会盟与吴亡', title: '吴王 / 争霸失败的末代君主', nominalDuty: '处理诸侯外交、北方战争、越国防务和国内军政。', authorityScope: '吴国地方、远征军、越国边防和江淮粮道，实际控制受长期战争影响。', actualInfluence: '在黄池会盟争夺霸主时后方被越王勾践反攻，最终姑苏失守、吴国灭亡。', modernEquivalent: '国家元首兼战时最高统帅。', impact: '吴越争霸结束，越国成为春秋末强国。' }
    ]
  } },
  { id: 'king-wei-qi', merge: {
    background: '齐威王是战国齐国君主，任用邹忌、孙膑等人，整顿吏治、重视纳谏并在桂陵、马陵后提升齐国军政地位。',
    childhood: '出身田齐王室，继承时齐国需要恢复威望和行政秩序，早年王室教育、贵族关系和政治惰性细节主要依靠后世记载。',
    personality: '能听取批评、重视实际政绩和人才任用，善于从失败中改进；纳谏故事有文学化成分，但齐国改革和军事实力提升有历史背景。',
    policyInclination: '主张考核地方官、奖励进谏、任用军事和政治人才、恢复齐国财政与军队，以中央王权整合临淄和地方。',
    socialContribution: '推动齐国政治整顿、稷下学宫和军事崛起，齐国成为战国文化与争霸中心，纳谏形象影响后世君主教育。',
    impactSummary: '齐威王的“烹阿大夫”和纳谏故事是政治寓言与历史记忆结合，实际改革还依赖田齐王室、地方官吏、军队和人才网络。',
    resume: [
      { timeText: '约前356-前343年', periodLabel: '齐国政治整顿', title: '齐王 / 官吏考核与纳谏推动者', nominalDuty: '统筹齐国财政、官员、祭祀、军队和诸侯外交。', authorityScope: '临淄中央、地方官吏、齐国粮税和军队，依赖邹忌等臣执行。', actualInfluence: '整顿阿、即墨等地方官吏，建立以政绩和批评反馈为基础的君主治理形象。', modernEquivalent: '国家元首兼地方行政考核与人才任用最高决策者。', impact: '齐国行政与财政动员能力恢复。' },
      { timeText: '前354-前342年', periodLabel: '桂陵、马陵与稷下', title: '齐王 / 军政文化强国建设者', nominalDuty: '统率或授权军队、处理魏国战争和学术人才。', authorityScope: '齐军、诸侯外交、临淄稷下学宫和地方官员，军政由田忌、孙膑等执行。', actualInfluence: '支持孙膑对魏作战，推动齐国在文化和军事上成为东方强国。', modernEquivalent: '国家元首兼国防、教育和文化政策决策者。', impact: '齐国在魏国衰落后取得战国争霸主动权。' }
    ]
  } },
  { id: 'king-hui-wei', merge: {
    background: '魏惠王是战国魏国君主，迁都大梁、与诸侯会盟并任用庞涓等将领，但在桂陵、马陵失败后魏国霸权衰落，齐秦竞争上升。',
    childhood: '出身魏王室，继承魏文侯、武侯改革后的强国，但面临秦、齐、赵、韩等邻国竞争，宫廷与将领关系影响其决策。',
    personality: '有恢复霸权的 ambition、重视战争和会盟，但对齐国谋略、人才竞争和改革方向判断不足；晚年在外交压力下多次调整路线。',
    policyInclination: '以控制河东、河内和中原交通、任用武将、修筑都城和参与诸侯会盟为重点，未能持续维持李悝、吴起时期的制度优势。',
    socialContribution: '代表战国早期强国由改革红利走向争霸消耗的过程，魏国败退推动齐、秦两国成为新竞争中心。',
    impactSummary: '魏惠王并非没有治理能力，魏国衰落与诸侯竞争、军队战术、人才流失和国土位置有关；梁惠王问孟子故事也有后世政治教育加工。',
    resume: [
      { timeText: '前369-前354年', periodLabel: '大梁迁都与魏国调整', title: '魏王 / 中原强国统治者', nominalDuty: '统筹魏国州郡、财政、军队、都城和诸侯外交。', authorityScope: '魏国河东、河内、大梁及地方官吏、军队和粮运。', actualInfluence: '迁都大梁、经营中原并继续使用变法和军政遗产。', modernEquivalent: '国家元首兼区域行政、国防和城市建设决策者。', impact: '魏国保持战国早期强国地位但战略纵深受限。' },
      { timeText: '前354-前319年', periodLabel: '桂陵、马陵与霸权衰落', title: '魏王 / 齐秦竞争中的中原君主', nominalDuty: '统率魏军、任用庞涓等将领并处理齐秦外交。', authorityScope: '魏军、河内粮道、地方城邑和诸侯会盟，实际受战区将领与贵族政治影响。', actualInfluence: '对赵、齐作战失败，魏国损失霸权并在秦国压力下不断调整外交。', modernEquivalent: '国家元首兼战时联盟与军事决策者。', impact: '魏国从霸主退居诸侯，战国力量中心转向齐、秦。' }
    ]
  } },
  { id: 'cao-pi', merge: {
    background: '曹丕是曹魏开国皇帝，继承曹操北方基业，220年接受汉献帝禅让，推行九品中正制并与孙吴、蜀汉争夺合法性。',
    childhood: '出身曹操军政集团，接受文学、骑射和宫廷竞争教育，与曹植争夺继承。长期参与北方军政和邺城文人圈。',
    personality: '重权力、善文学和政治组织，能处理禅让与官僚制度；对宗室和兄弟防范严格，继承与地方关系留下魏晋士族问题。',
    policyInclination: '以曹魏皇权、中央官僚和九品中正选官巩固代汉合法性，限制宗室兵权并与孙吴、蜀汉争夺汉统与北方资源。',
    socialContribution: '建立曹魏、确立三国鼎立名分和九品中正制，推动建安文学与魏晋文人政治；制度也为门阀士族发展提供入口。',
    impactSummary: '曹丕代汉既有军政强制也有禅让礼制包装，九品中正制兼具选官与士族固化作用，不能只用篡汉或文才评价。',
    resume: [
      { timeText: '211-220年', periodLabel: '魏王太子与代汉准备', title: '五官中郎将、魏王太子 / 北方继承人', nominalDuty: '参与北方军政、文书、官员与继承事务。', authorityScope: '邺城宫廷、太子府、文人网络和部分军政建议，受曹操最终决策制约。', actualInfluence: '在曹植竞争中取得太子地位，准备魏王受禅和中央官僚。', modernEquivalent: '职能近似国家继承人兼中央政府常务协调者。', impact: '曹魏继承和代汉程序进入稳定轨道。' },
      { timeText: '220-226年', periodLabel: '曹魏建国与三国形成', title: '魏文帝 / 北方国家统治者', nominalDuty: '统辖中央官僚、军队、财政、礼制和对蜀吴外交。', authorityScope: '曹魏中央、九品中正、州郡、军镇和汉献帝禅让后的皇权。', actualInfluence: '接受禅让建立魏，推进九品中正、对吴战争和洛阳政治重建。', modernEquivalent: '国家元首兼最高行政、国防和人事决策者。', impact: '三国鼎立的政权名分正式确立。' }
    ]
  } },
  { id: 'song-zhenzong', merge: {
    background: '宋真宗赵恒是北宋第三位皇帝，经历澶渊之战和澶渊之盟、封禅与天书运动，前期能处理辽宋关系，后期迷信和宫廷活动增加财政负担。',
    childhood: '出身宋太宗皇子，接受文官、礼制和军事教育，继承时面对北宋对辽防线、太子继承和文官政治。',
    personality: '谨慎、重视皇权礼仪和政治稳定，能在寇准推动下亲征；后期依赖王钦若等人制造天书祥瑞，决策受宫廷信仰影响。',
    policyInclination: '主张维持北宋财政与文官秩序，在对辽战争中寻求议和，同时利用封禅、天书和祥瑞强化皇权合法性。',
    socialContribution: '澶渊之盟带来宋辽长期和平和贸易，北宋文化、科举与城市经济继续发展；天书封禅则成为财政和政治象征负担。',
    impactSummary: '宋真宗时代既有外交稳定，也有祥瑞政治和宫廷浪费。澶渊之盟不是屈辱或胜利的单一标签，而是军事、财政与国内稳定的妥协。',
    resume: [
      { timeText: '997-1004年', periodLabel: '继位与宋辽边防', title: '宋真宗 / 北宋行政与边防统治者', nominalDuty: '统筹文官、财政、禁军、边防和对辽外交。', authorityScope: '中书门下、枢密院、地方州军和北部边防，依靠寇准等重臣执行。', actualInfluence: '延续太宗时期文官集权和对辽防备，面对辽军南下作出亲征准备。', modernEquivalent: '国家元首兼最高行政、国防与外交决策者。', impact: '澶渊危机前北宋国家能力得到集中调动。' },
      { timeText: '1004-1022年', periodLabel: '澶渊之盟与天书政治', title: '宋真宗 / 和议与皇权礼制决策者', nominalDuty: '处理对辽和议、边防、财政、礼制与宫廷合法性。', authorityScope: '中央官僚、前线军队、岁币外交、封禅和宫廷礼仪，受党争与近臣影响。', actualInfluence: '促成澶渊之盟，后推动封禅、天书和祥瑞仪式，增加宫廷财政支出。', modernEquivalent: '国家元首兼外交、国防与国家礼仪最高负责人。', impact: '宋辽长期和平形成，北宋文官社会和文化繁荣延续。' }
    ]
  } },
  { id: 'chongzhen-emperor', merge: {
    background: '崇祯帝朱由检是明朝末代皇帝，面对财政枯竭、辽东战争、旱灾、农民起义和党争，勤政而多疑，1644年李自成攻入北京后自缢。',
    childhood: '出身明神宗皇族，早年不是皇位核心继承人，兄长天启帝去世后即位，成长于宦官专权、辽东危机和财政困局。',
    personality: '勤勉、节俭、希望振作朝政但猜疑和急于换将，常在重用与处置大臣之间反复；个人努力无法弥补制度与资源崩溃。',
    policyInclination: '试图清除魏忠贤余党、整顿财政、加强辽东和镇压农民军，依赖内阁、宦官、督抚和将领，却缺乏稳定的信任与协调机制。',
    socialContribution: '其统治记录明末国家危机、财政军事和农民战争的集中爆发，煤山自缢成为明清鼎革和末代君主责任记忆。',
    impactSummary: '崇祯不是明亡唯一责任人。气候灾害、税制、辽东、军队、地方社会和李自成、吴三桂、清军共同决定结局，但其用人和财政决策也负有重要责任。',
    disputeTabs: [{ title: '勤政守国视角', body: '崇祯勤于批奏、节俭并试图改革，却面对财政和军队无法同时供给的困局，最终仍选择留守北京。' }, { title: '决策责任视角', body: '频繁更换将领、猜疑文臣、处死袁崇焕和缺少稳定财政方案加剧危机，不能因个人勤政而免除政治责任。' }],
    resume: [
      { timeText: '1627-1638年', periodLabel: '即位与内政整顿', title: '明思宗 / 晚明中央改革者', nominalDuty: '统筹内阁、六部、厂卫、财政、辽东和地方官员。', authorityScope: '中央官署、内廷、九边军镇、税粮和官员任免，实际受财政与党争约束。', actualInfluence: '处置魏忠贤、调整内阁和将领，尝试解决辽东与财政问题。', modernEquivalent: '国家元首兼最高行政、国防和监察决策者。', impact: '明廷短期恢复部分皇权，但财政和军政危机未根除。' },
      { timeText: '1639-1644年', periodLabel: '农民战争与北京陷落', title: '明朝末代皇帝 / 战时最高统治者', nominalDuty: '组织全国军饷、边防、平叛和地方行政。', authorityScope: '中央、九边、各省督抚、军队与粮道，实际因欠饷、灾荒和地方化严重失控。', actualInfluence: '在李自成、张献忠和清军压力下频繁调兵，1644年北京失守后自缢。', modernEquivalent: '国家元首兼内战时期最高战争决策者。', impact: '明朝灭亡，清军入关和南明抗争开始。' }
    ]
  } },
  { id: 'dorgon', merge: {
    background: '多尔衮是清初摄政王、八旗统帅和清军入关关键人物，辅佐顺治帝，联合吴三桂击败李自成并重建北京中央政权。',
    childhood: '出身努尔哈赤第十四子，成长于后金八旗和宗室竞争，经历皇太极继承、清军入关和满洲贵族权力分配。',
    personality: '善于军事决策、权力整合和利用时机，重视清军入关与汉地官僚；摄政权力过大、剃发令和圈地政策造成社会冲突。',
    policyInclination: '以控制北京、打击大顺和南明、建立满洲皇权为目标，实行剃发易服、圈地和汉官任用并行的征服与治理政策。',
    socialContribution: '完成清军入关初期的军事与中央行政重建，推动清朝从东北政权转为全国统治；其强制政策加剧了明清鼎革的社会创伤。',
    impactSummary: '多尔衮是清朝入关的关键执行者而非正式皇帝，摄政地位、顺治亲政和身后追夺谥号反映清初宗室权力与皇权的复杂关系。',
    resume: [
      { timeText: '1626-1643年', periodLabel: '后金与清初八旗', title: '睿亲王、正白旗主 / 八旗统帅', nominalDuty: '统率八旗、参与皇位继承、对明战争和蒙古外交。', authorityScope: '正白旗、远征军、辽东防线、蒙古盟友和宗室议政，权力受皇太极与诸王平衡。', actualInfluence: '参与清军扩张与入关准备，掌握重要旗兵和军事资源。', modernEquivalent: '职能近似王室高级军事统帅兼国家安全决策者。', impact: '清军在明末北方战争中保持强大机动能力。' },
      { timeText: '1643-1650年', periodLabel: '顺治摄政与清军入关', title: '摄政王、大清兵马大元帅 / 全国实际最高权力者', nominalDuty: '代表幼帝统筹中央、八旗、地方官员、战争和北京治理。', authorityScope: '清廷中央、八旗、绿营前身、北京、山海关和南明战争，实际权力高于幼帝。', actualInfluence: '联络吴三桂击败大顺、占领北京并推进清朝南下，推行剃发和地方接管。', modernEquivalent: '职能近似幼主时期国家摄政兼最高行政与国防决策者。', impact: '清朝全国统治取得决定性开端。' }
    ]
  } },
  { id: 'wu-sangui', merge: {
    background: '吴三桂是明末关宁军将领、清初平西王，1644年引清军入关击败李自成，后在三藩之乱中反清，1678年病死。',
    childhood: '出身辽东将门，父吴襄为明军将领，吴氏家族长期活动于关宁防线，使其熟悉明廷、后金和边军，长期受辽东战争影响。',
    personality: '善于审时度势、重军队和家族安全，能够在明清之间迅速转换；政治选择多以现实利益与军镇存续为中心，后期反叛也缺乏全国联盟。',
    policyInclination: '先维护关宁军和辽东地盘，后借清军恢复秩序并获封藩王，最终因削藩压力发动反清战争，试图建立西南独立政权。',
    socialContribution: '参与明清鼎革、清军入关和三藩之乱，改变清朝建国与南方治理，也体现边军将领、地方藩镇和中央集权之间的矛盾。',
    impactSummary: '吴三桂不能只被写成“冲冠一怒为红颜”。山海关军政、明朝崩溃、清军利益、大顺压力和藩王制度共同决定他的选择。',
    disputeTabs: [{ title: '山海关选择视角', body: '吴三桂在明廷覆亡、李自成压力和关宁军存续之间选择借清入关，主要是军政与家族安全判断。' }, { title: '三藩叛乱视角', body: '清廷削藩和吴三桂地方军政权力冲突引发三藩之乱，反清战争显示个人军队难以获得全国政治合法性。' }],
    resume: [
      { timeText: '1638-1644年', periodLabel: '关宁防线与明末危机', title: '辽东总兵、平西伯 / 边军统帅', nominalDuty: '负责山海关、宁远、关宁军、粮道和对后金边防。', authorityScope: '山海关及关宁防线、边军、城堡、粮饷和辽东军民，受明廷兵部与督师约束。', actualInfluence: '在明清边战中保持关宁军，李自成攻京后成为北方关键军政力量。', modernEquivalent: '职能近似边境要塞群司令兼战区军政长官。', impact: '山海关成为明清鼎革的决定性通道。' },
      { timeText: '1644-1678年', periodLabel: '清初封藩与三藩之乱', title: '平西王 / 西南藩镇最高军政者', nominalDuty: '负责云南、贵州军政、地方行政、军队和边疆治理。', authorityScope: '西南数省军队、州县、税粮、土司和对外边境，实际拥有强大地方自治权。', actualInfluence: '协助清军入关后获封平西王，后因削藩发动叛乱，建立周政权并败亡。', modernEquivalent: '职能近似地方军政长官兼高度自治藩镇领袖。', impact: '三藩之乱促使清朝强化中央对西南和地方军队控制。' }
    ]
  } },
  { id: 'zhou-ping-wang', merge: {
    background: '周平王是西周末至东周初君主，犬戎攻破镐京后在诸侯支持下迁都洛邑，周王室由西部王畿转向依赖诸侯的东周秩序。',
    childhood: '出身周王室太子系，经历幽王废立、申侯冲突和西部边患，具体幼年生活不详，继承合法性依赖诸侯护立。',
    personality: '重视保存王室名分和迁都后的礼制连续，政治资源有限，无法恢复西周王室对土地、军队和诸侯的全面控制。',
    policyInclination: '以迁都、联络诸侯、延续宗法礼制和重建王室秩序为目标，接受诸侯护送与霸主政治成为现实。',
    socialContribution: '开启东周、保存周朝名义和礼制传统，使春秋诸侯争霸、会盟和王室名分政治获得历史框架。',
    impactSummary: '周平王东迁不是周朝立即灭亡，也不是单纯由褒姒故事造成。王室资源下降、边患和诸侯军事化决定了东周政治形态。',
    resume: [
      { timeText: '前771年', periodLabel: '西周末年继承危机', title: '王太子 / 周王室继承人', nominalDuty: '代表王室处理继承、诸侯、祭祀和边防关系。', authorityScope: '王畿、王室贵族、诸侯盟友和西部边防，实际受申侯等诸侯支持。', actualInfluence: '在幽王败亡后获得诸侯拥立，接替西周王室正统。', modernEquivalent: '职能近似君主制继承人兼危机政权象征。', impact: '周王室通过继承延续而非完全灭亡。' },
      { timeText: '前770年以后', periodLabel: '东周东迁', title: '周平王 / 洛邑王室统治者', nominalDuty: '主持王室祭祀、礼制和诸侯名分，维持有限的王畿与贡赋。', authorityScope: '洛邑及王畿、周礼、诸侯册命和会盟名分，军队与财政依赖诸侯。', actualInfluence: '迁都洛邑并接受秦、晋等诸侯保护，王室权威由直接统治转为礼制象征。', modernEquivalent: '不对应现代职位，属于衰弱宗法联盟的名义最高首领。', impact: '春秋诸侯争霸和东周格局正式展开。' }
    ]
  } },
  { id: 'qin-mu-gong', merge: {
    background: '秦穆公是春秋秦国君主，任用百里奚、蹇叔、由余等人，向西经营戎族并参与秦晋关系，使秦国成为西方强国。',
    childhood: '出身秦国王室，具体早年资料有限，继位时面对晋国东向压力、秦国贵族和西部戎族竞争，必须在战争与联盟间平衡。',
    personality: '善于任用外来贤臣、重视长期资源和边疆，能够吸取失败教训；殽之战等经历显示其东进判断也受到晋国和后勤限制。',
    policyInclination: '以任贤、整军、经营关中西部、安抚或征服戎族为重点，避免在晋国强盛时无准备东进，扩大秦国人口和土地资源。',
    socialContribution: '推动秦国西进、人才吸纳和军政整合，为战国秦国崛起积累地理、人口和制度基础；其“霸西戎”称号带有后世概括。',
    impactSummary: '秦穆公的历史作用在西进与任贤，不等于已经完成秦统一。晋国、楚国、戎族和秦国自身资源共同限制其春秋霸业。',
    resume: [
      { timeText: '前659-前640年', periodLabel: '任贤与秦晋外交', title: '秦公 / 关中军政统治者', nominalDuty: '统筹秦国官员、军队、赋税、晋秦外交和西部边防。', authorityScope: '秦国关中州邑、军队、粮道、宗族和诸侯关系，依靠百里奚、蹇叔等辅政。', actualInfluence: '吸纳外来人才，处理晋国婚盟和东出压力，改善秦国政务。', modernEquivalent: '国家元首兼边疆与国家组织建设最高决策者。', impact: '秦国从西部诸侯逐步成为春秋大国。' },
      { timeText: '前640-前621年', periodLabel: '西戎经营与秦国扩张', title: '秦穆公 / 西部强国塑造者', nominalDuty: '统率对戎战争、管理新占领地并处理晋楚等诸侯外交。', authorityScope: '秦国西部、军队、降附部落、马匹土地和关中资源，实际由贵族与军队执行。', actualInfluence: '击败或吸纳部分戎族势力，形成“霸西戎”局面，东出则受殽山失败限制。', modernEquivalent: '国家元首兼边疆战区与资源整合负责人。', impact: '秦国西进传统成为后来秦国长期国策的历史前身。' }
    ]
  } },
  { id: 'chu-cheng-wang', merge: {
    background: '楚成王是春秋楚国君主，推动楚国北上争霸，与晋文公对峙并在城濮之战前后影响中原诸侯格局，晚年死于王位继承冲突。',
    childhood: '出身楚王室，继位时楚国已控制江汉和南方资源，面对中原诸侯、宋国、晋国和王室内部继承问题。',
    personality: '有扩张能力、重视楚国霸权和贵族支持，能够任用子玉等将领；城濮战败和晚年废立冲突显示战略与继承风险。',
    policyInclination: '主张楚国北上、控制宋等中原盟友并以军事和会盟扩大影响，依靠令尹、贵族和军队维持大国政治。',
    socialContribution: '推动楚国从南方强国进入中原争霸，城濮失败后楚晋长期对峙，楚国文化与政治继续影响春秋格局。',
    impactSummary: '楚成王不是城濮战败的唯一责任者，子玉指挥、宋国求援、晋文公联盟和楚军分兵共同影响结果；其死也与王位继承有关。',
    resume: [
      { timeText: '前671-前632年', periodLabel: '楚国扩张与中原竞争', title: '楚王 / 南方强国统治者', nominalDuty: '统辖楚国州邑、军队、贵族、祭祀和北上外交。', authorityScope: '江汉流域、楚军、令尹、方国和对宋晋关系，依靠贵族军政体系。', actualInfluence: '扩大楚国势力并逼近中原，形成与晋国争霸的长期格局。', modernEquivalent: '国家元首兼区域军事与外交最高决策者。', impact: '楚国成为春秋中期最有竞争力的大国。' },
      { timeText: '前632-前626年', periodLabel: '城濮前后与王位危机', title: '楚成王 / 晋楚争霸对手', nominalDuty: '处理宋国、晋国和楚军战事以及王室继承。', authorityScope: '楚国远征军、诸侯外交、令尹和王室继承，实际受子玉及贵族影响。', actualInfluence: '城濮战败后楚国暂退中原，晚年因太子商臣政变被迫自杀。', modernEquivalent: '国家元首兼战时外交和继承决策者。', impact: '晋国霸权上升，楚国转入长期调整。' }
    ]
  } },
  { id: 'zhao-lie-hou', merge: {
    background: '赵烈侯是战国初赵国君主，三家分晋后赵氏获得诸侯地位，任用公仲连等人并推动赵国从晋卿封地转为独立国家。',
    childhood: '出身赵氏卿族和晋国军政贵族，成长于三家分晋、周天子册命和新国家制度形成的环境，个人早年资料有限。',
    personality: '重视名分和国家制度，能够接受卿族政治转为君主国家；具体性格多从任官、宗庙和诸侯关系推断。',
    policyInclination: '主张巩固赵氏王权、建立官僚与军队、维持土地赋税和诸侯外交，为赵国后续胡服骑射和扩张准备。',
    socialContribution: '代表三家分晋后赵国建国和战国诸侯秩序形成，说明贵族分权向领土国家转化的制度过程。',
    impactSummary: '赵烈侯资料有限，不宜虚构完整个人传记；其价值在赵国国家化和三家分晋后的政治结构，而非传奇战功。',
    resume: [
      { timeText: '前408-前403年', periodLabel: '赵氏封国与三家分晋', title: '赵侯 / 晋卿转型的国家首领', nominalDuty: '统辖赵氏封地、军队、宗族、官员和与魏韩关系。', authorityScope: '赵氏控制的城邑、土地、军队、贵族和晋国政治网络。', actualInfluence: '在周天子承认韩赵魏为诸侯的过程中代表赵氏合法化。', modernEquivalent: '职能近似从地方贵族领袖转为早期国家元首。', impact: '战国赵国正式进入诸侯体系。' },
      { timeText: '前403-前400年', periodLabel: '赵国早期制度', title: '赵侯 / 新诸侯国家建设者', nominalDuty: '处理官制、军队、赋税、宗族和诸侯外交。', authorityScope: '赵国早期州邑、贵族、军队和财政，行政体系尚在形成。', actualInfluence: '维持赵氏王权并为后续赵国改革和扩张留下制度基础。', modernEquivalent: '早期领土国家最高行政与军事首领。', impact: '三家分晋由卿族政治转为战国国家秩序。' }
    ]
  } },
  { id: 'han-jing-hou', merge: {
    background: '韩景侯是战国初韩国家族领袖和早期诸侯，三家分晋后韩氏取得诸侯地位，迁都阳翟并在三晋竞争中建立独立国家。',
    childhood: '出身晋国韩氏卿族，长期处在晋国贵族、土地和军队竞争，具体童年资料有限，主要通过三家分晋和韩氏世系认识。',
    personality: '重视宗族秩序、领土和名分，能够把卿族资源转化为国家政权；其个人性格和政策细节少于后来的韩昭侯、申不害。',
    policyInclination: '以巩固韩氏封地、发展城邑、维持三晋联盟和建立官僚军政为重点，寻求在魏赵夹缝中保存韩国家。',
    socialContribution: '代表韩氏从晋卿到战国诸侯的制度转变，为后续申不害变法、韩国中央集权和与秦竞争提供开端。',
    impactSummary: '韩景侯史料不多，不能套用后世韩国改革内容；他的重要性在于三家分晋和早期诸侯国家形成。',
    resume: [
      { timeText: '前408-前403年', periodLabel: '韩氏封国与三家分晋', title: '韩侯 / 晋卿转型的国家首领', nominalDuty: '统辖韩氏封地、军队、贵族和与魏赵的政治关系。', authorityScope: '韩氏城邑、土地、军队、宗族和晋国政治网络，行政权仍受贵族传统制约。', actualInfluence: '代表韩氏获得周天子诸侯承认，建立独立韩国家名义。', modernEquivalent: '职能近似早期国家元首兼宗族领地军事负责人。', impact: '韩国进入战国诸侯体系。' },
      { timeText: '前403-前400年', periodLabel: '韩国早期国家建设', title: '韩景侯 / 三晋秩序参与者', nominalDuty: '处理城邑、军队、赋税、官员和三晋外交。', authorityScope: '韩国家族领地、军队、城邑和贵族联盟，中央官僚体系尚未成熟。', actualInfluence: '巩固韩氏王权并在魏赵竞争中维持韩国家地位。', modernEquivalent: '早期领土国家最高行政与军事首领。', impact: '为韩国后续申不害变法和中央集权提供政权基础。' }
    ]
  } },
  { id: 'yan-zhao-wang', merge: {
    background: '燕昭王是战国燕国君主，燕齐战争失败后以筑黄金台、礼贤下士招纳乐毅、邹衍等人才，组织五国联军攻齐。',
    childhood: '出身燕王室，继承时燕国经历齐国入侵和国内继承危机，早年政治经验和复仇目标使其重视人才与联盟。',
    personality: '能忍辱、重用人才、善于长期布局和修复外交，军事胜利后仍需面对占领区治理和继承安排问题。',
    policyInclination: '主张厚待士人、整顿军队、联络诸侯、孤立齐国，以人才、联盟和国家复兴完成对齐复仇。',
    socialContribution: '黄金台和乐毅伐齐成为战国任贤与国家竞争的代表，燕国由弱转强，稷下和诸侯人才流动更加活跃。',
    impactSummary: '燕昭王成功来自长期积累和联盟，而非单一黄金台传说；其死后君臣猜疑导致乐毅出走，说明改革与用人需要继承制度保障。',
    resume: [
      { timeText: '前311-前285年', periodLabel: '燕国复兴与招贤', title: '燕王 / 国家复兴与人才政策推动者', nominalDuty: '统筹燕国军政、财政、外交、城邑和人才任用。', authorityScope: '燕国中央、地方军队、诸侯使节和贵族，依靠郭隗、乐毅等人才执行。', actualInfluence: '修筑黄金台、厚待郭隗并招纳乐毅、邹衍等人，恢复燕国实力。', modernEquivalent: '国家元首兼国家人才与国防改革最高决策者。', impact: '燕国重新成为战国强国。' },
      { timeText: '前284-前279年', periodLabel: '五国伐齐', title: '燕王 / 联军战略决策者', nominalDuty: '组织诸侯联盟、统筹军粮和对齐战争。', authorityScope: '燕国军队、五国外交、齐国战区和占领区治理建议。', actualInfluence: '支持乐毅率联军攻齐并占领七十余城，建立燕国短期霸权。', modernEquivalent: '国家元首兼多国联军与战后治理协调者。', impact: '齐国霸权崩溃，但燕国未能长期消化占领区。' }
    ]
  } },
  { id: 'zhao-wuling-wang', merge: {
    background: '赵武灵王是战国赵国君主，推行胡服骑射、经营代地和云中九原，增强赵国骑兵与边防，晚年沙丘宫变中被困饿死。',
    childhood: '出身赵国王室，继位时面对秦、魏、齐和北方林胡楼烦压力，接受诸侯战争和宗室继承教育。',
    personality: '勇于改革、重视实战和边疆，能够承受贵族反对；晚年废长立幼、退位后仍干预朝政，继承判断造成灾难。',
    policyInclination: '主张吸收北方骑射、改服、训练骑兵、开发代地和建立机动边防，以军事组织改革提升赵国生存能力。',
    socialContribution: '胡服骑射推动中原与草原技术、服饰和军事组织交流，赵国因此成为战国后期可与秦竞争的强国。',
    impactSummary: '赵武灵王的改革成功与晚年悲剧并存。军事现代化提升国家能力，但王位继承、宗室分裂和父子政治冲突摧毁了改革者本人。',
    disputeTabs: [{ title: '军事改革视角', body: '胡服骑射将草原骑战、服饰、骑兵与边疆行政结合，形成赵国对抗秦国和北方部族的核心能力。' }, { title: '沙丘宫变视角', body: '赵武灵王退位传位赵惠文王却保留政治野心，赵章与赵何继承冲突导致沙丘宫变和武灵王被困。' }],
    resume: [
      { timeText: '前326-前307年', periodLabel: '赵国危机与改革准备', title: '赵王 / 战国边疆国家统治者', nominalDuty: '统辖赵国军队、贵族、城邑、财政和北方边防。', authorityScope: '赵国中央、邯郸、代地、边军和诸侯外交，受贵族车战传统约束。', actualInfluence: '面对秦魏压力，开始考虑骑射、边疆和军队结构改革。', modernEquivalent: '国家元首兼国防与边疆改革最高决策者。', impact: '赵国军事转型获得王权支持。' },
      { timeText: '前307-前295年', periodLabel: '胡服骑射与沙丘悲剧', title: '赵王、主父 / 军事改革与继承决策者', nominalDuty: '组织骑兵、开发代地、管理北方边防和安排王位继承。', authorityScope: '赵国骑兵、代地、云中九原、宗室和中央官僚，退位后权限模糊。', actualInfluence: '推行胡服骑射并扩张北方，退位立赵惠文王后卷入继承冲突，最终被困饿死。', modernEquivalent: '前期国家元首兼军事改革者，后期属于退位但干预政治的宗室领袖。', impact: '赵国军力增强，沙丘宫变则削弱赵国王室稳定。' }
    ]
  } },
  { id: 'liu-bi', merge: {
    background: '刘濞是汉高祖之侄、吴王，封国拥有铜矿、盐业和较大自治权，汉景帝削藩后发动七国之乱，战败逃亡并被杀。',
    childhood: '出身刘氏宗室，早年参与楚汉余波和汉初封国政治，受封吴地后经营沿海盐业、铜矿和人口资源。',
    personality: '有组织能力和地方号召力，重视吴国利益和宗室地位；面对削藩选择武装反抗，政治联盟和战略判断不足。',
    policyInclination: '维护诸侯王的封国财政、军队和官员权，反对中央削藩；以“诛晁错、清君侧”号召掩盖吴国与中央的权力冲突。',
    socialContribution: '七国之乱暴露汉初郡国并行、资源分配和宗室军政问题，失败后中央逐步削弱诸侯王，汉帝国集权加深。',
    impactSummary: '刘濞不是单纯叛臣，他代表拥有盐铜资源和地方军队的诸侯结构；七国之乱由景帝削藩、吴楚利益和宗室安全共同引发。',
    disputeTabs: [{ title: '诸侯权力视角', body: '吴国拥有盐、铜和地方资源，刘濞认为削藩将摧毁宗室自治，叛乱具有明确的制度利益基础。' }, { title: '中央集权视角', body: '汉廷若长期允许诸侯掌握军队和财政，皇权将难以稳定；七国败亡推动郡国制度向中央控制转型。' }],
    resume: [
      { timeText: '前195-前154年', periodLabel: '吴王封国治理', title: '吴王 / 汉初大型诸侯国统治者', nominalDuty: '管理吴国州县、盐业、铜矿、财政、军队和宗室祭祀。', authorityScope: '吴国东南郡县、盐铜资源、地方官员、军队和海岸，自治权高于普通郡国。', actualInfluence: '经营吴国经济并形成对中央有威胁的资源和军队基础。', modernEquivalent: '职能近似高度自治的地方军政与资源管理首长。', impact: '诸侯王权力扩张成为汉景帝削藩的直接背景。' },
      { timeText: '前154年', periodLabel: '七国之乱', title: '吴王 / 诸侯叛乱首领', nominalDuty: '组织吴楚联军、筹粮和与其他诸侯协同。', authorityScope: '吴国军队、地方财政、叛军联盟和战争宣传，缺少全国政治合法性。', actualInfluence: '以清君侧名义起兵，周亚夫平叛后逃至东越并被杀。', modernEquivalent: '不能类比现代职位，属于封建诸侯武装反叛首领。', impact: '汉廷收回诸侯军政资源，中央集权加强。' }
    ]
  } },
  { id: 'han-zhao-di', merge: {
    background: '汉昭帝刘弗陵是汉武帝幼子，继位时由霍光等辅政，减少对外战争、调整财政并维持西汉稳定，与宣帝时期合称昭宣中兴前段。',
    childhood: '出生于汉武帝晚年宫廷，受巫蛊之祸与太子废立影响，幼年即位并由霍光、金日磾、上官桀等辅政。',
    personality: '年少而能接受辅政制度，重视恢复与谨慎外交；个人独立执政时间有限，不能把霍光政策全部归为皇帝个人。',
    policyInclination: '延续武帝晚年减轻战争和财政压力的方向，重视盐铁、边疆、官员和民生恢复，通过辅政机构维持中央稳定。',
    socialContribution: '在武帝扩张后完成政治和经济修复，盐铁会议、边疆调整和昭宣中兴成为西汉由扩张转向恢复的重要阶段。',
    impactSummary: '汉昭帝时期的稳定依赖幼主与霍光等辅政重臣共同作用，皇帝个人能力、权臣权力和汉武帝遗产不能混为一谈。',
    resume: [
      { timeText: '前87-前80年', periodLabel: '幼年即位与霍光辅政', title: '汉昭帝 / 少主皇帝', nominalDuty: '名义统辖中央、军队、财政、官员和边疆。', authorityScope: '诏令、宫廷和国家名义权力，实际由霍光、金日磾等辅政大臣执行。', actualInfluence: '在辅政体系下接受帝王教育并维持政治连续，处理上官桀政变等危机。', modernEquivalent: '国家元首的名义权力，实际处于摄政与辅政制度下。', impact: '汉武帝死后的继承危机没有演化为内战。' },
      { timeText: '前80-前74年', periodLabel: '昭帝时期恢复政策', title: '汉昭帝 / 西汉恢复期最高名义统治者', nominalDuty: '与霍光等处理财政、盐铁、边疆、官员和民生政策。', authorityScope: '中央官署、郡国、财政盐铁和军队，实际权力与辅政集团共同分担。', actualInfluence: '支持减少战争负担和整顿财政，维持汉朝稳定，二十一岁去世无子。', modernEquivalent: '国家元首兼恢复期政策最高批准者。', impact: '为汉宣帝即位和昭宣中兴奠定政治基础。' }
    ]
  } },
  { id: 'fang-xiaoru', merge: {
    resume: [
      { timeText: '1385-1398年', periodLabel: '明初洪武至建文时期', title: '文官 / 翰林侍讲与经筵讲官', nominalDuty: '为皇帝讲解经史、参与诏令和文书起草，并承担文教与礼制咨询。', authorityScope: '服务于宫廷文教和中央文书体系，能够向皇帝提供经学、名分和政务建议，但不直接统率军队或地方行政。', actualInfluence: '受宋濂学术传统影响，凭文章和经学声望进入明廷，成为建文帝信任的儒臣。', modernEquivalent: '职能近似国家领导人文稿与政策研究顾问、中央文教官员，不等同现代行政首长。', impact: '在建文朝文官政治和削藩讨论中形成较强的正统与礼制表达。' },
      { timeText: '1398-1402年', periodLabel: '建文削藩与靖难之役', title: '建文朝重臣 / 正统文书起草者', nominalDuty: '参与削藩、礼制和政务文书，代表建文朝解释皇位继承与中央权力。', authorityScope: '主要影响中央决策、诏令文书和士大夫舆论，不能替代建文帝的皇权与朱棣的军事指挥权。', actualInfluence: '靖难军攻入南京后拒绝为朱棣起草即位诏书，随后被处死，成为建文正统与永乐皇权冲突的象征。', modernEquivalent: '职能近似中央政策与法统文书负责人，危机时承担政治合法性表达责任。', impact: '其结局塑造了明代忠节、正统和靖难合法性讨论，也反映政治冲突中的高压惩罚。' }
    ]
  } },
];

const personNamePatches = [
  { id: 'qi-huan-gong', merge: { name: '姜小白（齐桓公）', formalName: '姜小白' } },
  { id: 'da-yu', merge: { name: '禹（大禹）', formalName: '禹' } },
  { id: 'laozi', merge: { name: '李耳（老子）', formalName: '李耳' } },
  { id: 'duke-of-zhou', merge: { name: '姬旦（周公旦）', formalName: '姬旦' } },
  { id: 'xinling-jun', merge: { name: '魏无忌（信陵君）', formalName: '魏无忌' } },
  { id: 'yan-taizi-dan', merge: { name: '姬丹（燕太子丹）', formalName: '姬丹' } },
  { id: 'jin-wen-gong', merge: { name: '姬重耳（晋文公）', formalName: '姬重耳' } },
  { id: 'chu-zhuang-wang', merge: { name: '熊侣（楚庄王）', formalName: '熊侣' } },
  { id: 'goujian', merge: { name: '勾践（越王）', formalName: '勾践' } },
  { id: 'wei-wen-hou', merge: { name: '魏斯（魏文侯）', formalName: '魏斯' } },
  { id: 'qin-xiao-gong', merge: { name: '嬴渠梁（秦孝公）', formalName: '嬴渠梁' } },
  { id: 'qin-zhao-xiang-wang', merge: { name: '嬴稷（秦昭襄王）', formalName: '嬴稷' } },
  { id: 'chu-qing-xiang-wang', merge: { name: '熊横（楚顷襄王）', formalName: '熊横' } },
  { id: 'qin-shi-huang', merge: { name: '嬴政（秦始皇）', formalName: '嬴政' } },
  { id: 'qin-er-shi', merge: { name: '胡亥（秦二世）', formalName: '胡亥' } },
  { id: 'qi-of-xia', merge: { name: '姒启（夏启）', formalName: '姒启' } },
  { id: 'jie-of-xia', merge: { name: '履癸（夏桀）', formalName: '履癸' } },
  { id: 'cheng-tang', merge: { name: '成汤（商汤）', formalName: '成汤' } },
  { id: 'wu-ding', merge: { name: '武丁（商王）', formalName: '武丁' } },
  { id: 'shang-zhou-wang', merge: { name: '帝辛（商纣王）', formalName: '帝辛' } },
  { id: 'king-wen-zhou', merge: { name: '姬昌（周文王）', formalName: '姬昌' } },
  { id: 'king-wu-zhou', merge: { name: '姬发（周武王）', formalName: '姬发' } },
  { id: 'king-you-zhou', merge: { name: '姬宫湦（周幽王）', formalName: '姬宫湦' } },
  { id: 'kublai-khan', merge: { name: '孛儿只斤·忽必烈（元世祖）', formalName: '孛儿只斤·忽必烈' } },
  { id: 'pan-geng', merge: { name: '盘庚（商王）', formalName: '盘庚' } },
  { id: 'zi-ying', merge: { name: '子婴（秦王）', formalName: '子婴' } },
  { id: 'liu-bang', merge: { name: '刘邦（汉高祖）', formalName: '刘邦' } },
  { id: 'wang-mang', merge: { name: '王莽（新朝皇帝）', formalName: '王莽' } },
  { id: 'liu-bei', merge: { name: '刘备（汉昭烈帝）', formalName: '刘备' } },
  { id: 'sun-quan', merge: { name: '孙权（吴大帝）', formalName: '孙权' } },
  { id: 'wu-zetian', merge: { name: '武曌（武则天）', formalName: '武曌' } },
  { id: 'zhu-wen', merge: { name: '朱温（后梁太祖）', formalName: '朱温' } },
  { id: 'li-cunxu', merge: { name: '李存勖（后唐庄宗）', formalName: '李存勖' } },
  { id: 'shi-jingtang', merge: { name: '石敬瑭（后晋高祖）', formalName: '石敬瑭' } },
  { id: 'yelv-abaoji', merge: { name: '耶律阿保机（辽太祖）', formalName: '耶律阿保机' } },
  { id: 'yuan-hao', merge: { name: '元昊（西夏景宗）', formalName: '元昊' } },
  { id: 'wanyan-aguda', merge: { name: '完颜阿骨打（金太祖）', formalName: '完颜阿骨打' } },
  { id: 'han-wen-di', merge: { name: '刘恒（汉文帝）', formalName: '刘恒' } },
  { id: 'han-jing-di', merge: { name: '刘启（汉景帝）', formalName: '刘启' } },
  { id: 'han-wu-di', merge: { name: '刘彻（汉武帝）', formalName: '刘彻' } },
  { id: 'han-xuan-di', merge: { name: '刘询（汉宣帝）', formalName: '刘询' } },
  { id: 'liu-xiu', merge: { name: '刘秀（光武帝）', formalName: '刘秀' } },
  { id: 'sima-yan', merge: { name: '司马炎（晋武帝）', formalName: '司马炎' } },
  { id: 'emperor-xiaowen-northern-wei', merge: { name: '拓跋宏（北魏孝文帝）', formalName: '拓跋宏' } },
  { id: 'sui-wen-di', merge: { name: '杨坚（隋文帝）', formalName: '杨坚' } },
  { id: 'sui-yang-di', merge: { name: '杨广（隋炀帝）', formalName: '杨广' } },
  { id: 'tang-gaozu', merge: { name: '李渊（唐高祖）', formalName: '李渊' } },
  { id: 'tang-taizong', merge: { name: '李世民（唐太宗）', formalName: '李世民' } },
  { id: 'tang-gaozong', merge: { name: '李治（唐高宗）', formalName: '李治' } },
  { id: 'tang-xuanzong', merge: { name: '李隆基（唐玄宗）', formalName: '李隆基' } },
  { id: 'chai-rong', merge: { name: '柴荣（周世宗）', formalName: '柴荣' } },
  { id: 'song-taizu', merge: { name: '赵匡胤（宋太祖）', formalName: '赵匡胤' } },
  { id: 'song-renzong', merge: { name: '赵祯（宋仁宗）', formalName: '赵祯' } },
  { id: 'song-shenzong', merge: { name: '赵顼（宋神宗）', formalName: '赵顼' } },
  { id: 'song-huizong', merge: { name: '赵佶（宋徽宗）', formalName: '赵佶' } },
  { id: 'song-gaozong', merge: { name: '赵构（宋高宗）', formalName: '赵构' } },
  { id: 'ming-taizu', merge: { name: '朱元璋（明太祖）', formalName: '朱元璋' } },
  { id: 'ming-chengzu', merge: { name: '朱棣（明成祖）', formalName: '朱棣' } },
  { id: 'ming-yingzong', merge: { name: '朱祁镇（明英宗）', formalName: '朱祁镇' } },
  { id: 'ming-shenzong', merge: { name: '朱翊钧（明神宗）', formalName: '朱翊钧' } },
  { id: 'nurhaci', merge: { name: '爱新觉罗·努尔哈赤（清太祖）', formalName: '爱新觉罗·努尔哈赤' } },
  { id: 'hong-taiji', merge: { name: '爱新觉罗·皇太极（清太宗）', formalName: '爱新觉罗·皇太极' } },
  { id: 'shunzhi-emperor', merge: { name: '爱新觉罗·福临（顺治帝）', formalName: '爱新觉罗·福临' } },
  { id: 'kangxi-emperor', merge: { name: '爱新觉罗·玄烨（康熙帝）', formalName: '爱新觉罗·玄烨' } },
  { id: 'yongzheng-emperor', merge: { name: '爱新觉罗·胤禛（雍正帝）', formalName: '爱新觉罗·胤禛' } },
  { id: 'qianlong-emperor', merge: { name: '爱新觉罗·弘历（乾隆帝）', formalName: '爱新觉罗·弘历' } },
  { id: 'daoguang-emperor', merge: { name: '爱新觉罗·旻宁（道光帝）', formalName: '爱新觉罗·旻宁' } },
  { id: 'guangxu-emperor', merge: { name: '爱新觉罗·载湉（光绪帝）', formalName: '爱新觉罗·载湉' } },
  { id: 'king-helu-wu', merge: { name: '姬光（吴王阖闾）', formalName: '姬光' } },
  { id: 'fuchai', merge: { name: '夫差（吴王）', formalName: '夫差' } },
  { id: 'king-wei-qi', merge: { name: '田因齐（齐威王）', formalName: '田因齐' } },
  { id: 'king-hui-wei', merge: { name: '魏罃（魏惠王）', formalName: '魏罃' } },
  { id: 'cao-pi', merge: { name: '曹丕（魏文帝）', formalName: '曹丕' } },
  { id: 'song-zhenzong', merge: { name: '赵恒（宋真宗）', formalName: '赵恒' } },
  { id: 'xiao-chuo', merge: { name: '萧绰（萧太后）', formalName: '萧绰' } },
  { id: 'chongzhen-emperor', merge: { name: '朱由检（崇祯帝）', formalName: '朱由检' } },
  { id: 'zhou-ping-wang', merge: { name: '姬宜臼（周平王）', formalName: '姬宜臼' } },
  { id: 'qin-mu-gong', merge: { name: '嬴任好（秦穆公）', formalName: '嬴任好' } },
  { id: 'chu-cheng-wang', merge: { name: '熊恽（楚成王）', formalName: '熊恽' } },
  { id: 'zhao-lie-hou', merge: { name: '赵籍（赵烈侯）', formalName: '赵籍' } },
  { id: 'han-jing-hou', merge: { name: '韩虔（韩景侯）', formalName: '韩虔' } },
  { id: 'yan-zhao-wang', merge: { name: '姬职（燕昭王）', formalName: '姬职' } },
  { id: 'zhao-wuling-wang', merge: { name: '赵雍（赵武灵王）', formalName: '赵雍' } },
  { id: 'lu-zhi', merge: { name: '吕雉（吕后）', formalName: '吕雉' } },
  { id: 'liu-bi', merge: { name: '刘濞（吴王）', formalName: '刘濞' } },
  { id: 'han-zhao-di', merge: { name: '刘弗陵（汉昭帝）', formalName: '刘弗陵' } },
  { id: 'liu-xuan', merge: { name: '刘玄（更始帝）', formalName: '刘玄' } },
  { id: 'sun-hao-wu', merge: { name: '孙皓（吴末帝）', formalName: '孙皓' } },
  { id: 'yelv-deguang', merge: { name: '耶律德光（辽太宗）', formalName: '耶律德光' } },
  { id: 'liu-zhiyuan', merge: { name: '刘知远（后汉高祖）', formalName: '刘知远' } },
  { id: 'guo-wei', merge: { name: '郭威（后周太祖）', formalName: '郭威' } },
  { id: 'meng-zhixiang', merge: { name: '孟知祥（后蜀高祖）', formalName: '孟知祥' } },
  { id: 'qian-liu', merge: { name: '钱镠（吴越武肃王）', formalName: '钱镠' } },
  { id: 'feng-taihou', merge: { name: '冯氏（冯太后）', formalName: '冯氏' } },
  { id: 'cixi', merge: { name: '叶赫那拉氏（慈禧太后）', formalName: '叶赫那拉氏' } },
  { id: 'zhu-chenhao', merge: { name: '朱宸濠（宁王）', formalName: '朱宸濠' } },
  { id: 'dorgon', merge: { name: '爱新觉罗·多尔衮（睿亲王）', formalName: '爱新觉罗·多尔衮' } },
  { id: 'yixin', merge: { name: '爱新觉罗·奕䜣（恭亲王）', formalName: '爱新觉罗·奕䜣' } },
];

const eventPatches = [
  { id: 'qin-unification', append: { relatedPersonIds: ['shang-yang'] } },
  { id: 'julu-battle', append: { relatedPersonIds: ['liu-bang'] } },
  { id: 'hanshu-compiled', append: { relatedPersonIds: ['wang-mang'] } },
  { id: 'feishui-battle', append: { relatedPersonIds: ['wang-meng'] } },
  { id: 'sui-fall', append: { relatedPersonIds: ['tang-taizong'] } },
  { id: 'tang-founding', append: { relatedPersonIds: ['li-jing-tang'] } },
  { id: 'zhenguan-rule', append: { relatedPersonIds: ['li-jing-tang', 'du-ruhui'] } },
  { id: 'five-dynasties-begin', append: { relatedPersonIds: ['li-cunxu'] } },
  { id: 'five-dynasties-transition', append: { relatedPersonIds: ['song-taizu'] } },
  { id: 'ming-qing-transition', append: { relatedPersonIds: ['wu-sangui'] } },
  { id: 'qing-enters-pass', append: { relatedPersonIds: ['li-zicheng'] } },
  { id: 'zhenguan-ministers', append: { relatedPersonIds: ['li-jing-tang'] } },
  { id: 'qingli-reform', append: { relatedPersonIds: ['wang-anshi'] } },
  { id: 'song-literary-network', append: { relatedPersonIds: ['wang-anshi'] } },
  { id: 'southern-song-patriotic-literature', append: { relatedPersonIds: ['wen-tianxiang'] } },
  { id: 'li-kui-reform', append: { relatedPersonIds: ['shang-yang'] } },
  { id: 'mawei-incident', append: { relatedPersonIds: ['profile-ruler-tang-suzong'] } },
  { id: 'tang-calligraphy', append: { relatedPersonIds: ['wang-xizhi'] } },
  { id: 'five-dynasties-later-han-zhou', append: { relatedPersonIds: ['song-taizu'] } },
  { id: 'huanwen-depositions', append: { relatedPersonIds: ['liu-yu'] } },
  { id: 'yuanjia-rule-and-expeditions', append: { relatedPersonIds: ['liu-yu'] } },
  { id: 'northern-zhou-destroys-qi', append: { relatedPersonIds: ['sui-wendi'] } },
  { id: 'chenghua-hongzhi-governance', append: { relatedPersonIds: ['yu-qian'] } },
  { id: 'ganlu-incident', append: { relatedPersonIds: ['qiu-shiliang', 'li-xun'] } },
  { id: 'pangxun-rebellion', append: { relatedPersonIds: ['pang-xun'] } },
  { id: 'tanglong-coup', append: { relatedPersonIds: ['princess-taiping', 'empress-wei'] } },
  { id: 'huichang-buddhist-suppression', append: { relatedPersonIds: ['li-deyu'] } },
  { id: 'mongol-destroys-xixia', append: { relatedPersonIds: ['temujin'] } },
  { id: 'mongol-destroys-jin', append: { relatedPersonIds: ['temujin', 'ogedei', 'meng-gong'] } },
  { id: 'jingkang-incident', append: { relatedPersonIds: ['wanyan-zongbi'] } },
  { id: 'huangtiandang-battle', append: { relatedPersonIds: ['wanyan-zongbi'] } },
  { id: 'song-jin-war', append: { relatedPersonIds: ['wanyan-zongbi'] } },
  { id: 'xiangyang-fancheng-campaign', append: { relatedPersonIds: ['lyu-wenhuan'] } },
  { id: 'song-fall', append: { relatedPersonIds: ['lyu-wenhuan', 'zhang-shijie', 'lu-xiufu'] } },
  { id: 'western-zhou-fall', append: { relatedPersonIds: ['zhou-ping-wang'] } },
  { id: 'spring-autumn-hegemony', append: { relatedPersonIds: ['qin-mu-gong', 'baili-xi', 'chu-cheng-wang'] } },
  { id: 'three-families-jin', append: { relatedPersonIds: ['zhao-lie-hou', 'han-jing-hou'] } },
  { id: 'hundred-schools', append: { relatedPersonIds: ['mozi'] } },
  { id: 'qin-unification', append: { relatedPersonIds: ['wang-ben'] } },
  { id: 'wenjing-rule', append: { relatedPersonIds: ['zhou-bo'] } },
  { id: 'rebellion-seven-states', append: { relatedPersonIds: ['chao-cuo', 'liu-bi'] } },
  { id: 'zhaoxuan-revival', append: { relatedPersonIds: ['han-zhao-di', 'huo-guang'] } },
  { id: 'shiji-written', append: { relatedPersonIds: ['han-wu-di'] } },
  { id: 'guangwu-restoration', append: { relatedPersonIds: ['wang-mang'] } },
  { id: 'hanshu-compiled', append: { relatedPersonIds: ['ban-chao'] } },
  { id: 'papermaking-improved', append: { relatedPersonIds: ['zhang-heng'] } },
  { id: 'eastern-han-science', append: { relatedPersonIds: ['cai-lun'] } },
  { id: 'eastern-han-medicine', append: { relatedPersonIds: ['zhang-zhongjing'] } },
  { id: 'yellow-turban', append: { relatedPersonIds: ['cao-cao', 'liu-bei'] } },
  { id: 'feishui-battle', append: { relatedPersonIds: ['xie-xuan'] } },
  { id: 'eastern-jin-culture', append: { relatedPersonIds: ['gu-kaizhi'] } },
  { id: 'northern-southern-science', append: { relatedPersonIds: ['jia-sixie', 'li-daoyuan'] } },
  { id: 'sui-unification', append: { relatedPersonIds: ['gao-jiong', 'yang-su'] } },
  { id: 'sui-fall', append: { relatedPersonIds: ['tang-gaozu'] } },
  { id: 'an-shi-rebellion', append: { relatedPersonIds: ['yang-guifei', 'shi-siming', 'yan-zhenqing'] } },
  { id: 'tang-literary-reform', append: { relatedPersonIds: ['liu-zongyuan'] } },
  { id: 'huang-chao-uprising', append: { relatedPersonIds: ['zhu-wen'] } },
  { id: 'chenqiao-mutiny', append: { relatedPersonIds: ['zhao-pu', 'shi-shouxin'] } },
  { id: 'song-unification', append: { relatedPersonIds: ['zhao-pu'] } },
  { id: 'renzong-era', append: { relatedPersonIds: ['fan-zhongyan', 'ouyang-xiu', 'bao-zheng'] } },
  { id: 'song-science', append: { relatedPersonIds: ['su-song', 'bi-sheng'] } },
  { id: 'movable-type', append: { relatedPersonIds: ['shen-kuo'] } },
  { id: 'neo-confucianism', append: { relatedPersonIds: ['cheng-yi', 'lu-jiuyuan'] } },
  { id: 'anti-wokou', append: { relatedPersonIds: ['yu-dayou'] } },
  { id: 'late-ming-western-learning', append: { relatedPersonIds: ['matteo-ricci'] } },
  { id: 'ming-science', append: { relatedPersonIds: ['xu-xiake'] } },
  { id: 'taiping-rebellion', append: { relatedPersonIds: ['yang-xiuqing', 'shi-dakai', 'hong-rengan'] } },
  { id: 'self-strengthening', append: { relatedPersonIds: ['rong-hong'] } },
  { id: 'sino-japanese-war', append: { relatedPersonIds: ['ding-ruchang'] } },
  { id: 'late-qing-new-policy', append: { relatedPersonIds: ['zhang-jian'] } },
  { id: 'wang-mang-usurpation', append: { relatedPersonIds: ['liu-xuan', 'fan-chong'] } },
  { id: 'xin-reforms', append: { relatedPersonIds: ['liu-xuan', 'fan-chong'] } },
  { id: 'eastern-han-western-regions', append: { relatedPersonIds: ['dou-gu', 'gan-ying'] } },
  { id: 'western-jin-unification', append: { relatedPersonIds: ['sun-hao-wu', 'du-yu', 'wang-jun-jin'] } },
  { id: 'xiaowen-reform', append: { relatedPersonIds: ['feng-taihou'] } },
  { id: 'kaiyuan-prosperity', append: { relatedPersonIds: ['yao-chong', 'song-jing'] } },
  { id: 'an-shi-rebellion', append: { relatedPersonIds: ['li-guangbi'] } },
  { id: 'five-dynasties-transition', append: { relatedPersonIds: ['liu-zhiyuan', 'guo-wei', 'chai-rong'] } },
  { id: 'sixteen-prefectures', append: { relatedPersonIds: ['yelv-deguang'] } },
  { id: 'liao-founding', append: { relatedPersonIds: ['yelv-deguang'] } },
  { id: 'yuan-science', append: { relatedPersonIds: ['wang-xun-yuan', 'xu-heng'] } },
  { id: 'yuan-drama', append: { relatedPersonIds: ['bai-pu', 'ma-zhiyuan'] } },
  { id: 'ming-founding', append: { relatedPersonIds: ['li-shanchang', 'liu-bowen', 'lan-yu'] } },
  { id: 'jingnan-campaign', append: { relatedPersonIds: ['fang-xiaoru', 'xie-jin'] } },
  { id: 'qing-institutions', append: { relatedPersonIds: ['tian-wenjing', 'li-wei', 'eertai', 'zhang-tingyu'] } },
  { id: 'self-strengthening', append: { relatedPersonIds: ['yixin', 'shen-baozhen'] } },
  { id: 'late-qing-new-policy', append: { relatedPersonIds: ['zhan-tianyou'] } },
  { id: 'chinese-educational-mission', append: { relatedPersonIds: ['zhan-tianyou'] } },
  { id: 'spring-autumn-hegemony', merge: {
    background: '周王室东迁后，王权号召力下降，诸侯国需要在战争、会盟和外交中重新分配中原秩序。齐、晋、楚、秦、吴、越等国家先后凭借资源和军政组织争夺霸主地位。',
    process: '齐桓公任用管仲主持会盟，晋文公在城濮击败楚军，楚庄王继续挑战晋国，秦穆公经营西方，晚期吴越又以战争和复国改变南方格局。',
    result: '诸侯霸主轮替，周天子仍保留名义共主地位，但实际秩序更多由强国主持，战争、会盟和礼仪成为国家竞争的组合工具。',
    impact: '春秋争霸说明早期封建秩序正在转向诸侯国家竞争，也为战国变法、官僚化和大规模兼并战争准备了条件。'
  } },
  { id: 'three-families-jin', merge: {
    background: '春秋后期晋国公室衰弱，韩、赵、魏等卿大夫通过掌握土地、军队和官职逐渐强大，晋国传统封建秩序难以维持。',
    process: '韩、赵、魏联合消灭智氏并瓜分晋地，经过长期政治博弈后获得周王室册命，正式成为诸侯国。',
    result: '晋国被韩、赵、魏三国取代，战国七雄格局形成，卿大夫兼并和新型领土国家成为主流。',
    impact: '三家分晋是春秋向战国转换的制度标志，说明血缘分封和世卿世禄正在被君主集权、官僚行政和领土竞争取代。'
  } },
  { id: 'hundred-schools', merge: {
    background: '周礼秩序瓦解、战争频繁、官学下移和士阶层流动，使不同政治和社会方案获得表达空间。',
    process: '儒家讨论仁礼与教育，道家反思权力和自然，墨家提出兼爱非攻，法家强调法术势，兵家和纵横家则回应战争与外交实践。',
    result: '诸子百家形成相互竞争又相互吸收的思想网络，诸侯可以通过养士、游说和学宫吸纳政策资源。',
    impact: '百家争鸣奠定中国政治伦理、军事思想、教育传统和哲学表达的基本问题框架，后世国家不断重新解释这些资源。'
  } },
  { id: 'shang-yang-reform', merge: {
    background: '秦国地处西部，面对东方诸侯军事压力、旧贵族特权和行政组织不足，需要通过制度改革提高农业、财政和军队动员能力。',
    process: '商鞅在秦孝公支持下推行奖励耕战、军功爵制、县制、户籍和连坐等政策，逐步削弱旧贵族世袭权利并强化君主直接控制。',
    result: '秦国土地、人口、军队和地方行政被更紧密地纳入国家体系，国力明显增强；商鞅本人则因触动贵族利益在秦孝公死后遭车裂。',
    impact: '商鞅变法成为秦统一六国的重要制度前提，也留下严刑峻法、社会控制强化和改革代价等长期争议。'
  } },
  { id: 'yique-battle', merge: {
    background: '战国中期秦国持续东出，韩魏在伊阙方向组织联军阻挡秦军，秦国需要打开通往中原的战略通道。',
    process: '白起观察韩魏联军协同和兵力部署，集中秦军突破并击败公孙喜、暴鸢等韩魏将领所部，形成局部优势后扩大战果。',
    result: '韩魏联军遭到重创，秦国获得向东方推进的更大空间，白起开始成为战国后期最受重视的秦将之一。',
    impact: '伊阙之战显示秦国制度化军队、将领调度和多国联军协调之间的差距，也是理解白起连续作战生涯的起点。'
  } },
  { id: 'yan-ying-battle', merge: {
    background: '楚国地域广大但内部政治和外交压力加大，秦昭襄王时期秦军寻求从南方切断楚国战略空间。',
    process: '白起率秦军深入楚境，攻取鄢、郢等重要地区，楚顷襄王被迫迁都；屈原放逐和楚国贵族政治也处于同一时代背景。',
    result: '楚国旧都和大片战略空间丧失，秦国控制长江中游部分关键区域，楚国由强国竞争者转为被动防御者。',
    impact: '鄢郢之战说明秦统一并非只靠关中向东推进，还通过对楚的南线打击削弱六国整体战略纵深。'
  } },
  { id: 'huayang-battle', merge: {
    background: '秦国东出后，魏、赵等国在华阳一带相互牵连，秦军需要以快速机动打击多国联军，防止东方诸侯重新结盟。',
    process: '秦军在白起、魏冉等人组织下快速增援华阳方向，击败魏将芒卯并与赵军交战，利用速度和集中兵力突破联军防线。',
    result: '魏赵军队遭受打击，秦国继续压缩东方诸侯的战略空间，韩魏等国更依赖外交而非单独作战。',
    impact: '华阳之战补足白起军事经历中的多线作战面向，说明战国战争常是多国联动、快速救援和后勤竞争。'
  } },
  { id: 'changping-battle', merge: {
    background: '秦赵围绕上党地区争夺，赵国由廉颇采取坚守，秦国则希望通过长期消耗和政治离间迫使赵军决战。',
    process: '秦将王龁先行进攻，赵王在压力下用赵括替代廉颇；秦国秘密启用白起，诱使赵军分兵突围，最终包围并击溃赵军。',
    result: '赵国主力损失惨重，秦国取得统一战争的决定性优势；坑杀降卒的记载使战后处置成为战争伦理争议焦点。',
    impact: '长平之战不能只归因于赵括，赵王决策、秦国反间、补给和两国制度动员共同决定结果，是战国兼并战争的转折点。'
  } },
  { id: 'qin-unification', merge: {
    background: '商鞅变法以来秦国在行政、军功、财政和后勤方面形成持续动员能力，六国则长期相互竞争、难以建立稳定合纵。',
    process: '秦王政采用远交近攻，先后灭韩、赵、魏、楚、燕、齐，王翦、王贲等将领负责不同方向的长期战争。',
    result: '前221年秦完成统一，嬴政称始皇帝，战国诸侯国家体系结束。',
    impact: '秦统一开启大一统中央集权国家时代，但统一后的行政、文化和社会成本也直接影响秦朝短暂覆亡。'
  } },
  { id: 'standardization', merge: {
    background: '六国长期使用不同文字、货币、度量衡和交通制度，统一王朝需要降低行政、贸易、征税和军队调度成本。',
    process: '秦廷以皇帝和中央官署为核心，在地方推行郡县制，同时统一小篆、货币、度量衡和车轨，并修筑驰道连接各地。',
    result: '全国行政和文化沟通成本下降，地方被更直接纳入中央体系，秦帝国形成相对一致的国家标准。',
    impact: '标准化是秦朝最具长期影响的遗产之一，后世统一王朝不断继承这一思路，同时根据社会实际进行调整。'
  } },
  { id: 'burning-books', merge: {
    background: '秦统一后，法家国家需要压制借古讽今、六国旧贵族和地方学术传统对中央政策的挑战，思想控制与行政统一发生冲突。',
    process: '李斯建议限制非官方典籍流通，秦廷焚毁部分书籍，并发生坑杀方士或儒生的相关记载，后世叙事将其合称为焚书坑儒。',
    result: '秦朝加强了官方知识与言论控制，但事件也造成严重文化损失和政治声誉损害。',
    impact: '该事件需要区分实际执行范围、史料记载和后世概括，是评价秦朝法家治理与思想政策的争议入口。'
  } },
  { id: 'great-wall-qin', merge: {
    background: '统一后的秦朝北方仍面临匈奴等游牧势力压力，边疆防御需要军队、屯田、道路和连续防线共同支撑。',
    process: '蒙恬率军北击匈奴并收复河南地，秦朝连接和修筑战国旧长城，设置边防据点与交通线。',
    result: '秦北方边境获得阶段性稳定，中央对北方军政和工程体系的控制加强，但长期徭役和运输也增加民众负担。',
    impact: '秦长城体现古代国家边防工程的组织能力，也说明大型公共工程同时包含安全收益与社会成本。'
  } },
  { id: 'sha-qiu-coup', merge: {
    background: '秦始皇巡游途中病重，继承人选与遗诏掌握在少数随行近臣手中，秦帝国缺乏公开稳定的权力交接机制。',
    process: '赵高说服李斯秘不发丧并改写遗诏，拥立胡亥，迫使扶苏和蒙恬自杀，秦廷继承路线由此改变。',
    result: '秦二世即位，赵高进入实际权力核心，秦始皇原有的继承安排和部分军政部署被打乱。',
    impact: '沙丘政变是秦朝由统一强国迅速转入宫廷失控的关键节点，揭示皇权集中却缺少制度化继承机制的风险。'
  } },
  { id: 'fake-edict-hu-hai', merge: {
    background: '秦始皇死后，扶苏、蒙恬掌握北方军政，赵高和李斯则希望依靠胡亥维持自身在宫廷中的位置。',
    process: '赵高利用文书和诏令控制，将秦始皇遗命改为责备扶苏、蒙恬，迫使二人自杀，再以此确保胡亥继位。',
    result: '秦廷失去重要皇子和边疆将领，继承权威被伪造诏令取代，中央政治信任进一步崩塌。',
    impact: '矫诏立胡亥把宫廷权力斗争直接转化为帝国继承危机，是理解赵高、李斯和秦二世关系的核心事件。'
  } },
  { id: 'daze-uprising', merge: {
    background: '秦末戍卒被强制征发，误期可能按秦法处死，长期徭役、战争和基层行政压力使小规模危机迅速政治化。',
    process: '陈胜、吴广在大泽乡以反抗秦法为号召起事，借“王侯将相宁有种乎”等语言动员戍卒，并建立张楚政权。',
    result: '起义打破秦朝基层恐惧，各地反秦力量相继响应，秦朝中央控制开始从地方裂解。',
    impact: '大泽乡起义展示社会压力如何通过偶发事件爆发，也说明起义组织在扩大后还必须解决粮食、军队和行政问题。'
  } },
  { id: 'julu-battle', merge: {
    background: '秦军章邯部围攻赵地，诸侯援军犹豫不决，秦末战争进入决定性阶段，谁能击破秦军主力谁就掌握反秦联盟的领导权。',
    process: '项羽率楚军渡河后破釜沉舟，集中兵力连续攻击秦军，击败王离部并迫使章邯集团动摇。',
    result: '秦军主力崩溃，项羽取得反秦阵营最高军事威望，刘邦等其他势力开始重新评估与楚军的关系。',
    impact: '巨鹿之战是秦亡前的军事转折，但项羽随后如何分配诸侯、处理关中和建立秩序，决定了其威望能否转化为政权。'
  } },
  { id: 'fall-of-qin', merge: {
    background: '秦末起义、章邯军队离心、赵高操控朝廷和各地诸侯竞争同时发生，中央已经失去有效调度全国的能力。',
    process: '子婴诛杀赵高后短暂执政，刘邦先入关中并接受秦王子婴投降，项羽随后进入关中并重组诸侯。',
    result: '秦朝统一王朝终结，天下从秦帝国转入项羽分封和刘邦、项羽争夺天下的楚汉阶段。',
    impact: '秦亡说明统一制度可以被继承，但高压动员、继承危机和地方失控会在短时间内摧毁王朝政治合法性。'
  } },
  { id: 'chu-han-war', merge: {
    background: '项羽分封诸侯后秩序不稳，刘邦以汉中和关中为基地逐步反攻；双方在联盟、粮道、人才和政治合法性上长期竞争。',
    process: '刘邦依靠萧何后勤、张良谋略和韩信大兵团作战，逐步削弱项羽盟友，最终在垓下形成合围。',
    result: '项羽败亡，刘邦建立西汉，秦末诸侯竞争转化为新的中央王朝。',
    impact: '楚汉战争显示胜负取决于军事、后勤、用人和制度整合的综合能力，刘邦最终把反秦联盟转化为汉帝国。'
  } },
  { id: 'wang-mang-usurpation', merge: {
    background: '西汉末年外戚、土地兼并、财政和社会矛盾加重，王莽通过外戚身份、礼制声望和禅让叙事逐步取得皇权。',
    process: '王莽先后以摄政、假皇帝和真皇帝身份掌权，公元8年接受禅让建立新朝；绿林、赤眉和刘秀等力量随后挑战其统治。',
    result: '西汉灭亡，新朝建立，但汉室宗亲、地方豪强和起义军并未被真正整合。',
    impact: '王莽代汉说明合法性包装不能替代财政、土地和军政能力，也为东汉复兴和后世新莽评价留下争议。'
  } },
  { id: 'guangwu-restoration', merge: {
    background: '新末起义和地方割据造成权力真空，刘秀依靠宗室名义、河北地方资源和军政人才逐步扩大势力。',
    process: '刘秀在昆阳等战事中建立威望，随后经营河北、击败更始和赤眉等竞争者，完成对主要区域的重新整合。',
    result: '刘秀重建汉朝，定都洛阳，形成东汉；他通过休养生息和削弱地方军镇恢复中央秩序。',
    impact: '光武中兴不是简单复古，而是在新莽崩溃后调整税役、军队和地方关系，形成东汉长期统治的基础。'
  } },
  { id: 'western-jin-unification', merge: {
    background: '曹魏后期司马氏控制中枢，司马炎建立西晋后，蜀汉已亡、孙吴孤立，长江防线成为统一战争的最后屏障。',
    process: '西晋准备粮秣、舟船和多路军队，杜预从荆州推进，王濬率水军顺江东下，配合其他部队攻入建业。',
    result: '孙吴末帝孙皓投降，三国分裂局面结束，西晋暂时统一全国。',
    impact: '西晋统一体现水陆协同、工程准备和长期政治整合，但宗王分封与八王之乱很快使统一成果变得脆弱。'
  } },
  { id: 'sui-unification', merge: {
    background: '南北朝长期分裂后，北周、北齐和南陈相继衰弱，北方政权已形成较强的户籍、军队和财政组织。',
    process: '隋文帝在北方整顿内政、统一制度，派军南下灭陈；高颎、杨素等参与军政和后勤安排。',
    result: '隋灭陈，结束南北长期分裂，重新建立覆盖南北的统一王朝。',
    impact: '隋统一为大运河、科举和唐朝盛世提供空间，但过度工程、征伐和统治压力也使隋朝迅速崩溃。'
  } },
  { id: 'chenqiao-mutiny', merge: {
    background: '后周世宗去世后，幼主继位，北方军事压力和禁军将领权力上升，赵匡胤在陈桥镇掌握了军队和政局主动权。',
    process: '禁军将士拥立赵匡胤为帝，赵匡胤回师开封并迫使后周恭帝禅位，赵普等文臣参与后续制度和政权安排。',
    result: '北宋建立，五代中原政权更替结束，宋朝开始以中央集权和重文抑武处理军镇问题。',
    impact: '陈桥兵变体现五代军人政治的延续，也解释宋太祖为何特别重视收回禁军将领的独立兵权。'
  } },
  { id: 'song-fall', merge: {
    background: '南宋长期面对金、蒙古和内部财政军政压力，蒙古在灭金后集中力量南下，南宋朝廷内部和战选择不断变化。',
    process: '蒙古军攻取襄阳、樊城后进入长江流域，宋军在临安、崖山等地相继失败，文天祥等人继续坚持抗元。',
    result: '南宋灭亡，元朝完成对中国大部的统一，宋代士大夫政治和经济文化体系进入新的统治框架。',
    impact: '宋元易代兼具军事征服、区域经济和文化延续，南宋灭亡并不意味着宋代制度与文化立即消失。'
  } },
  { id: 'jingnan-campaign', merge: {
    background: '明太祖分封诸王以镇守边疆，但建文帝即位后担心藩王势力，推行削藩，燕王朱棣在北平拥有军队和地缘优势。',
    process: '朱棣以“靖难”为名起兵，利用北方军镇和建文朝内部失误南下，最终攻入南京；方孝孺等文臣坚持建文正统。',
    result: '朱棣即位成为明成祖，明代政治中心、北方边防和皇权结构重新调整。',
    impact: '靖难之役确立永乐皇权，也加深明代皇权对文官、宗室和军事集团的控制，建文正统争议延续至后世。'
  } },
  { id: 'qing-founding', merge: {
    background: '后金在努尔哈赤时期形成八旗军政体系，皇太极继承后需要扩大统治基础、吸收汉地制度并处理与明朝和蒙古的竞争。',
    process: '皇太极调整官制、旗制和族群治理，改国号为清，并通过军事和政治整合扩大对东北和蒙古地区的控制。',
    result: '清作为新的政权形态建立，既保留八旗军事传统，也逐步采用中原官僚制度和皇帝政治。',
    impact: '清朝建号是后金发展为多族群帝国的制度转折，为1644年入关和后续全国统治准备政治与行政基础。'
  } },
  { id: 'spring-autumn-hegemony', merge: { summary: '周王室东迁后，齐、晋、楚、秦和吴越等诸侯以会盟、战争和外交争夺霸主地位，春秋秩序由此从周礼共主转向强国协调。' } },
  { id: 'three-families-jin', merge: { summary: '韩、赵、魏三家从晋国卿大夫发展为正式诸侯，旧贵族分封秩序瓦解，战国领土国家开始形成。' } },
  { id: 'hundred-schools', merge: { summary: '周礼崩解和诸侯竞争促成士阶层流动，儒、道、墨、法、兵、纵横等学派围绕秩序、民生和战争提出不同方案。' } },
  { id: 'shang-yang-reform', merge: { summary: '商鞅在秦孝公支持下推行军功爵、县制、户籍和重农战政策，显著提升秦国动员能力并触动旧贵族利益。' } },
  { id: 'yique-battle', merge: { summary: '白起在伊阙击败韩魏联军，秦国打开东出通道，公孙喜、暴鸢等对手所代表的联军协调问题成为战败因素。' } },
  { id: 'yan-ying-battle', merge: { summary: '秦军攻取楚国鄢、郢等战略重地，迫使楚顷襄王迁都，楚国在秦国南线打击下失去大片战略空间。' } },
  { id: 'huayang-battle', merge: { summary: '秦军在华阳方向以快速集中兵力击败魏赵军队，芒卯、贾偃等对手体现东方诸侯多线防御的困境。' } },
  { id: 'changping-battle', merge: { summary: '秦赵长平决战中廉颇坚守、赵括出战、白起接替王龁，赵军惨败使秦国取得统一战争的决定性优势。' } },
  { id: 'qin-unification', merge: { summary: '秦统一战争以远交近攻和王翦、王贲等将领的长期作战灭六国，前221年建立秦帝国并结束战国分裂。' } },
  { id: 'standardization', merge: { summary: '秦统一文字、货币、度量衡和车轨，推行郡县制并修筑驰道，以全国标准降低行政、交通和财政成本。' } },
  { id: 'burning-books', merge: { summary: '秦廷限制非官方典籍、焚毁部分书籍并发生坑杀方士或儒生记载，思想控制成为秦政严酷形象的重要来源。' } },
  { id: 'great-wall-qin', merge: { summary: '蒙恬北击匈奴并连接战国长城，秦朝以军队、屯田、道路和工程构成北方边防体系，同时加重徭役负担。' } },
  { id: 'sha-qiu-coup', merge: { summary: '秦始皇病逝后赵高、李斯改写遗诏、拥立胡亥并逼死扶苏和蒙恬，秦帝国继承路线由此发生根本改变。' } },
  { id: 'fake-edict-hu-hai', merge: { summary: '赵高利用诏令和宫廷信息链操控继承，使胡亥即位、扶苏蒙恬死亡，秦朝政治信任迅速崩塌。' } },
  { id: 'daze-uprising', merge: { summary: '戍卒因误期面临秦法严惩，陈胜、吴广在大泽乡起义并建立张楚，秦朝基层统治的恐惧机制被打破。' } },
  { id: 'julu-battle', merge: { summary: '项羽破釜沉舟击败章邯、王离所部秦军，取得反秦阵营军事领导权，秦亡进程由此加速。' } },
  { id: 'fall-of-qin', merge: { summary: '子婴诛杀赵高后向刘邦投降，秦朝在起义、宫廷内斗和军队离心中灭亡，天下转入楚汉竞争。' } },
  { id: 'chu-han-war', merge: { summary: '刘邦凭借萧何后勤、张良谋略和韩信军事击败项羽，完成秦末到西汉的政权转换。' } },
  { id: 'wang-mang-usurpation', merge: { summary: '王莽利用外戚、礼制和禅让取得皇位，公元8年建立新朝，但土地、财政和地方军政矛盾并未解决。' } },
  { id: 'guangwu-restoration', merge: { summary: '刘秀依靠宗室名义、河北资源和军政人才击败更始、赤眉等竞争者，重建东汉并恢复中央秩序。' } },
  { id: 'western-jin-unification', merge: { summary: '西晋以杜预陆军、王濬水军等多路力量攻灭孙吴，孙皓投降，三国分裂局面结束。' } },
  { id: 'sui-unification', merge: { summary: '隋文帝整顿北方制度并派军灭陈，高颎、杨素等参与军政与后勤，南北长期分裂重新结束。' } },
  { id: 'chenqiao-mutiny', merge: { summary: '赵匡胤在陈桥被禁军拥立并迫使后周禅位，北宋建立，五代军人政治转入宋代中央集权。' } },
  { id: 'song-fall', merge: { summary: '蒙古灭金后南下攻宋，襄阳、临安和崖山相继失守，南宋灭亡，元朝完成新的大一统。' } },
  { id: 'jingnan-campaign', merge: { summary: '朱棣以靖难为名反对建文帝削藩，攻入南京即位，方孝孺等人的选择使建文正统争议延续。' } },
  { id: 'qing-founding', merge: { summary: '皇太极在后金八旗基础上调整官制和族群治理，改国号为清，为入关和全国统治准备制度条件。' } },
  { id: 'wenjing-rule', merge: { summary: '汉文帝、汉景帝以轻徭薄赋、减少刑罚和节制宫廷开支恢复战后社会，文景积累成为汉武帝扩张的财政人口基础。' } },
  { id: 'han-wu-reforms', merge: { summary: '汉武帝以推恩令削弱诸侯，设刺史、盐铁官营和均输平准，并以儒学重塑政治名分，中央集权和国家财政同步加强。' } },
  { id: 'han-xiongnu-war', merge: { summary: '卫青、霍去病等率军反击匈奴，河套、河西和漠南战场改变汉匈力量关系，但长期战争也带来巨大财政与人口压力。' } },
  { id: 'silk-road', merge: { summary: '张骞出使西域连接汉朝与中亚，汉军经营河西和西域后形成跨区域交通网络，丝绸、马匹、技术与观念由此长期交流。' } },
  { id: 'eastern-han-western-regions', merge: { summary: '班超以军事、外交和地方联盟经营西域，恢复东汉影响并连接中亚；西域治理依赖交通、驻军和当地政权合作。' } },
  { id: 'yellow-turban', merge: { summary: '张角以太平道组织黄巾起义，地方豪强和州牧借平乱扩张军权，东汉中央失去对地方军政的有效控制。' } },
  { id: 'red-cliffs', merge: { summary: '曹操南下与孙权、刘备联盟在赤壁对抗，火攻与水土不服等因素使曹军败退，荆州和长江成为三国格局的关键空间。' } },
  { id: 'three-kingdoms-formation', merge: { summary: '曹丕代汉建立魏，刘备在蜀地称帝，孙权随后称吴，三国鼎立既是军事割据结果，也是各集团争取正统的制度安排。' } },
  { id: 'sima-usurpation', merge: { summary: '司马懿发动高平陵之变后，司马氏掌握曹魏军政，司马师、司马昭继续推进权力集中，司马炎最终代魏建晋。' } },
  { id: 'zhenguan-rule', merge: { summary: '唐太宗通过整顿律令、纳谏用人、轻徭薄赋和对外防御形成贞观之治，既吸收隋亡教训，也依赖唐初军事与财政整合。' } },
  { id: 'wu-zhou', merge: { summary: '武则天以皇后、太后和皇帝身份重组唐代政治，扩大科举和新进官僚作用，同时依靠监察与高压维护武周政权。' } },
  { id: 'kaiyuan-prosperity', merge: { summary: '唐玄宗前期任用姚崇、宋璟等整顿吏治，财政、军事、城市和文化达到高峰；后期权力结构变化为安史之乱埋下风险。' } },
  { id: 'an-shi-rebellion', merge: { summary: '安禄山、史思明发动叛乱，唐廷依靠郭子仪、李光弼和外援平定，但藩镇、宦官、财政和边防结构从此发生长期变化。' } },
  { id: 'neo-confucianism', merge: { summary: '宋代理学吸收儒、佛、道资源讨论天理、心性与秩序，程颢程颐、朱熹等建立解释体系并深刻影响教育、科举和社会伦理。' } },
  { id: 'ming-founding', merge: { summary: '朱元璋从红巾军和群雄竞争中胜出，1368年建立明朝，整顿户籍、里甲、军卫和官僚制度以重建统一国家。' } },
  { id: 'zheng-he-voyages', merge: { summary: '郑和在明成祖支持下率大型船队远航东南亚、南亚、西亚和东非，兼具朝贡外交、贸易、军事威慑与航海技术意义。' } },
  { id: 'zhang-juzheng-reform', merge: { summary: '张居正以考成法督促官员、以一条鞭法整合赋役，并配合边防和漕运整顿，短期改善万历初年财政和行政。' } },
  { id: 'kangxi-consolidation', merge: { summary: '康熙平定三藩、收复台湾并处理北方边疆，使清朝从入关政权转为稳定的多区域帝国。' } },
  { id: 'qing-institutions', merge: { summary: '雍正以军机处、摊丁入亩、耗羡归公和改土归流强化中央财政、行政与边疆控制，清代皇权和官僚体系进一步集中。' } },
  { id: 'opium-war', merge: { summary: '清廷禁烟与英国贸易、外交和军事压力冲突，鸦片战争及南京条约打破传统对外秩序，开启中国近代国家危机。' } },
  { id: 'self-strengthening', merge: { summary: '洋务派以“自强”“求富”建设军工、海防、轮船、电报、铁路和新式教育，但主要学习技术而未根本改变政治财政结构。' } },
  { id: 'sino-japanese-war', merge: { summary: '甲午战争中北洋海军和清军败于日本，马关条约带来割地赔款与列强竞争，洋务路线和晚清制度改革受到根本质疑。' } },
  { id: 'xinhai-revolution', merge: { summary: '武昌起义引发各省独立，孙中山、革命党、清廷与袁世凯共同推动清帝退位，中华民国建立，君主制时代结束。' } },
  { id: 'zhi-lu-wei-ma', merge: {
    summary: '赵高在秦二世面前指鹿为马，以公开颠倒事实测试群臣服从，揭示秦末宫廷的信息封锁、恐惧政治与权力失控。',
    background: '秦二世即位后，赵高掌握诏令传达、宫廷侍从和大臣进见渠道，秦帝国又处在起义扩散、军队失序和中央信任崩溃的阶段。',
    process: '赵高把鹿称为马，要求群臣表态；附和者获得安全，直言者被记下并受到排斥。事件重点不在动物辨认，而在权力者把明显事实变成服从测试。',
    result: '秦二世更加依赖赵高，朝廷中公开纠错和真实信息进一步减少，赵高得以继续操控人事、诏令和继承秩序。',
    impact: '“指鹿为马”成为权力制造假事实、群体沉默和政治信息失真的成语典故，也帮助理解秦亡不仅有外部起义，还有内部决策机制的自我封闭。',
    disputeTabs: [
      { title: '史事层面', body: '传统史书将其记为赵高在秦二世面前操弄群臣的事件，具体细节可能经过后世叙事加工。' },
      { title: '政治机制', body: '其稳定的历史意义在于描述权臣通过控制信息和惩罚异议，把忠诚测试置于事实判断之上。' },
      { title: '现代使用', body: '现代使用时应避免把所有意见分歧都等同于“指鹿为马”，关键是是否存在权力强迫的事实颠倒与异议惩罚。' }
    ]
  } },
  { id: 'chu-han-war', merge: {
    summary: '楚汉战争是秦亡后刘邦与项羽争夺天下的长期战争，胜负由军队、粮道、联盟、人才和政治合法性共同决定。',
    background: '秦亡后项羽分封诸侯却未能建立稳定秩序，刘邦据汉中和关中发展，诸侯反复倒向强者，天下从反秦联盟进入新的统一竞争。',
    process: '项羽依靠彭城、垓下前的多次会战保持军事优势，刘邦则依靠萧何补给、张良谋划和韩信分进合击，逐步夺取关中、河北、齐地和楚地的战略主动。',
    result: '项羽在垓下失败并自刎，刘邦建立西汉；异姓诸侯随后被调整，战争中的联盟资源转为汉帝国的中央集权。',
    impact: '楚汉战争显示开国竞争不仅是名将对决，还取决于后方行政、粮食、官僚和对地方势力的整合能力。',
    disputeTabs: [
      { title: '项羽优势', body: '项羽在巨鹿、彭城等战役中具有强大野战能力，但分封和政治控制未能稳定转化为长期国家能力。' },
      { title: '刘邦优势', body: '刘邦并非每次战役都占优，却更善于使用萧何、张良、韩信等不同类型人才，并把战争胜利转化为制度统治。' }
    ]
  } },
  { id: 'western-jin-unification', merge: {
    summary: '西晋灭吴结束三国分裂，杜预、王濬等多路军队协同推进，司马炎由此完成短暂统一。',
    background: '曹魏后期司马氏掌握中枢后建立西晋，蜀汉已亡，孙吴仍控制长江中下游。西晋需要解决江防、水军、地方士族和统一后的分封问题。',
    process: '西晋先整顿北方财政与军队，再以杜预、王濬等分别从荆州和益州方向推进，水陆并进攻入吴境，孙皓最终投降。',
    result: '280年孙吴灭亡，三国分裂结束；西晋恢复名义上的全国统一，并重新安排州郡、宗室和士族秩序。',
    impact: '西晋统一证明军事胜利需要水陆协同和制度承接，但八王之乱、宗室分封和北方族群关系很快使统一秩序再次瓦解。'
  } },
  { id: 'sui-unification', merge: {
    summary: '隋文帝在北方制度整合和南方军事准备基础上灭陈，589年结束南北朝长期分裂，重新建立大一统国家。',
    background: '北周外戚杨坚取代周室建立隋，北方经历府兵、州郡和户籍整顿，南陈则受制于长江防线、内部政治和资源差距。',
    process: '隋朝以高颎、杨素等统筹财政、粮运和军队，分多路南下，利用长江渡江与水陆配合攻灭南陈，陈后主被俘。',
    result: '隋统一南北，恢复全国性行政和交通网络，并为大运河、科举与唐代制度继承创造条件。',
    impact: '隋统一的成功与隋亡的迅速形成对照，说明大一统需要财政、工程和军队，也需要控制动员规模与社会承受能力。'
  } },
  { id: 'later-jin-rise', merge: {
    summary: '努尔哈赤在统一女真各部、整合八旗和明辽东压力的基础上于1616年建立后金，清朝兴起由此进入政权建构阶段。',
    background: '明后期辽东边防、女真部落竞争、贸易限制和地方权力重组交织，努尔哈赤逐步从建州女真首领扩展为区域政治军事领袖。',
    process: '努尔哈赤通过战争、联姻、编旗和盟誓整合女真各部，建立八旗军政组织，并以赫图阿拉为中心建立后金政权。',
    result: '女真力量由部落联盟转为具有汗权、军队、户口和分配体系的政权，开始持续挑战明朝辽东防线。',
    impact: '后金兴起不是单纯民族冲突，而是军事组织、边疆贸易、明朝政策和区域资源重组共同作用的结果，为皇太极改制和清朝建号奠基。'
  } },
  { id: 'ming-qing-transition', merge: {
    summary: '明清辽东战争围绕后金扩张、明朝边防和辽东地方社会展开，萨尔浒、宁远等战事逐步改变明清力量对比。',
    background: '明朝财政紧张、辽东军饷困难，后金以八旗动员和女真联盟扩大地盘；辽东汉人、蒙古部落和地方军镇处于多方压力之下。',
    process: '明朝先后组织大规模援辽和筑城防御，后金通过集中兵力、分化盟友和攻取城堡推进；袁崇焕在宁远等地暂时阻挡后金，但整体局势持续恶化。',
    result: '明朝失去辽东大部，后金获得人口、粮田和军事资源，明朝内部财政与党争进一步恶化。',
    impact: '明清易代不能只归因于一场战役，辽东战争、农民起义、财政危机和吴三桂引清等因素共同促成1644年政权转移。'
  } },
  { id: 'northern-southern-science', merge: {
    summary: '南北朝分裂并未阻断知识生产，祖冲之的圆周率与历法、贾思勰的农业总结、郦道元的地理著述共同体现技术文化积累。',
    background: '南北政权并立、人口迁徙和区域交流带来知识重组，农业恢复、历法需求、河流交通和地方治理推动实用学术发展。',
    process: '祖冲之进行数学、历法和天文计算，贾思勰整理农牧业经验，郦道元考察水系、地理和历史遗迹，知识通过官府、家学和文本传播。',
    result: '圆周率计算、农学和地理学形成具有传承价值的成果，南北朝文化表现出科学、生产和历史考察相结合的特征。',
    impact: '这类成就说明乱世并不等于文化停滞，国家分裂、地方社会和士人知识网络仍能推动技术与文献积累。'
  } },
  { id: 'tang-literary-reform', merge: {
    summary: '韩愈、柳宗元等倡导古文，反对过度骈偶化文风，以文章、经学和政治表达推动中唐文体与儒学复兴。',
    background: '中唐经历安史之乱、藩镇、宦官和佛教传播等变化，士大夫需要重新讨论政治责任、道统、社会秩序与文章功能。',
    process: '韩愈以古文、原道和师说等文章主张文以载道，柳宗元以政论、寓言和山水游记表达现实关怀，二人及同道在科举和官场网络中传播文体。',
    result: '古文逐渐成为后世散文和科举文章的重要资源，儒学复兴与文学革新互相推动。',
    impact: '古文运动不只是文风更换，也反映唐代士大夫试图以文章重建公共伦理和政治话语的努力。'
  } },
  { id: 'xixia-founding', merge: {
    summary: '元昊于1038年建立西夏，宋、辽、西夏形成西北多政权并立格局，河西走廊和党项政治进入新的阶段。',
    background: '党项拓跋氏长期受宋、辽之间的地缘和贸易影响，元昊继承部落与地方资源后，试图以独立国号、文字和礼制提高政权地位。',
    process: '元昊整合党项部落、控制河套与河西通道，创制西夏文字、建立官制并称帝，随后与宋发生战争和议和。',
    result: '西夏成为具有独立皇帝、行政、军队和文字体系的区域政权，宋辽夏三方关系持续影响北方和西北历史。',
    impact: '西夏建立提醒使用者不能把宋代历史只看成宋辽金二元对抗，西北多民族政权同样参与贸易、战争与文化交流。'
  } },
  { id: 'eastern-han-medicine', merge: {
    summary: '东汉医学在临床经验、药物认识和伤寒理论方面继续积累，华佗与张仲景分别成为外科传说和医学经典传统的代表。',
    background: '东汉末战争、疫病和人口流动增加医疗需求，地方士人、医者和家学通过实践、方书和师承保存经验。',
    process: '张仲景整理伤寒杂病经验，形成辨证论治传统；华佗以针灸、麻沸散和外科治疗的记载流传，后世材料也不断附会其形象。',
    result: '医学知识从个别经验逐渐形成可传授的理论、方剂和临床传统，影响后世中医学发展。',
    impact: '对华佗麻醉、外科等具体细节应标注史料边界，但东汉医学经验积累和张仲景传统具有重要历史影响。'
  } },
  { id: 'huang-chao-uprising', merge: {
    summary: '黄巢起义由盐业、赋税、灾荒和唐末地方失序等因素推动，长期战争削弱唐廷并为朱温等军镇势力崛起创造条件。',
    background: '唐末财政紧张、藩镇割据、盐业控制和灾荒叠加，普通民众、盐商和地方武装对官府征发与治安失序不满。',
    process: '黄巢由盐商和流民武装发展为大规模起义军，攻入长安并建立政权；唐廷借助沙陀、地方藩镇和朱温等力量反复镇压。',
    result: '黄巢军失败，但唐朝中央财政、军队和地方控制进一步瓦解，朱温最终掌握中原并废唐建后梁。',
    impact: '黄巢起义不是五代开始的唯一原因，却是唐末国家结构崩溃的重要加速器，需与宦官、藩镇和财政问题结合理解。'
  } },
  { id: 'hanshu-compiled', merge: {
    summary: '班固等编撰《汉书》，以断代纪传体整理西汉历史，形成继《史记》之后的重要正史范式。',
    background: '东汉建立后需要解释西汉兴亡、王莽代汉和光武中兴的合法性，班氏家族积累的史料与史官传统为编史提供基础。',
    process: '班固整理前代档案、家学材料和政治记忆，编写本纪、列传、志、表；后续班昭等参与校补，形成完整的西汉断代史。',
    result: '《汉书》确立断代史结构，保存西汉制度、人物、边疆和社会资料，成为后世正史编纂的重要模板。',
    impact: '《汉书》既是历史记录，也是东汉对西汉政治继承与正统关系的解释，阅读时要注意史料、编纂立场和后世评价的区别。'
  } },
  { id: 'papermaking-improved', merge: {
    summary: '蔡伦改进纸张原料与加工工艺，使纸张更适合书写和复制，推动东汉以后档案、教育与文化传播。',
    background: '简牍、缣帛等传统书写材料成本和重量较高，国家文书、宗教传播与教育扩展需要更便利的记录媒介。',
    process: '蔡伦利用树皮、麻头、破布、渔网等材料，经浸泡、捣浆、抄纸和晾晒改进纸张质量；造纸技术随后在不同地区继续变化。',
    result: '纸张逐渐成为更普遍的书写材料，官方文书、经典抄写和知识传播成本下降。',
    impact: '历史上并非蔡伦一人从零发明纸张，而是其改进和推广被正史记录并成为技术传播的重要节点。'
  } },
  { id: 'movable-type', merge: {
    summary: '毕昇以胶泥活字改进印刷方式，使单字排版和重复使用成为可能，体现宋代技术、出版与知识传播的结合。',
    background: '宋代教育、科举、佛经和商业出版发展，雕版印刷成熟但制版耗时，快速更换版面和重复印刷成为现实需求。',
    process: '毕昇制作单字活字、排版、烧制定型并反复使用；受材料、字数和排版组织限制，活字与雕版在不同场景并存。',
    result: '印刷技术出现新的组合方式，推动后世对出版效率、文本复制和知识普及的探索。',
    impact: '活字印刷的历史意义应与宋代出版业、识字教育和官府文书结合观察，不宜简单套用“技术一出现就全面取代旧技术”的叙事。'
  } },
  { id: 'shiji-written', merge: {
    summary: '司马迁以家学、档案、游历和个人生命经验完成《史记》，奠定纪传体通史与人物历史书写传统。',
    background: '汉武帝时代国家档案、战争、交通和中央集权达到新规模，司马迁继承太史令家学并接触从先秦到汉代的大量材料。',
    process: '司马迁游历各地、查阅档案和传闻，以本纪、表、书、世家、列传组织历史；受宫刑后仍完成撰述，把个人遭遇转为历史观察。',
    result: '《史记》从传说时代写至汉武帝，保存制度、战争、思想、经济和人物材料，成为中国古代通史经典。',
    impact: '《史记》既记录帝王，也记录刺客、游侠、商人和失败者，改变后世对历史人物、成败与时代环境的理解。'
  } },
  { id: 'wu-wang-conquers-shang', merge: {
    summary: '周武王联合诸侯在牧野击败商军，商纣王政权崩溃，商周王朝更替由此完成。',
    background: '商末王权、诸侯关系和周族实力发生变化，周文王时期的政治经营为周武王东进提供联盟和资源；商军内部也存在征发与离心问题。',
    process: '周军从关中出发，联合诸侯在牧野与商军决战。传统材料强调商军倒戈和天命，现代理解还要结合周族扩张、联盟结构与商王朝内部危机。',
    result: '商朝政治中心被周人接管，周武王建立西周，并通过分封、宗法和礼制重新安排征服地区。',
    impact: '牧野之战确立了“以德代暴”的王朝更替叙事，同时展示联盟动员、军事决战和战后制度建设必须连续进行。'
  } },
  { id: 'zhou-ritual-feudalism', merge: {
    summary: '西周以分封、宗法、礼乐和井田等制度想象组织王室与诸侯关系，形成周天子为共主的早期政治秩序。',
    background: '周人征服商地后，人口、土地和地方政治力量分散，单靠王室军队无法长期控制广域领土，需要借助宗族、婚姻和礼仪建立等级网络。',
    process: '周王将宗室、功臣和先代贵族分封到各地，以宗法规定继承和亲疏，以礼乐规定身份与仪式，并通过朝觐、贡赋和军事义务维系关系。',
    result: '西周形成王畿、诸侯、卿大夫和士的等级秩序，王室拥有共主名义，地方诸侯保有相当的世袭与治理空间。',
    impact: '周礼后来成为儒家讨论政治、家庭和社会秩序的核心资源，但春秋以后诸侯、卿大夫和领土国家兴起使其逐渐松动。'
  } },
  { id: 'wu-yue-hegemony', merge: {
    summary: '吴越争霸经历吴国扩张、越国复国和最终灭吴，勾践、夫差、伍子胥等人物共同构成春秋末期南方权力转移。',
    background: '长江下游国家拥有水网、稻作、铜铁和海上交通资源，吴楚争霸与越国复兴把南方纳入中原诸侯竞争。',
    process: '吴王阖闾任用伍子胥、孙武攻楚，夫差北上争霸并击败越国；勾践卧薪尝胆、任用范蠡和文种恢复越国，最终灭吴。',
    result: '越国一度成为春秋末期霸主，吴国灭亡，江南政治和军事资源进一步进入中原秩序竞争。',
    impact: '吴越故事包含忠谏、复仇、忍耐和功成身退等文化主题，也说明国家复兴依赖人口、生产、联盟和长期战略，而非单一意志。'
  } },
  { id: 'guiling-maling-battles', merge: {
    summary: '桂陵之战与马陵之战体现孙膑以围魏救赵、诱敌深入和伏击削弱魏国，齐国由此取得战国中期的重要战略优势。',
    background: '魏国在战国初期拥有强大军队和中原影响，齐国需要避免与魏军正面消耗，赵、韩等国的存亡也牵动齐国安全。',
    process: '桂陵之战中齐军围魏救赵，迫使庞涓回援；马陵之战中孙膑利用减灶、地形和夜袭诱使魏军进入伏击圈，庞涓战败身亡。',
    result: '魏国霸权受到重创，齐国成为战国中期强国，孙膑与庞涓的兵家对照被后世反复讲述。',
    impact: '两场战争说明战国军事竞争已高度依赖情报、机动、心理和后勤，强军若被诱导进入不利地形也会迅速崩溃。'
  } },
  { id: 'jing-ke-assassinates-qin', merge: {
    summary: '荆轲受燕太子丹委托刺秦未遂，事件体现战国末期六国反秦的绝望选择，也因《战国策》和文学叙事成为刺客文化典型。',
    background: '秦灭六国进程加快，燕国面临军事压力，太子丹希望通过刺杀秦王政争取时间；荆轲以游士和刺客身份被纳入这一政治行动。',
    process: '荆轲携督亢地图和樊於期首级入秦，在咸阳宫接近秦王并拔匕首刺杀，但秦王躲闪、拔剑反击，荆轲最终失败。',
    result: '秦王政未受伤，燕国随后遭到秦军进攻；荆轲死亡，刺秦行动未改变秦统一战争的基本方向。',
    impact: '荆轲形象同时包含政治反抗、个人勇气、刺客伦理和文学悲剧，不能把后世“风萧萧兮易水寒”的感染力当作全部史实。',
    disputeTabs: [
      { title: '历史行动', body: '刺秦行动是燕国在军事弱势下的政治冒险，结果失败且未能阻止秦国继续兼并。' },
      { title: '文化形象', body: '后世文学强调荆轲的勇敢、知己和悲剧性，把他塑造成反抗强权的文化符号。' }
    ]
  } },
  { id: 'xin-reforms', merge: {
    summary: '王莽以复古名义推行土地、货币、官制和商业改革，试图重建周礼秩序，却在财政、灾荒和地方执行中迅速失控。',
    background: '西汉末年土地兼并、外戚政治、人口流动和财政危机加剧，王莽以儒学名望和禅让合法性取得皇位，面对的是已高度复杂的帝国社会。',
    process: '王莽推行王田、五均六筦、多次货币改制和官制礼制调整，试图限制豪强、恢复古制；政策频繁变化，地方官吏和民众难以适应。',
    result: '改革未能稳定土地、税收和货币，反而造成交易混乱、官民冲突与地方反抗，新朝统治基础迅速削弱。',
    impact: '王莽改制既有理想主义复古，也有中央集权和财政控制目的；其失败说明古代制度移植必须考虑社会结构、执行能力和利益分配。',
    disputeTabs: [
      { title: '理想改革视角', body: '王莽试图限制土地兼并、恢复公共秩序并以古制重塑国家，反映儒家政治理想的制度化尝试。' },
      { title: '执行失败视角', body: '频繁币制、官制和经济政策变化，加上灾荒与地方豪强反弹，使改革在基层变成高成本行政压力。' }
    ]
  } },
  { id: 'zhaoxuan-revival', merge: {
    summary: '汉昭帝、汉宣帝在霍光等辅政力量协助下修复汉武帝后期的财政和政治压力，形成昭宣中兴。',
    background: '汉武帝晚年战争、巫蛊之祸和财政动员造成继承与治理危机，昭帝年幼即位，霍光等辅政大臣需要兼顾皇权、外戚和官僚。',
    process: '朝廷减少部分对外扩张和财政压力，平衡盐铁政策、整顿吏治、处理霍氏权力，并由流落民间的刘询继承皇位后进一步恢复行政。',
    result: '西汉人口、财政和地方治理逐步恢复，中央权力重新稳定，汉武帝时期的制度遗产被调整而非完全推翻。',
    impact: '昭宣中兴说明帝国强盛后必须进行政策纠偏，治世并非单纯回到旧制，而是对战争、财政和外戚权力重新平衡。'
  } },
  { id: 'eastern-han-science', merge: {
    summary: '张衡等人的天文、历法、仪器与文学实践体现东汉知识体系，科学研究与国家历法、礼制和官僚服务密切相关。',
    background: '东汉中央需要历法、天文观测和灾异解释，城市文化、士人教育与工艺技术发展为知识生产提供条件。',
    process: '张衡改进天文观测与地动仪传统，蔡伦等人推动材料工艺，官府、工匠和士人通过文书、历法和器物传播经验。',
    result: '东汉在天文、数学、仪器和书写材料方面积累成果，科学知识进入国家时间秩序和文化记忆。',
    impact: '东汉科学既有技术实用面，也受当时宇宙观、灾异政治和官僚制度影响，应避免用现代学科边界简单切割。'
  } },
  { id: 'guandu-battle', merge: {
    summary: '官渡之战中曹操以较小兵力依靠粮道、情报和奇袭击败袁绍，北方统一的主动权由袁绍集团转向曹操。',
    background: '黄巾余波和汉廷名义下的军阀竞争使北方形成多方势力，袁绍占据河北、兵力较强，曹操控制许都并需要防止多线夹击。',
    process: '曹操在官渡坚守，利用许攸投奔获得乌巢粮仓信息，亲自奇袭袁军粮道；袁绍指挥迟疑、内部意见不一，最终全线崩溃。',
    result: '袁绍败退，曹操取得北方争霸优势，随后逐步消灭或收编河北势力。',
    impact: '官渡说明兵力优势不能替代统一指挥、粮道安全和情报判断，也体现曹操把汉廷名义转为现实国家资源的能力。'
  } },
  { id: 'feishui-battle', merge: {
    summary: '淝水之战中东晋谢玄等以少胜多击败前秦苻坚，北方统一南下失败，南北分裂局面延续。',
    background: '前秦苻坚在王猛辅佐下统一北方，试图趁东晋内部压力南下；东晋依靠江南士族、谢安和谢玄维持防线。',
    process: '前秦大军渡淝水与东晋对峙，东晋要求前秦后撤让出决战空间，前秦军退却时阵形混乱，东晋乘机突击。',
    result: '前秦军大败，苻坚北归后各地割据重新出现，东晋暂时保住江南和长江防线。',
    impact: '淝水之战是北方统一与南方防御的关键转折，也说明多族群大军在指挥、补给和政治整合不足时容易崩溃。'
  } },
  { id: 'eastern-jin-culture', merge: {
    summary: '东晋士族文化在南渡、门阀政治和江南社会发展中形成独特面貌，王羲之书法、陶渊明文学和顾恺之绘画各具代表性。',
    background: '西晋灭亡后北方士族和人口南迁，东晋皇权依赖门阀，江南经济与地方文化逐渐发展，士人需要在政治失意与文化自我表达之间寻找空间。',
    process: '王羲之通过书法和兰亭雅集形成文人文化，陶渊明以田园诗和隐逸选择回应现实，顾恺之发展人物画与绘画理论。',
    result: '书法、绘画、诗文和士族审美形成持续影响，江南成为中国中古文化的重要中心。',
    impact: '东晋文化并非脱离政治的纯粹雅集，它与南渡记忆、门阀身份、田园经济和士人选择紧密相连。'
  } },
  { id: 'xiaowen-reform', merge: {
    summary: '北魏孝文帝在冯太后改革基础上迁都洛阳、改汉姓、推行均田和官制调整，推动北魏国家与北方社会的深度整合。',
    background: '北魏统一北方后面临鲜卑贵族、汉族士族、军镇和地方行政之间的矛盾，旧部落军事体系难以直接管理农业人口和中原城市。',
    process: '冯太后先推行俸禄、均田和三长制等改革，孝文帝迁都洛阳、改姓、改服、定语言和婚姻政策，并以官制和礼制塑造新国家。',
    result: '北魏中央集权和中原化程度提高，鲜卑贵族与汉族士族关系重组，洛阳成为政治文化中心。',
    impact: '改革提升了北魏国家整合能力，但也加剧部分军镇和鲜卑集团的不满，六镇起义与北魏分裂需放在这一长期张力中理解。',
    disputeTabs: [
      { title: '制度整合视角', body: '迁都、均田、三长制和礼制改革有助于北魏从征服王朝转为农业官僚国家。' },
      { title: '社会代价视角', body: '改革改变身份、语言和军镇利益，部分鲜卑群体的失落与后续六镇动乱存在结构性关联。' }
    ]
  } },
  { id: 'sui-fall', merge: {
    summary: '隋末动乱由大规模工程、对外战争、赋役压力和地方军政失衡共同推动，李渊、李世民等集团在乱局中建立唐朝。',
    background: '隋统一后修运河、营建东都和多次征高句丽，国家动员能力很强但社会承受力下降；水旱、粮运和地方豪强进一步加剧危机。',
    process: '各地起义、贵族和军镇势力相继起兵，隋炀帝南巡江都，李渊在太原起兵并进入长安，李世民等继续平定关中和中原竞争者。',
    result: '隋朝灭亡，唐朝建立，隋代户籍、官制、运河和科举等制度被继承并调整。',
    impact: '隋亡唐兴说明国家工程与统一制度能够创造长期基础，也可能因战争和征发过度造成短期崩溃。'
  } },
  { id: 'tang-founding', merge: {
    summary: '李渊在太原起兵、进入长安并击败群雄后建立唐朝，关陇军事集团与隋代行政制度共同构成新王朝基础。',
    background: '隋末中央失去地方控制，太原、关中和河东拥有军队、粮道与关陇贵族网络，李渊集团具备争夺天下的地缘优势。',
    process: '李渊联合李世民、刘文静等攻入长安，先立代王杨侑为帝，后受禅建唐；李世民、李靖、李勣等继续平定薛举、王世充、窦建德和刘黑闼。',
    result: '唐朝建立并逐渐完成全国统一，三省六部、府兵、均田与隋代科举等制度被重新组织。',
    impact: '唐朝建立不是一场单点政变，而是起兵合法性、军事征服、隋制承继和宗室功臣分配共同作用的过程。'
  } },
  { id: 'yonghui-rule', merge: {
    summary: '唐高宗永徽时期延续贞观制度，修订唐律疏议并处理宗室、外戚和皇后权力，初唐法制与疆域继续发展。',
    background: '唐太宗去世后，唐高宗继承国家机器，长孙无忌等功臣、宗室与后宫集团围绕皇后、储位和中枢权力重新排列。',
    process: '朝廷完善律令解释、治理州县和边疆，唐高宗先后处理长孙无忌集团与武则天入宫、立后等宫廷政治。',
    result: '唐律疏议等法制成果成熟，唐朝在西域、朝鲜半岛等方向继续扩展，武则天参与政务的空间逐步扩大。',
    impact: '永徽时期是贞观到武周的过渡，制度成熟与宫廷权力重组同时发生。'
  } },
  { id: 'tang-cultural-exchange', merge: {
    summary: '唐代通过丝绸之路、海上航路、使节和宗教网络与中亚、南亚、日本、新罗和东南亚交流，形成开放而多元的文化环境。',
    background: '唐朝统一、长安和洛阳城市繁荣、边疆军政和国际贸易发展，为人员、宗教、技术和商品流动提供条件。',
    process: '玄奘西行、鉴真东渡、粟特商人往来和日本遣唐使等活动把佛教、医药、音乐、文字、建筑和制度带入或带出唐朝。',
    result: '唐代形成多民族、多宗教和多区域互动的文化网络，长安成为国际性城市。',
    impact: '唐代开放并非无条件自由流动，交流依赖国家安全、交通路线、寺院和商人网络，也受到战争与边疆关系影响。'
  } },
  { id: 'tang-poetry', merge: {
    summary: '唐诗在宫廷、科举、士人交游、地方旅行和战乱社会中繁荣，李白、杜甫、白居易代表不同的诗歌传统。',
    background: '唐代教育、科举、城市、酒宴和交通为诗歌传播提供平台，国家盛衰和社会流动又不断扩大诗歌题材。',
    process: '李白发展浪漫想象与乐府传统，杜甫记录战争、民生与国家责任，白居易以通俗语言和讽谕诗回应官僚政治和社会问题。',
    result: '诗歌成为士人交往、政治表达、地方文化和个人情感的重要媒介，唐诗体裁和审美影响后世。',
    impact: '唐诗繁荣不能只归功于天才诗人，也依赖教育、科举、纸张、城市和国家交通等社会基础。'
  } },
  { id: 'tang-tujue-campaign', merge: {
    summary: '唐太宗时期唐军击败东突厥并安置草原部众，扩大北方安全空间，也形成羁縻、都护和多族群帝国治理经验。',
    background: '隋末突厥曾控制北方并影响唐初政局，唐朝建立后需要处理边疆安全、贸易、降附部落与内部军事资源。',
    process: '唐太宗利用突厥内部矛盾和唐军骑兵、后勤优势，命李靖等分路出击，颉利可汗被俘，部分部众归附唐朝。',
    result: '东突厥汗国瓦解，唐朝北方边防压力下降，草原部众被纳入都护、羁縻和朝贡体系。',
    impact: '唐灭东突厥体现军事胜利与多族群治理相结合，不能简单理解为永久消除草原政治力量。'
  } },
  { id: 'five-dynasties-begin', merge: {
    summary: '朱温控制唐末中央后废唐建后梁，五代由此开始；王朝更替背后是藩镇军权、宦官政治和财政崩溃的集中结果。',
    background: '黄巢起义后朱温掌握宣武军和长安周边资源，唐昭宗、唐哀帝时期中央无法独立控制军队和地方。',
    process: '朱温迫使唐昭宗迁洛并控制朝廷，最终逼唐哀帝禅位，建立后梁；河东李克用、李存勖等势力不承认其统治。',
    result: '唐朝灭亡，后梁建立，中原进入五代政权频繁更替、地方军镇割据和十国并立的时代。',
    impact: '五代开始提醒使用者，王朝名称的更换只是表层，真正变化在中央财政、军队和地方控制权的转移。',
    disputeTabs: [
      { title: '王朝正统视角', body: '传统史学多以朱温篡唐评价后梁，强调其对唐室和皇帝的控制。' },
      { title: '军镇结构视角', body: '朱温代唐是长期藩镇军事化、宦官与中央财政失控后的结果，个人篡位是结构危机的最后表现。' }
    ]
  } },
  { id: 'five-dynasties-transition', merge: {
    summary: '后梁、后唐、后晋、后汉、后周相继更替，中原军镇与沙陀集团、契丹援助、地方节度使共同推动五代政治。',
    background: '唐末藩镇形成的军队与财政网络没有因后梁建立而消失，河东、晋阳、幽燕和中原之间长期争夺政权与战略通道。',
    process: '李存勖灭后梁建后唐，石敬瑭借契丹建立后晋并割让燕云，刘知远建后汉，郭威建后周，柴荣继续改革和北伐。',
    result: '中原王朝不断更替，南方和西北十国相对独立，赵匡胤最终在后周禁军体系中建立北宋。',
    impact: '五代十国体现军人政治、政权合法性、外族援助和地方经济并存，不能只按五个朝代名称机械记忆。'
  } },
  { id: 'later-zhou-reform', merge: {
    summary: '后周世宗柴荣整顿禁军、财政、寺院和地方行政并北伐南征，为北宋统一和中央集权提供直接制度与军事基础。',
    background: '后周建立后仍面对契丹、南方割据和禁军将领权力，柴荣需要把短期军人政权转为能够持续征税、训练和治理的国家。',
    process: '柴荣整顿军队、限制寺院土地、修订刑法和赋税，并先后攻后蜀、南唐、北汉，北伐契丹时病逝。',
    result: '后周中央军政能力明显增强，中原统一进程推进；幼主继位和禁军权力上升又为陈桥兵变留下机会。',
    impact: '柴荣改革解释了北宋为何能快速结束五代军人政权循环，也说明改革成果若缺少稳定继承仍可能被重新分配。'
  } },
  { id: 'sixteen-prefectures', merge: {
    summary: '石敬瑭借契丹力量建立后晋并割让燕云十六州，造成中原政权北方防线长期缺口，影响辽宋金元边疆格局。',
    background: '后唐内部继承和军镇冲突使石敬瑭寻求外援，契丹耶律德光需要扩大南下通道和政治影响，燕云地区成为交换核心。',
    process: '石敬瑭向契丹称臣并承诺割让燕云，契丹出兵助其灭后唐；后晋建立后，契丹控制长城南北若干战略州府。',
    result: '中原政权失去重要山地、关隘和骑兵资源，后晋与辽形成特殊臣属关系，后周、北宋长期尝试收复。',
    impact: '燕云十六州是宋辽边防和北宋“先南后北”战略的关键背景，也显示外交援助可能换来长期主权与安全成本。'
  } },
  { id: 'song-unification', merge: {
    summary: '宋太祖、宋太宗通过先南后北、受降与军事兼并统一中原和南方，结束五代十国主要割据，但燕云问题仍未解决。',
    background: '北宋建立后，南方仍有南唐、吴越、后蜀等政权，北方有北汉和辽朝。宋廷需要在财政有限的情况下确定统一次序。',
    process: '宋太祖先取荆南、后蜀、南汉和南唐，宋太宗继续灭北汉；对吴越采取纳土方式，对辽和燕云则暂时无法完成统一。',
    result: '北宋控制中原和南方大部，重建全国性文官、财政和交通体系，南北分裂的主要格局结束。',
    impact: '北宋统一为经济、城市、科举和文化繁荣提供空间，也因重文抑武、边防受限和燕云缺口留下长期安全压力。'
  } },
  { id: 'liao-founding', merge: {
    summary: '耶律阿保机统一契丹各部并建立辽朝，以草原部落、州县和南北面官制度统治多区域，改变北方政治格局。',
    background: '契丹部落在草原、森林和农牧交界处发展，唐末五代中原衰弱、幽燕地缘重要，为耶律阿保机整合各部提供机会。',
    process: '阿保机通过部落会盟、军事征服和政治继承统一契丹，建立皇帝制度并扩展到幽燕和东北，后继者继续完善南北面官。',
    result: '辽朝成为与中原后晋、北宋长期并立的北方帝国，形成兼顾草原和农耕地区的治理结构。',
    impact: '辽朝建立说明北方民族政权具有自身国家制度和多区域治理逻辑，不能只作为宋朝边患的附属背景。'
  } },
  { id: 'jin-founding', merge: {
    summary: '完颜阿骨打于1115年建立金朝，金军灭辽并南下，宋辽金三方格局转为金宋对峙。',
    background: '女真部落整合、辽朝衰落和宋朝联金灭辽的外交选择共同促成金朝崛起，北方军事平衡快速变化。',
    process: '阿骨打建国后击败辽军，金太宗时期攻取辽上京、中京和燕京；宋军随后与金发生领土和外交冲突。',
    result: '辽朝灭亡，金朝控制东北和燕云，北宋北方防线失去缓冲并最终遭遇靖康之变。',
    impact: '金朝建立连接辽亡、宋金战争和南宋建立，是理解北宋灭亡的关键前置事件。'
  } },
  { id: 'jingkang-incident', merge: {
    summary: '靖康之变中金军攻陷汴京、俘虏徽钦二帝和大量宗室，北宋灭亡，赵构南渡建立南宋。',
    background: '宋徽宗时期联金灭辽导致边防和外交失衡，金军南下时北宋军队、财政和朝廷决策已受到党争与军事准备不足影响。',
    process: '金军两次南下包围开封，宋廷割地、赔款和议和均未能阻止攻城；徽宗传位给钦宗后，二帝及宗室被俘北迁。',
    result: '北宋灭亡，宋室失去北方都城和主要领土，赵构在江南建立南宋，宋金长期战争开始。',
    impact: '靖康之变造成政治、人口、文化和心理创伤，推动南宋经济重心、抗金文学和国家认同重新形成。'
  } },
  { id: 'wang-anshi-reform', merge: {
    summary: '王安石在宋神宗支持下推行青苗、免役、市易、保甲和学校等新法，试图缓解北宋财政军政压力，却引发新旧党争和执行争议。',
    background: '北宋冗官、冗兵、冗费和边防压力加重，地方贫富、役法和国家财政关系紧张，士大夫对改革方向分歧明显。',
    process: '王安石进入中枢后推动新法，以国家信贷、役法改革、市场管理、保甲和教育提高国家动员；司马光等旧党反对，地方执行出现变形。',
    result: '部分财政和行政指标改善，国家对基层社会介入增强；新旧党争制度化，政策在神宗、哲宗和徽宗时期反复。',
    impact: '王安石变法是理解宋代国家能力、民间负担、党争和改革执行的典型案例，不能只用支持或反对二分。',
    disputeTabs: [
      { title: '国家能力视角', body: '新法提高财政、军政和基层行政组织能力，回应了北宋积贫积弱问题。' },
      { title: '社会负担视角', body: '地方官为完成指标可能强行放贷、催税或扩大征发，政策目标在基层执行中出现变形。' }
    ]
  } },
  { id: 'zizhi-tongjian', merge: {
    summary: '司马光主持《资治通鉴》编纂，以编年体记录战国至五代历史，强调从兴亡成败中提炼政治鉴戒。',
    background: '宋代皇帝和士大夫重视历史教育，国家档案、馆阁制度和印刷传播为大型史书编纂提供条件。',
    process: '司马光组织刘攽、刘恕、范祖禹等整理材料，以时间为线索编排事件，并通过考异、取舍和评论形成政治判断。',
    result: '《资治通鉴》完成后成为皇帝、士大夫和后世教育的重要历史读本，保存大量前代政治、战争和制度资料。',
    impact: '该书既是史学工程也是政治教育，读者需要区分史料保存、编纂选择和“以史为鉴”的价值判断。'
  } },
  { id: 'song-science', merge: {
    summary: '宋代科技在印刷、火药、指南针、天文、医药、数学和工程方面发展，商业、教育、军事和官僚需求共同推动知识传播。',
    background: '宋代城市和市场扩大，科举与学校需要书籍，边防战争需要火器和测量，国家水利、历法和交通又提供技术应用场景。',
    process: '沈括记录自然和工程知识，苏颂制作水运仪象台，毕昇改进活字印刷，农学、医药和海上导航技术在不同社会网络中传播。',
    result: '技术从工匠经验、官府工程和士人著述进入更广泛的出版、教育与生产体系。',
    impact: '宋代科技繁荣不能简单等同于现代工业化，其成就显示知识、市场、国家和军事的结合，也受材料与制度限制。'
  } },
  { id: 'song-jin-war', merge: {
    summary: '宋金战争贯穿北宋灭亡与南宋建立，岳飞、韩世忠等主战力量与宋高宗、秦桧的和战选择共同塑造绍兴和议。',
    background: '金朝南下、北宋灭亡后，南宋需要在恢复中原、保住江南和控制武将之间作出艰难选择。',
    process: '南宋军队在江淮、襄阳和黄天荡等地反击，岳飞在郾城大捷等战事中击退金军并收复部分失地；秦桧推动和议，宋高宗召回并杀害岳飞，双方达成绍兴和议。',
    result: '南宋获得相对稳定的江南政权，向金称臣、纳贡并以淮河和大散关一线划界，北方恢复目标暂时搁置。',
    impact: '宋金战争包含国家生存、武将权力、皇帝安全和民族记忆多重维度，岳飞评价应放在这一复杂结构中分析。'
  } },
  { id: 'yuan-founding', merge: {
    summary: '忽必烈以蒙古汗权、汉地官僚和行省制度建立元朝，1279年灭南宋后完成对中国大部的统一。',
    background: '蒙古帝国分裂与宗王竞争并存，忽必烈需要在草原政治和中原农业国家之间建立新的合法性与行政结构。',
    process: '忽必烈在开平和大都建立中枢，吸收耶律楚材等人的制度经验，设置行省、宣政院等机构并长期攻宋。',
    result: '元朝建立并灭南宋，形成覆盖草原、汉地、西域和江南的多区域帝国。',
    impact: '元朝统一扩大欧亚交通和人口流动，也产生族群等级、赋税、军户和地方治理等新的制度矛盾。'
  } },
  { id: 'yuan-science', merge: {
    summary: '元代授时历和科学工程体现国家对天文、历法、水利和数学的组织，郭守敬、王恂、许衡等形成跨领域合作。',
    background: '元朝幅员广大，统一时间、历法、漕运和水利对帝国行政十分重要，蒙古政权同时吸收中原、伊斯兰和多地区知识。',
    process: '郭守敬组织南北观测和仪器改进，王恂参与数学历算，许衡参与历法和制度解释，最终编制授时历。',
    result: '授时历成为元代国家时间标准，水利、天文和数学知识进入中央工程和官僚系统。',
    impact: '元代科学体现多族群帝国知识交流和国家工程动员，不应仅以单个人的发明成就来理解。'
  } },
  { id: 'yuan-drama', merge: {
    summary: '元曲和杂剧在城市商业、瓦舍勾栏、文人失意和多族群社会中发展，关汉卿、白朴、马致远等形成重要戏曲传统。',
    background: '元代科举中断或受限、城市娱乐业发达、民间艺人和文人交流增加，为戏曲从表演到文本传播提供空间。',
    process: '作家以历史、公案、爱情、社会冲突和神仙题材创作杂剧，演员、书会和城市舞台推动作品流传。',
    result: '元杂剧形成成熟的曲牌、角色和戏剧结构，元曲成为继唐诗宋词之后的重要文学形式。',
    impact: '元曲既有文人创作，也有商业演出和民间表达，保存了传统正史较少记录的市民生活与社会情绪。'
  } },
  { id: 'tumu-crisis', merge: {
    summary: '土木堡之变中明英宗亲征瓦剌被俘，北京面临都城危机，于谦拥立景泰帝并组织防御，明朝避免了立即覆亡。',
    background: '明英宗时期宦官王振影响军政，蒙古瓦剌崛起，明廷对边情和军粮判断失误，皇帝亲征使中央权力直接暴露于战场风险。',
    process: '明军深入宣府、大同后撤退，粮道和指挥混乱，瓦剌在土木堡包围并俘虏英宗；于谦等在北京整军、守城并拒绝迁都。',
    result: '英宗被俘，景泰帝即位，北京保卫战击退瓦剌，明朝中央政权和北方防线暂时稳定。',
    impact: '土木堡之变暴露宦官干政、皇帝亲征和边防指挥问题，也改变明代皇位与文官军事关系，后续夺门之变由此而来。'
  } },
  { id: 'yangming-learning', merge: {
    summary: '王阳明以心即理、致良知和知行合一建立心学体系，并在地方治理和宁王之乱中把思想转化为实际行动。',
    background: '明代中期程朱理学科举化、官僚党争和地方叛乱并存，士人开始反思只重经典注疏而缺少道德实践的问题。',
    process: '王阳明在龙场等经历中提出心学，随后讲学、治县、平定宁王并处理地方教化，把内在道德判断与现实行动结合。',
    result: '心学在明代士人和东亚传播，形成与程朱理学不同的修身、教育和政治实践路径。',
    impact: '阳明心学既是哲学思想，也是地方治理与军事行动经验的概括，后世对其自由、主观和秩序面向存在多种解读。'
  } },
  { id: 'anti-wokou', merge: {
    summary: '戚继光、俞大猷等整顿军队、训练新军和修筑海防，逐步平定明代东南倭患，维护沿海社会与贸易秩序。',
    background: '明代海禁、走私、地方贸易、海盗和日本商人活动交织，沿海卫所军队腐败，普通居民和商人同时受到倭患与官府控制影响。',
    process: '戚继光在浙江、福建训练戚家军，俞大猷等协同作战，明廷逐步调整海防、军饷和地方协防，最终击破主要倭寇集团。',
    result: '东南沿海大规模武装冲突减少，城寨、军队和地方社会秩序得到恢复，明廷重新获得海防主动。',
    impact: '抗倭战争包含海禁、贸易和军队改革问题，不能只写成中国军队与日本人的单一民族战争。'
  } },
  { id: 'ming-science', merge: {
    summary: '明代科技著述以李时珍、宋应星、徐霞客等为代表，重视药物、农业、工艺、地理和实地考察，体现晚明实学传统。',
    background: '明代商品经济、印刷出版、地方旅行和工农业发展积累大量经验，士人开始更多整理工匠、医者和地方社会知识。',
    process: '李时珍考察药材并编《本草纲目》，宋应星总结农业和手工业，徐霞客长期实地考察山川水系，知识通过书籍传播。',
    result: '医学、农学、工艺和地理著述形成综合性知识成果，晚明科学知识的社会覆盖面扩大。',
    impact: '明代科技成就不是现代实验科学的直接前身，但体现实地观察、分类、技术经验和印刷传播相结合。'
  } },
  { id: 'late-ming-western-learning', merge: {
    summary: '晚明西学东渐通过利玛窦、徐光启等人的翻译、天文和数学交流进入士人视野，形成中西知识相遇的重要阶段。',
    background: '全球海上贸易和传教网络扩展，明朝历法、火器和地理知识存在现实需求，耶稣会士通过澳门等地进入中国。',
    process: '利玛窦等学习汉语、传播地图、天文和数学，徐光启等与其合作翻译《几何原本》并参与历法和农业讨论。',
    result: '西方数学、天文、地理和宗教知识进入部分士人圈，明末知识结构出现新的比较与反思。',
    impact: '西学传播受到语言、宗教、礼仪和政治环境限制，但为清代历法、近代科学和中西文化交流提供前史。'
  } },
  { id: 'ming-fall', merge: {
    summary: '明朝灭亡由财政军政危机、明末农民战争、后金清军、地方军镇和朝廷决策失灵共同推动，1644年北京失守后政权转移。',
    background: '明末白银紧张、灾荒、辽东战争、军饷和党争叠加，崇祯帝试图整顿却缺少稳定财政、军队和政治支持。',
    process: '李自成攻入北京，崇祯帝自尽；吴三桂引清军入关，李自成败退，南明在多地延续抵抗，清朝逐步控制全国。',
    result: '明朝中央政权灭亡，清朝入关并建立新的多族群统治，南明和地方抗清战争持续多年。',
    impact: '明清鼎革需要同时理解内部财政社会危机、辽东战争、山海关决策和清朝制度整合，不能归为单一人物失误。'
  } },
  { id: 'qing-enters-pass', merge: {
    summary: '1644年多尔衮与吴三桂在山海关击败李自成军，清军入关并以顺治朝名义接管北京，明清鼎革进入全国战争阶段。',
    background: '李自成占领北京后未能稳定山海关和吴三桂，吴三桂在清军压力与自身利益之间选择引清入关，清廷抓住明朝中枢崩溃机会。',
    process: '多尔衮率八旗军与吴三桂联军在山海关击败大顺军，随后进入北京，以为明帝复仇、恢复秩序和承接中原正统争取地方官绅。',
    result: '清军控制北京和华北，顺治帝迁都北京，南明、农民军和地方抗清势力继续抵抗。',
    impact: '清军入关不是全国立即统一，而是军事征服、地方合作、制度吸收和长期战争的起点。'
  } },
  { id: 'high-qing', merge: {
    summary: '康熙、雍正、乾隆时期清朝疆域、人口和财政达到高峰，但土地压力、吏治腐败、白莲教和闭关政策也为后期危机积累条件。',
    background: '清朝完成统一、农业恢复和人口增长，中央皇权、八旗、绿营、督抚和理藩院共同维持多区域帝国。',
    process: '康熙巩固统一，雍正整顿财政吏治，乾隆扩大疆域并强化文化控制；后期和珅、军费、人口与土地矛盾逐渐显现。',
    result: '清朝形成盛世形象和广阔疆域，中央财政和官僚体系一度高效，但内在结构压力不断累积。',
    impact: '康乾盛世应同时观察发展成就与危机前史，不能把“盛世”理解为社会所有群体均衡受益。'
  } },
  { id: 'taiping-rebellion', merge: {
    summary: '太平天国运动由洪秀全宗教组织发展为大规模战争，冲击清朝统治并促成湘军、淮军和地方督抚权力上升。',
    background: '鸦片战争后清朝财政、地方治安和社会矛盾加重，广西多族群社会、土地压力、灾荒和宗教传播为起义提供条件。',
    process: '洪秀全建立拜上帝会，金田起义后攻占南京并建立天京；内部天京事变、地方军队和外国势力共同影响战争走向。',
    result: '曾国藩、李鸿章等地方军队镇压太平天国，清廷保住统治但地方军政和财政权力显著扩大。',
    impact: '太平天国既是社会反抗、宗教运动和军事政权，也直接推动洋务运动与晚清地方化，不能只按“农民起义”单线理解。'
  } },
  { id: 'self-strengthening', merge: {
    summary: '洋务运动以“自强”“求富”为目标，建设军工、海防、轮船、电报、铁路和新式教育，但未根本改变清朝政治财政结构。',
    background: '太平天国和第二次鸦片战争暴露清军装备与国家能力差距，曾国藩、李鸿章、左宗棠、张之洞等地方重臣推动技术和工业建设。',
    process: '清廷兴办江南制造总局、福州船政、轮船招商局、北洋海军和同文馆等项目，派遣留学生并引进机器、教习和新式教育。',
    result: '清朝形成近代军工、海防、工业和教育的局部基础，但项目分散、财政来源不稳、管理腐败和制度改革不足。',
    impact: '洋务运动既是中国近代化的重要起点，也暴露“只学技术、不改制度”的局限，甲午失败使改革方向受到根本质疑。'
  } },
  { id: 'hundred-days-reform', merge: {
    summary: '戊戌变法以光绪帝和康有为、梁启超等为核心，试图在百日内改革官制、教育、军事和经济，最终因慈禧太后与守旧集团反制失败。',
    background: '甲午战败和列强瓜分压力使清廷面临制度危机，维新派吸收日本明治和西方制度经验，寻求皇权自上而下改革。',
    process: '光绪帝连续发布变法诏令，涉及京官、学校、科举、军队和实业；袁世凯告密、慈禧太后发动政变，康梁出逃、谭嗣同等被杀。',
    result: '大部分新政措施被废止，光绪帝被控制，维新派政治路线失败，但教育、报刊和制度改革思想继续传播。',
    impact: '戊戌变法的失败既与慈禧和守旧集团有关，也与改革过快、缺少军政组织和地方支持有关。'
  } },
  { id: 'boxer-protocol', merge: {
    summary: '义和团运动和八国联军入侵造成清廷逃亡与辛丑条约，赔款、驻兵和外交主权受限，清末新政由此加速。',
    background: '甲午后列强竞争、教案、地方灾荒和排外情绪叠加，义和团以扶清灭洋等口号扩张，清廷内部对镇压或利用态度摇摆。',
    process: '义和团进入京津，清廷对外宣战，八国联军攻占北京，慈禧和光绪西逃；清廷与列强签订辛丑条约。',
    result: '清廷承担巨额赔款、拆除防御和允许外国驻兵等条件，中央财政与主权进一步受损。',
    impact: '庚子事变推动清末新政、教育改革和新军建设，也加深民众对清廷和列强的政治不信任。'
  } },
  { id: 'xinhai-revolution', merge: {
    summary: '辛亥革命由武昌起义引发各省独立，革命党、清廷、袁世凯和地方军政力量共同推动清帝退位与中华民国建立。',
    background: '清末新政未能解决财政、民族、军队和地方权力问题，铁路国有化、保路运动和革命组织使危机迅速扩散。',
    process: '武昌起义后各省响应，孙中山回国任临时大总统，南北谈判由袁世凯促成清帝退位，临时政府迁往北京。',
    result: '清朝灭亡，中华民国建立，中国两千多年君主专制制度结束；但中央与地方军政、政党和宪政关系仍未稳定。',
    impact: '辛亥革命完成王朝终结却未立即完成国家现代化，革命、共和、军阀和社会改革之间的矛盾延续到民国时期。'
  } },
  { id: 'yu-control-floods', merge: {
    summary: '大禹治水是中国早期国家形成的重要传说，核心叙事从单纯堵水转向疏导、组织劳动力和建立共同秩序。',
    background: '黄河洪水、农业定居和部落联盟需要跨区域协调，早期社会把治水记忆与首领权威、土地分配和祭祀秩序联系起来。',
    process: '传统叙事中禹继承鲧的治水任务，采用疏导河道、分区治理和长期巡行方式，并借助诸侯与部落共同劳作。',
    result: '洪水治理被解释为禹获得领导权和建立夏朝合法性的基础，治水从自然工程转为政治组织能力的象征。',
    impact: '该事件带有传说时代标签，不能按现代工程史逐项核实，但反映早期国家如何把公共工程、首领权威和社会协作结合。'
  } },
  { id: 'xia-founding', merge: {
    summary: '夏朝建立与世袭传说反映禹、启时期从部落联盟推向王位世袭和早期国家的历史记忆，具体年代与细节存在史实边界。',
    background: '早期社会需要稳定继承、祭祀、土地和治水组织，禹的权威与启的继承在传统叙事中构成禅让向世袭转变。',
    process: '传说中禹原拟让位贤者，启继位后建立夏后氏统治，伯益、地方部落和王权之间发生权力重新分配。',
    result: '夏被视为中国早期王朝之一，王位世袭和宗族政治成为后世王朝叙事的重要起点。',
    impact: '夏朝早期材料主要来自后世文献与考古讨论，应使用“传说时代”“约”标签，不把完整世系当作已完全证实的编年史。'
  } },
  { id: 'shang-overthrows-xia', merge: {
    summary: '商汤灭夏是传统王朝更替叙事，强调商汤、伊尹以民心和德治名义推翻夏桀，具体过程带有后世政治伦理塑造。',
    background: '夏末统治形象、商族崛起、诸侯联盟和农业资源变化共同构成商周以前的政治竞争，商汤需要将军事行动解释为正当替代。',
    process: '商汤在伊尹等人协助下扩大商族影响，联合或吸收诸侯，最终击败夏桀并建立商朝。',
    result: '商朝建立，汤伐桀成为“以德代暴”和天命转移的早期典型。',
    impact: '该事件有明显传统叙事和史实存疑边界，但长期影响了中国政治文化中的革命、天命与民心观念。'
  } },
  { id: 'rebellion-seven-states', merge: {
    summary: '七国之乱是汉景帝时期诸侯王反抗削藩的战争，周亚夫等平叛后中央集权加强，汉武帝推恩令得以进一步削弱诸侯。',
    background: '汉初分封诸侯王拥有土地、官吏和军队，景帝与晁错希望削弱王国，吴王刘濞等担心利益和安全受到威胁。',
    process: '吴楚等七国以诛晁错、清君侧为名起兵，叛军控制部分江淮地区；景帝杀晁错后仍命周亚夫等集中兵力平叛。',
    result: '七国叛乱失败，诸侯军事与行政权被削弱，中央对郡国的控制增强。',
    impact: '七国之乱说明分封与中央集权之间存在结构性矛盾，汉代帝国最终通过削权而非立即废除分封解决问题。'
  } },
  { id: 'yellow-turban', merge: {
    summary: '黄巾起义由张角太平道组织发动，冲击东汉中央并促使州牧、豪强和军阀扩张，三国时代的政治军事格局由此加速形成。',
    background: '东汉末土地兼并、灾荒、疫病、赋役和宦官外戚斗争加剧，太平道通过治病、互助和末世信仰形成基层网络。',
    process: '张角以天公将军等组织号召起义，黄巾军在多地同时行动；东汉廷调动地方豪强和州郡军队镇压，中央军权下沉。',
    result: '黄巾军被逐步击败，但董卓、曹操、刘备等地方军事力量崛起，东汉中央失去对地方军政的垄断。',
    impact: '黄巾起义是东汉衰亡的重要加速器，既是社会反抗，也是宗教组织和地方军政化共同作用的结果。'
  } },
  { id: 'red-cliffs', merge: {
    summary: '赤壁之战中曹操南下与孙权、刘备联盟对峙，曹军败退后长江成为三国分界，荆州与联盟关系成为后续争夺核心。',
    background: '曹操统一北方后希望控制荆州和江东，刘备寻求根据地，孙权则必须在降曹与抗战之间选择，长江水网和疫病影响北方军队。',
    process: '周瑜、鲁肃等推动孙刘联盟，黄盖诈降和火攻等传统叙事与曹军水土不服、后勤困难共同造成败局。',
    result: '曹操退回北方，孙权保住江东，刘备获得荆州发展空间，三国鼎立的军事地理基础形成。',
    impact: '赤壁不是三国鼎立唯一原因，曹操北方资源、刘备入蜀和孙吴江防同样重要；事件也应区分史实与《三国演义》文学加工。'
  } },
  { id: 'grand-canal', merge: {
    summary: '隋炀帝时期大运河连接海河、黄河、淮河、长江和钱塘江水系，服务漕运、军队、都城和南北经济交流，也加重隋末徭役压力。',
    background: '隋统一南北后，政治中心在北方而粮食和财富重心逐渐南移，国家需要稳定运输和军政调度网络。',
    process: '隋朝分段开凿和整修通济渠、永济渠、江南河等水道，征发大量民夫并设置仓储、船运和沿线管理。',
    result: '南北水运和人员交流大幅加强，洛阳、江都和运河沿线城市地位上升，唐宋以后继续利用并维护。',
    impact: '大运河同时是长期基础设施和隋末高压工程，评价应兼顾国家整合收益、地方经济与民众负担。'
  } },
  { id: 'zhenguan-rule', merge: {
    summary: '贞观之治以唐太宗纳谏、用人、修律、轻徭薄赋和边疆整合为代表，形成唐初从军事集团转向官僚国家的治理样板。',
    background: '唐太宗吸取隋亡教训，面对开国功臣、宗室、地方行政、财政恢复和突厥等边疆压力，需要建立稳定决策与执行机制。',
    process: '房玄龄、杜如晦、魏征等参与中枢，唐廷修订律令、整顿户籍和赋役、限制宫室开支，并以李靖等经营北方边疆。',
    result: '人口、财政和行政秩序逐步恢复，唐朝中央权力和对外影响增强，后世将其概括为贞观之治。',
    impact: '贞观之治带有后世理想化，但制度整合、纳谏和社会恢复具有历史基础，也不能忽视玄武门之变和军事扩张。'
  } },
  { id: 'wu-zhou', merge: {
    summary: '武周政治是武则天从皇后、太后到皇帝的权力转型，重组关陇贵族与新进官僚关系，延续唐代国家并扩大女性政治权力。',
    background: '唐高宗疾病、外戚和宗室竞争、皇位继承以及官僚集团变动，为武则天参与并最终掌握最高权力提供条件。',
    process: '武则天以皇后、太后身份参与决策，任用狄仁杰等官员并使用监察、告密和科举，690年改唐为周，705年后唐复辟。',
    result: '武周维持唐代行政、财政和文化体系，同时改变皇权、人事和政治集团结构。',
    impact: '武周说明王朝名称变化与国家制度连续性可以并存，评价武则天需要同时观察政治能力、女性权力和高压治理。'
  } },
  { id: 'kaiyuan-prosperity', merge: {
    summary: '开元盛世是唐玄宗前期整顿吏治、财政、军事和城市文化的高峰，姚崇、宋璟等宰相的治理为繁荣提供制度条件。',
    background: '武周复唐后政治需要重新稳定，唐玄宗早期重用能臣、整顿官僚和恢复财政，长安、洛阳与丝路贸易继续繁荣。',
    process: '姚崇、宋璟等推动清吏治、减轻扰民和整顿户籍，唐朝扩大边疆、发展交通与文化，但后期宰相更替和边镇坐大改变局势。',
    result: '人口、财政、军力、城市和文学达到盛唐高峰，唐朝国际影响显著增强。',
    impact: '开元盛世与安史之乱相连，盛世成就和后期制度风险应放在同一条因果链中理解。'
  } },
  { id: 'an-shi-rebellion', merge: {
    summary: '安史之乱由安禄山、史思明发动，唐廷依靠郭子仪、李光弼和外援平定，但藩镇、宦官、财政和边防结构从此长期改变。',
    background: '唐玄宗后期边镇节度使掌握军队和财赋，中央对军镇监督下降，宫廷权力、杨国忠与安禄山冲突进一步激化。',
    process: '安禄山攻占洛阳、长安，唐玄宗入蜀，肃宗在灵武即位；唐军联合回纥等力量反攻，史思明继续作乱，763年基本平定。',
    result: '唐朝保住名义统一但人口、财政和城市经济受重创，藩镇割据、宦官掌军和两税法等后续变化加速。',
    impact: '安史之乱是唐由盛转衰的关键节点，但衰落并非一夜发生，边镇、税制、人口和中央地方关系的长期变化同样重要。'
  } },
  { id: 'renzong-era', merge: {
    summary: '宋仁宗时期文官政治、科举、古文和城市文化高度活跃，范仲淹、欧阳修、包拯和苏轼等人物共同构成北宋政治文化背景。',
    background: '刘太后临朝后仁宗亲政，北宋经济和文化发展，但财政、军备、边患和官僚冗费问题逐步显现。',
    process: '朝廷通过科举、馆阁、庆历新政、宋夏战争与澶渊后秩序处理国家问题，士大夫以奏议、文章和地方治理参与公共政治。',
    result: '北宋文化和文官制度达到高峰，改革议题积累并最终在宋神宗时期转化为熙宁变法。',
    impact: '仁宗时代的“宽仁”与财政军事压力并存，理解宋代文化繁荣不能脱离国家治理成本。'
  } },
  { id: 'neo-confucianism', merge: {
    summary: '宋代理学从周敦颐、二程发展到朱熹，围绕天理、心性、格物和秩序重建儒学，深刻影响教育、科举与社会伦理。',
    background: '佛道思想、科举文官政治和宋代社会变迁促使士人重新解释儒家经典，寻找超越王朝兴亡的道德与秩序基础。',
    process: '周敦颐、程颢、程颐等讨论理气心性，朱熹编定四书章句并通过书院、讲学和弟子网络传播，陆九渊提出心学方向。',
    result: '理学成为宋元明清教育、科举和社会伦理的重要思想资源，儒学重新获得系统哲学和教育制度地位。',
    impact: '理学既包含自我修养和公共责任，也可能被国家和宗族制度化为等级规范，评价时需要区分思想原貌与后世使用。'
  } },
  { id: 'ming-founding', merge: {
    summary: '朱元璋在元末起义和群雄竞争中胜出，1368年建立明朝，以户籍、里甲、卫所和皇权制度重建统一国家。',
    background: '元末灾荒、赋役、红巾军和地方军阀造成秩序崩溃，朱元璋以江南为基地建立军政、粮税和文官体系。',
    process: '朱元璋先后击败陈友谅、张士诚等对手，北伐攻入大都，随后以户籍、军卫、科举和六部制度整合新王朝。',
    result: '明朝建立并控制中原和江南，元朝退出中原，新的皇权和基层国家体系形成。',
    impact: '明朝建立既是军事统一，也是基层户籍、土地、赋役和官僚制度重建；洪武高压政治与后续制度运行同样值得观察。'
  } },
  { id: 'zheng-he-voyages', merge: {
    summary: '郑和在明成祖支持下率大型船队七下西洋，兼具朝贡外交、贸易、军事威慑、港口交流和海上地理探索意义。',
    background: '永乐皇帝需要展示明朝国威、寻找建文帝线索并恢复海上朝贡网络，明代造船、航海和财政组织提供远航条件。',
    process: '郑和船队经东南亚、印度洋、阿拉伯海到达东非，与沿岸政权交换使节、礼物和商品，并处理海上安全与地方冲突。',
    result: '明朝与印度洋沿岸建立持续外交记忆，海上交通、物产和地理知识扩展，但长期财政收益与国家成本存在争论。',
    impact: '郑和下西洋不等同现代殖民扩张，也不是单纯贸易远航，而是明代皇权、朝贡体系和海上技术的综合行动。'
  } },
  { id: 'opium-war', merge: {
    summary: '鸦片战争由清廷禁烟、英国贸易利益和工业化海军压力共同引发，南京条约打破传统对外秩序并开启中国近代危机。',
    background: '鸦片输入造成白银外流、官场腐败和社会问题，清廷维护禁烟与朝贡秩序，英国商人和政府要求扩大贸易与外交权利。',
    process: '林则徐赴广东收缴销毁鸦片，英国远征军凭海军和火器沿海北上，清军地方防务不一，清廷被迫议和。',
    result: '清政府签订南京条约，开放通商口岸、割让香港并支付赔款，传统对外关系和关税主权受到冲击。',
    impact: '鸦片战争是中国近代史开端之一，但近代转型还包括太平天国、洋务、思想变化和全球工业体系冲击。'
  } },
  { id: 'pan-geng-moves-yin', merge: {
    summary: '盘庚迁殷是商王盘庚把政治中心迁到殷的重大决策，稳定了商后期王权、祭祀和资源组织，也为甲骨文与殷墟文化留下集中材料。',
    background: '商王朝内部存在贵族、宗族和祭祀中心的竞争，频繁迁都可能与水患、资源、政治控制和王室联盟有关，具体动因仍需结合考古与文献判断。',
    process: '盘庚说服或强制贵族与民众迁移，在新都重建宫室、祭祀和行政网络，利用商王祖先祭祀强化王权的连续性。',
    result: '殷成为商后期长期都城，王室对方国、贵族和农业生产的控制趋于稳定，后世考古发现丰富了对商代社会的认识。',
    impact: '迁都不是单纯地理移动，而是王权、宗族、祭祀、生产和政治中心重组。盘庚时期的具体年代和迁都次数存在不同推定。'
  } },
  { id: 'wu-ding-revival', merge: {
    summary: '武丁中兴是商王武丁时期对外征伐、贵族整合和祭祀甲骨记录共同呈现的商代强盛阶段，妇好等人物也出现在相关材料中。',
    background: '商王需要处理方国冲突、土地与人口获取、王室祭祀和贵族权力平衡。甲骨卜辞记录了战争、疾病、农业、天气和祭祀等国家事务。',
    process: '武丁任用傅说等重臣，组织对土方、羌方等势力的军事行动，并通过祭祀、赏赐、婚姻和俘获人口维系王室网络。',
    result: '商王权威和控制范围扩大，殷墟甲骨文成为观察商代政治、战争和社会结构的核心史料。',
    impact: '“中兴”带有后世概括色彩，不能只按后世帝王功业叙事理解；商代国家同时依赖祭祀、战争、贵族网络和农业生产。'
  } },
  { id: 'western-zhou-fall', merge: {
    summary: '西周灭亡与平王东迁发生在王室权威、诸侯势力、犬戎压力和宫廷继承冲突叠加的背景下，东周由此开始。',
    background: '周幽王废立太子、褒姒故事和申侯联络外族的记载带有史家叙事色彩；更深层原因包括王室控制力下降、诸侯坐大和西部边患。',
    process: '周幽王时期政治联盟破裂，犬戎等力量攻入镐京，周平王在诸侯支持下迁都洛邑，西周王室转为依赖诸侯保护。',
    result: '周朝名义延续但政治中心东移，王室土地、军队和号令能力下降，春秋时期诸侯争霸的条件形成。',
    impact: '平王东迁不是周朝立即灭亡，而是从西周宗法分封秩序转向东周诸侯竞争的分水岭；褒姒亡国故事不应替代制度和地缘分析。'
  } },
  { id: 'wenjing-rule', merge: {
    summary: '文景之治指汉文帝、汉景帝时期减轻赋税徭役、恢复经济、节制宫室并平定诸侯问题后形成的长期稳定局面。',
    background: '汉初经历秦末战争和楚汉战争，人口、土地、财政与基层秩序受损，统治者需要降低治理成本并恢复农业生产。',
    process: '文帝实行较低田租、重视节俭和刑罚调整，景帝继续轻徭薄赋并通过削藩引发七国之乱，周亚夫等将其平定。',
    result: '国家粮仓和财政逐渐充实，人口恢复，中央对诸侯王控制增强，为汉武帝时期的制度扩张和对外战争准备了资源。',
    impact: '文景之治是后世概括，既包含民生恢复，也包含削藩战争和中央集权加强；“无为”并不等于政府完全不作为。'
  } },
  { id: 'han-wu-reforms', merge: {
    summary: '汉武帝时期通过察举、太学、盐铁官营、均输平准、推恩令和独尊儒术等政策强化中央集权，国家动员能力显著提升。',
    background: '文景时期积累的财政资源、诸侯王问题、匈奴威胁和帝国疆域扩张，要求汉廷建立更稳定的官僚、思想和财政工具。',
    process: '汉武帝任用董仲舒、桑弘羊等人，设太学、改官制、推恩削藩，实行盐铁专卖和均输平准，并以武力经营河西、朝鲜和西域。',
    result: '皇帝对地方、财政、思想和军事的控制增强，汉朝疆域和国际影响扩大，但赋税、徭役、战争成本和社会压力同步上升。',
    impact: '汉武帝政策是国家能力扩张与民众负担增加的统一过程，不能只称为“盛世”，也要看到轮台诏等后期反省。'
  } },
  { id: 'han-xiongnu-war', merge: {
    summary: '汉匈战争是汉朝与匈奴围绕草原牧地、河西走廊、边疆人口和贸易路线展开的长期冲突，经历和亲、防御、反击和重新议和。',
    background: '匈奴拥有机动骑兵和草原联盟，汉朝则依托农业人口、城塞、马政和财政组织。边境袭扰、贸易需求和诸侯王问题共同推动冲突升级。',
    process: '汉初采用和亲与边境贸易，汉武帝时期派卫青、霍去病远征并夺取河西，设郡置县；昭帝、宣帝时期通过军事、外交和质子关系重新调整。',
    result: '汉朝控制河西走廊并连接西域，匈奴内部发生分裂，边疆行政、屯田和交通网络扩大，但战争与军费造成长期负担。',
    impact: '汉匈关系不是单向征服史，而是战争、贸易、婚姻、人口流动和政治联盟的长期互动，对中华帝国边疆观念影响深远。'
  } },
  { id: 'silk-road', merge: {
    summary: '张骞通西域及丝绸之路是汉朝打通河西、联络西域、发展使节和贸易网络的过程，连接了中亚、南亚和更远地区。',
    background: '汉廷希望联合大月氏夹击匈奴，也需要获得良马、掌握西域地理和稳定河西交通。张骞出使经历被俘与长期滞留后返回，带回了重要信息。',
    process: '汉军控制河西后设置郡县和驿站，张骞等使者往来西域，汉朝与乌孙、大宛等政权建立外交和军事联系，商旅随之增加。',
    result: '长安经河西、天山南北通向中亚的交流线路逐渐形成，马匹、葡萄、音乐、佛教和工艺等物质与观念开始更广泛流动。',
    impact: '“丝绸之路”是现代概念，古代路线并非单一固定道路；它既包括国家使节，也包括商人、移民、俘虏和宗教传播者。'
  } },
  { id: 'three-kingdoms-formation', merge: {
    summary: '三国鼎立形成是东汉瓦解后曹魏、蜀汉、孙吴在北方、汉中益州和江东长江流域分别建立稳定政权的过程。',
    background: '黄巾起义、董卓之乱和州牧军阀化削弱东汉中央，曹操控制北方，刘备经营益州，孙权继承江东并依托长江水军。',
    process: '官渡之战后曹操统一北方，赤壁之战阻止其南下；刘备入蜀并据汉中，孙权巩固江东，曹丕代汉、刘备称帝和孙权称吴完成政权分立。',
    result: '魏、蜀、吴形成相对稳定的区域政治格局，三方通过战争、外交、屯田、军镇和人口迁移维持国家竞争。',
    impact: '三国鼎立不是某一场战役单独造成的结果，地理屏障、人口资源、军队组织与联盟破裂共同决定了分立格局。'
  } },
  { id: 'sima-usurpation', merge: {
    summary: '司马氏掌权与晋代魏是曹魏后期司马懿、司马师、司马昭通过政变、军政控制和代魏程序建立西晋的过程。',
    background: '曹魏皇帝年幼、曹爽与司马氏争权，中央禁军、地方军镇和士族官僚之间存在权力竞争，蜀汉和孙吴的外部压力也使军权重要。',
    process: '司马懿发动高平陵之变清除曹爽集团，司马师、司马昭继续控制中枢，灭蜀后司马炎受禅建立西晋。',
    result: '曹魏皇权被司马氏取代，西晋继承北方军政资源，并在280年灭吴完成短暂统一。',
    impact: '司马氏代魏体现三国后期士族、军权和皇权关系变化；“篡位”与“禅让”是不同政治叙事，需同时标注权力事实与合法性表达。'
  } },
  { id: 'song-culture', merge: {
    summary: '宋代文化繁荣以科举扩张、印刷传播、城市商业、理学、词曲、绘画、史学和科技发展为特征，文官社会与市场经济共同塑造了文化生态。',
    background: '宋朝重文抑武、科举规模扩大，城市人口和商业网络增长，雕版印刷与书院传播知识；财政、军费和边疆压力又持续限制国家资源。',
    process: '士人通过科举、馆阁、书院和地方社交网络创作文章、词、史书与理学著作，活字印刷、火药、指南针、天文和医学等知识得到发展。',
    result: '读书人、城市市民、商人和工匠在不同层面参与文化生产，宋代成为中国古代教育、出版、科技和文学的重要高峰。',
    impact: '“文化繁荣”不能等同于全社会平等受教育，女性、农民和基层工匠的知识传播方式不同；宋代繁荣也与国家财政和社会竞争成本并存。'
  } },
  { id: 'zhang-juzheng-reform', merge: {
    summary: '张居正改革是明代万历初年围绕考成法、清丈土地、一条鞭法和边防财政展开的中央整顿，试图缓解积弊并提高国家动员能力。',
    background: '嘉靖后期财政亏空、边防军饷、官僚懈怠和土地隐漏加剧，年幼万历帝即位后，张居正依托太后与内阁权力推动改革。',
    process: '张居正以考成法督促官员，以清丈田粮摸清税源，推广一条鞭法把部分赋役折银并统一征收，同时整顿边防和驿递。',
    result: '改革前期改善了财政、官僚执行和边防供应，但地方落实不均，张居正死后其家产与政策遭清算，部分措施出现反复。',
    impact: '张居正改革体现晚明国家试图以行政和财政工具自救，也暴露首辅个人权力、皇权继承和地方社会承受能力之间的矛盾。'
  } },
  { id: 'kangxi-consolidation', merge: {
    summary: '康熙巩固统一包括清除鳌拜、平定三藩、收复台湾、处理沙俄边界和对准噶尔经营，使清朝从入关政权转为多区域帝国。',
    background: '清初存在摄政权力、三藩割据、郑氏台湾、蒙古诸部与沙俄扩张等问题，汉地财政和八旗、绿营军制需要重新整合。',
    process: '康熙亲政后清除鳌拜，1673年后平定三藩，派施琅收复台湾并设府治理；雅克萨之战后通过尼布楚条约处理东北边界，并多次亲征噶尔丹。',
    result: '中央对内地、台湾和东北边疆的控制加强，理藩院、八旗、绿营和地方督抚共同构成清代多族群治理结构。',
    impact: '康熙时期的统一既靠战争也靠制度、盟誓、贸易和地方行政；疆域形成过程复杂，不能只用现代民族国家边界倒推。'
  } },
  { id: 'eastern-han-western-regions', merge: {
    summary: '班超以军事、外交和地方联盟经营西域，恢复东汉在塔里木盆地及其周边的影响，并为甘英等人的西行提供政治和交通条件。',
    background: '东汉重建后，西域各国受匈奴、贵霜和地方城邦力量牵制，汉廷需要在有限军费下维持河西走廊、使节通道和边疆安全。',
    process: '班超先以使节和少量兵力联络鄯善、于阗等国，随后控制疏勒、龟兹等关键节点，并依托都护、屯田和地方盟友维持交通；甘英奉命西行至条支附近。',
    result: '东汉重新建立对西域部分地区的政治影响，丝路使节和商旅通道得以延续，西域都护体系成为边疆治理的重要经验。',
    impact: '班超经营西域不是单纯远征，也不是东汉永久控制整个中亚，而是军事威慑、地方合作、贸易和信息网络的组合。具体控制范围随汉廷财政与地方局势变化。'
  } },
  { id: 'qing-institutions', merge: {
    summary: '雍正制度整顿通过军机处、摊丁入亩、耗羡归公、官员考成和改土归流，强化清朝中央财政、行政监督与西南边疆治理。',
    background: '康熙晚年人口增长、财政亏空、地方火耗、官员失察和皇位继承问题并存，清廷需要把疆域统一转化为可持续的税收和行政能力。',
    process: '雍正通过密折和考成追究官员责任，推进摊丁入亩与耗羡归公，设立军机处处理军政机密，并在鄂尔泰等人主持下扩大改土归流。',
    result: '中央获得更直接的财政和信息渠道，地方官员考核与赋役征收趋于制度化，西南部分地区纳入流官、赋税和驻军体系。',
    impact: '雍正改革提升了清朝治理效率，也强化皇帝个人控制和高压行政；改土归流会改变地方权力、土地和族群秩序，不能只写成单向进步。'
  } },
  { id: 'sino-japanese-war', merge: {
    summary: '甲午中日战争中清军和北洋海军败于日本，马关条约带来割地赔款与列强竞争，洋务路线和晚清制度改革受到根本质疑。',
    background: '朝鲜宗主权、东亚秩序和日本明治国家扩张构成直接矛盾；清朝地方督抚分权、军费结构和海军建设不均，也削弱了全国动员。',
    process: '朝鲜局势升级后中日交战，日军控制平壤并渡海进攻辽东，黄海海战后北洋海军退守威海卫，清廷最终议和并签订马关条约。',
    result: '清朝割让台湾、澎湖并承认朝鲜独立、支付巨额赔款，列强掀起瓜分中国的竞争，清廷财政和社会危机进一步加深。',
    impact: '甲午战败暴露的不只是装备差距，也包括国家财政、军队统属、工业基础和政治制度问题，直接推动维新、革命和新政思潮。邓世昌的牺牲应与整体军政结构一并理解。'
  } },
  { id: 'mozi-thought', merge: {
    summary: '墨家思想形成于战国社会，墨子及其后学提出兼爱、非攻、尚贤、尚同、节用等主张，并以组织纪律和实用技术回应战争与等级秩序。',
    background: '诸侯争霸、城郭攻守、人口流动和贵族礼制变化，使普通工匠、士和下层群体寻找新的政治伦理。墨家与儒、道、法等学派共同参与百家争鸣。',
    process: '墨子批评贵族礼乐的奢侈和以强凌弱，提出兼爱与非攻，并讨论国家命令、贤能任用、节葬节用和守城技术；后学继续整理逻辑、自然和军事知识。',
    result: '墨家成为战国显学，形成跨地区的师徒与组织传统，兼有思想、伦理、政治和技术实践特征，后期逐渐被儒法国家体系边缘化。',
    impact: '兼爱并非简单的无差别情感口号，非攻也不等于完全否定防卫战争。墨家思想展示了战国社会对战争、资源和政治合法性的另一种回答。'
  } },
  { id: 'yiling-battle', merge: {
    summary: '夷陵之战中刘备率蜀军伐吴，陆逊采取持久防御和火攻反击，蜀军大败，孙吴保住长江上游和江东安全。',
    background: '关羽失荆州和孙吴袭取荆州使蜀吴联盟破裂，刘备需要回应关羽之死并争夺长江战略空间，孙权则必须避免蜀军深入江东。',
    process: '刘备沿长江东进并在山地扎营，吴军初期避免决战，陆逊观察蜀军疲惫和营垒分散后发动火攻，蜀军撤退至白帝城。',
    result: '蜀汉精锐和将领损失严重，刘备不久病逝；孙吴缓解西线压力，随后与蜀汉重新修复外交关系以共同对抗曹魏。',
    impact: '夷陵既是军事败局，也是联盟政治和荆州归属问题的后果。陆逊的胜利不能只归功火攻，蜀军补给、地形、季节和吴蜀关系同样关键。'
  } },
  { id: 'zhenguan-ministers', merge: {
    summary: '贞观名臣政治以唐太宗任用魏征、房玄龄、杜如晦、长孙无忌等为代表，形成中书门下协作、纳谏、修律和边疆经营的初唐治理样板。',
    background: '唐初经历隋末战争和玄武门之变，人口、赋役、官僚与宗室关系需要重建；唐太宗必须让功臣、旧臣、山东士族和关陇集团共同进入国家秩序。',
    process: '房玄龄、杜如晦负责中枢谋划，魏征等以谏诤纠正决策，朝廷修订律令、整顿户籍赋役，并由李靖等处理突厥和西北边疆。',
    result: '唐朝行政、财政和社会秩序逐渐恢复，皇帝与宰相、谏官之间形成后世称道的协同模式，唐初对外影响扩大。',
    impact: '贞观名臣政治并非没有高压和权力斗争，玄武门之变、对外战争和皇权集中同样存在。纳谏是制度与个人风格共同作用的结果。'
  } },
  { id: 'jianzhen-east-voyage', merge: {
    summary: '鉴真历经多次尝试东渡日本，终于在唐天宝年间抵达日本，传播戒律、寺院制度、医学和唐代文化，是中日交流的重要事件。',
    background: '日本僧人荣睿、普照来唐求戒，唐代扬州和江南佛教网络为邀请高僧提供条件；海上航行、政治阻拦、风暴和视力受损使东渡反复受挫。',
    process: '鉴真组织弟子、工匠和经卷多次出海，最终经海南、明州等路线抵达日本，在奈良建立戒坛并参与唐招提寺建设，传授律学和医药知识。',
    result: '日本获得较系统的戒律传承、寺院建筑、雕塑、书法和医学知识，鉴真及其团队成为唐代文化跨海传播的代表。',
    impact: '鉴真东渡是宗教、技术、人员和文本共同移动的过程，不是单向文化输出；参与者包括日本求法僧、唐朝僧侣、工匠和地方港口社会。'
  } },
  { id: 'chanyuan-treaty', merge: {
    summary: '澶渊之盟是宋辽战争后达成的和议，约定宋向辽输送岁币、双方维持边界与外交秩序，形成百余年相对稳定的宋辽关系。',
    background: '辽圣宗与萧太后南下希望扩大边境利益，北宋边防和财政承受压力；宋真宗亲征、寇准主战与辽军后勤困难共同改变谈判条件。',
    process: '辽军抵达澶州后，宋真宗在寇准等推动下亲临前线稳定军心，宋辽使者谈判并确定岁币、称兄弟和边境互不侵扰等安排。',
    result: '宋辽停止大规模战争，边境贸易和人员往来增加，北宋获得北部相对安全，辽获得稳定岁币与南方贸易利益。',
    impact: '澶渊之盟既不是北宋单纯屈辱，也不是辽国完全胜利，而是双方在军事、财政、国内政治和边贸利益之间的妥协。岁币成本与和平收益需要同时评估。'
  } },
  { id: 'qingli-reform', merge: {
    summary: '庆历新政是宋仁宗时期范仲淹、富弼、欧阳修等人围绕官员考核、选任、学校、贡举和边防提出的短期改革方案。',
    background: '宋夏战争和财政压力暴露冗官、冗兵、冗费问题，士大夫又希望改善选官与地方治理，仁宗亲政后给改革派提供政策窗口。',
    process: '范仲淹提出十事，涉及明黜陟、抑侥幸、精贡举、择长官和均公田等，改革触动既有官僚利益，反对意见与政治流言迅速积累。',
    result: '新政在数年内陆续收缩，范仲淹等被调离，但整顿吏治、学校和财政的议题延续到王安石熙宁变法。',
    impact: '庆历新政的失败不是改革思想毫无价值，而是中枢支持、官僚联盟、财政方案和执行周期不足。它展示北宋士大夫政治中改革与党争的早期形态。'
  } },
  { id: 'song-literary-network', merge: {
    summary: '北宋古文与士大夫网络由欧阳修倡导并由曾巩、王安石、苏轼等人发展，文章、科举、荐举和政治交往共同推动文风革新。',
    background: '宋代科举扩大、印刷传播和文官政治兴盛，唐末以来的骈文传统与现实政务需求之间出现张力，士人需要更直接的议论和公共表达。',
    process: '欧阳修在科举、馆阁和地方任官中提携后进，提倡平易有用的古文；曾巩、王安石、苏轼等形成不同文体和政治立场，文章通过文集、书院和考试传播。',
    result: '古文成为科举、政论和史学的重要表达方式，士大夫网络扩大，文学声望与政治资源、荐举关系和党争彼此交织。',
    impact: '北宋古文运动并非单纯文体复古，也不等于所有文人政治立场一致；它把写作、教育、官僚责任和公共讨论连接起来。'
  } },
  { id: 'huangtiandang-battle', merge: {
    summary: '黄天荡之战是南宋初年韩世忠率水军在长江下游阻击金军的重要战事，显示江南水网和水军可以限制金军骑兵优势。',
    background: '金军渡江南下后，宋高宗政权尚未稳定，韩世忠在江阴、镇江和黄天荡一带组织水陆防御；双方都面临粮道、潮汐和船队机动问题。',
    process: '韩世忠以水军封锁金军退路，利用芦苇荡、河汊和潮汐持续袭扰；金军寻找水道突围，最终借助当地向导和火攻等方式脱离包围。',
    result: '金军未能迅速消灭南宋政权，韩世忠获得抗金声望，南宋则继续依靠长江、淮河和城防构建防线。',
    impact: '黄天荡不是南宋彻底击败金军的战役，战果与金军撤退、宋军未能全歼和后续议和都有关。它体现的是水战、地形与战略防御的结合。'
  } },
  { id: 'western-zhou-fall', merge: {
    summary: '西周灭亡与平王东迁是王室继承冲突、诸侯势力上升和西部边患共同造成的政治转折，周朝由镐京迁都洛邑，进入东周。',
    background: '周幽王时期，王室与申侯等诸侯关系恶化，废立太子和外戚婚姻使政治联盟破裂；犬戎压力、王室控制范围缩小和诸侯坐大是更深层原因。',
    process: '周幽王在骊山附近遭犬戎等力量击败，镐京受到破坏；申侯、鲁侯等诸侯拥立周平王，平王在诸侯护送下迁都洛邑并重新组织王室。',
    result: '周朝名义上延续，但王室土地、军队和征税能力下降，诸侯开始以会盟、战争和霸主秩序填补中央权威缺口。',
    impact: '平王东迁不是周朝一夜之间灭亡，而是西周分封宗法秩序向东周诸侯争霸转变的分水岭。褒姒亡国故事具有文学记忆价值，但不能替代制度和地缘分析。'
  } },
  { id: 'qin-mu-hegemony', merge: {
    summary: '秦穆公任用百里奚、蹇叔等人，整顿秦国并向西扩张，成为春秋时期秦国崛起和称霸西戎的重要阶段。',
    background: '秦国地处关中和陇右，面对晋国东向压力、西戎部落竞争及内部贵族关系，需要吸纳外来人才并提高军政组织能力。',
    process: '秦穆公任用百里奚、蹇叔、由余等人，先处理晋秦关系，再通过战争、结盟和安抚兼并西戎部分地区，扩大马匹、土地和人口资源。',
    result: '秦国控制关中西部与陇右部分区域，形成较强军政基础，虽未能在中原长期取代晋楚，却获得春秋大国地位。',
    impact: '秦穆公时期的西进不是后来秦统一的直接复制，而是地理、人才、军队和盟友政治积累。秦国能否东出仍受晋国、楚国和内部资源限制。'
  } },
  { id: 'chengpu-battle', merge: {
    summary: '城濮之战中晋文公率晋军击败楚军，确立晋国在中原的霸主地位，是春秋诸侯会盟和霸权秩序形成的关键战役。',
    background: '楚国北上争夺中原，晋国需要保护宋国并回应诸侯请求；晋文公流亡经历、晋国内部整合和楚成王、子玉的战略选择共同影响战局。',
    process: '晋军以退避三舍兑现旧约，诱使楚军分兵，随后击破楚军两翼；宋、齐、秦等诸侯关系和晋国后勤支撑了晋军持续作战。',
    result: '楚军败退，晋文公在践土会盟中获得霸主地位，晋楚争霸成为春秋中期中原政治主线。',
    impact: '城濮体现礼义名分、外交联盟和军事战术同时作用，退避三舍并非晋军获胜的唯一原因，楚军内部指挥与诸侯支持同样重要。'
  } },
  { id: 'li-kui-reform', merge: {
    summary: '李悝变法在魏文侯时期推进选贤任能、编定法律、发展农业和粮食平籴，使魏国成为战国早期强国。',
    background: '三家分晋后，魏国需要把旧贵族分封和军政资源转化为统一国家能力，秦、赵、韩和齐楚竞争又迫使魏国改善兵员、粮食与官僚体系。',
    process: '李悝整理法律传统，推行按能力选官和赏罚，鼓励农业生产，设置平籴政策在丰年收粮、歉年平价出粮，并整顿地方治理。',
    result: '魏国财政、粮食和军队动员能力增强，西河等地防务稳固，吴起等将领得以在制度支持下发挥作用。',
    impact: '李悝变法把国家治理、土地生产和法制联系起来，是后续商鞅、申不害等变法的先行经验；《法经》具体文本仍应标注史料不确定。'
  } },
  { id: 'wu-qi-reform', merge: {
    summary: '吴起在楚悼王支持下整顿官制、削弱贵族和训练军队，试图把楚国庞大领土转化为更集中、更有效的战国国家。',
    background: '楚国疆域广阔但贵族封君、地方传统和中央行政之间矛盾突出，北方诸侯和秦国压力又要求楚国提高军政动员能力。',
    process: '吴起在令尹任上整顿官职和俸禄，限制贵族世袭与封地，迁徙部分贵族并把资源用于军队和中央行政；楚悼王死后旧贵族发动反攻。',
    result: '改革短期增强楚国组织和军事能力，但缺少稳固继承、贵族妥协与官僚支持，吴起被杀后改革大多中断。',
    impact: '吴起变法说明战国改革不仅是法律和财政技术，也涉及贵族利益与政治联盟。改革者的个人能力无法替代制度化继承。'
  } },
  { id: 'hufu-qishe', merge: {
    summary: '赵武灵王胡服骑射是赵国吸收北方骑战、改穿便于骑射的服装并训练骑兵的军事改革，显著增强赵国北方防御和对外扩张能力。',
    background: '赵国北部面对林胡、楼烦等骑马部落，传统中原车战和宽袍服饰不适合草原机动战；赵国又夹在秦、齐、燕等强国之间。',
    process: '赵武灵王推动贵族和军队穿胡服、学习骑射，整合骑兵与步兵，随后经营代地、云中和九原等北方区域。改革遭到公子成等贵族抵触。',
    result: '赵国骑兵机动性和北方防御增强，逐步形成与秦国长期竞争的军事能力；胡服也成为政治权力和文化边界争论对象。',
    impact: '胡服骑射不是简单“向北方学习”或文化同化，而是国家在战争压力下选择技术、服饰、组织和身份调整的综合改革。'
  } },
  { id: 'xinling-jun-rescues-zhao', merge: {
    summary: '信陵君窃符救赵发生在长平之战后秦围邯郸时，魏无忌通过侯嬴、朱亥等门客取得兵符，率魏军击退秦军并解除赵国危机。',
    background: '长平之战削弱赵国，秦军围攻邯郸；魏王担心秦国报复而不敢出兵，赵国存亡关系到魏国东部安全和诸侯合纵格局。',
    process: '信陵君先劝魏王出兵未果，采纳侯嬴计策获取晋鄙兵符，朱亥击杀晋鄙后接管魏军，联合赵军击败秦军并解围。',
    result: '邯郸暂时保住，秦国东进受阻，信陵君声望达到高峰；因擅自夺取兵权，他长期留在赵国，魏国君臣关系进一步紧张。',
    impact: '事件既是合纵抗秦的成功，也反映战国宗室、门客和正式军令之间的张力。兵符和个人信用让行动成功，却无法形成稳定制度。'
  } },
  { id: 'empress-lu-regency', merge: {
    summary: '吕后临朝经历汉惠帝时期的宫廷控制、诸侯与外戚平衡以及吕后去世后的诸吕之乱，是汉初皇位继承和摄政政治的重要阶段。',
    background: '刘邦去世后汉惠帝年幼且性格宽厚，诸侯王、功臣、刘氏宗室和吕氏外戚争夺中枢影响，汉朝仍处在战争后恢复期。',
    process: '吕后通过宫廷、诏令和官员任免掌握政务，分封和提拔吕氏，同时延续轻徭薄赋政策；她死后，周勃、陈平联合刘氏宗室清除诸吕。',
    result: '汉初中央政权没有因皇帝年幼而立即崩解，文景时期的稳定条件延续；吕氏外戚被清算，皇权和功臣集团重新平衡。',
    impact: '吕后临朝展示了女性摄政和外戚政治的实际作用，诸吕之乱又说明外戚扩张必须嵌入继承、军队和宗室制度才能持续。'
  } },
  { id: 'huo-guang-regency', merge: {
    summary: '霍光辅政是汉武帝死后霍光受遗诏辅佐昭帝、平衡政变并拥立汉宣帝的过程，促成西汉由扩张转向恢复的昭宣中兴。',
    background: '汉武帝晚年战争和财政压力加重，太子刘据一系覆灭后继承不稳，幼年昭帝即位需要大将军、外戚和宫廷官员共同维持政权。',
    process: '霍光与金日磾、上官桀等受遗诏辅政，处理上官桀政变和政治派系；昭帝死后废昌邑王刘贺，迎立流落民间的刘病已为汉宣帝。',
    result: '汉朝减少对外战争、调整财政与官员政策，社会逐步恢复；霍氏权力在宣帝即位后继续扩张，最终因家族专权被清算。',
    impact: '霍光辅政说明权臣可以在继承危机中保存国家，也可能通过废立和外戚扩张制造新的风险。昭宣中兴与权臣政治是同一段历史的两面。'
  } },
  { id: 'shanghan-zabinglun', merge: {
    summary: '《伤寒杂病论》成书传统把东汉末伤寒、疫病与杂病诊疗经验整理为辨证、方药和病程判断体系，后世分为《伤寒论》《金匮要略》等传本。',
    background: '东汉末战争、流行病和人口流动造成大量疾病与死亡，医家需要把临床观察、方剂经验和经脉理论编成可传授文本。',
    process: '张仲景传统以六经辨证、杂病分类和方剂应用处理不同病程，文本在流传中散佚、重编、注释并形成多个版本，后世医家继续增补解释。',
    result: '伤寒与杂病诊疗经验成为中医经典教育和经方传承的重要来源，影响中国、日本、朝鲜半岛等地传统医学。',
    impact: '事件应标注“成书传统”而不是假定现存文本完全等于东汉原稿；古代医学经验具有历史价值，但不能替代现代病原学与循证诊疗。'
  } },
  { id: 'wang-meng-governs-qin', merge: {
    summary: '王猛辅佐前秦苻坚，通过整顿吏治、压制权贵、恢复农业和训练军队，使前秦在十六国时期短暂统一黄河流域。',
    background: '前秦由氐族贵族建立，关中和关东存在多族群、地方豪强和旧政权遗民，苻坚需要把军事征服转为户籍、官僚和财政治理。',
    process: '王猛惩治不法贵族、整顿官员和户籍，发展农业与屯田，并参与灭前燕、代国等战争；他晚年劝苻坚不要在东晋尚强时贸然南征。',
    result: '前秦获得较强中央动员能力并控制北方大部，王猛死后苻坚仍发动淝水远征，统一成果因族群、军事和继承问题迅速瓦解。',
    impact: '王猛治理前秦说明十六国存在制度整合和多族群治理实践；淝水失败不能只归咎苻坚个人，王猛去世、军队结构和地方认同同样重要。'
  } },
  { id: 'southern-song-patriotic-literature', merge: {
    summary: '南宋爱国文学以陆游、辛弃疾、陈亮、文天祥等人的诗词文章为代表，把北方失地、抗金理想、南渡创伤和个人政治失意写入文学。',
    background: '南宋长期与金、西夏和蒙古对峙，朝廷主和与主战争论反复，士大夫既受文官政治和科举影响，也面对家国分裂、军费和地方社会压力。',
    process: '陆游在地方任官与闲居中写恢复中原，辛弃疾以词和奏议讨论整军屯田，陈亮等讨论事功，文天祥在南宋灭亡后以诗文表达忠烈。',
    result: '诗词从宫廷和个人情感扩展到边防、民生、历史记忆与政治伦理，南宋作家形成跨地域、跨体裁的公共表达网络。',
    impact: '“爱国文学”是后世概括，作品中既有真实政治主张，也有文学夸张和个人抒情。应同时阅读抗金情绪、乡村经验、女性书写和南宋社会现实。'
  } },
  { id: 'yuan-cultural-exchange', merge: {
    summary: '元代东西交通与游记传播依托蒙古帝国驿站、商路和多族群城市，促成欧亚使者、商人、宗教人士和工匠的往来。',
    background: '蒙古征服打通中亚、波斯、罗斯和中国之间的部分交通路线，元大都、泉州、杭州等城市汇集不同语言、宗教和商品。',
    process: '驿站保障官方使节和军政文书，商队运输丝绸、香料、金属和马匹，马可·波罗等旅行者记录城市和制度，伊斯兰、基督教、佛教和医学知识传播。',
    result: '欧亚地理、物产、宗教和技术信息进入更广泛的文本与口述网络，元代中国成为跨区域贸易与文化交流的重要节点。',
    impact: '元代交流并非完全安全或均等，战争、征税、疾病和身份等级也伴随其中；“丝绸之路”是后世概念，古代路线具有多中心和阶段性。'
  } },
  { id: 'yuan-art-literati', merge: {
    summary: '元代文人书画转型以赵孟頫、黄公望、吴镇、倪瓒、王蒙等人为代表，文人画在政权更替和士人身份变化中形成新的审美传统。',
    background: '宋元易代使部分士人面临仕元、隐逸和地方生活选择，元廷画院、江南文人网络、收藏与题跋共同改变艺术生产和传播。',
    process: '赵孟頫倡导复古并重建晋唐书法、绘画语言，黄公望等以山水、笔墨和个人心境发展文人画，诗书画题跋进一步结合。',
    result: '绘画从宫廷服务、宗教叙事和工匠技艺扩展为文人自我表达与社交鉴藏，书画成为士人身份和历史记忆的重要媒介。',
    impact: '元代文人画不是脱离社会的纯审美，仕元、遗民、江南经济和收藏市场都影响创作。赵孟頫等人的政治身份与艺术成就应分开讨论。'
  } },
  { id: 'cotton-textile-technology', merge: {
    summary: '元代棉纺织技术传播以黄道婆改进工艺和松江棉业发展为代表，推动棉花种植、轧棉、弹棉、纺纱和织布形成区域产业。',
    background: '棉花从南方和边疆逐步进入江南生产，海南黎族纺织经验、江南水乡交通、家庭手工业和市场需求共同构成技术扩散条件。',
    process: '黄道婆把海南经验带回松江，改进轧棉、弹棉和纺车等工具，妇女家庭劳动与作坊生产扩大，棉布通过运河和市镇流通。',
    result: '松江棉布产量和质量提高，棉纺织成为江南重要手工业，棉衣逐渐进入更多社会阶层的日常生活。',
    impact: '技术传播不是某一人的孤立发明，而是跨族群、跨地域和多代工匠共同完成；元代棉业还受到税制、土地和市场变化影响。'
  } },
  { id: 'late-ming-eunuch-politics', merge: {
    summary: '晚明宦官政治与东林党争围绕皇帝怠政、司礼监批红、东厂侦缉、官员任免和财政军费展开，魏忠贤专权是其高峰。',
    background: '万历、泰昌、天启时期皇权运作不稳定，内廷掌握文书和信息入口，辽东战争、矿税、党争与地方财政压力加重。',
    process: '东林士人以讲学、弹劾和清议参与政治，阉党与司礼监、东厂结合进行反制；魏忠贤在天启年间扩大厂卫与人事控制，崇祯即位后迅速清算。',
    result: '官僚集团彼此不信任，内廷与外朝、文官与宦官的冲突消耗了政治执行力，明末财政和边防问题更加难以协同解决。',
    impact: '东林与阉党不是纯粹善恶二分，晚明危机还包括税制、军费、气候、土地和皇帝决策。宦官专权是制度失衡的表现，也是具体人物造成的政治伤害。'
  } },
  { id: 'shanhai-pass-battle', merge: {
    summary: '山海关决策与清军入关发生于1644年，李自成攻入北京、吴三桂引清兵入关和多尔衮击败大顺军共同改变明清鼎革方向。',
    background: '明朝崩溃后，李自成控制北京但未能稳定吴三桂与关宁军，吴三桂面对陈圆圆传说、家族安全、军队利益和大顺压力作出复杂选择。',
    process: '吴三桂先有归顺大顺的考虑，后向清军求援；多尔衮以联合击李自成为名，清军入关后在山海关击败大顺，随后追击并控制北京。',
    result: '清军获得进入关内的军事通道，李自成撤离北京，明朝旧部、地方士绅和清廷重新组成新的统治联盟。',
    impact: '清军入关不能简化为“吴三桂为一女子引清兵”的传说，关键是关宁军、清军骑兵、大顺政权和明末边防体系共同作用。'
  } },
  { id: 'zheng-success-taiwan', merge: {
    summary: '郑成功收复台湾是1661-1662年郑氏海军围攻荷兰东印度公司在台湾据点、建立郑氏政权的过程。',
    background: '南明抗清力量在大陆受挫，郑氏依靠厦门、金门和海上贸易寻找新基地；荷兰控制台湾西南港口并经营贸易，台湾已有原住民和多群体社会。',
    process: '郑成功率船队登陆台湾，先控制沿海和赤嵌城，再围攻热兰遮城，切断荷兰援军与补给，双方谈判后荷兰撤离。',
    result: '郑氏在台湾建立军政、屯田、移民和贸易体系，以反清复明为名延续南明政治，并推动汉人社会和港口经济扩展。',
    impact: '“收复”具有郑氏和后世民族国家叙事，历史过程还涉及荷兰殖民、原住民政权、海商、移民和东亚贸易，不能忽视多方主体。'
  } },
  { id: 'qing-taiwan-unification', merge: {
    summary: '清统一台湾指1683年施琅攻克澎湖、郑克塽投降，1684年清廷设置台湾府并将台湾纳入福建行政体系。',
    background: '郑氏政权控制台湾三十余年，清廷在海禁、沿海安全、财政和边疆战略之间权衡；康熙平定三藩后具备集中水师和军费的条件。',
    process: '施琅率清军水师攻取澎湖，郑军主力失去外岛支援后接受招抚，清廷讨论弃守或设治，最终设置台湾府、台湾县、凤山县和诸罗县。',
    result: '台湾正式纳入清朝行政和海防体系，郑氏军民部分编入旗营、绿营或迁回大陆，海峡贸易和人口流动进入新阶段。',
    impact: '清统一台湾既是军事征服，也是行政建置、移民治理和海疆制度形成。清初对原住民、渡台限制和番界管理同样构成统一后的历史。'
  } },
  { id: 'heshen-corruption', merge: {
    summary: '和珅案是1799年嘉庆帝清算乾隆晚年权臣和珅、查抄其家产并重组军机与内务府权力的政治事件。',
    background: '乾隆晚年皇帝依赖近臣、军机处与内务府处理政务，官员捐纳、工程、盐政和地方财政问题积累；嘉庆亲政后需要削弱旧权臣网络。',
    process: '乾隆去世后嘉庆先控制和珅，再列罪抄家、赐死，清查其亲信与财产，并调整军机、内务府和官员任用，试图恢复皇帝直接控制。',
    result: '和珅集团瓦解，嘉庆获得政治主动，但清朝财政、人口、土地和官僚腐败的结构问题没有因抄家而根除。',
    impact: '民间“和珅家产等于国库”数字多有夸张，具体财产应以档案和清单为准。和珅案是权臣治理与个人贪腐交织的案例，不是清衰落的唯一原因。'
  } },
  { id: 'recover-xinjiang', merge: {
    summary: '左宗棠收复新疆是1875-1881年清廷在西北出兵、击败阿古柏政权并通过外交收回伊犁的过程，1884年新疆建省完成行政巩固。',
    background: '同治年间西北动乱和阿古柏入侵造成新疆部分地区脱离清廷，俄国占领伊犁；清廷在海防与塞防、财政和列强压力之间展开战略争论。',
    process: '左宗棠以兰州、肃州为后勤基地，整顿军队、筹粮、修驿道并分路推进，先收复北疆和南疆主要城镇；曾纪泽通过外交谈判收回伊犁大部。',
    result: '清廷恢复对新疆大部的控制，1884年设新疆省，驻军、屯田、道路和州县行政逐步重建。',
    impact: '收复新疆既包含领土与边疆治理，也伴随战争、人口迁徙和多族群关系重组。清廷财政、湘军组织、俄英竞争和地方社会共同影响结果。'
  } },
  { id: 'late-qing-new-policy', merge: {
    summary: '清末新政是1901年后清廷在列强压力和庚子事变后推行的官制、教育、军队、财政和法律改革，最终未能阻止1911年革命。',
    background: '义和团战争、辛丑条约赔款和列强驻兵使清廷面临财政、外交与军队危机，地方督抚和新式知识分子要求建立更有效的国家制度。',
    process: '清廷废八股、兴学堂、派遣留学、编练新军、改革官制和法律，筹备立宪并成立资政院、咨议局；改革受到财政、满汉矛盾和地方军权限制。',
    result: '新式教育、军队、法律和铁路等制度扩展，但中央改革与地方督抚、商绅和革命党之间的信任未建立，清朝最终退位。',
    impact: '清末新政不是“完全失败”：它培养了新式人才和国家机构，也制造了新的政治期待和军队力量，反而加速了君主制终结。'
  } },
  { id: 'qiu-jin-revolution', merge: {
    summary: '秋瑾与晚清革命宣传包括留日女学、报刊写作、光复会联络和1907年绍兴起义计划，连接民族革命、女性教育与公共政治。',
    background: '甲午战败、列强压力、清末新政和女子留学推动新政治思想传播，秋瑾在日本接触革命团体和女权讨论后回国办学、办报。',
    process: '秋瑾参与上海、绍兴和浙江革命网络，创办或支持女学、报刊并联络徐锡麟等人；安庆起义失败后，绍兴组织被清军侦破，她被捕就义。',
    result: '起义军事上失败，革命组织受到打击，但秋瑾的文章、女学和牺牲成为辛亥革命前女性公共参与的象征。',
    impact: '秋瑾革命宣传不只是个人英雄故事，背后有留日学生、会党、女学、报刊和清末城市社会。后世戏剧化言行需与史料区分。'
  } },
  { id: 'zou-ji-remonstrance', merge: {
    summary: '邹忌讽齐王纳谏是《战国策》中的政治寓言，借邹忌与徐公比美说明君主容易受身边人蒙蔽，齐威王因此鼓励群臣、官吏和百姓进谏。',
    background: '战国君主需要依靠官僚、贵族和民众信息治理国家，宫廷赞誉与真实政情之间存在距离，纳谏成为贤君叙事的重要主题。',
    process: '邹忌以妻、妾、客对其容貌的不同回答类比宫廷中的偏爱与利益，劝齐威王广开言路；齐威王下令按批评内容给予奖赏。',
    result: '齐国形成“群臣吏民能面刺寡人者”等分级进谏安排，故事以政治教化形式说明信息纠错和自我反省。',
    impact: '这是一则经过文学编排的劝谏故事，不能当作完整会议记录；其通识价值在于提醒统治者识别信息偏差、权力距离和谄谀。'
  } },
  { id: 'yue-yi-attacks-qi', merge: {
    summary: '乐毅伐齐是燕昭王时期燕国联合赵、楚、韩、魏等国攻齐的战争，燕军一度攻占齐国七十余城，造成齐国严重危机。',
    background: '齐湣王扩张和外交失误使齐国与诸侯关系恶化，燕昭王招贤纳士、厚待乐毅并寻求复仇，齐国长期霸权出现孤立。',
    process: '乐毅率联军击败齐军，先攻临淄、破齐都，再分兵占领诸城；燕昭王死后惠王猜疑乐毅，田单利用齐国残余力量展开反攻。',
    result: '齐国核心地区一度被燕军控制，只剩莒、即墨等据点；乐毅因君臣猜疑出奔赵国，燕军失去持续统一齐地的机会。',
    impact: '乐毅伐齐体现联盟、人才和外交孤立的作用，也说明战国占领区治理比击败主力更困难，君主继承会直接改变战争结果。'
  } },
  { id: 'tian-dan-restores-qi', merge: {
    summary: '田单复齐是战国末年齐国即墨守将利用火牛阵、心理战和地方组织击败燕军、收复失地的战争过程。',
    background: '燕军长期占领齐国大部，齐国贵族、平民和残余城邑承受战争压力；即墨和莒成为齐国保留的抵抗据点，燕王更替使燕军指挥出现变化。',
    process: '田单在即墨整合军民、制造燕军恐惧并使用反间，夜间给牛披彩帛、缚刀具、纵火冲阵，齐军随后扩大反攻并收复七十余城。',
    result: '齐国恢复原有疆域和闵王之后的王统，田单拥立襄王，燕国伐齐成果崩溃。',
    impact: '田单复齐显示守城组织、民众心理、情报和将领关系可以抵消一度巨大的兵力差距；火牛阵是战术的一部分，不应神化为唯一原因。'
  } },
  { id: 'xinling-jun-rescues-zhao', merge: {
    summary: '信陵君窃符救赵发生在长平之战后秦围邯郸时，魏无忌通过侯嬴、朱亥取得兵符，率魏军击退秦军并解除赵国危机。',
    background: '长平之战削弱赵国，秦军围攻邯郸；魏王担心秦国报复不敢直接出兵，而赵国存亡又关系魏国东部安全和诸侯合纵。',
    process: '信陵君劝魏王出兵未果，采纳侯嬴计策获取晋鄙兵符，朱亥击杀晋鄙后接管魏军，联合赵军击败秦军并解围。',
    result: '邯郸暂时保住，秦国东进受阻，信陵君声望达到高峰；因擅自夺取兵权，他长期留在赵国，魏国君臣关系更加紧张。',
    impact: '这既是合纵抗秦的成功，也是宗室、门客和正式军令之间的制度冲突。个人信用让行动成功，却无法替代稳定的国家授权。'
  } },
  { id: 'qimin-yaoshu', merge: {
    summary: '《齐民要术》是北魏贾思勰编写的农学著作，系统记录耕作、选种、园艺、畜牧、酿造、食品加工和灾害应对经验。',
    background: '北魏统一北方后，人口迁徙、土地开发和农业恢复需要知识整理；黄河流域农书、地方经验和官民生产实践提供了材料。',
    process: '贾思勰搜集前代农书、地方农民和自身观察，按土地、作物、畜禽、加工和生活技艺编排，并记录不同环境下的操作方法。',
    result: '农学知识从零散经验转为较系统的生产技术文献，影响隋唐以后农业书写、地方生产和农业史研究。',
    impact: '《齐民要术》不是现代实验农学，部分方法含有经验、信仰和时代限制；其价值在于保存多地区生产知识和技术选择。'
  } },
  { id: 'shuijingzhu', merge: {
    summary: '《水经注》是郦道元以水道为纲编写的地理与历史著作，记录河流源流、地貌、城邑、桥梁、道路、碑刻和地方传说。',
    background: '北魏时期北方政权、交通和多族群区域持续重组，旧有水道书信息有限，官员、旅行者和地方文献提供了补充材料。',
    process: '郦道元以《水经》水道条目为骨架，结合实地见闻、前代地理书、碑刻和地方传说扩展叙述，形成四十卷规模的水系地理文本。',
    result: '河流与历史空间被联系起来，城镇、交通、农业、军事和文化遗迹获得连续记录，成为后世地理和历史研究的重要资料。',
    impact: '《水经注》兼有实地观察、文献考据、文学描写和传说，不能把每条记载都当作现代测量结果；版本流传和亡佚也影响今天的使用。'
  } },
  { id: 'zhaozhou-bridge', merge: {
    summary: '赵州桥是隋代李春主持设计的敞肩石拱桥，跨越洨河，采用大拱、敞肩小拱和分散荷载结构，长期服务华北交通。',
    background: '隋朝统一后南北交通、漕运和州县联系增强，洨河水患与道路运输需要更稳定的桥梁，石材、拱券技术和工匠经验提供建造条件。',
    process: '李春及工匠选择石拱结构，在主拱两肩设置小拱减轻桥体重量和洪水冲击，并通过桥面、栏板和石材拼接保证通行。',
    result: '赵州桥提高洨河通行和防洪能力，历经修缮仍保留主要结构，成为中国古代桥梁工程和隋代技术的代表。',
    impact: '赵州桥的实际建造涉及设计者、工匠、地方财政和长期维修，不能只归功于单一人物；后世关于“千年不坏”的表述也需结合修缮史。'
  } },
  { id: 'mawei-incident', merge: {
    summary: '马嵬驿之变发生于756年唐玄宗西逃途中，禁军因粮饷、战败、宰相杨国忠和宫廷责任问题哗变，杨国忠被杀，杨贵妃被迫死。',
    background: '安禄山攻陷长安后，唐玄宗、杨国忠和禁军向蜀地撤退，军队对朝廷失去信任，太子李亨在灵武另立中枢的可能性也在上升。',
    process: '军队在马嵬驿停留并要求处置杨国忠及其亲属，杨国忠被杀后，玄宗在高力士等人劝说下令杨贵妃自尽，以换取禁军继续护驾。',
    result: '玄宗与太子集团关系破裂，李亨在灵武即位为唐肃宗，唐朝战争指挥权和宫廷政治中心转移。',
    impact: '马嵬之变不是“红颜导致亡国”的单线故事，而是军事失败、军队饥疲、宰相责任、皇帝权威和继承危机共同爆发的节点。'
  } },
  { id: 'tang-calligraphy', merge: {
    summary: '唐代书法在楷书、行书和草书方面形成高峰，欧阳询、虞世南、褚遂良、颜真卿、柳公权等把宫廷、碑刻、科举和士人书写连接起来。',
    background: '唐朝统一后官僚文书、碑刻、佛教写经和科举教育扩展，纸墨、刻碑和书法鉴藏推动书法成为国家与士人共同的文化技能。',
    process: '初唐吸收王羲之传统并形成欧、虞、褚等楷法，中唐颜真卿在安史之乱和地方任官中形成雄浑书风，晚唐柳公权重视骨力与法度。',
    result: '楷书结构和书写规范趋于成熟，书法既服务诏令、碑刻和宗教，也成为士人审美、身份和人格表达。',
    impact: '“颜筋柳骨”等评价是后世概括，唐代书法还依赖工匠、拓碑、纸张和教育制度。书风与人格有关联，但不能用道德评价替代艺术分析。'
  } },
  { id: 'cup-wine-release-soldiers', merge: {
    summary: '杯酒释兵权是宋太祖时期通过宴饮、封赏和劝退方式收回石守信等禁军将领直接兵权的政治安排，标志宋初中央集权和重文抑武方向。',
    background: '五代以来节度使和禁军将领频繁发动兵变，赵匡胤本人也通过陈桥兵变建宋，需要防止功臣复制军队拥立皇帝的路径。',
    process: '宋太祖与赵普等设计分割禁军、解除将领军职、以厚禄和荣典安置功臣，同时通过枢密院、三衙和文官系统分散军权。',
    result: '石守信等功臣退出直接禁军指挥，宋廷减少武将私人部曲和军镇割据，皇帝掌握军队任免与调度。',
    impact: '“一杯酒解决兵权”是后世叙事，实际是多项制度调整的简称。它加强中央统一，却造成宋代军令分割、将不专兵和战时效率受限的长期问题。'
  } },
  { id: 'bao-zheng-judicial', merge: {
    summary: '包拯执法与清官形象源于北宋包拯担任监察、转运、开封府和枢密官员的史实，后世戏曲把其司法实践塑造成包青天传奇。',
    background: '北宋文官国家重视御史、转运使和提点刑狱，地方财政与司法需要中央监督，民间又期待官员能够抵抗权贵和纠正冤案。',
    process: '包拯在地方和中央任职中处理钱粮、官吏、刑狱和诉讼，开封府任内形成清廉、直言和亲自审案的记忆；元明清戏曲加入铡刀、神判等元素。',
    result: '史实中的包拯成为北宋监察和行政责任的代表，民间形象则把复杂司法程序压缩为忠臣断案和百姓申冤。',
    impact: '包公文化反映社会对司法公正、官员廉洁和弱者救济的期待。龙头铡、阴间审判等内容属于文学和民俗，不应当作北宋行政事实。'
  } },
  { id: 'water-powered-armillary-sphere', merge: {
    summary: '苏颂水运仪象台是北宋元祐年间建造的天文计时工程，以水力驱动浑仪、浑象和报时装置，把天文观测与机械钟结合。',
    background: '宋代历法、皇权礼制、航海和农业都需要稳定时间标准，天文官、工匠、铜铁材料和国家财政为大型仪器建设提供条件。',
    process: '苏颂与韩公廉等设计多层楼台、齿轮、漏水和擒纵式报时机构，使仪器能够模拟天体运行、观测星象并定时击鼓鸣钟。',
    result: '水运仪象台成为宋代天文观测和计时技术的综合工程，相关图纸和《新仪象法要》保存了机械结构与操作知识。',
    impact: '它不是现代机械钟或完全自动化天文台，运行需要维护、校准和专业人员；其价值在于国家科学机构、工匠技术和官僚项目管理的结合。'
  } },
  { id: 'ehu-meeting', merge: {
    summary: '鹅湖之会是1175年朱熹与陆九渊、陆九龄等人在江西铅山鹅湖寺讨论儒学修养、格物和心性的思想会谈。',
    background: '南宋理学兴盛，书院、讲学和士人交游扩大，儒学需要回应佛道思想、科举教育和社会秩序，朱熹与陆氏兄弟代表不同修养路径。',
    process: '吕祖谦促成会谈，朱熹强调循序读书、格物穷理，陆九渊更重视本心、道德体认和直接实践，双方通过诗文和讲论展开争辩。',
    result: '朱学与陆学的差异更加清晰，虽然没有形成统一结论，但思想争论通过书院、门人和著述长期传播。',
    impact: '鹅湖之会并非简单的“朱熹胜负论”，后世朱陆异同是持续讨论。它体现南宋书院作为公共学术、教育和士人交往空间的作用。'
  } },
  { id: 'prince-ning-rebellion', merge: {
    summary: '宁王之乱是1519年明宗室朱宸濠在南昌起兵、试图夺取皇位的叛乱，王守仁以江西地方军政力量迅速平定。',
    background: '明代藩王拥有王府、俸禄和护卫但不得干预地方行政，宁王朱宸濠长期结交官绅、宦官和武人，积累超出制度允许的政治资源。',
    process: '朱宸濠在南昌起兵并沿赣江东进，王守仁利用虚实、招抚和地方军队迅速集结，在鄱阳湖和南昌附近击败叛军，俘获朱宸濠。',
    result: '宁王被押解并处死，明廷收回其王府资源，王守仁声望大增，江西地方社会和宗室控制受到重新整顿。',
    impact: '宁王之乱暴露宗室、地方官僚和军队之间的制度缝隙，也说明明代平叛依赖地方文官、卫所和临时动员，而非单一中央军队。'
  } },
  { id: 'ming-drama', merge: {
    summary: '晚明戏曲与《牡丹亭》以汤显祖传奇为代表，结合昆曲、园林、城市出版和文人社交，表现情感、梦境、婚姻和礼法冲突。',
    background: '明代商品经济、城市文化、书坊印刷和昆曲传播发展，士人、商人、女性闺阁和职业艺人共同扩大戏曲的观众与参与者。',
    process: '汤显祖创作《牡丹亭》，以杜丽娘梦中情感、死亡与复生突破传统婚姻秩序，作品通过刻本、曲社、舞台和家班广泛流传。',
    result: '传奇戏曲成为表达个人情感、女性主体和社会礼法的公共艺术，昆曲表演体系、曲牌和舞台审美进一步成熟。',
    impact: '《牡丹亭》并非简单反封建宣言，梦境、科举、家庭和礼教互相纠缠；晚明戏曲还依赖商业出版和艺人劳动，不能只归功一位作家。'
  } },
  { id: 'xu-xiake-travels', merge: {
    summary: '徐霞客游记与实地考察是17世纪徐霞客持续三十余年旅行、记录山川水系和地方社会的过程，形成中国古代地理观察的重要资料。',
    background: '晚明交通、出版、士人旅行和实学兴起，徐霞客不热衷科举仕途，依靠家族、寺院、向导和地方社会开展长途考察。',
    process: '徐霞客从江南出发，考察太湖、黄山、华山、两广、云贵等地，记录河流源头、洞穴、山脉、道路、物产和地方传闻。',
    result: '《徐霞客游记》保存大量实地观察，纠正部分旧地理记载，并把旅行散文、地貌考察和地方社会记录结合起来。',
    impact: '徐霞客不是现代测绘队，笔记中仍有传闻和文学表达；其价值在于持续实地验证、记录细节和对西南地理的系统关注。'
  } },
  { id: 'tianjing-incident', merge: {
    summary: '天京事变是1856年太平天国领导层内斗，北王韦昌辉奉洪秀全命杀杨秀清及其部众，石达开回京后又因不满出走，天国由盛转衰。',
    background: '杨秀清掌握东王府、军政和宗教权威，洪秀全退居宫廷，韦昌辉、石达开等诸王各有军队与地盘，中央权力缺少稳定的继承和制衡机制。',
    process: '杨秀清以天父名义要求洪秀全让位或重组权力，洪秀全秘密召回韦昌辉；韦昌辉入天京后大规模杀戮，石达开劝止失败并率部出走。',
    result: '杨秀清、韦昌辉等核心人物死亡，洪秀全重新集中名义权力，陈玉成、李秀成等后期将领崛起，但太平天国人才和组织遭到重创。',
    impact: '天京事变不是简单个人恩怨，而是神权、君权、军权和地方派系无法共存的制度危机，直接削弱太平天国应对清军和地方军队的能力。'
  } },
  { id: 'yan-fu-translation', merge: {
    summary: '严复翻译《天演论》是甲午战败后严复以赫胥黎《进化论与伦理学》等西方著作为基础，向中国读者传播进化、竞争和国家危机观念的思想事件。',
    background: '甲午战败、列强瓜分和清末新学推动士人寻找富强解释，严复拥有海军教育、英语和西方科学背景，能够在传统文言中转译新概念。',
    process: '严复在报刊和译序中介绍赫胥黎、斯宾塞等思想，用“物竞天择、适者生存”等语汇重构西方理论，并以按语讨论中国政治和教育。',
    result: '进化论、国家竞争、自由和教育成为维新、革命与新文化知识界的重要词汇，青年读者以不同方式理解“救亡”与现代国家。',
    impact: '严复是改写式翻译者，不是机械传递者；中国读者接受的“天演”与原著有差异，思想传播既推动启蒙也带来社会达尔文主义压力。'
  } },
  { id: 'chinese-educational-mission', merge: {
    summary: '幼童留美是1872-1875年清廷在容闳推动下分批派遣约120名幼童赴美国学习的教育计划，1881年因政治与安全疑虑被提前撤回。',
    background: '洋务运动需要翻译、工程、海军和铁路人才，容闳提出系统留学方案；清廷、地方督抚和美国社会对学生教育、身份与文化影响存在不同期待。',
    process: '学生在上海选拔后赴美，分住美国家庭并进入学校，学习英语、数学、科学和社会知识；清廷因外交紧张、教会影响和国内保守压力召回大部分学生。',
    result: '计划未完成原定年限，但詹天佑等人成为近代铁路、工程和教育骨干，留美经历为中国近代专业人才制度提供样本。',
    impact: '幼童留美不是单纯成功或失败，既展示清廷尝试制度化培养人才，也暴露晚清对海外教育、文化认同和国家控制的矛盾。'
  } },
  { id: 'industry-saves-nation', merge: {
    summary: '实业救国是甲午以后商绅、知识分子和地方官员以创办工厂、铁路、矿业、银行和教育来增强国家能力的思想与实践，张謇是代表人物。',
    background: '甲午战败、列强经济控制和民族工业竞争促使社会重新思考国家富强，清末新政、商会、留学教育和地方自治提供了组织条件。',
    process: '张謇创办大生纱厂并建设学校和公共事业，张之洞推动汉阳铁厂，其他商人和官僚发展矿业、铁路、机器制造与金融，但企业受到资金、市场和政局制约。',
    result: '民族工业、职业教育和商会网络扩展，地方社会出现以企业、学校和公共设施共同建设的近代化实验。',
    impact: '实业救国不是只靠企业家个人奋斗，也需要产权、金融、交通、技术人才和稳定政治环境；部分企业失败正说明制度条件的重要性。'
  } },
  { id: 'xin-falls-and-chimei', merge: {
    summary: '新末起义与赤眉军是王莽新朝末年绿林、赤眉等农民与地方武装起事，刘秀、刘玄和地方豪强借机争夺汉室复兴与天下控制权的过程。',
    background: '新朝土地、货币、徭役和行政改革屡次变动，黄河水患、灾荒和地方豪强压力使基层社会失序，汉室宗亲和民间宗教成为动员资源。',
    process: '绿林军在荆楚起兵，赤眉军在山东兴起，各地豪强和刘氏宗亲加入竞争；刘玄称更始帝，刘秀经营河北，赤眉攻入长安后又被刘秀击败。',
    result: '王莽政权覆灭，长安和关中遭受战争破坏，刘秀最终建立东汉，地方军队、宗族与官僚重新组合。',
    impact: '新末战争不是单一农民起义，也不是刘秀个人英雄史，而是改革失控、灾荒、宗教、宗室和地方军事化共同造成的政权重建。'
  } },
  { id: 'dou-gu-western-regions', merge: {
    summary: '窦固出击与甘英出使西域是东汉明帝、章帝时期重建河西和西域联系的军事外交行动，班超经营西域由此获得前置条件。',
    background: '东汉初年匈奴和西域诸国影响河西交通，汉廷需要恢复西域都护传统、保护商旅并获取中亚政治信息，但长期驻军成本很高。',
    process: '窦固率军出击北匈奴并经营伊吾、天山方向，班超随军出使鄯善等国；甘英奉命西行至条支附近，搜集罗马和中亚信息。',
    result: '东汉重新进入西域政治和外交网络，河西走廊与西域使节、商旅联系增强，班超后来得以长期经营西域。',
    impact: '东汉西域经营依赖军队、地方联盟、驿站和贸易，甘英是否真正抵达波斯湾等细节有争议；它更重要的成果是信息与外交网络扩展。'
  } },
  { id: 'five-dynasties-later-han-zhou', merge: {
    summary: '后汉后周更替发生在五代后期，郭威在后汉隐帝猜忌和军政冲突中起兵，建立后周，柴荣继位后推进统一和改革。',
    background: '后汉由沙陀军政集团建立，中央对河北、禁军和将领控制不稳，隐帝试图清除郭威等重臣，军队与朝廷矛盾激化。',
    process: '郭威奉命北上后在澶州起兵，南下攻入开封并接受禅让建立后周；郭威死后柴荣即位，整顿禁军、财政和漕运，先后对南唐、后蜀和北汉用兵。',
    result: '后周成为五代中最有统一潜力的政权，柴荣改革和军事扩张为赵匡胤建立北宋、继续统一奠定基础。',
    impact: '后汉后周更替显示五代政权依靠禁军与将领拥立，后周的制度与军事成果又推动宋朝以更强中央集权收束军镇政治。'
  } },
  { id: 'wuyue-local-governance', merge: {
    summary: '吴越保境安民与纳土前史是钱氏政权在五代十国时期经营两浙水利、农业、海贸和地方秩序，并最终向北宋纳土的过程。',
    background: '两浙位于江南富庶地区，五代战争频繁而中原政权更替，钱镠及后继君主需要在名义臣服、地方自治和海上贸易之间求存。',
    process: '吴越修筑海塘、治理钱塘江水患、发展稻作和城市，维护与中原、闽南和日本的贸易；钱俶在北宋强大后多次入朝并于978年纳土。',
    result: '两浙在五代乱世保存了较稳定的城市、农业和文化资源，纳土后较平稳地并入北宋，减少大规模战争破坏。',
    impact: '吴越“保境安民”具有后世美化因素，地方统治也依赖王权、军队、赋税和等级秩序；其纳土展示地方政权和平整合的可能。'
  } },
  { id: 'ming-qing-thought', merge: {
    summary: '明清之际实学与思想转向由黄宗羲、顾炎武、王夫之等人代表，反思明亡、君主专制、空疏理学和经世治理，重视历史、制度与现实知识。',
    background: '明清易代、战争、宗族社会和商业发展冲击士人身份，传统理学、心学和科举政治面临合法性问题，学者转向经史、舆地、农政和制度研究。',
    process: '黄宗羲讨论君主与学校、顾炎武重视经世和天下兴亡、王夫之系统解释历史与气理，考据、实学、地方文献和家学网络扩大。',
    result: '士人思想从纯粹心性和章句转向历史事实、制度设计、地方社会和生产知识，为清代考据、近代启蒙和民族国家思想提供资源。',
    impact: '明清之际思想不能简单称为近代民主启蒙的直接前身，传统名教、君主秩序和经世责任仍在其中；后世政治需要重新解释这些思想。'
  } },
  { id: 'railway-engineering', merge: {
    summary: '京张铁路与近代工程自主是1905-1909年詹天佑主持修建京张铁路、采用人字形线路和自主组织工程的过程，成为晚清铁路建设的象征。',
    background: '清末新政需要铁路运输和国防交通，列强争夺铁路权益，清廷希望减少外国工程依赖；京张线地形陡峭、资金有限、技术人才短缺。',
    process: '詹天佑测绘路线、组织中国工程师和工人，采用人字形展线、竖井开凿和分段施工克服八达岭坡度，处理资金、设备和管理问题。',
    result: '京张铁路按期建成并连接北京与张家口，证明中国工程师能够承担复杂铁路项目，增强社会对技术教育和工程自主的信心。',
    impact: '京张铁路并非完全脱离外国材料和技术体系，但核心勘测、设计、施工和管理由中国团队承担；其意义在于人才、组织和工程实践的自主化。'
  } },
  { id: 'xinling-jun-rescues-zhao', merge: {
    summary: '长平之战后秦军围攻邯郸，魏无忌通过侯嬴、朱亥取得兵符，率魏军击退秦军并解除赵国危机。'
  } },
  { id: 'five-dynasties-later-han-zhou', merge: {
    summary: '五代后期，郭威在后汉隐帝猜忌和军政冲突中起兵，建立后周，柴荣继位后推进统一和改革。'
  } },
];

module.exports = {
  persons,
  events,
  personPatches,
  personNamePatches,
  eventPatches,
  periodExtensions,
  relationships,
};
