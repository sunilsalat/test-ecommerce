
const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleewares/authenticaton");
const { CreateOrder } = require("../controllers/orderController");

router.route("/create").post(authMiddleware, CreateOrder);

module.exports = router;
