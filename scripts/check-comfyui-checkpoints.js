const fs = require('fs');
const path = require('path');
const {
  defaultComfyDir,
  inspectCheckpoints,
} = require('./lib/comfyui-utils');

function parseArgs(argv) {
  const options = {
    comfyDir: process.env.COMFYUI_DIR || defaultComfyDir,
    quarantine: false,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--comfy-dir') options.comfyDir = argv[++i] || options.comfyDir;
    else if (arg === '--quarantine') options.quarantine = true;
  }

  return options;
}

function main() {
  const options = parseArgs(process.argv);
  const { checkpointsDir, good, bad } = inspectCheckpoints(options.comfyDir);

  console.log(`ComfyUI checkpoints: ${checkpointsDir}`);
  console.log(`OK: ${good.length}`);
  for (const file of good) console.log(`  OK  ${file}`);
  console.log(`BAD: ${bad.length}`);
  for (const item of bad) console.log(`  BAD ${item.file} :: ${item.error}`);

  if (options.quarantine && bad.length) {
    const quarantineDir = path.join(path.dirname(checkpointsDir), `checkpoints_corrupt_${new Date().toISOString().slice(0, 10)}`);
    fs.mkdirSync(quarantineDir, { recursive: true });
    for (const item of bad) {
      const from = path.join(checkpointsDir, item.file);
      const to = path.join(quarantineDir, item.file);
      if (fs.existsSync(to)) fs.unlinkSync(to);
      fs.renameSync(from, to);
    }
    fs.writeFileSync(
      path.join(quarantineDir, 'README.txt'),
      [
        'These checkpoint files failed safetensors validation and were moved out of models/checkpoints.',
        'ComfyUI error: Error while deserializing header: incomplete metadata, file not fully covered.',
        'Re-download the models before moving them back.',
        '',
        ...bad.map(item => `${item.file}: ${item.error}`),
        '',
      ].join('\n')
    );
    console.log(`Moved ${bad.length} corrupt checkpoint(s) to ${quarantineDir}`);
  }

  if (bad.length) process.exitCode = 1;
}

main();
