const fs = require('fs');
const path = require('path');
const { persons, decoratePerson } = require('../data/historyKnowledge');
const curriculum = require('../data/curriculumIndex');
const curriculumContent = require('../curriculum-package/data/content');

const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'assets', 'avatar-sources');
const featuredDir = path.join(root, 'assets', 'avatars');
const compactDir = path.join(root, 'person-package', 'assets', 'avatars');
const curriculumDir = path.join(root, 'curriculum-package', 'assets', 'avatars');

function hasSignature(file, signature) {
  if (!fs.existsSync(file) || fs.statSync(file).size < 512) return false;
  const handle = fs.openSync(file, 'r');
  const header = Buffer.alloc(signature.length);
  try {
    fs.readSync(handle, header, 0, header.length, 0);
  } finally {
    fs.closeSync(handle);
  }
  return header.equals(signature);
}

function sizeOf(files) {
  return files.reduce((sum, file) => sum + fs.statSync(file).size, 0);
}

function megabytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

function main() {
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const jpegSignature = Buffer.from([0xff, 0xd8, 0xff]);
  const failures = [];
  const sourceFiles = [];
  const featuredFiles = [];
  const detailFiles = [];
  const curriculumFiles = [];

  for (const person of persons) {
    const source = path.join(sourceDir, `${person.id}.png`);
    const isFeatured = person.hasAvatar !== false;
    const detailRuntime = path.join(compactDir, `${person.id}.jpg`);
    const featuredRuntime = path.join(featuredDir, `${person.id}.jpg`);
    const decorated = decoratePerson(person);
    const expectedPath = `/person-package/assets/avatars/${person.id}.jpg`;

    if (!hasSignature(source, pngSignature)) failures.push(`${person.id}: missing or invalid source PNG`);
    else sourceFiles.push(source);
    if (!hasSignature(detailRuntime, jpegSignature)) failures.push(`${person.id}: missing or invalid detail JPEG`);
    else detailFiles.push(detailRuntime);
    if (isFeatured) {
      if (!hasSignature(featuredRuntime, jpegSignature)) failures.push(`${person.id}: missing or invalid featured thumbnail JPEG`);
      else featuredFiles.push(featuredRuntime);
    }
    if (!decorated.hasAvatar) failures.push(`${person.id}: decorated record does not enable avatar`);
    if (decorated.avatarPath !== expectedPath) failures.push(`${person.id}: unexpected avatar path ${decorated.avatarPath}`);
  }

  const normalize = value => String(value || '').replace(/（.*?）/g, '').replace(/[·\s]/g, '');
  const existingNames = new Set(persons
    .reduce((names, person) => names.concat([person.name, person.formalName]), [])
    .map(normalize));
  const curriculumPeople = curriculum.people.filter(person => !existingNames.has(normalize(person.name)));
  for (const person of curriculumPeople) {
    const source = path.join(sourceDir, `${person.id}.png`);
    const runtime = path.join(curriculumDir, `${person.id}.jpg`);
    const decorated = curriculumContent.buildPerson(person.id);
    const expectedPath = `/curriculum-package/assets/avatars/${person.id}.jpg`;

    if (!hasSignature(source, pngSignature)) failures.push(`${person.id}: missing or invalid curriculum source PNG`);
    else sourceFiles.push(source);
    if (!hasSignature(runtime, jpegSignature)) failures.push(`${person.id}: missing or invalid curriculum JPEG`);
    else curriculumFiles.push(runtime);
    if (!decorated || !decorated.hasAvatar) failures.push(`${person.id}: curriculum record does not enable avatar`);
    if (decorated && decorated.avatarPath !== expectedPath) failures.push(`${person.id}: unexpected curriculum avatar path ${decorated.avatarPath}`);
  }

  const failureLog = path.join(sourceDir, 'generation-failures.json');
  if (fs.existsSync(failureLog)) failures.push('generation-failures.json still exists');
  const curriculumFailureLog = path.join(sourceDir, 'generation-failures-curriculum.json');
  if (fs.existsSync(curriculumFailureLog)) failures.push('generation-failures-curriculum.json still exists');

  console.log(`People: ${persons.length + curriculumPeople.length} (${persons.length} existing + ${curriculumPeople.length} curriculum)`);
  console.log(`Source PNG: ${sourceFiles.length} (${megabytes(sizeOf(sourceFiles))})`);
  console.log(`Featured thumbnail JPEG: ${featuredFiles.length} (${megabytes(sizeOf(featuredFiles))})`);
  console.log(`Detail runtime JPEG: ${detailFiles.length} (${megabytes(sizeOf(detailFiles))})`);
  console.log(`Curriculum runtime JPEG: ${curriculumFiles.length} (${megabytes(sizeOf(curriculumFiles))})`);

  if (failures.length) {
    console.error(`Avatar coverage audit failed with ${failures.length} issue(s):`);
    for (const failure of failures.slice(0, 50)) console.error(`- ${failure}`);
    if (failures.length > 50) console.error(`- ... ${failures.length - 50} more`);
    process.exit(1);
  }

  console.log('Avatar coverage audit passed for all people');
}

main();
