const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AddressSchema = mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true, minlength: 6, maxlength: 6 },
  country: { type: String, required: true },
  isDefault: {
    type: Boolean,
    default: true,
  },
  loc: {
    type: { type: String },
    coordinates: [],
  },
});

AddressSchema.index({ loc: "2dsphere" });

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
    enum: ["admin", "user", "seller"],
    default: "user",
  },
  addresses: [AddressSchema],
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.pre("save", async function () {
  if (!this.isModified("addresses")) return;

  this.addresses = this.addresses.map((add, index) => {
    if (index !== this.addresses.length - 1) {
      add.isDefault = false;
    }
    return add;
  });
  this.addresses = this.addresses.reverse()
});

UserSchema.methods.comparePassword = async function (password) {
  const isPasswordMatch = await bcrypt.compare(password, this.password);
  return isPasswordMatch;
};

module.exports = mongoose.model("User", UserSchema);
