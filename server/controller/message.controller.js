const Joi = require("joi");
const express = require("express");

const Message = require("../model/message.model");
const { createError, createSuccess } = require("../utils/htpp-response");
const { isAuthenticated } = require("../utils/middleware/auth.middleware");
const { io } = require("..");

var router = express.Router();

router.get("/:receiverId", isAuthenticated, async (req, res) => {
  const receiverId = req.params.receiverId;
  Message.find({
    $or: [
      { receiverId, senderId: req.user._id },
      { senderId: receiverId, receiverId: req.user._id },
    ],
  })
    .populate("receiverId")
    .populate("senderId")
    .then((messages) => res.send(createSuccess(messages)))
    .catch((err) => res.status(500).send(createError(500, err.message)));
});

router.post("/", isAuthenticated, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.send(createError(400, error.details[0].message));

  try {
    const message = new Message({ ...req.body, senderId: req.user._id });
    await message.save();

    const populatedMessage = await Message.findById(message._id)
      .populate("receiverId")
      .populate("senderId");
    // emit new message event
    // io.emit("newMessage", populatedMessage);

    return res.send(createSuccess(populatedMessage));
  } catch (error) {
    res.send(createError(500, error.message || "Failed to send message"));
  }
});

function validateMessage(body) {
  const schema = Joi.object({
    message: Joi.string().max(1000).min(1).required(),
    receiverId: Joi.string().max(255).min(3),
  });
  return schema.validate(body);
}

module.exports = router;
