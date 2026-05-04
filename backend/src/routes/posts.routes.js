const router = require('express').Router();
const ctrl = require('../controllers/posts.controller');
const auth = require('../middleware/auth');

router.get('/', auth, ctrl.getFeed);
router.get('/:id', auth, ctrl.getPostById);
router.post('/', auth, ctrl.createPost);
router.delete('/:id', auth, ctrl.deletePost);
router.post('/:id/like', auth, ctrl.likePost);
router.delete('/:id/like', auth, ctrl.unlikePost);
router.post('/:id/comments', auth, ctrl.commentPost);
router.post('/:id/join', auth, ctrl.joinPost);

module.exports = router;
