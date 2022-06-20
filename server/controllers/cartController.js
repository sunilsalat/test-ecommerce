const Cart = require("../models/cart");
const Product = require("../models/product");

// add to cart
const addToCart = async (req, res) => {
  const { item_qty } = req.body;
  const { productId } = req.params;

  if (!item_qty) {
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

  const existingItem = await Cart.findOne({ productId });

  if (existingItem) {
    existingItem.item_qty += 1;
    await existingItem.save();
    return res.status(200).json({ cart: existingItem });
  }

  const cart = await Cart.create({
    item_title: title,
    item_image: image,
    item_price: price,
    productId: _id,
    item_qty: item_qty,
    userId: req.userInfo.id,
  });

  res.status(200).json({ cart });
};

// remove form cart

const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  if (!cartItemId) {
    throw new Error("cartItemId id is required");
  }

  await Cart.findOneAndRemove({ _id: cartItemId });

  res.status(200).send("true");
};

// edit cart item
const editCartItem = async (req, res) => {
  console.log("request received from fronend !!!!!!", Date.now());
  const { cartItemId } = req.params;
  const { method } = req.body;

  if (!cartItemId || !method) {
    throw new Error("cartItmeId id is required");
  }

  if (method == "inc") {
    const cartItem = await Cart.findOneAndUpdate(
      { _id: cartItemId },
      { $inc: { item_qty: 1 } },
      {
        new: true,
      }
    );
    res.status(200).json({ ok: cartItem });
  }

  if (method == "dec") {
    const cartItem = await Cart.findOneAndUpdate(
      { _id: cartItemId },
      { $inc: { item_qty: -1 } },
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
  let cartItems = await Cart.find({ userId: req.userInfo.id });

  cartItems = cartItems.filter((e) => e.item_qty > 0);

  let totalFee = 0;
  for (var item of cartItems) {
    const shi = await Product.findOne({ _id: item.productId });
    totalFee += shi.shippinFee;
  }

  const { totalQty, totalPrice } = cartItems.reduce(
    (agg, cuu) => {
      const totalPriceOne = cuu.item_price * cuu.item_qty;
      agg.totalPrice += totalPriceOne;
      agg.totalQty += cuu.item_qty;
      return agg;
    },
    {
      totalQty: 0,
      totalPrice: 0,
    }
  );

  res
    .status(200)
    .json({ cartItems, totalQty, totalPrice, totalShippingFee: totalFee });
};

module.exports = { addToCart, removeFromCart, editCartItem, getAllCartItems };
