const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);