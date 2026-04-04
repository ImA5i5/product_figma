const Review = require("../models/review.model");
const Shoe = require("../models/shoe.model");

class ReviewController {
  //  CREATE OR UPDATE REVIEW
  static async createOrUpdate(req, res) {
    try {
      const userId = req.user.id;
      const { productId, rating, comment } = req.body;

      let review = await Review.findOne({
        user: userId,
        product: productId
      });

      if (review) {
        // update existing review
        review.rating = rating;
        review.comment = comment;
        await review.save();
      } else {
        review = await Review.create({
          user: userId,
          product: productId,
          rating,
          comment
        });
      }

      //  Recalculate average rating
      const reviews = await Review.find({ product: productId });

      const totalReviews = reviews.length;
      const avgRating =
        reviews.reduce((acc, item) => acc + item.rating, 0) /
        totalReviews;

      await Shoe.findByIdAndUpdate(productId, {
        averageRating: avgRating,
        totalReviews
      });

      return res.json({
        message: "Review submitted successfully",
        data: review
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  GET REVIEWS FOR A PRODUCT
  static async getByProduct(req, res) {
    try {
      const { productId } = req.params;

      const reviews = await Review.find({ product: productId })
        .populate("user", "name email")
        .sort({ createdAt: -1 });

      return res.json({
        count: reviews.length,
        data: reviews
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  DELETE REVIEW (USER)
  static async delete(req, res) {
    try {
      const userId = req.user.id;
      const { reviewId } = req.params;

      const review = await Review.findOneAndDelete({
        _id: reviewId,
        user: userId
      });

      if (!review) {
        return res.status(404).json({
          message: "Review not found"
        });
      }

      //  Recalculate rating again
      const reviews = await Review.find({
        product: review.product
      });

      const totalReviews = reviews.length;

      const avgRating =
        totalReviews === 0
          ? 0
          : reviews.reduce((acc, item) => acc + item.rating, 0) /
            totalReviews;

      await Shoe.findByIdAndUpdate(review.product, {
        averageRating: avgRating,
        totalReviews
      });

      return res.json({
        message: "Review deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = ReviewController;