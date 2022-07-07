const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can not be blank"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);
