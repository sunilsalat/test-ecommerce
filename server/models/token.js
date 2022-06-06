const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema(
  {
    refreshTokenDB: {
      type: String,
      required: [true, "refreshToken required"],
    },
    ip: {
      type: String,
      required: [true, "ip required"],
    },
    userAgent: {
      type: String,
      required: true,
    },
    isValid: {
      type: String,
      default: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Token", TokenSchema);
