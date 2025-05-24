const express = require('express');
const router = express.Router();
const { bookTurf, cancelBooking } = require('../controllers/bookingController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, bookTurf);
router.patch('/:id/cancel', auth, cancelBooking);
module.exports = router;