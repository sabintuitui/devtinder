const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validatorSignUp } = require("../utils/validator.js");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validate the data first
    validatorSignUp(req);
    const { firstName, lastName, email, password } = req.body;

    //encryption password

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("Users added sucessfully...");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email is not correct");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DevTinder123", {
        expiresIn: "7d",
      });
      res.cookie("token", token);
      res.send("Login Sucessfully");
    } else {
      throw new Error("Password is not Match");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send();
});
module.exports = authRouter;
