const Joi = require("joi");
const express = require("express");

const Text = require("../model/text.model");
const { createError, createSuccess } = require("../utils/htpp-response");
const { isAuthenticated } = require("../utils/middleware/auth.middleware");

var router = express.Router();

router.get("/", async (req, res) => {
  let text = await Text.findOne();

  if (!text) {
    text = new Text({});
    await text.save();
  }

  return res.send(createSuccess(text));
});

router.put("/", isAuthenticated, async (req, res) => {
  const { error } = validateText(req.body);
  if (error) return res.send(createError(400, error.details[0].message));

  Text.findOneAndUpdate(null, req.body, { new: true })
    .then((text) => res.send(createSuccess(text)))
    .catch((err) =>
      res.send(createError(404, err.message || "Internal server error"))
    );
});

function validateText(body) {
  const schema = Joi.object({
    content: Joi.string().max(1000).min(10).required(),
    lastUpdatedBy: Joi.string().max(255).min(3),
  });
  return schema.validate(body);
}

module.exports = router;
