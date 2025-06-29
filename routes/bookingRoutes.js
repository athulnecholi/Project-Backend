const express = require('express');
const router = express.Router();
const { bookTurf, cancelBooking, myBookings, updateBookingStatus, getManagerBookings } = require('../controllers/bookingController');
const auth = require('../middlewares/authMiddleware');


router.post('/', auth, bookTurf);
router.get('/myBookings',auth,myBookings)
router.patch('/:id/cancel', auth, cancelBooking);

router.put('/status', auth, updateBookingStatus);
router.get('/manager', auth, getManagerBookings);


module.exports = router;