const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: { type: String, default: null },
  phone: { type: String, default: null },
  bio: { type: String, default: null },
  verificationStatus: { type: String, enum: ['pending', 'verified'], default: 'pending' },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: { type: String, default: 'España' },
  },
  preferences: {
    pushNotifications: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
  },
  tripsCompleted: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  refreshToken: { type: String, default: null },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toPublic = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
