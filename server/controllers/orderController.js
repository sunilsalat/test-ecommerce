const Order = require("../models/order");
const Cart = require("../models/cart");
const stripe = require("stripe")(process.env.STRIPE_SK);

// create order

const CreateOrder = async (req, res) => {
  const { paymentMethod } = req.body;

  if (!paymentMethod) {
    throw new Error("all the fields are required");
  }

  const cart = await Cart.findOne({ userId: req.userInfo.id });

  const { totalShippingFee, shippingAddress, tp, cartItems } = cart;

  const orderItems = cartItems.map((e) => {
    return {
      title: e.item_title,
      image: e.item_image,
      price: e.item_price,
      productId: e.productId,
      qty: e.item_qty,
    };
  });

  const order = await Order.create({
    orderItems,
    shippingFee: totalShippingFee,
    address: shippingAddress,
    total: tp + totalShippingFee,
    subTotal: tp,
    user: req.userInfo.id,
    paymentMethod: paymentMethod,
  });

  res.status(200).json({ id: order._id });
};

// create payment intent
const createPaymentIntent = async (req, res) => {
  const { orderId } = req.body;


  if (!orderId) {
    throw Error("order id not provided");
  }

  const order = await Order.findOne({ _id: orderId });

  const totaAmount = order.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totaAmount,
    currency: "INR",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

// upadte order status - payment status

// mark order deliverd for delivery person

// getall order of user

// get single order detail

// all order for admin

module.exports = { CreateOrder, createPaymentIntent };
