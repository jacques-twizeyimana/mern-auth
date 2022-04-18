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
      default: "USER",
    },
    profileImage: {
      type: String,
      required: false,
      default: "/uploads/profiles/default.jpg",
    },
  },
  { timestamps: true }
);



userSchema.virtual("messagesSent", {
  ref: "Message",
  localField: "_id",
  foreignField: "senderId",
});

userSchema.virtual("messagesReceived", {
  ref: "Message",
  localField: "_id",
  foreignField: "receiverId",
});

// Set Object and Json property to true. Default is set to false
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });


const User = mongoose.model("User", userSchema);

module.exports = User;
