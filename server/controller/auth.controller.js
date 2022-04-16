const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

const User = require("../model/user.model");
const ResetCode = require("../model/reset-code.model");
const { createError, createSuccess } = require("../utils/htpp-response");
const { isAuthenticated } = require("../utils/middleware/auth.middleware");
const { hashPassword } = require("../utils/password");

var router = express.Router();

// upload images
const upload = require("../utils/multer");
const { sendEmail } = require("../utils/nodemailer");

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
  isAuthenticated,
  upload.single("image"),
  (req, res) => {
    if (!req.file) return res.send(createError(400, "No file uploaded"));
    User.findByIdAndUpdate(
      req.user._id,
      { profileImage: "/uploads/profiles/" + req.file.filename },
      { new: true }
    )
      .then((updated) => res.send(createSuccess(updated)))
      .catch((err) =>
        res
          .status(500)
          .send(createError(500, err.message || "Internal server error"))
      );
  }
);

router.post("/initiate-reset", async (req, res) => {
  if (!req.body.email || req.body.email.length < 1)
    return res.send(createError(400, "Email is required"));
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.send(
      createError(
        400,
        "This email is not associated with any mern-auth account. Please double check your email"
      )
    );

  const otp = Math.floor(100000 + Math.random() * 900000);
  const newResetCode = new ResetCode({
    code: otp,
    userId: user._id,
    email: user.email,
  });

  await newResetCode.save();
  await sendEmail({
    receiver: user.email,
    subject: "Password reset requested",
    html: `<div><h3>Password reset triggered for your account</h3><p>You password reset code is <strong>${otp}</strong></p> `,
  });
  return res.send(createSuccess(newResetCode));
});

router.post("/reset-password", async (req, res) => {
  let schema = Joi.object({
    email: Joi.string().min(5).max(70).required().email(),
    password: Joi.string().min(5).max(70).required(),
    confirmPassword: Joi.string(),
    code: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.send(createError(400, error.details[0].message));

  let code = await ResetCode.findOne({
    email: req.body.email,
    code: req.body.code,
  });
  if (!code) return res.send(createError(400, "Invalid code"));
  if (code.status !== "PENDING" || code.expiresOn < Date.now())
    return res.send(createError(400, "Code was already used or has expired"));

  const password = await hashPassword(req.body.password);

  User.findOneAndUpdate({ email: req.body.email }, { password }, { new: true })
    .then((user) => res.createSuccess(user))
    .catch((err) =>
      res
        .status(500)
        .send(createError(500, err.message || "Internal server error"))
    );
});


function generateAuthToken(user) {
  return jwt.sign({ user }, config.get("jwtPrivateKey"));
}


module.exports = router;