const mongoose = require("mongoose");

const requestConnection = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "intrested", "accepeted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  requestConnection,
);
module.exports = ConnectionRequest;
