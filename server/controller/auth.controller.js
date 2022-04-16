const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

const User = require("../model/user.model.js");
const { createError, createSuccess } = require("../utils/htpp-response");
const { isAuthenticated } = require("../utils/middleware/auth.middleware.js");

var router = express.Router();

// upload images
const upload = require("../utils/multer");

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
    return res.send(createError(400, "Incorrect email or password "));

  let token = generateAuthToken(user);
  return res.send(
    createSuccess({
      token,
      user: _.pick(user, [
        "firstName",
        "lastName",
        "email",
        "_id",
        "role",
        "createdAt",
        "profileImage",
      ]),
    })
  );
});

router.get("/current", isAuthenticated, (req, res) => {
  return res.send(createSuccess(req.user));
});

router.put(
  "/change-profile",
  // isAuthenticated,
  upload.single("image"),
  (req, res) => {
    console.log(req.file);
    console.log("====================================");
    console.log(req.files);
    console.log("====================================");

    return res.send(createSuccess({}));
  }
);

router.post("/initiate-reset", async (req, res) => {
  if (!req.body.email || req.body.email.length < 1)
    return res.send(createError(400, "Email is required"));
  return res.send(createSuccess({ email }));
});

function generateAuthToken(user) {
  return jwt.sign({ user }, config.get("jwtPrivateKey"));
}


module.exports = router;