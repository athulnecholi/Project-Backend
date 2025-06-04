const User = require("../models/User_model");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
exports.uploadProfile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No profile picture uploaded' });
  }

  const imagePath = `/uploads/profiles/${req.file.filename}`;

  // Here you could also save `imagePath` to user in DB
  res.status(200).json({
    message: 'Profile picture uploaded successfully!',
    imageUrl: imagePath
  });
};


