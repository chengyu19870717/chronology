const SOURCE_NOTES = {
  xia: {
    labels: ['传说时代', '史实存疑'],
    background: '夏代世系主要来自后世传世文献，尚不能与同时代文字材料逐人互证。二里头等考古发现可用于认识早期国家社会，但不能直接等同于某一位夏王的个人传记。',
    childhood: '没有可核验的连续早年记录。家世、即位和政争故事属于传统王朝世系叙事，应保留“传说时代”“史实存疑”标注。',
  },
  shang: {
    labels: ['早期王朝', '史料分层'],
    background: '商王世系可由传世文献与殷墟甲骨材料分层认识；商前中期君王的个人经历远不如晚商材料完整，不能用后世帝王传记的密度反推细节。',
    childhood: '现有材料以王位次序、祭祀谱系、迁徙和重大军政活动为主，没有形成连续的幼年与成长记录。',
  },
  'western-zhou': {
    labels: ['西周王室', '史料有限'],
    background: '西周王室处在分封、宗法和礼乐秩序形成发展的时代。人物材料散见于传世文献与青铜器铭文，具体年代和事迹需要结合不同材料判断。',
    childhood: '王室出身可以由世系确认，但幼年教育、日常生活和性格形成通常缺少连续记录，不据后世传说补写。',
  },
  'eastern-zhou': {
    labels: ['东周王室'],
    background: '东周天子保有礼制与名义共主地位，但直接控制范围逐渐缩小，实际政治常受郑、晋、楚、秦等诸侯及王畿内部力量影响。',
    childhood: '出身周王室，成长于王畿政治和宗法继承环境。史书多记录即位、王室内争和诸侯关系，个人早年细节有限。',
  },
};

const DYNASTY_CONTEXT = {
  xia: '早期国家形成与夏后氏世系叙事',
  shang: '商王朝的王族继承、祭祀秩序与都邑变迁',
  'western-zhou': '分封宗法秩序和周王室天下共主地位',
  'eastern-zhou': '王室权威下降、诸侯争霸并走向战国兼并',
  qin: '秦完成统一并建立皇帝制度后的中央集权实践',
  'western-han': '汉初休养生息、中央集权加强及外戚政治演变',
  xin: '王莽改制及两汉之间的政权转折',
  'eastern-han': '东汉重建、外戚宦官交替和地方豪强扩张',
  'three-kingdoms': '魏蜀吴鼎立、持续战争与权臣集团上升',
  'western-jin': '短暂统一、宗室分封失衡与西晋崩解',
  'eastern-jin-sixteen': '门阀政治、北方十六国并立与南北对峙',
  'southern-northern': '南北政权更替、族群整合与制度重组',
  sui: '结束长期分裂、重建统一制度并迅速转入隋末危机',
  tang: '大一统帝国由建立、盛世转入藩镇与宦官政治',
  'five-dynasties-ten-kingdoms': '军镇政治下五代快速更替与十国并立',
  'song-liao-jin-xixia': '宋、辽、西夏、金并立及多边战争与和议',
  yuan: '蒙古帝国背景下元朝大一统与行省制度运行',
  ming: '皇权强化、文官行政、边防海贸与晚明财政危机',
  qing: '多民族统一国家巩固并在近代内外危机中转型',
};

const POLITY_CONTEXT = {
  东晋: '东晋皇室与南渡士族共同维持江南政权，皇帝实际权力常受王、庾、桓、谢等家族及军事强人制约',
  南朝宋: '刘宋承接东晋，其政治长期受到宗室内争、寒门将领和北伐压力影响',
  南朝齐: '萧齐国祚短促，宗室继承和近臣政变频繁改变皇位归属',
  南朝梁: '梁前期文治与佛教兴盛，侯景之乱后中央秩序崩溃',
  南朝陈: '陈朝以建康和江南为中心，在北周、隋持续压力下维持南方政权',
  北魏: '北魏由拓跋鲜卑政权发展为北方王朝，经历统一北方、制度改革及六镇危机',
  东魏: '东魏皇帝保有名义正统，军政实权掌握在高欢及其家族手中',
  西魏: '西魏皇帝保有名义正统，军政实权主要由宇文泰集团掌握',
  北齐: '北齐依托高氏军事集团建立，宫廷继承、勋贵政治和北周竞争贯穿始终',
  北周: '北周由宇文氏控制的西魏体系发展而来，府兵和关陇集团是其统治支柱',
  后梁: '后梁以朱温控制的汴州军政集团为基础，与河东李氏长期争夺中原',
  后唐: '后唐承接河东军事集团，以恢复唐号争取正统，却持续受军镇与宫廷兵变影响',
  后晋: '后晋依靠契丹援助建立，燕云十六州与对辽关系成为政权的核心约束',
  后汉: '后汉由河东军镇入主中原，国祚短促且难以约束强藩',
  后周: '后周在五代后期推进整军、财政和统一战争，为北宋结束割据奠定条件',
  宋: '宋以文官行政和中央集权见长，同时长期面对辽、夏、金、蒙古等外部压力',
  辽: '辽实行适应农耕与草原地区的复合治理，并与五代、北宋形成长期并立关系',
  西夏: '西夏立足西北河套与河西地区，在宋、辽、金及蒙古之间调整军事和外交策略',
  金: '金由女真联盟兴起，灭辽和北宋后统治北方，并逐步采用中原制度',
  元: '元朝皇位继承受蒙古宗王政治影响，中央行政与行省体系在频繁政争中运转',
};

const TAG_FACTS = {
  开国君主: '承担从军事集团或宗族联盟转向国家政权的制度建构任务。',
  末代君主: '其在位处于政权崩解阶段，个人决策与长期积累的财政、军事和权力结构问题共同作用。',
  幼帝: '即位时年幼，名义皇权与实际决策权分离，政务主要由太后、外戚、辅政大臣或军政集团处理。',
  废帝: '在位合法性和实际控制力受到强势宗室、外戚、近臣或军事集团挑战，最终被废。',
  短暂在位: '在位时间极短，主要历史意义在于呈现一次继承危机，而非形成独立、持续的施政体系。',
  中兴: '其统治被后世概括为“中兴”，重点在恢复秩序、整顿吏治或修复前期危机。',
  改革: '尝试通过行政、财政或军队整顿提高中央动员能力。',
  统一: '参与结束分裂或巩固统一，重新安排中央与地方的权力关系。',
  外戚宦官: '宫廷决策受到外戚与宦官集团交替控制，皇帝用人选择会直接改变权力平衡。',
  五代十国: '其政治选择受到军镇拥立、兵变和短周期政权竞争的强烈约束。',
};

const DEFAULT_EVENTS = {};

const rulerFacts = {
  'ruler-xia-taikang': { core: '传统文献以“太康失国”叙述其怠于政事、被有穷氏后羿阻断归路；故事反映早期联盟内部王权并不稳固。', events: ['xia-founding'] },
  'ruler-xia-zhongkang': { core: '传统世系将仲康置于后羿控制夏政的阶段，《尚书》系统中的“胤征”故事与其名相连，但具体史实和年代不能确证。' },
  'ruler-xia-xiang': { core: '传统叙事中相在寒浞势力打击下失国身亡，遗腹子少康后来复兴夏后氏；这一链条属于“少康中兴”的前史。' },
  'ruler-xia-shaokang': { core: '传统文献称少康聚集旧部、恢复夏后氏统治，“少康中兴”成为后世解释王朝复兴的早期范型。' },
  'ruler-xia-kongjia': { core: '传世文献把孔甲时期描述为夏后氏政治和礼制走向衰落的节点，养龙等故事神话色彩浓厚。' },
  'ruler-shang-taijia': { core: '传统文献称太甲即位后曾被伊尹放逐于桐宫，改过后复位；这一故事长期被用于讨论君臣责任，但细节存在文本层累问题。' },
  'ruler-shang-taiwu': { core: '太戊在传统商王世系中在位较久，后世以“中宗”及商道复兴叙述其时代，具体政绩主要来自传世文献。' },
  'ruler-shang-zhongding': { core: '传统文献记仲丁迁都于隞，并把其后数代的王位竞争概括为“九世之乱”的一部分。' },
  'ruler-shang-hedanjia': { core: '河亶甲被记为迁都相地、处理方国冲突的商王；商代中期都邑变动反映王室对资源和政治网络的调整。' },
  'ruler-shang-zuyi': { core: '祖乙在传统叙述中整顿商政并迁都，常被列为商代中期恢复王朝秩序的重要君主。' },
  'ruler-shang-zujia': { core: '祖甲处于晚商王权和祭祀制度演变阶段，甲骨卜辞所见周祭制度的整理常与其时代联系。' },
  'ruler-shang-wuyi': { core: '武乙活动于晚商，传世文献以射天等故事塑造其轻慢神权的形象；这些道德化记载需要与甲骨材料分开理解。' },
  'ruler-shang-wending': { core: '文丁处于商周关系日益紧张的晚商阶段，传统记载将其与周族领袖季历之死相联系。' },
  'ruler-shang-diyi': { core: '帝乙是帝辛之父，在位处于晚商对东方用兵及周族势力上升的阶段，其后王位传于帝辛。', events: ['wu-wang-conquers-shang'] },
  'ruler-zhou-cheng': { core: '周成王年少即位，周公摄政、平定三监之乱并营建成周；成王亲政后延续分封与礼制建设。', events: ['zhou-ritual-feudalism'] },
  'ruler-zhou-kang': { core: '周康王承接成王时期秩序，传统史学把二人统治合称“成康之治”，强调刑措不用和王朝稳定。', events: ['zhou-ritual-feudalism'] },
  'ruler-zhou-zhao': { core: '周昭王多次南征，最终在南方行军中身亡；相关记载显示西周王室向江汉地区扩张面临挫折。' },
  'ruler-zhou-mu': { core: '周穆王在位较久，青铜器铭文和传世文献均涉及其巡行、征伐与司法秩序；“穆天子传”中的西行故事带有文学化成分。' },
  'ruler-zhou-li': { core: '周厉王加强对资源和言论的控制，引发国人暴动并出奔；前841年共和行政是中国古代纪年可连续推算的重要起点。' },
  'ruler-zhou-xuan': { core: '周宣王即位后整顿王室军政并对外用兵，传统称“宣王中兴”，但晚年战争失利也显示西周结构性压力未消除。' },
  'ruler-zhou-huan': { core: '周桓王试图恢复天子对郑国的控制，在繻葛之战中败于郑庄公并中箭，成为周王室军事权威下降的标志。', events: ['spring-autumn-hegemony'] },
  'ruler-zhou-xiang': { core: '周襄王卷入王子带之乱，一度出奔，后依靠晋文公复位；这一过程突出春秋霸主对周天子秩序的支撑与控制。', events: ['chengpu-battle'] },
  'ruler-zhou-ding': { core: '楚庄王北上时向周使者询问九鼎轻重，“问鼎”典故反映诸侯强国对周王室象征权威的挑战。', events: ['spring-autumn-hegemony'] },
  'ruler-zhou-jing1': { core: '周景王晚年围绕太子人选发生争议，死后王子朝之乱爆发，王畿长期动荡并需晋国干预。' },
  'ruler-zhou-weilie': { core: '周威烈王正式册命韩、赵、魏为诸侯，传统上以此标志三家分晋获得名分并推动战国格局定型。', events: ['three-families-jin'] },
  'ruler-zhou-nan': { core: '周赧王时期王室仅控制有限王畿，前256年秦攻西周国，赧王降秦，延续数百年的周天子统序终结。', events: ['qin-unification'] },
  'ruler-han-huidi': { core: '刘盈继承汉高祖帝位，政策总体延续汉初休养生息；吕后掌握强势宫廷权力，惠帝个人施政空间有限。', life: '前210-前188年', birthYear: -210, deathYear: -188, events: ['wenjing-rule', 'empress-lu-regency'] },
  'ruler-han-yuandi': { core: '刘奭重视儒学和宽政，但在位后期外戚、宦官势力上升，西汉中央政治的权力平衡趋于脆弱。', life: '前75-前33年', birthYear: -75, deathYear: -33 },
  'ruler-han-chengdi': { core: '刘骜在位时王氏外戚势力显著扩张，土地兼并和官僚问题加深，为王莽进入权力中心提供条件。', life: '前51-前7年', birthYear: -51, deathYear: -7, events: ['wang-mang-usurpation'] },
  'ruler-han-aidi': { core: '刘欣试图限制王氏外戚，却转而重用傅氏、丁氏亲族；短暂统治未能扭转西汉后期的继承与权力危机。', life: '前27-前1年', birthYear: -27, deathYear: -1, events: ['wang-mang-usurpation'] },
  'ruler-han-pingdi': { core: '刘衎年幼即位，王莽以大司马和摄政身份控制朝政并逐步建立个人权威，平帝去世后改朝进程加速。', life: '前9-6年', birthYear: -9, deathYear: 6, events: ['wang-mang-usurpation'] },
  'ruler-han-ruzi': { core: '刘婴并未正式即皇帝位，而以皇太子身份由王莽摄政；王莽随后建立新朝，因此应与本纪中的正式皇帝序列区分。', life: '5-25年', birthYear: 5, deathYear: 25, events: ['wang-mang-usurpation'] },
  'ruler-han-mingdi': { core: '刘庄延续光武帝制度，整顿吏治、经营西域并推动儒学礼制；与章帝时期合称“明章之治”。', life: '28-75年', birthYear: 28, deathYear: 75, events: ['eastern-han-western-regions'] },
  'ruler-han-zhangdi': { core: '刘炟延续明帝时期相对稳定的治理，重视儒学讨论并宽缓刑政；晚年窦氏外戚势力上升。', life: '56-88年', birthYear: 56, deathYear: 88 },
  'ruler-han-hedi': { core: '刘肇少年即位，前期受窦太后和窦宪控制，后联合宦官清除窦氏；此举亲政成功，也提高了宦官参与核心政治的地位。', life: '79-106年', birthYear: 79, deathYear: 106 },
  'ruler-han-shangdi': { core: '刘隆出生百余日即位，在位不足一年，政务由邓太后主持；其人物志重点是幼帝继承安排而非个人施政。', life: '105-106年', birthYear: 105, deathYear: 106 },
  'ruler-han-andi': { core: '刘祜由邓太后迎立，亲政后倚重乳母和外戚集团，东汉宫廷权力竞争与地方灾乱进一步加深。', life: '94-125年', birthYear: 94, deathYear: 125 },
  'ruler-han-shundi': { core: '刘保依靠宦官发动政变即位，史称“顺帝即位”；在位时梁氏外戚逐渐控制朝政，皇权仍受宫廷集团牵制。', life: '115-144年', birthYear: 115, deathYear: 144 },
  'ruler-han-chongdi': { core: '刘炳两岁即位、三岁去世，梁太后临朝，实际政务由外戚梁氏主持。', life: '143-145年', birthYear: 143, deathYear: 145 },
  'ruler-han-zhidi': { core: '刘缵幼年即位，曾以“跋扈将军”讥刺梁冀，后突然去世；传统记载认为梁冀将其毒杀。', life: '138-146年', birthYear: 138, deathYear: 146 },
  'ruler-han-huandi': { core: '刘志依靠宦官诛灭梁冀后亲政，却又形成新的宦官权力网络；第一次党锢之祸发生于其统治后期。', life: '132-168年', birthYear: 132, deathYear: 168 },
  'ruler-han-lingdi': { core: '刘宏在位时继续党锢、卖官鬻爵并依赖宦官，地方财政与社会矛盾加剧，184年黄巾起义冲击全国。', life: '156-189年', birthYear: 156, deathYear: 189, events: ['yellow-turban'] },
  'ruler-han-shaodi': { core: '刘辩在何太后与大将军何进的权力格局中即位，董卓入洛后将其废黜并迫害致死。', life: '176-190年', birthYear: 176, deathYear: 190 },
  'ruler-han-xiandi': { core: '刘协先后受董卓、李傕郭汜和曹操控制，名义上延续汉室正统；220年禅位曹丕，东汉正式结束。', life: '181-234年', birthYear: 181, deathYear: 234, events: ['three-kingdoms-formation'] },
  'ruler-shu-liushan': { core: '刘禅继承蜀汉后，先由诸葛亮辅政，后依靠蒋琬、费祎等维持政权；263年魏军入蜀后投降，蜀汉灭亡。', life: '207-271年', birthYear: 207, deathYear: 271, events: ['three-kingdoms-formation'] },
  'ruler-wei-mingdi': { core: '曹叡在位时应对诸葛亮北伐和辽东公孙氏问题，能任用曹真、司马懿等统军；晚年宫室营建和托孤安排加重财政与权臣风险。', life: '204-239年', birthYear: 204, deathYear: 239 },
  'ruler-wei-shaodi': { core: '曹芳幼年即位，曹爽与司马懿共同辅政；249年高平陵之变后司马氏掌权，曹芳于254年被废。', life: '232-274年', birthYear: 232, deathYear: 274, events: ['sima-usurpation'] },
  'ruler-wei-gaogui': { core: '曹髦在司马昭控制下保有帝号，260年亲率近侍反抗司马昭，兵败被杀，显示曹魏皇权已名存实亡。', life: '241-260年', birthYear: 241, deathYear: 260, events: ['sima-usurpation'] },
  'ruler-wei-yuandi': { core: '曹奂由司马昭迎立，实际权力属于司马氏；265年禅位司马炎，曹魏终结。', life: '246-302年', birthYear: 246, deathYear: 302, events: ['sima-usurpation'] },
  'ruler-wu-sunliang': { core: '孙亮幼年继位，先后受诸葛恪、孙峻、孙綝控制；试图清除孙綝失败后被废。', life: '243-260年', birthYear: 243, deathYear: 260 },
  'ruler-wu-sunxiu': { core: '孙休即位后联合丁奉诛杀权臣孙綝，恢复皇权，并设置学官、关注典籍文化；264年病逝。', life: '235-264年', birthYear: 235, deathYear: 264 },
  'ruler-jin-huidi': { core: '司马衷在位时皇后、外戚和宗室诸王争夺辅政权，八王之乱破坏西晋中央和军事体系。', life: '259-307年', birthYear: 259, deathYear: 307 },
  'ruler-jin-huaidi': { core: '司马炽在八王之乱后即位，已难控制地方军政；311年洛阳陷落，在永嘉之乱中被俘。', life: '284-313年', birthYear: 284, deathYear: 313 },
  'ruler-jin-mindi': { core: '司马邺在长安被拥立，依靠残余晋军维持名义中央；316年向汉赵投降，西晋灭亡。', life: '300-318年', birthYear: 300, deathYear: 318 },
  'ruler-ejin-yuandi': { core: '司马睿依靠王导等南北士族在建康建立东晋，形成“王与马，共天下”的权力结构。', life: '276-323年', birthYear: 276, deathYear: 323 },
  'ruler-ejin-mingdi': { core: '司马绍在位短暂但果断平定王敦后续叛乱，暂时稳住东晋皇权。', life: '299-325年', birthYear: 299, deathYear: 325 },
  'ruler-ejin-mudi': { core: '司马聃幼年在位，褚太后临朝，庾氏、桓温等掌握军政；桓温北伐是这一时期的主要政治军事线索。', life: '343-361年', birthYear: 343, deathYear: 361 },
  'ruler-ejin-haixi': { core: '司马奕缺乏独立权力，被桓温以废立方式降为海西公，显示军事强人足以决定东晋皇位。', life: '342-386年', birthYear: 342, deathYear: 386 },
  'ruler-ejin-xiaowu': { core: '司马曜在谢安等辅政下取得淝水之战胜利，随后试图加强皇权；晚年宫廷矛盾和桓玄势力上升削弱政局。', life: '362-396年', birthYear: 362, deathYear: 396, events: ['feishui-battle'] },
  'ruler-ejin-andi': { core: '司马德宗长期缺乏实际执政能力，东晋先后受桓玄、刘裕等军事强人控制，孙恩卢循之乱亦冲击江南。', life: '382-419年', birthYear: 382, deathYear: 419 },
  'ruler-ejin-gongdi': { core: '司马德文由刘裕拥立，420年禅位于刘裕，东晋结束、南朝宋建立。', life: '386-421年', birthYear: 386, deathYear: 421 },
  'ruler-liu-song-wudi': { core: '刘裕出身北府军，以平定内乱和北伐建立威望，420年代晋建宋；其集权措施改变了东晋门阀格局。', life: '363-422年', birthYear: 363, deathYear: 422 },
  'ruler-liu-song-wendi': { core: '刘义隆在位近三十年，前期整顿政务形成“元嘉之治”，多次北伐北魏却因战略与调度问题受挫。', life: '407-453年', birthYear: 407, deathYear: 453 },
  'ruler-liang-wudi': { core: '萧衍建立梁朝，前期重视文教并崇信佛教；晚年侯景之乱攻陷建康，梁朝秩序崩溃。', life: '464-549年', birthYear: 464, deathYear: 549 },
  'ruler-liang-jianwen': { core: '萧纲在侯景控制建康后即位，实际无力调动全国，后被侯景废杀；其文学活动在宫体诗史上另有影响。', life: '503-551年', birthYear: 503, deathYear: 551 },
  'ruler-liang-yuandi': { core: '萧绎在江陵消灭侯景余部后即位，却在宗室争斗和西魏进攻中失守江陵；本人亦以藏书、著述闻名。', life: '508-555年', birthYear: 508, deathYear: 555 },
  'ruler-chen-wudi': { core: '陈霸先以平定侯景之乱后的军功掌权，557年代梁建陈，在南北对峙中重建江南有限秩序。', life: '503-559年', birthYear: 503, deathYear: 559 },
  'ruler-chen-houzhu': { core: '陈叔宝偏重宫廷文艺并倚重近臣，面对隋军统一攻势准备不足；589年建康陷落，陈亡。', life: '553-604年', birthYear: 553, deathYear: 604, events: ['sui-unification'] },
  'ruler-nwei-daowu': { core: '拓跋珪重建代国并建立北魏，参合陂之战后取得华北优势，以部族军事力量向国家制度转型。', life: '371-409年', birthYear: 371, deathYear: 409 },
  'ruler-nwei-taiwu': { core: '拓跋焘通过连续征战统一北方，结束北方多政权并立；其统治也发生灭佛，宗教政策评价复杂。', life: '408-452年', birthYear: 408, deathYear: 452 },
  'ruler-nwei-xiaoming': { core: '元诩幼年即位，胡太后长期临朝，六镇起义和军镇割据在其后期爆发；其死引发河阴之变等剧烈政局。', life: '510-528年', birthYear: 510, deathYear: 528 },
  'ruler-ewei-xiaojing': { core: '元善见是东魏唯一皇帝，朝政实际由高欢、高澄控制；550年禅位高洋，东魏改为北齐。', life: '524-552年', birthYear: 524, deathYear: 552 },
  'ruler-wwei-wendi': { core: '元宝炬由宇文泰拥立建立西魏，皇帝保有名义正统，军政与改革实际由宇文泰集团推动。', life: '507-551年', birthYear: 507, deathYear: 551 },
  'ruler-nqi-wenxuan': { core: '高洋受禅建立北齐，前期整顿军政并抵御北方强敌，后期统治残暴失序，评价呈明显两面性。', life: '526-559年', birthYear: 526, deathYear: 559 },
  'ruler-nqi-houzhu': { core: '高纬在位时倚重近幸、猜忌将领，斛律光被杀严重削弱军力；577年北齐被北周消灭。', life: '556-577年', birthYear: 556, deathYear: 577 },
  'ruler-nzhou-xiaomin': { core: '宇文觉在宇文护主导下受西魏禅位，建立北周；即位当年试图摆脱宇文护控制，失败后被废杀。', life: '542-557年', birthYear: 542, deathYear: 557 },
  'ruler-nzhou-jingdi': { core: '宇文阐幼年即位，外祖父杨坚以辅政身份控制朝廷；581年禅位杨坚，北周亡而隋朝建立。', life: '573-581年', birthYear: 573, deathYear: 581, events: ['sui-unification'] },
  'ruler-sui-gongdi': { core: '杨侑由李渊在长安拥立，实际军政权属于李渊集团；618年禅位，唐朝建立。', life: '605-619年', birthYear: 605, deathYear: 619, events: ['sui-fall', 'tang-founding'] },
  'ruler-tang-zhongzong': { core: '李显两度即位，第一次因试图扩张韦氏外戚权力被武则天废黜；复位后朝政受韦后、安乐公主等影响。', life: '656-710年', birthYear: 656, deathYear: 710, events: ['wu-zhou'] },
  'ruler-tang-ruizong': { core: '李旦两度即位，先后处在武则天和太平公主强势影响下；712年传位李隆基，使玄宗得以亲政。', life: '662-716年', birthYear: 662, deathYear: 716, events: ['wu-zhou', 'kaiyuan-prosperity'] },
  'ruler-tang-shangdi': { core: '李重茂由韦后拥立，在位不足一个月；临淄王李隆基与太平公主政变后，其帝位被取消。', life: '695-714年', birthYear: 695, deathYear: 714 },
  'ruler-tang-suzong': { core: '李亨在安史之乱中于灵武即位，组织收复长安、洛阳；平叛依赖朔方军与回纥援军，宦官军事权力随之上升。', life: '711-762年', birthYear: 711, deathYear: 762, events: ['an-shi-rebellion'] },
  'ruler-tang-daizong': { core: '李豫在安史之乱尾声继位，面对藩镇坐大、吐蕃入长安和财政困难，中央对地方的直接控制已明显下降。', life: '727-779年', birthYear: 727, deathYear: 779, events: ['an-shi-rebellion'] },
  'ruler-tang-dezong': { core: '李适试图通过财政与削藩恢复中央权力，却引发建中之乱并出逃奉天；此后对藩镇和宦官禁军更为依赖。', life: '742-805年', birthYear: 742, deathYear: 805 },
  'ruler-tang-xianzong': { core: '李纯任用裴度、李愬等讨平多处强藩，形成“元和中兴”；晚年宦官势力仍深度影响宫廷和继承。', life: '778-820年', birthYear: 778, deathYear: 820 },
  'ruler-tang-wenzong': { core: '李昂试图联合朝臣清除宦官，835年甘露之变失败，参与官员遭大规模诛杀，皇帝此后更受宦官控制。', life: '809-840年', birthYear: 809, deathYear: 840 },
  'ruler-tang-wuzong': { core: '李炎重用李德裕整顿政务并打击藩镇，会昌年间大规模限制佛教及其他宗教，寺院经济和文化受到冲击。', life: '814-846年', birthYear: 814, deathYear: 846 },
  'ruler-tang-xuanzong-late': { core: '李忱在位时整顿吏治、抑制部分权臣并收复河湟若干州，后世称“大中之治”，但藩镇宦官结构未根本改变。', life: '810-859年', birthYear: 810, deathYear: 859 },
  'ruler-tang-xizong': { core: '李儇即位时年少，黄巢起义席卷全国并攻入长安，皇帝出逃成都；唐朝对地方军镇的依赖进一步加深。', life: '862-888年', birthYear: 862, deathYear: 888, events: ['huang-chao-uprising'] },
  'ruler-tang-zhaozong': { core: '李晔试图恢复皇权，却在凤翔军、宦官和朱温等势力之间辗转受制，最终被朱温杀害。', life: '867-904年', birthYear: 867, deathYear: 904, events: ['five-dynasties-begin'] },
  'ruler-tang-aidi': { core: '李柷由朱温控制下即位，907年禅位朱温，唐朝灭亡并进入五代十国时期。', life: '892-908年', birthYear: 892, deathYear: 908, events: ['five-dynasties-begin'] },
  'ruler-later-liang-yingwang': { core: '朱友珪弑父朱温后夺位，因缺乏军政支持很快被朱友贞一方推翻，在位不足一年。', life: '？-913年', deathYear: 913 },
  'ruler-later-liang-modi': { core: '朱友贞推翻朱友珪后即位，长期与后唐李存勖交战；923年后梁都城失守，自尽亡国。', life: '888-923年', birthYear: 888, deathYear: 923, events: ['five-dynasties-transition'] },
  'ruler-later-tang-mingzong': { core: '李嗣源因兵变被拥立，停止庄宗后期部分苛敛、注意民政，统治相对稳定，但军镇继承问题仍未解决。', life: '867-933年', birthYear: 867, deathYear: 933 },
  'ruler-later-tang-modi': { core: '李从珂通过军变夺位，与石敬瑭冲突后，石氏借契丹兵南下；936年洛阳陷落，后唐亡。', life: '885-937年', birthYear: 885, deathYear: 937, events: ['sixteen-prefectures'] },
  'ruler-later-jin-chudi': { core: '石重贵即位后改变对契丹的臣属礼仪并多次交战，947年契丹攻入开封，后晋灭亡。', life: '914-974年', birthYear: 914, deathYear: 974, events: ['sixteen-prefectures'] },
  'ruler-later-han-yindi': { core: '刘承祐年轻即位，试图诛除辅政将领引发郭威起兵；950年开封失守，后汉亡。', life: '931-951年', birthYear: 931, deathYear: 951, events: ['five-dynasties-later-han-zhou'] },
  'ruler-later-zhou-gongdi': { core: '柴宗训七岁即位，赵匡胤在陈桥兵变中被拥立；960年恭帝禅位，后周转为北宋。', life: '953-973年', birthYear: 953, deathYear: 973, events: ['chenqiao-mutiny'] },
  'ruler-song-taizong': { core: '赵光义继续统一战争，灭北汉完成中原基本统一；两次北伐辽朝失败，使燕云问题长期延续。', life: '939-997年', birthYear: 939, deathYear: 997, events: ['song-unification'] },
  'ruler-song-zhenzong': { core: '赵恒在辽军南下时亲征澶州，1005年签订澶渊之盟，宋辽进入长期和平；晚年天书封祀活动加重财政负担。', life: '968-1022年', birthYear: 968, deathYear: 1022, events: ['chanyuan-treaty'] },
  'ruler-song-yingzong': { core: '赵曙由仁宗收养后继位，在位时间较短；濮议围绕生父名分展开，体现皇权礼制与士大夫议政的张力。', life: '1032-1067年', birthYear: 1032, deathYear: 1067 },
  'ruler-song-zhezong': { core: '赵煦幼年时由高太后主持政务并废止部分新法，亲政后转向绍述神宗政策，新旧党争因而加深。', life: '1077-1100年', birthYear: 1077, deathYear: 1100, events: ['wang-anshi-reform'] },
  'ruler-song-qinzong': { core: '赵桓在金军压境时受禅即位，战和政策反复且防务崩溃；1127年与徽宗一同被俘，北宋灭亡。', life: '1100-1161年', birthYear: 1100, deathYear: 1161, events: ['jingkang-incident'] },
  'ruler-song-xiaozong': { core: '赵昚即位后为岳飞平反并发动隆兴北伐，失败后调整为和议；在位重视吏治和财政，史称“乾淳之治”。', life: '1127-1194年', birthYear: 1127, deathYear: 1194, events: ['song-jin-war'] },
  'ruler-song-guangzong': { core: '赵惇在位时因宫廷矛盾和身心状况长期不朝，最终在大臣与太皇太后推动下禅位。', life: '1147-1200年', birthYear: 1147, deathYear: 1200 },
  'ruler-song-ningzong': { core: '赵扩在位时韩侂胄、史弥远先后掌权，开禧北伐失败；理学地位则在政治反复后逐步提高。', life: '1168-1224年', birthYear: 1168, deathYear: 1224 },
  'ruler-song-lizong': { core: '赵昀由史弥远拥立，亲政后一度整顿政务并尊崇理学，晚年权臣政治、财政和蒙古压力同步加剧。', life: '1205-1264年', birthYear: 1205, deathYear: 1264 },
  'ruler-song-gongdi': { core: '赵㬎幼年即位，谢太后主持临安朝廷；1276年临安向元军投降，南宋残余继续南撤。', life: '1271-1323年', birthYear: 1271, deathYear: 1323, events: ['song-fall'] },
  'ruler-song-duanzong': { core: '赵昰在南宋流亡朝廷中被拥立，依靠张世杰、陆秀夫等在东南沿海继续抗元，1278年病逝。', life: '1269-1278年', birthYear: 1269, deathYear: 1278, events: ['song-fall'] },
  'ruler-song-bing': { core: '赵昺幼年继位，流亡政权在崖山战败；1279年陆秀夫负帝投海，南宋最后抵抗结束。', life: '1272-1279年', birthYear: 1272, deathYear: 1279, events: ['song-fall'] },
  'ruler-liao-taizong': { core: '耶律德光灭后晋并进入开封，一度改国号大辽；因治理与供给困难撤北，途中去世。', life: '902-947年', birthYear: 902, deathYear: 947, events: ['sixteen-prefectures'] },
  'ruler-liao-shengzong': { core: '耶律隆绪幼年即位，萧太后辅政，辽朝国力稳定；与北宋签订澶渊之盟后形成长期边境和平。', life: '972-1031年', birthYear: 972, deathYear: 1031, events: ['chanyuan-treaty'] },
  'ruler-liao-tianzuo': { core: '耶律延禧在位时未能有效应对女真崛起和内部离心，1125年被金俘，辽朝灭亡。', life: '1075-1128年', birthYear: 1075, deathYear: 1128, events: ['jin-founding'] },
  'ruler-xixia-renzong': { core: '李仁孝在位五十余年，重视儒学、科举和法律文化建设，西夏文治发展；同时维持与金、宋之间的平衡。', life: '1124-1193年', birthYear: 1124, deathYear: 1193 },
  'ruler-xixia-shenzong': { core: '李遵顼以宗室身份发动政变夺位，对金战争消耗国力，蒙古压力又持续增强。', life: '1163-1226年', birthYear: 1163, deathYear: 1226 },
  'ruler-xixia-modi': { core: '李睍在蒙古军围攻中即位，1227年中兴府投降，西夏灭亡。', life: '？-1227年', deathYear: 1227 },
  'ruler-jin-taizong': { core: '完颜晟延续金太祖扩张，先灭辽、后攻破北宋都城并制造靖康之变，金朝由东北政权转为北方大国。', life: '1075-1135年', birthYear: 1075, deathYear: 1135, events: ['jingkang-incident'] },
  'ruler-jin-xizong': { core: '完颜亶在位时推进汉制和中央官制，金朝由部族联盟向中原王朝转型；晚年宫廷矛盾加剧，被完颜亮杀害。', life: '1119-1150年', birthYear: 1119, deathYear: 1150 },
  'ruler-jin-hailing': { core: '完颜亮迁都燕京、强化中央并大举攻宋，1161年采石战事失利后在军中被杀；其改革与暴政评价并存。', life: '1122-1161年', birthYear: 1122, deathYear: 1161, events: ['song-jin-war'] },
  'ruler-jin-shizong': { core: '完颜雍即位后停止大规模南侵、恢复生产并整顿吏治，形成“大定之治”，同时重视女真传统。', life: '1123-1189年', birthYear: 1123, deathYear: 1189 },
  'ruler-jin-aizong': { core: '完颜守绪面对蒙古进攻、南宋夹击和财政军力枯竭，辗转汴京、归德、蔡州；1234年金亡时自尽。', life: '1198-1234年', birthYear: 1198, deathYear: 1234 },
  'ruler-yuan-chengzong': { core: '铁穆耳继承忽必烈帝位，基本维持既有制度并停止部分对外战争；财政仍受赏赐和钞法问题困扰。', life: '1265-1307年', birthYear: 1265, deathYear: 1307 },
  'ruler-yuan-renzong': { core: '爱育黎拔力八达重用儒臣，恢复科举并推动汉法治理，是元朝制度文治的重要阶段。', life: '1285-1320年', birthYear: 1285, deathYear: 1320 },
  'ruler-yuan-yingzong': { core: '硕德八剌与拜住推行财政和吏治整顿，触动权贵利益，1323年在南坡之变中遇害。', life: '1303-1323年', birthYear: 1303, deathYear: 1323 },
  'ruler-yuan-tianshun': { core: '阿速吉八在两都之战中于上都被拥立，政权很快失败；其在位反映元朝宗王集团的继承冲突。', life: '1320-1328年', birthYear: 1320, deathYear: 1328 },
  'ruler-yuan-mingzong': { core: '和世㻋在宗王争位后返国即位，旋即在王忽察都去世，传统认为其死与宫廷权力斗争有关。', life: '1300-1329年', birthYear: 1300, deathYear: 1329 },
  'ruler-yuan-ningzong': { core: '懿璘质班七岁即位、在位不足两月，政务由卜答失里太后和权臣主持。', life: '1326-1332年', birthYear: 1326, deathYear: 1332 },
  'ruler-yuan-shundi': { core: '妥懽帖睦尔在位前期受权臣控制，后期财政失序、黄河灾害与红巾军起义叠加；1368年退出大都，元朝在中原统治结束。', life: '1320-1370年', birthYear: 1320, deathYear: 1370, events: ['ming-founding'] },
  'ruler-ming-jianwen': { core: '朱允炆即位后推行削藩，燕王朱棣发动靖难之役；1402年南京失守，建文帝下落成为长期争议。', life: '1377-？', birthYear: 1377, events: ['jingnan-campaign'] },
  'ruler-ming-renzong': { core: '朱高炽在位不足一年，停止部分大规模用兵、减免赋役并调整永乐后期政策，与宣宗时期合称“仁宣之治”。', life: '1378-1425年', birthYear: 1378, deathYear: 1425 },
  'ruler-ming-xuanzong': { core: '朱瞻基维持较稳定的文官治理、平定汉王之乱并收缩交趾经营，仁宣时期国力相对休养。', life: '1399-1435年', birthYear: 1399, deathYear: 1435 },
  'ruler-ming-daizong': { core: '朱祁钰在土木堡之变后即位，任用于谦组织北京保卫战并稳定朝局；1457年夺门之变后被废。', life: '1428-1457年', birthYear: 1428, deathYear: 1457, events: ['tumu-crisis'] },
  'ruler-ming-xiaozong': { core: '朱祐樘在位时整顿吏治、减少弊政并较勤于政务，后世称“弘治中兴”，但财政和边防压力仍在。', life: '1470-1505年', birthYear: 1470, deathYear: 1505 },
  'ruler-ming-wuzong': { core: '朱厚照在位时倚重刘瑾等近侍，又亲自平定宁王之乱；其个人化统治与文官集团长期冲突。', life: '1491-1521年', birthYear: 1491, deathYear: 1521, events: ['prince-ning-rebellion'] },
  'ruler-ming-shizong': { core: '朱厚熜以藩王入继，通过大礼议确立皇权，前期改革后长期不上朝；倭患、边防和财政问题贯穿嘉靖时期。', life: '1507-1567年', birthYear: 1507, deathYear: 1567, events: ['anti-wokou'] },
  'ruler-ming-muzong': { core: '朱载坖在位时调整嘉靖后期政治，开放海禁形成“隆庆开关”，并与蒙古俺答达成封贡，缓和北边冲突。', life: '1537-1572年', birthYear: 1537, deathYear: 1572 },
  'ruler-ming-guangzong': { core: '朱常洛经历长期国本之争后即位，在位仅一月即去世，“红丸案”成为晚明宫廷三案之一。', life: '1582-1620年', birthYear: 1582, deathYear: 1620 },
  'ruler-ming-xizong': { core: '朱由校在位时魏忠贤与客氏掌权，东林党人遭打击；辽东战事和财政危机继续恶化。', life: '1605-1627年', birthYear: 1605, deathYear: 1627, events: ['late-ming-eunuch-politics'] },
  'ruler-qing-jiaqing': { core: '爱新觉罗·颙琰亲政后处置和珅、整顿吏治，但白莲教起义、财政亏空和官僚腐败显示盛世后的结构性压力。', life: '1760-1820年', birthYear: 1760, deathYear: 1820, events: ['heshen-corruption', 'high-qing'] },
  'ruler-qing-xianfeng': { core: '爱新觉罗·奕詝在位同时面对太平天国和第二次鸦片战争，中央不得不依靠湘军等地方武装，传统军政结构发生转折。', life: '1831-1861年', birthYear: 1831, deathYear: 1861, events: ['taiping-rebellion'] },
  'ruler-qing-tongzhi': { core: '爱新觉罗·载淳幼年即位，慈安、慈禧两宫太后垂帘听政，曾国藩、李鸿章等平定内乱并推动洋务，史称“同治中兴”。', life: '1856-1875年', birthYear: 1856, deathYear: 1875, events: ['self-strengthening'] },
  'ruler-qing-xuantong': { core: '爱新觉罗·溥仪三岁即位，摄政王载沣主持朝政；辛亥革命后于1912年退位，清朝和帝制时代终结。', life: '1906-1967年', birthYear: 1906, deathYear: 1967, events: ['late-qing-new-policy', 'xinhai-revolution'] },
};

Object.assign(rulerFacts, {
  'ruler-xia-zhu': { core: '传世世系称杼为少康之子，承接“少康中兴”后的夏后氏统治；后世还把向东发展势力等事迹系于其名下，但缺少同时代文字证据。' },
  'ruler-xia-huai': { core: '传世世系称槐为杼之子、芒之父，其个人事迹主要保存在王位次序和诸夷来朝等后世叙述中，无法据此重建具体政策。' },
  'ruler-xia-mang': { core: '传世世系把芒列在槐与泄之间，部分礼仪传说附会于其即位；能够谨慎确认的只是其在夏王世系中的位置。' },
  'ruler-xia-xie': { core: '传世世系称泄为芒之子、不降之父，后世文献把一些方国封建故事放在其时期，但缺乏同时代材料互证。' },
  'ruler-xia-bujiang': { core: '传统记载称不降在位较久，后来让位于弟扃而非直接传子；这一叙述常被用于观察早期王位传承并非始终父死子继。' },
  'ruler-xia-jiong': { core: '传世世系称扃为不降之弟，在不降让位后成为夏王，王位随后传给其子廑；个人军政事迹没有可靠连续记录。' },
  'ruler-xia-jin': { core: '传世世系把廑列为扃之子，其后王位回到不降之子孔甲一系；这一位置反映夏王世系中的旁支转换叙事。' },
  'ruler-xia-gao': { core: '传统王表称皋为孔甲之子、发之父，处在夏后氏末期；除世系次序外，缺少能够可靠展开的个人事迹。' },
  'ruler-xia-fa': { core: '传统王表把发列为皋之子、桀之父，是夏后氏末代君主之前的最后一位王；其个人活动史料极少。' },
  'ruler-shang-waibing': { core: '传世文献称外丙为商汤之子，在汤死后短暂继位；《史记》等材料对在位年数存在差异，说明商初纪年仍需谨慎。' },
  'ruler-shang-zhongren': { core: '传世世系称仲壬为商汤之子、外丙之弟，短暂在位后王位转给太甲；其个人事迹没有同时代文字记录。' },
  'ruler-shang-woding': { core: '传世世系称沃丁为太甲之子，继承太甲后的商王统序；伊尹去世及臣属辅政故事见于后世文献，细节难以互证。' },
  'ruler-shang-taigeng': { core: '传世王表把太庚列为太甲之子、沃丁之弟，体现商初兄终弟及与父死子继并行的王位传承方式。' },
  'ruler-shang-xiaojia': { core: '小甲在传世商王世系中承太庚之后、雍己之前，个人活动材料很少；其意义主要是确认商初王族内部的继承次序。' },
  'ruler-shang-yongji': { core: '传统记载称雍己时期商王室号令减弱、部分方国不朝，太戊继位后才出现复兴叙事；这种兴衰评价来自后世文献。' },
  'ruler-shang-wairen': { core: '外壬被传世王表列为太戊之子、仲丁之弟，处于商代中期频繁迁都和王位竞争的阶段。' },
  'ruler-shang-zuxin': { core: '祖辛承祖乙之后为王，王位随后传弟沃甲；其世系显示商代兄弟相继与下一代回传交错的继承结构。' },
  'ruler-shang-wojia': { core: '沃甲又作羌甲，传世世系称其为祖辛之弟，死后王位传给祖辛之子祖丁，体现商王族不同支系间的轮替。' },
  'ruler-shang-zuding': { core: '祖丁为祖辛之子，承叔父沃甲之后即位；其后南庚又出自沃甲一支，王位在两支之间继续转换。' },
  'ruler-shang-nangeng': { core: '南庚为沃甲之后，传世文献把迁都于奄与其时代相联系；迁徙细节及地点对应仍需结合考古讨论。' },
  'ruler-shang-yangjia': { core: '阳甲处于盘庚之前，传统史家把其时代列为商王室再度衰弱的阶段；盘庚迁殷成为随后重整秩序的转折。', events: ['pan-geng-moves-yin'] },
  'ruler-shang-xiaoxin': { core: '小辛继盘庚之后为王，传统文献认为盘庚迁殷后的政治稳定未能完全延续；其个人事迹记载有限。', events: ['pan-geng-moves-yin'] },
  'ruler-shang-xiaoyi': { core: '小乙继小辛之后为王，是武丁之父；后世叙述常把武丁即位前的历练置于这一时期，但具体过程不能完全核实。' },
  'ruler-shang-zugeng': { core: '祖庚继武丁之后为王，延续晚商强盛阶段；甲骨材料中的王室祭祀与征伐为理解其时代提供了比早商更直接的证据。', events: ['wu-ding-revival'] },
  'ruler-shang-linxin': { core: '廪辛承祖甲之后，处于晚商王室内部继承延续阶段；除卜辞祭祀谱系和王表位置外，个人施政难以展开。' },
  'ruler-shang-kangding': { core: '康丁又见作庚丁，承廪辛之后，处在晚商对周边方国持续用兵的时代；个人事迹主要依赖王表和零散卜辞。' },
  'ruler-zhou-gong': { core: '姬繄扈承周穆王之后即位，西周进入中期；青铜器铭文所见册命、土地和司法活动说明王室制度仍在运作，但个人传记有限。' },
  'ruler-zhou-yi1': { core: '姬囏继周共王之后为王，传统叙述把其时期视为王室渐衰，并有迁居犬丘等说法；具体年代与事迹存在讨论。' },
  'ruler-zhou-xiao': { core: '姬辟方为周共王之弟，在懿王之后以叔辈身份继位；传统记载称其封非子于秦，为秦人受周封邑叙事的重要节点。' },
  'ruler-zhou-yi2': { core: '姬燮承周孝王之后即位，传统文献记王室对齐国的干预与惩罚，反映西周后期天子和诸侯关系趋于紧张。' },
  'ruler-zhou-zhuang': { core: '姬佗在位时周公黑肩曾谋杀庄王另立王子克，阴谋败露；王畿内部卿士政治已持续牵制周王。' },
  'ruler-zhou-xi': { core: '姬胡齐在位短暂，齐桓公开始形成霸主影响；周天子越来越依靠强诸侯维护会盟与礼制名分。', events: ['spring-autumn-hegemony'] },
  'ruler-zhou-hui': { core: '姬阆即位后发生王子颓之乱，一度出奔；郑厉公、虢公帮助其复位，显示周王室无力独自解决王畿政变。', events: ['spring-autumn-hegemony'] },
  'ruler-zhou-qing': { core: '姬壬臣承襄王之后，在位仅数年；此时晋国维持中原霸权，周王主要保有册命、礼仪和名义共主职能。' },
  'ruler-zhou-kuang': { core: '姬班承顷王之后短暂在位，王室直接控制范围有限；晋楚争霸构成其时代的主要外部政治格局。', events: ['spring-autumn-hegemony'] },
  'ruler-zhou-jian': { core: '姬夷处在晋楚长期竞争和诸侯会盟频繁的春秋中期，周王室更多以礼制名义参与秩序，而非主导战争。' },
  'ruler-zhou-ling': { core: '姬泄心在位时王畿财政与卿士政治问题突出，王子晋等人物传说亦附着于其家族；史实应与后世神仙叙事区分。' },
  'ruler-zhou-dao': { core: '姬猛在周景王死后的继承冲突中即位，不久去世；王子朝与王子匄的争位使王畿陷入长期内乱。' },
  'ruler-zhou-jing2': { core: '姬匄在晋国支持下与王子朝争位，最终恢复王位；其在位跨越春秋晚期，周王室对诸侯干预的依赖更深。' },
  'ruler-zhou-yuan': { core: '姬仁承周敬王之后，前475年通常被用作春秋与战国分期附近的年代标记；王室实际政治影响已经十分有限。' },
  'ruler-zhou-zhending': { core: '姬介在位时晋国韩、赵、魏三家势力继续扩张，周王室无力阻止诸侯国内部的权力重组。', events: ['three-families-jin'] },
  'ruler-zhou-ai': { core: '姬去疾继贞定王后不久即被弟姬叔杀害，在位仅数月；这次兄弟相残显示王畿继承秩序失稳。' },
  'ruler-zhou-si': { core: '姬叔杀周哀王自立，又在约五个月后被弟姬嵬杀死；短促在位完全处在王室内部夺位冲突中。' },
  'ruler-zhou-kao': { core: '姬嵬诛杀思王后即位，并封弟于河南形成西周桓公一系；东周王畿由此进一步出现分封割裂。' },
  'ruler-zhou-an': { core: '姬骄在位时韩、赵、魏已作为诸侯参与战国竞争，吴起、商鞅之前的各国变法和兼并趋势逐渐增强。', events: ['three-families-jin'] },
  'ruler-zhou-lie': { core: '姬喜在位短暂，战国诸侯已分别建立更强的官僚和军事体系，周天子的号令主要保留象征意义。' },
  'ruler-zhou-xian': { core: '姬扁在位近五十年，经历魏国由盛转衰、秦孝公任用商鞅以及诸侯相王；周王无法主导这些格局变化。', events: ['shang-yang-reform'] },
  'ruler-zhou-shenjing': { core: '姬定承显王之后在位六年，秦国持续东进，周王畿又分为东周、西周两个小政治实体，王权更趋衰微。' },
  'ruler-ejin-chengdi': { core: '司马衍幼年即位，由庾太后与庾亮辅政；苏峻之乱攻陷建康，平乱后王导等重整朝廷，门阀共治格局延续。', life: '321-342年', birthYear: 321, deathYear: 342 },
  'ruler-ejin-kangdi': { core: '司马岳是成帝之弟，在宗室和外戚权衡下继位，在位约两年；军政仍主要由庾氏等士族掌握。', life: '322-344年', birthYear: 322, deathYear: 344 },
  'ruler-ejin-aidi': { core: '司马丕在位时桓温继续掌握上游军权并北伐，皇帝本人服食方士丹药后病重，政务由褚太后临朝处理。', life: '341-365年', birthYear: 341, deathYear: 365 },
  'ruler-ejin-jianwen': { core: '司马昱长期以会稽王参与辅政，371年被桓温废海西公后拥立，在位不足一年，皇权受到桓温直接压制。', life: '320-372年', birthYear: 320, deathYear: 372 },
  'ruler-liu-song-shaodi': { core: '刘义符继刘裕后即位，徐羡之、傅亮、谢晦等受遗辅政；两年后辅臣以失德为由将其废杀。', life: '406-424年', birthYear: 406, deathYear: 424 },
  'ruler-liu-song-xiaowu': { core: '刘骏在刘劭弑父后起兵夺位，强化中央、调整州镇并多次对北魏用兵；宗室猜忌和财政征敛也在其后期加重。', life: '430-464年', birthYear: 430, deathYear: 464 },
  'ruler-liu-song-qianfei': { core: '刘子业少年即位，因残酷处置宗室与近臣迅速失去支持，465年被近侍杀死，湘东王刘彧继位。', life: '449-466年', birthYear: 449, deathYear: 466 },
  'ruler-liu-song-mingdi': { core: '刘彧在宫廷政变中即位，并通过内战击败拥立刘子勋的各地州镇；战后大规模削弱宗室，刘宋国力明显受损。', life: '439-472年', birthYear: 439, deathYear: 472 },
  'ruler-liu-song-houfei': { core: '刘昱幼年即位，朝政先后受权臣和近侍控制；477年被杀后，掌握禁军的萧道成进一步控制刘宋。', life: '463-477年', birthYear: 463, deathYear: 477 },
  'ruler-liu-song-shundi': { core: '刘准由萧道成拥立，名义在位而军政实权完全归萧氏；479年禅位，南朝宋亡、齐建立。', life: '467-479年', birthYear: 467, deathYear: 479 },
  'ruler-nanqi-gaodi': { core: '萧道成以刘宋禁军将领和辅政者身份掌权，479年代宋建齐；其在位短暂，重点是约束奢费和稳定新政权。', life: '427-482年', birthYear: 427, deathYear: 482 },
  'ruler-nanqi-wudi': { core: '萧赜承高帝后维持相对稳定的文官治理，史称“永明之治”；与北魏边境总体维持对峙，文化活动兴盛。', life: '440-493年', birthYear: 440, deathYear: 493 },
  'ruler-nanqi-yulin': { core: '萧昭业继位后与辅政宗室萧鸾冲突，因挥霍和近臣政治迅速失势，494年被萧鸾废杀。', life: '473-494年', birthYear: 473, deathYear: 494 },
  'ruler-nanqi-hailing': { core: '萧昭文由萧鸾拥立，实际没有独立权力，在位数月即被废为海陵王，随后被杀。', life: '480-494年', birthYear: 480, deathYear: 494 },
  'ruler-nanqi-mingdi': { core: '萧鸾连续废立后自立为帝，为巩固旁支皇位大规模处置高帝、武帝后裔，削弱了萧齐宗室基础。', life: '452-498年', birthYear: 452, deathYear: 498 },
  'ruler-nanqi-donghun': { core: '萧宝卷在位时倚重近臣并滥杀大臣，激起各地反抗；萧衍起兵攻入建康后，宝卷被杀。', life: '483-501年', birthYear: 483, deathYear: 501 },
  'ruler-nanqi-hedi': { core: '萧宝融由萧衍在江陵拥立以讨伐萧宝卷，建康平定后禅位于萧衍，南朝齐亡。', life: '488-502年', birthYear: 488, deathYear: 502 },
  'ruler-liang-jingdi': { core: '萧方智由陈霸先拥立，在位时实际军政权属于陈氏；557年禅位陈霸先，南朝梁的建康政权结束。', life: '543-558年', birthYear: 543, deathYear: 558 },
  'ruler-chen-wendi': { core: '陈蒨继陈霸先后即位，平定地方割据、恢复江南经济并整顿吏治，天嘉年间是陈朝相对稳定阶段。', life: '522-566年', birthYear: 522, deathYear: 566 },
  'ruler-chen-feidi': { core: '陈伯宗年少继位，叔父陈顼以辅政名义掌权，568年被废为临海王，皇位转入陈顼一支。', life: '554-570年', birthYear: 554, deathYear: 570 },
  'ruler-chen-xuandi': { core: '陈顼废侄自立，在位时一度北伐取得淮南部分地区，后因北周进军而丧失，陈朝对北方压力增大。', life: '530-582年', birthYear: 530, deathYear: 582 },
  'ruler-nwei-mingyuan': { core: '拓跋嗣继道武帝后整顿政局，继续向黄河流域扩张并与刘宋交战，为太武帝统一北方积累条件。', life: '392-423年', birthYear: 392, deathYear: 423 },
  'ruler-nwei-wencheng': { core: '拓跋濬在太武帝死后的宫廷动荡中即位，恢复佛教并开凿云冈石窟前期工程，缓和此前高压政策。', life: '440-465年', birthYear: 440, deathYear: 465 },
  'ruler-nwei-xianwen': { core: '拓跋弘在位时冯太后参与朝政，471年禅位幼子孝文帝后仍以太上皇掌权，最终与冯太后发生激烈冲突。', life: '454-476年', birthYear: 454, deathYear: 476, events: ['xiaowen-reform'] },
  'ruler-nwei-xuanwu': { core: '元恪继承孝文改革后的北魏，继续对南朝用兵并扩建洛阳；晚年外戚、宗室和官僚矛盾加深。', life: '483-515年', birthYear: 483, deathYear: 515, events: ['xiaowen-reform'] },
  'ruler-nwei-xiaozhuang': { core: '元子攸在尔朱荣控制下即位，530年设伏诛杀尔朱荣，随即被尔朱氏军队攻破洛阳并杀害。', life: '507-531年', birthYear: 507, deathYear: 531 },
  'ruler-wwei-feidi': { core: '元钦继西魏文帝后即位，试图摆脱宇文泰控制，谋划失败后被废并遇害，皇权的名义性质更加明显。', life: '525-554年', birthYear: 525, deathYear: 554 },
  'ruler-wwei-gongdi': { core: '拓跋廓由宇文泰拥立，并恢复鲜卑旧姓等政策；557年被迫禅位宇文觉，西魏转为北周。', life: '537-557年', birthYear: 537, deathYear: 557 },
  'ruler-nqi-feidi': { core: '高殷少年继文宣帝后即位，杨愔等辅政试图限制宗室，被高演、高湛发动政变清除；高殷随后被废杀。', life: '545-561年', birthYear: 545, deathYear: 561 },
  'ruler-nqi-xiaozhao': { core: '高演通过政变夺位，在位约一年间注意整顿吏治和军政，因坠马受伤去世，皇位传弟高湛。', life: '535-561年', birthYear: 535, deathYear: 561 },
  'ruler-nqi-wucheng': { core: '高湛在位时倚重和士开等近臣，后禅位于太子高纬而继续以太上皇掌权，北齐政治日趋腐败。', life: '537-569年', birthYear: 537, deathYear: 569 },
  'ruler-nqi-youzhu': { core: '高恒在北周军队追击下由父高纬传位，实际在位仅数十日即被俘，北齐灭亡。', life: '570-578年', birthYear: 570, deathYear: 578 },
  'ruler-nzhou-xiaomin': { core: '宇文觉在宇文护主导下受西魏禅位，建立北周；即位当年试图摆脱宇文护控制，失败后被废杀。', life: '542-557年', birthYear: 542, deathYear: 557 },
  'ruler-nzhou-mingdi': { core: '宇文毓由宇文护拥立，在位时重视文教并逐步表现亲政意图，最终被宇文护毒杀。', life: '534-560年', birthYear: 534, deathYear: 560 },
  'ruler-nzhou-wudi': { core: '宇文邕长期隐忍后诛杀权臣宇文护，亲掌军政并于577年灭北齐统一北方；其灭佛政策也深刻影响寺院经济。', life: '543-578年', birthYear: 543, deathYear: 578 },
  'ruler-nzhou-xuandi': { core: '宇文赟即位后迅速处置旧臣、扩张宫廷权力，一年后禅位幼子而自称天元皇帝，朝政失序为杨坚辅政创造条件。', life: '559-580年', birthYear: 559, deathYear: 580 },
  'ruler-tang-muzong': { core: '李恒继宪宗后放松削藩，河朔藩镇再度脱离中央；长庆会盟稳定唐蕃关系，但游乐和服食丹药损害统治。', life: '795-824年', birthYear: 795, deathYear: 824 },
  'ruler-tang-jingzong': { core: '李湛少年即位，朝政受宦官和重臣影响，本人沉湎游乐；826年被宦官近侍杀害，引发新的宫廷废立。', life: '809-827年', birthYear: 809, deathYear: 827 },
  'ruler-tang-yizong': { core: '李漼在位时崇佛和宫廷支出增加，南诏战争与庞勋起义持续消耗财政军力，晚唐危机进一步累积。', life: '833-873年', birthYear: 833, deathYear: 873 },
  'ruler-later-tang-mindi': { core: '李从厚继明宗后即位，调动藩镇以削弱将领反而激起兵变；李从珂由凤翔起兵，闵帝出逃后遇害。', life: '914-934年', birthYear: 914, deathYear: 934 },
  'ruler-song-duzong': { core: '赵禥在位时贾似道长期掌政，襄阳失守后元军沿江推进；财政、军政与朝廷决策能力持续恶化。', life: '1240-1274年', birthYear: 1240, deathYear: 1274, events: ['song-fall'] },
  'ruler-liao-shizong': { core: '耶律阮在辽太宗死后经军中拥立，试图调整部族与汉地官僚关系，951年南征途中被察割等发动政变杀害。', life: '919-951年', birthYear: 919, deathYear: 951 },
  'ruler-liao-muzong': { core: '耶律璟在位较久但怠于政务、刑杀严酷，辽朝对中原扩张趋缓；969年被近侍杀死。', life: '931-969年', birthYear: 931, deathYear: 969 },
  'ruler-liao-jingzong': { core: '耶律贤整顿辽朝政务并重用汉臣，皇后萧绰深度参与决策；其安排为圣宗时期长期稳定奠定基础。', life: '948-982年', birthYear: 948, deathYear: 982 },
  'ruler-liao-xingzong': { core: '耶律宗真亲政后处理钦哀皇后集团，与北宋通过重熙增币维持和平，也曾对西夏用兵；财政赏赐负担加重。', life: '1016-1055年', birthYear: 1016, deathYear: 1055 },
  'ruler-liao-daozong': { core: '耶律洪基在位时辽朝表面维持稳定，但耶律乙辛擅权和太子案严重破坏继承与官僚秩序，后期国势转弱。', life: '1032-1101年', birthYear: 1032, deathYear: 1101 },
  'ruler-xixia-yizong': { core: '李谅祚幼年继位，前期由母党掌权，亲政后改用中原官制并在宋辽之间调整外交，多次发生边境战争。', life: '1047-1068年', birthYear: 1047, deathYear: 1068 },
  'ruler-xixia-huizong': { core: '李秉常幼年即位，梁太后及梁氏外戚控制朝政；围绕推行汉礼和对宋关系的冲突长期限制皇权。', life: '1061-1086年', birthYear: 1061, deathYear: 1086 },
  'ruler-xixia-chongzong': { core: '李乾顺幼年即位后逐步亲政，在辽、宋、金更替中转向臣属金朝，维持西夏较长时期稳定并发展文教。', life: '1083-1139年', birthYear: 1083, deathYear: 1139 },
  'ruler-xixia-huanzong': { core: '李纯祐继仁宗后维持与金的关系，西夏总体承平；1206年被宗室李安全政变废黜。', life: '1177-1206年', birthYear: 1177, deathYear: 1206 },
  'ruler-xixia-xiangzong': { core: '李安全废桓宗自立，改变对蒙古和金的政策，多线战争加重国力消耗；1211年被废。', life: '1170-1211年', birthYear: 1170, deathYear: 1211 },
  'ruler-xixia-xianzong': { core: '李德旺继神宗后即位，试图调整对金、蒙古关系并缓解危机，但蒙古军持续进攻，西夏已接近灭亡。', life: '1181-1226年', birthYear: 1181, deathYear: 1226 },
  'ruler-jin-zhangzong': { core: '完颜璟前期整顿制度、发展文教，金朝文化繁荣；后期黄河灾害、财政压力和北方蒙古诸部威胁逐渐加重。', life: '1168-1208年', birthYear: 1168, deathYear: 1208 },
  'ruler-jin-weishao': { core: '完颜永济在蒙古大举南下时缺乏有效军事控制，1213年被权臣胡沙虎政变废杀，金朝统治陷入更深危机。', life: '？-1213年', deathYear: 1213 },
  'ruler-jin-xuanzong': { core: '完颜珣在政变后即位，面对蒙古进攻将都城由中都迁往汴京，虽保存朝廷却放弃大片北方地区，并与宋再开战。', life: '1163-1224年', birthYear: 1163, deathYear: 1224 },
  'ruler-jin-modi': { core: '完颜承麟在蔡州城破前由哀宗传位，即位当日即战死，通常被视为中国帝王史上在位最短者之一。', life: '？-1234年', deathYear: 1234 },
  'ruler-yuan-wuzong': { core: '海山依靠漠北军力赢得皇位，在位时扩大封赏和机构、发行至大银钞，财政支出迅速增加。', life: '1281-1311年', birthYear: 1281, deathYear: 1311 },
  'ruler-yuan-taiding': { core: '也孙铁木儿由晋王入继，在位时大体维持既有制度并处理多次灾荒；其死后继承未定，引发两都之战。', life: '1293-1328年', birthYear: 1293, deathYear: 1328 },
  'ruler-yuan-wenzong': { core: '图帖睦尔在两都之战中即位，曾让位兄长和世㻋又复位；重视文治、设奎章阁，但皇位合法性与明宗之死争议相连。', life: '1304-1332年', birthYear: 1304, deathYear: 1332 },
  'ruler-ming-xianzong': { core: '朱见深恢复于谦名誉、安置荆襄流民并经营东北边防；后期汪直与西厂、传奉官等问题加重近侍政治争议。', life: '1447-1487年', birthYear: 1447, deathYear: 1487 },
});

const COMPLEX_SUCCESSION_SEQUENCES = {
  'tang:唐': [
    'ruler-tang-gaozu', 'ruler-tang-taizong', 'ruler-tang-gaozong',
    'ruler-tang-zhongzong', 'ruler-tang-ruizong', 'ruler-wu-zetian',
    'ruler-tang-zhongzong', 'ruler-tang-shangdi', 'ruler-tang-ruizong',
    'ruler-tang-xuanzong', 'ruler-tang-suzong', 'ruler-tang-daizong',
    'ruler-tang-dezong', 'ruler-tang-xianzong', 'ruler-tang-muzong',
    'ruler-tang-jingzong', 'ruler-tang-wenzong', 'ruler-tang-wuzong',
    'ruler-tang-xuanzong-late', 'ruler-tang-yizong', 'ruler-tang-xizong',
    'ruler-tang-zhaozong', 'ruler-tang-aidi',
  ],
  'ming:明': [
    'ruler-ming-taizu', 'ruler-ming-jianwen', 'ruler-ming-chengzu',
    'ruler-ming-renzong', 'ruler-ming-xuanzong', 'ruler-ming-yingzong',
    'ruler-ming-daizong', 'ruler-ming-yingzong', 'ruler-ming-xianzong',
    'ruler-ming-xiaozong', 'ruler-ming-wuzong', 'ruler-ming-shizong',
    'ruler-ming-muzong', 'ruler-ming-shenzong', 'ruler-ming-guangzong',
    'ruler-ming-xizong', 'ruler-ming-sizong',
  ],
};

const PROFILE_NEIGHBOR_OVERRIDES = {
  'ruler-tang-zhongzong': ['ruler-wu-zetian', 'ruler-tang-shangdi'],
  'ruler-tang-ruizong': ['ruler-tang-shangdi', 'ruler-tang-xuanzong'],
  'ruler-wu-zetian': ['ruler-tang-ruizong', 'ruler-tang-zhongzong'],
  'ruler-tang-shangdi': ['ruler-tang-zhongzong', 'ruler-tang-ruizong'],
  'ruler-tang-xuanzong': ['ruler-tang-ruizong', 'ruler-tang-suzong'],
  'ruler-ming-yingzong': ['ruler-ming-daizong', 'ruler-ming-xianzong'],
  'ruler-ming-daizong': ['ruler-ming-yingzong', 'ruler-ming-yingzong'],
  'ruler-ming-xianzong': ['ruler-ming-yingzong', 'ruler-ming-xiaozong'],
};

const REGIME_TRANSITIONS = [
  ['ruler-zhou-you', 'ruler-zhou-ping'],
  ['ruler-zhou-nan', 'ruler-qin-shi-huang'],
  ['ruler-qin-zi-ying', 'ruler-han-gaozu'],
  ['ruler-han-pingdi', 'ruler-han-ruzi'],
  ['ruler-han-ruzi', 'ruler-wang-mang'],
  ['ruler-han-pingdi', 'ruler-wang-mang'],
  ['ruler-wang-mang', 'ruler-guangwu'],
  ['ruler-han-xiandi', 'ruler-wei-wendi'],
  ['ruler-wei-yuandi', 'ruler-jin-wudi'],
  ['ruler-shu-liushan', 'ruler-jin-wudi'],
  ['ruler-wu-sunhao', 'ruler-jin-wudi'],
  ['ruler-jin-mindi', 'ruler-ejin-yuandi'],
  ['ruler-ejin-gongdi', 'ruler-liu-song-wudi'],
  ['ruler-liu-song-shundi', 'ruler-nanqi-gaodi'],
  ['ruler-nanqi-hedi', 'ruler-liang-wudi'],
  ['ruler-liang-jingdi', 'ruler-chen-wudi'],
  ['ruler-chen-houzhu', 'ruler-sui-wendi'],
  ['ruler-nwei-xiaozhuang', 'ruler-ewei-xiaojing'],
  ['ruler-nwei-xiaozhuang', 'ruler-wwei-wendi'],
  ['ruler-ewei-xiaojing', 'ruler-nqi-wenxuan'],
  ['ruler-wwei-gongdi', 'ruler-nzhou-xiaomin'],
  ['ruler-nqi-youzhu', 'ruler-nzhou-wudi'],
  ['ruler-nzhou-jingdi', 'ruler-sui-wendi'],
  ['ruler-sui-gongdi', 'ruler-tang-gaozu'],
  ['ruler-tang-aidi', 'ruler-later-liang-taizu'],
  ['ruler-later-liang-modi', 'ruler-later-tang-zhuangzong'],
  ['ruler-later-tang-modi', 'ruler-later-jin-gaozu'],
  ['ruler-later-jin-chudi', 'ruler-later-han-gaozu'],
  ['ruler-later-han-yindi', 'ruler-later-zhou-taizu'],
  ['ruler-later-zhou-gongdi', 'ruler-song-taizu'],
  ['ruler-liao-tianzuo', 'ruler-jin-taizu'],
  ['ruler-song-bing', 'ruler-yuan-shizu'],
  ['ruler-yuan-shundi', 'ruler-ming-taizu'],
  ['ruler-ming-sizong', 'ruler-qing-shunzhi'],
];

function normalize(value) {
  return String(value || '').replace(/\s+/g, '').trim();
}

function makeDisplayName(ruler) {
  const personalName = ruler.personalName || '';
  if (personalName && normalize(personalName) !== normalize(ruler.name)) {
    return `${personalName}（${ruler.name}）`;
  }
  if (ruler.dynastyId === 'xia' && !/夏王/.test(ruler.name)) return `${ruler.name}（夏王）`;
  if (ruler.dynastyId === 'shang' && !/商王/.test(ruler.name)) return `${ruler.name}（商王）`;
  return ruler.name;
}

function hasAnyTag(ruler, pattern) {
  return (ruler.tags || []).some(tag => pattern.test(tag));
}

function contextFor(ruler) {
  return POLITY_CONTEXT[ruler.polity] || DYNASTY_CONTEXT[ruler.dynastyId] || `${ruler.polity}的政治发展`;
}

function tagNarrative(ruler) {
  const text = (ruler.tags || []).map(tag => TAG_FACTS[tag]).filter(Boolean);
  if (hasAnyTag(ruler, /末代|亡$/)) text.push(TAG_FACTS.末代君主);
  if (hasAnyTag(ruler, /中兴/)) text.push(TAG_FACTS.中兴);
  if (hasAnyTag(ruler, /改革|变法|整顿/)) text.push(TAG_FACTS.改革);
  return Array.from(new Set(text)).join('');
}

function sourceProfile(ruler) {
  const base = SOURCE_NOTES[ruler.dynastyId];
  if (base) return base;
  if (hasAnyTag(ruler, /幼帝|短暂在位/) || /^(\d+|前\d+)年$/.test(ruler.reignText || '')) {
    return {
      labels: ['史料缺载'],
      background: `${makeDisplayName(ruler)}出身${ruler.polity}统治家族，其个人材料主要集中在继承、废立和在位时的权力格局。`,
      childhood: '出身宗室或统治家族，但早年生活没有形成连续可核验的记录；不能依据后来政治结局倒推幼年性格。',
    };
  }
  return {
    labels: [],
    background: `${makeDisplayName(ruler)}出身${ruler.polity}统治家族。理解其生平需要结合皇位继承、中央官僚、军队和同时代内外危机，而不能只用庙号或亡国结果概括。`,
    childhood: '现存正史主要从宗室身份、储位变化或即位过程开始记述，幼年生活细节有限；可以确认的是其成长长期处在宫廷教育和继承政治中。',
  };
}

function buildPersonality(ruler, fact) {
  if (fact && fact.personality) return fact.personality;
  if (hasAnyTag(ruler, /幼帝|短暂在位/)) return '在位时间或自主执政条件不足，史料不能支持稳定的个性结论。其政治表现应首先解释为辅政与继承结构的结果。';
  if (/整顿|改革|恢复|平定|统一|亲掌|亲政|北伐|用兵|经营/.test(fact.core)) {
    return `从${fact.core}可见，其政治风格包含主动整合权力、推动军政行动或修复秩序的一面。成效仍受官僚执行、财政资源和时代条件限制，不能只用“英明”概括。`;
  }
  if (/怠于|沉湎|挥霍|残酷|滥杀|刑杀|猜忌|失序|失德/.test(fact.core)) {
    return `现有记载突出其在用人、自我约束或危机判断上的明显问题。${fact.core} 这些表现可以支持谨慎的负面评价，但仍需区分事实记录与后世为亡国、废立所作的道德化归因。`;
  }
  if (/受制|控制|辅政|名义|拥立|被废|政变/.test(fact.core)) {
    return `其政治行为深受辅政者、外戚、权臣、军镇或宫廷政变限制。${fact.core} 因此不宜把在位结果全部解释为个人性格。`;
  }
  if (hasAnyTag(ruler, /废帝|末代|亡国|争议/)) return '后世评价往往受废立或亡国结局影响。可确认的性格线索应从其具体用人、危机处置和权力边界观察，并与道德化叙事分开。';
  if (ruler.dynastyId === 'xia' || ruler.dynastyId === 'shang') return '缺少本人言行的连续记录，无法可靠重建性格。传统文献中的褒贬具有王朝兴亡和政治教训色彩，不直接等同心理事实。';
  return '史料呈现的重点是其继承位置、用人和政务结果。可观察其是否能整合官僚与军队、应对危机，但不把庙号褒贬直接当作完整性格。';
}

function buildPolicy(ruler, fact, predecessor, successor) {
  if (fact && fact.policy) return fact.policy;
  const tags = (ruler.tags || []).join('、') || '王朝治理';
  const authorityNote = hasAnyTag(ruler, /幼帝|废帝|短暂在位/)
    ? '由于实际权力受辅政或军政集团制约，政策应区分皇帝名义与具体执行者。'
    : '政策效果取决于君主能否把诏令转化为官僚、财政和军事执行。';
  return `${makeDisplayName(ruler)}在位议题集中于${tags}。从可确认的施政和权力变化看：${fact.core} 其政策处在由${predecessor ? predecessor.name : '前期统治结构'}向${successor ? successor.name : '后续阶段'}过渡的位置。${authorityNote}`;
}

function makeResume(ruler, fact, predecessor, successor) {
  const title = ruler.dynastyId === 'xia' || ruler.dynastyId === 'shang' || /周/.test(ruler.polity)
    ? '君主 / 最高统治者'
    : '皇帝 / 最高统治者';
  const limited = hasAnyTag(ruler, /幼帝|废帝|短暂在位/) || (fact && /控制|辅政|受制|名义/.test(fact.core));
  const accession = predecessor
    ? `承接${predecessor.name}之后的统治序列；具体是正常继承、拥立、政变还是受禅，需结合本条背景判断。`
    : `位于${ruler.polity}现有年表序列的开端，承担建立或重组统治秩序的任务。`;
  const transition = successor
    ? `其后由${successor.name}承接统治，前后两朝政治的连续与变化可通过承继关系图对照。`
    : `其统治位于${ruler.polity}年表末端，后续影响与政权转型或灭亡直接相连。`;
  return [
    {
      timeText: `即位前至${ruler.reignText || '在位初期'}`,
      periodLabel: `${ruler.polity}继承与即位`,
      title: '宗室成员 / 王位继承人',
      nominalDuty: '在宗法或皇位继承体系中取得统治资格，并获得宗室、官僚或军政集团承认。',
      authorityScope: '即位前没有当然的国家最高权限；作为储君、宗王或被拥立者时，权限取决于当时职位和支持集团。',
      actualInfluence: accession,
      modernEquivalent: '古代最高权力继承过程，没有准确的现代职位对应',
      impact: `即位方式决定其与宗室、辅政者、外戚、官僚和军队的初始权力关系。`,
    },
    {
      timeText: ruler.reignText || fact.life || '在位年代不详',
      periodLabel: ruler.polity,
      title,
      nominalDuty: `名义上负责${ruler.polity}的最高军政、财政、人事、司法、礼制和对外决策。`,
      authorityScope: `权限覆盖中央官僚任免、诏令发布、军队调动、财政征收、礼制祭祀和重大外交；${limited ? '但其实际控制力受到辅政、外戚、宦官、权臣或军镇力量限制。' : '实际执行仍依赖官僚系统、地方治理和军事组织。'}`,
      actualInfluence: fact.core,
      modernEquivalent: '兼有国家元首、最高行政决策者和最高军事统帅职能，但古代君权不等同现代公职',
      impact: fact.impact || `${fact.core}${tagNarrative(ruler)}`,
    },
    {
      timeText: successor ? `${ruler.reignText || '在位期'}之后` : '统治后期及身后',
      periodLabel: '权力交接与历史影响',
      title: '前任君主 / 王朝历史人物',
      nominalDuty: '完成或被迫接受最高权力交接，其政策、用人和危机处理结果转化为后继者的政治条件。',
      authorityScope: '退位、被废或去世后不再拥有在位君主权限；若为太上皇或仍受政治集团利用，需按实际情况另行判断。',
      actualInfluence: transition,
      modernEquivalent: '不宜直接类比，重点是前任统治者留下的制度和政治影响',
      impact: fact.impact || `其统治是理解${contextFor(ruler)}的一环，既要观察个人选择，也要看到制度和时代条件。`,
    },
  ];
}

function buildDisputes(ruler, source, fact) {
  const tabs = [];
  if (source.labels.length) {
    tabs.push({
      title: '史料边界',
      body: `${makeDisplayName(ruler)}的人物资料标注为“${source.labels.join('、')}”。可确认内容以王位次序、在位阶段和重大政治关联为主，不补造幼年逸事、私人动机或无法互证的细节。`,
    });
  }
  if (hasAnyTag(ruler, /末代|废帝|亡国|争议|外戚宦官|短暂在位/) || /控制|受制|投降|自尽|被杀|被废/.test(fact.core)) {
    tabs.push({
      title: '评价视角',
      body: `通识叙述常以${(ruler.tags || []).join('、') || '政权成败'}概括其统治。评价时应拆分个人决策、实际权限、辅政或权臣作用、财政军事条件和后世道德化书写。`,
    });
  }
  return tabs;
}

function buildProfile(ruler, predecessor, successor) {
  const source = sourceProfile(ruler);
  const fact = rulerFacts[ruler.id] || {
    core: `${makeDisplayName(ruler)}在${ruler.reignText || '年代不详'}处于${ruler.polity}最高统治位置。现有史料主要记录其王位次序：${predecessor ? `承接${predecessor.name}` : '位于现有序列开端'}，${successor ? `随后由${successor.name}继承` : '并处于该序列末端'}；${tagNarrative(ruler) || `其时代属于${contextFor(ruler)}的一部分。`}`,
  };
  const displayName = makeDisplayName(ruler);
  const context = contextFor(ruler);
  const eventIds = Array.from(new Set([...(fact.events || []), ...(DEFAULT_EVENTS[ruler.dynastyId] || [])]));
  const sourceLabels = source.labels || [];
  const tags = Array.from(new Set([...(ruler.tags || []), ...sourceLabels]));
  const lifeText = fact.life || ruler.lifeText || `生卒年不详；在位${ruler.reignText || '年代不详'}`;
  const summary = `${fact.core} ${displayName}的统治处在${context}中，评价时需同时区分名义君权、实际执行能力和权力交接结果。`;
  return {
    id: `profile-${ruler.id}`,
    name: displayName,
    formalName: ruler.personalName || ruler.name,
    lifeText,
    birthYear: fact.birthYear ?? null,
    deathYear: fact.deathYear ?? null,
    categories: Array.from(new Set([ruler.isCanonicalRuler ? '帝王' : '君主', ruler.polity, ...tags])),
    crossDynastyLabels: Array.from(new Set([ruler.polity, ...(ruler.tags || []).filter(tag => /五代十国|南朝|北朝|东周|西周|辽|西夏|金/.test(tag))])),
    activePeriodLabels: [ruler.reignText || '在位年代不详', ...(ruler.tags || [])],
    dynastyIds: [ruler.dynastyId],
    summary,
    background: `${source.background} 其在位前后的大环境是${context}。${predecessor ? `前任为${predecessor.name}。` : ''}${successor ? `继任为${successor.name}。` : ''}`,
    childhood: source.childhood,
    personality: buildPersonality(ruler, fact),
    policyInclination: buildPolicy(ruler, fact, predecessor, successor),
    socialContribution: `${fact.core} ${displayName}在制度延续、政治教训或权力转折中的已知作用，是理解${context}的一部分；对失败或亡国君主的记述不作褒义扩大。`,
    impactSummary: fact.impact || `${fact.core} ${displayName}在王朝序列中承接${predecessor ? predecessor.name : '前一阶段'}，并把政治条件传递给${successor ? successor.name : '后续政权'}；这一交接显示名义君权与实际统治能力未必一致。`,
    resume: makeResume(ruler, fact, predecessor, successor),
    relatedEventIds: eventIds,
    disputeTabs: buildDisputes(ruler, source, fact),
    hasAvatar: false,
    sourceLabels,
  };
}

function chronologyValue(ruler) {
  if (/^(xia|shang|western-zhou|eastern-zhou)$/.test(ruler.dynastyId) && Number.isFinite(ruler.canonicalOrder)) {
    return ruler.canonicalOrder;
  }
  const text = ruler.reignText || '';
  const match = text.match(/(前)?(\d+)/);
  if (!match) return Number.isFinite(ruler.canonicalOrder) ? ruler.canonicalOrder : 999999 + (ruler.order || 0);
  return match[1] ? -Number(match[2]) : Number(match[2]);
}

function buildRulerGroups(rulers) {
  const groups = {};
  rulers.forEach(ruler => {
    const key = `${ruler.dynastyId}:${ruler.polity}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(ruler);
  });
  Object.keys(groups).forEach(key => {
    groups[key].sort((a, b) => chronologyValue(a) - chronologyValue(b) || (a.order || 0) - (b.order || 0));
  });
  return groups;
}

function createMissingRulerProfiles(rulers, isMissing) {
  const groups = buildRulerGroups(rulers.filter(ruler => ruler.isCanonicalRuler));
  const rulerById = rulers.reduce((map, ruler) => {
    map[ruler.id] = ruler;
    return map;
  }, {});
  const profiles = [];
  rulers.forEach(ruler => {
    if (!isMissing(ruler)) return;
    const key = `${ruler.dynastyId}:${ruler.polity}`;
    const sequence = groups[key] || [];
    const index = sequence.findIndex(item => item.id === ruler.id);
    const override = PROFILE_NEIGHBOR_OVERRIDES[ruler.id];
    const predecessor = override ? rulerById[override[0]] : index > 0 ? sequence[index - 1] : null;
    const successor = override ? rulerById[override[1]] : index >= 0 ? sequence[index + 1] : null;
    profiles.push(buildProfile(ruler, predecessor, successor));
  });
  return profiles;
}

function createSuccessionRelationships(rulers, resolvePersonId) {
  const groups = buildRulerGroups(rulers.filter(ruler => ruler.isCanonicalRuler));
  const rulerById = rulers.reduce((map, ruler) => {
    map[ruler.id] = ruler;
    return map;
  }, {});
  const result = [];
  function appendSequence(sequence) {
    for (let index = 1; index < sequence.length; index += 1) {
      const predecessor = sequence[index - 1];
      const successor = sequence[index];
      if (!predecessor || !successor) continue;
      const sourceId = resolvePersonId(predecessor);
      const targetId = resolvePersonId(successor);
      if (!sourceId || !targetId || sourceId === targetId) continue;
      result.push({
        sourceId,
        targetId,
        type: '帝位承继',
        summary: `${successor.name}承接${predecessor.name}之后的${successor.polity}统治。此关系只表示年表中的帝位先后，正常继承、复位、废立、政变或禅让等具体方式以双方人物志为准。`,
        eventIds: [],
      });
    }
  }
  Object.keys(groups).forEach(key => {
    if (COMPLEX_SUCCESSION_SEQUENCES[key]) return;
    appendSequence(groups[key]);
  });
  Object.keys(COMPLEX_SUCCESSION_SEQUENCES).forEach(key => {
    appendSequence(COMPLEX_SUCCESSION_SEQUENCES[key].map(id => rulerById[id]).filter(Boolean));
  });
  REGIME_TRANSITIONS.forEach(([sourceRulerId, targetRulerId]) => {
    const sourceRuler = rulerById[sourceRulerId];
    const targetRuler = rulerById[targetRulerId];
    if (!sourceRuler || !targetRuler) return;
    const sourceId = resolvePersonId(sourceRuler);
    const targetId = resolvePersonId(targetRuler);
    if (!sourceId || !targetId || sourceId === targetId) return;
    result.push({
      sourceId,
      targetId,
      type: '政权更替',
      summary: `${sourceRuler.polity}统治序列在${sourceRuler.name}前后转向${targetRuler.polity}的${targetRuler.name}。此关系表示王朝或政权转折，具体过程可能包括战争、禅让、降服或并立政权的最终取代。`,
      eventIds: [],
    });
  });
  return result;
}

module.exports = {
  createMissingRulerProfiles,
  createSuccessionRelationships,
  makeDisplayName,
};
