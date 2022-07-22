const { ValidationError } = require("express-validation");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({ msg: err.details.body[0].message });
  } else {
    res.status(err.statusCode || 500).json({ msg: err.message });
  }
  next();
};

module.exports = { errorHandlerMiddleware };
