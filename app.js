const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Create an Express application
const app = express();
const server = http.createServer(app);

// Enable CORS to allow requests from any origin
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Create a Socket.io server and configure CORS
const io = new Server(server, {
  cors: {
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg);  // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
