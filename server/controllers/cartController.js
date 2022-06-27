const Cart = require("../models/cart");
const Product = require("../models/product");

// add to cart
const addToCart = async (req, res) => {
  const { item_qty } = req.body;
  const { productId } = req.params;

  if (!item_qty || !productId) {
    throw new Error("all the fields are required");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product with id not found");
  }

  if (product.unit < item_qty) {
    throw new Error("product is out of stock for given valut of qty");
  }

  const { title, image, price, _id } = product;

  const item = {
    item_title: title,
    item_image: image,
    item_price: price,
    productId: _id,
    item_qty: item_qty,
  };
  const existingCart = await Cart.findOne({
    userId: req.userInfo.id,
  });

  const isItemAlreadyExistInCart = existingCart?.cartItems?.find(
    (e) => e.productId.toString() === productId.toString()
  );

  // if item already exist inc qty by one
  if (isItemAlreadyExistInCart) {
    console.log("in there 1");
    const updatedCartItems = existingCart.cartItems.map((e) => {
      if (e.productId.toString() === productId.toString()) {
        e.item_qty += 1;
      }
      return e;
    });

    existingCart.cartItems = updatedCartItems;
    await existingCart.save();

    return res.status(200).json({ cart: existingCart });
  }

  if (existingCart && existingCart.cartItems.length > 0) {
    console.log("in there 2");
    existingCart.cartItems.push(item);
    await existingCart.save();
    return res.status(200).json({ cart: existingCart });
  }

  // first time cart initialization of user
  const cart = await Cart.create({
    cartItems: item,
    userId: req.userInfo.id,
  });

  res.status(200).json({ cart });
};

// remove form cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw Error("ProductId required chde");
  }

  const cart = await Cart.findOneAndUpdate(
    { userId: req.userInfo.id },
    { $pull: { cartItems: { productId: productId } } }
  );

  res.status(200).json({ ok: "true" });
};

// edit cart item
const editCartItem = async (req, res) => {
  const { productId } = req.params;
  const { method } = req.body;

  if (!productId || !method) {
    throw new Error("cartItmeId id is required");
  }

  if (method == "inc") {
    const cartItem = await Cart.findOneAndUpdate(
      { "cartItems.$.productId": productId, userId: req.userInfo.id },
      { $inc: { "cartItems.$[].item_qty": 1 } },
      {
        new: true,
      }
    );
    res.status(200).json({ ok: cartItem });
  }

  if (method == "dec") {
    const cartItem = await Cart.findOneAndUpdate(
      { "cartItems.$.productId": productId, userId: req.userInfo.id },
      { $inc: { "cartItems.$[].item_qty": -1 } },
      {
        new: true,
      }
    );
    res.status(200).json({ ok: cartItem });
  }

  res.status(200);
};

// getall cart items
const getAllCartItems = async (req, res) => {
  let cart = await Cart.findOne({ userId: req.userInfo.id }).populate([
    "cartItems",
  ]);

  // filter out any item with negative quantity
  cartItems = cart.cartItems?.filter((e) => e.item_qty > 0);

  res.status(200).json({
    cartItems: cart.cartItems,
    totalQty: cart.tq,
    totalPrice: cart.tp,
    totalShippingFee: cart.totalShippingFee,
  });
};

module.exports = { addToCart, removeFromCart, editCartItem, getAllCartItems };
