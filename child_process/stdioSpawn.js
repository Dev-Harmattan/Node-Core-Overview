import cp from 'node:child_process';
import fs from 'node:fs';

const err = fs.openSync('./logs/error.txt', 'a');
const output = fs.openSync('./logs/output.txt', 'a');

// cp.spawn('ls', ['pub'], { cwd: '..', stdio: ['ignore', 'inherit', 'ignore'] });

cp.spawn('ls', ['-a'], { cwd: '..', stdio: ['ignore', output, err] });
