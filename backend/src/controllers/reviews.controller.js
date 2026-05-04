const Review = require('../models/Review');
const User = require('../models/User');

exports.createReview = async (req, res) => {
  try {
    const { reviewed, post, rating, comment, categories } = req.body;
    if (!reviewed || !rating) {
      return res.status(400).json({ message: 'Usuario y puntuación son obligatorios' });
    }
    if (reviewed === req.user.id) {
      return res.status(400).json({ message: 'No puedes valorarte a ti mismo' });
    }

    const review = await Review.create({
      reviewer: req.user.id, reviewed, post: post ?? null, rating, comment, categories,
    });

    // Recalculate average rating for the reviewed user
    const reviews = await Review.find({ reviewed });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await User.findByIdAndUpdate(reviewed, {
      averageRating: Math.round(avg * 10) / 10,
      reviewCount: reviews.length,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
