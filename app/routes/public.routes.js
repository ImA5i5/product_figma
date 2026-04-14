const router = require("express").Router();
const ShoeController = require("../controllers/shoe.controller");

/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Public APIs (No Authentication Required)
 */

/**
 * @swagger
 * /shoes-get:
 *   get:
 *     summary: Get all published shoes with filters and pagination
 *     description: Retrieve published shoes with filtering (by ID or name) and pagination support
 *     tags: [Public]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number
 *         schema:
 *           type: number
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of items per page
 *         schema:
 *           type: number
 *           example: 10
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (ObjectId OR name)
 *         examples:
 *           byId:
 *             value: 64abc123
 *           byName:
 *             value: nike
 *
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand (ObjectId OR name)
 *         examples:
 *           byId:
 *             value: 64abc456
 *           byName:
 *             value: adidas
 *
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by shoe color
 *         example: red
 *
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         description: Filter by shoe size
 *         example: 42
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *         example: 1000
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *         example: 5000
 *
 *     responses:
 *       200:
 *         description: Paginated list of filtered shoes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 20
 *                 page:
 *                   type: number
 *                   example: 1
 *                 totalPages:
 *                   type: number
 *                   example: 2
 *                 limit:
 *                   type: number
 *                   example: 10
 *                 count:
 *                   type: number
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: Nike Air Max
 *                       price:
 *                         type: number
 *                         example: 2999
 *                       color:
 *                         type: string
 *                         example: black
 *                       isPublished:
 *                         type: boolean
 *                         example: true
 *                       brand:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *       500:
 *         description: Server error
 */
//  PUBLIC SHOES (FILTER)
router.get("/shoes-get", ShoeController.getPublicShoes);

module.exports = router;