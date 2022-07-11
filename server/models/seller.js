const mongoose = require("mongoose");

const SellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can not be empty"],
  },
  loc: {
    type: { type: String }
  , coordinates: []
},
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "UserId can not be empty"],
  },
});

SellerSchema.index({ loc: '2dsphere' });

SellerSchema.virtual('userName', {
  ref: 'User',
  localField: 'user', // Of post collection
  foreignField: '_id',    // Of user collection
  justOne: true
})


module.exports = mongoose.model("Seller", SellerSchema);
