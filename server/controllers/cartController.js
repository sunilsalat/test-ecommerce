const Cart = require("../models/cart");
const Product = require("../models/product");

// ADD TO CART
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

  const cart = await Cart.findOne({
    userId: req.userInfo.id,
  });

  /*
  const isItemAlreadyExistInCart = cart?.cartItems?.find(
    (e) => e.productId.toString() === productId.toString()
  );

  // if item already exist inc qty by one
  if (isItemAlreadyExistInCart) {
    console.log("in there 1");
    const updatedCartItems = cart.cartItems.map((e) => {
      if (e.productId.toString() === productId.toString()) {
        e.item_qty += 1;
      }
      return e;
    });

    cart.cartItems = updatedCartItems;
    await cart.save();

    return res.status(200).json({ cart: cart });
  }
  */

  if (cart && cart.cartItems.length > 0) {
    cart.cartItems.push(item);
    await cart.save();
    return res.status(200).json({ cart: cart });
  }

  // first time cart initialization of user
  await Cart.create({
    cartItems: item,
    userId: req.userInfo.id,
  });

  res.status(200).json({ msg: "Item added" });
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw Error("ProductId required chde");
  }

  const cart = await Cart.findOne({ userId: req.userInfo.id });

  if (cart && cart.cartItems.length > 0) {
    const updatedCartItems = cart.cartItems.filter(
      (e) => e.productId.toString() !== productId.toString()
    );

    cart.cartItems = updatedCartItems;
    await cart.save();

    return res.status(200).json({ msg: "Removed Successfully" });
  }
  /*
  // const cart = await Cart.findOneAndUpdate(
  //   { userId: req.userInfo.id },
  //   { $pull: { cartItems: { productId: productId } } }
  // );
  */

  res.status(200).json({ ok: "true" });
};

// INC/DEC QTY
const editCartItem = async (req, res) => {
  const { productId } = req.params;
  const { method } = req.body;

  if (!productId || !method) {
    throw new Error("cartItmeId id is required");
  }

  const cart = await Cart.findOne({
    userId: req.userInfo.id,
  });

  if (method == "inc" && cart.cartItems.length > 0) {
    const updatedCartItems = cart.cartItems.map((e) => {
      if (e.productId.toString() === productId) {
        e.item_qty += 1;
      }
      return e;
    });

    cart.cartItems = updatedCartItems;

    await cart.save();

    return res.status(200).json({ ok: true });

    /*const cartItem = await Cart.findOneAndUpdate(
      { "cartItems.$.productId": productId, userId: req.userInfo.id },
      { $inc: { "cartItems.$[].item_qty": 1 } },
      {
        new: true,
      }
    );
    res.status(200).json({ ok: cartItem });*/
  }

  if (method == "dec" && cart.cartItems.length > 0) {
    const updatedCartItems = cart.cartItems.map((e) => {
      if (e.productId.toString() === productId.toString()) {
        if (e.item_qty > 1) {
          e.item_qty -= 1;
        }
      }
      return e;
    });

    cart.cartItems = updatedCartItems;

    await cart.save();

    return res.status(200).json({ ok: true });
  }

  res.status(200).json({ ok });
};

// ADD/UPDATE SHIPPING ADDRESS
const addShippingAddress = async (req, res) => {
  let { street, city, state, pincode, country, loc } = req.body.add;

  if (!street || !city || !state || !pincode || !country || !loc) {
    throw new Error("Please provide valid address");
  }

  const cart = await Cart.findOne({ userId: req.userInfo.id });

  if (!cart) {
    return res.status(200).json({ ok: true });
  }

  cart.shippingAddress = {
    street,
    city,
    state,
    pincode,
    country,
    loc: { type: "Point", coordinates: loc.coordinates },
  };

  await cart.save();

  res.status(200).json({ msg: cart.shippingAddress });
};

// GET AGG. CART
const getAllCartItems = async (req, res) => {
  try {
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
      shippingAddress: cart.shippingAddress,
    });
  } catch (error) {
    res.status(200).send("ok");
  }
};

const clearCartItems = async (req, res) => {
  await Cart.deleteMany({ userId: req.userInfo.id });
  res.status(200).json({ ok: true });
};

module.exports = {
  addToCart,
  removeFromCart,
  editCartItem,
  getAllCartItems,
  addShippingAddress,
  clearCartItems,
};
