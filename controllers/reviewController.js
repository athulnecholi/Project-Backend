const Review = require("../models/Review_model");
const Turf = require("../models/Turf_model");
exports.getReviewsForTurf = async (req, res) => {
  try {
    const turfId = req.params.id;

    const reviews = await Review.find({ turfId }).populate('userId', 'name'); 
    const formatted = reviews.map(r => ({
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      user: { name: r.userId.name }
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ msg: 'Error fetching reviews' });
  }
};

exports.addReview = async (req, res) => {
  try {
    console.log("Inside addReview. Turf ID:", req.params.id);
    const turfId = req.params.id; 
    const { rating, comment } = req.body;

    const turf = await Turf.findById(turfId);
    if (!turf) return res.status(404).json({ msg: "Turf not found" });

    // Create and save review
    const review = new Review({
      userId: req.user.id,
      turfId,
      rating,
      comment
    });

    await review.save();

    turf.reviews.push(review._id);
    await turf.save();

    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
