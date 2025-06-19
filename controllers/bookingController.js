const Booking = require("../models/Bookings_model");
const Turf = require("../models/Turf_model");

exports.bookTurf = async (req, res) => {
  try {
    const { turfId, timeSlot, date } = req.body;
    const turf = await Turf.findById(turfId);
    if (!turf) return res.status(404).json({ msg: "Turf not found" });
    if (!turf.availability.includes(timeSlot)) return res.status(400).json({ msg: "Time slot not available" });
    const existingBooking = await Booking.findOne({ turfId, timeSlot, date, status: { $ne: 'cancelled' } });
    if (existingBooking) return res.status(409).json({ msg: "Time slot already booked" });

    const booking = new Booking({ userId: req.user.id, turfId, timeSlot, date });
    await booking.save();
    res.status(201).json({ msg: "Booking confirmed", booking });
  } catch (error) {
    res.status(500).json({ msg: "Server error while booking" });
  }
};
exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('turfId');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found" });
    }

    res.status(200).json({ msg: "Booked turfs found", data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking.userId.toString() !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });
  booking.status = 'cancelled';
  await booking.save();
  res.json({ msg: "Booking cancelled" });
};
