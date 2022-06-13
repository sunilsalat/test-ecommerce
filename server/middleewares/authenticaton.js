const { verifyJwtToken, createJwtToken } = require("../utlis/jwt");
const Token = require("../models/token");

const authMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

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
      throw new Error("Not authorize ");
    }

    // refresh the access token using Refresh token
    createJwtToken({
      res,
      payload: { id, name, role },
      refreshTokenDB: token.refreshTokenDB,
    });

    // set payload on request
    req.userInfo = { id, name, role };

    console.log(req.userInfo);
    next();
  } catch (error) {
    throw new Error("Not authorize");
  }
};

module.exports = { authMiddleware };
