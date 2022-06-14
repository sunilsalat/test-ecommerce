const User = require("../models/user");
const { createJwtToken } = require("../utlis/jwt");
const { generateUserPayload } = require("../utlis/generateUserPayload");
const crypto = require("crypto");
const Token = require("../models/token");

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("All the fields are required to register");
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new Error("Can not create account");
  }

  const user = await User.create(req.body);

  res.status(200).json({ msg: "User registration successful" });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    throw new Error("Missing field");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("invalid credentials");
  }

  const payload = generateUserPayload(user);

  // Do not save new refreshTOkenDb in token db, if already exist and valid
  const existing_token = await Token.findOne({ user: user._id });

  if (existing_token) {
    const { isValid } = existing_token;
    if (!isValid) {
      throw new CustomError.BadRequest("Not authorize");
    }
    createJwtToken({
      res,
      payload,
      refreshTokenDB: existing_token.refreshTokenDB,
    });
    res.status(200).json({ name: user.name, role: user.isAdmin, id: user._id });
    return;
  }

  // saving refresh token to database
  const tokenPayload = {
    refreshTokenDB: crypto.randomBytes(40).toString("hex"),
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    user: user._id,
  };

  const token = await Token.create(tokenPayload);
  createJwtToken({ res, payload, refreshTokenDB: token.refreshTokenDB });
  res.status(200).json({ name: user.name, role: user.isAdmin, id: user._id });
};

// LOGOUT
const logout = async (req, res) => {
  // Delete stored tokens in database
  await Token.findOneAndDelete({ user: req.userInfo.id });

  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ msg: "true" });
};


// misc
const checkRootUserInfo = async (req, res) => {
  res.status(200);
};

//// misc
const addUserAddress = async (req, res) => {
  const { state, country, city, pincode, street } = req.body;

  if (!state || !country || !city || !street || !pincode) {
    throw new Error("All the feild are required!");
  }

  const add = {
    street,
    country,
    city,
    pincode,
    state,
  };

  const user = await User.findOne({ _id: req.userInfo.id });

  if (!user) {
    throw new Error("Can not add address");
  }
  user.addresses.push(add);
  await user.save();

  res.status(200).json({ ok: true });
};

module.exports = { register, login, logout, checkRootUserInfo, addUserAddress };
