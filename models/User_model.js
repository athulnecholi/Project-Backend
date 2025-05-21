const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});
module.exports = mongoose.model('User', userschema);
