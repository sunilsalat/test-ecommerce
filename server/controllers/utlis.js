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

// video straming
const streamVideo = async (req, res) => {
  const redStr = fs.createReadStream(
    "Hardest Backend Node.js Concept to Master.mp4"
  );

  redStr.pipe(res);
  redStr.on("data", (chunk) => {
    console.log("data buffers");
  });
  redStr.on("end", () => {
    console.log(`res sent, ${Date.now()}`);
  });
};

/* pp.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "bigbuck.mp4";
  const videoSize = fs.statSync("bigbuck.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
}); */

module.exports = {
  getShippingFee,
  getStripePk,
  uploadImageToCloudinary,
  streamVideo,
};
