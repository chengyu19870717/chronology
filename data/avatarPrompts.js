const commonPositive = [
  'original character portrait',
  'Chinese traditional historical figure portrait',
  'ancient China period accurate costume',
  'pre-modern Chinese clothing and headwear',
  'strictly based on Chinese dynastic visual culture',
  'painterly concept art portrait',
  'oil painting texture',
  'visible brush strokes',
  'classic Chinese historical strategy game character portrait aesthetics',
  'inspired by grand strategy game portrait composition, original design',
  'visual language informed by widely recognized classic Chinese historical film and television portrayals',
  'familiar public historical iconography with an original face, no resemblance to any specific actor',
  'realistic painterly illustration',
  'digital painting',
  'concept art',
  'three-quarter bust portrait',
  'dramatic cinematic lighting',
  'finely detailed face',
  'historically grounded costume silhouette',
  'ornate silk, hemp, leather, bronze, jade, lacquer, and lamellar details as appropriate',
  'restrained Chinese historical ornaments only, no fantasy ornaments',
  'calm neutral background',
  'not cosplay',
  'not modern period drama still',
  'sharp focus',
  'masterpiece quality',
].join(', ');

const commonNegative = [
  'low quality',
  'blurry',
  'deformed face',
  'bad anatomy',
  'extra fingers',
  'modern clothing',
  'modern hat',
  'modern short haircut',
  'modern hanfu cosplay',
  'cosplay costume',
  'TV drama screenshot',
  'film still',
  'specific actor likeness',
  'copied celebrity face',
  'studio portrait',
  'fashion photography',
  'front buttoned jacket',
  'mandarin collar jacket',
  'Tang suit',
  'changshan',
  'magua',
  'buttoned robe',
  'round skullcap',
  'modern Chinese formal jacket',
  'Republican era clothing',
  'western crown',
  'gold crown',
  'ornate crown',
  'royal crown',
  'king crown',
  'tall crown',
  'jeweled crown',
  'gem crown',
  'fantasy crown',
  'fire crown',
  'flame crown',
  'flaming headpiece',
  'horned crown',
  'horned helmet',
  'antler headpiece',
  'deer antlers',
  'feather crown',
  'feather headdress',
  'spiked crown',
  'spiked headpiece',
  'oversized ceremonial headdress',
  'face-shaped headdress',
  'fantasy headdress',
  'halo',
  'glowing ring',
  'flames behind head',
  'burning aura',
  'Christian cross',
  'cross pendant',
  'cross necklace',
  'religious cross symbol',
  'priest robe',
  'church clothing',
  'western medal',
  'round medallion necklace',
  'fantasy necklace',
  'fantasy shoulder armor',
  'oversized pauldrons',
  'glowing fantasy armor',
  'european medieval armor',
  'samurai armor',
  'kimono',
  'ninja outfit',
  'modern pen',
  'fountain pen',
  'office desk',
  'modern chair',
  'sunglasses',
  'text',
  'Chinese characters',
  'calligraphy',
  'inscription',
  'caption',
  'poster text',
  'written background',
  'scroll with writing',
  'book page text',
  'visible letters',
  'watermark',
  'logo',
  'anime chibi',
  'cartoon',
  'photo',
  'photograph',
  'camera photo',
  'photorealistic snapshot',
  'overly western fantasy armor',
  'copying a specific existing game character',
].join(', ');

const genderPositiveStyles = {
  male: [
    'Chinese man',
    'clearly male face',
    'masculine facial structure',
    'historically correct male hairstyle and headwear',
  ].join(', '),
  female: [
    'Chinese woman',
    'clearly female face',
    'dignified historically grounded female appearance',
    'historically correct bound-up hairstyle and restrained ornaments',
    'natural face without modern glamour makeup',
  ].join(', '),
};

const genderNegativeStyles = {
  male: [
    'female',
    'woman',
    'girl',
    'female warrior',
    'princess',
    'queen',
    'feminine face',
    'beauty portrait',
    'lipstick',
    'long eyelashes',
    'modern feminine makeup',
  ].join(', '),
  female: [
    'male',
    'man',
    'boy',
    'masculine jaw',
    'beard',
    'mustache',
    'goatee',
    'male topknot',
    'modern long loose hair',
    'modern glamour makeup',
    'heavy lipstick',
    'excessive blush',
    'sexualized costume',
    'revealing clothing',
  ].join(', '),
};

const avatarTypeStyles = {
  emperor: [
    'avatar type: Chinese state ruler or monarch',
    'dignified frontal authority',
    'formal period-correct ruler clothing and headwear',
    'restrained state symbols without fantasy ornaments',
  ].join(', '),
  general: [
    'avatar type: military commander',
    'period-correct Chinese armor or battlefield command robe',
    'historically correct campaign headwear',
    'disciplined martial bearing',
  ].join(', '),
  civil: [
    'avatar type: civil official, minister, scholar-official, strategist',
    'period-correct court robe, scholar robe, and formal headwear',
    'composed administrative and intellectual bearing',
  ].join(', '),
  other: [
    'avatar type: historical thinker, writer, artisan, rebel, religious, or cultural figure',
    'clothing and props appropriate to the exact historical identity',
    'distinct personality without modern or fantasy elements',
  ].join(', '),
};

const eraStyles = [
  {
    dynastyIds: ['qing'],
    match: ['清', '晚清', '后金', '乾隆', '嘉庆', '雍正', '咸丰', '光绪', '同治'],
    text: 'Qing dynasty visual culture, historically correct Manchu or Han Chinese dress according to identity, Qing court robe, official surcoat, rank badge, court necklace, Manchu queue hairstyle for adult men unless a monk or rebel, Qing emperors wear a dragon court robe and an imperial court hat with dark upturned fur brim, red silk tassel crown and small finial, officials wear rank-appropriate dark court hats, no western brimmed hat, no Ming winged official cap, no fantasy crown',
  },
  {
    dynastyIds: ['ming'],
    match: ['明', '明末', '嘉靖', '隆庆', '万历', '天启', '崇祯'],
    text: 'Ming dynasty visual culture, round-collar robe or cross-collar scholar robe according to office, winged black gauze official cap for senior civil officials, futou or tied hair for other men, Ming lamellar or brigandine armor for commanders, restrained red, blue, black, and gold textile details, no Qing queue, no Manchu hat',
  },
  {
    dynastyIds: ['yuan'],
    match: ['元', '蒙古帝国', '蒙古', '元朝前史', '元初', '元末'],
    text: 'Mongol-Yuan period visual culture, Mongol deel-like cross-over robe, fitted sleeves and waist sash for Mongol figures, Yuan court or scholar robe for Han officials, fur-trimmed campaign clothing and historically correct Mongol headwear when appropriate, practical steppe lamellar armor for commanders, no Qing queue, no modern Mongolian costume',
  },
  {
    dynastyIds: ['song-liao-jin-xixia'],
    match: ['辽', '契丹'],
    text: 'Liao dynasty Khitan visual culture, Khitan fitted riding robe or dual-administration court dress, shaved or braided Khitan hairstyle according to identity, fur and leather details, steppe lamellar armor for commanders, restrained nomadic aristocratic ornaments, no Qing hat, no modern ethnic costume',
  },
  {
    dynastyIds: ['song-liao-jin-xixia'],
    match: ['西夏'],
    text: 'Western Xia Tangut visual culture, Tangut court robe or practical northwestern riding dress according to identity, distinctive period headwear and partly shaved hairstyle where appropriate, compact lamellar armor for commanders, Tibetan, Central Asian, and Chinese influences kept historically restrained, no Qing costume',
  },
  {
    dynastyIds: ['song-liao-jin-xixia'],
    match: ['金', '女真', '灭辽灭北宋'],
    text: 'Jurchen Jin dynasty visual culture, Jurchen riding robe, braided or partly shaved hairstyle according to identity, fur-trimmed court garments and practical lamellar armor for commanders, Chinese-style official robe for civil administrators where appropriate, no Qing court hat, no modern costume',
  },
  {
    dynastyIds: ['song-liao-jin-xixia'],
    match: ['北宋', '南宋', '宋', '宋末'],
    text: 'Song dynasty visual culture, elegant round-collar official robe or cross-collar scholar robe, long-winged futou only for appropriate court officials, restrained silk colors and jade belt, lighter lamellar or brigandine armor for commanders, literati refinement without later Ming or Qing costume',
  },
  {
    dynastyIds: ['five-dynasties-ten-kingdoms'],
    match: ['五代十国', '五代', '十国', '后梁', '后唐', '后晋', '后汉', '后周', '南唐', '吴越', '后蜀'],
    text: 'Five Dynasties and Ten Kingdoms visual culture, late Tang to early Song court robe, practical military governor clothing, round-collar robe and futou for officials, lamellar armor and campaign cloak for commanders, regional court identity kept distinct, no Ming or Qing costume',
  },
  {
    dynastyIds: ['tang'],
    match: ['唐', '武周', '开元', '中唐', '晚唐'],
    text: 'Tang dynasty visual culture, round-collar robe and futou for male court figures, high-waisted ruqun, long shawl, and period-correct coiffure for elite women, broad cosmopolitan textile palette, Tang lamellar armor for commanders, restrained Central Asian influences where appropriate, no Song winged cap, no Ming or Qing costume',
  },
  {
    dynastyIds: ['sui'],
    match: ['隋', '隋末'],
    text: 'Sui dynasty visual culture, transitional Northern Dynasties to early Tang round-collar robe and futou, cross-collar layered court garments, practical lamellar armor for commanders, restrained red, dark green, ochre, and black palette, no later Song, Ming, or Qing costume',
  },
  {
    dynastyIds: ['southern-northern'],
    match: ['南北朝', '北魏', '东魏', '西魏', '北齐', '北周', '南朝宋', '南朝齐', '南朝梁', '南朝陈'],
    text: 'Northern and Southern Dynasties visual culture, cross-collar layered robe or early round-collar riding robe according to region, sinicized Xianbei court attire for northern figures, flowing scholar robe for southern literati, period lamellar armor for commanders, no Tang glamour styling, no Ming or Qing costume',
  },
  {
    dynastyIds: ['eastern-jin-sixteen'],
    match: ['东晋', '十六国', '前秦'],
    text: 'Eastern Jin and Sixteen Kingdoms visual culture, broad-sleeved cross-collar robe and gauze headwear for southern scholar-officials, practical northern riding dress and lamellar armor for frontier rulers and commanders, Wei-Jin restrained elegance, no Tang, Ming, or Qing costume',
  },
  {
    dynastyIds: ['western-jin'],
    match: ['西晋'],
    text: 'Western Jin visual culture, layered cross-collar court robe, broad sleeves, black gauze headwear or formal guan according to office, Wei-Jin scholar elegance, practical lamellar armor for commanders, no Tang, Ming, or Qing costume',
  },
  {
    dynastyIds: ['three-kingdoms'],
    match: ['三国', '曹魏', '蜀汉', '孙吴'],
    text: 'Three Kingdoms period visual culture, late Han cross-collar robe and military clothing, formal black headcloth or guan for officials, lamellar armor and command cloak for generals, sober red, black, brown, and indigo palette, no later Tang, Ming, or Qing costume',
  },
  {
    dynastyIds: ['eastern-han'],
    match: ['东汉', '新末'],
    text: 'Eastern Han visual culture, wrap-front cross-collar robe, layered shenyi, formal Han guan or headcloth according to office, lacquered lamellar armor for commanders, red-black court accents, no later Tang, Ming, or Qing costume',
  },
  {
    dynastyIds: ['xin'],
    match: ['新朝', '王莽'],
    text: 'Xin interregnum visual culture based on late Western Han court dress, cross-collar layered robe, formal Han guan, ritualist archaizing details, dark red and black accents, no later dynastic costume',
  },
  {
    dynastyIds: ['western-han'],
    match: ['西汉', '汉初', '吕后时期'],
    text: 'Western Han visual culture, wrap-front cross-collar robe and shenyi, belt-fastened layers, formal Han guan or headcloth according to office, lacquered lamellar armor for commanders, restrained black, red, blue, and bronze details, no later Tang, Ming, or Qing costume',
  },
  {
    match: ['春秋', '齐国', '晋国', '楚国', '吴国', '越国', '鲁国'],
    text: 'Spring and Autumn period Chinese attire, wrap-front cross-collar broad-sleeved shenyi, belt-fastened robe with no front buttons, early Zhou ritual aesthetics, bronze and jade ornaments, no Hanfu from later dynasties, no Qing or Ming clothing',
  },
  {
    dynastyIds: ['eastern-zhou'],
    match: ['战国', '战国秦', '魏国', '赵国', '韩国', '秦国'],
    text: 'Warring States period Chinese attire, wrap-front cross-collar deep robe, belt-fastened layers with no front buttons, leather and bronze lamellar armor for generals, dark lacquer and bronze details, no Qing or Ming clothing',
  },
  {
    dynastyIds: ['qin'],
    match: ['秦朝', '秦始皇', '秦二世', '秦亡前夕'],
    text: 'Qin dynasty visual style, black wrap-front cross-collar official robes with no front buttons, cinnabar trim, strict legalist court atmosphere, Qin armor with dark lacquered lamellar plates, no Qing hat, no mandarin jacket',
  },
  {
    dynastyIds: ['qin', 'western-han'],
    match: ['秦末楚汉', '秦末'],
    text: 'late Qin to early Han visual style, wrap-front cross-collar warlord robes, early Han court clothing, belt-fastened layers with no front buttons, restrained black, red, blue, and bronze details, no Qing or Ming clothing',
  },
  {
    dynastyIds: ['western-zhou'],
    match: ['西周', '周族'],
    text: 'Western Zhou visual culture, ritual cross-collar robe and skirt layers, broad sleeves, silk or hemp sash, sober guan headwear, bronze and jade ritual ornaments, early lamellar protection for warriors, no later imperial dragon robe, no Ming or Qing costume',
  },
  {
    dynastyIds: ['shang'],
    match: ['商', '殷'],
    text: 'Shang dynasty visual culture informed by oracle-bone and archaeological evidence, narrow-sleeved cross-collar or wrapped garment, knee-length robe with belt and lower garment, bronze, jade, leather, bone, and patterned textile details, tall but non-fantasy ritual headwear only for rulers, early leather and bronze protection for warriors, no later imperial costume',
  },
  {
    dynastyIds: ['xia'],
    match: ['夏', '传说时代'],
    text: 'legendary Xia and early Bronze Age visual reconstruction, archaeologically cautious Erlitou-era hemp and silk wrapped garments, simple belt, jade and turquoise ornaments for elites, leather protection and bronze weapon details for warriors, no later imperial crown or dragon robe, explicitly non-fantasy design',
  },
];

const femalePersonIds = new Set([
  'fu-hao',
  'wu-zetian',
  'cixi',
  'xiao-chuo',
  'li-qingzhao',
  'huang-daopo',
  'qiu-jin',
  'lu-zhi',
  'yang-guifei',
  'feng-taihou',
  'princess-taiping',
  'empress-wei',
  'empress-cian',
]);

function resolveGender(person, profile) {
  if (profile.gender) return profile.gender;
  const categoryText = (person.categories || []).join(' ');
  if (femalePersonIds.has(person.id) || /女性|女将|皇后|皇太后|太后|贵妃|公主|后妃/.test(categoryText)) {
    return 'female';
  }
  return 'male';
}

function resolveAvatarType(person, profile) {
  if (profile.avatarType) return profile.avatarType;
  const categories = person.categories || [];
  const categoryText = categories.join(' ');
  const isRuler = categories.some(category => (
    /帝王|君主|皇帝|霸主|霸王|蒙古大汗/.test(category)
    || /^(商王|周王|诸侯王)$/.test(category)
  ));
  if (isRuler) return 'emperor';
  if (/将领|女将|军事|统帅|霸王|边防/.test(categoryText)) return 'general';
  if (/丞相|宰辅|文官|政治|改革|制度|外交|纵横|谋士|法家/.test(categoryText)) return 'civil';
  return 'other';
}

function resolveEraStyle(person, profile) {
  if (profile.eraStyle) return profile.eraStyle;
  const text = [
    person.lifeText,
    (person.crossDynastyLabels || []).join(' '),
    (person.activePeriodLabels || []).join(' '),
    (person.categories || []).join(' '),
  ].join(' ');
  const found = eraStyles.find(item => item.match.some(keyword => text.indexOf(keyword) !== -1));
  if (found) return found.text;

  const dynastyIds = person.dynastyIds || [];
  const fallback = eraStyles.find(item => (
    item.dynastyIds
    && item.dynastyIds.length === 1
    && item.dynastyIds.some(id => dynastyIds.indexOf(id) !== -1)
  ));
  return fallback ? fallback.text : 'historically grounded pre-modern Chinese clothing matched to the person lifetime, region, ethnicity, social status, and public role';
}

function resolveAge(person, profile, gender) {
  if (profile.age) return profile.age;
  const categories = (person.categories || []).join(' ');
  if (/幼帝/.test(categories)) return gender === 'female' ? 'young adolescent girl ruler' : 'young adolescent boy ruler';
  if (/晚年|老年/.test(categories)) return gender === 'female' ? 'elder Chinese woman' : 'elder Chinese man';
  return gender === 'female' ? 'mature Chinese woman' : 'mature Chinese man';
}

function resolveRole(person, profile) {
  if (profile.role) return profile.role;
  const categories = (person.categories || []).slice(0, 3).join(', ');
  return categories ? `historical figure known as ${categories}` : 'historical figure from pre-modern China';
}

function resolveCostume(avatarType, gender) {
  const subject = gender === 'female' ? 'woman' : 'man';
  if (avatarType === 'emperor') return `period-correct formal ruler clothing fitted for a ${subject}`;
  if (avatarType === 'general') return `period-correct Chinese command clothing or armor fitted for a ${subject}`;
  if (avatarType === 'civil') return `period-correct court, official, or scholar clothing fitted for a ${subject}`;
  return `period-correct clothing fitted for the person's occupation, rank, region, and identity`;
}

function resolveEraNegative(person) {
  const text = [
    (person.dynastyIds || []).join(' '),
    (person.crossDynastyLabels || []).join(' '),
    (person.activePeriodLabels || []).join(' '),
  ].join(' ');
  if (/(^|\s)qing(\s|$)|清|晚清|后金/.test(text)) {
    return 'cowboy hat, fedora, western hat, white brimmed hat, modernized Qing costume, Republican era clothing, modern cheongsam, modern Tang suit, costume drama screenshot';
  }
  return 'Qing dynasty queue hairstyle, Qing dynasty mandarin hat, Manchu official hat, Qing court robe, modernized Qing costume';
}

const profiles = {
  'qi-huan-gong': {
    avatarType: 'emperor',
    role: 'early Spring and Autumn hegemon of Qi',
    age: 'middle-aged ruler',
    face: 'broad forehead, confident eyes, trimmed beard',
    costume: 'Spring and Autumn Qi ruler shenyi robe, dark blue silk with bronze edged collar, jade belt, high ceremonial guan crown',
    mood: 'commanding but pragmatic',
    props: 'alliance tally, subtle Qi state motif',
    palette: 'bronze, deep blue, muted gold',
  },
  'guan-zhong': {
    avatarType: 'civil',
    role: 'statesman and reformer of Qi',
    age: 'mature minister',
    face: 'wise eyes, composed face, short beard',
    costume: 'Spring and Autumn Qi minister robe, cross-collar layered shenyi, black gauze cap, restrained jade pendant',
    mood: 'calm, strategic, practical',
    props: 'bamboo slips and administrative tablets',
    palette: 'warm brown, deep green, ivory',
  },
  'jin-wen-gong': {
    avatarType: 'emperor',
    role: 'exiled prince turned Spring and Autumn hegemon',
    age: 'older noble ruler',
    face: 'weathered face, resolute gaze, dignified beard',
    costume: 'Spring and Autumn Jin ruler robe over travel-worn noble cloak, bronze belt hooks, formal guan crown',
    mood: 'patient, hardened by exile, authoritative',
    props: 'campaign cloak, bronze sword hilt',
    palette: 'dark red, black, antique gold',
  },
  'chu-zhuang-wang': {
    avatarType: 'emperor',
    role: 'ancient Chinese Chu state ruler, Spring and Autumn hegemon, not a fantasy king',
    age: 'mature warrior king',
    face: 'strong jaw, sharp eyes, trimmed beard',
    costume: 'Spring and Autumn Chu noble ruler robe with cloud and bird woven borders, bronze belt hooks, broad sleeves, simple topknot with a plain black rectangular guan cap, absolutely not wearing a crown, no gold crown, no horns, no feathers, no flaming headpiece',
    mood: 'ambitious, dignified, imposing',
    props: 'ritual bronze vessel, bamboo court screen, no fire aura',
    palette: 'dark crimson, bronze, jade green',
  },
  kongzi: {
    avatarType: 'other',
    role: 'Confucian thinker and educator',
    age: 'elder scholar',
    face: 'gentle but serious eyes, long beard, broad brow',
    costume: 'late Spring and Autumn Lu scholar robe, plain broad-sleeved shenyi, ritual sash, simple scholar guan',
    mood: 'benevolent, dignified, reflective',
    props: 'bamboo slips, ritual jade',
    palette: 'ivory, warm brown, muted blue',
  },
  laozi: {
    avatarType: 'other',
    role: 'Daoist sage, legendary philosopher',
    age: 'elder sage',
    face: 'deep-set eyes, long white beard, serene expression',
    costume: 'late Zhou archivist-sage robe, undyed hemp and gray green layered robe, loosely tied topknot with simple wooden hairpin',
    mood: 'quiet, mysterious, detached from power',
    props: 'ancient scroll, misty pass background hint',
    palette: 'gray green, linen white, soft gold',
  },
  'sun-wu': {
    avatarType: 'general',
    role: 'military strategist and authorial figure of the Art of War',
    age: 'middle-aged male strategist',
    face: 'sharp eyes, lean masculine face, short beard and mustache, disciplined expression',
    costume: 'Wu state commander robe with light leather lamellar armor, narrow sleeves for campaign command, tied topknot and bronze belt',
    mood: 'calm, calculating, restrained',
    props: 'bamboo military treatise, map lines',
    palette: 'black, muted red, sand',
  },
  goujian: {
    avatarType: 'emperor',
    role: 'king of Yue, revenge and restoration figure',
    age: 'middle-aged male ruler',
    face: 'lean masculine face, intense eyes, thin mustache and short beard, restrained bitterness',
    costume: 'Yue royal robe with austere cross-collar layers, southern bronze ornament, hidden light armor under coarse cloak',
    mood: 'patient, resilient, vengeful determination',
    props: 'rough wooden texture, hidden sword',
    palette: 'dark teal, earth brown, cold silver',
  },
  'wei-wen-hou': {
    avatarType: 'emperor',
    role: 'early Warring States ruler of Wei, patron of reform',
    age: 'middle-aged male ruler',
    face: 'clear eyes, composed masculine rulerly face, trimmed mustache and short beard',
    costume: 'Warring States Wei ruler robe, geometric woven borders, sober flat guan cap, jade and bronze belt fittings, no spiked crown',
    mood: 'rational, talent-seeking, reform-minded',
    props: 'ministerial tablets, state map',
    palette: 'deep purple, bronze, ivory',
  },
  'qin-xiao-gong': {
    avatarType: 'emperor',
    role: 'ancient Chinese Qin state ruler, patron of Shang Yang reform, not a fantasy king',
    age: 'young to middle-aged ruler',
    face: 'focused gaze, firm mouth, neatly trimmed beard',
    costume: 'Warring States Qin ruler robe, black deep garment with cinnabar trim, plain austere flat guan cap and jade belt, absolutely no crown, no horns, no flame crown, no glowing aura',
    mood: 'determined, ambitious, reformist',
    props: 'Qin state banner, legal tablets',
    palette: 'black, cinnabar red, bronze',
  },
  'shang-yang': {
    avatarType: 'civil',
    role: 'Legalist reformer of Qin',
    age: 'middle-aged male minister',
    face: 'thin masculine face, piercing eyes, trimmed mustache and goatee, severe expression',
    costume: 'austere Warring States Qin minister robe, black cross-collar layers, dark legal official cap, bronze tablet cord',
    mood: 'unyielding, precise, severe',
    props: 'law tablets, measuring rod',
    palette: 'black, dark red, cold bronze',
  },
  mengzi: {
    avatarType: 'other',
    role: 'Confucian philosopher advocating benevolent government',
    age: 'elder scholar',
    face: 'upright expression, warm eyes, full beard',
    costume: 'Warring States Confucian scholar robe, layered cross-collar shenyi, cloth belt and modest guan',
    mood: 'righteous, eloquent, morally confident',
    props: 'bamboo slips, lecture hall hint',
    palette: 'warm ivory, brown, muted green',
  },
  zhuangzi: {
    avatarType: 'other',
    role: 'Daoist philosopher and literary master',
    age: 'middle-aged to elder thinker',
    face: 'relaxed eyes, faint smile, free-flowing beard',
    costume: 'Warring States plain robe with loose broad sleeves, simple hemp texture, loosely tied topknot',
    mood: 'free, detached, imaginative',
    props: 'butterfly motif, flowing clouds',
    palette: 'mist blue, gray, pale gold',
  },
  'qu-yuan': {
    avatarType: 'other',
    role: 'Chu poet and loyal statesman',
    age: 'middle-aged male noble poet',
    face: 'melancholic eyes, refined masculine face, thin mustache, solemn expression',
    costume: 'Warring States Chu aristocratic robe with orchid, cloud, and bird motifs, long sash, elegant Chu headwear',
    mood: 'loyal, sorrowful, idealistic',
    props: 'orchid motif, river mist, scroll',
    palette: 'deep violet, jade, white',
  },
  'qin-zhao-xiang-wang': {
    avatarType: 'emperor',
    role: 'ancient Chinese Qin state ruler, long-reigning Warring States ruler, not a fantasy king',
    age: 'elder Qin ruler',
    face: 'aged but forceful eyes, severe rulerly face, trimmed gray beard',
    costume: 'Warring States Qin noble ruler black deep robe, cinnabar trim, plain black rectangular guan cap, jade belt and bronze court tablet, absolutely not wearing a crown, no gold crown, no spiked crown, no fantasy armor',
    mood: 'calculating, patient, expansionist, formidable',
    props: 'Qin war map, dark lacquer throne, distant campaign banners',
    palette: 'black, cinnabar, old bronze, muted gold',
  },
  'bai-qi': {
    avatarType: 'general',
    role: 'Qin general, formidable Warring States commander',
    age: 'mature general',
    face: 'cold eyes, stern face, battle-worn features',
    costume: 'Warring States Qin black lacquered lamellar armor, cinnabar command cloak, bronze helmet and Qin command baton',
    mood: 'ruthless, disciplined, intimidating',
    props: 'battlefield smoke, command baton',
    palette: 'black, iron gray, blood red',
  },
  'gong-sun-xi': {
    avatarType: 'general',
    role: 'Wei general and allied commander at the Battle of Yique',
    age: 'mature Warring States general',
    face: 'tense eyes, proud but pressured expression, short beard',
    costume: 'Warring States Wei general armor, bronze and leather lamellar plates, dark red campaign cloak, formal warrior topknot',
    mood: 'strained, defensive, caught in coalition pressure',
    props: 'Han-Wei coalition banner fragments, mountain pass battlefield hint',
    palette: 'bronze, dark red, dusty brown',
  },
  'bao-yuan': {
    avatarType: 'general',
    role: 'Han general associated with the Battle of Yique',
    age: 'middle-aged Warring States commander',
    face: 'watchful eyes, lean face, restrained anxiety, short mustache',
    costume: 'Warring States Han field armor, muted brown leather lamellar pieces, narrow-sleeved robe, simple bronze helmet',
    mood: 'cautious, pressured, alert',
    props: 'Korean state banner, defensive war drums, pass terrain',
    palette: 'brown, bronze, muted green',
  },
  'chu-qing-xiang-wang': {
    avatarType: 'emperor',
    role: 'King Qingxiang of Chu during Qin pressure',
    age: 'middle-aged Chu ruler',
    face: 'worried royal face, refined features, tired eyes, trimmed beard',
    costume: 'Warring States Chu royal robe with cloud and phoenix patterns, jade sash, tall Chu-style ceremonial crown',
    mood: 'anxious, aristocratic, politically constrained',
    props: 'shadow of burning Ying capital, Chu court curtain, orchid motif',
    palette: 'deep violet, jade green, ash gold',
  },
  'mang-mao': {
    avatarType: 'general',
    role: 'Wei general at the Battle of Huayang',
    age: 'mature Warring States general',
    face: 'rugged face, wary eyes, thick short beard',
    costume: 'Warring States Wei armor, bronze lamellar plates over crimson-brown robe, campaign helmet',
    mood: 'hard-pressed, defiant, battlefield wary',
    props: 'Huayang battlefield dust, broken Wei banner',
    palette: 'bronze, crimson brown, dust gray',
  },
  'jia-yan': {
    avatarType: 'general',
    role: 'Zhao general linked to the Battle of Huayang',
    age: 'middle-aged Zhao commander',
    face: 'stern eyes, weathered cheeks, short beard',
    costume: 'Warring States Zhao field armor, green-brown lamellar plates, cavalry cloak, tied topknot',
    mood: 'determined, tense, exposed to Qin pressure',
    props: 'riverbank battlefield hint, Zhao war flag',
    palette: 'dark green, leather brown, iron gray',
  },
  'lian-po': {
    avatarType: 'general',
    role: 'veteran Zhao general',
    age: 'elder warrior',
    face: 'rugged face, thick beard, proud eyes',
    costume: 'Warring States Zhao veteran armor, worn leather and bronze lamellar plates, campaign cloak, tied warrior topknot',
    mood: 'brave, blunt, loyal',
    props: 'heavy spear, campaign cloak',
    palette: 'dark green, bronze, leather brown',
  },
  'zhao-kuo': {
    avatarType: 'general',
    role: 'Zhao general at the Battle of Changping, son of Zhao She',
    age: 'young Warring States general',
    face: 'confident young face, intense eyes, slightly inexperienced expression, neat mustache',
    costume: 'Warring States Zhao commander armor, polished lamellar plates, scholar-like inner robe, fresh campaign cloak',
    mood: 'overconfident, theoretical, pressured by command',
    props: 'bamboo military slips beside battlefield map, surrounded valley hint',
    palette: 'dark green, bronze, pale ivory',
  },
  'wang-he': {
    avatarType: 'general',
    role: 'Qin general in the early phase of the Battle of Changping',
    age: 'mature Qin field commander',
    face: 'hard eyes, square jaw, disciplined expression, short beard',
    costume: 'Warring States Qin black lamellar armor, practical campaign helmet, cinnabar command sash',
    mood: 'disciplined, aggressive, professional',
    props: 'Qin camp fortifications, war map of Shangdang',
    palette: 'black, iron gray, cinnabar',
  },
  'lin-xiangru': {
    avatarType: 'civil',
    role: 'Zhao diplomat and statesman',
    age: 'mature court minister',
    face: 'intelligent eyes, calm face, refined beard',
    costume: 'Warring States Zhao court minister robe, cross-collar silk, formal cap, jade bi ornament held with both hands',
    mood: 'composed, courageous, tactful',
    props: 'jade bi disc, diplomatic tablet',
    palette: 'ivory, teal, gold',
  },
  xunzi: {
    avatarType: 'other',
    role: 'late Warring States Confucian philosopher',
    age: 'elder scholar',
    face: 'serious eyes, scholarly beard, analytical expression',
    costume: 'late Warring States scholar robe, dark collar over ivory layers, teacher cap, ritual tablet',
    mood: 'rational, strict, learned',
    props: 'bamboo slips, ritual vessel',
    palette: 'dark brown, ivory, muted blue',
  },
  'han-fei': {
    avatarType: 'civil',
    role: 'Legalist philosopher, prince of Han',
    age: 'young to middle-aged noble thinker',
    face: 'pale refined face, intense inward gaze',
    costume: 'Warring States Han noble robe with restrained ornament, dark scholar-official cap, narrow court sash',
    mood: 'brilliant, isolated, tragic',
    props: 'legalist manuscript, shadowed court background',
    palette: 'dark violet, black, pale gold',
  },
  'su-qin': {
    avatarType: 'civil',
    role: 'strategist of vertical alliance diplomacy',
    age: 'middle-aged male diplomat',
    face: 'alert eyes, persuasive expression, narrow masculine face, trimmed mustache',
    costume: 'Warring States travelling strategist robe, layered cloak, diplomatic sash with multiple seal cords',
    mood: 'eloquent, ambitious, restless',
    props: 'rolled maps, seals from many states',
    palette: 'brown, indigo, bronze',
  },
  'zhang-yi': {
    avatarType: 'civil',
    role: 'Qin diplomat and horizontal alliance strategist',
    age: 'middle-aged male diplomat',
    face: 'sharp smile, calculating eyes, angular masculine face, short goatee',
    costume: 'Warring States Qin court robe with black-red trim, travelling cloak, formal diplomatic cap',
    mood: 'clever, persuasive, opportunistic',
    props: 'state map, negotiation slips',
    palette: 'black, red, antique gold',
  },
  'qin-shi-huang': {
    avatarType: 'emperor',
    role: 'Qin imperial ruler, unifier of China, ancient Chinese monarch, not a fantasy king',
    age: 'middle-aged emperor',
    face: 'commanding eyes, stern imperial face, trimmed beard',
    costume: 'Qin imperial black mianfu-inspired robe, restrained cinnabar and gold accents, flat mian-style ritual cap with short jade bead strings, no fantasy crown',
    mood: 'majestic, controlling, visionary',
    props: 'imperial jade seal, dragon motif, unified empire map',
    palette: 'black, cinnabar, gold',
  },
  'qin-er-shi': {
    avatarType: 'emperor',
    role: 'second Qin imperial ruler, tragic weak ruler, ancient Chinese monarch, not a fantasy king',
    age: 'young emperor',
    face: 'soft face, anxious eyes, uncertain expression',
    costume: 'Qin imperial black robe too heavy for a young ruler, cinnabar trim, formal flat guan cap slightly shadowing his face',
    mood: 'insecure, dependent, trapped by court politics',
    props: 'dark palace curtain, faint imperial seal',
    palette: 'black, dull gold, deep red',
  },
  'zi-ying': {
    avatarType: 'emperor',
    role: 'last Qin state ruler, ancient Chinese royal figure, not a fantasy king',
    age: 'young to middle-aged male royal figure',
    face: 'tired eyes, masculine face, faint mustache, resolute but doomed expression',
    costume: 'simplified late Qin noble robe, black layers with reduced ornaments, simple topknot with plain black court guan cap, absolutely not wearing a crown, no gold crown, no horns, no ornate fantasy headwear',
    mood: 'desperate, sober, last-stand dignity',
    props: 'broken court tablet, dim palace light',
    palette: 'charcoal, muted red, ash gold',
  },
  'li-si': {
    avatarType: 'civil',
    role: 'Qin chancellor and system architect',
    age: 'elder minister',
    face: 'keen eyes, refined face, controlled expression',
    costume: 'Qin high minister robe, black official cap, cinnabar document cords, jade tablet held before chest',
    mood: 'intelligent, pragmatic, burdened by ambition',
    props: 'standard script tablets, administrative documents',
    palette: 'black, ivory, dark red',
  },
  'zhao-gao': {
    avatarType: 'civil',
    role: 'Qin court power broker and manipulative minister',
    age: 'older male court official, about fifty years old',
    face: 'angular masculine narrow face, visible wrinkles, thin mustache and short goatee, no makeup, controlled cold smile, pale severe face',
    costume: 'dark Qin palace official robe, close-fitting black formal cap, narrow sleeves, hidden edict tube at waist',
    mood: 'calculating, secretive, dangerous',
    props: 'imperial edict scroll, shadowed deer silhouette hint',
    palette: 'black, cold gray, crimson',
  },
  'meng-tian': {
    avatarType: 'general',
    role: 'Qin frontier general and Great Wall commander',
    age: 'mature general',
    face: 'firm eyes, loyal expression, weathered skin',
    costume: 'Qin frontier black lamellar armor, fur-lined northern cloak, bronze helmet, wind-worn command sash',
    mood: 'disciplined, loyal, vigilant',
    props: 'northern frontier wall, command spear',
    palette: 'black armor, sand, iron gray',
  },
  'wang-jian': {
    avatarType: 'general',
    role: 'veteran Qin general of the unification wars',
    age: 'elder general',
    face: 'aged but sharp eyes, gray beard, composed face',
    costume: 'ornate Warring States Qin general armor, black lacquered lamellar plates, dark cloak, bronze command helmet',
    mood: 'cautious, experienced, authoritative',
    props: 'campaign map, bronze sword',
    palette: 'black, bronze, deep red',
  },
  'wang-ben': {
    avatarType: 'general',
    role: 'Qin general, son of Wang Jian',
    age: 'mature general',
    face: 'confident eyes, strong jaw, neat beard',
    costume: 'Warring States Qin general armor, lighter field lamellar plates than elder commander, red-black campaign cloak',
    mood: 'decisive, energetic, martial',
    props: 'siege map, Qin banner',
    palette: 'black, bronze, muted crimson',
  },
  'zhang-han': {
    avatarType: 'general',
    role: 'late Qin general facing rebellion',
    age: 'mature commander',
    face: 'tired eyes, tense expression, battle-worn face',
    costume: 'late Qin practical field armor with dust and scratches, black lamellar plates, emergency command cloak',
    mood: 'burdened, capable, under pressure',
    props: 'broken battlefield standard, prison conscript hint',
    palette: 'iron gray, black, dusty brown',
  },
  'chen-sheng': {
    avatarType: 'other',
    role: 'peasant uprising leader of late Qin',
    age: 'young to middle-aged rebel leader',
    face: 'rough face, fiery eyes, unpolished beard',
    costume: 'late Qin conscript clothing, rough cloth robe, simple leather armor pieces, rebel cloak and plain head wrap',
    mood: 'defiant, charismatic, urgent',
    props: 'raised banner, stormy rural background',
    palette: 'earth brown, red, dark green',
  },
  'wu-guang': {
    avatarType: 'other',
    role: 'co-leader of the Daze Village uprising',
    age: 'young to middle-aged male rebel leader',
    face: 'determined eyes, rugged masculine features, rough beard stubble',
    costume: 'late Qin conscript clothing, rough cloth robe, simple leather armor pieces, plain head wrap, no modern jacket',
    mood: 'brave, tense, rebellious',
    props: 'rain-soaked road, rebel spear',
    palette: 'brown, gray, muted red',
  },
  'xiang-yu': {
    avatarType: 'general',
    role: 'Western Chu Hegemon King, mighty warrior commander',
    age: 'young heroic warlord',
    face: 'bold eyes, heroic face, intense expression',
    costume: 'late Qin Chu warlord armor, strong but practical lamellar plates, crimson cloak, Chu-style military headwrap or simple helmet, no fantasy shoulder armor',
    mood: 'proud, fierce, tragic grandeur',
    props: 'halberd, Chu banner, smoky battlefield without flames behind head',
    palette: 'crimson, black, burnished gold',
  },
  'liu-bang': {
    avatarType: 'emperor',
    role: 'founder of Han, pragmatic rebel leader and ancient Chinese ruler, not a fantasy king',
    age: 'middle-aged ruler',
    face: 'approachable but shrewd eyes, relaxed beard',
    costume: 'late Qin to early Han ruler robe, simple battlefield cloak over dark blue cross-collar court layers, plain sword belt, sober guan cap',
    mood: 'practical, adaptable, confident',
    props: 'plain sword, Han banner, warm camp light',
    palette: 'dark blue, red, warm gold',
  },
  'xiao-he': {
    avatarType: 'civil',
    role: 'Han administrator and logistics statesman',
    age: 'mature minister',
    face: 'steady eyes, careful expression, neat beard',
    costume: 'early Han minister robe, dark blue cross-collar layers, official cap, orderly bamboo and silk documents',
    mood: 'reliable, meticulous, calm',
    props: 'grain records, administrative scrolls',
    palette: 'navy, ivory, warm brown',
  },
  'zhang-liang': {
    avatarType: 'civil',
    role: 'Han strategist and refined advisor',
    age: 'young to middle-aged male strategist',
    face: 'clear eyes, elegant but masculine features, faint mustache and short goatee, thoughtful expression',
    costume: 'late Qin to early Han refined strategist robe, light cloak, scholar cap, discreet jade pendant',
    mood: 'calm, subtle, farsighted',
    props: 'strategy slips, moonlit tent background',
    palette: 'pale blue, ivory, dark gray',
  },
  'han-xin': {
    avatarType: 'general',
    role: 'Han military genius and great general',
    age: 'young to middle-aged general',
    face: 'sharp eyes, proud expression, lean face',
    costume: 'early Han general armor, blue-black lamellar plates, red command sash, campaign helmet or tied topknot',
    mood: 'brilliant, ambitious, lonely',
    props: 'battle map, command flag',
    palette: 'dark blue, steel gray, red accent',
  },
  'fu-hao': {
    gender: 'female',
    avatarType: 'general',
    role: 'Shang royal consort, military commander, and ritual leader known from oracle bones',
    age: 'middle-aged Shang dynasty Chinese woman commander with fully covered shoulders',
    face: 'firm broad-browed mature face, focused eyes, weathered natural complexion, no glamour makeup',
    costume: 'archaeologically grounded Shang elite long-sleeved wrapped garment under compact leather and bronze protection, fully covered shoulders and chest, jade belt ornaments, tightly bound braided hair with one small plain jade hairpiece, no circular headdress, no halo, no oversized ornament',
    mood: 'commanding, disciplined, ritually solemn',
    props: 'small bronze battle-axe head and oracle-bone ritual motif, no modern shoulder strap',
    palette: 'dark brown, bronze, muted jade green, bone white',
  },
  'wu-zetian': {
    gender: 'female',
    avatarType: 'emperor',
    role: 'sole female emperor of the Wu Zhou dynasty',
    age: 'middle-aged Chinese woman sovereign',
    face: 'mature authoritative face, steady eyes, restrained natural makeup',
    costume: 'formal Tang and Wu Zhou imperial female robe with layered high-waisted structure, dark red and gold woven borders, high bound court coiffure with a few small gold hairpins, no circular crown, no halo, no fan-shaped headdress',
    mood: 'formidable, controlled, politically confident',
    props: 'plain imperial seal and court screen, no weapon',
    palette: 'deep red, black, muted gold, ivory',
  },
  cixi: {
    gender: 'female',
    avatarType: 'civil',
    role: 'elder Qing empress dowager and late Qing political ruler',
    age: 'elderly Manchu Chinese woman about sixty-five years old, clearly aged and not youthful',
    face: 'older oval face with visible wrinkles and age lines, firm watchful eyes, restrained court makeup, clearly elderly',
    costume: 'late Qing Manchu empress dowager formal dark blue court robe with restrained gold dragon roundels, court necklace, black liangbatou winged coiffure with small flowers and jade ornaments, no gold crown, no loose hair',
    mood: 'composed, calculating, accustomed to authority',
    props: 'folded court memorial held at the waist, palace screen without text',
    palette: 'dark blue, black, muted gold, jade green',
  },
  'xiao-chuo': {
    gender: 'female',
    avatarType: 'emperor',
    role: 'Khitan Liao empress dowager, regent, military and diplomatic decision-maker',
    age: 'mature Khitan woman ruler',
    face: 'strong mature face, direct eyes, natural complexion',
    costume: 'Liao Khitan fitted riding court robe over light lamellar protection, fur-edged collar, practical bound-up hair under a small dark Khitan court cap, no Chinese fantasy crown',
    mood: 'decisive, energetic, politically assured',
    props: 'rolled frontier map and compact command baton',
    palette: 'dark red, charcoal, leather brown, old gold',
  },
  'li-qingzhao': {
    gender: 'female',
    avatarType: 'other',
    role: 'Song dynasty poet and scholar',
    age: 'middle-aged Song dynasty Chinese woman scholar',
    face: 'intelligent mature face, reflective eyes, natural restrained appearance',
    costume: 'Song dynasty cross-collar scholar robe with narrow inner layers and broad outer sleeves, simple high bound coiffure with one modest hairpin, no imperial headdress',
    mood: 'sensitive, learned, resilient after displacement',
    props: 'closed book and one unmarked bronze vessel, no visible writing',
    palette: 'muted blue, pale gray, ivory, soft brown',
  },
  'huang-daopo': {
    gender: 'female',
    avatarType: 'other',
    role: 'Song-Yuan cotton textile artisan and technology transmitter',
    age: 'very elderly working Chinese grandmother artisan about seventy-five years old, clearly aged and not youthful',
    face: 'deeply weathered old face with visible wrinkles and age lines, capable hands, warm determined eyes, no makeup',
    costume: 'plain Yuan-period working woman cross-collar robe with tightly bound sleeves, dark cloth head wrap, simple apron and no jewelry',
    mood: 'practical, patient, inventive',
    props: 'wooden spindle and cotton fiber, workshop hint without text',
    palette: 'indigo, hemp gray, cotton white, wood brown',
  },
  'qiu-jin': {
    gender: 'female',
    avatarType: 'other',
    role: 'late Qing revolutionary, writer, and advocate for women education',
    age: 'young adult Chinese woman revolutionary',
    face: 'resolute natural face, sharp courageous eyes, no glamour makeup',
    costume: 'late Qing practical dark scholar jacket and long robe influenced by period reformist menswear, neat bound-up hair, no imperial ornaments, no modern military uniform',
    mood: 'fearless, idealistic, disciplined',
    props: 'sheathed short sword and closed unmarked notebook',
    palette: 'black, white, muted red, steel gray',
  },
  'lu-zhi': {
    gender: 'female',
    avatarType: 'civil',
    role: 'founding Han empress and powerful empress dowager',
    age: 'mature to elder Han dynasty Chinese woman ruler',
    face: 'mature stern face, controlled expression, watchful eyes',
    costume: 'early Western Han empress dowager dark cross-collar court robe with red woven borders, high bound coiffure with restrained jade hairpins, no fantasy crown',
    mood: 'unyielding, politically vigilant, authoritative',
    props: 'plain court tablet and dark palace screen',
    palette: 'black, dark red, ivory, jade',
  },
  'yang-guifei': {
    gender: 'female',
    avatarType: 'other',
    role: 'Tang imperial consort and cultural symbol of the High Tang court',
    age: 'young adult Tang dynasty Chinese woman court consort',
    face: 'full oval face following Tang beauty ideals, calm eyes, restrained period makeup',
    costume: 'High Tang high-waisted ruqun with layered silk shawl, full court coiffure with several small floral pins, no crown, no revealing neckline, no fantasy jewelry',
    mood: 'graceful, self-possessed, faintly melancholy',
    props: 'single peony branch and palace balustrade hint',
    palette: 'crimson, pale green, ivory, muted gold',
  },
  'feng-taihou': {
    gender: 'female',
    avatarType: 'civil',
    role: 'Northern Wei empress dowager and regent associated with state reforms',
    age: 'mature Northern Wei Chinese woman regent',
    face: 'mature forceful face, analytical eyes, restrained natural makeup',
    costume: 'sinicized Northern Wei female court robe with layered cross-collar structure, high bound coiffure under a small formal court ornament, no oversized crown',
    mood: 'disciplined, reform-minded, politically commanding',
    props: 'closed administrative register and court tablet',
    palette: 'dark green, maroon, black, old gold',
  },
  'princess-taiping': {
    gender: 'female',
    avatarType: 'civil',
    role: 'Tang imperial princess and court power broker',
    age: 'middle-aged Tang dynasty Chinese woman aristocrat',
    face: 'mature confident face, alert eyes, restrained court makeup',
    costume: 'late Tang and Wu Zhou aristocratic female robe with high-waisted skirt and formal outer layer, high bound coiffure with modest gold hairpins, no imperial crown',
    mood: 'ambitious, charismatic, politically alert',
    props: 'folded court dispatch and palace corridor hint',
    palette: 'deep green, dark red, ivory, muted gold',
  },
  'empress-wei': {
    gender: 'female',
    avatarType: 'civil',
    role: 'Tang empress and central actor in Zhongzong court politics',
    age: 'middle-aged Tang dynasty Chinese woman empress',
    face: 'mature aristocratic face, guarded eyes, restrained court makeup',
    costume: 'late Tang formal empress robe with layered silk and sober woven borders, high bound court coiffure with small gold and jade pins, no fantasy crown',
    mood: 'confident, guarded, politically ambitious',
    props: 'closed edict case and palace curtain',
    palette: 'dark crimson, black, muted gold, jade',
  },
  'empress-cian': {
    gender: 'female',
    avatarType: 'civil',
    role: 'Qing empress dowager and co-regent during the Tongzhi reign',
    age: 'mature Manchu Chinese woman in her forties',
    face: 'mature composed face, calm observant eyes, restrained court makeup',
    costume: 'Qing Manchu empress dowager formal blue court robe, court necklace, black liangbatou winged coiffure with a few restrained floral and jade ornaments, no gold crown',
    mood: 'reserved, dignified, cautious in court politics',
    props: 'plain folded memorial and quiet palace screen',
    palette: 'royal blue, black, ivory, jade green',
  },
};

function buildPositivePrompt(person) {
  const profile = profiles[person.id] || {};
  const avatarType = resolveAvatarType(person, profile);
  const gender = resolveGender(person, profile);
  return [
    person.name,
    resolveRole(person, profile),
    resolveAge(person, profile, gender),
    genderPositiveStyles[gender],
    avatarTypeStyles[avatarType],
    resolveEraStyle(person, profile),
    profile.face,
    profile.costume || resolveCostume(avatarType, gender),
    profile.mood,
    profile.props,
    profile.palette ? `color palette: ${profile.palette}` : '',
    commonPositive,
  ].filter(Boolean).join(', ');
}

function buildGenerationPrompt(person) {
  const profile = profiles[person.id] || {};
  const avatarType = resolveAvatarType(person, profile);
  const gender = resolveGender(person, profile);
  const age = resolveAge(person, profile, gender);
  const role = resolveRole(person, profile);
  const costume = profile.costume || resolveCostume(avatarType, gender);
  return [
    `historically grounded portrait of ${person.name}, ${age}, ${role}`,
    resolveEraStyle(person, profile),
    genderPositiveStyles[gender],
    avatarTypeStyles[avatarType],
    profile.face,
    `wearing ${costume}`,
    profile.mood,
    profile.props,
    'strategy game character portrait',
    'recognizable public visual traits informed by classic historical screen portrayals, original non-actor face',
    'painterly digital painting',
    'concept art',
    'dramatic lighting',
    'detailed face',
    'Chinese jade belt hook or simple belt ornament only, no cross, no religious symbol, no fantasy crown, no horns, no halo',
    'plain neutral painterly background without text, calligraphy, flames, or glowing ring',
    'upper body',
  ].filter(Boolean).join(', ');
}

function buildNegativePrompt(person) {
  const profile = profiles[person.id] || {};
  const gender = resolveGender(person, profile);
  return [
    genderNegativeStyles[gender],
    resolveEraNegative(person),
    commonNegative,
  ].filter(Boolean).join(', ');
}

function getAvatarProfile(person) {
  const profile = profiles[person.id] || {};
  const type = resolveAvatarType(person, profile);
  const gender = resolveGender(person, profile);
  return {
    ...profile,
    type,
    gender,
    eraStyle: resolveEraStyle(person, profile),
    path: `/assets/avatars/${person.id}.jpg`,
    positive: buildPositivePrompt(person),
    generation: buildGenerationPrompt(person),
    negative: buildNegativePrompt(person),
  };
}

module.exports = {
  profiles,
  getAvatarProfile,
  resolveGender,
  commonPositive,
  commonNegative,
};
