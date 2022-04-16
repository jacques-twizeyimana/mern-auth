const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 3,
    },
    lastName: {
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
    role: {
      type: String,
      required: true,
      default: "ADMIN",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
