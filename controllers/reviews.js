const Idea = require("../models/idea");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  idea.reviews.push(review);
  await review.save();
  await idea.save();
  req.flash("success", "Created new review!");
  res.redirect(`/ideas/${idea._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Idea.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review");
  res.redirect(`/ideas/${id}`);
};
