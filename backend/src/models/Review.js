const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewed: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  categories: {
    punctuality: { type: Number, min: 1, max: 5, default: null },
    cleanliness: { type: Number, min: 1, max: 5, default: null },
    comfort: { type: Number, min: 1, max: 5, default: null },
    communication: { type: Number, min: 1, max: 5, default: null },
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
