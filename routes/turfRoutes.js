const express = require('express');
const router = express.Router();
const { getAllTurfs, createTurf, deleteTurf,uploadTurf, getTurfByID, updateTurfByManager, getManagerTurfs, searchTurfs } = require('../controllers/turfController');
const auth = require('../middlewares/authMiddleware');
const { uploadTurfImages  } = require('../middlewares/multerConfig');
const { getManagers } = require('../controllers/userController');
router.get('/', getAllTurfs);
router.get('/:id',getTurfByID)
router.post('/create', auth, uploadTurfImages.array('images', 5),createTurf);
router.post('/delete', auth, deleteTurf);
router.get("/managers", auth,getManagers )
router.patch('/:id', auth, updateTurfByManager);
router.get('/manager/my-turfs', auth, getManagerTurfs);
router.get('/search',searchTurfs)

module.exports = router;
