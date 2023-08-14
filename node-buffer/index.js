import { Buffer } from 'node:buffer';

const buffer = Buffer.alloc(10, 1);

// console.log(buffer.toString('utf-8'));

const buffer2 = Buffer.allocUnsafe(10);

const buffer3 = Buffer.from([15, 3, 4, 5, 15]);
// console.log(buffer3.toString('HEX'));

const blob = new Blob(['Test me with this bl'], { type: 'text/plain' });
let url = URL.createObjectURL(blob);
console.log(url);
