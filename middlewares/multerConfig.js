const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Storage for profile pictures
const profilePicStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profiles/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

// Storage for turf images
const turfImageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/turfs/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

// Two separate uploaders
const uploadProfilePic = multer({
  storage: profilePicStorage,
  fileFilter,
});

const uploadTurfImages = multer({
  storage: turfImageStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

module.exports = {
  uploadProfilePic,
  uploadTurfImages,
};

