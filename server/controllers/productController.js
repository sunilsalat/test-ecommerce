const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");

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
  const { cat, title } = req.query;

  console.log(cat, title, "cat ", "title");

  if (cat !== "null" && cat !== undefined) {
    const newTitle = new RegExp("^" + title);
    const products = await Product.find({
      $or: [{ category: cat }, { title: { $regex: newTitle } }],
    })
      .limit(10)
      .populate("category");

    res.status(200).json({ products });
  }

  if (title !== "null" && title !== undefined) {
    const newTitle = new RegExp("^" + title, "i");
    const products = await Product.find({ title: { $regex: newTitle } })
      .limit(10)
      .populate("category");
    res.status(200).json({ products });
  }

  const products = await Product.find({}).limit(10).populate("category");
  res.status(200).json({ products });
};

const getCategoryWiseProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Category not found");
  }
  const products = await Product.find({ category: id })
    .limit(10)
    .populate("category");
  res.status(200).json({ products });
};

const getProductDetail = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({ product });
};

// Add category to which product belongs

const addProductCategory = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new Error("Title can not be blank!");
  }
  const cat = await Category.create({ title });
  res.status(200).json({ cat });
};

// getallcategory

const getAllCategory = async (req, res) => {
  // Todo -- show most selling categories first
  const categories = await Category.find({});

  res.status(200).json({ categories });
};

module.exports = {
  createProduct,
  editProduct,
  getAllProducts,
  getProductDetail,
  addProductCategory,
  getAllCategory,
  getCategoryWiseProduct,
};
