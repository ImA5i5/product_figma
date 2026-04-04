const router = require("express").Router();
const ShoeController = require("../controllers/shoe.controller");

//  PUBLIC SHOES (FILTER)
router.get("/shoes-get", ShoeController.getPublicShoes);

module.exports = router;