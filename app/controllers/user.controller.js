const User = require("../models/user.model");

class UserController {
  // GET ALL USERS (ADMIN)
  static async getAllUsers(req, res) {
    try {
      const users = await User.find()
        .select("-password") // hide password
        .sort({ createdAt: -1 });

      return res.json({
        count: users.length,
        data: users
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
  static async getLoggedInUsers(req, res) {
  try {
    const users = await User.find({ isLoggedIn: true })
      .select("-password")
      .sort({ lastLogin: -1 });

    return res.json({
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}
}

module.exports = UserController;