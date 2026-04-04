const router = require("express").Router();

const CategoryController = require("../controllers/category.controller");
const { allowRoles } = require("../middlewares/auth.middleware");

const BrandController = require("../controllers/brand.controller");
const { upload, uploadToCloudinary } = require("../middlewares/upload.middleware");

const ShoeController = require("../controllers/shoe.controller");

//  CATEGORY ROUTES (ADMIN ONLY)

// CREATE
router.post(
  "/category",
  allowRoles("admin"),
  CategoryController.create
);

// READ ALL
router.get(
  "/category",
  allowRoles("admin"),
  CategoryController.getAll
);

// READ ONE
router.get(
  "/category/:id",
  allowRoles("admin"),
  CategoryController.getOne
);

// UPDATE
router.put(
  "/category/:id",
  allowRoles("admin"),
  CategoryController.update
);

// DELETE
router.delete(
  "/category/:id",
  allowRoles("admin"),
  CategoryController.delete
);

//  BRAND ROUTES (ADMIN ONLY)

// CREATE
router.post(
  "/brand",
  allowRoles("admin"),
  upload.single("logo"),
  uploadToCloudinary("brands"),
  BrandController.create
);

// READ ALL
router.get(
  "/brand",
  allowRoles("admin"),
  BrandController.getAll
);

// READ ONE
router.get(
  "/brand/:id",
  allowRoles("admin"),
  BrandController.getOne
);

// UPDATE
router.put(
  "/brand/:id",
  allowRoles("admin"),
  upload.single("logo"),
  uploadToCloudinary("brands"),
  BrandController.update
);

// DELETE
router.delete(
  "/brand/:id",
  allowRoles("admin"),
  BrandController.delete
);

//  ADMIN SHOE ROUTES

// CREATE
router.post(
  "/shoes",
  allowRoles("admin"),
  upload.single("image"),
  uploadToCloudinary("shoes"),
  ShoeController.create
);

// READ ALL (admin)
router.get(
  "/shoes",
  allowRoles("admin"),
  ShoeController.getAdminShoes
);

// READ ONE
router.get(
  "/shoes/:id",
  allowRoles("admin"),
  ShoeController.getOne
);

// UPDATE
router.put(
  "/shoes/:id",
  allowRoles("admin"),
  upload.single("image"),
  uploadToCloudinary("shoes"),
  ShoeController.update
);

// DELETE
router.delete(
  "/shoes/:id",
  allowRoles("admin"),
  ShoeController.delete
);

// PUBLISH
router.patch(
  "/shoes/:id/publish",
  allowRoles("admin"),
  ShoeController.publish
);

// UNPUBLISH
router.patch(
  "/shoes/:id/unpublish",
  allowRoles("admin"),
  ShoeController.unpublish
);

module.exports = router;