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
    shippngAddress: {
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

CartSchema.post(["save", "findOneAndUpdate"], async function () {
  try {
    const { totalQty, totalPrice, shippingFee } = this.cartItems.reduce(
      (agg, cuu) => {
        // total price and qty calculations
        const totalPriceOne = cuu.item_price * cuu.item_qty;
        agg.totalPrice += totalPriceOne;
        agg.totalQty += cuu.item_qty;

        // calculating shippingfee based on weight
        // const p = await this.model("Product").findOne({ _id: cuu.productId });
        // agg.shippingFee += p.shippinFee;
        // console.log(p.shippinFee);

        // calculating shippingfee based on distance
        // try {
        //   const dist = await this.model("Seller").aggregate([
        //     {
        //       $geoNear: {
        //         near: {
        //           type: "Point",
        //           coordinates: [72.8777, 19.076],
        //         },
        //         query: { _id: p.seller },
        //         distanceField: "distance",
        //         distanceMultiplier: 0.001,
        //         spherical: true,
        //       },
        //     },
        //   ]);

        //   agg.shippingFee += dist[0].distance > 100 ? 49 : 0;
        // } catch (error) {
        //   console.log("gracefull failing");
        // }

        return agg;
      },
      {
        totalQty: 0,
        totalPrice: 0,
        shippingFee: 0,
      }
    );

    (this.tp = totalPrice),
      (this.tq = totalQty),
      (this.totalShippingFee = shippingFee);
  } catch (error) {
    console.log(error);
  }
});

// TODO - improve totalQty and totalPrice using aggregation pipeline

module.exports = mongoose.model("Cart", CartSchema);
