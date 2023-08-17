//child_process.execFile(command, [args], {options}, callback);

import cp from 'node:child_process';

const compiler = 'g++';
const version = '-std=c++11';
const out = '-o';
const infile = 'hello.cpp';
const outfile = 'hello.out';

const firstname = 'Duly';

// cp.execFile('ls', ['-a', '-l'], {cwd: '../..'}, (err, stdout, stderr) => {
//   if(err) {
//     throw err;
//   }else {
//     console.log(stdout);
//   }
// });

cp.execFile(
  compiler,
  [version, out, outfile, infile],
  (error, stdout, stderr) => {
    if (error) {
      throw error;
    } else {
      const executable = `./${outfile}`;
      cp.execFile(executable, [firstname], (err, stdout, stderr) => {
        if (error) {
          throw err;
        } else {
          console.log(stdout);
        }
      });
    }
  }
);
