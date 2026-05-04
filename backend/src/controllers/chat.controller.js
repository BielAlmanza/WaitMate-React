const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user.id })
      .populate('participants', 'name avatar')
      .populate('event', 'title')
      .sort({ lastMessageAt: -1 });

    const result = conversations.map((c) => {
      const other = c.participants.find((p) => p._id.toString() !== req.user.id);
      return {
        id: c._id,
        tripTitle: c.event?.title ?? c.tripTitle,
        participant: { id: other?._id, name: other?.name, avatar: other?.avatar ?? null },
        lastMessage: c.lastMessage,
        timestamp: c.lastMessageAt,
        unread: c.unreadCount?.get(req.user.id) ?? 0,
      };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.id })
      .sort({ createdAt: 1 });

    // Mark as read
    await Conversation.findByIdAndUpdate(req.params.id, {
      $set: { [`unreadCount.${req.user.id}`]: 0 },
    });

    res.json(messages.map((m) => ({
      id: m._id,
      senderId: m.senderId.toString(),
      text: m.text,
      timestamp: m.createdAt,
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'El mensaje no puede estar vacío' });

    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) return res.status(404).json({ message: 'Conversación no encontrada' });

    const message = await Message.create({
      conversation: req.params.id,
      senderId: req.user.id,
      text,
    });

    // Update conversation last message and unread counts
    const otherParticipants = conversation.participants.filter(
      (p) => p.toString() !== req.user.id
    );
    const unreadUpdates = {};
    otherParticipants.forEach((p) => {
      const current = conversation.unreadCount?.get(p.toString()) ?? 0;
      unreadUpdates[`unreadCount.${p}`] = current + 1;
    });

    await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage: text,
      lastMessageAt: new Date(),
      $set: unreadUpdates,
    });

    res.status(201).json({
      id: message._id,
      senderId: message.senderId.toString(),
      text: message.text,
      timestamp: message.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createConversation = async (req, res) => {
  try {
    const { participantId, eventId, tripTitle } = req.body;
    if (!participantId) return res.status(400).json({ message: 'participantId es obligatorio' });

    // Return existing conversation if any
    const existing = await Conversation.findOne({
      participants: { $all: [req.user.id, participantId] },
      event: eventId ?? null,
    });
    if (existing) return res.json(existing);

    const conversation = await Conversation.create({
      participants: [req.user.id, participantId],
      event: eventId ?? null,
      tripTitle: tripTitle ?? '',
    });
    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
