const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

const User = require("../model/user.model.js");
const { hashPassword } = require("../utils/password");
const { createError, createSuccess } = require("../utils/htpp-response");
const {
  isAuthenticated,
  isAdmin,
} = require("../utils/middleware/auth.middleware.js");

var router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find().select(
      "_id firstName lastName email role createdAt profileImage"
    );
    return res.send(createSuccess(users));
  } catch (error) {
    return res.status(500).send(createError(500, "No users found"));
  }
});

router.get("/role/admins", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find({ role: "ADMIN" }).select(
      "_id firstName lastName email role createdAt profileImage"
    );
    return res.send(createSuccess(users));
  } catch (error) {
    return res.status(500).send(createError(500, "No users found"));
  }
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      res.send(
        createSuccess(
          _.pick(user, [
            "isAdmin",
            "_id",
            "lastName",
            "firstName",
            "email",
            "createdAt",
          ])
        )
      )
    )
    .catch((err) => {
      res
        .status(500)
        .send(createError(500, err.message || "Internal server error"));
    });
});

router.get("/email/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user)
    return res.send(
      createSuccess(
        _.pick(user, [
          "isAdmin",
          "_id",
          "lastName",
          "firstName",
          "email",
          "createdAt",
        ])
      )
    );
  return res
    .status(404)
    .send(createError(404, "User with this email address was not found"));
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
      createSuccess(
        _.pick(newUser, [
          "firstName",
          "lastName",
          "email",
          "_id",
          "isAdmin",
          "createdAt",
        ])
      )
    );
});

router.put("/", isAuthenticated, async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().max(255).min(3),
    lastName: Joi.string().max(255).min(3),
    email: Joi.string().max(255).min(3).email(),
    role: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.send(createError(400, error.details[0].message));

  // let hashedPswd = await hashPassword(req.body.password);
  // req.body.password = hashedPswd;

  User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true })
    .then((user) =>
      res.send(
        createSuccess(
          _.pick(user, [
            "firstName",
            "lastName",
            "email",
            "_id",
            "isAdmin",
            "createdAt",
          ])
        )
      )
    )
    .catch((err) => res.send(createError(404, "User with this ID was found")));
});


router.put("/change-role", isAuthenticated, isAdmin, async (req, res) => {
  User.findOneAndUpdate({ _id:req.body.userId }, {role:req.body.role}, { new: true })
    .then((user) =>
      res.send(
        createSuccess(
          _.pick(user, [
            "firstName",
            "lastName",
            "email",
            "_id",
            "isAdmin",
            "createdAt",
          ])
        )
      )
    )
    .catch((err) => res.send(createError(404, "User with this ID was found")));
});

// 

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

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().max(255).min(3).required(),
    lastName: Joi.string().max(255).min(3).required(),
    email: Joi.string().max(255).min(3).required().email(),
    password: Joi.string().max(255).min(6).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}

module.exports = router;
