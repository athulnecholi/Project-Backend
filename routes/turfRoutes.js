const express = require('express');
const router = express.Router();
const { getAllTurfs, createTurf, deleteTurf,uploadTurf } = require('../controllers/turfController');
const auth = require('../middlewares/authMiddleware');
const { uploadTurfImages  } = require('../middlewares/multerConfig');
router.get('/', getAllTurfs);
router.post('/', auth, createTurf);
router.post('/delete', auth, deleteTurf);
router.post('/upload-turf',auth,uploadTurfImages.single('turfImage'),     // Multer
  uploadTurf                               // Controller
);
module.exports = router;
