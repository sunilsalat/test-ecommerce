const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({ msg: err.message });
  next();
};

module.exports = { errorHandlerMiddleware };
