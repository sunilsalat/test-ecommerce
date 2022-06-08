const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    enum:["Electronics", "Books", "Cloths"],
    required: [true, "category can not be blank"],
  },
});

module.exports = mongoose.model("Category", CategorySchema);
