const User = require('../models/User');
const Review = require('../models/Review');

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user.toPublic());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const allowed = ['name', 'phone', 'bio', 'avatar'];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(user.toPublic());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Contraseña actualizada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { address: req.body },
      { new: true }
    );
    res.json(user.toPublic());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviewsReceived = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewed: req.user.id })
      .populate('reviewer', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviewsGiven = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user.id })
      .populate('reviewed', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user.toPublic());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No se subió ningún archivo' });
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.path },
      { new: true }
    );
    res.json({ avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
