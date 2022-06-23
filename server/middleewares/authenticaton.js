const { verifyJwtToken, createJwtToken } = require("../utlis/jwt");
const Token = require("../models/token");

const authMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  if (!refreshToken) {
    throw new Error("tokens not provided");
  }

  try {
    // if accessToken is present and valid no need to generate newTokens
    if (accessToken) {
      const payload = verifyJwtToken(accessToken);
      req.userInfo = payload;
      next();
      return;
    }

    const data = verifyJwtToken(refreshToken);
    const { id, name, role } = data.payload;

    const token = await Token.findOne({
      user: id,
      refreshTokenDB: data.refreshTokenDB,
    });

    if (!token || !token.isValid) {
      throw new Error("Not authorize !");
    }

    // refresh the access token using Refresh token
    createJwtToken({
      res,
      payload: { id, name, role },
      refreshTokenDB: token.refreshTokenDB,
    });

    // set payload on request
    req.userInfo = { id, name, role };

    next();
  } catch (error) {
    throw new Error("Not authorize");
  }
};

const isSeller = (req, res, next) => {
  const { id, role, name } = req.userInfo;

  if (role !== "seller") {
    throw new Error("Only sellers are allowed");
  }

  next();
};

module.exports = { authMiddleware, isSeller };
