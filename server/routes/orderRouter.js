const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleewares/authenticaton");
const { CreateOrder, createPaymentIntent } = require("../controllers/orderController");

router.route("/create").post(authMiddleware, CreateOrder);
router.route('/create-payment-intent').post(authMiddleware, createPaymentIntent)

module.exports = router;
