require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJwtToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

const createJwtToken = ({ res, payload, refreshTokenDB }) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(
    { payload, refreshTokenDB },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    expires: new Date(Date.now + 1000 * 60),
    secure: process.env.NODE_ENV === "production",
    signed: true,
    maxAge: 1000 * 60,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
    signed: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
};

module.exports = { createJwtToken, verifyJwtToken };
