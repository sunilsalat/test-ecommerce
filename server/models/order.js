const mongoose = require("mongoose");

const OrderItems = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title can not be blank"],
  },
  // optional as store productID

  image: {
    type: String,
    required: [true, "Image can not be blank"],
  },
  price: {
    type: Number,
    required: [true, "Price can not be blank"],
  },
  qty: {
    type: Number,
    required: [true, "Qty can not be blank"],
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "ProductId can not be blank"],
  },
});

const OrderSchema = mongoose.Schema(
  {
    shippingFee: {
      type: Number,
      required: [true, "shippingFee can not be blank"],
    },
    subTotal: {
      type: Number,
      required: [true, "subtotal can not be blank"],
    },
    total: {
      type: Number,
      required: [true, "total can not be blank"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user can not be blank"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    orderItems: [OrderItems],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "failed",
        "deliverd",
        "cancel",
        "refunded",
      ],
      default: "pending",
    },
    paymentIntentId: {
      type: String,
    },
    clientSecret: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    isDeliverd: { type: Boolean, default: false },
    deliverdAt: { type: Date },
    paidAt: { type: Date },
    refundedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

// all the fields of address needs to be stored in order schema seprately,
// as user can modify or delete address later

// product desc array
// sub cat of related of product
// images array
// vdeo for product
//  mul. cat of product

// payment transection detail

// when issue order refunded
