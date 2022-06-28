const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const {
  addToCart,
  removeFromCart,
  editCartItem,
  getAllCartItems,
  addShippingAddress,
  clearCartItems,
} = require("../controllers/cartController");

const router = express.Router();
router.route("/add/:productId").post(authMiddleware, addToCart);
router.route("/remove/:productId").delete(authMiddleware, removeFromCart);
router.route("/edit/:productId").put(authMiddleware, editCartItem);
router.route("/all").get(authMiddleware, getAllCartItems);
router.route("/add-shi-add").post(authMiddleware, addShippingAddress);
router.route("/clear").delete(authMiddleware, clearCartItems);

module.exports = router;
