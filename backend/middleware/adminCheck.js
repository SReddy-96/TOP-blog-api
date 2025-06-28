const adminCheck = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    const err = new Error("FORBIDDEN. ADMIN ONLY");
    err.statusCode = 403;
    return next(err);
  }
  next();
};

module.exports = adminCheck;
