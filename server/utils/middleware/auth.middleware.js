const config = require("config");
const jwt = require("jsonwebtoken");
const { createError } = require("../htpp-response");

function isAdmin(req, res, next) {
  if (req.user.role !== "ADMIN")
    return res
      .status(401)
      .send(
        createError(
          401,
          "Access Denied for this user.This is for authorized admins only."
        )
      );
  else next();
}

function isAuthenticated(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send(createError(401, "This service is for authorised users only."));

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res
      .status(401)
      .send(
        createError(400, "Your session data was destroyed. go to login again")
      );
  }
}

module.exports = { isAdmin, isAuthenticated };
