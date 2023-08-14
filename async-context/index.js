import http from 'node:http';
import { AsyncLocalStorage } from 'node:async_hooks';

let counter = 0;
const sessionId = new AsyncLocalStorage();

http
  .createServer((req, res) => {
    sessionId.run(counter++, () => {
      requestHandler(req, res);
    });
  })
  .listen(3000, () => {
    console.log('Server listening on port: 3000');
  });

function requestHandler(req, res) {
  res.end(doSomething());
}

function doSomething() {
  return `The log is: ${sessionId.getStore()}`;
}
