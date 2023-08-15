import cp from 'node:child_process';
import fs from 'node:fs';

const err = fs.openSync('./logs/error_det.txt', 'a');
const output = fs.openSync('./logs/output_det.txt', 'a');

const child = cp.spawn('ls', ['-a'], {
  cwd: '..',
  detached: true,
  stdio: ['ignore', output, err],
});
child.unref();
