const Wishlist = require("../models/wishlist.model");

class WishlistController {
  // ✅ ADD TO WISHLIST
  static async add(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      let wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        wishlist = await Wishlist.create({
          user: userId,
          products: [productId]
        });
      } else {
        const exists = wishlist.products.includes(productId);

        if (exists) {
          return res.json({
            message: "Already in wishlist"
          });
        }

        wishlist.products.push(productId);
        await wishlist.save();
      }

      return res.json({
        message: "Added to wishlist",
        data: wishlist
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // ✅ GET WISHLIST
  static async get(req, res) {
    try {
      const userId = req.user.id;

      const wishlist = await Wishlist.findOne({ user: userId })
        .populate("products");

      return res.json({
        data: wishlist || { products: [] }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // ✅ REMOVE FROM WISHLIST
  static async remove(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      const wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        return res.status(404).json({
          message: "Wishlist not found"
        });
      }

      wishlist.products = wishlist.products.filter(
        (p) => p.toString() !== productId
      );

      await wishlist.save();

      return res.json({
        message: "Removed from wishlist",
        data: wishlist
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = WishlistController;