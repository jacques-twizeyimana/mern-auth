const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../model/user.model.js");
const { createError, createSuccess } = require("../utils/htpp-response");
const { isAuthenticated } = require("../utils/middleware/auth.middleware.js");

var router = express.Router();

router.post("/login", async (req, res) => {
  let schema = Joi.object({
    email: Joi.string().min(5).max(70).required().email(),
    password: Joi.string().min(5).max(70).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.send(createError(400, error.details[0].message));

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.send(createError(400, "Incorrect email or password"));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.send(createError(400, "Incorrect email or password"));

  let token = generateAuthToken(user);
  return res.send({
    success: true,
    token,
    user: _.pick(user, [
      "fname",
      "lname",
      "email",
      "_id",
      "isAdmin",
      "createdAt",
    ]),
  });
});

router.get("/current", isAuthenticated, (req, res) => {
  return res.send(createSuccess(req.user));
});
