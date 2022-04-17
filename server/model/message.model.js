const mongoose = require("mongoose");

var ChatMessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      min: 1,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "SENT",
    },
  },
  { timestamps: true }
);

const ResetCode = mongoose.model("Message", ChatMessageSchema);

module.exports = ResetCode;
