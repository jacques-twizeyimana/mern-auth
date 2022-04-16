const mongoose = require("mongoose");

var ResetCodeSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "PENDING",
    },
    expiresOn: {
      type: Date,
      required: true,
      // code expires in 10 minutes
      default: Date.now() + 10 * 60 * 1000,
    },
  },
  { timestamps: true }
);

const ResetCode = mongoose.model("reset-code", ResetCodeSchema);

module.exports = ResetCode;
