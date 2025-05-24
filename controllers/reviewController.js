const Review = require("../models/Review_model");

exports.addReview = async (req, res) => {
  const { turfId, rating, comment } = req.body;
  const review = new Review({ userId: req.user.id, turfId, rating, comment });
  await review.save();
  res.status(201).json(review);
};