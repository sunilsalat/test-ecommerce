const Product = require("../models/product");

const createProduct = async (req, res) => {
  const { title, description, image, unit } = req.body;

  if (!title || !description || !image || !unit) {
    throw new Error("Missing fields");
  }

  const product = await Product.create(req.body);

  res.status(201).json({ product });
};

const editProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.status(200).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find().limit(10);

  res.status(200).json({ products });
};

const getProductDetail = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({ product });
};

module.exports = {
  createProduct,
  editProduct,
  getAllProducts,
  getProductDetail,
};
