const express = require("express");

const router = express.Router();
const { authMiddleware, isSeller } = require("../middleewares/authenticaton");
const {
  CreateOrder,
  createPaymentIntent,
  OrderDetail,
  UpdateOrder,
  getAllSellersOrder,
  markOrderDeliverd,
} = require("../controllers/orderController");

router.route("/create").post(authMiddleware, CreateOrder);
router
  .route("/create-payment-intent")
  .post(authMiddleware, createPaymentIntent);
router.route("/detail/:orderId").get(authMiddleware, OrderDetail);
router.route("/updateOrder").post(authMiddleware, UpdateOrder);
router
  .route("/get-all-seller-order")
  .get([authMiddleware, isSeller], getAllSellersOrder);
router
  .route("/mark-deliverd")
  .post([authMiddleware, isSeller], markOrderDeliverd);

module.exports = router;
