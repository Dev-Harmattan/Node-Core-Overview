import EventEmitter from 'node:events';

class Emitter extends EventEmitter {}

const myEm = new Emitter();

myEm.on('message', (message) => {
  console.log(`Recieve this message: ${JSON.stringify(message)}`);
});

myEm.emit('message', { name: 'event', message: 'fire event from to message' });
