const express = require('express');
const router = express.Router();
const { addReview,getReviewsForTurf } = require('../controllers/reviewController');
const auth = require('../middlewares/authMiddleware');

router.post('/addreview/:id/', auth, addReview);
router.get('/getReview/:id', getReviewsForTurf);


module.exports = router;