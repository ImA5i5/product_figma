const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      req.user = null; // public
      return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token"
    });
  }
};

//  Role middleware
exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    try {
      const role = req.user?.role || "public";

      if (!roles.includes(role)) {
        return res.status(403).json({
          message: "Forbidden: Access denied"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};