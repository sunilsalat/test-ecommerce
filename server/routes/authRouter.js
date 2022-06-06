const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const {
  register,
  login,
  logout,
  checkRootUserInfo,
} = require("../controllers/auth");

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);
router.route("/root-user").get(authMiddleware, checkRootUserInfo);

module.exports = router;
