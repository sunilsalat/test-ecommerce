const User = require("../models/user");

//// getUserInfo
const getUserInfo = async (req, res) => {
  const user = await User.findOne({ _id: req.userInfo.id });

  if (!user) {
    throw new Error("User not found");
  }

  res.status(200).json({
    name: user.name,
    role: user.role,
    id: user.id,
    address: user.addresses,
  });
};

//// misc
const addUserAddress = async (req, res) => {
  const { state, country, city, pincode, street, loc } = req.body;

  if (!state || !country || !city || !street || !pincode) {
    throw new Error("All the feild are required!");
  }

  if (Array.isArray(loc)) {
    const newLoc = loc.map((e) => parseFloat(e));
  } else {
    var newLoc = loc.split(",").map((e) => parseFloat(e));
  }

  const add = {
    street,
    country,
    city,
    pincode,
    state,
    loc: { type: "Point", coordinates: newLoc },
  };

  const user = await User.findOne({ _id: req.userInfo.id });

  if (!user) {
    throw new Error("Can not add address");
  }

  user.addresses.push(add);
  await user.save();

  res.status(200).json({ add: user.addresses[0] });
};

module.exports = { addUserAddress, getUserInfo };
