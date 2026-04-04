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
 *     summary: Get all published shoes with filters
 *     description: Retrieve all published shoes with optional filtering options
 *     tags: [Public]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *         example: 64abc123
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand ID
 *         example: 64abc456
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by shoe color
 *         example: red
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         description: Filter by shoe size
 *         example: 42
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *         example: 1000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *         example: 5000
 *     responses:
 *       200:
 *         description: List of filtered shoes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       color:
 *                         type: string
 *                       isPublished:
 *                         type: boolean
 *       500:
 *         description: Server error
 */

//  PUBLIC SHOES (FILTER)
router.get("/shoes-get", ShoeController.getPublicShoes);

module.exports = router;