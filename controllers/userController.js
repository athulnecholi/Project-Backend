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
exports.updateProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;
    const profilePic = req.file.filename;

    const user = await User.findByIdAndUpdate(userId, { profilePic }, { new: true });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.status(200).json({ msg: 'Profile picture updated', profile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

