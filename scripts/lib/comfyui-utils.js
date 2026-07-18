const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const defaultComfyDir = '/Users/chengyu/project/ComfyUI';

function getComfyPython(comfyDir) {
  const venvPython = path.join(comfyDir, '.venv', 'bin', 'python');
  if (fs.existsSync(venvPython)) return venvPython;
  return 'python3';
}

function getCheckpointsDir(comfyDir) {
  return path.join(comfyDir, 'models', 'checkpoints');
}

function getQuarantineRoot(comfyDir) {
  return path.join(comfyDir, 'models');
}

function validateSafetensors(python, file) {
  const code = [
    'from safetensors import safe_open',
    'import sys',
    'with safe_open(sys.argv[1], framework="pt", device="cpu") as f:',
    '    next(iter(f.keys()), None)',
  ].join('\n');

  const result = spawnSync(python, ['-c', code, file], { encoding: 'utf8' });
  return {
    ok: result.status === 0,
    error: (result.stderr || result.stdout || '').trim().split('\n').pop() || '',
  };
}

function listCheckpointFiles(comfyDir) {
  const checkpointsDir = getCheckpointsDir(comfyDir);
  if (!fs.existsSync(checkpointsDir)) {
    throw new Error(`Checkpoint directory not found: ${checkpointsDir}`);
  }

  return fs.readdirSync(checkpointsDir)
    .filter(file => file.endsWith('.safetensors'))
    .sort();
}

function inspectCheckpoints(comfyDir) {
  const checkpointsDir = getCheckpointsDir(comfyDir);
  const python = getComfyPython(comfyDir);
  const files = listCheckpointFiles(comfyDir);
  const bad = [];
  const good = [];

  for (const file of files) {
    const fullPath = path.join(checkpointsDir, file);
    const result = validateSafetensors(python, fullPath);
    if (result.ok) good.push(file);
    else bad.push({ file, error: result.error });
  }

  return { checkpointsDir, python, good, bad };
}

function findQuarantinedCheckpoint(comfyDir, checkpoint) {
  const modelsDir = getQuarantineRoot(comfyDir);
  if (!fs.existsSync(modelsDir)) return '';

  const quarantineDirs = fs.readdirSync(modelsDir)
    .filter(item => item.startsWith('checkpoints_corrupt_'));

  for (const dir of quarantineDirs) {
    const file = path.join(modelsDir, dir, checkpoint);
    if (fs.existsSync(file)) return file;
  }

  return '';
}

module.exports = {
  defaultComfyDir,
  findQuarantinedCheckpoint,
  getCheckpointsDir,
  getComfyPython,
  inspectCheckpoints,
  listCheckpointFiles,
  validateSafetensors,
};
