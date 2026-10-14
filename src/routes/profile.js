const express = require("express")
const jwt = require("jsonwebtoken");
const {userAuth} = require("../middlewares/auth.js");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if(!token){
      throw new Error("Invalid Token");
    }
    const isDecodeCookie = await jwt.verify(token, "DevTinder123");
    const { _id } = isDecodeCookie;
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User Not found");
    }
    else{
      res.send(user);
    }
    
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
