exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    const role = req.user?.role || "public";

    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};