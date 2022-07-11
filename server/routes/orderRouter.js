<<<<<<< HEAD

=======
>>>>>>> e7d70c2871b52ecafd9c4a97b0ba41bde6d8e95b
const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middleewares/authenticaton");
<<<<<<< HEAD
const { CreateOrder } = require("../controllers/orderController");

router.route("/create").post(authMiddleware, CreateOrder);
=======
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
>>>>>>> e7d70c2871b52ecafd9c4a97b0ba41bde6d8e95b

module.exports = router;
