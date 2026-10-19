const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const requestRouter = express.Router();
const ConnectionRequest  = require("../models/requestConnection.js");

requestRouter.post(
  "/request/send/intrested/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      console.log(connectionRequest);
      const data = await connectionRequest.save();
      res.json({message:"Connection send Sucessfully", data});
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  },
);

module.exports = requestRouter;
