const express = require('express');
const router = express.Router();
const { addReview } = require('../controllers/reviewController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, addReview);
module.exports = router;