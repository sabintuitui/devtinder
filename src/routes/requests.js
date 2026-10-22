const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/requestConnection.js");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "intrested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status..." + status });
      }
      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingConnection) {
        return res.status(400).json({ message: "Connection already exist" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      console.log(connectionRequest);
      const data = await connectionRequest.save();
      res.json({ message: "Connection send Sucessfully", data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  },
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status is not allowed"});
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status: "intrested",
        });
       
        if(!connectionRequest){
            return res.status(404).json({message: "Connection not found "});
        }
         connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.send("Connection Successful" , data);
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);

    }
})

module.exports = requestRouter;
