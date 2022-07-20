const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.statusCode).json({ msg: err.message });
  next();
};

module.exports = { errorHandlerMiddleware };
