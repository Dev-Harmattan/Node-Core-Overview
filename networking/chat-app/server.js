import net from 'node:net';

const sockets = [];

const server = net.createServer();

// this will will be trigger fot every connection and each connection with its own socket endpoint.
server.on('connection', (socket) => {
  console.log('A new connection established');
  const clientId = sockets.length + 1;

  //broadcast if the user join the room/chat
  sockets.map((s) => {
    s.socket.write(`Client ${clientId} joined.`);
  });

  socket.write(`id-${clientId}`);

  // sending message of each user to other users.
  socket.on('data', (data) => {
    sockets.map((s) => {
      let dataString = data.toString('utf-8');
      const id = dataString.substring(0, dataString.indexOf('-'));
      const message = dataString.substring(dataString.indexOf(':') + 1);
      s.socket.write(`> User${id}: ${message}`);
    });
  });

  // broadcasting message to other users if a user disconnects
  socket.on('end', () => {
    sockets.map((s) => {
      s.socket.write(`User ${clientId} disconnected.`);
    });
  });

  //pushing each socket endpoint connection to the clients array.
  sockets.push({ id: clientId.toString(), socket });
});

server.listen(3099, '127.0.0.1', () => {
  console.log('Server listening on', server.address());
});
