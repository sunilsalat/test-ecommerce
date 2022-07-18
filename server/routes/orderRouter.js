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
  getAllOrderOfUser,
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
router.route("/get-all-user-order").get(authMiddleware, getAllOrderOfUser);

module.exports = router;
