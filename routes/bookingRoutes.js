const express = require('express');
const router = express.Router();
const { bookTurf, cancelBooking, myBookings } = require('../controllers/bookingController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, bookTurf);
router.get('/myBookings',auth,myBookings)
router.patch('/:id/cancel', auth, cancelBooking);
module.exports = router;