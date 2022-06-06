const express = require("express");
const { register, login, logout } = require("../controllers/auth");
const { authMiddleware } = require("../middleewares/authenticaton");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").delete(authMiddleware, logout);

module.exports = router;
