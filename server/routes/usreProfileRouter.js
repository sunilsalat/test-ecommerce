const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleewares/authenticaton");
const { addUserAddress,getUserInfo } = require("../controllers/userProfileController");

router.route("/add-address").post(authMiddleware, addUserAddress);
router.route('/get-user-info').get(authMiddleware, getUserInfo)

module.exports = router;