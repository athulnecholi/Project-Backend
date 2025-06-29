const Booking = require("../models/Bookings_model");
const Turf = require("../models/Turf_model");

exports.bookTurf = async (req, res) => {
  try {
    const { turfId, timeSlot, date } = req.body;

    // Validate turf existence
    const turf = await Turf.findById(turfId);
    if (!turf) return res.status(404).json({ msg: "Turf not found" });

    //  Check if requested slot is in turf's available time slots
    if (!turf.availability.includes(timeSlot)) {
      return res.status(400).json({ msg: "Time slot not available" });
    }

    // Prevent double booking (unless cancelled)
    const existingBooking = await Booking.findOne({
      turf: turfId,
      timeSlot,
      date,
      status: { $ne: 'cancelled' },
    });
    if (existingBooking) {
      return res.status(409).json({ msg: "Time slot already booked" });
    }

    //  Create booking with "pending" status
    const booking = new Booking({
      userId: req.user.id,
      turfId: turfId,
      timeSlot,
      date,
      status: "pending", // <- Required Change
    });

    await booking.save();
    res.status(201).json({
      msg: "Booking request sent. Awaiting manager approval.",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
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
// controllers/bookingController.js
exports.updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body; // status can be "accepted" or "rejected"

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ msg: `Booking ${status} successfully`, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.getManagerBookings = async (req, res) => {
  try {
    // Get manager ID from token
    const managerId = req.user.id;

    // Get all turfs owned by this manager
    const turfs = await Turf.find({ managerId }).select('_id');
    const turfIds = turfs.map(t => t._id);

    // Find bookings for those turfs
    const bookings = await Booking.find({ turfId: { $in: turfIds } })
      .populate('userId', 'name email')
      .populate('turfId', 'name location');

    res.json(bookings);
  } catch (err) {
    console.error("Manager booking fetch error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
