const express = require("express");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth.js");
const { validatorProfileEdit } = require("../utils/validator.js");
const profileRouter = express.Router();
const User = require("../models/user.js");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const isDecodeCookie = await jwt.verify(token, "DevTinder123");
    const { _id } = isDecodeCookie;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("Please Login!");
    } 
      return res.send(user);
    
  } catch (err) {
    if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError" ||
    err.name === "NotBeforeError"
  ) {
    return res.status(401).send("Please Login!");
  }
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validatorProfileEdit(req)) {
      throw new Error("Invalid Edit field");
    }
    const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({data:loggedInUser});
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("profile/forgotPassword", userAuth, async (req, res) => {
  try {
    const { password } = req.body;
    
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
