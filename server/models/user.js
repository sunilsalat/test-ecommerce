const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can not be empty"],
  },
  email: {
    type: String,
    required: [true, "Name can not be empty"],
  },
  password: {
    type: String,
    required: [true, "Name can not be empty"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (password) {
  const isPasswordMatch = await bcrypt.compare(password, this.password);
  return isPasswordMatch;
};

module.exports = mongoose.model("User", UserSchema);
