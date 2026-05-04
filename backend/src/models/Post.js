const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
  type: { type: String, enum: ['offer', 'request'], required: true },
  description: { type: String, required: true },
  seats: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  origin: { type: String, default: null },
  destination: { type: String, default: null },
  departureDate: { type: Date, default: null },
  preferences: {
    music: { type: Boolean, default: false },
    pets: { type: Boolean, default: false },
    smoking: { type: Boolean, default: false },
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['open', 'full', 'closed'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
