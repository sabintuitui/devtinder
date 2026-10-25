const mongoose = require("mongoose");

const requestConnection = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //reference to the User Collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "intrested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

requestConnection.index({fromUserId:1, toUserId:1})

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  requestConnection,
);
module.exports = ConnectionRequest;
