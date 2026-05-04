const Event = require('../models/Event');
const Post = require('../models/Post');

exports.getEvents = async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const filter = category && category !== 'Todos' ? { category } : {};
    const events = await Event.find(filter)
      .populate('creator', 'name avatar')
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNearbyEvents = async (req, res) => {
  try {
    const { lat, lng, radius = 50 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: 'lat y lng son requeridos' });
    const events = await Event.find({
      'coordinates.lat': { $exists: true },
    }).populate('creator', 'name avatar').sort({ date: 1 });

    // Simple distance filter (Haversine not required for TFG)
    const radiusKm = Number(radius);
    const filtered = events.filter((e) => {
      if (!e.coordinates?.lat) return false;
      const dLat = (e.coordinates.lat - Number(lat)) * (Math.PI / 180);
      const dLng = (e.coordinates.lng - Number(lng)) * (Math.PI / 180);
      const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(Number(lat) * Math.PI / 180) * Math.cos(e.coordinates.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
      const distKm = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return distKm <= radiusKm;
    });
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('creator', 'name avatar');
    if (!event) return res.status(404).json({ message: 'Evento no encontrado' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, location, date, coordinates } = req.body;
    if (!title || !location || !date) {
      return res.status(400).json({ message: 'Título, ubicación y fecha son obligatorios' });
    }
    const event = await Event.create({
      title, description, category, location, date, coordinates,
      creator: req.user.id,
      image: req.file?.path ?? null,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventRideRequests = async (req, res) => {
  try {
    const posts = await Post.find({ event: req.params.id })
      .populate('author', 'name avatar averageRating tripsCompleted verificationStatus')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRideRequest = async (req, res) => {
  try {
    const { description } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Evento no encontrado' });

    const post = await Post.create({
      author: req.user.id,
      event: req.params.id,
      type: 'request',
      description: description ?? '',
    });
    await Event.findByIdAndUpdate(req.params.id, { $inc: { rideCount: 1 } });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
