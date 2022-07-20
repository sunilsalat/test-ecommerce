const { BaseError } = require("./baseError");

class NotAuthorize extends BaseError {
  constructor(message) {
    const statusCode = 401;
    super(message, statusCode);
  }
}

module.exports = { NotAuthorize };
