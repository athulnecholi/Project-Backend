const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  turfId: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf', required: true },
  timeSlot: { type: String, required: true }, // "10:00-11:00"
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "cancelled"],
    default: 'pending'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
