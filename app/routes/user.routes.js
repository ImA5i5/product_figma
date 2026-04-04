const router = require("express").Router();

const CartController = require("../controllers/cart.controller");
const { allowRoles } = require("../middlewares/auth.middleware");

const WishlistController = require("../controllers/wishlist.controller");

const ReviewController = require("../controllers/review.controller");

//  CART ROUTES (USER ONLY)

// ADD
router.post(
  "/cart",
  allowRoles("user"),
  CartController.addToCart
);

// GET
router.get(
  "/cart",
  allowRoles("user"),
  CartController.getCart
);

// UPDATE
router.put(
  "/cart",
  allowRoles("user"),
  CartController.updateCart
);

// REMOVE ITEM
router.delete(
  "/cart/:productId",
  allowRoles("user"),
  CartController.removeItem
);

// CLEAR CART
router.delete(
  "/cart",
  allowRoles("user"),
  CartController.clearCart
);

// ADD
router.post(
  "/wishlist",
  allowRoles("user"),
  WishlistController.add
);

// GET
router.get(
  "/wishlist",
  allowRoles("user"),
  WishlistController.get
);

// REMOVE
router.delete(
  "/wishlist/:productId",
  allowRoles("user"),
  WishlistController.remove
);

//  REVIEW ROUTES (USER ONLY)

// CREATE / UPDATE
router.post(
  "/review",
  allowRoles("user"),
  ReviewController.createOrUpdate
);

// GET BY PRODUCT (PUBLIC)
router.get(
  "/review/:productId",
  ReviewController.getByProduct
);

// DELETE
router.delete(
  "/review/:reviewId",
  allowRoles("user"),
  ReviewController.delete
);

module.exports = router;