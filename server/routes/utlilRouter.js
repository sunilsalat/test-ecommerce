const express = require("express");
const multer = require("multer");
const { authMiddleware, isSeller } = require("../middleewares/authenticaton");
const {
  getShippingFee,
  getStripePk,
  uploadImageToCloudinary,
} = require("../controllers/utlis");
const router = express.Router();

const upload = multer({dest:'uploads/'});

router.route("/get-shippingfee").post(authMiddleware, getShippingFee);
router.route("/get-ssk").get(authMiddleware, getStripePk);
router
  .route("/upload-img")
  .post(
    [ authMiddleware, isSeller],
    uploadImageToCloudinary
  );

module.exports = router;
