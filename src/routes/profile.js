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
      throw new Error("Invalid Token");
    }
    const isDecodeCookie = await jwt.verify(token, "DevTinder123");
    const { _id } = isDecodeCookie;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not found");
    } else {
      res.send(user);
    }
  } catch (err) {
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
    console.log(loggedInUser);
    await loggedInUser.save();
    res.send("Profile Edit Successfull...");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
