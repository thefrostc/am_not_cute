const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

module.exports = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: true, credentials: true } });

  io.use((socket, next) => {
    const token = socket.handshake.auth && socket.handshake.auth.token;
    if (!token) return next(new Error('no token'));
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_jwt_key');
      socket.user = data;
      next();
    } catch (err) { next(new Error('invalid token')); }
  });

  io.on('connection', (socket) => {
    console.log('ws connected', socket.user && socket.user.username);

    socket.on('public-message', (msg) => {
      io.emit('public-message', { from: socket.user.username, msg });
    });

    socket.on('private-message', ({ to, msg }) => {
      io.emit('private-message', { from: socket.user.username, to, msg });
    });
  });
}
