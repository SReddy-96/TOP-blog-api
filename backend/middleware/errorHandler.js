const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    status,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
