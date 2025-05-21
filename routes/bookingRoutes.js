const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings_model');
const Turf = require('../models/Turf_model');
const auth = require('../middlewares/authMiddleware');




router.post('/', auth, async (req, res) => {
  try {
    const { turfId, timeSlot, date } = req.body;

    // 1. Validate turf existence
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ msg: 'Turf not found' });
    }

    // 2. Check if the time slot is available on that turf
    if (!turf.availability.includes(timeSlot)) {
      return res.status(400).json({ msg: 'Time slot not available on this turf' });
    }

    // 3. Check if someone has already booked this turf at the given time & date
    const existingBooking = await Booking.findOne({
      turfId,
      timeSlot,
      date,
      status: { $ne: 'cancelled' } // only consider active bookings
    });

    if (existingBooking) {
      return res.status(409).json({ msg: 'This time slot is already booked' });
    }

    // 4. Create and save the booking
    const booking = new Booking({
      userId: req.user.id,
      turfId,
      timeSlot,
      date
    });

    await booking.save();
    res.status(201).json({ msg: 'Booking confirmed', booking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error while booking' });
  }
  router.patch('/:id/cancel', auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking.userId.toString() !== req.user.id) {
    return res.status(403).json({ msg: 'Unauthorized' });
  }

  booking.status = 'cancelled';
  await booking.save();
  res.json({ msg: 'Booking cancelled' });
});

});
module.exports = router;

