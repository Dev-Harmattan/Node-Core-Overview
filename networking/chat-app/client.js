import net from 'node:net';
import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//clear line method
const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

//move cursor to the the dx - horizontal position and dy - vertical position
const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

// each connection id.
let id;
const socket = net.createConnection({ port: 3099, host: '127.0.0.1' }, () => {
  const ask = async () => {
    const message = await rl.question('Send a message to server > ');

    //move cursor to the top
    await moveCursor(0, -1);

    //clear line of the message
    await clearLine(0);

    //send message to server
    socket.write(`${id}-message: ${message}`);
  };

  ask();

  socket.on('data', async (data) => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);

    if (data.toString('utf-8').substring(0, 2) === 'id') {
      // when we are getting id'

      id = data.toString('utf-8').substring(3);
      console.log(`Connected to the server your id is ${id}`);
    } else {
      // when we are getting other message other than id
      console.log(data.toString('utf-8'));
    }

    ask();
  });
});

socket.on('end', () => {
  console.log('Connection ended');
});

socket.on('close', () => {
  console.log('close connection');
});
