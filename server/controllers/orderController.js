const stripe = require("stripe")(process.env.STRIPE_SK);
const Order = require("../models/order");
const Cart = require("../models/cart");
const Seller = require("../models/seller");
const mongoose = require("mongoose");
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
      sellerId: e.item_seller,
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
  if (!order) {
    throw new Error("No order found with id ");
  }

  const totaAmount = order.total;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totaAmount,
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!paymentIntent) {
      throw new Error("can not be find paymentIntenet");
    }

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

    // fine orderby id or payment intetnt
    const order = await Order.findOne({ paymentIntent: payInt });

    const paymentIntent = await stripe.paymentIntents.retrieve(
      order.paymentIntent
    );

    if (
      paymentIntent.amount_received === paymentIntent.amount &&
      paymentIntent.status === "succeeded"
    ) {
      const order = await Order.findOne({ paymentIntent: paymentIntent.id });

      order.paidAt = new Date();
      order.isPaid = true;
      order.status = "Confirmed";

      await order.save();

      // await Order.findOneAndUpdate(
      //   { paymentIntent: paymentIntent.id },
      //   { paidAt: new Date(), isPaid: true, status: "confirmed" }
      // );

      return res.status(200).json({ id: order._id });
    }
    res.send("ok");
  } catch (error) {
    throw new Error(error.message);
  }
};

// mark order deliverd for delivery person
const markOrderDeliverd = async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new Error("Order does not exist !");
  }

  order.status = "Deliverd";
  order.deliverdAt = new Date();
  order.isDeliverd = true;

  await order.save();

  res.status(200).json({ ok: true });
};

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

  // show only to whoever owns order   and admin and sellers
  if (
    req.userInfo.role !== "seller" &&
    req.userInfo.id.toString() !== order.user._id.toString()
  ) {
    return res.status(200).json({ msg: "Order does not belongs to user!" });
  }

  res.status(200).json({ order });
};

// get all orders of single user
const getAllOrderOfUser = async (req, res) => {
  const orders = await Order.find({ user: req.userInfo.id });
  res.status(200).json({ orders });
};

// get all serller orders
const getAllSellersOrder = async (req, res) => {
  const seller = await Seller.findOne({ user: req.userInfo.id });
  const orders = await Order.find({
    orderItems: { $elemMatch: { sellerId: seller._id } },
  }).populate({
    path: "orderItems.productId",
  });

  res.status(200).json({ orders });
};

module.exports = {
  CreateOrder,
  createPaymentIntent,
  OrderDetail,
  UpdateOrder,
  getAllSellersOrder,
  markOrderDeliverd,
  getAllOrderOfUser,
};
