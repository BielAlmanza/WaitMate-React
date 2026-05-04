require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const Message = require('./src/models/Message');
const Conversation = require('./src/models/Conversation');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  socket.on('join', (conversationId) => {
    socket.join(conversationId);
  });

  socket.on('message', async ({ conversationId, senderId, text }) => {
    try {
      const message = await Message.create({ conversation: conversationId, senderId, text });
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: text,
        lastMessageAt: new Date(),
      });
      io.to(conversationId).emit('message', {
        id: message._id,
        senderId,
        text,
        timestamp: message.createdAt,
      });
    } catch (err) {
      socket.emit('error', { message: err.message });
    }
  });
});

connectDB().then(() => {
  server.listen(PORT, () => console.log(`WaitMate API running on port ${PORT}`));
});
