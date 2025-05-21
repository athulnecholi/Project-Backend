const mongoose=require('mongoose')
const turfSchema= new mongoose.Schema({
    name:{type:String,required:true},
    location: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  availability: [{ type: String }], // Example: ["10:00-11:00", "11:00-12:00"]
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Turf', turfSchema);
