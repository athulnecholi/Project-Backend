const express = require('express');
const router = express.Router();
const Review = require('../models/Review_model');
const auth = require('../middlewares/authMiddleware');

// Add a review
router.post('/', auth, async (req, res) => {
  const { turfId, rating, comment } = req.body;

  const review = new Review({
    userId: req.user.id,
    turfId,
    rating,
    comment
  });

  await review.save();
  res.status(201).json(review);
});

module.exports = router;
