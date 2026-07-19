const { formatHistoricalName } = require('./namePronunciations');
const { personPinyinScore, rulerPinyinScore } = require('./pinyinSearch');
const expansion = require('./historyExpansion');
const { rulers } = require('./rulerTimeline');
const { createMissingRulerProfiles, createSuccessionRelationships } = require('./rulerProfiles');
const rulerSupplementData = require('./rulerSupplementData');
const { applyDetailEnrichment, auditDetailQuality } = require('./detailEnrichment');

const dynasties = [
  {
    id: 'xia',
    order: 1,
    name: '夏',
    dateText: '约前2070-约前1600年',
    status: 'framework',
    labels: ['传说时代', '早期国家', '史实存疑'],
    summary: '传统史书中的早期王朝，年代和人物多需结合文献与考古谨慎理解。',
    periods: [],
  },
  {
    id: 'shang',
    order: 2,
    name: '商',
    dateText: '约前1600-前1046年',
    status: 'framework',
    labels: ['甲骨文', '青铜文明'],
    summary: '有甲骨文和都邑遗址等材料支撑的重要早期王朝。',
    periods: [],
  },
  {
    id: 'western-zhou',
    order: 3,
    name: '西周',
    dateText: '前1046-前771年',
    status: 'framework',
    labels: ['分封制', '宗法制', '礼乐'],
    summary: '周灭商后建立，分封、宗法、礼乐秩序影响深远。',
    periods: [],
  },
  {
    id: 'eastern-zhou',
    order: 4,
    name: '东周',
    dateText: '前770-前256年',
    status: 'framework',
    labels: ['春秋', '战国', '诸侯争霸'],
    summary: '周王室东迁后进入诸侯竞争与制度思想剧变的时代，原型中已显式拆为春秋与战国两个阶段。',
    periods: [
      {
        id: 'spring-autumn-period',
        name: '春秋时期',
        dateText: '前770-前476年',
        ruler: '周天子名义共主，诸侯霸主主导局势',
        personIds: ['qi-huan-gong', 'guan-zhong', 'jin-wen-gong', 'chu-zhuang-wang', 'kongzi', 'laozi', 'sun-wu', 'goujian'],
        eventIds: ['spring-autumn-hegemony', 'hundred-schools'],
      },
      {
        id: 'warring-states-period',
        name: '战国时期',
        dateText: '前475-前221年',
        ruler: '战国七雄并立，变法与兼并战争加速',
        personIds: ['wei-wen-hou', 'qin-xiao-gong', 'shang-yang', 'mengzi', 'zhuangzi', 'qu-yuan', 'qin-zhao-xiang-wang', 'bai-qi', 'gong-sun-xi', 'bao-yuan', 'chu-qing-xiang-wang', 'mang-mao', 'jia-yan', 'lian-po', 'zhao-kuo', 'wang-he', 'lin-xiangru', 'xunzi', 'han-fei', 'su-qin', 'zhang-yi', 'qin-shi-huang', 'li-si', 'wang-jian', 'wang-ben'],
        eventIds: ['three-families-jin', 'shang-yang-reform', 'hundred-schools', 'yique-battle', 'yan-ying-battle', 'huayang-battle', 'changping-battle', 'qin-unification'],
      },
    ],
  },
  {
    id: 'qin',
    order: 5,
    name: '秦',
    dateText: '前221-前207年',
    status: 'sample',
    labels: ['样板库', '大一统', '郡县制', '法家治理'],
    summary: '第一个统一的中央集权王朝。原型以秦朝作为完整样板，展示人物、事件、官职权限和争议观点的组织方式。',
    periods: [
      {
        id: 'qin-shi-huang-period',
        name: '秦始皇时期',
        dateText: '前221-前210年',
        ruler: '秦始皇嬴政',
        personIds: ['qin-shi-huang', 'li-si', 'zhao-gao', 'meng-tian', 'wang-jian', 'wang-ben'],
        eventIds: ['qin-unification', 'standardization', 'burning-books', 'great-wall-qin', 'sha-qiu-coup'],
      },
      {
        id: 'qin-er-shi-period',
        name: '秦二世时期',
        dateText: '前210-前207年',
        ruler: '秦二世胡亥',
        personIds: ['qin-er-shi', 'zhao-gao', 'li-si', 'zhang-han', 'chen-sheng', 'wu-guang', 'xiang-yu', 'liu-bang'],
        eventIds: ['fake-edict-hu-hai', 'daze-uprising', 'zhi-lu-wei-ma', 'julu-battle'],
      },
      {
        id: 'qin-end-period',
        name: '秦亡与楚汉转折',
        dateText: '前207-前202年',
        ruler: '子婴、项羽、刘邦等',
        personIds: ['zi-ying', 'zhao-gao', 'xiang-yu', 'liu-bang', 'xiao-he', 'zhang-liang', 'han-xin'],
        eventIds: ['fall-of-qin', 'chu-han-war'],
      },
    ],
  },
  {
    id: 'western-han',
    order: 6,
    name: '西汉',
    dateText: '前202-8年',
    status: 'framework',
    labels: ['文景之治', '汉武帝', '丝绸之路'],
    summary: '汉承秦制并调整休养生息，汉武帝时期制度、军事和对外交通影响深远。',
    periods: [],
  },
  {
    id: 'xin',
    order: 7,
    name: '新',
    dateText: '8-23年',
    status: 'framework',
    labels: ['王莽改制', '短命政权'],
    summary: '王莽代汉建立，改革激进而短促，是西汉与东汉之间的重要过渡。',
    periods: [],
  },
  {
    id: 'eastern-han',
    order: 8,
    name: '东汉',
    dateText: '25-220年',
    status: 'framework',
    labels: ['光武中兴', '黄巾起义', '外戚宦官'],
    summary: '光武中兴后延续汉室，后期外戚、宦官与地方军政力量深刻影响政局。',
    periods: [],
  },
  {
    id: 'three-kingdoms',
    order: 9,
    name: '三国',
    dateText: '220-280年',
    status: 'framework',
    labels: ['魏', '蜀', '吴', '鼎立'],
    summary: '魏蜀吴三方鼎立，人物常跨越东汉末年与三国政权。',
    periods: [],
  },
  {
    id: 'western-jin',
    order: 10,
    name: '西晋',
    dateText: '266-316年',
    status: 'framework',
    labels: ['短暂统一', '八王之乱'],
    summary: '三国后短暂统一，随后因宗王、门阀和北方动荡迅速衰落。',
    periods: [],
  },
  {
    id: 'eastern-jin-sixteen',
    order: 11,
    name: '东晋十六国',
    dateText: '317-420年',
    status: 'framework',
    labels: ['南北对峙', '民族融合'],
    summary: '东晋偏安江南，北方多政权并立，江南开发与民族融合并行。',
    periods: [],
  },
  {
    id: 'southern-northern',
    order: 12,
    name: '南北朝',
    dateText: '420-589年',
    status: 'framework',
    labels: ['南朝', '北朝', '佛教', '改革'],
    summary: '南北政权相继更替，为隋唐统一帝国积累制度和社会条件。',
    periods: [],
  },
  {
    id: 'sui',
    order: 13,
    name: '隋',
    dateText: '581-618年',
    status: 'framework',
    labels: ['统一', '科举', '大运河'],
    summary: '结束南北长期分裂，开创重要制度和工程，但二世而亡。',
    periods: [],
  },
  {
    id: 'tang',
    order: 14,
    name: '唐',
    dateText: '618-907年',
    status: 'framework',
    labels: ['贞观之治', '开元盛世', '安史之乱'],
    summary: '制度、文化与对外交流高度发达，安史之乱后由盛转衰。',
    periods: [],
  },
  {
    id: 'five-dynasties-ten-kingdoms',
    order: 15,
    name: '五代十国',
    dateText: '907-979年',
    status: 'framework',
    labels: ['并列政权', '五代', '十国', '宋初收束'],
    summary: '唐亡后中原五代更替，南方及周边十国并立，部分十国延续到北宋初年。',
    periods: [],
    states: [
      {
        name: '后梁',
        group: '五代',
        dateText: '907-923年',
        overlaps: ['吴越', '吴', '前蜀', '楚', '闽', '南汉', '荆南'],
      },
      {
        name: '后唐',
        group: '五代',
        dateText: '923-936年',
        overlaps: ['吴越', '吴', '前蜀', '后蜀前期', '楚', '闽', '南汉', '荆南'],
      },
      {
        name: '后晋',
        group: '五代',
        dateText: '936-947年',
        overlaps: ['吴越', '吴末期', '南唐', '后蜀', '楚', '闽末期', '南汉', '荆南'],
      },
      {
        name: '后汉',
        group: '五代',
        dateText: '947-951年',
        overlaps: ['吴越', '南唐', '后蜀', '楚末期', '南汉', '荆南'],
      },
      {
        name: '后周',
        group: '五代',
        dateText: '951-960年',
        overlaps: ['吴越', '南唐', '后蜀', '南汉', '荆南', '北汉'],
      },
      {
        name: '吴',
        group: '十国',
        dateText: '902-937年',
        overlaps: ['唐末', '后梁', '后唐', '后晋前期'],
      },
      {
        name: '南唐',
        group: '十国',
        dateText: '937-976年',
        overlaps: ['后晋', '后汉', '后周', '北宋初'],
      },
      {
        name: '荆南',
        group: '十国',
        dateText: '924-963年',
        overlaps: ['后唐', '后晋', '后汉', '后周', '北宋初'],
      },
      {
        name: '闽',
        group: '十国',
        dateText: '909-945年',
        overlaps: ['后梁', '后唐', '后晋'],
      },
      {
        name: '楚',
        group: '十国',
        dateText: '927-951年',
        overlaps: ['后唐', '后晋', '后汉', '后周前期'],
      },
      {
        name: '前蜀',
        group: '十国',
        dateText: '907-925年',
        overlaps: ['后梁', '后唐前期'],
      },
      {
        name: '后蜀',
        group: '十国',
        dateText: '934-965年',
        overlaps: ['后唐末期', '后晋', '后汉', '后周', '北宋初'],
      },
      {
        name: '南汉',
        group: '十国',
        dateText: '917-971年',
        overlaps: ['后梁', '后唐', '后晋', '后汉', '后周', '北宋初'],
      },
      {
        name: '北汉',
        group: '十国',
        dateText: '951-979年',
        overlaps: ['后周', '北宋初'],
      },
      {
        name: '吴越',
        group: '十国',
        dateText: '907-978年',
        overlaps: ['后梁', '后唐', '后晋', '后汉', '后周', '北宋初'],
      },
    ],
  },
  {
    id: 'song-liao-jin-xixia',
    order: 16,
    name: '宋辽金西夏',
    dateText: '960-1279年',
    status: 'framework',
    labels: ['北宋', '南宋', '辽', '金', '西夏'],
    summary: '中原王朝与北方、西北民族政权长期并立，经济文化高度活跃。',
    periods: [],
  },
  {
    id: 'yuan',
    order: 17,
    name: '元',
    dateText: '1271-1368年',
    status: 'framework',
    labels: ['行省制', '大都', '蒙古'],
    summary: '蒙古贵族建立的大一统王朝，行省制度影响深远。',
    periods: [],
  },
  {
    id: 'ming',
    order: 18,
    name: '明',
    dateText: '1368-1644年',
    status: 'framework',
    labels: ['洪武', '永乐', '张居正改革'],
    summary: '强化皇权与内阁政治并行，后期商品经济、海防与财政压力交织。',
    periods: [],
  },
  {
    id: 'qing',
    order: 19,
    name: '清',
    dateText: '1636-1912年',
    status: 'framework',
    labels: ['康乾盛世', '晚清变局', '近代转型'],
    summary: '满洲贵族建立，入关后统一全国，晚期面对内忧外患与制度转型。',
    periods: [],
  },
];

function makeResumeItem(item) {
  return {
    nominalDuty: '承担当时身份对应的政治、军事、思想或社会职责。',
    authorityScope: '史料信息有限，按其活动范围概括管辖或影响边界。',
    actualInfluence: '对当时政局、军事或思想传播产生重要影响。',
    modernEquivalent: '不宜直接类比',
    impact: '该经历是理解其历史影响的重要节点。',
    ...item,
  };
}

const frameworkResumeOverrides = {
  'qi-huan-gong': [
    makeResumeItem({
      timeText: '前685-前643年',
      periodLabel: '春秋齐国',
      title: '齐国国君、诸侯霸主',
      nominalDuty: '治理齐国并主持对外会盟与军事外交。',
      authorityScope: '齐国内政、军政、人事任用、诸侯会盟和“尊王攘夷”政治号召。',
      actualInfluence: '任用管仲后国力上升，成为春秋早期最具号召力的霸主。',
      modernEquivalent: '地方诸侯国最高统治者，不宜直接类比现代职位',
      impact: '开创以强国主持诸侯秩序的春秋霸政模式。',
    }),
  ],
  'guan-zhong': [
    makeResumeItem({
      timeText: '齐桓公时期',
      periodLabel: '春秋齐国',
      title: '齐相、改革辅臣',
      nominalDuty: '辅佐齐桓公处理国政、财政、军事和外交。',
      authorityScope: '赋税工商、行政组织、军政改革、诸侯外交和霸业制度设计。',
      actualInfluence: '实际是齐国富国强兵和称霸战略的核心执行者。',
      modernEquivalent: '国家级政务统筹与改革设计者的职能近似',
      impact: '帮助齐国形成可持续的霸主能力。',
    }),
  ],
  'jin-wen-gong': [
    makeResumeItem({
      timeText: '前636-前628年',
      periodLabel: '春秋晋国',
      title: '晋国国君、诸侯霸主',
      nominalDuty: '重整晋国内政并主持晋国对外争霸。',
      authorityScope: '晋国内政、军队、卿大夫任用、诸侯联盟和中原军事行动。',
      actualInfluence: '城濮之战后晋国霸业确立，本人威望覆盖多个诸侯国。',
      modernEquivalent: '诸侯国最高统治者和联盟主导者，不宜直接类比',
      impact: '推动春秋霸主格局从齐国转向晋楚竞争。',
    }),
  ],
  'chu-zhuang-wang': [
    makeResumeItem({
      timeText: '前613-前591年',
      periodLabel: '春秋楚国',
      title: '楚王、南方霸主',
      nominalDuty: '治理楚国并推动楚国参与中原争霸。',
      authorityScope: '楚国内政、军事扩张、贵族人事和对中原诸侯的战略压力。',
      actualInfluence: '使楚国成为可与晋国竞争的南方强国。',
      modernEquivalent: '诸侯国最高统治者，不宜直接类比现代职位',
      impact: '“问鼎中原”等叙事体现楚国挑战周礼秩序的强势姿态。',
    }),
  ],
  kongzi: [
    makeResumeItem({
      timeText: '约前501年前后',
      periodLabel: '春秋鲁国',
      title: '中都宰、司空、大司寇等职（传统记载）',
      nominalDuty: '参与鲁国地方治理、工程事务和司法礼政。',
      authorityScope: '地方行政、礼法秩序、司法审理和政策建议，具体任职细节需标注史料层级。',
      actualInfluence: '在鲁国政坛影响有限，但其治理理想通过讲学和经典传统长期放大。',
      modernEquivalent: '地方行政、司法和礼制顾问的职能近似',
      impact: '其从政经历为后世儒家德治与礼治理想提供历史背景。',
    }),
    makeResumeItem({
      timeText: '约前497-前484年',
      periodLabel: '春秋晚期',
      title: '周游列国的思想家、教育者',
      nominalDuty: '游说诸侯、整理教育内容并培养弟子。',
      authorityScope: '无固定行政管辖，主要通过讲学、弟子网络和政治建议影响社会。',
      actualInfluence: '生前政治抱负未充分实现，身后成为儒家传统核心源头。',
      modernEquivalent: '教育家、思想家和公共伦理倡导者的职能近似',
      impact: '奠定儒家教育和政治伦理的基本方向。',
    }),
  ],
  laozi: [
    makeResumeItem({
      timeText: '春秋晚期（传统说法）',
      periodLabel: '东周王室',
      title: '守藏室史、道家思想源头人物',
      nominalDuty: '传统叙事中掌管王室典籍档案，人物生平史实存疑。',
      authorityScope: '若按传统官职理解，范围接近王室图书档案和礼制知识保存。',
      actualInfluence: '现实官职影响难以确认，思想影响经《道德经》传统被长期放大。',
      modernEquivalent: '王室档案与典籍管理者的职能近似，人物史实存疑',
      impact: '成为道家无为、自然和反思权力观念的重要象征。',
    }),
  ],
  'sun-wu': [
    makeResumeItem({
      timeText: '春秋晚期',
      periodLabel: '吴国',
      title: '军事家、吴国将领（传统记载）',
      nominalDuty: '为吴国提供军事训练、战略谋划和作战指挥。',
      authorityScope: '军队训练、军纪、战役谋划和君主军事决策建议。',
      actualInfluence: '具体生平细节有限，但《孙子兵法》代表的兵学影响极大。',
      modernEquivalent: '军事战略顾问与高级指挥官的职能近似',
      impact: '形成以谋略、成本和形势判断为核心的兵学传统。',
    }),
  ],
  goujian: [
    makeResumeItem({
      timeText: '约前496-前465年',
      periodLabel: '春秋越国',
      title: '越王',
      nominalDuty: '治理越国并领导复国、争霸与灭吴行动。',
      authorityScope: '越国内政、军事动员、外交策略和复仇复国路线。',
      actualInfluence: '从败于吴到复国灭吴，成为春秋晚期吴越争霸代表人物。',
      modernEquivalent: '诸侯国最高统治者，不宜直接类比',
      impact: '“卧薪尝胆”叙事成为隐忍复仇和长期战略的文化符号。',
    }),
  ],
  'wei-wen-hou': [
    makeResumeItem({
      timeText: '前445-前396年',
      periodLabel: '战国初期魏国',
      title: '魏国君主',
      nominalDuty: '治理魏国并任用改革、军事和地方治理人才。',
      authorityScope: '魏国内政、军政、人事任用、变法支持和诸侯竞争战略。',
      actualInfluence: '任用李悝、西门豹等，使魏国成为战国初期强国。',
      modernEquivalent: '诸侯国最高统治者，不宜直接类比',
      impact: '体现战国初期由贵族秩序向变法强国竞争的转型。',
    }),
  ],
  'qin-xiao-gong': [
    makeResumeItem({
      timeText: '前361-前338年',
      periodLabel: '战国中期秦国',
      title: '秦国国君',
      nominalDuty: '治理秦国并支持商鞅变法。',
      authorityScope: '秦国内政、军政、人事任用、变法授权和对外扩张战略。',
      actualInfluence: '为商鞅提供最高政治保护，使秦国制度转型得以推进。',
      modernEquivalent: '诸侯国最高统治者，不宜直接类比',
      impact: '为秦国后续崛起和统一奠定制度前提。',
    }),
  ],
  'shang-yang': [
    makeResumeItem({
      timeText: '前356-前338年',
      periodLabel: '商鞅变法',
      title: '左庶长、大良造、商君（史书记载）',
      nominalDuty: '主持秦国变法，推动法令、军功爵、县制和重农战政策。',
      authorityScope: '法令制定与执行、户籍赋役、农业生产、军功奖惩、地方县制和贵族特权调整。',
      actualInfluence: '在秦孝公支持下拥有极高改革执行权，但也深度冲击旧贵族利益。',
      modernEquivalent: '国家改革总设计者和强执行型行政长官的职能近似',
      impact: '重塑秦国国家动员能力，是秦统一的制度源头之一。',
    }),
  ],
  mengzi: [
    makeResumeItem({
      timeText: '战国中期',
      periodLabel: '诸子百家',
      title: '儒家思想家、游说诸侯者',
      nominalDuty: '讲学著述，并向诸侯阐述仁政、民本和王道主张。',
      authorityScope: '无固定行政管辖，主要通过论辩、弟子和政治建议影响诸侯。',
      actualInfluence: '当时政策影响有限，后世在儒家思想体系中地位极高。',
      modernEquivalent: '思想家、教育者和政策伦理顾问的职能近似',
      impact: '发展儒家仁政、民贵君轻和性善论。',
    }),
  ],
  zhuangzi: [
    makeResumeItem({
      timeText: '战国中期',
      periodLabel: '诸子百家',
      title: '蒙地漆园吏（传统记载）、道家思想家',
      nominalDuty: '传统说法中曾任基层小吏，主要以思想和文学作品传世。',
      authorityScope: '若任漆园吏，管辖范围接近地方漆园事务；思想影响不依赖官职。',
      actualInfluence: '现实政治影响有限，文学和哲学影响深远。',
      modernEquivalent: '基层事务官与独立思想写作者的职能近似',
      impact: '以逍遥、齐物等思想扩展道家传统的精神空间。',
    }),
  ],
  'qu-yuan': [
    makeResumeItem({
      timeText: '战国中后期',
      periodLabel: '楚国',
      title: '左徒、三闾大夫（传统记载）',
      nominalDuty: '参与楚国政务、外交建议和王族宗族礼教事务。',
      authorityScope: '政策建议、对齐外交、王族教育礼法和楚国贵族事务，具体职权需结合史料谨慎呈现。',
      actualInfluence: '早期接近楚国决策层，后遭排挤放逐，政治影响转化为文学和忠贞形象。',
      modernEquivalent: '高级政策顾问、外交顾问和王族事务官的职能近似',
      impact: '其政治失败与楚国衰落叙事共同塑造了楚辞和忠臣文化形象。',
    }),
  ],
  'bai-qi': [
    makeResumeItem({
      timeText: '约前294-前257年',
      periodLabel: '战国后期秦国',
      title: '秦将、武安君',
      nominalDuty: '统率秦军执行对韩、魏、楚、赵等国的关键战役。',
      authorityScope: '前线军队指挥、战役谋划、攻城野战和战后军事处置。',
      actualInfluence: '在秦昭襄王时期成为秦国最重要的军事统帅之一。',
      modernEquivalent: '高级战区统帅的职能近似，不等同现代军衔',
      impact: '伊阙、鄢郢、华阳、长平等战役持续削弱东方诸国。',
    }),
  ],
  'lian-po': [
    makeResumeItem({
      timeText: '战国后期',
      periodLabel: '赵国',
      title: '赵国将领、信平君（后世常称）',
      nominalDuty: '统率赵军抵御秦、齐、魏等方向军事压力。',
      authorityScope: '赵国前线军队、营垒防御、战役部署和军队士气。',
      actualInfluence: '以稳健防守和老将威望著称，长平前期坚守策略影响战局。',
      modernEquivalent: '高级军事统帅的职能近似',
      impact: '“负荆请罪”和长平坚守使其成为赵国将相秩序的重要人物。',
    }),
  ],
  'lin-xiangru': [
    makeResumeItem({
      timeText: '战国后期',
      periodLabel: '赵国',
      title: '赵国外交重臣、上卿',
      nominalDuty: '代表赵国处理重大外交、朝会和国家尊严相关事务。',
      authorityScope: '对秦外交谈判、朝廷礼仪、危机应对和君主决策建议。',
      actualInfluence: '以外交胆识维护赵国政治声望，并与廉颇形成将相互补。',
      modernEquivalent: '高级外交官和国务顾问的职能近似',
      impact: '完璧归赵、渑池会和将相和成为教材级政治故事。',
    }),
  ],
  xunzi: [
    makeResumeItem({
      timeText: '战国后期',
      periodLabel: '齐国、楚国',
      title: '稷下学宫祭酒、兰陵令',
      nominalDuty: '主持学术讲论并承担地方治理。',
      authorityScope: '学术教育、士人网络、礼法思想传播；任兰陵令时涉及地方行政。',
      actualInfluence: '对李斯、韩非等后学以及礼法并重思想影响显著。',
      modernEquivalent: '学术机构负责人和地方行政官的职能近似',
      impact: '把儒家思想推进到更重制度、礼法和教化的方向。',
    }),
  ],
  'han-fei': [
    makeResumeItem({
      timeText: '战国末期',
      periodLabel: '韩国、秦国',
      title: '韩国公子、法家思想家',
      nominalDuty: '以著述和政治建议表达强国治术，后出使或入秦。',
      authorityScope: '无稳定行政管辖，主要影响君主集权、法术势理论和秦国政治判断。',
      actualInfluence: '思想被秦王政重视，但个人在秦廷政治竞争中遇害。',
      modernEquivalent: '政治理论家和国家治理顾问的职能近似',
      impact: '成为法家思想集大成者，是理解秦制的重要入口。',
    }),
  ],
  'su-qin': [
    makeResumeItem({
      timeText: '战国中后期',
      periodLabel: '合纵连横',
      title: '纵横家、合纵游说者',
      nominalDuty: '游说多国形成抗秦联盟。',
      authorityScope: '诸侯外交、联盟谈判、战略宣传和跨国政治协调。',
      actualInfluence: '传统叙事中以合纵抗秦象征多国制衡强秦。',
      modernEquivalent: '跨国外交斡旋者和战略游说者的职能近似',
      impact: '体现战国时期外交联盟对国家存亡的关键意义。',
    }),
  ],
  'zhang-yi': [
    makeResumeItem({
      timeText: '战国中后期',
      periodLabel: '秦国与诸侯外交',
      title: '秦相、纵横家',
      nominalDuty: '服务秦国连横外交，分化东方诸国联盟。',
      authorityScope: '对外谈判、战略欺骗、诸侯关系调整和秦国外交方案设计。',
      actualInfluence: '是秦国削弱合纵联盟的重要外交执行者。',
      modernEquivalent: '高级外交战略官和谈判代表的职能近似',
      impact: '与苏秦合纵叙事共同构成战国外交竞争的核心对照。',
    }),
  ],
  'qin-zhao-xiang-wang': [
    makeResumeItem({
      timeText: '前306-前251年',
      periodLabel: '战国后期秦国',
      title: '秦王',
      nominalDuty: '长期治理秦国并主持对东方诸国的军事扩张。',
      authorityScope: '秦国内政、军政、人事任用、远交近攻和兼并战争总方向。',
      actualInfluence: '在范雎、白起等人活动时期拥有最高决策权，秦国优势明显扩大。',
      modernEquivalent: '诸侯国最高统治者，不宜直接类比',
      impact: '其时期的秦国军事胜利为秦始皇统一奠定战略基础。',
    }),
  ],
  'zhao-kuo': [
    makeResumeItem({
      timeText: '前260年',
      periodLabel: '长平之战',
      title: '赵军主将',
      nominalDuty: '接替廉颇统率赵军与秦军决战。',
      authorityScope: '长平前线赵军主力、作战部署和突围决策。',
      actualInfluence: '临阵换将后改变赵军坚守策略，最终战败身死。',
      modernEquivalent: '前线集团军统帅的职能近似',
      impact: '成为纸上谈兵和决策失误的典型教材人物。',
    }),
  ],
  'wang-he': [
    makeResumeItem({
      timeText: '前260年前后',
      periodLabel: '长平之战前期',
      title: '秦将',
      nominalDuty: '率秦军进攻上党和长平方向。',
      authorityScope: '秦军前线部队、攻势推进和营垒压迫。',
      actualInfluence: '在白起秘密接替前，是秦军前期作战的重要将领。',
      modernEquivalent: '前线军事指挥官的职能近似',
      impact: '为长平决战前的秦军优势积累创造条件。',
    }),
  ],
  'gong-sun-xi': [
    makeResumeItem({
      timeText: '前293年',
      periodLabel: '伊阙之战',
      title: '韩魏联军主将、魏将',
      nominalDuty: '统率韩魏等联军抵御秦军。',
      authorityScope: '联军战场协调、阵地部署和对秦作战指挥。',
      actualInfluence: '在伊阙之战中被白起击败，韩魏军事力量遭重创。',
      modernEquivalent: '联军前线主帅的职能近似',
      impact: '其战败标志秦国对韩魏方向取得重大优势。',
    }),
  ],
  'bao-yuan': [
    makeResumeItem({
      timeText: '前293年前后',
      periodLabel: '伊阙之战',
      title: '韩国将领',
      nominalDuty: '参与韩魏联军对抗秦军。',
      authorityScope: '韩国军队或联军一翼的作战指挥，具体细节史料需谨慎标注。',
      actualInfluence: '作为伊阙战役相关韩方人物，体现联军内部协调压力。',
      modernEquivalent: '前线将领的职能近似',
      impact: '帮助用户理解伊阙之战并非白起单线对单将，而是多国联军战役。',
    }),
  ],
  'chu-qing-xiang-wang': [
    makeResumeItem({
      timeText: '前298-前263年',
      periodLabel: '战国楚国',
      title: '楚王',
      nominalDuty: '治理楚国并应对秦国、齐国等强国压力。',
      authorityScope: '楚国内政、贵族政治、外交联盟和都城防御战略。',
      actualInfluence: '鄢郢之战后楚国迁都，楚国战略空间显著收缩。',
      modernEquivalent: '诸侯国最高统治者，不宜直接类比',
      impact: '其时期楚国由强国竞争转入被秦压制的困境。',
    }),
  ],
  'mang-mao': [
    makeResumeItem({
      timeText: '前273年前后',
      periodLabel: '华阳之战',
      title: '魏国将领',
      nominalDuty: '率魏军参与华阳方向作战。',
      authorityScope: '魏军前线部队、战场部署和与赵军协同。',
      actualInfluence: '在华阳之战中败于秦军，魏国军事处境进一步恶化。',
      modernEquivalent: '前线军事指挥官的职能近似',
      impact: '是白起华阳战役对手链条中的关键魏方人物。',
    }),
  ],
  'jia-yan': [
    makeResumeItem({
      timeText: '前273年前后',
      periodLabel: '华阳之战',
      title: '赵国将领',
      nominalDuty: '率赵军参与华阳相关战斗。',
      authorityScope: '赵军前线部队和对秦作战指挥。',
      actualInfluence: '史书记载其部在白起后续作战中遭重创。',
      modernEquivalent: '前线军事指挥官的职能近似',
      impact: '补足华阳之战中秦、魏、赵多方交战关系。',
    }),
  ],
};

function buildDefaultResume(config) {
  const categoryText = (config.categories || []).join(' ');
  const periodLabel = (config.activePeriodLabels && config.activePeriodLabels[0]) || (config.crossDynastyLabels && config.crossDynastyLabels[0]) || '活动时期';
  if (/帝王|君主|霸主|王/.test(categoryText)) {
    return [makeResumeItem({
      timeText: config.lifeText || '生卒年不详',
      periodLabel,
      title: '君主',
      nominalDuty: '治理所属政权并承担最高军政决策。',
      authorityScope: '所属政权的内政、军政、人事、外交和重大制度选择。',
      actualInfluence: config.summary,
      impact: config.impactSummary || config.summary,
    })];
  }
  if (/将领|军事|霸王/.test(categoryText)) {
    return [makeResumeItem({
      timeText: config.lifeText || '生卒年不详',
      periodLabel,
      title: '军事人物',
      nominalDuty: '统率或影响军事行动。',
      authorityScope: '前线军队、战役计划、军事训练或作战执行。',
      actualInfluence: config.summary,
      modernEquivalent: '军事指挥官的职能近似',
      impact: config.impactSummary || config.summary,
    })];
  }
  return [makeResumeItem({
    timeText: config.lifeText || '生卒年不详',
    periodLabel,
    title: '历史人物',
    actualInfluence: config.summary,
    impact: config.impactSummary || config.summary,
  })];
}

function makeFrameworkPerson(config) {
  return {
    formalName: config.name,
    lifeText: '生卒年不详',
    birthYear: null,
    deathYear: null,
    categories: [],
    crossDynastyLabels: ['东周'],
    activePeriodLabels: [],
    dynastyIds: ['eastern-zhou'],
    background: `${config.name}见于春秋战国人物和相关战事记载，现有材料主要集中在${config.summary || '其所处国家、职能和相关事件'}，应结合具体史料范围理解。`,
    childhood: '现存史料没有留下连续的幼年传记，能够确认的内容主要来自其成年后的任职、战争、言论或相关事件记录。',
    personality: '个人性格缺少连续自述，以下仅根据现存任职、决策和事件表现作谨慎概括，不把后世文学形象当作确定史实。',
    policyInclination: '现存记载显示其行动主要围绕所属国家的政务、军务、外交或思想活动展开，具体取向以相关事件中的实际选择为准。',
    socialContribution: config.summary,
    impactSummary: config.summary,
    resume: config.resume || frameworkResumeOverrides[config.id] || buildDefaultResume(config),
    relatedEventIds: [],
    disputeTabs: [],
    ...config,
  };
}

const persons = [
  makeFrameworkPerson({
    id: 'qi-huan-gong',
    name: '齐桓公',
    formalName: '姜小白',
    lifeText: '？-前643年',
    deathYear: -643,
    categories: ['春秋霸主', '诸侯君主'],
    crossDynastyLabels: ['东周', '春秋', '齐国'],
    activePeriodLabels: ['春秋时期', '齐桓公称霸'],
    summary: '春秋五霸之一，任用管仲改革齐国，提出“尊王攘夷”，成为春秋早期霸主代表。',
    policyInclination: '依托管仲改革增强国力，借尊周王室和联合诸侯建立霸主秩序。',
    relatedEventIds: ['spring-autumn-hegemony'],
  }),
  makeFrameworkPerson({
    id: 'guan-zhong',
    name: '管仲',
    lifeText: '？-前645年',
    deathYear: -645,
    categories: ['政治家', '改革人物', '春秋人物'],
    crossDynastyLabels: ['东周', '春秋', '齐国'],
    activePeriodLabels: ['春秋时期', '齐桓公时期'],
    summary: '辅佐齐桓公改革内政、发展经济和军政组织，是齐桓公称霸的重要制度支撑。',
    policyInclination: '重富国强兵、经济治理和现实政治秩序。',
    relatedEventIds: ['spring-autumn-hegemony'],
  }),
  makeFrameworkPerson({
    id: 'jin-wen-gong',
    name: '晋文公',
    formalName: '姬重耳',
    lifeText: '前697-前628年',
    birthYear: -697,
    deathYear: -628,
    categories: ['春秋霸主', '诸侯君主'],
    crossDynastyLabels: ['东周', '春秋', '晋国'],
    activePeriodLabels: ['春秋时期', '晋文公称霸'],
    summary: '长期流亡后返晋即位，城濮之战后确立晋国霸业，是春秋霸主政治的重要代表。',
    policyInclination: '重整内政、联合诸侯、维护霸主秩序。',
    relatedEventIds: ['spring-autumn-hegemony'],
  }),
  makeFrameworkPerson({
    id: 'chu-zhuang-wang',
    name: '楚庄王',
    lifeText: '？-前591年',
    deathYear: -591,
    categories: ['春秋霸主', '诸侯君主'],
    crossDynastyLabels: ['东周', '春秋', '楚国'],
    activePeriodLabels: ['春秋时期', '楚庄王称霸'],
    summary: '楚国强盛时期君主，“问鼎中原”等典故体现楚国北上争霸的政治姿态。',
    policyInclination: '推动楚国参与中原秩序竞争，强化南方大国影响力。',
    relatedEventIds: ['spring-autumn-hegemony'],
  }),
  makeFrameworkPerson({
    id: 'kongzi',
    name: '孔丘（孔子）',
    formalName: '孔丘',
    lifeText: '前551-前479年',
    birthYear: -551,
    deathYear: -479,
    categories: ['思想家', '教育家', '儒家'],
    crossDynastyLabels: ['东周', '春秋', '鲁国'],
    activePeriodLabels: ['春秋晚期', '诸子百家前期'],
    summary: '儒家学派创始性人物，主张仁、礼和德治，其思想深刻影响中国传统政治伦理与教育文化。',
    policyInclination: '重礼乐秩序、德治、君臣父子伦理和教育普及。',
    relatedEventIds: ['hundred-schools'],
    disputeTabs: [
      {
        title: '思想史地位',
        body: '孔子常被视为儒家传统的核心源头，对中国传统社会伦理、教育和政治观念影响深远。',
      },
      {
        title: '现代讨论',
        body: '现代评价会区分其教育贡献、礼治理想与等级秩序观念的历史局限。',
      },
    ],
  }),
  makeFrameworkPerson({
    id: 'laozi',
    name: '老子',
    formalName: '李耳（传统说法）',
    lifeText: '生卒年不详',
    categories: ['思想家', '道家', '史实存疑'],
    crossDynastyLabels: ['东周', '春秋'],
    activePeriodLabels: ['春秋晚期', '诸子百家前期'],
    summary: '道家思想的重要源头，主张道、无为、自然等观念，人物生平和《道德经》成书问题存在讨论。',
    policyInclination: '倾向无为而治、顺应自然和反思过度人为干预。',
    relatedEventIds: ['hundred-schools'],
    disputeTabs: [
      {
        title: '史实存疑',
        body: '老子生平、与孔子问礼故事以及《道德经》成书过程均有学术讨论，正式内容应分层呈现。',
      },
    ],
  }),
  makeFrameworkPerson({
    id: 'sun-wu',
    name: '孙武',
    lifeText: '生卒年不详',
    categories: ['军事家', '兵家'],
    crossDynastyLabels: ['东周', '春秋', '吴国'],
    activePeriodLabels: ['春秋晚期'],
    summary: '相传为《孙子兵法》作者，重视谋略、形势、虚实和成本控制，是中国古代军事思想代表。',
    policyInclination: '以战争理性、战略谋划和低成本取胜为核心。',
    relatedEventIds: ['hundred-schools'],
  }),
  makeFrameworkPerson({
    id: 'goujian',
    name: '越王勾践',
    formalName: '勾践',
    lifeText: '？-前465年',
    deathYear: -465,
    categories: ['诸侯君主', '春秋人物'],
    crossDynastyLabels: ['东周', '春秋', '越国'],
    activePeriodLabels: ['春秋晚期', '吴越争霸'],
    summary: '越国君主，传统叙事中以“卧薪尝胆”复国灭吴著称，是春秋晚期吴越争霸核心人物。',
    personality: '隐忍、坚韧、目标感强；“卧薪尝胆”带有强烈后世叙事色彩。',
    relatedEventIds: ['spring-autumn-hegemony'],
  }),
  makeFrameworkPerson({
    id: 'wei-wen-hou',
    name: '魏文侯',
    lifeText: '？-前396年',
    deathYear: -396,
    categories: ['诸侯君主', '战国初期'],
    crossDynastyLabels: ['东周', '战国', '魏国'],
    activePeriodLabels: ['战国初期'],
    summary: '战国初期魏国君主，任用李悝、西门豹等改革治理，使魏国一度成为战国强国。',
    policyInclination: '重人才、变法和富国强兵。',
    relatedEventIds: ['three-families-jin'],
  }),
  makeFrameworkPerson({
    id: 'qin-xiao-gong',
    name: '秦孝公',
    formalName: '嬴渠梁',
    lifeText: '前381-前338年',
    birthYear: -381,
    deathYear: -338,
    categories: ['诸侯君主', '变法支持者'],
    crossDynastyLabels: ['东周', '战国', '秦国'],
    activePeriodLabels: ['战国中期', '商鞅变法'],
    summary: '战国秦国君主，任用商鞅变法，为秦国崛起和后来统一奠定制度基础。',
    policyInclination: '支持法家式变法、军功爵制、县制和农业战备动员。',
    relatedEventIds: ['shang-yang-reform'],
  }),
  makeFrameworkPerson({
    id: 'shang-yang',
    name: '商鞅',
    formalName: '卫鞅、公孙鞅',
    lifeText: '约前390-前338年',
    birthYear: -390,
    deathYear: -338,
    categories: ['改革家', '法家人物'],
    crossDynastyLabels: ['东周', '战国', '秦国'],
    activePeriodLabels: ['战国中期', '商鞅变法'],
    summary: '辅佐秦孝公推行变法，强化军功爵制、县制、户籍和农业生产，是秦国崛起的关键制度人物。',
    personality: '坚定、严厉、制度执行力强，传统叙事常强调其法令严明。',
    policyInclination: '法家治理、富国强兵、重农战和中央集权。',
    relatedEventIds: ['shang-yang-reform'],
    disputeTabs: [
      {
        title: '强秦功臣',
        body: '商鞅变法显著增强秦国组织动员能力，是秦统一的重要制度前提。',
      },
      {
        title: '严刑峻法',
        body: '其制度也强化了高压治理传统，后世对法家严酷性多有批评。',
      },
    ],
  }),
  makeFrameworkPerson({
    id: 'mengzi',
    name: '孟子',
    formalName: '孟轲',
    lifeText: '约前372-前289年',
    birthYear: -372,
    deathYear: -289,
    categories: ['思想家', '儒家'],
    crossDynastyLabels: ['东周', '战国'],
    activePeriodLabels: ['战国中期', '诸子百家'],
    summary: '儒家重要代表，主张仁政、民贵君轻和性善论，发展孔子思想。',
    policyInclination: '仁政、重民本和道德政治。',
    relatedEventIds: ['hundred-schools'],
  }),
  makeFrameworkPerson({
    id: 'zhuangzi',
    name: '庄子',
    formalName: '庄周',
    lifeText: '约前369-前286年',
    birthYear: -369,
    deathYear: -286,
    categories: ['思想家', '道家', '文学人物'],
    crossDynastyLabels: ['东周', '战国'],
    activePeriodLabels: ['战国中期', '诸子百家'],
    summary: '道家重要代表，强调逍遥、齐物和精神自由，其文章兼具哲学与文学价值。',
    policyInclination: '反思功名权力，强调自然与精神自由。',
    relatedEventIds: ['hundred-schools'],
  }),
  makeFrameworkPerson({
    id: 'qu-yuan',
    name: '屈原',
    formalName: '屈平',
    lifeText: '约前340-前278年',
    birthYear: -340,
    deathYear: -278,
    categories: ['文学家', '政治人物', '楚辞'],
    crossDynastyLabels: ['东周', '战国', '楚国'],
    activePeriodLabels: ['战国中后期'],
    summary: '楚国政治人物和楚辞代表作家，忠君爱国、忧国忧民形象影响深远。',
    personality: '理想主义强、忠诚而刚直，文学形象与政治悲剧交织。',
    policyInclination: '倾向联齐抗秦、改革楚政。',
    relatedEventIds: ['hundred-schools'],
  }),
  makeFrameworkPerson({
    id: 'qin-zhao-xiang-wang',
    name: '秦昭襄王',
    formalName: '嬴稷',
    lifeText: '前325-前251年',
    birthYear: -325,
    deathYear: -251,
    categories: ['诸侯君主', '秦国君主', '战略决策者'],
    crossDynastyLabels: ['东周', '战国', '秦国'],
    activePeriodLabels: ['战国后期', '秦昭襄王时期'],
    summary: '秦国在位时间很长的君主，白起、范雎等人活跃于其时期，秦国通过连续战争显著削弱韩、魏、楚、赵等国。',
    background: '秦惠文王之子，早年在燕为质，后回秦即位，长期处在战国强国竞争和秦国内外权力调整中。',
    childhood: '早年质子经历使其成长环境带有诸侯外交和权力安全压力。',
    personality: '重现实利益和长期扩张，能够任用强臣名将，但晚年君臣关系也出现紧张。',
    policyInclination: '远交近攻、军事扩张、强化秦国对东方诸国的压迫。',
    relatedEventIds: ['yique-battle', 'yan-ying-battle', 'huayang-battle', 'changping-battle'],
  }),
  makeFrameworkPerson({
    id: 'bai-qi',
    name: '白起',
    lifeText: '？-前257年',
    deathYear: -257,
    categories: ['将领', '军事家', '秦国人物'],
    crossDynastyLabels: ['东周', '战国', '秦国'],
    activePeriodLabels: ['战国后期', '秦赵争霸'],
    summary: '秦国名将，长平之战等战役中作用突出，是战国后期秦国军事优势的重要代表。',
    personality: '军事执行力极强，作战冷峻；长平战后处置使其评价高度复杂。',
    policyInclination: '服务秦国兼并战争和军事扩张。',
    relatedEventIds: ['yique-battle', 'yan-ying-battle', 'huayang-battle', 'changping-battle'],
    disputeTabs: [
      {
        title: '军事能力',
        body: '白起常被视为战国最强军事统帅之一。',
      },
      {
        title: '战争伦理',
        body: '长平之战后的坑杀叙事使其历史评价带有强烈争议。',
      },
    ],
  }),
  makeFrameworkPerson({
    id: 'gong-sun-xi',
    name: '公孙喜',
    formalName: '犀武、公孙喜',
    lifeText: '生卒年不详',
    categories: ['将领', '魏国人物', '战国人物'],
    crossDynastyLabels: ['东周', '战国', '魏国'],
    activePeriodLabels: ['战国中期', '伊阙之战'],
    summary: '伊阙之战中韩魏联军主将之一，秦将白起在此战中大败韩魏联军，公孙喜被擒杀的说法常见于战役叙述。',
    background: '魏国军事系统人物，活动细节主要依附于伊阙之战记载。',
    childhood: '史料缺载。',
    personality: '缺乏个人性格材料，原型中以战役角色而非心理推断呈现。',
    policyInclination: '代表韩魏方向抵御秦国东出压力。',
    relatedEventIds: ['yique-battle'],
  }),
  makeFrameworkPerson({
    id: 'bao-yuan',
    name: '暴鸢',
    lifeText: '生卒年不详',
    categories: ['将领', '韩国人物', '战国人物'],
    crossDynastyLabels: ['东周', '战国', '韩国'],
    activePeriodLabels: ['战国中期', '伊阙之战'],
    summary: '韩国将领，常作为伊阙之战韩方相关人物出现，用于理解韩魏联军与秦军交战的多方格局。',
    background: '韩国军事人物，生平材料有限。',
    childhood: '史料缺载。',
    personality: '史料不足，不作过度性格推断。',
    policyInclination: '维护韩国安全，参与抵御秦国军事压力。',
    relatedEventIds: ['yique-battle'],
  }),
  makeFrameworkPerson({
    id: 'chu-qing-xiang-wang',
    name: '楚顷襄王',
    formalName: '熊横',
    lifeText: '？-前263年',
    deathYear: -263,
    categories: ['诸侯君主', '楚国君主'],
    crossDynastyLabels: ['东周', '战国', '楚国'],
    activePeriodLabels: ['战国后期', '楚顷襄王时期'],
    summary: '楚国君主，屈原被放逐和白起攻鄢郢均与其时期相关，楚国在秦军打击下被迫迁都，国势受重创。',
    background: '楚怀王之子，继位后面对秦、齐等强国压力和楚国内部贵族政治。',
    childhood: '早年经历资料有限，但成长于楚国由强转弱的压力环境。',
    personality: '传统叙事中政治判断较弱，易受贵族和强秦压力影响；具体评价需区分文学形象与史实。',
    policyInclination: '在强秦压力下寻求维持楚国安全，但战略主动性不足。',
    relatedEventIds: ['yan-ying-battle', 'hundred-schools'],
    disputeTabs: [
      {
        title: '楚辞叙事',
        body: '在屈原叙事中，楚顷襄王常与听信谗言、放逐忠臣联系在一起。',
      },
      {
        title: '战国格局',
        body: '从国际形势看，楚国面临秦国持续军事压迫，君主个人责任需放在强国竞争背景中理解。',
      },
    ],
  }),
  makeFrameworkPerson({
    id: 'mang-mao',
    name: '芒卯',
    lifeText: '生卒年不详',
    categories: ['将领', '魏国人物', '战国人物'],
    crossDynastyLabels: ['东周', '战国', '魏国'],
    activePeriodLabels: ['战国后期', '华阳之战'],
    summary: '魏国将领，华阳之战中与秦军交战，史书记载其败于白起、魏冉、胡阳等秦军行动。',
    background: '魏国军事人物，生平信息主要出现在华阳相关战事中。',
    childhood: '史料缺载。',
    personality: '缺乏可靠材料，不作过度性格推断。',
    policyInclination: '维护魏国在韩魏赵交界地带的军事利益。',
    relatedEventIds: ['huayang-battle'],
  }),
  makeFrameworkPerson({
    id: 'jia-yan',
    name: '贾偃',
    lifeText: '生卒年不详',
    categories: ['将领', '赵国人物', '战国人物'],
    crossDynastyLabels: ['东周', '战国', '赵国'],
    activePeriodLabels: ['战国后期', '华阳之战'],
    summary: '赵国将领，华阳之战相关记载中与白起交战，体现秦军对魏赵方向的连续打击。',
    background: '赵国军事人物，生平材料有限。',
    childhood: '史料缺载。',
    personality: '史料不足，不作过度性格推断。',
    policyInclination: '代表赵国参与对秦军事竞争。',
    relatedEventIds: ['huayang-battle'],
  }),
  makeFrameworkPerson({
    id: 'lian-po',
    name: '廉颇',
    lifeText: '生卒年不详',
    categories: ['将领', '赵国人物'],
    crossDynastyLabels: ['东周', '战国', '赵国'],
    activePeriodLabels: ['战国后期', '秦赵争霸'],
    summary: '赵国名将，长平之战前期采用坚守策略；与蔺相如“将相和”是教材常见故事。',
    personality: '勇武、刚直，也能在国家利益前修正个人意气。',
    relatedEventIds: ['changping-battle'],
  }),
  makeFrameworkPerson({
    id: 'zhao-kuo',
    name: '赵括',
    lifeText: '？-前260年',
    deathYear: -260,
    categories: ['将领', '赵国人物', '争议人物'],
    crossDynastyLabels: ['东周', '战国', '赵国'],
    activePeriodLabels: ['战国后期', '长平之战'],
    summary: '赵国将领，长平之战中接替廉颇为赵军主将，最终战败身死，后世常以“纸上谈兵”概括其形象。',
    background: '马服君赵奢之子，出身赵国军事家族。',
    childhood: '传统叙事强调其熟读兵书、善于口谈军事，但缺乏大规模实战经验。',
    personality: '自信甚至轻敌，理论能力与实战经验落差是大众认知中的核心特征。',
    policyInclination: '倾向主动出击，改变廉颇长期坚守策略。',
    relatedEventIds: ['changping-battle'],
    disputeTabs: [
      {
        title: '纸上谈兵',
        body: '大众叙事常把赵括视为理论脱离实战的典型。',
      },
      {
        title: '责任边界',
        body: '长平失败也与赵国后勤、秦国反间、赵王决策和秦军战略有关，不宜完全归咎于赵括个人。',
      },
    ],
  }),
  makeFrameworkPerson({
    id: 'wang-he',
    name: '王龁',
    lifeText: '生卒年不详',
    categories: ['将领', '秦国人物'],
    crossDynastyLabels: ['东周', '战国', '秦国'],
    activePeriodLabels: ['战国后期', '长平之战'],
    summary: '秦国将领，长平之战前期率军与赵军作战，白起秘密接替后仍是理解秦军指挥链的重要人物。',
    background: '秦国军事系统人物，活跃于秦昭襄王后期对外战争。',
    childhood: '史料缺载。',
    personality: '史料较少，原型中以军事执行角色呈现。',
    policyInclination: '服务秦国对韩、赵方向的军事扩张。',
    relatedEventIds: ['changping-battle'],
  }),
  makeFrameworkPerson({
    id: 'lin-xiangru',
    name: '蔺相如',
    lifeText: '生卒年不详',
    categories: ['外交人物', '赵国人物'],
    crossDynastyLabels: ['东周', '战国', '赵国'],
    activePeriodLabels: ['战国后期'],
    summary: '赵国外交政治人物，“完璧归赵”“渑池会”和“将相和”体现其外交胆识与政治格局。',
    personality: '机智、沉稳，能以国家利益压过私人荣辱。',
    relatedEventIds: ['changping-battle'],
  }),
  makeFrameworkPerson({
    id: 'xunzi',
    name: '荀子',
    formalName: '荀况',
    lifeText: '约前313-前238年',
    birthYear: -313,
    deathYear: -238,
    categories: ['思想家', '儒家'],
    crossDynastyLabels: ['东周', '战国'],
    activePeriodLabels: ['战国后期', '诸子百家'],
    summary: '战国后期儒家代表，主张性恶论、礼法并重；李斯、韩非常被视作其学生。',
    policyInclination: '礼法并重，强调后天教化和制度规范。',
    relatedEventIds: ['hundred-schools'],
  }),
  makeFrameworkPerson({
    id: 'han-fei',
    name: '韩非',
    lifeText: '约前280-前233年',
    birthYear: -280,
    deathYear: -233,
    categories: ['思想家', '法家', '韩国公子'],
    crossDynastyLabels: ['东周', '战国', '韩国', '秦国'],
    activePeriodLabels: ['战国末期'],
    summary: '法家集大成者，强调法、术、势，对秦制和后世中央集权思想有重要影响。',
    policyInclination: '法家治理、君主集权、制度化奖惩。',
    relatedEventIds: ['hundred-schools'],
    disputeTabs: [
      {
        title: '思想影响',
        body: '韩非法家理论为理解秦制提供关键思想入口。',
      },
      {
        title: '个人悲剧',
        body: '韩非入秦后被害，常与李斯政治竞争和秦国现实政治联系讨论。',
      },
    ],
  }),
  makeFrameworkPerson({
    id: 'su-qin',
    name: '苏秦',
    lifeText: '？-前284年',
    deathYear: -284,
    categories: ['纵横家', '外交人物'],
    crossDynastyLabels: ['东周', '战国'],
    activePeriodLabels: ['战国中后期', '合纵连横'],
    summary: '纵横家代表，传统叙事中以合纵抗秦著称，是战国外交策略人物。',
    policyInclination: '通过多国联盟制衡强秦。',
    relatedEventIds: ['hundred-schools'],
  }),
  makeFrameworkPerson({
    id: 'zhang-yi',
    name: '张仪',
    lifeText: '？-前309年',
    deathYear: -309,
    categories: ['纵横家', '外交人物', '秦国人物'],
    crossDynastyLabels: ['东周', '战国', '秦国'],
    activePeriodLabels: ['战国中后期', '合纵连横'],
    summary: '纵横家代表，服务秦国连横策略，瓦解诸侯合纵，是战国外交竞争核心人物之一。',
    policyInclination: '服务秦国扩张，以连横策略分化东方诸国。',
    relatedEventIds: ['hundred-schools'],
  }),
  {
    id: 'qin-shi-huang',
    name: '秦始皇',
    formalName: '嬴政',
    lifeText: '前259-前210年',
    birthYear: -259,
    deathYear: -210,
    categories: ['帝王君主', '制度塑造者'],
    crossDynastyLabels: ['战国秦', '秦朝'],
    activePeriodLabels: ['秦王政时期', '秦始皇时期'],
    dynastyIds: ['eastern-zhou', 'qin'],
    summary: '完成秦灭六国，建立皇帝制度，推行郡县制、统一文字、货币、度量衡等措施，奠定后世中央集权国家结构。',
    background: '出生于战国晚期秦赵关系紧张的政治环境，少年时期曾随母在赵国生活，后回秦继位。',
    childhood: '早年处于诸侯外交、人质政治与秦国内部权力斗争交错的环境，形成强烈的权力集中与安全焦虑。',
    personality: '果断、控制欲强、重制度和法令，兼具开创性与严酷性。',
    policyInclination: '强化皇权、中央集权、法家式治理和全国标准化。',
    socialContribution: '结束战国长期分裂，推动制度、文字、交通和行政体系统一。',
    impactSummary: '秦始皇的制度遗产被汉以后不断吸收和调整，但严刑峻法、徭役沉重也加速秦朝社会矛盾累积。',
    resume: [
      {
        timeText: '前247-前221年',
        periodLabel: '战国秦王政时期',
        title: '秦王',
        nominalDuty: '秦国最高君主，掌握军政决策权。',
        authorityScope: '秦国中央政务、军事扩张、人事任免和对六国兼并战略。',
        actualInfluence: '逐步清除吕不韦、嫪毐等政治力量后，实际掌控秦国最高权力。',
        modernEquivalent: '不宜直接类比',
        impact: '任用王翦、李斯等人，推进统一战争。',
      },
      {
        timeText: '前221-前210年',
        periodLabel: '秦始皇时期',
        title: '皇帝',
        nominalDuty: '帝国最高统治者，拥有最终军政、司法、立法和人事决定权。',
        authorityScope: '全国郡县行政、军队调度、制度建设、财政徭役和思想文化政策。',
        actualInfluence: '形成高度集中的皇权结构，丞相、御史大夫、太尉等中央官僚均服务于皇帝决策。',
        modernEquivalent: '不宜直接类比',
        impact: '确立大一统王朝的基本制度框架。',
      },
    ],
    relatedEventIds: ['qin-unification', 'standardization', 'burning-books', 'great-wall-qin', 'sha-qiu-coup'],
    disputeTabs: [
      {
        title: '统一功绩',
        body: '强调秦始皇结束战国分裂，建立统一制度，对中国历史长期格局影响深远。',
      },
      {
        title: '暴政批评',
        body: '强调严刑峻法、徭役沉重、思想控制等政策造成社会高压，是秦二世而亡的重要背景。',
      },
      {
        title: '制度视角',
        body: '现代研究常把秦制看作高度集权国家机器的早期形态，既有整合能力，也有社会承压问题。',
      },
    ],
  },
  {
    id: 'qin-er-shi',
    name: '秦二世',
    formalName: '胡亥',
    lifeText: '前230-前207年',
    birthYear: -230,
    deathYear: -207,
    categories: ['帝王君主', '亡国君主'],
    crossDynastyLabels: ['秦朝'],
    activePeriodLabels: ['秦二世时期'],
    dynastyIds: ['qin'],
    summary: '秦朝第二位皇帝，在赵高操控和严苛政策延续下，秦末起义迅速扩大，最终被赵高逼迫自杀。',
    background: '秦始皇幼子，原本并非最稳固的继承人选，其即位与沙丘政变、矫诏事件密切相关。',
    childhood: '可考材料有限。作为皇子成长于高度集权宫廷，政治经验和独立决断能力不足。',
    personality: '依赖近臣、缺乏政治判断，容易受赵高控制。',
    policyInclination: '延续高压统治和繁重徭役，没有及时缓和秦末社会矛盾。',
    socialContribution: '正面贡献有限，其统治更常作为秦朝快速崩溃的反面案例。',
    impactSummary: '其统治时期秦朝政治信用崩坏，中央对地方和军队控制力急剧下降。',
    resume: [
      {
        timeText: '前210-前207年',
        periodLabel: '秦二世时期',
        title: '皇帝',
        nominalDuty: '帝国最高统治者。',
        authorityScope: '名义上掌握全国军政、司法、财政和人事任免。',
        actualInfluence: '实际高度依赖赵高，重大决策常被宫廷权臣影响。',
        modernEquivalent: '不宜直接类比',
        impact: '未能有效应对大泽乡起义和各地反秦力量。',
      },
    ],
    relatedEventIds: ['fake-edict-hu-hai', 'daze-uprising', 'zhi-lu-wei-ma', 'fall-of-qin'],
    disputeTabs: [
      {
        title: '个人责任',
        body: '传统叙事强调胡亥昏庸残暴、听信赵高，是秦亡的重要责任人。',
      },
      {
        title: '制度困境',
        body: '也可从秦制高压、继承机制不稳定和地方承压过重理解其短命统治。',
      },
    ],
  },
  {
    id: 'zi-ying',
    name: '子婴',
    formalName: '嬴子婴',
    lifeText: '？-前206年',
    birthYear: null,
    deathYear: -206,
    categories: ['末代君主'],
    crossDynastyLabels: ['秦朝', '秦末楚汉'],
    activePeriodLabels: ['秦亡与楚汉转折'],
    dynastyIds: ['qin'],
    summary: '秦朝最后统治者，诛杀赵高后向刘邦投降，秦朝灭亡。',
    background: '宗室身份和具体世系有不同说法，处于秦末中央权威崩溃的极端危局。',
    childhood: '缺乏可靠材料。',
    personality: '在短促执政中显示出清除赵高的决断，但已无力挽回秦亡。',
    policyInclination: '尝试纠正赵高专权造成的政治失控。',
    socialContribution: '结束赵高控制，但无法重建秦朝秩序。',
    impactSummary: '其投降标志秦朝作为统一王朝的终结。',
    resume: [
      {
        timeText: '前207年',
        periodLabel: '秦亡与楚汉转折',
        title: '秦王',
        nominalDuty: '秦政权名义最高统治者。',
        authorityScope: '咸阳及秦中央残余政权。',
        actualInfluence: '实际控制范围极小，外部反秦力量已压倒秦中央。',
        modernEquivalent: '不宜直接类比',
        impact: '诛杀赵高后向刘邦投降，秦朝灭亡。',
      },
    ],
    relatedEventIds: ['fall-of-qin'],
    disputeTabs: [
      {
        title: '身份争议',
        body: '子婴的具体世系在史料中存在不同理解，原型中以“秦宗室、末代秦王”处理。',
      },
    ],
  },
  {
    id: 'li-si',
    name: '李斯',
    formalName: '李斯',
    lifeText: '约前284-前208年',
    birthYear: -284,
    deathYear: -208,
    categories: ['丞相', '制度设计者', '法家人物'],
    crossDynastyLabels: ['战国秦', '秦朝'],
    activePeriodLabels: ['秦王政时期', '秦始皇时期', '秦二世时期'],
    dynastyIds: ['eastern-zhou', 'qin'],
    summary: '秦统一和制度建设的重要参与者，推动郡县制、文字统一等政策，后在沙丘政变中与赵高合谋，最终被赵高陷害处死。',
    background: '楚国上蔡人，早年为小吏，后从荀子学习帝王之术，入秦后逐步进入权力核心。',
    childhood: '早年家世细节不详，史书以其从基层小吏到入秦游说的经历突出其功名意识。',
    personality: '务实、精于权衡、重功名，政治判断强但在继承危机中选择失误。',
    policyInclination: '法家治理、中央集权、郡县制和标准化行政。',
    socialContribution: '参与建立秦朝行政制度和统一文字，对后世官僚国家影响巨大。',
    impactSummary: '李斯既是秦制功臣，也是秦末继承危机中的关键责任人之一。',
    resume: [
      {
        timeText: '战国末期',
        periodLabel: '秦王政时期',
        title: '客卿、廷尉等',
        nominalDuty: '参与秦国政务、法律和外交文书事务。',
        authorityScope: '法律审理、政策建议、对外兼并论证等。',
        actualInfluence: '通过《谏逐客书》等政治表达获得秦王信任。',
        modernEquivalent: '中央法务与政策顾问的职能近似',
        impact: '帮助秦国吸纳外来人才，服务统一战略。',
      },
      {
        timeText: '前221-前210年',
        periodLabel: '秦始皇时期',
        title: '丞相',
        nominalDuty: '协助皇帝处理最高行政事务。',
        authorityScope: '中央行政协调、法令文书、制度推行、官僚系统运转。',
        actualInfluence: '属于秦朝最高行政官员之一，但最终受皇帝直接控制。',
        modernEquivalent: '中央最高行政辅佐者，不能等同现代总理',
        impact: '参与郡县制、文字统一和思想文化政策。',
      },
      {
        timeText: '前210-前208年',
        periodLabel: '秦二世时期',
        title: '丞相',
        nominalDuty: '继续协助皇帝处理中央行政。',
        authorityScope: '名义上仍有最高行政协调权。',
        actualInfluence: '受到赵高排挤，政治影响力急剧下降。',
        modernEquivalent: '中央最高行政辅佐者，不能等同现代总理',
        impact: '参与矫诏立胡亥后被赵高陷害处死。',
      },
    ],
    relatedEventIds: ['qin-unification', 'standardization', 'burning-books', 'fake-edict-hu-hai'],
    disputeTabs: [
      {
        title: '制度功臣',
        body: '李斯是秦朝制度建设核心人物之一，尤其在文字、郡县和法令体系中影响显著。',
      },
      {
        title: '政治失误',
        body: '沙丘政变中选择配合赵高，改变继承走向，成为秦末崩溃链条中的关键节点。',
      },
    ],
  },
  {
    id: 'zhao-gao',
    name: '赵高',
    formalName: '赵高',
    lifeText: '？-前207年',
    birthYear: null,
    deathYear: -207,
    categories: ['权臣', '近侍官员', '争议人物'],
    crossDynastyLabels: ['秦始皇时期', '秦二世时期', '秦亡前夕'],
    activePeriodLabels: ['秦始皇时期', '秦二世时期', '秦亡与楚汉转折'],
    dynastyIds: ['qin'],
    summary: '秦末宫廷权臣，参与沙丘政变和矫诏立胡亥，陷害李斯，制造“指鹿为马”政治恐惧，最终被子婴诛杀。',
    background: '生年、家世和是否宦官均有争议。史书强调其熟悉法律文书、接近皇帝车舆近侍系统，并由宫廷事务进入权力核心。',
    childhood: '可靠材料不足，不能复原其幼年生活。若从后期行为推断，其政治风格体现出强烈的风险控制、权力攫取和对宫廷信息链的依赖。',
    personality: '机敏、隐忍、善操控信息和人际恐惧，权力欲极强；传统评价多将其视为奸臣典型。',
    policyInclination: '没有系统治国政策，更偏向宫廷权术、控制皇帝、清除异己和维护个人权力。',
    socialContribution: '正面社会贡献有限；其案例有助于理解皇权近侍、诏令传递和制度失衡的危险。',
    impactSummary: '赵高通过控制继承、皇帝和中央文书链条，显著加速秦朝政治崩坏，是秦亡叙事中的关键人物。',
    resume: [
      {
        timeText: '秦始皇时期',
        periodLabel: '秦始皇时期',
        title: '中车府令',
        nominalDuty: '少府属官，掌皇帝车舆、出行及宫廷相关事务。',
        authorityScope: '皇帝车舆、随行安排、部分宫廷近侍事务和出行信息链。',
        actualInfluence: '官位本身不一定最高，但因接近皇帝和诏令流转，能够接触宫廷机要。',
        modernEquivalent: '不宜直接类比',
        impact: '积累宫廷信任和信息优势，为沙丘政变中的操作提供条件。',
      },
      {
        timeText: '前210年',
        periodLabel: '沙丘政变',
        title: '随行近臣',
        nominalDuty: '随侍皇帝车驾，参与遗诏和宫廷事务处理。',
        authorityScope: '皇帝病逝后的信息封锁、遗诏传递和宫廷沟通链路。',
        actualInfluence: '与李斯合谋矫诏，拥立胡亥，改变秦朝继承走向。',
        modernEquivalent: '不宜直接类比',
        impact: '使扶苏、蒙恬政治路线被切断，秦二世即位。',
      },
      {
        timeText: '前210-前208年',
        periodLabel: '秦二世时期',
        title: '郎中令',
        nominalDuty: '掌宫廷门户、侍从、传达诏命等近侍事务。',
        authorityScope: '宫廷近侍系统、皇帝身边事务、诏令传递和内廷出入。',
        actualInfluence: '因控制皇帝身边人事与信息通道，实际影响力远超一般宫廷官员。',
        modernEquivalent: '不宜直接类比',
        impact: '排挤李斯，制造朝臣恐惧，巩固对秦二世的控制。',
      },
      {
        timeText: '前208-前207年',
        periodLabel: '秦二世末年',
        title: '中丞相等相位称号（史书记载）',
        nominalDuty: '参与或主持中央政务。',
        authorityScope: '中央行政决策、朝臣任免、对皇帝的政治控制。',
        actualInfluence: '实际成为秦朝中央权力核心，甚至逼杀秦二世。',
        modernEquivalent: '中央最高行政权臣的职能近似，但不可等同现代职位',
        impact: '秦中央失去政治信用，子婴即位后将其诛杀。',
      },
    ],
    relatedEventIds: ['sha-qiu-coup', 'fake-edict-hu-hai', 'zhi-lu-wei-ma', 'fall-of-qin'],
    disputeTabs: [
      {
        title: '正史评价',
        body: '《史记》等传统叙事将赵高塑造成乱秦奸臣，强调其矫诏、害忠良、欺君和乱政。',
      },
      {
        title: '制度视角',
        body: '赵高的崛起也暴露秦制中皇权过度集中、继承不透明、宫廷近侍和诏令链条缺乏制衡的问题。',
      },
      {
        title: '史实存疑',
        body: '赵高出身、是否宦官、部分事件细节的戏剧化程度存在讨论，原型中用“史书记载”和“合理推断”区分。',
      },
      {
        title: '文学形象',
        body: '后世常把赵高作为奸臣、弄权和颠倒黑白的象征，“指鹿为马”也成为政治恐惧的典故。',
      },
    ],
  },
  {
    id: 'meng-tian',
    name: '蒙恬',
    formalName: '蒙恬',
    lifeText: '？-前210年',
    birthYear: null,
    deathYear: -210,
    categories: ['将领', '边防人物'],
    crossDynastyLabels: ['战国秦', '秦朝'],
    activePeriodLabels: ['秦始皇时期'],
    dynastyIds: ['eastern-zhou', 'qin'],
    summary: '秦名将，北击匈奴、主持北方边防和长城体系建设，后因沙丘政变被赐死。',
    background: '出身秦国将门，祖父蒙骜、父亲蒙武皆为秦将。',
    childhood: '将门环境使其早期可能接受军事和贵族官僚训练。',
    personality: '谨慎忠诚、军事能力强，传统形象偏忠臣良将。',
    policyInclination: '重边防、军事整合和北方安全。',
    socialContribution: '维护秦北部边疆，推动长城和边防体系整合。',
    impactSummary: '蒙恬之死削弱秦朝军事和政治平衡，也使扶苏路线失去支撑。',
    resume: [
      {
        timeText: '秦始皇时期',
        periodLabel: '秦始皇时期',
        title: '将军',
        nominalDuty: '统率军队，执行北方军事行动和边防建设。',
        authorityScope: '北方军团、边防工程、军事屯驻和匈奴方向防御。',
        actualInfluence: '掌握重兵并与扶苏关系密切，是秦末继承格局中的重要军事支撑。',
        modernEquivalent: '高级战区军事统帅的职能近似，不等同现代军衔',
        impact: '北击匈奴、修筑和连接长城防线。',
      },
    ],
    relatedEventIds: ['great-wall-qin', 'sha-qiu-coup'],
    disputeTabs: [
      {
        title: '忠臣形象',
        body: '传统叙事多强调蒙恬忠于秦始皇遗命和扶苏路线。',
      },
    ],
  },
  {
    id: 'wang-jian',
    name: '王翦',
    formalName: '王翦',
    lifeText: '生卒年不详',
    birthYear: null,
    deathYear: null,
    categories: ['将领', '统一战争人物'],
    crossDynastyLabels: ['战国秦'],
    activePeriodLabels: ['秦王政时期'],
    dynastyIds: ['eastern-zhou'],
    summary: '秦统一战争核心将领之一，灭赵、燕、楚等战争中作用突出。',
    background: '秦国名将，军事经验丰富。',
    childhood: '缺乏可靠材料。',
    personality: '老成谨慎，善于评估战争成本和政治风险。',
    policyInclination: '服务秦国兼并战略，以稳妥军事推进见长。',
    socialContribution: '为秦统一六国做出重大军事贡献。',
    impactSummary: '王翦家族在秦灭六国过程中地位极高，体现秦国职业军事集团力量。',
    resume: [
      {
        timeText: '前3世纪后期',
        periodLabel: '秦王政时期',
        title: '将军',
        nominalDuty: '统率秦军执行灭国战争。',
        authorityScope: '前线军队指挥、战役计划和军事部署。',
        actualInfluence: '在统一战争中拥有极高军事决策影响力。',
        modernEquivalent: '高级军事统帅的职能近似',
        impact: '参与灭赵、燕、楚等关键战争。',
      },
    ],
    relatedEventIds: ['qin-unification'],
    disputeTabs: [],
  },
  {
    id: 'wang-ben',
    name: '王贲',
    formalName: '王贲',
    lifeText: '生卒年不详',
    birthYear: null,
    deathYear: null,
    categories: ['将领', '统一战争人物'],
    crossDynastyLabels: ['战国秦'],
    activePeriodLabels: ['秦王政时期'],
    dynastyIds: ['eastern-zhou'],
    summary: '王翦之子，秦统一战争重要将领，参与灭魏、燕、齐等行动。',
    background: '出身秦国王氏将门。',
    childhood: '缺乏可靠材料。',
    personality: '军事执行力强，承接王氏家族军事资源。',
    policyInclination: '服务秦国统一战争。',
    socialContribution: '推进秦灭六国进程。',
    impactSummary: '帮助秦完成对东方诸国的最后兼并。',
    resume: [
      {
        timeText: '前3世纪后期',
        periodLabel: '秦王政时期',
        title: '将军',
        nominalDuty: '统率秦军执行灭国战役。',
        authorityScope: '前线军队、攻城作战和军事部署。',
        actualInfluence: '在灭魏、燕、齐等战役中影响显著。',
        modernEquivalent: '高级军事统帅的职能近似',
        impact: '助力秦统一六国。',
      },
    ],
    relatedEventIds: ['qin-unification'],
    disputeTabs: [],
  },
  {
    id: 'zhang-han',
    name: '章邯',
    formalName: '章邯',
    lifeText: '？-前205年',
    birthYear: null,
    deathYear: -205,
    categories: ['将领', '秦末人物'],
    crossDynastyLabels: ['秦朝', '秦末楚汉'],
    activePeriodLabels: ['秦二世时期', '秦亡与楚汉转折'],
    dynastyIds: ['qin'],
    summary: '秦末重要将领，率刑徒军镇压起义，后在巨鹿之战后降楚。',
    background: '秦中央军事系统人物，秦末临危受命。',
    childhood: '缺乏可靠材料。',
    personality: '军事能力强，但在政治和后勤压力下选择转向。',
    policyInclination: '以维护秦中央秩序为初始目标。',
    socialContribution: '其军事行动一度延缓秦末起义扩张。',
    impactSummary: '章邯降楚削弱秦朝最后军事支柱，加速秦亡。',
    resume: [
      {
        timeText: '前209-前207年',
        periodLabel: '秦二世时期',
        title: '少府、将军',
        nominalDuty: '少府本管皇室财政和宫廷工官系统，临时转为军事统帅镇压起义。',
        authorityScope: '刑徒军、秦中央残余军事资源和前线作战。',
        actualInfluence: '成为秦末最重要的前线将领之一。',
        modernEquivalent: '临时军事统帅的职能近似',
        impact: '击败多支起义军，后因形势恶化降楚。',
      },
    ],
    relatedEventIds: ['daze-uprising', 'julu-battle', 'fall-of-qin'],
    disputeTabs: [],
  },
  {
    id: 'chen-sheng',
    name: '陈胜',
    formalName: '陈胜',
    lifeText: '？-前208年',
    birthYear: null,
    deathYear: -208,
    categories: ['起义领袖', '秦末人物'],
    crossDynastyLabels: ['秦朝'],
    activePeriodLabels: ['秦二世时期'],
    dynastyIds: ['qin'],
    summary: '大泽乡起义领袖之一，提出“王侯将相宁有种乎”，建立张楚政权。',
    background: '秦末戍卒，处于徭役、兵役和严刑峻法压力之下。',
    childhood: '贫苦出身，早年具体经历不详。',
    personality: '有号召力和反抗意识，但政权治理经验不足。',
    policyInclination: '反秦，试图建立新的政治号召中心。',
    socialContribution: '揭开秦末大规模反秦起义序幕。',
    impactSummary: '大泽乡起义打破秦朝威慑，激发各地反秦力量。',
    resume: [
      {
        timeText: '前209年',
        periodLabel: '秦二世时期',
        title: '起义领袖、张楚王',
        nominalDuty: '组织反秦军政力量。',
        authorityScope: '起义军、张楚政权控制区域和反秦动员。',
        actualInfluence: '短期内号召力极强，成为秦末反秦的象征。',
        modernEquivalent: '不宜直接类比',
        impact: '发动大泽乡起义，动摇秦朝统治。',
      },
    ],
    relatedEventIds: ['daze-uprising'],
    disputeTabs: [],
  },
  {
    id: 'wu-guang',
    name: '吴广',
    formalName: '吴广',
    lifeText: '？-前208年',
    birthYear: null,
    deathYear: -208,
    categories: ['起义领袖', '秦末人物'],
    crossDynastyLabels: ['秦朝'],
    activePeriodLabels: ['秦二世时期'],
    dynastyIds: ['qin'],
    summary: '大泽乡起义领袖之一，与陈胜共同发动反秦起义。',
    background: '秦末戍卒，因误期风险和秦法严酷走向反抗。',
    childhood: '缺乏可靠材料。',
    personality: '敢于反抗，具备基层动员能力。',
    policyInclination: '反秦。',
    socialContribution: '共同揭开秦末起义序幕。',
    impactSummary: '与陈胜一起打破秦朝基层统治秩序。',
    resume: [
      {
        timeText: '前209年',
        periodLabel: '秦二世时期',
        title: '起义领袖',
        nominalDuty: '组织和指挥起义军。',
        authorityScope: '大泽乡起义军及早期反秦动员网络。',
        actualInfluence: '与陈胜共同成为反秦起义开端人物。',
        modernEquivalent: '不宜直接类比',
        impact: '参与发动大泽乡起义。',
      },
    ],
    relatedEventIds: ['daze-uprising'],
    disputeTabs: [],
  },
  {
    id: 'xiang-yu',
    name: '项羽',
    formalName: '项籍',
    lifeText: '前232-前202年',
    birthYear: -232,
    deathYear: -202,
    categories: ['军事领袖', '霸王', '秦末楚汉人物'],
    crossDynastyLabels: ['秦朝', '秦末楚汉'],
    activePeriodLabels: ['秦二世时期', '秦亡与楚汉转折'],
    dynastyIds: ['qin'],
    summary: '秦末楚军领袖，巨鹿之战击溃秦军主力，自称西楚霸王，后在楚汉战争中败于刘邦。',
    background: '楚国贵族后裔，成长于亡国记忆和反秦情绪浓厚的环境。',
    childhood: '史书突出其勇力和不愿拘泥书剑小技的性格。',
    personality: '勇猛果决、重个人威望和贵族气节，但政治整合能力不足。',
    policyInclination: '倾向分封和军事威望政治，不擅长持久制度建设。',
    socialContribution: '摧毁秦军主力，推动秦亡。',
    impactSummary: '项羽改变秦末战争格局，但分封秩序未能稳定，最终被刘邦取代。',
    resume: [
      {
        timeText: '前207年',
        periodLabel: '秦亡与楚汉转折',
        title: '楚军统帅',
        nominalDuty: '统率楚军与诸侯军对秦作战。',
        authorityScope: '楚军主力、诸侯联军协调和战役决策。',
        actualInfluence: '巨鹿之战后成为反秦阵营最强军事领袖。',
        modernEquivalent: '联军最高军事统帅的职能近似',
        impact: '击溃章邯秦军主力，加速秦朝灭亡。',
      },
      {
        timeText: '前206-前202年',
        periodLabel: '楚汉战争',
        title: '西楚霸王',
        nominalDuty: '分封诸侯，掌握楚地和部分诸侯秩序。',
        authorityScope: '西楚控制区域、诸侯分封格局和军事动员。',
        actualInfluence: '军事威望极高，但政治联盟逐渐瓦解。',
        modernEquivalent: '不宜直接类比',
        impact: '与刘邦争夺天下，最终败亡。',
      },
    ],
    relatedEventIds: ['julu-battle', 'fall-of-qin', 'chu-han-war'],
    disputeTabs: [
      {
        title: '英雄叙事',
        body: '文学和民间记忆常强调项羽勇武、悲剧和个人魅力。',
      },
      {
        title: '政治评价',
        body: '历史分析更关注其分封失衡、用人和制度建设不足。',
      },
    ],
  },
  {
    id: 'liu-bang',
    name: '刘邦',
    formalName: '刘邦',
    lifeText: '前256-前195年',
    birthYear: -256,
    deathYear: -195,
    categories: ['开国君主', '秦末楚汉人物'],
    crossDynastyLabels: ['秦朝', '秦末楚汉', '西汉'],
    activePeriodLabels: ['秦二世时期', '秦亡与楚汉转折', '西汉初年'],
    dynastyIds: ['qin', 'western-han'],
    summary: '秦末起兵，先入关中，后在楚汉战争中击败项羽，建立西汉。',
    background: '沛县基层小吏出身，熟悉地方社会和基层治理网络。',
    childhood: '早年家世普通，史书记载其性格豁达、不拘小节。',
    personality: '务实、善纳谏、善用人，能在危机中调整策略。',
    policyInclination: '反秦后重视关中秩序和人才整合，建汉后采取休养生息方向。',
    socialContribution: '建立西汉，承接并调整秦制。',
    impactSummary: '刘邦把秦末战争导向新的统一王朝，是秦汉制度转换的关键人物。',
    resume: [
      {
        timeText: '前209-前206年',
        periodLabel: '秦末反秦',
        title: '沛公',
        nominalDuty: '起义军首领，统率沛县集团反秦。',
        authorityScope: '沛县集团、入关军队和关中接收事务。',
        actualInfluence: '先入咸阳，获得关中政治资本。',
        modernEquivalent: '不宜直接类比',
        impact: '接受子婴投降，秦朝灭亡。',
      },
      {
        timeText: '前206-前202年',
        periodLabel: '楚汉战争',
        title: '汉王',
        nominalDuty: '统治汉中、巴蜀等封地并参与天下争夺。',
        authorityScope: '汉军、关中和汉地军政资源。',
        actualInfluence: '依靠萧何、张良、韩信等人才完成战略反攻。',
        modernEquivalent: '割据政权君主，不宜直接类比',
        impact: '击败项羽，建立西汉。',
      },
    ],
    relatedEventIds: ['fall-of-qin', 'chu-han-war'],
    disputeTabs: [
      {
        title: '用人能力',
        body: '刘邦常被评价为善于识人、授权和整合资源的政治家。',
      },
      {
        title: '帝王手腕',
        body: '建汉后处理异姓王问题显示强烈权力安全意识。',
      },
    ],
  },
  {
    id: 'xiao-he',
    name: '萧何',
    formalName: '萧何',
    lifeText: '前257-前193年',
    birthYear: -257,
    deathYear: -193,
    categories: ['宰辅', '制度人物'],
    crossDynastyLabels: ['秦朝', '秦末楚汉', '西汉'],
    activePeriodLabels: ['秦亡与楚汉转折', '西汉初年'],
    dynastyIds: ['qin', 'western-han'],
    summary: '刘邦集团核心文臣，负责后勤、关中治理和汉初制度建设。',
    background: '秦沛县官吏出身，熟悉基层行政。',
    childhood: '缺乏可靠材料。',
    personality: '稳健、细密、重行政秩序和后勤保障。',
    policyInclination: '重制度承接、行政稳定和休养生息。',
    socialContribution: '保存秦律令图书，协助汉初制度建设。',
    impactSummary: '萧何保障刘邦长期战争能力，是汉初国家机器稳定的重要人物。',
    resume: [
      {
        timeText: '秦末起义前后',
        periodLabel: '沛县基层行政与刘邦起兵',
        title: '沛县主吏掾 / 起义集团行政骨干',
        nominalDuty: '在县级行政中处理文书、官吏事务与户籍赋役，起兵后协助刘邦组织人员和后方。',
        authorityScope: '早期权限主要在沛县行政文书、基层官吏网络和起义集团的人员物资管理，无独立军事统帅权。',
        actualInfluence: '利用对秦代县政、户籍和地方人际的熟悉，成为刘邦集团中最早的行政组织者之一。',
        modernEquivalent: '职能近似县政府人事文书官与起义组织的行政后勤负责人。',
        impact: '为沛县集团从地方人际网络转化为可运作的军政组织提供基础。',
      },
      {
        timeText: '前206-前202年',
        periodLabel: '楚汉战争',
        title: '丞相、相国系统职务',
        nominalDuty: '协助汉王处理政务和后勤。',
        authorityScope: '关中行政、粮草转运、人口财政和文书档案。',
        actualInfluence: '为前线战争提供持续后勤，是刘邦集团稳定器。',
        modernEquivalent: '中央行政与后勤统筹者的职能近似',
        impact: '保障汉军持久作战能力。',
      },
      {
        timeText: '前202-前193年',
        periodLabel: '西汉初年制度恢复',
        title: '丞相 / 相国',
        nominalDuty: '协助皇帝统筹中央行政、法令、财政、官吏与战后恢复，并在皇帝出征时稳定关中。',
        authorityScope: '中央官僚协调、地方官吏与户籍赋税制度、关中后方和国家法令整理，最终决策仍属皇帝。',
        actualInfluence: '以秦代文书和行政经验为基础恢复国家运转，同时处理功臣、封国与皇权安全问题。',
        modernEquivalent: '职能近似中央政府最高行政协调者，但受皇帝最终权力直接约束。',
        impact: '帮助西汉把战时动员体系转为稳定的中央与地方行政秩序。',
      },
    ],
    relatedEventIds: ['chu-han-war'],
    disputeTabs: [],
  },
  {
    id: 'zhang-liang',
    name: '张良',
    formalName: '张良',
    lifeText: '约前250-前186年',
    birthYear: -250,
    deathYear: -186,
    categories: ['谋士', '战略家'],
    crossDynastyLabels: ['秦朝', '秦末楚汉', '西汉'],
    activePeriodLabels: ['秦亡与楚汉转折', '西汉初年'],
    dynastyIds: ['qin', 'western-han'],
    summary: '韩国贵族后裔，秦末辅佐刘邦，以战略谋划和政治判断著称。',
    background: '韩国贵族后裔，有强烈反秦动机。',
    childhood: '早年受亡国背景影响，曾策划刺秦。',
    personality: '冷静、审慎、善谋略，能在关键节点判断利害。',
    policyInclination: '重战略联盟、时机判断和低成本政治选择。',
    socialContribution: '帮助刘邦在秦末楚汉局势中作出关键战略选择。',
    impactSummary: '张良提升刘邦集团的战略决策质量。',
    resume: [
      {
        timeText: '秦末楚汉',
        periodLabel: '秦亡与楚汉转折',
        title: '谋士',
        nominalDuty: '提供军事和政治策略建议。',
        authorityScope: '无固定行政管辖，主要影响战略判断和君主决策。',
        actualInfluence: '通过建议影响刘邦入关、避险和联盟选择。',
        modernEquivalent: '高级战略顾问的职能近似',
        impact: '在鸿门宴、楚汉战略中发挥重要作用。',
      },
    ],
    relatedEventIds: ['chu-han-war'],
    disputeTabs: [],
  },
  {
    id: 'han-xin',
    name: '韩信',
    formalName: '韩信',
    lifeText: '？-前196年',
    birthYear: null,
    deathYear: -196,
    categories: ['将领', '军事家'],
    crossDynastyLabels: ['秦末楚汉', '西汉'],
    activePeriodLabels: ['秦亡与楚汉转折', '西汉初年'],
    dynastyIds: ['western-han'],
    summary: '楚汉战争中刘邦阵营最重要的军事统帅之一，以大兵团作战和战略迂回著称。',
    background: '早年贫困，曾受胯下之辱，后经萧何推荐被刘邦重用。',
    childhood: '贫困与受辱经历常被用于解释其强烈功名追求。',
    personality: '军事天才、自尊心强，政治安全判断不足。',
    policyInclination: '军事上善于机动与分进合击，政治上更重个人功业。',
    socialContribution: '帮助刘邦击败项羽，完成西汉建立。',
    impactSummary: '韩信的军事胜利直接改变楚汉战争走向。',
    resume: [
      {
        timeText: '前206年',
        periodLabel: '投汉与登坛拜将',
        title: '治粟都尉 / 大将军',
        nominalDuty: '先承担军粮行政职务，后被任命为汉军最高级别统帅，制定还定三秦与东进方案。',
        authorityScope: '任大将军后可按汉王授权统筹军令、将领部署和作战计划，政治封赏与全国战略最终由刘邦决定。',
        actualInfluence: '经萧何力荐获得超越原有资历的授权，将对楚汉全局的判断转化为汉军作战部署。',
        modernEquivalent: '职能近似中央军队总指挥与战略规划负责人，不等同现代军衔。',
        impact: '完成从边缘军官到汉军主要统帅的转折，为后续分兵经营北方创造条件。',
      },
      {
        timeText: '前205-前202年',
        periodLabel: '北方战场与垓下合围',
        title: '汉军方面统帅 / 齐王',
        nominalDuty: '统率方面军开辟北方战场，攻取魏、赵、燕、齐等地，并配合刘邦对项羽形成最终合围。',
        authorityScope: '前线军队指挥、战役计划、粮道与新占地区的军事控制；作为齐王一度拥有封国军政权，但合法性来自汉王封授。',
        actualInfluence: '以迂回、渡河、背水阵等多种战法连续改变战区势力对比，成为楚汉战争中最具决定性的将领之一。',
        modernEquivalent: '职能近似多战区方面军统帅兼战时占领区军政负责人。',
        impact: '切断项羽的外围同盟与资源，为垓下之战和西汉建立奠定军事条件。',
      },
      {
        timeText: '前202-前196年',
        periodLabel: '楚王、淮阴侯与功臣安全危机',
        title: '楚王 / 淮阴侯',
        nominalDuty: '作为异姓诸侯王管理封国军政；被降为淮阴侯后留居京师，不再独立统兵。',
        authorityScope: '初封楚王时权限及于封国官吏与军队；改封列侯后政治活动受长安朝廷监控，无独立军政调度权。',
        actualInfluence: '战功带来巨大声望，却也引发刘邦对异姓王的安全疑虑；其权限逐步被削减，最终由吕后与萧何设计诛杀。',
        modernEquivalent: '前期属于封国军政最高统治者，后期为无实际军权的高等爵位持有者，不宜直接类比现代职位。',
        impact: '韩信的结局成为西汉初年皇权整合异姓诸侯、处理“功高震主”问题的典型案例。',
      },
    ],
    relatedEventIds: ['chu-han-war'],
    disputeTabs: [
      {
        title: '军事评价',
        body: '韩信常被视为中国古代军事天才之一。',
      },
      {
        title: '政治悲剧',
        body: '其战后身份和功高震主问题，使其最终被汉初权力结构清除。',
      },
    ],
  },
];

const events = [
  {
    id: 'spring-autumn-hegemony',
    name: '春秋争霸',
    dateText: '前770-前476年',
    dynastyIds: ['eastern-zhou'],
    periodLabel: '春秋时期',
    tags: ['春秋', '诸侯争霸', '五霸', '教材重点'],
    relatedPersonIds: ['qi-huan-gong', 'guan-zhong', 'jin-wen-gong', 'chu-zhuang-wang', 'goujian'],
    summary: '周王室权威下降后，齐、晋、楚、吴、越等诸侯国通过会盟、战争和外交争夺霸主地位。',
    background: '西周结束后，周天子仍有名义共主地位，但实际控制力下降，诸侯国力量上升。',
    process: '齐桓公任用管仲率先称霸，晋文公、楚庄王等诸侯相继主导中原或区域秩序。',
    result: '分封秩序逐渐瓦解，诸侯兼并与制度变革为战国局面铺路。',
    impact: '春秋争霸是理解东周政治秩序变化、诸侯外交和礼崩乐坏的重要入口。',
    disputeTabs: [],
  },
  {
    id: 'three-families-jin',
    name: '三家分晋',
    dateText: '前453年、前403年',
    dynastyIds: ['eastern-zhou'],
    periodLabel: '春秋战国之际',
    tags: ['战国开端', '韩赵魏', '教材重点'],
    relatedPersonIds: ['wei-wen-hou'],
    summary: '晋国内部韩、赵、魏三家逐步瓜分晋国，周天子正式承认三家为诸侯，常被视为春秋到战国转换的重要标志。',
    background: '春秋后期卿大夫势力坐大，晋国公室衰弱。',
    process: '韩、赵、魏三家消灭智氏并瓜分晋地，最终获得周王室正式册命。',
    result: '韩、赵、魏成为战国七雄中的三国。',
    impact: '三家分晋体现分封贵族秩序崩解和新型诸侯国家兴起。',
    disputeTabs: [],
  },
  {
    id: 'hundred-schools',
    name: '百家争鸣',
    dateText: '春秋战国时期',
    dynastyIds: ['eastern-zhou'],
    periodLabel: '春秋战国',
    tags: ['思想文化', '儒家', '道家', '法家', '教材重点'],
    relatedPersonIds: ['kongzi', 'laozi', 'mengzi', 'zhuangzi', 'xunzi', 'han-fei', 'sun-wu', 'su-qin', 'zhang-yi', 'qu-yuan'],
    summary: '社会剧变和诸侯竞争推动思想活跃，儒、道、墨、法、兵、纵横等学派提出不同治国和人生方案。',
    background: '周礼秩序瓦解、战争频繁、官学下移和士阶层兴起，为思想竞争提供空间。',
    process: '各学派人物游说诸侯、授徒著书，围绕秩序、权力、伦理、战争和治理展开争论。',
    result: '形成中国思想史上极具创造力的阶段。',
    impact: '诸子思想成为后世政治、伦理、军事和文化传统的重要资源。',
    disputeTabs: [],
  },
  {
    id: 'shang-yang-reform',
    name: '商鞅变法',
    dateText: '前356年、前350年',
    dynastyIds: ['eastern-zhou'],
    periodLabel: '战国中期秦国',
    tags: ['变法', '秦国崛起', '法家', '教材重点'],
    relatedPersonIds: ['qin-xiao-gong', 'shang-yang'],
    summary: '商鞅在秦孝公支持下推行两次变法，强化军功爵、县制、户籍和重农战政策。',
    background: '战国竞争加剧，秦国需要通过制度改革提升农业、军事和行政动员能力。',
    process: '变法推行奖励耕战、废除旧贵族特权、建立县制和严密法令。',
    result: '秦国国力显著增强，旧贵族利益受冲击，商鞅最终被处死。',
    impact: '为秦国后续兼并六国提供制度基础，也强化法家高压治理传统。',
    disputeTabs: [
      {
        title: '强国逻辑',
        body: '从国家竞争看，商鞅变法显著提升秦国组织和动员效率。',
      },
      {
        title: '社会代价',
        body: '从社会治理看，严刑峻法和重农战逻辑也带来高压秩序。',
      },
    ],
  },
  {
    id: 'yique-battle',
    name: '伊阙之战',
    dateText: '前293年',
    dynastyIds: ['eastern-zhou'],
    periodLabel: '战国中期秦国东出',
    tags: ['白起', '秦韩魏', '兼并战争', '战国重点'],
    relatedPersonIds: ['qin-zhao-xiang-wang', 'bai-qi', 'gong-sun-xi', 'bao-yuan'],
    summary: '秦将白起在伊阙击败韩魏联军，是白起成名战之一，也使秦国对韩魏方向取得显著军事优势。',
    background: '战国中期秦国持续东出，韩国、魏国在秦军压力下组织联军抵抗。',
    process: '白起利用联军协调不畅等问题展开攻击，击败韩魏联军，公孙喜等联军将领成为战役叙事中的关键对手。',
    result: '韩魏军事力量遭重创，秦国东出通道进一步打开。',
    impact: '伊阙之战标志白起进入战国名将序列，也显示秦国职业军队和战役组织能力的上升。',
    disputeTabs: [
      {
        title: '战役规模',
        body: '传统史书有大量斩首数字记载，正式长文应区分史书记载、战国军功叙事和现代考证。',
      },
    ],
  },
  {
    id: 'yan-ying-battle',
    name: '鄢郢之战',
    dateText: '前279-前278年',
    dynastyIds: ['eastern-zhou'],
    periodLabel: '战国后期秦楚战争',
    tags: ['白起', '楚国', '秦楚战争', '迁都'],
    relatedPersonIds: ['qin-zhao-xiang-wang', 'bai-qi', 'chu-qing-xiang-wang', 'qu-yuan'],
    summary: '白起率秦军攻楚，夺取鄢、郢等重地，楚国被迫迁都，国势受到沉重打击。',
    background: '战国后期秦国军事优势扩大，楚国虽地域广大，但内部贵族政治和外交判断存在压力。',
    process: '秦军深入楚境，攻取鄢、郢等战略重地，楚顷襄王迁都以避秦锋。',
    result: '楚国失去旧都和大片战略空间，秦国在南方方向取得重大成果。',
    impact: '鄢郢之战是秦削弱楚国的重要节点，也与屈原晚年悲剧和楚辞政治背景相关。',
    disputeTabs: [
      {
        title: '楚国衰落',
        body: '该战常被视为楚国由强国竞争转入被动防守的重要转折。',
      },
      {
        title: '屈原关联',
        body: '屈原投江与郢都失陷的具体因果在文学传统和历史考证中需要分层呈现。',
      },
    ],
  },
  {
    id: 'huayang-battle',
    name: '华阳之战',
    dateText: '前273年前后',
    dynastyIds: ['eastern-zhou'],
    periodLabel: '战国后期秦魏赵战争',
    tags: ['白起', '魏国', '赵国', '秦军奔袭'],
    relatedPersonIds: ['qin-zhao-xiang-wang', 'bai-qi', 'mang-mao', 'jia-yan'],
    summary: '秦军在华阳方向击败魏、赵相关军队，白起、魏冉、胡阳等秦方人物常与此战联系在一起。',
    background: '韩、魏、赵等国在秦国持续东出压力下相互牵连，华阳地区成为多方军事冲突点。',
    process: '秦军快速救援或奔袭华阳，击败魏将芒卯，并与赵将贾偃相关部队交战。',
    result: '魏赵方向遭受打击，秦国进一步压缩东方诸国战略空间。',
    impact: '华阳之战帮助用户理解白起并非只有长平一战，而是在多条战线上持续削弱对手。',
    disputeTabs: [
      {
        title: '记载差异',
        body: '不同史籍对年份、参战人物和战果数字存在差异，正式内容应保留“史书记载”标签。',
      },
    ],
  },
  {
    id: 'changping-battle',
    name: '长平之战',
    dateText: '前260年',
    dynastyIds: ['eastern-zhou'],
    periodLabel: '战国后期',
    tags: ['秦赵争霸', '白起', '赵国', '教材重点'],
    relatedPersonIds: ['qin-zhao-xiang-wang', 'bai-qi', 'wang-he', 'lian-po', 'zhao-kuo'],
    summary: '秦赵之间的大规模决战，赵军惨败，秦国进一步取得统一战争优势。',
    background: '战国后期秦赵争夺上党地区，赵国由廉颇坚守转向赵括出战。',
    process: '秦将王龁前期进攻，赵将廉颇坚守；赵王改用赵括后，秦国秘密以白起为上将军，最终秦军围歼赵军。',
    result: '赵国元气大伤，秦国兼并优势扩大。',
    impact: '长平之战是战国后期秦统一进程中的关键军事节点。',
    disputeTabs: [
      {
        title: '军事转折',
        body: '长平之战显著削弱赵国，是秦国统一进程中的关键节点。',
      },
      {
        title: '史料与数字',
        body: '关于战后坑杀人数等细节，正式内容应区分史书记载、考古线索和现代讨论。',
      },
    ],
  },
  {
    id: 'qin-unification',
    name: '秦灭六国',
    dateText: '前230-前221年',
    dynastyIds: ['eastern-zhou', 'qin'],
    periodLabel: '战国秦王政时期',
    tags: ['统一战争', '教材重点'],
    relatedPersonIds: ['qin-shi-huang', 'li-si', 'wang-jian', 'wang-ben'],
    summary: '秦先后灭韩、赵、魏、楚、燕、齐，完成统一。',
    background: '战国后期秦国通过商鞅变法积累制度和军事实力，东方六国逐渐处于战略劣势。',
    process: '秦采取远交近攻和分化打击策略，依靠王翦、王贲等将领推进灭国战争。',
    result: '前221年秦完成统一，秦王嬴政称始皇帝。',
    impact: '结束战国长期分裂，开启统一多民族国家的中央集权形态。',
    disputeTabs: [],
  },
  {
    id: 'standardization',
    name: '统一制度与标准',
    dateText: '前221年后',
    dynastyIds: ['qin'],
    periodLabel: '秦始皇时期',
    tags: ['郡县制', '文字', '货币', '度量衡'],
    relatedPersonIds: ['qin-shi-huang', 'li-si'],
    summary: '秦统一后推行郡县制，统一文字、货币、度量衡和车轨等。',
    background: '六国旧制差异很大，统一王朝需要降低行政、交通和财政成本。',
    process: '中央以皇帝和三公九卿为核心，地方推郡县，配合标准化措施。',
    result: '形成全国性行政和文化整合框架。',
    impact: '为后世统一王朝治理提供重要制度先例。',
    disputeTabs: [],
  },
  {
    id: 'burning-books',
    name: '焚书坑儒',
    dateText: '前213-前212年',
    dynastyIds: ['qin'],
    periodLabel: '秦始皇时期',
    tags: ['思想控制', '争议事件'],
    relatedPersonIds: ['qin-shi-huang', 'li-si'],
    summary: '秦朝围绕思想和言论控制采取严厉措施，后世常以“焚书坑儒”概括。',
    background: '统一后朝廷希望压制以古非今和地方旧贵族思想资源。',
    process: '李斯建议限制非官方典籍流通，随后发生坑杀方士或儒生相关事件。',
    result: '强化思想控制，也造成后世对秦政严酷的强烈批评。',
    impact: '成为评价秦朝文化政策的重要争议点。',
    disputeTabs: [
      {
        title: '传统批评',
        body: '传统叙事将其视为秦朝暴政和摧残文化的重要证据。',
      },
      {
        title: '细节争议',
        body: '现代讨论会区分“焚书”的政策范围和“坑儒”对象、规模等史料问题。',
      },
    ],
  },
  {
    id: 'great-wall-qin',
    name: '秦筑长城与北击匈奴',
    dateText: '前215年前后',
    dynastyIds: ['qin'],
    periodLabel: '秦始皇时期',
    tags: ['边防', '长城', '蒙恬'],
    relatedPersonIds: ['qin-shi-huang', 'meng-tian'],
    summary: '秦派蒙恬北击匈奴，并连接、修筑北方长城防线。',
    background: '统一后北方边境仍面临游牧势力压力。',
    process: '蒙恬率军北上，收复河南地，构建边防和交通体系。',
    result: '秦北方边境防御能力增强，但徭役负担也加重。',
    impact: '长城成为后世边防工程的重要象征。',
    disputeTabs: [],
  },
  {
    id: 'sha-qiu-coup',
    name: '沙丘政变',
    dateText: '前210年',
    dynastyIds: ['qin'],
    periodLabel: '秦始皇去世后',
    tags: ['继承危机', '赵高', '李斯'],
    relatedPersonIds: ['qin-shi-huang', 'zhao-gao', 'li-si', 'meng-tian', 'qin-er-shi'],
    summary: '秦始皇巡游途中病逝，赵高、李斯等操控遗诏，拥立胡亥，赐死扶苏、蒙恬。',
    background: '秦朝皇位继承缺乏透明稳定机制，始皇死讯和遗诏掌握在少数随行近臣手中。',
    process: '赵高说服李斯，秘不发丧并矫诏立胡亥。',
    result: '胡亥即位为秦二世，扶苏、蒙恬被迫自杀。',
    impact: '改变秦朝继承路线，使赵高进入权力核心，加速秦朝政治崩坏。',
    disputeTabs: [
      {
        title: '权臣阴谋',
        body: '传统叙事强调赵高、李斯矫诏改变继承，是秦亡的直接转折。',
      },
      {
        title: '制度风险',
        body: '从制度看，皇帝个人化权力和继承不透明使宫廷近臣拥有异常大的操作空间。',
      },
    ],
  },
  {
    id: 'fake-edict-hu-hai',
    name: '矫诏立胡亥',
    dateText: '前210年',
    dynastyIds: ['qin'],
    periodLabel: '秦二世即位前后',
    tags: ['继承', '宫廷政治'],
    relatedPersonIds: ['zhao-gao', 'li-si', 'qin-er-shi', 'meng-tian'],
    summary: '赵高、李斯等通过诏令操作拥立胡亥，并赐死扶苏、蒙恬。',
    background: '秦始皇死后，遗诏和继承信息被少数随行人员控制。',
    process: '赵高利用胡亥和李斯的政治处境，推动继承方案改写。',
    result: '胡亥即位，赵高权势上升。',
    impact: '秦朝中央进入被宫廷权臣深度操控的阶段。',
    disputeTabs: [],
  },
  {
    id: 'daze-uprising',
    name: '大泽乡起义',
    dateText: '前209年',
    dynastyIds: ['qin'],
    periodLabel: '秦二世时期',
    tags: ['陈胜吴广', '教材重点', '秦末起义'],
    relatedPersonIds: ['chen-sheng', 'wu-guang', 'qin-er-shi', 'zhang-han'],
    summary: '陈胜、吴广因戍卒误期风险发动起义，揭开秦末大规模反秦斗争序幕。',
    background: '秦末徭役兵役沉重，法律严苛，基层社会承压极大。',
    process: '戍卒遇雨误期，陈胜、吴广以反秦为号召起事。',
    result: '张楚政权建立，各地反秦力量响应。',
    impact: '秦朝基层统治威慑被打破，灭亡进程加速。',
    disputeTabs: [],
  },
  {
    id: 'zhi-lu-wei-ma',
    name: '指鹿为马',
    dateText: '秦二世时期',
    dynastyIds: ['qin'],
    periodLabel: '秦二世时期',
    tags: ['赵高', '政治恐惧', '典故'],
    relatedPersonIds: ['zhao-gao', 'qin-er-shi'],
    summary: '赵高以鹿为马试探群臣，借此识别和清除不服从者，象征其权势达到高峰。',
    background: '赵高已深度控制秦二世和宫廷信息链，但仍需要确认朝臣是否服从。',
    process: '史书记载赵高献鹿称马，群臣或附和、或沉默、或直言为鹿。',
    result: '不顺从者受到打击，朝廷政治恐惧进一步加深。',
    impact: '成为颠倒黑白、权臣试探忠诚和政治恐怖的经典典故。',
    disputeTabs: [
      {
        title: '正史叙事',
        body: '强调赵高弄权、欺君和控制朝臣。',
      },
      {
        title: '象征解读',
        body: '可视为宫廷权力测试：关键不是鹿或马本身，而是群臣是否愿意服从权臣叙事。',
      },
      {
        title: '文学化可能',
        body: '事件细节可能经过后世叙事强化，但它准确表达了秦二世朝廷政治生态恶化。',
      },
    ],
  },
  {
    id: 'julu-battle',
    name: '巨鹿之战',
    dateText: '前207年',
    dynastyIds: ['qin'],
    periodLabel: '秦二世末年',
    tags: ['项羽', '章邯', '秦军主力'],
    relatedPersonIds: ['xiang-yu', 'zhang-han'],
    summary: '项羽破釜沉舟击败秦军主力，反秦战争格局发生决定性变化。',
    background: '秦军围攻赵地，诸侯救援犹疑，秦末战争进入关键阶段。',
    process: '项羽率楚军渡河后破釜沉舟，以决战姿态击溃秦军。',
    result: '章邯集团动摇并最终降楚。',
    impact: '秦朝最后主要军事力量崩溃，项羽成为反秦阵营核心。',
    disputeTabs: [],
  },
  {
    id: 'fall-of-qin',
    name: '秦亡',
    dateText: '前207年',
    dynastyIds: ['qin'],
    periodLabel: '秦亡与楚汉转折',
    tags: ['子婴', '刘邦', '王朝灭亡'],
    relatedPersonIds: ['zi-ying', 'zhao-gao', 'liu-bang', 'xiang-yu', 'zhang-han'],
    summary: '子婴诛杀赵高后向刘邦投降，秦朝灭亡。',
    background: '秦末起义、中央内斗和军事失败使秦政权迅速瓦解。',
    process: '刘邦先入关中，子婴出降。',
    result: '秦朝作为统一王朝终结，天下进入楚汉竞争。',
    impact: '秦制被否定又被继承，汉朝在秦制基础上调整统治方式。',
    disputeTabs: [],
  },
  {
    id: 'chu-han-war',
    name: '楚汉战争',
    dateText: '前206-前202年',
    dynastyIds: ['qin', 'western-han'],
    periodLabel: '秦末汉初',
    tags: ['项羽', '刘邦', '汉朝建立'],
    relatedPersonIds: ['xiang-yu', 'liu-bang', 'xiao-he', 'zhang-liang', 'han-xin'],
    summary: '秦亡后项羽和刘邦争夺天下，刘邦最终胜出并建立西汉。',
    background: '项羽分封诸侯后秩序不稳，刘邦据汉中和关中逐步反攻。',
    process: '刘邦集团依靠萧何后勤、张良谋略、韩信军事突破，与项羽长期相持。',
    result: '垓下之战后项羽败亡，刘邦建立汉朝。',
    impact: '完成秦末到汉初的政权转换，汉朝继承并调整秦制。',
    disputeTabs: [
      {
        title: '军事胜负',
        body: '韩信等方面军突破改变力量对比，是刘邦胜出的重要原因。',
      },
      {
        title: '政治整合',
        body: '刘邦比项羽更善于整合人才、后勤和制度资源。',
      },
    ],
  },
];

const relationships = [
  {
    sourceId: 'qi-huan-gong',
    targetId: 'guan-zhong',
    type: '君臣',
    summary: '齐桓公任用管仲改革齐国，管仲是齐桓公称霸的关键辅佐者。',
    eventIds: ['spring-autumn-hegemony'],
  },
  {
    sourceId: 'kongzi',
    targetId: 'laozi',
    type: '思想史关联',
    summary: '传统叙事中有孔子问礼于老子的故事，具体史实和细节存在讨论。',
    eventIds: ['hundred-schools'],
  },
  {
    sourceId: 'qin-xiao-gong',
    targetId: 'shang-yang',
    type: '君臣变法',
    summary: '秦孝公支持商鞅变法，二者共同推动秦国制度转型。',
    eventIds: ['shang-yang-reform'],
  },
  {
    sourceId: 'xunzi',
    targetId: 'li-si',
    type: '师承',
    summary: '李斯曾从荀子学习，后入秦成为秦制建设的重要人物。',
    eventIds: ['hundred-schools', 'qin-unification'],
  },
  {
    sourceId: 'xunzi',
    targetId: 'han-fei',
    type: '师承',
    summary: '韩非常被视为荀子的学生，其法家思想与荀子礼法观念存在思想史关联。',
    eventIds: ['hundred-schools'],
  },
  {
    sourceId: 'han-fei',
    targetId: 'li-si',
    type: '同学 / 政治竞争',
    summary: '二人同受荀子影响；韩非入秦后遇害，常与李斯政治竞争联系讨论。',
    eventIds: ['hundred-schools'],
  },
  {
    sourceId: 'lian-po',
    targetId: 'lin-xiangru',
    type: '将相关系',
    summary: '二人从矛盾到和解，“将相和”体现国家利益高于私人意气。',
    eventIds: ['changping-battle'],
  },
  {
    sourceId: 'su-qin',
    targetId: 'zhang-yi',
    type: '外交策略对照',
    summary: '苏秦常代表合纵叙事，张仪常代表连横叙事，是战国纵横外交的对照人物。',
    eventIds: ['hundred-schools'],
  },
  {
    sourceId: 'qin-zhao-xiang-wang',
    targetId: 'bai-qi',
    type: '君臣 / 军事授权',
    summary: '秦昭襄王时期，白起在伊阙、鄢郢、华阳、长平等战役中持续扩大秦国军事优势。',
    eventIds: ['yique-battle', 'yan-ying-battle', 'huayang-battle', 'changping-battle'],
  },
  {
    sourceId: 'qin-zhao-xiang-wang',
    targetId: 'wang-he',
    type: '君臣 / 前线指挥',
    summary: '王龁在秦昭襄王后期参与对韩赵方向作战，是长平前期秦军指挥链中的重要将领。',
    eventIds: ['changping-battle'],
  },
  {
    sourceId: 'bai-qi',
    targetId: 'gong-sun-xi',
    type: '伊阙战场对手',
    summary: '伊阙之战中，白起击败韩魏联军，公孙喜是联军主将叙事中的核心对手。',
    eventIds: ['yique-battle'],
  },
  {
    sourceId: 'bai-qi',
    targetId: 'bao-yuan',
    type: '伊阙战场对手',
    summary: '暴鸢代表伊阙之战中的韩方力量，补足秦军与韩魏联军多方对抗关系。',
    eventIds: ['yique-battle'],
  },
  {
    sourceId: 'bai-qi',
    targetId: 'chu-qing-xiang-wang',
    type: '秦楚战争对手',
    summary: '鄢郢之战中，白起率秦军攻楚，楚顷襄王被迫迁都，楚国战略空间遭重创。',
    eventIds: ['yan-ying-battle'],
  },
  {
    sourceId: 'bai-qi',
    targetId: 'mang-mao',
    type: '华阳战场对手',
    summary: '华阳之战相关记载中，魏将芒卯败于秦军，是白起战役链中的魏方对手。',
    eventIds: ['huayang-battle'],
  },
  {
    sourceId: 'bai-qi',
    targetId: 'jia-yan',
    type: '华阳战场对手',
    summary: '贾偃代表华阳之战相关赵方军队，体现此战牵涉魏、赵等多方力量。',
    eventIds: ['huayang-battle'],
  },
  {
    sourceId: 'bai-qi',
    targetId: 'wang-he',
    type: '秦军指挥链',
    summary: '长平之战前期王龁率秦军作战，赵括替换廉颇后，秦国秘密以白起为上将军接手决战。',
    eventIds: ['changping-battle'],
  },
  {
    sourceId: 'bai-qi',
    targetId: 'lian-po',
    type: '战场对峙',
    summary: '长平之战前期，廉颇采取坚壁固守策略，秦军难以迅速决胜；秦国后续通过反间促成赵国换将。',
    eventIds: ['changping-battle'],
  },
  {
    sourceId: 'bai-qi',
    targetId: 'zhao-kuo',
    type: '长平决战对手',
    summary: '赵括接替廉颇后主动出击，白起接手秦军决战并围歼赵军，二人成为长平结局的核心对照。',
    eventIds: ['changping-battle'],
  },
  {
    sourceId: 'lian-po',
    targetId: 'zhao-kuo',
    type: '赵军换将',
    summary: '廉颇坚守策略被赵括主动出击取代，是长平之战从僵持走向决战的重要转折。',
    eventIds: ['changping-battle'],
  },
  {
    sourceId: 'wang-he',
    targetId: 'lian-po',
    type: '长平前期对手',
    summary: '王龁前期进攻赵军，廉颇筑垒防守，形成长期消耗和战略僵持。',
    eventIds: ['changping-battle'],
  },
  {
    sourceId: 'qin-zhao-xiang-wang',
    targetId: 'zhao-kuo',
    type: '敌国决策牵动',
    summary: '秦国通过反间影响赵国换将，赵括上任为秦军诱敌决战创造条件。',
    eventIds: ['changping-battle'],
  },
  {
    sourceId: 'qin-zhao-xiang-wang',
    targetId: 'chu-qing-xiang-wang',
    type: '国君对抗',
    summary: '秦昭襄王时期秦军大举攻楚，楚顷襄王被迫迁都，反映秦楚力量对比变化。',
    eventIds: ['yan-ying-battle'],
  },
  {
    sourceId: 'chu-qing-xiang-wang',
    targetId: 'qu-yuan',
    type: '君臣 / 放逐叙事',
    summary: '屈原的忠臣形象常与楚顷襄王时期的政治排挤和楚国危局联系在一起。',
    eventIds: ['yan-ying-battle', 'hundred-schools'],
  },
  {
    sourceId: 'qin-shi-huang',
    targetId: 'li-si',
    type: '君臣 / 制度建设',
    summary: '李斯辅佐秦始皇推进郡县制、文字统一等制度建设。',
    eventIds: ['qin-unification', 'standardization', 'burning-books'],
  },
  {
    sourceId: 'qin-shi-huang',
    targetId: 'zhao-gao',
    type: '君主与近侍',
    summary: '赵高在秦始皇时期以近侍和车舆相关官职接近权力核心。',
    eventIds: ['sha-qiu-coup'],
  },
  {
    sourceId: 'qin-shi-huang',
    targetId: 'meng-tian',
    type: '君臣 / 边防',
    summary: '蒙恬受秦始皇任用北击匈奴并主持边防工程。',
    eventIds: ['great-wall-qin', 'sha-qiu-coup'],
  },
  {
    sourceId: 'qin-shi-huang',
    targetId: 'wang-jian',
    type: '君臣 / 统一战争',
    summary: '王翦是秦灭六国的重要统帅，服务秦王政统一战略。',
    eventIds: ['qin-unification'],
  },
  {
    sourceId: 'qin-er-shi',
    targetId: 'zhao-gao',
    type: '君臣 / 操控',
    summary: '赵高拥立胡亥后控制宫廷信息和朝政，对秦二世影响极大。',
    eventIds: ['fake-edict-hu-hai', 'zhi-lu-wei-ma', 'fall-of-qin'],
  },
  {
    sourceId: 'zhao-gao',
    targetId: 'li-si',
    type: '合谋后政敌',
    summary: '二人在沙丘政变中合谋拥立胡亥，后赵高排挤并陷害李斯。',
    eventIds: ['sha-qiu-coup', 'fake-edict-hu-hai'],
  },
  {
    sourceId: 'zhao-gao',
    targetId: 'zi-ying',
    type: '权臣与诛杀者',
    summary: '子婴即位后诛杀赵高，试图切断秦末宫廷权臣控制。',
    eventIds: ['fall-of-qin'],
  },
  {
    sourceId: 'zhao-gao',
    targetId: 'meng-tian',
    type: '政治打击',
    summary: '沙丘政变后，扶苏和蒙恬路线被切断，蒙恬被赐死。',
    eventIds: ['sha-qiu-coup'],
  },
  {
    sourceId: 'xiang-yu',
    targetId: 'liu-bang',
    type: '争霸对手',
    summary: '秦亡后项羽与刘邦争夺天下，最终刘邦胜出建立西汉。',
    eventIds: ['fall-of-qin', 'chu-han-war'],
  },
  {
    sourceId: 'liu-bang',
    targetId: 'xiao-he',
    type: '君臣 / 后勤行政',
    summary: '萧何负责关中治理和后勤转运，是刘邦集团稳定器。',
    eventIds: ['chu-han-war'],
  },
  {
    sourceId: 'liu-bang',
    targetId: 'zhang-liang',
    type: '君臣 / 谋略',
    summary: '张良为刘邦提供关键战略判断和政治谋划。',
    eventIds: ['chu-han-war'],
  },
  {
    sourceId: 'liu-bang',
    targetId: 'han-xin',
    type: '君臣 / 军事统帅',
    summary: '韩信作为刘邦阵营重要统帅，改变楚汉战争军事格局。',
    eventIds: ['chu-han-war'],
  },
  {
    sourceId: 'xiao-he',
    targetId: 'han-xin',
    type: '举荐关系',
    summary: '萧何追韩信并向刘邦举荐，是韩信被重用的关键节点。',
    eventIds: ['chu-han-war'],
  },
];

function mergeExpansionData() {
  function appendUnique(target, field, values) {
    if (!Array.isArray(values) || !values.length) return;
    const existing = new Set(target[field] || []);
    target[field] = target[field] || [];
    for (const value of values) {
      if (!existing.has(value)) {
        target[field].push(value);
        existing.add(value);
      }
    }
  }

  function applyPatches(collection, patches) {
    if (!Array.isArray(patches) || !patches.length) return;
    const itemMap = collection.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {});
    for (const patch of patches) {
      const target = itemMap[patch.id];
      if (!target) continue;
      const append = patch.append || {};
      for (const field of Object.keys(append)) {
        appendUnique(target, field, append[field]);
      }
      if (patch.merge) Object.assign(target, patch.merge);
    }
  }

  const personIds = new Set(persons.map(item => item.id));
  for (const item of expansion.persons || []) {
    if (!personIds.has(item.id)) {
      persons.push(makeFrameworkPerson(item));
      personIds.add(item.id);
    }
  }

  const eventIds = new Set(events.map(item => item.id));
  for (const item of expansion.events || []) {
    if (!eventIds.has(item.id)) {
      events.push({
        disputeTabs: [],
        ...item,
      });
      eventIds.add(item.id);
    }
  }

  applyPatches(persons, expansion.personPatches);
  applyPatches(persons, expansion.personNamePatches);
  applyPatches(events, expansion.eventPatches);

  function findMergedPersonForRuler(ruler) {
    if (ruler.linkedPersonId) {
      const explicitPerson = persons.find(person => person.id === ruler.linkedPersonId);
      if (explicitPerson) return explicitPerson;
    }
    const personalName = normalize(ruler.personalName);
    if (!personalName) return null;
    return persons.find(person => {
      const baseName = normalize(person.name).split('（')[0];
      return normalize(person.formalName) === personalName || baseName === personalName;
    }) || null;
  }

  rulers.forEach(ruler => {
    const linkedPerson = findMergedPersonForRuler(ruler);
    ruler.isFeaturedProfile = !!linkedPerson;
    if (linkedPerson) ruler.linkedPersonId = linkedPerson.id;
  });

  const rulerProfiles = createMissingRulerProfiles(rulers, ruler => !findMergedPersonForRuler(ruler));
  rulerProfiles.forEach(profile => {
    if (personIds.has(profile.id)) return;
    persons.push(profile);
    personIds.add(profile.id);
    const rulerId = profile.id.replace(/^profile-/, '');
    const ruler = rulers.find(item => item.id === rulerId);
    if (ruler) ruler.linkedPersonId = profile.id;
  });

  for (const item of rulerSupplementData.events || []) {
    if (eventIds.has(item.id)) continue;
    events.push(item);
    eventIds.add(item.id);
  }

  const mergedEventMap = events.reduce((map, event) => {
    event.relatedPersonIds = event.relatedPersonIds || [];
    map[event.id] = event;
    return map;
  }, {});
  const mergedPersonMap = persons.reduce((map, person) => {
    person.relatedEventIds = person.relatedEventIds || [];
    map[person.id] = person;
    return map;
  }, {});
  for (const person of persons) {
    for (const eventId of person.relatedEventIds) {
      const event = mergedEventMap[eventId];
      if (event && event.relatedPersonIds.indexOf(person.id) === -1) event.relatedPersonIds.push(person.id);
    }
  }
  for (const event of events) {
    for (const personId of event.relatedPersonIds) {
      const person = mergedPersonMap[personId];
      if (person && person.relatedEventIds.indexOf(event.id) === -1) person.relatedEventIds.push(event.id);
    }
  }

  const relationshipKeys = new Set(relationships.map(item => `${item.sourceId}->${item.targetId}:${item.type}`));
  for (const item of expansion.relationships || []) {
    const key = `${item.sourceId}->${item.targetId}:${item.type}`;
    if (!relationshipKeys.has(key)) {
      relationships.push(item);
      relationshipKeys.add(key);
    }
  }

  const successionRelationships = createSuccessionRelationships(rulers, ruler => {
    const person = findMergedPersonForRuler(ruler);
    return person && person.id;
  });
  for (const item of successionRelationships) {
    const key = `${item.sourceId}->${item.targetId}:${item.type}`;
    if (!relationshipKeys.has(key)) {
      relationships.push(item);
      relationshipKeys.add(key);
    }
  }

  for (const hint of rulerSupplementData.relationships || []) {
    const ruler = rulers.find(item => item.id === hint.sourceRulerId);
    const sourcePerson = ruler && findMergedPersonForRuler(ruler);
    if (!sourcePerson || !mergedPersonMap[hint.targetId] || sourcePerson.id === hint.targetId) continue;
    const item = {
      sourceId: sourcePerson.id,
      targetId: hint.targetId,
      type: hint.type,
      summary: hint.summary,
      eventIds: hint.eventIds || [],
    };
    const key = `${item.sourceId}->${item.targetId}:${item.type}`;
    if (!relationshipKeys.has(key)) {
      relationships.push(item);
      relationshipKeys.add(key);
    }
  }

  for (const relationship of relationships) {
    for (const eventId of relationship.eventIds || []) {
      const event = mergedEventMap[eventId];
      if (!event) continue;
      for (const personId of [relationship.sourceId, relationship.targetId]) {
        const person = mergedPersonMap[personId];
        if (!person) continue;
        if (event.relatedPersonIds.indexOf(personId) === -1) event.relatedPersonIds.push(personId);
        if (person.relatedEventIds.indexOf(eventId) === -1) person.relatedEventIds.push(eventId);
      }
    }
  }

  for (const dynasty of dynasties) {
    const additions = (expansion.periodExtensions && expansion.periodExtensions[dynasty.id]) || [];
    if (!additions.length) continue;
    const existingPeriodIds = new Set((dynasty.periods || []).map(item => item.id));
    dynasty.periods = dynasty.periods || [];
    for (const period of additions) {
      if (!existingPeriodIds.has(period.id)) {
        dynasty.periods.push(period);
        existingPeriodIds.add(period.id);
      }
    }
    if (dynasty.status === 'framework') dynasty.status = 'expanded';
  }

  const mergedPeriodMap = {};
  for (const dynasty of dynasties) {
    for (const period of dynasty.periods || []) mergedPeriodMap[period.id] = period;
  }
  for (const event of rulerSupplementData.events || []) {
    for (const periodId of event.periodIds || []) {
      const period = mergedPeriodMap[periodId];
      if (!period) continue;
      appendUnique(period, 'eventIds', [event.id]);
      appendUnique(period, 'personIds', event.relatedPersonIds || []);
    }
  }

  for (const dynasty of dynasties) {
    if (dynasty.status === 'framework' && dynasty.periods && dynasty.periods.length) {
      dynasty.status = 'expanded';
    }
  }

  applyDetailEnrichment({ persons, events, relationships });
}

mergeExpansionData();

const personMap = persons.reduce((map, item) => {
  map[item.id] = item;
  return map;
}, {});

const eventMap = events.reduce((map, item) => {
  map[item.id] = item;
  return map;
}, {});

const dynastyMap = dynasties.reduce((map, item) => {
  map[item.id] = item;
  return map;
}, {});

const rulerMap = rulers.reduce((map, item) => {
  map[item.id] = item;
  return map;
}, {});

const detailQuality = auditDetailQuality({ persons, events });

const rulersByDynasty = rulers.reduce((map, item) => {
  if (!map[item.dynastyId]) map[item.dynastyId] = [];
  map[item.dynastyId].push(item);
  return map;
}, {});

function findPersonForRuler(ruler) {
  if (ruler.linkedPersonId && personMap[ruler.linkedPersonId]) return personMap[ruler.linkedPersonId];
  const personalName = normalize(ruler.personalName);
  if (!personalName) return null;
  return persons.find(person => {
    const baseName = normalize(person.name).split('（')[0];
    return normalize(person.formalName) === personalName || baseName === personalName;
  }) || null;
}

const canonicalRulerPersonIds = new Set(
  rulers
    .filter(item => item.isCanonicalRuler)
    .map(item => findPersonForRuler(item))
    .filter(Boolean)
    .map(person => person.id),
);

const compoundSurnameStrokes = {
  司马: 5,
  上官: 3,
  公孙: 4,
  欧阳: 8,
  诸葛: 8,
  端木: 14,
  慕容: 14,
  完颜: 7,
  拓跋: 8,
  耶律: 8,
  宇文: 6,
  长孙: 4,
  尉迟: 11,
  独孤: 9,
  令狐: 5,
  夏侯: 10,
  皇甫: 9,
  南宫: 9,
  司徒: 5,
  司空: 5,
  钟离: 9,
  呼延: 8,
  赫连: 14,
  鲜于: 14,
  叶赫那拉: 5,
};

const surnameStrokeMap = {
  丁: 2, 万: 3, 于: 3, 卫: 3, 马: 3, 子: 3, 王: 4, 毛: 4, 方: 4, 尹: 4, 孔: 4, 公: 4, 夫: 4,
  甘: 5, 白: 5, 田: 5, 石: 5, 史: 5, 叶: 5, 卢: 5, 冯: 5, 乐: 5, 洪: 9,
  孙: 6, 刘: 6, 朱: 6, 江: 6, 安: 6, 吕: 6, 成: 6, 伊: 6, 伍: 6, 关: 6, 芒: 6, 汤: 6, 毕: 6, 纪: 6,
  李: 7, 张: 7, 吴: 7, 何: 7, 杨: 7, 陈: 7, 苏: 7, 邹: 7, 陆: 7, 姒: 7, 阮: 7,
  周: 8, 金: 8, 林: 8, 罗: 8, 郑: 8, 范: 8, 武: 8, 诸: 8,
  姜: 9, 赵: 9, 胡: 9, 姚: 9, 侯: 9, 施: 9, 勾: 4, 信: 9, 帝: 9, 荆: 9,
  贾: 10, 袁: 10, 秦: 10, 徐: 10, 唐: 10, 高: 10, 姬: 10, 夏: 10, 燕: 16,
  曹: 11, 梁: 11, 黄: 11, 章: 11, 常: 11, 盘: 11,
  韩: 12, 程: 12, 董: 12, 彭: 12, 景: 12,
  庞: 8, 蒙: 13, 窦: 13, 廉: 13, 樊: 15, 暴: 15, 履: 15, 蓝: 13, 赖: 13,
  蔡: 14, 管: 14, 熊: 14, 蔺: 14, 谭: 14, 廖: 14, 鲜: 14, 焦: 12,
  嬴: 16, 魏: 17, 薛: 16, 霍: 16,
  老: 6, 大: 3, 禹: 9, 妇: 6, 百: 6,
};

function surnameKey(name) {
  const cleanName = String(name || '').replace(/（[^）]*）/g, '').trim();
  const compound = Object.keys(compoundSurnameStrokes)
    .sort((a, b) => b.length - a.length)
    .find(item => cleanName.indexOf(item) === 0);
  return compound || cleanName.slice(0, 1);
}

function surnameStroke(name) {
  const key = surnameKey(name);
  return compoundSurnameStrokes[key] || surnameStrokeMap[key] || 99;
}

function isRulerPerson(person) {
  return canonicalRulerPersonIds.has(person.id);
}

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[·•\s]+/g, '');
}

function buildPersonSearchText(person) {
  return normalize([
    person.name,
    person.formalName,
    person.lifeText,
    person.summary,
    person.background,
    person.personality,
    person.policyInclination,
    (person.categories || []).join(' '),
    (person.crossDynastyLabels || []).join(' '),
    (person.activePeriodLabels || []).join(' '),
    relationships
      .filter(edge => edge.sourceId === person.id || edge.targetId === person.id)
      .map(edge => {
        const otherId = edge.sourceId === person.id ? edge.targetId : edge.sourceId;
        const other = personMap[otherId];
        return [edge.type, edge.summary, other && other.name].join(' ');
      })
      .join(' '),
    (person.resume || []).map(item => [
      item.timeText,
      item.periodLabel,
      item.title,
      item.nominalDuty,
      item.authorityScope,
      item.actualInfluence,
      item.modernEquivalent,
      item.impact,
    ].join(' ')).join(' '),
  ].join(' '));
}

function buildEventSearchText(event) {
  return normalize([
    event.name,
    event.dateText,
    event.periodLabel,
    event.summary,
    event.background,
    event.process,
    event.result,
    event.impact,
    (event.tags || []).join(' '),
    (event.relatedPersonIds || []).map(id => personMap[id] && personMap[id].name).join(' '),
  ].join(' '));
}

function buildRulerSearchText(ruler) {
  const dynasty = dynastyMap[ruler.dynastyId];
  const linkedPerson = ruler.linkedPersonId && personMap[ruler.linkedPersonId];
  return normalize([
    ruler.name,
    ruler.personalName,
    ruler.reignText,
    ruler.lifeText,
    ruler.polity,
    ruler.summary,
    (ruler.aliases || []).join(' '),
    (ruler.tags || []).join(' '),
    dynasty && dynasty.name,
    dynasty && dynasty.dateText,
    linkedPerson && linkedPerson.name,
    linkedPerson && linkedPerson.formalName,
    linkedPerson && linkedPerson.summary,
  ].join(' '));
}

function comparePerson(a, b) {
  const ar = isRulerPerson(a);
  const br = isRulerPerson(b);
  if (ar !== br) return ar ? -1 : 1;

  const aHasBirthYear = typeof a.birthYear === 'number' && Number.isFinite(a.birthYear);
  const bHasBirthYear = typeof b.birthYear === 'number' && Number.isFinite(b.birthYear);
  if (aHasBirthYear && bHasBirthYear && a.birthYear !== b.birthYear) return a.birthYear - b.birthYear;
  if (aHasBirthYear !== bHasBirthYear) return aHasBirthYear ? -1 : 1;
  if (!aHasBirthYear) {
    const strokeDiff = surnameStroke(a.name) - surnameStroke(b.name);
    if (strokeDiff !== 0) return strokeDiff;
  }
  return a.name.localeCompare(b.name, 'zh-Hans-CN');
}

function parseEventStartYear(dateText) {
  const text = String(dateText || '');
  const match = text.match(/(公元前|前)?\s*(\d+)\s*(世纪|年)?/);
  if (!match) return null;
  const year = Number(match[2]);
  if (!Number.isFinite(year)) return null;
  const value = match[3] === '世纪' ? (year - 1) * 100 : year;
  return match[1] ? -value : value;
}

function compareEventDate(a, b) {
  const ay = parseEventStartYear(a.dateText);
  const by = parseEventStartYear(b.dateText);
  if (ay === null && by === null) return 0;
  if (ay === null) return 1;
  if (by === null) return -1;
  return ay - by;
}

function sortEventsByDate(list) {
  return list
    .map((event, index) => ({ event, index }))
    .sort((a, b) => compareEventDate(a.event, b.event) || a.index - b.index)
    .map(item => item.event);
}

function compareRulerChronology(a, b) {
  const earlyDynasties = ['xia', 'shang', 'western-zhou', 'eastern-zhou'];
  if (a.dynastyId === b.dynastyId && earlyDynasties.indexOf(a.dynastyId) !== -1) {
    return (a.canonicalOrder || a.order) - (b.canonicalOrder || b.order);
  }
  const ay = parseEventStartYear(a.reignText);
  const by = parseEventStartYear(b.reignText);
  if (ay !== null && by !== null && ay !== by) return ay - by;
  if (ay !== null && by === null) return -1;
  if (ay === null && by !== null) return 1;
  if (a.polity !== b.polity) return a.polity.localeCompare(b.polity, 'zh-Hans-CN');
  return (a.canonicalOrder || a.order) - (b.canonicalOrder || b.order);
}

function sortRulersChronologically(list) {
  return list.slice().sort(compareRulerChronology);
}

function personSearchScore(person, keyword) {
  if (!keyword) return 100;
  const name = normalize(person.name);
  const baseName = name.split('（')[0];
  const formalName = normalize(person.formalName);
  if (name === keyword || baseName === keyword || formalName === keyword) return 0;
  if (name.indexOf(keyword) === 0 || baseName.indexOf(keyword) === 0 || formalName.indexOf(keyword) === 0) return 1;
  if (name.indexOf(keyword) !== -1 || formalName.indexOf(keyword) !== -1) return 2;
  if ((person.categories || []).join(' ').indexOf(keyword) !== -1) return 3;
  const pinyinScore = personPinyinScore(person.id, keyword);
  if (pinyinScore < 9) return pinyinScore;
  return 9;
}

function eventSearchScore(event, keyword) {
  if (!keyword) return 100;
  const name = normalize(event.name);
  if (name === keyword) return 0;
  if (name.indexOf(keyword) === 0) return 1;
  if (name.indexOf(keyword) !== -1) return 2;
  if (normalize(event.summary).indexOf(keyword) !== -1) return 3;
  if (normalize([event.periodLabel, event.dateText, (event.tags || []).join(' ')].join(' ')).indexOf(keyword) !== -1) return 4;
  if (normalize([event.background, event.process, event.result, event.impact].join(' ')).indexOf(keyword) !== -1) return 5;
  return 9;
}

function decoratePerson(person) {
  return {
    ...person,
    name: formatHistoricalName(person.name),
    formalName: formatHistoricalName(person.formalName),
    categoryText: (person.categories || []).join('、'),
    crossText: (person.crossDynastyLabels || []).join('、'),
    activePeriodText: (person.activePeriodLabels || []).join('、'),
    avatarPath: `/person-package/assets/avatars/${person.id}.jpg`,
    hasAvatar: true,
    isFeaturedAvatar: person.hasAvatar !== false,
    avatarInitial: person.name.slice(0, 1),
    relatedEvents: sortEventsByDate((person.relatedEventIds || []).map(id => eventMap[id]).filter(Boolean)),
  };
}

function decorateEvent(event) {
  return {
    ...event,
    tagText: (event.tags || []).join('、'),
    relatedPersons: (event.relatedPersonIds || []).map(id => personMap[id]).filter(Boolean),
  };
}

function decorateRuler(ruler) {
  const dynasty = dynastyMap[ruler.dynastyId];
  const linkedPerson = findPersonForRuler(ruler);
  const rawPersonalName = linkedPerson ? (linkedPerson.formalName || ruler.personalName) : ruler.personalName;
  const rawDisplayName = linkedPerson
    ? linkedPerson.name
    : rawPersonalName && normalize(ruler.name).indexOf(normalize(rawPersonalName)) === -1
      ? `${rawPersonalName}（${ruler.name}）`
      : ruler.name;
  const isFeatured = !!(ruler.isCanonicalRuler && ruler.isFeaturedProfile);
  return {
    ...ruler,
    linkedPersonId: linkedPerson ? linkedPerson.id : ruler.linkedPersonId,
    name: formatHistoricalName(rawDisplayName),
    personalName: formatHistoricalName(rawPersonalName),
    dynastyName: dynasty ? dynasty.name : '',
    aliasText: (ruler.aliases || []).join('、'),
    tagText: (ruler.tags || []).join('、'),
    summary: linkedPerson ? linkedPerson.summary : ruler.summary,
    hasDetail: !!linkedPerson,
    isFeatured,
    detailText: isFeatured ? '重点帝王' : linkedPerson ? '已有人物卡' : '本纪条目',
    recordBasisText: ruler.recordBasis || '正史本纪与通行帝王世系',
  };
}

function getPersonRelationships(personId) {
  const positionClasses = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5', 'pos-6'];
  return relationships
    .filter(edge => edge.sourceId === personId || edge.targetId === personId)
    .map((edge, index) => {
      const otherId = edge.sourceId === personId ? edge.targetId : edge.sourceId;
      const other = personMap[otherId];
      return {
        ...edge,
        otherId,
        other: other ? decoratePerson(other) : null,
        eventText: (edge.eventIds || []).map(id => eventMap[id] && eventMap[id].name).filter(Boolean).join('、'),
        positionClass: positionClasses[index % positionClasses.length],
      };
    })
    .filter(edge => edge.other);
}

function getDynastyView(keyword, expandedIds) {
  const kw = normalize(keyword).trim();
  return dynasties.map(dynasty => {
    const rawPeriods = dynasty.periods || [];
    const rawStates = dynasty.states || [];
    const rawRulers = rulersByDynasty[dynasty.id] || [];
    const searchText = normalize([
      dynasty.name,
      dynasty.dateText,
      dynasty.summary,
      (dynasty.labels || []).join(' '),
      rawRulers.map(item => [
        item.name,
        item.personalName,
        item.reignText,
        item.polity,
        (item.aliases || []).join(' '),
        (item.tags || []).join(' '),
      ].join(' ')).join(' '),
      rawPeriods.map(period => [
        period.name,
        period.ruler,
        (period.personIds || []).map(id => personMap[id] && personMap[id].name).filter(Boolean).join(' '),
        (period.eventIds || []).map(id => eventMap[id] && eventMap[id].name).filter(Boolean).join(' '),
      ].join(' ')).join(' '),
      rawStates.map(state => [
        state.name,
        state.group,
        state.dateText,
        (state.overlaps || []).join(' '),
      ].join(' ')).join(' '),
    ].join(' '));
    const matched = !kw || searchText.indexOf(kw) !== -1;
    const isExpanded = expandedIds.indexOf(dynasty.id) !== -1 || (kw && matched);
    const periods = isExpanded ? rawPeriods.map(period => {
      const periodPeople = (period.personIds || []).map(id => personMap[id]).filter(Boolean).sort(comparePerson);
      const emperorPeople = periodPeople.filter(isRulerPerson);
      const people = periodPeople.filter(person => !isRulerPerson(person));
      const periodEvents = sortEventsByDate((period.eventIds || []).map(id => eventMap[id]).filter(Boolean));
      return {
        ...period,
        emperorPeople: emperorPeople.map(decoratePerson),
        people: people.map(decoratePerson),
        events: periodEvents.map(decorateEvent),
      };
    }) : [];
    const states = isExpanded ? rawStates.map(state => ({
      ...state,
      overlapText: (state.overlaps || []).join('、'),
    })) : [];
    const sortedRulers = sortRulersChronologically(rawRulers);
    const dynastyEmperors = isExpanded
      ? sortedRulers.filter(item => item.isCanonicalRuler).map(decorateRuler)
      : [];
    const otherRulers = isExpanded
      ? sortedRulers.filter(item => !item.isCanonicalRuler).map(decorateRuler)
      : [];
    const statusTextMap = {
      sample: '样板已细化',
      expanded: '已接入人物',
      framework: '已接入人物',
    };
    return {
      ...dynasty,
      periods,
      states,
      rulers: dynastyEmperors,
      emperors: dynastyEmperors,
      otherRulers,
      isExpanded,
      isHidden: !matched,
      statusText: statusTextMap[dynasty.status] || '已接入人物',
    };
  }).filter(item => !item.isHidden);
}

function searchPersons(keyword) {
  const kw = normalize(keyword).trim();
  const isExactRulerKeyword = kw && rulers.some(ruler => {
    if (!ruler.isCanonicalRuler) return false;
    const linkedPerson = findPersonForRuler(ruler);
    return [
      ruler.name,
      ruler.personalName,
      ...(ruler.aliases || []),
      linkedPerson && linkedPerson.name,
      linkedPerson && linkedPerson.formalName,
    ].filter(Boolean).some(value => {
      const normalized = normalize(value);
      const baseName = normalized.split('（')[0];
      const shortName = baseName.split('·').pop();
      const titleStem = baseName.replace(/[帝王后]$/, '');
      return [normalized, baseName, shortName, titleStem].indexOf(kw) !== -1;
    });
  });
  if (isExactRulerKeyword) return [];
  const nonRulerPersons = persons.filter(person => !isRulerPerson(person));
  const list = kw
    ? nonRulerPersons.filter(person => (
      buildPersonSearchText(person).indexOf(kw) !== -1
      || personPinyinScore(person.id, kw) < 9
    ))
    : nonRulerPersons.slice();
  return list.sort((a, b) => {
    const scoreDiff = personSearchScore(a, kw) - personSearchScore(b, kw);
    if (scoreDiff !== 0) return scoreDiff;
    return comparePerson(a, b);
  }).map(decoratePerson);
}

function searchEvents(keyword) {
  const kw = normalize(keyword).trim();
  const list = kw
    ? events.filter(event => buildEventSearchText(event).indexOf(kw) !== -1)
    : events.slice();
  const defaultOrder = new Map(events.map((event, index) => [event.id, index]));
  return list.sort((a, b) => {
    const scoreDiff = eventSearchScore(a, kw) - eventSearchScore(b, kw);
    if (scoreDiff !== 0) return scoreDiff;
    return compareEventDate(a, b) || defaultOrder.get(a.id) - defaultOrder.get(b.id);
  }).map(decorateEvent);
}

function searchRulers(keyword) {
  const kw = normalize(keyword).trim();
  function matchesRulerIdentity(ruler) {
    const linkedPerson = findPersonForRuler(ruler);
    return [
      ruler.name,
      ruler.personalName,
      ...(ruler.aliases || []),
      linkedPerson && linkedPerson.name,
      linkedPerson && linkedPerson.formalName,
    ].filter(Boolean).some(value => {
      const normalized = normalize(value);
      const baseName = normalized.split('（')[0];
      const shortName = baseName.split('·').pop();
      const titleStem = baseName.replace(/[帝王后]$/, '');
      return [normalized, baseName, shortName, titleStem].indexOf(kw) !== -1;
    });
  }
  const isExactRegionalRulerKeyword = kw && rulers.some(ruler => {
    if (ruler.isCanonicalRuler) return false;
    return matchesRulerIdentity(ruler);
  });
  if (isExactRegionalRulerKeyword) return [];
  const canonicalRulers = rulers.filter(ruler => ruler.isCanonicalRuler);
  const exactMatches = kw ? canonicalRulers.filter(matchesRulerIdentity) : [];
  const list = exactMatches.length
    ? exactMatches
    : kw
      ? canonicalRulers.filter(ruler => (
        buildRulerSearchText(ruler).indexOf(kw) !== -1
        || rulerPinyinScore(ruler.id, kw) < 9
      ))
      : canonicalRulers.slice();
  return list.sort((a, b) => {
    const score = rulerPinyinScore(a.id, kw) - rulerPinyinScore(b.id, kw);
    if (score) return score;
    const dynastyA = dynastyMap[a.dynastyId];
    const dynastyB = dynastyMap[b.dynastyId];
    const orderA = dynastyA ? dynastyA.order : 9999;
    const orderB = dynastyB ? dynastyB.order : 9999;
    if (orderA !== orderB) return orderA - orderB;
    return compareRulerChronology(a, b);
  }).map(decorateRuler);
}

module.exports = {
  dynasties,
  persons,
  events,
  rulers,
  relationships,
  personMap,
  eventMap,
  dynastyMap,
  rulerMap,
  detailQuality,
  getDynastyView,
  searchPersons,
  searchEvents,
  searchRulers,
  getPersonRelationships,
  decoratePerson,
  decorateEvent,
  decorateRuler,
  stats: {
    dynastyCount: dynasties.length,
    totalPersonCount: persons.length,
    personCount: persons.filter(person => !isRulerPerson(person)).length,
    eventCount: events.length,
    rulerCount: rulers.filter(ruler => ruler.isCanonicalRuler).length,
    relationshipCount: relationships.length,
    sampleDynastyName: '秦',
  },
};
