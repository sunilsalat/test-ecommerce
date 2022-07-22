const express = require("express");
const { authMiddleware, isSeller } = require("../middleewares/authenticaton");
const { validate } = require("express-validation");
const { loginValidation, singUpValidation } = require("../utlis/helpler");
const {
  register,
  login,
  logout,
  checkRootUserInfo,
  setUpSeller,
} = require("../controllers/auth");

const router = express.Router();
router.route("/register").post(validate(singUpValidation), register);
router.route("/login").post(validate(loginValidation), login);
router.route("/logout").delete(authMiddleware, logout);
router.route("/root-user").get(authMiddleware, checkRootUserInfo);
router.route("/add-seller").post([authMiddleware, isSeller], setUpSeller);

module.exports = router;
