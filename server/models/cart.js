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
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// TODO - improve totalQty and totalPrice using aggregation pipeline

/*// CartSchema.statics.calculateTotals = async function (userId) {
//   const result = await this.aggregate([
//     { $match: { userId: userId } },
//     {
//       $group: {
//         _id: null,
//         totalQty: { $sum: "$item_qty" },
//         totalPrice: { $multiply: ["$item_qty", 10] },
//       },
//     },
//   ]);

//   this.findOneAndUpdate(
//     { userId: userId },
//     {
//       totalPrice: Math.ceil(result[0]?.totalPrice || 0),
//       totalQty: Math.ceil(result[0]?.totalQty || 0),
//     }
//   );
// };

// CartSchema.post("save", async function () {
//   console.log(this);
//   this.constructor.calculateTotals(this.userId);
// });*/

module.exports = mongoose.model("Cart", CartSchema);
