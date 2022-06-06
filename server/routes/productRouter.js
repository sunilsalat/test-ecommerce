const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");

const {
  getAllProducts,
  getProductDetail,
  createProduct,
  editProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/detail/:id").get(getProductDetail);
router.route("/create").post(authMiddleware, createProduct);
router.route("/edit/:id").put(authMiddleware, editProduct);

module.exports = router;
