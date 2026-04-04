const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

//  Auth APIs
router.post("/register", AuthController.register);
router.post("/verify-otp", AuthController.verifyOTP);
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;