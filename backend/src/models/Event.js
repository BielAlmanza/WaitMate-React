const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: {
    type: String,
    enum: ['Conciertos', 'Deportes', 'Festivales', 'Teatro', 'Conferencias', 'Otros'],
    default: 'Otros',
  },
  location: { type: String, required: true },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  date: { type: Date, required: true },
  image: { type: String, default: null },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rideCount: { type: Number, default: 0 },
}, { timestamps: true });

eventSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Event', eventSchema);
