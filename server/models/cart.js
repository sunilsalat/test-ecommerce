const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  item_title: { type: String, required: [true, "item_title can not be blank"] },
  item_price: { type: Number, required: [true, "item_price can not be blank"] },
  item_qty: { type: Number, required: [true, "item_qty can not be blank"] },
  item_image: { type: String, required: [true, "item_image can not be blank"] },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId:{
    type:mongoose.Types.ObjectId, 
    ref:'User', 
    required:true
  }
});

module.exports = mongoose.model("Cart", CartSchema);
