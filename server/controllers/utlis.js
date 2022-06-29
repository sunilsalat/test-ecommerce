// calculate shipping fee based on location, weight, units
require("dotenv").config();
const mongoose = require("mongoose");
const Seller = require("../models/seller");
const User = require("../models/user");
const Product = require("../models/product");
const stripe = require("stripe")("sk_test_tR3PYbcVNZZ796tH88S4VQ2u");

const getShippingFee = async (req, res) => {
  const { sellerId, productId, cartItems, add } = req.body;

  const user = await User.findOne({ _id: req.userInfo.id });

  if (!user) {
    throw new Error("User not found");
  }

  const cr = user.addresses[0].loc.coordinates;

  console.log(cr, "cordinates");

  const dist = await Seller.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: cr,
        },
        query: { _id: new mongoose.mongo.ObjectId(sellerId) },
        distanceField: "distance",
        distanceMultiplier: 0.001,
        spherical: true,
      },
    },
  ]);

  const product = await Product({ _id: productId });

  console.log(dist[0].distance);

  const totalFee = product?.shippinFee || 0 + dist[0]?.distance > 100 ? 50 : 0;

  res.status(200).json({ shippingFee: totalFee });
};

const getStripePk = async (req, res) => {


  res.status(200).json({ key: process.env.STRIPE_PK });
};

module.exports = { getShippingFee, getStripePk };


// const { items } = req.body;

// // Create a PaymentIntent with the order amount and currency
// const paymentIntent = await stripe.paymentIntents.create({
//   amount: calculateOrderAmount(items),
//   currency: "INR",
//   automatic_payment_methods: {
//     enabled: true,
//   },
// });

// res.send({
//   clientSecret: paymentIntent.client_secret,
// });