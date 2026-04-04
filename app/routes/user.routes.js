const router = require("express").Router();

const CartController = require("../controllers/cart.controller");
const { allowRoles } = require("../middlewares/auth.middleware");

const WishlistController = require("../controllers/wishlist.controller");

const ReviewController = require("../controllers/review.controller");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User APIs (Cart, Wishlist, Review)
 */

//  CART ROUTES (USER ONLY)

// ADD

/**
 * @swagger
 * /user/cart:
 *   post:
 *     summary: Add product to cart
 *     description: Add a product with quantity to user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64shoe123
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart
 *       401:
 *         description: Unauthorized
 */
router.post("/cart", allowRoles("user"), CartController.addToCart);

// GET CART 

/**
 * @swagger
 * /user/cart:
 *   get:
 *     summary: Get user cart
 *     description: Retrieve all items in user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
router.get("/cart", allowRoles("user"), CartController.getCart);

// UPDATE CART 

/**
 * @swagger
 * /user/cart:
 *   put:
 *     summary: Update cart item quantity
 *     description: Update quantity of a product in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64shoe123
 *               quantity:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */
router.put("/cart", allowRoles("user"), CartController.updateCart);

// REMOVE ITEM 

/**
 * @swagger
 * /user/cart/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     description: Remove a specific product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 64shoe123
 *     responses:
 *       200:
 *         description: Item removed successfully
 */
router.delete(
  "/cart/:productId",
  allowRoles("user"),
  CartController.removeItem
);

// CLEAR CART 

/**
 * @swagger
 * /user/cart:
 *   delete:
 *     summary: Clear cart
 *     description: Remove all items from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */
router.delete("/cart", allowRoles("user"), CartController.clearCart);

// ADD TO WISHLIST 

/**
 * @swagger
 * /user/wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     description: Add a product to user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64shoe123
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *       400:
 *         description: Already in wishlist
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/wishlist",
  allowRoles("user"),
  WishlistController.add
);

// GET WISHLIST 

/**
 * @swagger
 * /user/wishlist:
 *   get:
 *     summary: Get wishlist
 *     description: Retrieve all wishlist items of user
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 */
router.get(
  "/wishlist",
  allowRoles("user"),
  WishlistController.get
);

// REMOVE FROM WISHLIST 

/**
 * @swagger
 * /user/wishlist/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     description: Remove a specific product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 64shoe123
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       404:
 *         description: Item not found
 */
router.delete(
  "/wishlist/:productId",
  allowRoles("user"),
  WishlistController.remove
);

//  REVIEW ROUTES (USER ONLY)

// CREATE / UPDATE REVIEW 

/**
 * @swagger
 * /user/review:
 *   post:
 *     summary: Create or update a review
 *     description: User can add or update a review for a product (one review per user per product)
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - rating
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64shoe123
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Great product!
 *     responses:
 *       200:
 *         description: Review submitted successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/review",
  allowRoles("user"),
  ReviewController.createOrUpdate
);

// GET REVIEWS (PUBLIC) 

/**
 * @swagger
 * /user/review/{productId}:
 *   get:
 *     summary: Get reviews for a product
 *     description: Public API to fetch all reviews for a specific product
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: 64shoe123
 *     responses:
 *       200:
 *         description: List of reviews
 *       404:
 *         description: Product not found
 */
router.get(
  "/review/:productId",
  ReviewController.getByProduct
);

// DELETE REVIEW 

/**
 * @swagger
 * /user/review/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     description: User can delete their own review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *           example: 64review123
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete(
  "/review/:reviewId",
  allowRoles("user"),
  ReviewController.delete
);

module.exports = router;