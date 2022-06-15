const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const { getShippingFee } = require("../controllers/utlis");
const router = express.Router()

router.route('/get-shippingfee').post(authMiddleware, getShippingFee)

module.exports = router;
