const mongoose = require("mongoose");

const item = mongoose.Schema(
  {
    item_title: {
      type: String,
      required: [true, "item_title can not be blank"],
    },
    item_price: {
      type: Number,
      required: [true, "item_price can not be blank"],
    },
    item_qty: { type: Number, required: [true, "item_qty can not be blank"] },
    item_image: {
      type: String,
      required: [true, "item_image can not be blank"],
    },

    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const CartSchema = mongoose.Schema(
  {
    cartItems: [item],
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tp: { type: Number, default: 0, required: true },
    tq: { type: Number, default: 0, required: true },
    totalShippingFee: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: Number },
      loc: { type: { type: String }, coordinates: [] },
    },
  },
  { timestamps: true }
);

CartSchema.post("save", async function () {
  try {
    if (this.cartItems.length === 0) {
      await this.model("Cart").findOneAndDelete({ _id: this._id });
    }
  } catch (error) {
    console.log(error);
  }
});

CartSchema.pre("save", async function () {
  try {
    let totalPrice = 0;
    let totalQty = 0;
    let shippingFee = 0;
    let cr = this.shippingAddress.loc.coordinates;
    cr = cr && [parseFloat(cr[0]), parseFloat(cr[1])];

    for (var e of this.cartItems) {
      totalPrice += e.item_price * e.item_qty;
      totalQty += e.item_qty;
      const p = await this.model("Product").findOne({ _id: e.productId });
      shippingFee += p?.shippinFee;

      // calculating shippingfee based on distance
      try {
        const dist = await this.model("Seller").aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: cr,
              },
              query: { _id: p.seller },
              distanceField: "distance",
              distanceMultiplier: 0.001,
              spherical: true,
            },
          },
        ]);

        shippingFee += dist[0].distance > 100 ? 49 : 0;
      } catch (error) {
        console.log(error.message);
        console.log("gracefull failing");
      }
    }

    this.tp = totalPrice;
    this.tq = totalQty;
    this.totalShippingFee = shippingFee;
  } catch (error) {
    console.log(error);
  }
});

// TODO - improve totalQty and totalPrice using aggregation pipeline

module.exports = mongoose.model("Cart", CartSchema);
