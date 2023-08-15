import http from 'node:http';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('Home Page');
  }
  if (req.url === '/slow-page') {
    for (let i = 0; i < 6_000_000_000; i++) {}
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('Slow Page');
  }
});

server.listen(3000, () => {
  console.log('Server running!');
});

export { server };
