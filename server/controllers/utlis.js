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

  try {
    const paths = [];

    imgFiles.forEach((element) => {
      const t = path.join(__dirname, `../${element.tempFilePath}`);
      const buffer = fs.readFileSync(t);
      const n = path.join(__dirname, `../images`);
      const p = `${Date.now()}-${element.name}`;
      const img = fs.writeFileSync(`${n}/${p}`, buffer, {
        flag: "a+",
      });

      // todo -compress-image before saving
      // once img file created take that file and compress and than delete orignal file
      try {
        const v = `${Date.now()}-${element.name}`;
        sharp(`${n}/${p}`)
          .resize({ height: 300, width: 200 })
          .toFile(`${n}/${v}`)
          .then(() => {
            // removing orignal file once that file is compressed
            fs.unlinkSync(`${n}/${p}`);
          });

        paths.push(`/${v}`);
      } catch (error) {
        console.log(error);
      }

      fs.unlinkSync(t);
    });

    return res.status(200).send(paths);
  } catch (error) {
    console.log(error.message);
    throw new Error("image upload failed !");
  }
};

module.exports = { getShippingFee, getStripePk, uploadImageToCloudinary };
