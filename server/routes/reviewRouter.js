const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const router = express.Router();
const { addReview , getAllProductReview} = require("../controllers/reviewController");

router.route("/add").post(authMiddleware, addReview);
router.route('/all/:productId').get(authMiddleware, getAllProductReview)

module.exports = router;
