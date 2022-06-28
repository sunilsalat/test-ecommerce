const Order = require("../models/order");

// create order

const CreateOrder = async (req, res) => {
  const { cartItems, paymentMethod, address } = req.body;

  if (!cartItems || !paymentMethod || !address) {
    throw new Error("all the fields are required");
  }

  for (let item of cartItems) {
    console.log(item._id);
  }

  res.status(200).json({ ok: true });
};

// upadte order status - payment status

// mark order deliverd for delivery person

// getall order of user

// get single order detail

// all order for admin

module.exports = { CreateOrder };
