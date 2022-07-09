// calculate shipping fee based on location, weight, units
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const Seller = require("../models/seller");
const User = require("../models/user");
const Product = require("../models/product");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

const getShippingFee = async (req, res) => {
  const { sellerId, productId } = req.body;

  const user = await User.findOne({ _id: req.userInfo.id });

  if (!user) {
    throw new Error("User not found");
  }

  const cr = user.addresses[0].loc.coordinates;

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
  const totalFee = product?.shippinFee || 0 + dist[0]?.distance > 100 ? 50 : 0;

  res.status(200).json({ shippingFee: totalFee });
};

const getStripePk = async (req, res) => {
  res.status(200).json({ key: process.env.STRIPE_PK });
};

// image compression, image resize
const uploadImageToCloudinary = async (req, res) => {
  const file = req.files.image;

  let imgFiles = [];

  // if user upload single file convert to array
  if (!Array.isArray(req.files.image)) {
    imgFiles.push(file);
  } else imgFiles = [...imgFiles, ...file];

  const paths = [];

  try {
    for (let element of imgFiles) {
      const t = path.join(__dirname, `../${element.tempFilePath}`);
      const buffer = fs.readFileSync(t);
      const n = path.join(__dirname, `../images`);
      const p = `${Date.now()}-${element.name}`;
      const img = fs.writeFileSync(`${n}/${p}`, buffer, {
        flag: "a+",
      });

      // compressing img before uploading to cloudinary
      const v = `${Date.now()}-${element.name}`;
      await sharp(`${n}/${p}`)
        .resize({ height: 300, width: 200 })
        .toFile(`${n}/${v}`);

      // uploading to cloudinary
      const result = await cloudinary.uploader.upload(`${n}/${v}`);
      paths.push(result.secure_url);

      // removing remporay files
      fs.unlinkSync(`${n}/${v}`);
      fs.unlinkSync(`${n}/${p}`);
      fs.unlinkSync(t);
    }

    return res.status(200).send(paths);
  } catch (error) {
    console.log(error.message, "eerror");
    throw new Error("image upload failed !");
  }
};

module.exports = { getShippingFee, getStripePk, uploadImageToCloudinary };
