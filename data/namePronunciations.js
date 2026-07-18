const { RARE_CHARACTER_PRONUNCIATIONS } = require('./rareNameCharacters');

const NAME_PRONUNCIATIONS = {
  '嬴稷': 'yíng jì',
  '鲧': 'gǔn',
  '寒浞': 'zhuó',
  '契': 'xiè',
  '仲虺': 'huǐ',
  '召公奭': 'shì',
  '虢石父': 'guó',
  '褒姒': 'sì',
  '祭仲': 'zhài',
  '淳于髡': 'kūn',
  '先轸': 'zhěn',
  '伯嚭': 'pǐ',
  '范蠡': 'lǐ',
  '蹇叔': 'jiǎn',
  '樗里疾': 'chū',
  '范雎': 'jū',
  '郦食其': 'lì yì jī',
  '枚乘': 'shèng',
  '汲黯': 'jí àn',
  '耿弇': 'gěng yǎn',
  '荀彧': 'xún yù',
  '贾诩': 'xǔ',
  '钟繇': 'yáo',
  '马谡': 'sù',
  '步骘': 'zhì',
  '费祎': 'yī',
  '卫瓘': 'guàn',
  '皇甫谧': 'mì',
  '郗鉴': 'xī jiàn',
  '慕容皝': 'huàng',
  '拓跋焘': 'tāo',
  '祖暅': 'gèng',
  '萧衍': 'yǎn',
  '高颎': 'jiǒng',
  '贺若弼': 'bì',
  '翟让': 'zhái',
  '褚遂良': 'chǔ',
  '李勣': 'jì',
  '尉迟敬德': 'yù chí',
  '岑参': 'cén shēn',
  '元稹': 'zhěn',
  '李愬': 'sù',
  '李昪': 'biàn',
  '刘䶮': 'yǎn',
  '种师道': 'chóng',
  '刘锜': 'qí',
  '吴玠': 'jiè',
  '萨都剌': 'là',
  '朱载堉': 'yù',
  '郑燮': 'xiè',
  '朱耷': 'dā',
  '耆英': 'qí',
  '翁同龢': 'hé',
  '噶尔丹': 'gá',
};

function splitDisplayName(value) {
  const name = String(value || '');
  const index = name.indexOf('（');
  return index === -1
    ? { baseName: name, suffix: '' }
    : { baseName: name.slice(0, index), suffix: name.slice(index) };
}

function formatHistoricalName(value) {
  const { baseName, suffix } = splitDisplayName(value);
  const pronunciation = getNamePronunciation(baseName);
  if (!pronunciation) return String(value || '');
  if (suffix.indexOf(`（${pronunciation}`) === 0) return String(value || '');
  const titleMatch = suffix.match(/^（([^）]+)）$/);
  if (titleMatch) return `${baseName}（${pronunciation}，${titleMatch[1]}）`;
  return `${baseName}（${pronunciation}）${suffix}`;
}

function getNamePronunciation(value) {
  const { baseName } = splitDisplayName(value);
  if (NAME_PRONUNCIATIONS[baseName]) return NAME_PRONUNCIATIONS[baseName];
  return Array.from(baseName)
    .map(character => RARE_CHARACTER_PRONUNCIATIONS[character])
    .filter(Boolean)
    .join(' ');
}

module.exports = {
  NAME_PRONUNCIATIONS,
  formatHistoricalName,
  getNamePronunciation,
};
