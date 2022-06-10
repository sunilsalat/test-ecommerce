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

module.exports = mongoose.model("Review", ReviewSchema);
