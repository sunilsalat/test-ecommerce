const { Joi } = require("express-validation");

// Auth Helpers
const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

const singUpValidation = {
  body: Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-z0-9]{3,30}/)
      .required(),
  }),
};

// Address Helpers

module.exports = { loginValidation, singUpValidation };
