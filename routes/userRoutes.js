const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const { uploadProfilePic } = require('../middlewares/multerConfig')
const { uploadProfile ,getProfile,updateProfilePic} = require('../controllers/userController');

router.get('/me', auth, getProfile);

router.post(
  '/upload-profile',
  uploadProfilePic.single('profilePic'), // Multer middleware
  uploadProfile                         // Controller
);
router.put('/user/profile-pic', auth,uploadProfilePic.single('profilePic'), updateProfilePic);


module.exports = router;

