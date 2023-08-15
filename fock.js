//child_process.fock(fileModulePath, [args], {options});

import cp from 'node:child_process';

const args = ['john', 'samuel', 'ade'];

//const child = cp.fork('./modules/fockChild.js', args);

const child = cp.fork('fockChild.js', args, { cwd: './modules' });

child
  .on('message', (data) => {
    console.log(`Parent Recieved: ${data} `);
  })
  .on('exit', () => {
    console.log('Child Terminated');
  });

const interval = setInterval(() => {
  child.send({ name: 'John', age: 80, city: 'Lagos' });
}, 1000);

setTimeout(() => {
  clearInterval(interval);
  child.kill();
}, 5000);

