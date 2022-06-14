const Review = require("../models/review");
const Order = require("../models/order");

const addReview = async (req, res) => {
  const { rating, title, comment, productId } = req.body;

  if (!rating || !title || !comment || !productId) {
    throw new Error("All fields are required");
  }

  // check if review already submitted
  const isProductAlreadyReviewd = await Review.findOne({
    userId: req.userInfo.id,
    productId,
  });

  if (isProductAlreadyReviewd) {
    throw new Error("Product is already reviewd by user");
  }

  // check for product purchased by user ?
  // const allUserOrder = await Order.find({ user: req.userInfo.id });
  // const isProductPurchasedByUser = allUserOrder.orderItems.map((item) => {
  //   if (item._id === productId) {
  //     return item;
  //   }
  // });

  // if (isProductPurchasedByUser.length === 0) {
  //   throw new Error("Product is not purchased by user ");
  // }

  const review = await Review.create({ ...req.body, userId: req.userInfo.id });

  res.status(200).json({ review });
};

// todo ==> else rest api edit /delet, get etc etc

module.exports = { addReview };
