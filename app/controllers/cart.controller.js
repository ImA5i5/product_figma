const Cart = require("../models/cart.model");

class CartController {
  //  ADD TO CART
  static async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity = 1 } = req.body;

      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        cart = await Cart.create({
          user: userId,
          items: [{ product: productId, quantity }]
        });
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity });
        }

        await cart.save();
      }

      return res.json({
        message: "Added to cart",
        data: cart
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  GET CART
  static async getCart(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
      );

      return res.json({
        data: cart || { items: [] }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  UPDATE CART ITEM
  static async updateCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      const cart = await Cart.findOne({ user: userId});

      if (!cart) {
        return res.status(404).json({
          message: "Cart not found"
        });
      }

      const item = cart.items.find(
        (i) => i.product.toString() === productId
      );

      if (!item) {
        return res.status(404).json({
          message: "Item not found in cart"
        });
      }

      item.quantity = quantity;
      await cart.save();

      return res.json({
        message: "Cart updated",
        data: cart
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  REMOVE ITEM FROM CART
  static async removeItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({
          message: "Cart not found"
        });
      }

      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );

      await cart.save();

      return res.json({
        message: "Item removed from cart",
        data: cart
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  CLEAR CART
  static async clearCart(req, res) {
    try {
      const userId = req.user.id;

      await Cart.findOneAndUpdate(
        { user: userId },
        { items: [] }
      );

      return res.json({
        message: "Cart cleared"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = CartController;