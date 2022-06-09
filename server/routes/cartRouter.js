const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const {
  addToCart,
  removeFromCart,
  editCartItem,
  getAllCartItems
} = require("../controllers/cartController");

const router = express.Router();
router.route("/add/:productId").post(authMiddleware, addToCart);
router.route("/remove/:cartItemId").delete(authMiddleware, removeFromCart);
router.route("/edit/:cartItemId").put(authMiddleware, editCartItem);
router.route("/all").get(authMiddleware, getAllCartItems);

module.exports = router;
