const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

const User = require("../model/user.model.js");
const { hashPassword } = require("../utils/password");
const { createError } = require("../utils/htpp-response");
const {
  isAuthenticated,
  isAdmin,
} = require("../utils/middleware/auth.middleware.js");

var router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().select(
    "_id fname lname email isAdmin createdAt"
  );
  if (users) return res.status(201).send(users);
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      res.send(
        _.pick(user, ["isAdmin", "_id", "lname", "fname", "email", "createdAt"])
      )
    )
    .catch((err) => {
      res.send(createError(500, err.message || "Internal server error"));
    });
});

Joi.valid();

router.get("/email/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user)
    return res.send(
      _.pick(user, ["isAdmin", "_id", "lname", "fname", "email", "createdAt"])
    );
  return res.send(
    createError(404, "User with this email address was not found")
  );
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.send(createError(400, error.details[0].message));

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.send(createError(404, "This email address is already taken"));

  let newUser = new User(req.body);

  const hashed = await hashPassword(newUser.password);
  newUser.password = hashed;
  await newUser.save();

  return res
    .status(201)
    .send(
      _.pick(newUser, [
        "fname",
        "lname",
        "email",
        "_id",
        "isAdmin",
        "createdAt",
      ])
    );
});

router.put("/", async (req, res) => {
  const schema = Joi.object({
    _id: Joi.string().min(10).max(30).required(),
    fname: Joi.string().max(255).min(3).required(),
    lname: Joi.string().max(255).min(3).required(),
    email: Joi.string().max(255).min(3).required().email(),
    password: Joi.string().max(255).min(6).required(),
    isAdmin: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.send(createError(400, error.details[0].message));

  let hashedPswd = await hashPassword(req.body.password);
  req.body.password = hashedPswd;

  User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((user) =>
      res.send(
        _.pick(user, ["fname", "lname", "email", "_id", "isAdmin", "createdAt"])
      )
    )
    .catch((err) => res.send(createError(404, "User with this ID was found")));
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  if (!req.user.isAdmin || req.params.id !== req.user._id) {
    return res.send(createError(403, "Action unauthorised"));
  }

  User.findByIdAndRemove(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => {
      return res.send(createError(404, "User not found"));
    });
});

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

function validateUser(user) {
  const schema = Joi.object({
    fname: Joi.string().max(255).min(3).required(),
    lname: Joi.string().max(255).min(3).required(),
    email: Joi.string().max(255).min(3).required().email(),
    password: Joi.string().max(255).min(6).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}

function generateAuthToken(user) {
  return jwt.sign({ user }, config.get("jwtPrivateKey"));
}

module.exports = router;
