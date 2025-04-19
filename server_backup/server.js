// server/server.js
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smartops';

// Create an HTTP server with your Express app
const server = http.createServer(app);

// Set up Socket.IO on the server
const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this in production
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // When a new metric is saved, you could call:
  // io.emit('newMetric', savedMetric);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Connect to MongoDB then start the server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Export io if needed in other modules (e.g., controllers)
module.exports = { io };
