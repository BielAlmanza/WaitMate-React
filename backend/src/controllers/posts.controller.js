const Post = require('../models/Post');

exports.getFeed = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const posts = await Post.find()
      .populate('author', 'name avatar averageRating verificationStatus')
      .populate('event', 'title date location')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name avatar averageRating tripsCompleted verificationStatus')
      .populate('event', 'title date location')
      .populate('comments.author', 'name avatar');
    if (!post) return res.status(404).json({ message: 'Anuncio no encontrado' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { type, description, seats, price, origin, destination, departureDate, preferences, event } = req.body;
    if (!type || !description) {
      return res.status(400).json({ message: 'Tipo y descripción son obligatorios' });
    }
    const post = await Post.create({
      author: req.user.id,
      event: event ?? null,
      type, description, seats, price, origin, destination, departureDate, preferences,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Anuncio no encontrado' });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    await post.deleteOne();
    res.json({ message: 'Anuncio eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user.id } },
      { new: true }
    );
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user.id } },
      { new: true }
    );
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'El contenido es obligatorio' });
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { author: req.user.id, content } } },
      { new: true }
    ).populate('comments.author', 'name avatar');
    res.status(201).json(post.comments.at(-1));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.joinPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Anuncio no encontrado' });
    if (post.status !== 'open') return res.status(400).json({ message: 'Este viaje ya no tiene plazas' });
    if (post.joinedUsers.includes(req.user.id)) {
      return res.status(400).json({ message: 'Ya te has unido a este viaje' });
    }
    post.joinedUsers.push(req.user.id);
    if (post.joinedUsers.length >= post.seats) post.status = 'full';
    await post.save();
    res.json({ message: 'Te has unido al viaje', status: post.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
