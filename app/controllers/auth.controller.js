const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/generateToken");
const { sendEmail } = require("../utils/sendEmail");

class AuthController {
  //  REGISTER
  static async register(req, res) {
    // try {
    //   const { name, email, password, role } = req.body;

    //   // check existing user
    //   const existing = await User.findOne({ email });
    //   if (existing) {
    //     return res.status(400).json({
    //       message: "User already exists"
    //     });
    //   }

    //   // hash password
    //   const hashedPassword = await bcrypt.hash(password, 10);

    //   // generate OTP
    //   const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //   const user = await User.create({
    //     name,
    //     email,
    //     password: hashedPassword,
    //     role,
    //     otp,
    //     otpExpiry: Date.now() + 10 * 60 * 1000
    //   });

    //   await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);

    //   return res.status(201).json({
    //     message: "User registered. OTP sent to email"
    //   });
    // } catch (error) {
    //   return res.status(500).json({
    //     message: error.message
    //   });
    // }
    try {
      const { name, email, password, role } = req.body;

      // check existing user
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({
          message: "User already exists"
        });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create user (directly verified)
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        isVerified: true // ✅ no OTP required
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  VERIFY OTP
  static async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({
          message: "Invalid or expired OTP"
        });
      }

      user.isVerified = true;
      user.otp = null;
      user.otpExpiry = null;

      await user.save();

      return res.json({
        message: "Email verified successfully"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  LOGIN
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "Invalid credentials"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials"
        });
      }

      if (!user.isVerified) {
        return res.status(400).json({
          message: "Please verify your email first"
        });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      user.refreshToken = refreshToken;
       user.lastLogin = new Date();
    user.isLoggedIn = true;
      await user.save();

      return res.json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  //  REFRESH TOKEN
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          message: "Refresh token required"
        });
      }

      const decoded = require("jsonwebtoken").verify(
        refreshToken,
        process.env.REFRESH_SECRET
      );

      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({
          message: "Invalid refresh token"
        });
      }

      const newAccessToken = generateAccessToken(user);

      return res.json({
        accessToken: newAccessToken
      });
    } catch (error) {
      return res.status(403).json({
        message: "Invalid or expired refresh token"
      });
    }
  }
}

module.exports = AuthController;