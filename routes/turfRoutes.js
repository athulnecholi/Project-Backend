const express = require('express');
const router = express.Router();
const { getAllTurfs, createTurf, deleteTurf,uploadTurf, getTurfByID } = require('../controllers/turfController');
const auth = require('../middlewares/authMiddleware');
const { uploadTurfImages  } = require('../middlewares/multerConfig');
router.get('/', getAllTurfs);
router.get('/:id',getTurfByID)
router.post('/create', auth, uploadTurfImages.array('images', 5),createTurf);
router.post('/delete', auth, deleteTurf);

module.exports = router;
