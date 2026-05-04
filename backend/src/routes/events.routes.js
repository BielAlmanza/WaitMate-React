const router = require('express').Router();
const ctrl = require('../controllers/events.controller');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', auth, ctrl.getEvents);
router.get('/nearby', auth, ctrl.getNearbyEvents);
router.get('/:id', auth, ctrl.getEventById);
router.post('/', auth, upload.single('image'), ctrl.createEvent);
router.get('/:id/ride-requests', auth, ctrl.getEventRideRequests);
router.post('/:id/ride-requests', auth, ctrl.createRideRequest);

module.exports = router;
