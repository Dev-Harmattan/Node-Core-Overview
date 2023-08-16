import {createHash} from 'node:crypto';



function hash(input) {
  return createHash('sha256').update(input).digest('hex');
}

const password = 'digest';

const firstPassword = hash(password);

const secondPassword = hash(password);

console.log(firstPassword === secondPassword)