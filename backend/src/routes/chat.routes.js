const router = require('express').Router();
const ctrl = require('../controllers/chat.controller');
const auth = require('../middleware/auth');

router.get('/', auth, ctrl.getConversations);
router.post('/', auth, ctrl.createConversation);
router.get('/:id/messages', auth, ctrl.getMessages);
router.post('/:id/messages', auth, ctrl.sendMessage);

module.exports = router;
