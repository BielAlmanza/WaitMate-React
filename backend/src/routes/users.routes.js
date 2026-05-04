const router = require('express').Router();
const ctrl = require('../controllers/users.controller');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/me', auth, ctrl.getMe);
router.patch('/me', auth, ctrl.updateMe);
router.post('/me/password', auth, ctrl.changePassword);
router.patch('/me/address', auth, ctrl.updateAddress);
router.get('/me/reviews/received', auth, ctrl.getReviewsReceived);
router.get('/me/reviews/given', auth, ctrl.getReviewsGiven);
router.post('/me/avatar', auth, upload.single('avatar'), ctrl.uploadAvatar);
router.get('/:id', auth, ctrl.getUserById);

module.exports = router;
