// calculate shipping fee based on location, weight, units
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Seller = require("../models/seller");
const User = require("../models/user");
const Product = require("../models/product");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const getShippingFee = async (req, res) => {
  const { sellerId, productId, cartItems, add } = req.body;

  const user = await User.findOne({ _id: req.userInfo.id });

  if (!user) {
    throw new Error("User not found");
  }

  const cr = user.addresses[0].loc.coordinates;

  console.log(cr, "cordinates");

  const dist = await Seller.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: cr,
        },
        query: { _id: new mongoose.mongo.ObjectId(sellerId) },
        distanceField: "distance",
        distanceMultiplier: 0.001,
        spherical: true,
      },
    },
  ]);

  const product = await Product({ _id: productId });

  console.log(dist[0].distance);

  const totalFee = product?.shippinFee || 0 + dist[0]?.distance > 100 ? 50 : 0;

  res.status(200).json({ shippingFee: totalFee });
};

const getStripePk = async (req, res) => {
  res.status(200).json({ key: process.env.STRIPE_PK });
};

const uploadImageToCloudinary = async (req, res) => {
  const file = req.files.image;

  try {
    const paths = [];

    file.forEach((element) => {
      const t = path.join(__dirname, `../${element.tempFilePath}`);
      const buffer = fs.readFileSync(t);
      console.log(t);
      const n = path.join(__dirname, `../images`);
      console.log(n);
      const img = fs.writeFileSync(
        `${n}/${Date.now()}-${element.name}`,
        buffer,
        {
          flag: "a+",
        }
      );

      paths.push(`/images/${Date.now()}-${element.name}`);

      fs.unlinkSync(t)
    });


    return res.status(200).send(paths);
  } catch (error) {
    const t = path.join(__dirname, `../${file.tempFilePath}`);

    const buffer = fs.readFileSync(t);

    const n = path.join(__dirname, `../images`);

    const img = fs.writeFileSync(`${n}/${Date.now()}-${file.name}`, buffer, {
      flag: "a+",
    });

    fs.unlinkSync(t)


    return res.status(200).send(`/images/${Date.now()}-${file.name}`);
  }

  // upload to cloudinary failing self-sign-cert-error
  // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
  //   console.log(result);
  //   console.log(err);
  // });

  res.status(200).json({ ok: true });
};

module.exports = { getShippingFee, getStripePk, uploadImageToCloudinary };
