const express = require("express");
const { authMiddleware, isSeller } = require("../middleewares/authenticaton");
const {
  register,
  login,
  logout,
  checkRootUserInfo,
  setUpSeller,
} = require("../controllers/auth");

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);
router.route("/root-user").get(authMiddleware, checkRootUserInfo);
router.route("/add-seller").post([authMiddleware, isSeller], setUpSeller);

module.exports = router;
