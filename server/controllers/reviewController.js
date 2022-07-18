const Review = require("../models/review");
const Order = require("../models/order");
const getPaginatedResult = require("../utlis/pagination");

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
  const isProductPurchasedByUser = await Order.find({
    $and: [{ user: req.userInfo.id }, { "orderItems.productId": productId }],
  });
  if (!isProductPurchasedByUser || isProductPurchasedByUser.length < 1) {
    return res.send(
      "For better user expirence, User who have purchased the product can only review!"
    );
  }

  const review = await Review.create({ ...req.body, userId: req.userInfo.id });
  res.status(200).json({ review });
};

const getAllProductReview = async (req, res) => {
  const { productId } = req.params;
  const page = parseInt(req.query?.page) || 1;
  const pageSize = 5;
  if (!productId) {
    throw new Error("Product id is not provided ");
  }

  const result = await getPaginatedResult(
    Review,
    { productId },
    [],
    page,
    pageSize
  );

  // const reviews = await Review.find({ productId }).populate("userId").limit(10);

  res.status(200).json({
    reviews: result.data,
    totalCount: result.total,
    lastPage: result.lastPage,
    currentPage: result.currentPage,
    hasMorePages: result.hasMorePages,
  });
};

module.exports = { addReview, getAllProductReview };
