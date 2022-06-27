const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const {
  addToCart,
  removeFromCart,
  editCartItem,
  getAllCartItems,
} = require("../controllers/cartController");

const router = express.Router();
router.route("/add/:productId").post(authMiddleware, addToCart);
router.route("/remove/:productId").delete(authMiddleware, removeFromCart);
router.route("/edit/:productId").put(authMiddleware, editCartItem);
router.route("/all").get(authMiddleware, getAllCartItems);

module.exports = router;
