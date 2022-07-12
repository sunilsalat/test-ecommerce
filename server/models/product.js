const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema({
  validTill: {
    type: Date,
    required: [true, "Valid till can not be empty"],
  },
  offerCount: {
    type: Number,
    required: [true, "Offer count can not be empty "],
  },
  offerTitle: {
    type: String,
    required: [true, "Offer title can not be empty "],
  },
  offerDiscount: {
    type: Number,
    required: [true, "OfferDiscount can not be empty"],
  },
});

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name can not be empty"],
  },
  description: {
    type: String,
    required: [true, "Description can not be empty"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  unit: {
    type: Number,
    default: 25,
    required: [true, "Unit can not be empty"],
  },
  image: [{ type: String }],
  price: { type: Number, required: [true, "Price can not be blank "] },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: [true, "Category can not be blank"],
  },
  subCategory: [
    {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  avgRatings: {
    type: Number,
    default: 0,
  },
  countOfReviews: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    required: [true, "Weight can not be empty"],
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "Seller",
    required: [true, "Seller can not be empty"],
  },
  shippinFee: {
    type: Number,
    default: 0,
  },
  offers: [OfferSchema],
});
ProductSchema.virtual("sellerId", {
  ref: "Seller",
  localField: "seller", // Of post collection
  foreignField: "_id", // Of user collection
  justOne: true,
});

ProductSchema.pre("save", async function () {
  if (this.weight > 200) {
    this.shippinFee = 25;
  }
});

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Product", ProductSchema);
