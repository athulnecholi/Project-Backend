const express = require('express');
const router = express.Router();
const { getAllTurfs, createTurf, deleteTurf } = require('../controllers/turfController');
const auth = require('../middlewares/authMiddleware');

router.get('/', getAllTurfs);
router.post('/', auth, createTurf);
router.post('/delete', auth, deleteTurf);
module.exports = router;
