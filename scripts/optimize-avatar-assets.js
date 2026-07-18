const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { persons } = require('../data/historyKnowledge');
const curriculum = require('../data/curriculumIndex');
const curriculumContent = require('../curriculum-package/data/content');

const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'assets', 'avatar-sources');
const featuredOutputDir = path.join(root, 'assets', 'avatars');
const compactOutputDir = path.join(root, 'person-package', 'assets', 'avatars');
const curriculumOutputDir = path.join(root, 'curriculum-package', 'assets', 'avatars');
const faceCropScript = path.join(__dirname, 'crop-avatar-faces.swift');

const featuredMaxSize = Number(process.env.AVATAR_FEATURED_MAX_SIZE || 64);
const featuredQuality = String(process.env.AVATAR_FEATURED_JPEG_QUALITY || 35);
const detailMaxSize = Number(process.env.AVATAR_DETAIL_MAX_SIZE || 176);
const detailQuality = String(process.env.AVATAR_DETAIL_JPEG_QUALITY || 55);
const compactMaxSize = Number(process.env.AVATAR_COMPACT_MAX_SIZE || 96);
const compactQuality = String(process.env.AVATAR_COMPACT_JPEG_QUALITY || 45);

function parseArgs(argv) {
  const options = {
    includePlaceholderAvatars: false,
    only: '',
    dryRun: false,
    curriculum: false,
    avatarType: '',
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--all') options.includePlaceholderAvatars = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--only') options.only = argv[++i] || '';
    else if (arg === '--curriculum') options.curriculum = true;
    else if (arg === '--avatar-type') options.avatarType = argv[++i] || '';
  }

  return options;
}

function runSips(input, output, maxSize, quality) {
  const result = spawnSync('sips', [
    '-Z',
    String(maxSize),
    '-s',
    'format',
    'jpeg',
    '-s',
    'formatOptions',
    quality,
    input,
    '--out',
    output,
  ], { encoding: 'utf8' });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `sips failed for ${input}`);
  }
}

function runFaceCropBatch(jobs, width, height, quality) {
  const manifest = path.join('/tmp', `miniapp-avatar-crop-${process.pid}.tsv`);
  fs.writeFileSync(manifest, `${jobs.map(job => `${job.input}\t${job.output}`).join('\n')}\n`);
  try {
    const normalizedQuality = Math.max(0.05, Math.min(1, Number(quality) / 100));
    const result = spawnSync('swift', [
      faceCropScript,
      manifest,
      String(width),
      String(height),
      String(normalizedQuality),
    ], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
    if (result.status !== 0) {
      throw new Error(result.stderr || result.stdout || 'Vision face crop failed');
    }
    if (result.stdout.trim()) console.log(result.stdout.trim());
  } finally {
    if (fs.existsSync(manifest)) fs.rmSync(manifest);
  }
}

function main() {
  const options = parseArgs(process.argv);
  fs.mkdirSync(featuredOutputDir, { recursive: true });
  fs.mkdirSync(compactOutputDir, { recursive: true });
  fs.mkdirSync(curriculumOutputDir, { recursive: true });

  const normalize = value => String(value || '').replace(/（.*?）/g, '').replace(/[·\s]/g, '');
  const existingNames = new Set(persons
    .reduce((names, person) => names.concat([person.name, person.formalName]), [])
    .map(normalize));
  let selected = options.curriculum
    ? curriculum.people.filter(person => !existingNames.has(normalize(person.name)))
    : persons;
  if (!options.curriculum && !options.only && !options.includePlaceholderAvatars) {
    selected = selected.filter(person => person.hasAvatar !== false);
  }
  if (options.only) {
    const wanted = new Set(options.only.split(',').map(item => item.trim()).filter(Boolean));
    selected = selected.filter(person => wanted.has(person.id) || wanted.has(person.name));
  }
  if (options.avatarType && options.curriculum) {
    selected = selected.filter(person => {
      const profile = curriculumContent.buildPerson(person.id);
      return profile && profile.avatarType === options.avatarType;
    });
  }
  if (!selected.length) {
    throw new Error(`No avatars selected for ${options.curriculum ? 'curriculum' : 'existing'} dataset`);
  }

  const missing = [];
  const curriculumJobs = [];
  for (const person of selected) {
    const input = path.join(sourceDir, `${person.id}.png`);
    const isFeatured = !options.curriculum && person.hasAvatar !== false;
    const outputDir = options.curriculum ? curriculumOutputDir : compactOutputDir;
    const output = path.join(outputDir, `${person.id}.jpg`);
    if (!fs.existsSync(input)) {
      missing.push(path.relative(root, input));
      continue;
    }
    if (options.dryRun) {
      const tier = options.curriculum ? 'curriculum detail' : person.hasAvatar === false ? 'compact detail' : 'featured thumbnail + detail';
      console.log(`[dry-run] ${path.relative(root, input)} -> ${path.relative(root, output)} (${tier})`);
      continue;
    }
    if (options.curriculum) {
      curriculumJobs.push({ input, output });
      continue;
    }
    runSips(input, output, isFeatured ? detailMaxSize : compactMaxSize, isFeatured ? detailQuality : compactQuality);
    if (isFeatured) {
      runSips(
        input,
        path.join(featuredOutputDir, `${person.id}.jpg`),
        featuredMaxSize,
        featuredQuality,
      );
    } else {
      const legacyOutput = path.join(featuredOutputDir, `${person.id}.jpg`);
      if (fs.existsSync(legacyOutput)) fs.rmSync(legacyOutput);
    }
  }

  if (missing.length) {
    console.error('Missing source PNG files:');
    for (const file of missing) console.error(`- ${file}`);
    process.exit(1);
  }

  if (options.dryRun) {
    console.log(`Checked ${selected.length} avatar source file(s)`);
    return;
  }

  if (options.curriculum) {
    runFaceCropBatch(curriculumJobs, compactMaxSize, Math.round(compactMaxSize * 1.25), compactQuality);
  }

  const totalBytes = selected.reduce((sum, person) => {
    const detailOutput = path.join(options.curriculum ? curriculumOutputDir : compactOutputDir, `${person.id}.jpg`);
    const thumbnailOutput = path.join(featuredOutputDir, `${person.id}.jpg`);
    return sum + fs.statSync(detailOutput).size + (!options.curriculum && person.hasAvatar !== false ? fs.statSync(thumbnailOutput).size : 0);
  }, 0);

  console.log(`Optimized ${selected.length} avatars into ${options.curriculum ? 'curriculum-package' : 'featured and person-package'} asset tiers`);
  console.log(`Total runtime avatar size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
}

main();
