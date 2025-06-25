const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Reviews = require("./review.model");
const Products = require("../product/product.model");

// Post a review
router.post("/post-review", async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;

    if (!comment || !rating || !productId || !userId) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Validate ObjectId formats
    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).send({ message: "Invalid userId or productId format" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    console.log("Posting review:", { comment, rating, productId, userId });

    // Check if review already exists for the user & product
    const existingReview = await Reviews.findOne({
      productId: productObjectId,
      userId: userObjectId
    });

    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      const newReview = new Reviews({
        comment,
        rating,
        productId: productObjectId,
        userId: userObjectId
      });
      await newReview.save();
    }

    // Get all reviews for product and calculate average
    const reviews = await Reviews.find({ productId: productObjectId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      const product = await Products.findById(productObjectId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).send({ message: "Product not found" });
      }
    }

    res.status(200).send({
      message: "Review posted successfully",
      reviews: reviews,
    });

  } catch (error) {
    console.error("❌ Error posting review:", error);
    res.status(500).send({ message: "Failed to post review", error: error.message });
  }
});

// Get total reviews count
router.get("/total-reviews", async (req, res) => {
  try {
    const totalReviews = await Reviews.countDocuments({});
    res.status(200).send({ totalReviews });
  } catch (error) {
    console.error("Error getting total reviews", error);
    res.status(500).send({ message: "Failed to get review count" });
  }
});

// Get reviews by user ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: "Valid user ID is required" });
  }

  try {
    const reviews = await Reviews.find({ userId }).sort({ createdAt: -1 });
    if (reviews.length === 0) {
      return res.status(404).send({ message: "No review found" });
    }
    res.status(200).send(reviews);
  } catch (error) {
    console.error("Error fetching reviews by user", error);
    res.status(500).send({ message: "Failed to fetch reviews by user" });
  }
});
router.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).send({ message: "Invalid product ID" });
  }

  try {
    const reviews = await Reviews.find({ productId })
      .sort({ createdAt: -1 })
      .populate("userId", "username"); // optional: populate user details
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).send({ message: "Failed to fetch reviews" });
  }
});

module.exports = router;
