//child_process.spawn(command, [args], {options})

import cp from 'node:child_process';

const prog = {
  list: 'ls',
  copy: 'cp',
  folder: 'mkdir',
};

const child = cp.spawn(prog.list, ['-a'], { cwd: '..' });
child.stdout.on('data', (data) => {
  console.log(`Child process data: ${data}`);
});

child.stderr.on('data', (err) => {
  console.log(`Error: ${err}`);
});

const copy = cp.spawn(prog.copy, ['spawn.js', 'spawn1.js']);
copy.stdout.on('exist', (data) => {
  console.log('Copy file finished!');
});

child.on('error', (err) => {
  console.log('Something went wrong!', err);
});
