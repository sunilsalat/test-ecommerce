const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating can not be empty"],
    },
    title: {
      type: String,
      maxlength: 100,
      trim: true,
      required: [true, "Rating can not be empty"],
    },
    comment: {
      type: String,
      required: [true, "Comment can not be empty"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User can not be empty"],
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Product can not be empty"],
    },
  },
  { timestamps: true }
);

// only one review can be added by one user per product, use compounding index
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

// agg all review for a particular product and save it to the product shhema post review save

ReviewSchema.statics.calculateAvgRating = async function (productId) {
  const result = this.aggregate([
    {
      $match: { productId: productId },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
        countOfRev: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        avgRatings: Math.ceil(result[0]?.avgRating || 0),
        countOfReviews: Math.ceil(result[0]?.countOfRev || 0),
      }
    );
  } catch (error) {}

  ReviewSchema.post("save", async function () {
    this.constructor.calculateAvgRating(this.productId);
  });

  ReviewSchema.post("remove", async function () {
    this.constructor.calculateAvgRating(this.productId);
  });
};

module.exports = mongoose.model("Review", ReviewSchema);
