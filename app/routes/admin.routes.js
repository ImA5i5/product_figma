const router = require("express").Router();

const CategoryController = require("../controllers/category.controller");
const { allowRoles } = require("../middlewares/auth.middleware");

const BrandController = require("../controllers/brand.controller");
const { upload, uploadToCloudinary } = require("../middlewares/upload.middleware");

const ShoeController = require("../controllers/shoe.controller");
const UserController=require("../controllers/user.controller")

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin APIs (Category, Brand, Shoes)
 */

//  CATEGORY ROUTES (ADMIN ONLY)

// CREATE

// CREATE CATEGORY

/**
 * @swagger
 * /admin/category:
 *   post:
 *     summary: Create a new category
 *     description: Admin can create a new product category
 *     tags: [Admin - Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sports
 *               description:
 *                 type: string
 *                 example: Shoes for sports activities
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post(
  "/category",
  allowRoles("admin"),
  CategoryController.create
);


// GET ALL CATEGORIES

/**
 * @swagger
 * /admin/category:
 *   get:
 *     summary: Get all categories
 *     description: Admin can fetch all categories
 *     tags: [Admin - Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/category",
  allowRoles("admin"),
  CategoryController.getAll
);


// GET SINGLE CATEGORY

/**
 * @swagger
 * /admin/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve details of a specific category
 *     tags: [Admin - Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: 64abc123
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */
router.get(
  "/category/:id",
  allowRoles("admin"),
  CategoryController.getOne
);


// UPDATE CATEGORY

/**
 * @swagger
 * /admin/category/{id}:
 *   put:
 *     summary: Update a category
 *     description: Admin can update category details
 *     tags: [Admin - Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: 64abc123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Sports
 *               description:
 *                 type: string
 *                 example: Updated description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put(
  "/category/:id",
  allowRoles("admin"),
  CategoryController.update
);


// DELETE CATEGORY

/**
 * @swagger
 * /admin/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Admin can delete a category
 *     tags: [Admin - Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: 64abc123
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete(
  "/category/:id",
  allowRoles("admin"),
  CategoryController.delete
);

// CREATE BRAND

/**
 * @swagger
 * /admin/brand:
 *   post:
 *     summary: Create a new brand
 *     description: Admin can create a brand with logo upload
 *     tags: [Admin - Brand]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nike
 *               description:
 *                 type: string
 *                 example: Sports brand
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Brand created successfully
 *       400:
 *         description: Brand already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post(
  "/brand",
  allowRoles("admin"),
  upload.single("logo"),
  uploadToCloudinary("brands"),
  BrandController.create
);


// GET ALL BRANDS

/**
 * @swagger
 * /admin/brand:
 *   get:
 *     summary: Get all brands
 *     description: Admin can retrieve all brands
 *     tags: [Admin - Brand]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of brands
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/brand",
  allowRoles("admin"),
  BrandController.getAll
);


// GET SINGLE BRAND

/**
 * @swagger
 * /admin/brand/{id}:
 *   get:
 *     summary: Get brand by ID
 *     description: Retrieve details of a specific brand
 *     tags: [Admin - Brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand ID
 *         schema:
 *           type: string
 *           example: 64abc456
 *     responses:
 *       200:
 *         description: Brand details
 *       404:
 *         description: Brand not found
 */
router.get(
  "/brand/:id",
  allowRoles("admin"),
  BrandController.getOne
);


// UPDATE BRAND

/**
 * @swagger
 * /admin/brand/{id}:
 *   put:
 *     summary: Update a brand
 *     description: Admin can update brand details and logo
 *     tags: [Admin - Brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand ID
 *         schema:
 *           type: string
 *           example: 64abc456
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Adidas
 *               description:
 *                 type: string
 *                 example: Updated brand description
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       404:
 *         description: Brand not found
 */
router.put(
  "/brand/:id",
  allowRoles("admin"),
  upload.single("logo"),
  uploadToCloudinary("brands"),
  BrandController.update
);


// DELETE BRAND

/**
 * @swagger
 * /admin/brand/{id}:
 *   delete:
 *     summary: Delete a brand
 *     description: Admin can delete a brand
 *     tags: [Admin - Brand]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand ID
 *         schema:
 *           type: string
 *           example: 64abc456
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 */
router.delete(
  "/brand/:id",
  allowRoles("admin"),
  BrandController.delete
);

//  ADMIN SHOE ROUTES

// CREATE SHOE

/**
 * @swagger
 * /admin/shoes:
 *   post:
 *     summary: Create a new shoe
 *     description: Admin can create a shoe with image upload
 *     tags: [Admin - Shoes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - brand
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nike Air Max
 *               price:
 *                 type: number
 *                 example: 5000
 *               brand:
 *                 type: string
 *                 example: 64abc456
 *               category:
 *                 type: string
 *                 example: 64abc123
 *               color:
 *                 type: string
 *                 example: red
 *               size:
 *                 type: number
 *                 example: 42
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Shoe created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/shoes",
  allowRoles("admin"),
  upload.single("image"),
  uploadToCloudinary("shoes"),
  ShoeController.create
);


// GET ALL SHOES (ADMIN)

/**
 * @swagger
 * /admin/shoes:
 *   get:
 *     summary: Get all shoes (Admin)
 *     description: Retrieve all shoes including published and unpublished
 *     tags: [Admin - Shoes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shoes
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/shoes",
  allowRoles("admin"),
  ShoeController.getAdminShoes
);


// GET SINGLE SHOE

/**
 * @swagger
 * /admin/shoes/{id}:
 *   get:
 *     summary: Get a shoe by ID
 *     description: Retrieve details of a specific shoe
 *     tags: [Admin - Shoes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shoe ID
 *         schema:
 *           type: string
 *           example: 64shoe123
 *     responses:
 *       200:
 *         description: Shoe details
 *       404:
 *         description: Shoe not found
 */
router.get(
  "/shoes/:id",
  allowRoles("admin"),
  ShoeController.getOne
);


// UPDATE SHOE

/**
 * @swagger
 * /admin/shoes/{id}:
 *   put:
 *     summary: Update a shoe
 *     description: Admin can update shoe details and image
 *     tags: [Admin - Shoes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shoe ID
 *         schema:
 *           type: string
 *           example: 64shoe123
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Nike
 *               price:
 *                 type: number
 *                 example: 5500
 *               color:
 *                 type: string
 *                 example: black
 *               size:
 *                 type: number
 *                 example: 43
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Shoe updated successfully
 *       404:
 *         description: Shoe not found
 */
router.put(
  "/shoes/:id",
  allowRoles("admin"),
  upload.single("image"),
  uploadToCloudinary("shoes"),
  ShoeController.update
);


// DELETE SHOE

/**
 * @swagger
 * /admin/shoes/{id}:
 *   delete:
 *     summary: Delete a shoe
 *     description: Admin can delete a shoe
 *     tags: [Admin - Shoes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shoe ID
 *         schema:
 *           type: string
 *           example: 64shoe123
 *     responses:
 *       200:
 *         description: Shoe deleted successfully
 *       404:
 *         description: Shoe not found
 */
router.delete(
  "/shoes/:id",
  allowRoles("admin"),
  ShoeController.delete
);


// PUBLISH SHOE

/**
 * @swagger
 * /admin/shoes/{id}/publish:
 *   patch:
 *     summary: Publish a shoe
 *     description: Make a shoe visible to public users
 *     tags: [Admin - Shoes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shoe ID
 *         schema:
 *           type: string
 *           example: 64shoe123
 *     responses:
 *       200:
 *         description: Shoe published successfully
 */
router.patch(
  "/shoes/:id/publish",
  allowRoles("admin"),
  ShoeController.publish
);


// UNPUBLISH SHOE

/**
 * @swagger
 * /admin/shoes/{id}/unpublish:
 *   patch:
 *     summary: Unpublish a shoe
 *     description: Hide a shoe from public users
 *     tags: [Admin - Shoes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shoe ID
 *         schema:
 *           type: string
 *           example: 64shoe123
 *     responses:
 *       200:
 *         description: Shoe unpublished successfully
 */
router.patch(
  "/shoes/:id/unpublish",
  allowRoles("admin"),
  ShoeController.unpublish
);


/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     description: Admin can view all registered users
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get(
  "/users",
  allowRoles("admin"),
  UserController.getAllUsers
);

/**
 * @swagger
 * /admin/user-login-stats:
 *   get:
 *     summary: Get users who have logged in (role = user)
 *     description: Admin can see how many users have logged in at least once along with their details
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users who have logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalLoggedInUsers:
 *                   type: number
 *                   example: 3
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                       lastLogin:
 *                         type: string
 *                         format: date-time
 */
router.get(
  "/user-login-stats",
  allowRoles("admin"),
  UserController.getUserLoginStats
);

module.exports = router;