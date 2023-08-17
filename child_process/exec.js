//child_process.exec(command, {options}, callback);

import cp from 'node:child_process';

const progs = {
  remove: 'rm',
  list: 'ls',
};

cp.exec(progs.remove + ' -r css', (err, stdout, stderr) => {
  if (err) {
    console.log(
      `Error name: ${err.name}\nError message: ${err.message}\nError stack: ${err.stack}`
    );
  } else {
    console.log(stdout);
  }
});
