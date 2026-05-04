const router = require('express').Router();
const ctrl = require('../controllers/reviews.controller');
const auth = require('../middleware/auth');

router.post('/', auth, ctrl.createReview);

module.exports = router;
