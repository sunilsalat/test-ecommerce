const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const router = express.Router();
const {
  getAllProducts,
  getProductDetail,
  createProduct,
  editProduct,
} = require("../controllers/productController");

router.route("/all").get(getAllProducts);
router.route("/detail/:id").get(getProductDetail);
router.route("/create").post(authMiddleware, createProduct);
router.route("/edit/:id").put(authMiddleware, editProduct);

module.exports = router;
