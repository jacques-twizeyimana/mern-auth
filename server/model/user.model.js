const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 3,
  },
  lname: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 3,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
