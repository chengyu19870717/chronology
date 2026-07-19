const fs = require('fs');
const path = require('path');
const { pinyin } = require('pinyin-pro');
const knowledge = require('../data/historyKnowledge');
const curriculum = require('../data/curriculumIndex');
const { NAME_PRONUNCIATIONS } = require('../data/namePronunciations');
const { RARE_CHARACTER_PRONUNCIATIONS } = require('../data/rareNameCharacters');

const outputPath = path.resolve(__dirname, '../data/pinyinIndex.js');

function normalizeIdentity(value) {
  return String(value || '').replace(/（.*?）/g, '').replace(/[·\s]/g, '');
}

function withoutTone(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/gi, '')
    .toLowerCase();
}

function cleanVariant(value) {
  return String(value || '')
    .replace(/（[^）]*）/g, '')
    .replace(/[^\u3400-\u9fff]/g, '');
}

function expandVariants(value) {
  const text = String(value || '');
  const variants = [text];
  const titleMatch = text.match(/（([^）]+)）/);
  if (titleMatch) variants.push(...titleMatch[1].split(/[，、/]/));
  const baseName = text.replace(/（[^）]*）/g, '');
  if (baseName.indexOf('·') !== -1) variants.push(baseName.split('·').pop());
  return variants;
}

function pronunciationParts(value) {
  return String(value || '')
    .split(/\s+/)
    .map(withoutTone)
    .filter(Boolean);
}

function nameSyllables(value) {
  const name = cleanVariant(value);
  const characters = Array.from(name);
  if (!characters.length) return [];
  const syllables = pinyin(name, {
    toneType: 'none',
    type: 'array',
    nonZh: 'removed',
  }).map(withoutTone);
  const exactParts = pronunciationParts(NAME_PRONUNCIATIONS[name]);
  if (exactParts.length === characters.length) return exactParts;

  const rareIndexes = [];
  characters.forEach((character, index) => {
    const override = withoutTone(RARE_CHARACTER_PRONUNCIATIONS[character]);
    if (!override) return;
    rareIndexes.push(index);
    syllables[index] = override;
  });
  if (exactParts.length && exactParts.length === rareIndexes.length) {
    rareIndexes.forEach((index, partIndex) => {
      syllables[index] = exactParts[partIndex];
    });
  }
  return syllables;
}

function buildEntry(values) {
  const pairs = [];
  const seen = new Set();
  values.filter(Boolean).flatMap(expandVariants).forEach(value => {
    const syllables = nameSyllables(value);
    if (!syllables.length) return;
    const full = syllables.join('');
    const initials = syllables.map(item => item.slice(0, 1)).join('');
    const key = `${full}|${initials}`;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push(full, initials);
  });
  return pairs;
}

function sortedObject(entries) {
  return Object.fromEntries(entries.sort((a, b) => a[0].localeCompare(b[0])));
}

const existingNames = new Set(knowledge.persons
  .reduce((names, person) => names.concat([person.name, person.formalName]), [])
  .map(normalizeIdentity));
const uniqueCurriculumPeople = curriculum.people
  .filter(person => !existingNames.has(normalizeIdentity(person.name)));

const personEntries = knowledge.persons
  .concat(uniqueCurriculumPeople)
  .map(person => [person.id, buildEntry([person.name, person.formalName])]);

const rulerEntries = knowledge.rulers.map(ruler => {
  const linked = ruler.linkedPersonId && knowledge.personMap[ruler.linkedPersonId];
  return [ruler.id, buildEntry([
    ruler.name,
    ruler.personalName,
    ...(ruler.aliases || []),
    linked && linked.name,
    linked && linked.formalName,
  ])];
});

const payload = `module.exports=${JSON.stringify({
  p: sortedObject(personEntries),
  r: sortedObject(rulerEntries),
})};\n`;

fs.writeFileSync(outputPath, payload);
console.log(`Pinyin index: ${personEntries.length} people, ${rulerEntries.length} rulers, ${Buffer.byteLength(payload)} bytes`);
