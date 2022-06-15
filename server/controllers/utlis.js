// calculate shipping fee based on location, weight, units

const seller = require("../models/seller");
const Seller = require("../models/seller");
const User = require("../models/user");

const getShippingFee = async (req, res) => {
  const { sellerId } = req.body;

  const user = await User.findOne({ _id: req.userInfo.id });

  const cr = user.addresses[1].loc.coordinates;

  
  

  const dist = await Seller.aggregate([
    {
      $geoNear: {
        query: { name: "tata groceries "}, 
        near: {
          type: "Point",
          coordinates: cr,
        },
        distanceField: "distance",
        distanceMultiplier: 0.001,
        spherical: true

      }
    },
  ]);

  console.log(dist)

  res.status(200).json({ shippingFee: 0, dist: dist[0].distance });
};

module.exports = { getShippingFee };
