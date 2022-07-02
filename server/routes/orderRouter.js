const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleewares/authenticaton");
const {
  CreateOrder,
  createPaymentIntent,
  OrderDetail,
  UpdateOrder,
} = require("../controllers/orderController");

router.route("/create").post(authMiddleware, CreateOrder);
router
  .route("/create-payment-intent")
  .post(authMiddleware, createPaymentIntent);
router.route("/detail/:orderId").get(authMiddleware, OrderDetail);
router.route("/updateOrder").post(authMiddleware, UpdateOrder);

module.exports = router;
