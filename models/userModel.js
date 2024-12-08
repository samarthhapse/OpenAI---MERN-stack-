const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const cookie = require("cookie");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is mandatory"],
  },
  email: {
    type: String,
    required: [true, "email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "username is mandatory"],
    minlength: [6, "password length must be more than 6"],
  },
  customerId: {
    type: String,
    default: "",
  },
  subscription: {
    type: String,
    default: "",
  },
});
// 1.hashed password
// pre => means run this function before saving schema
userSchema.pre("save", async function (next) {
  // update
  if (!this.isModified("password")) {
    next();
  }
  // hashing
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// 2.match password => create a method named matchpassword
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// generating/sign token
userSchema.methods.getSignedToken = function (res) {
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
  );
  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIREIN}
  );
  res.cookie("refreshToken", `${refreshToken}`, {
    maxAge: 86400 * 700,
    httpOnly: true,
  });
};

const User = mongoose.model("User", userSchema)
module.exports = User;