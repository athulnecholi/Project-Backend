const Turf = require("../models/Turf_model");

//get all turf
exports.getAllTurfs = async (req, res) => {
  const turfs = await Turf.find();
  res.json(turfs);
};
//get turf by id

exports.getTurfByID = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id).populate({
      path: "reviews",
      populate: { path: "userId", select: "name" }, 
    });
    if (!turf) {
      return res.status(401).json({ msg: "No turf found" });
    }
    res.json(turf);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//create turf
exports.createTurf = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "manager") {
      return res.status(403).json({ msg: "Access denied" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "At least one image is required" });
    }
    const imageFilenames = req.files.map((file) => file.filename);
    const turf = new Turf({
      ...req.body,
      managerId: req.user.id,
      images: imageFilenames,
    });
    await turf.save();
    res.status(201).json(turf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteTurf = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "manager") {
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
    return res.status(400).json({ error: "No turf image uploaded" });
  }
  if (req.user.rol != "manager" && req.user.role != "admin") {
    return res
      .status(403)
      .json({ msg: "Only Admins or managers can upload Turf images!" });
  }

  const turfImagePath = `/uploads/turfs/${req.file.filename}`;

  // Save to DB if needed
  res.status(200).json({
    message: "Turf image uploaded successfully!",
    imageUrl: turfImagePath,
  });
};
