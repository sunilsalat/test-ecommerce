const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const { getShippingFee, getStripePk } = require("../controllers/utlis");
const router = express.Router();

router.route("/get-shippingfee").post(authMiddleware, getShippingFee);

router.route("/get-ssk").get(authMiddleware, getStripePk);
module.exports = router;
