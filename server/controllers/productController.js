const Product = require("../models/product");
const Category = require("../models/category");
const SubCategory = require("../models/subCategories");
const mongoose = require("mongoose");
const Seller = require("../models/seller");

const createProduct = async (req, res) => {
  const { title, description, image, price, category, weight } = req.body;

  if (!title || !description || !image || !price || !category || !weight) {
    throw new Error("Missing fields");
  }

  const product = await Product.create({
    ...req.body,
    seller: req.userInfo.id,
  });

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
  if (req.query.hasOwnProperty("category")) {
    const products = await Product.find({
      category: req.query["category"],
    })
      .limit(10)
      .populate("category")
      .populate(["category", "seller"]);

    return res.status(200).json({ products });
  }

  if (req.query.hasOwnProperty("title")) {
    const newTitle = new RegExp("^" + req.query["title"], "i");
    const products = await Product.find({ title: { $regex: newTitle } })
      .limit(10)
      .populate("category")
      .populate(["category", "seller"]);
    return res.status(200).json({ products });
  }

  const products = await Product.find({})
    .limit(10)
    .populate(["category", "seller"]);
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
  const product = await Product.findById(req.params.id).populate([
    "category",
    "seller",
  ]);
  res.status(200).json({ product });
};

// --- MISC ----

// Get seller's Product
const getProductBySeller = async (req, res) => {
  const seller = await Seller.findOne({ user: req.userInfo.id });

  const products = await Product.find({ seller: seller._id }).populate(
    "category",
    { title: 1 }
  );

  res.status(200).json({ products });
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

// add subcategory
const addSubCategory = async (req, res) => {
  const { categoryId, title } = req.body;
  if (!categoryId || !title) {
    throw new Error("All fields are required");
  }

  await SubCategory.create({ title, category: categoryId });

  res.status(200).send("ok");
};

// getAllSubCategories
const getAllSubCategories = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    throw new Error("category no tfouyen ");
  }

  const allSubCat = await SubCategory.find({
    category: new mongoose.mongo.ObjectId(categoryId),
  });

  res.status(200).json({ allSubCat });
};

module.exports = {
  createProduct,
  editProduct,
  getAllProducts,
  getProductDetail,
  addProductCategory,
  getAllCategory,
  getCategoryWiseProduct,
  getProductBySeller,
  getAllSubCategories,
  addSubCategory,
};
