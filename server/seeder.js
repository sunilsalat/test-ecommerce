const data = [
  {
    title: "Laptop",
    description: "GOod laptop",
    image: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ],
    unit: 15,
    weight: "250",
    price: 15500,
    category: "62a03a75bd35e3dfd3668932",
    seller: "62a9b7f492f4eebc5c922bba",
  },
  {
    title: "Phone",
    description: "New Phone ",
    image: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    ],
    unit: 15,
    weight: "187",
    price: 8500,
    category: "62a03a75bd35e3dfd3668932",
    seller: "62a9b7f492f4eebc5c922bba",
  },
  {
    title: "Tshirt",
    description: "comfortable t shirt",
    image: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80",
    ],
    unit: 15,
    weight: "150",
    price: 650,
    category: "62a03a6cbd35e3dfd3668930",
    seller: "62a9b7f492f4eebc5c922bba",
  },
  {
    title: "Shirt",
    description: "comfortable t shiert",
    image: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    ],
    unit: 15,
    weight: "250",
    price: 1200,
    category: "62a03a6cbd35e3dfd3668930",
    seller: "62a9b7f492f4eebc5c922bba",
  },
  {
    title: "Glass",
    description: "comfortable t shiert",
    image: [
      "https://images.unsplash.com/photo-1514651029128-173d2e6ea851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80",
    ],
    unit: 15,
    weight: "50",
    price: 950,
    category: "62a03a6cbd35e3dfd3668930",
    seller: "62a9b7f492f4eebc5c922bba",
  },
];

const mongoose = require("mongoose");
const Product = require("./models/product");

const uploadData = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    await Product.deleteMany();

    await Product.insertMany(data);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

uploadData();

// ObjectId("6299ae01004ba20727fa6171"), ObjectId("62a9803b56babb7d23cfe354"), ObjectId("62a9b7f492f4eebc5c922bba"),
