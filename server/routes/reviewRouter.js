const express = require("express");
const { authMiddleware } = require("../middleewares/authenticaton");
const router = express.Router();
const { addReview } = require("../controllers/reviewController");

router.route("/add").post(authMiddleware, addReview);

module.exports = router;
