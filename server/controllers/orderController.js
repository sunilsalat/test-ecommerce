const stripe = require("stripe")(process.env.STRIPE_SK);
const Order = require("../models/order");
const Cart = require("../models/cart");
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

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totaAmount,
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    order.paymentIntent = paymentIntent.id;
    order.clientSecret = paymentIntent.client_secret;
    await order.save();

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// upadte order status - payment status paidAt etc.
const UpdateOrder = async (req, res) => {
  try {
    const { payInt } = req.body;

    if (!payInt) {
      throw new Error("payInt is not provided ");
    }

    const order = await Order.findOne({ user: req.userInfo.id });

    const paymentIntent = await stripe.paymentIntents.retrieve(
      order.paymentIntent
    );

    if (
      paymentIntent.amount_received === paymentIntent.amount &&
      paymentIntent.status === "succeeded"
    ) {
      await Order.findOneAndUpdate(
        { paymentIntent: paymentIntent.id },
        { paidAt: new Date(), isPaid: true, status: "confirmed" }
      );

      return res.status(200).json({ id: order._id });
    }
    res.send("ok");
  } catch (error) {
    throw new Error(error.message);
  }
};

// mark order deliverd for delivery person

// getall order of user

// get single order detail

const OrderDetail = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    throw new Error("Can not get order detail");
  }

  const order = await Order.findOne({ _id: orderId })
    .populate("user", "_id")
    .select(
      "paidAt shippingFee subTotal total id orderItems address deliverdAt isDeliverd paymentMethod _id createdAt status "
    );

  if (!order) {
    throw new Error("Order does not exists!");
  }

  // show only to whoever owns order
  if (req.userInfo.id.toString() !== order.user._id.toString()) {
    return res.status(200).json({ msg: "Order Not Found!" });
  }

  res.status(200).json({ order });
};

// all order for admin

module.exports = { CreateOrder, createPaymentIntent, OrderDetail, UpdateOrder };
