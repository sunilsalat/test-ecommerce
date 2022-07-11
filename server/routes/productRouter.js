const express = require("express");
const { authMiddleware, isSeller } = require("../middleewares/authenticaton");
const router = express.Router();
const {
  getAllProducts,
  getProductDetail,
  createProduct,
  editProduct,
  addProductCategory,
  getAllCategory,
  getCategoryWiseProduct,
  getProductBySeller,
  getAllSubCategories,
  addSubCategory,
} = require("../controllers/productController");

router.route("/all").get(getAllProducts);
router.route("/detail/:id").get(getProductDetail);
router.route("/create").post([authMiddleware, isSeller], createProduct);
router.route("/edit/:id").put([authMiddleware, isSeller], editProduct);
router.route("/add-category").post(authMiddleware, addProductCategory);
router.route("/cat-all").get(getAllCategory);
router.route("/cat-product/:id").get(getCategoryWiseProduct);
router.route("/add-sub-cat").post([authMiddleware, isSeller], addSubCategory);
router
  .route("/get-sub-cats/:categoryId")
  .get(authMiddleware, getAllSubCategories);
router
  .route("/product-by-seller")
  .get([authMiddleware, isSeller], getProductBySeller);

module.exports = router;
