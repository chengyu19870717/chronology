const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { persons, decoratePerson } = require('../data/historyKnowledge');
const { getAvatarProfile } = require('../data/avatarPrompts');
const curriculum = require('../data/curriculumIndex');
const curriculumContent = require('../curriculum-package/data/content');
const {
  defaultComfyDir,
  findQuarantinedCheckpoint,
  getComfyPython,
  inspectCheckpoints,
} = require('./lib/comfyui-utils');

const root = path.resolve(__dirname, '..');
const avatarDir = path.join(root, 'assets', 'avatar-sources');

const defaults = {
  server: process.env.COMFYUI_SERVER || 'http://127.0.0.1:8188',
  comfyDir: process.env.COMFYUI_DIR || defaultComfyDir,
  checkpoint: process.env.COMFYUI_CHECKPOINT || 'blue_pencil-XL-v7.0.0.safetensors',
  width: Number(process.env.COMFYUI_WIDTH || 512),
  height: Number(process.env.COMFYUI_HEIGHT || 704),
  steps: Number(process.env.COMFYUI_STEPS || 22),
  cfg: Number(process.env.COMFYUI_CFG || 8),
  sampler: process.env.COMFYUI_SAMPLER || 'dpmpp_2m',
  scheduler: process.env.COMFYUI_SCHEDULER || 'karras',
  seedBase: Number(process.env.COMFYUI_SEED_BASE || 20260799),
  timeoutMinutes: Number(process.env.COMFYUI_TIMEOUT_MINUTES || 30),
  retryCount: Number(process.env.COMFYUI_RETRY_COUNT || 2),
  retryDelaySeconds: Number(process.env.COMFYUI_RETRY_DELAY_SECONDS || 8),
  failureLog: process.env.COMFYUI_FAILURE_LOG || path.join(avatarDir, 'generation-failures.json'),
};

function parseArgs(argv) {
  const options = {
    ...defaults,
    limit: 0,
    only: '',
    overwrite: false,
    dryRun: false,
    validateCheckpoint: true,
    listCheckpoints: false,
    autoCheckpoint: false,
    includePlaceholderAvatars: false,
    curriculum: false,
    avatarType: '',
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--overwrite') options.overwrite = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--list-checkpoints') options.listCheckpoints = true;
    else if (arg === '--auto-checkpoint') options.autoCheckpoint = true;
    else if (arg === '--all') options.includePlaceholderAvatars = true;
    else if (arg === '--curriculum') options.curriculum = true;
    else if (arg === '--avatar-type') options.avatarType = argv[++i] || '';
    else if (arg === '--no-validate-checkpoint') options.validateCheckpoint = false;
    else if (arg === '--limit') options.limit = Number(argv[++i] || 0);
    else if (arg === '--only') options.only = argv[++i] || '';
    else if (arg === '--server') options.server = argv[++i] || options.server;
    else if (arg === '--comfy-dir') options.comfyDir = argv[++i] || options.comfyDir;
    else if (arg === '--checkpoint') options.checkpoint = argv[++i] || options.checkpoint;
    else if (arg === '--width') options.width = Number(argv[++i] || options.width);
    else if (arg === '--height') options.height = Number(argv[++i] || options.height);
    else if (arg === '--steps') options.steps = Number(argv[++i] || options.steps);
    else if (arg === '--cfg') options.cfg = Number(argv[++i] || options.cfg);
    else if (arg === '--timeout-minutes') options.timeoutMinutes = Number(argv[++i] || options.timeoutMinutes);
    else if (arg === '--retry-count') options.retryCount = Number(argv[++i] || 0);
    else if (arg === '--retry-delay-seconds') options.retryDelaySeconds = Number(argv[++i] || 0);
    else if (arg === '--failure-log') options.failureLog = path.resolve(argv[++i] || options.failureLog);
    else if (arg === '--seed-base') options.seedBase = Number(argv[++i] || options.seedBase);
  }

  return options;
}

function printCheckpointList(options) {
  const { good, bad, checkpointsDir } = inspectCheckpoints(options.comfyDir);
  console.log(`ComfyUI checkpoints: ${checkpointsDir}`);
  for (const file of good) console.log(`OK  ${file}`);
  for (const item of bad) console.log(`BAD ${item.file} :: ${item.error}`);
}

function validateCheckpoint(options) {
  if (!options.validateCheckpoint || !options.checkpoint.endsWith('.safetensors')) return;

  const checkpointPath = path.join(options.comfyDir, 'models', 'checkpoints', options.checkpoint);
  if (!fs.existsSync(checkpointPath)) {
    const quarantined = findQuarantinedCheckpoint(options.comfyDir, options.checkpoint);
    const extra = quarantined
      ? `\nIt is currently quarantined at: ${quarantined}\nRe-download the model before using it again.`
      : '';
    throw new Error(`Checkpoint not found: ${checkpointPath}${extra}`);
  }

  const code = [
    'from safetensors import safe_open',
    'import sys',
    'with safe_open(sys.argv[1], framework="pt", device="cpu") as f:',
    '    next(iter(f.keys()), None)',
  ].join('\n');
  const result = spawnSync(getComfyPython(options.comfyDir), ['-c', code, checkpointPath], { encoding: 'utf8' });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || '').trim().split('\n').pop() || 'unknown safetensors error';
    throw new Error([
      `Checkpoint is not readable: ${options.checkpoint}`,
      detail,
      'Run: node scripts/check-comfyui-checkpoints.js --quarantine',
      'Then re-download the broken model if you still need it.',
    ].join('\n'));
  }
}

function chooseCheckpoint(options) {
  if (!options.autoCheckpoint) return;
  const { good } = inspectCheckpoints(options.comfyDir);
  if (!good.length) throw new Error('No readable ComfyUI checkpoint found.');
  if (good.includes(options.checkpoint)) return;
  const preferred = [
    'blue_pencil-XL-v7.0.0.safetensors',
    'CounterfeitXL_beta.safetensors',
    'animagine-xl-3.1.safetensors',
    'realisticvision-v6-sd15.safetensors',
    'pastelmix.safetensors',
  ];
  options.checkpoint = preferred.find(item => good.includes(item)) || good[0];
}

function stableSeed(id, base) {
  const hash = crypto.createHash('sha256').update(id).digest();
  return (hash.readUInt32BE(0) + base) % 2147483647;
}

function buildWorkflow(person, options) {
  return {
    1: {
      class_type: 'CheckpointLoaderSimple',
      inputs: {
        ckpt_name: options.checkpoint,
      },
    },
    2: {
      class_type: 'CLIPTextEncode',
      inputs: {
        clip: ['1', 1],
        text: person.avatarGenerationPrompt || person.avatarPrompt,
      },
    },
    3: {
      class_type: 'CLIPTextEncode',
      inputs: {
        clip: ['1', 1],
        text: person.avatarNegativePrompt,
      },
    },
    4: {
      class_type: 'EmptyLatentImage',
      inputs: {
        width: options.width,
        height: options.height,
        batch_size: 1,
      },
    },
    5: {
      class_type: 'KSampler',
      inputs: {
        model: ['1', 0],
        positive: ['2', 0],
        negative: ['3', 0],
        latent_image: ['4', 0],
        seed: stableSeed(person.id, options.seedBase),
        steps: options.steps,
        cfg: options.cfg,
        sampler_name: options.sampler,
        scheduler: options.scheduler,
        denoise: 1,
      },
    },
    6: {
      class_type: 'VAEDecode',
      inputs: {
        samples: ['5', 0],
        vae: ['1', 2],
      },
    },
    7: {
      class_type: 'SaveImage',
      inputs: {
        images: ['6', 0],
        filename_prefix: `weixin_avatar_${person.id}`,
      },
    },
  };
}

async function apiFetch(server, route, options = {}) {
  const response = await fetch(`${server}${route}`, options);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${route} failed: ${response.status} ${body}`);
  }
  return response;
}

async function checkServer(options) {
  const response = await apiFetch(options.server, '/system_stats');
  const stats = await response.json();
  const device = stats.devices && stats.devices[0];
  console.log(`ComfyUI server ready${device && device.name ? `: ${device.name}` : ''}`);
}

async function queuePrompt(person, options) {
  const prompt = buildWorkflow(person, options);
  const clientId = crypto.randomUUID();
  const response = await apiFetch(options.server, '/prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, client_id: clientId }),
  });
  const json = await response.json();
  return json.prompt_id;
}

async function waitForHistory(promptId, options) {
  const started = Date.now();
  const timeoutMs = Math.max(1, options.timeoutMinutes || defaults.timeoutMinutes) * 60 * 1000;

  while (Date.now() - started < timeoutMs) {
    const response = await apiFetch(options.server, `/history/${promptId}`);
    const json = await response.json();
    if (json[promptId]) return json[promptId];
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  throw new Error(`Timed out waiting for prompt ${promptId}`);
}

function getFirstImage(history) {
  const outputs = history.outputs || {};
  for (const output of Object.values(outputs)) {
    if (output.images && output.images.length) return output.images[0];
  }
  return null;
}

function getExecutionError(history) {
  const messages = history.status && history.status.messages;
  if (!Array.isArray(messages)) return null;
  const item = messages.find(message => message[0] === 'execution_error');
  if (!item) return null;
  const detail = item[1] || {};
  return [
    `ComfyUI execution error at node ${detail.node_id || '?'} (${detail.node_type || 'unknown'})`,
    detail.exception_message || detail.exception_type || 'Unknown execution error',
  ].join(': ');
}

async function downloadImage(image, destination, options) {
  const params = new URLSearchParams({
    filename: image.filename,
    type: image.type || 'output',
  });
  if (image.subfolder) params.set('subfolder', image.subfolder);

  const response = await apiFetch(options.server, `/view?${params.toString()}`);
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`Unexpected image response type: ${contentType || 'unknown'}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (!isValidPngBuffer(buffer)) {
    throw new Error(`Downloaded image is not a valid PNG (${buffer.length} bytes)`);
  }
  const temporary = `${destination}.part`;
  fs.writeFileSync(temporary, buffer);
  fs.renameSync(temporary, destination);
}

function isValidPngBuffer(buffer) {
  if (!buffer || buffer.length < 1024) return false;
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  return buffer.subarray(0, signature.length).equals(signature);
}

function isValidPng(file) {
  if (!fs.existsSync(file)) return false;
  const stats = fs.statSync(file);
  if (!stats.isFile() || stats.size < 1024) return false;
  const handle = fs.openSync(file, 'r');
  const header = Buffer.alloc(8);
  try {
    fs.readSync(handle, header, 0, header.length, 0);
  } finally {
    fs.closeSync(handle);
  }
  return isValidPngBuffer(Buffer.concat([header, Buffer.alloc(1016)]));
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function generatePerson(person, destination, options) {
  const maxAttempts = Math.max(1, options.retryCount + 1);
  let lastError = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const promptId = await queuePrompt(person, options);
      const history = await waitForHistory(promptId, options);
      const executionError = getExecutionError(history);
      if (executionError) throw new Error(executionError);
      const image = getFirstImage(history);
      if (!image) throw new Error(`No image output for ${person.id}`);
      await downloadImage(image, destination, options);
      return attempt;
    } catch (error) {
      lastError = error;
      console.error(`  attempt ${attempt}/${maxAttempts} failed: ${error.message || error}`);
      if (attempt < maxAttempts) {
        await sleep(Math.max(0, options.retryDelaySeconds) * 1000);
      }
    }
  }
  throw lastError || new Error(`Avatar generation failed for ${person.id}`);
}

function writeFailureLog(file, failures, options) {
  const payload = {
    generatedAt: new Date().toISOString(),
    server: options.server,
    checkpoint: options.checkpoint,
    dimensions: `${options.width}x${options.height}`,
    retryCount: options.retryCount,
    failures,
  };
  fs.writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`);
}

function selectPeople(options) {
  let selected;
  if (options.curriculum) {
    const normalize = value => String(value || '').replace(/（.*?）/g, '').replace(/[·\s]/g, '');
    const existingNames = new Set(persons
      .reduce((names, person) => names.concat([person.name, person.formalName]), [])
      .map(normalize));
    selected = curriculum.people
      .filter(person => !existingNames.has(normalize(person.name)))
      .map(person => curriculumContent.buildPerson(person.id));
  } else {
    selected = persons.map(source => {
      const person = decoratePerson(source);
      const avatar = getAvatarProfile(source);
      return {
        ...person,
        avatarType: avatar.type,
        avatarPrompt: avatar.positive,
        avatarGenerationPrompt: avatar.generation,
        avatarNegativePrompt: avatar.negative,
      };
    });
  }
  if (!options.only && !options.includePlaceholderAvatars) {
    selected = selected.filter(person => person.hasAvatar);
  }
  if (options.only) {
    const wanted = new Set(options.only.split(',').map(item => item.trim()).filter(Boolean));
    selected = selected.filter(person => wanted.has(person.id) || wanted.has(person.name));
  }
  if (options.avatarType) {
    selected = selected.filter(person => person.avatarType === options.avatarType);
  }
  if (options.limit > 0) selected = selected.slice(0, options.limit);
  return selected;
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.curriculum && options.failureLog === defaults.failureLog) {
    options.failureLog = path.join(avatarDir, 'generation-failures-curriculum.json');
  }
  if (options.listCheckpoints) {
    printCheckpointList(options);
    return;
  }
  chooseCheckpoint(options);
  fs.mkdirSync(avatarDir, { recursive: true });

  const people = selectPeople(options);
  console.log(`ComfyUI: ${options.server}`);
  console.log(`Checkpoint: ${options.checkpoint}`);
  console.log(`Dataset: ${options.curriculum ? 'curriculum' : 'existing'}`);
  console.log(`Queueing ${people.length} avatar(s) at ${options.width}x${options.height}`);

  validateCheckpoint(options);

  if (options.dryRun) {
    for (const person of people) {
      console.log(`[dry-run] ${person.id} ${person.name} -> ${path.relative(root, path.join(avatarDir, `${person.id}.png`))}`);
    }
    return;
  }

  await checkServer(options);

  let generated = 0;
  let skipped = 0;
  const failures = [];

  for (let index = 0; index < people.length; index += 1) {
    const person = people[index];
    const destination = path.join(avatarDir, `${person.id}.png`);
    if (!options.overwrite && isValidPng(destination)) {
      console.log(`[${index + 1}/${people.length}] skip ${person.name}, exists`);
      skipped += 1;
      continue;
    }

    if (fs.existsSync(destination)) fs.rmSync(destination);

    console.log(`[${index + 1}/${people.length}] generating ${person.name} (${person.id})`);
    try {
      const attempts = await generatePerson(person, destination, options);
      generated += 1;
      console.log(`  saved ${path.relative(root, destination)}${attempts > 1 ? ` after ${attempts} attempts` : ''}`);
    } catch (error) {
      failures.push({
        id: person.id,
        name: person.name,
        error: error && error.message ? error.message : String(error),
      });
    }
  }

  if (failures.length) {
    writeFailureLog(options.failureLog, failures, options);
    console.error(`Failed ${failures.length} avatar(s); details: ${path.relative(root, options.failureLog)}`);
    process.exitCode = 1;
  } else if (fs.existsSync(options.failureLog)) {
    fs.rmSync(options.failureLog);
  }

  console.log(`Finished: ${generated} generated, ${skipped} skipped, ${failures.length} failed`);
}

main().catch(error => {
  console.error(error && error.message ? error.message : error);
  process.exit(1);
});
