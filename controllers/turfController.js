const Turf = require("../models/Turf_model");


exports.getAllTurfs = async (req, res) => {
  const turfs = await Turf.find();
  res.json(turfs);
};
//create turf 
exports.createTurf = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ msg: "Access denied" });
  }
  const turf = new Turf({ ...req.body, managerId: req.user.id });
  await turf.save();
  res.status(201).json(turf);
};

exports.deleteTurf = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({ msg: "Access denied" });
  }
  try {
    const deleteTurf = await Turf.findByIdAndDelete(req.body.turfId);
    if (!deleteTurf) return res.status(404).json({ msg: "Turf not found" });
    res.json({ msg: "Turf deleted successfully", deleteTurf });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
exports.uploadTurf = (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: 'No turf image uploaded' });
  }
  if (req.user.rol!='manager' && req.user.role!='admin'){
    return res.status(403).json({msg:"Only Admins or managers can upload Turf images!"});
    

  }

  const turfImagePath = `/uploads/turfs/${req.file.filename}`;

  // Save to DB if needed
  res.status(200).json({
    message: 'Turf image uploaded successfully!',
    imageUrl: turfImagePath
  });
};

