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
static async getUserLoginStats(req, res) {
  try {
    const users = await User.find({
      role: "user",                 // only normal users
      lastLogin: { $ne: null }      // users who have logged in at least once
    })
      .select("-password -refreshToken")
      .sort({ lastLogin: -1 });

    return res.json({
      totalLoggedInUsers: users.length,
      users
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}
}

module.exports = UserController;