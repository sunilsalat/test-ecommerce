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

  res.status(200).json({ msg: order._id });
};

// upadte order status - payment status

// mark order deliverd for delivery person

// getall order of user

// get single order detail

// all order for admin

module.exports = { CreateOrder };
