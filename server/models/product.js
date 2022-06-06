const mongoose = require("mongoose");

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
    required: [true, "Unit can not be empty"],
  },
  image: {
    type: String,
    required: [true, "Image can not be empty"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
