const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' },
});

// Serve static files if needed
app.use(express.static(path.join(__dirname, 'public')));

// Add a basic route for the root URL
app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', `${socket.id.substr(0, 5)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
