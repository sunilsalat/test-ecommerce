const { BaseError } = require("./baseError");

class BadRequest extends BaseError {
  constructor(message) {
    const statusCode = 400;
    super(message, statusCode);
  }
}

module.exports = { BadRequest };
