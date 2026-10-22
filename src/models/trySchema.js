const mongoose = require("mongoose");

const trySchema = new mongoose.Schema({
    firstName :{
        type: String,
        minLenght: 2,

    },
    email:{
        type: String,
        unique: true,
    }
});

const TryModel = mongoose.model("TryModel", trySchema);

module.exports = TryModel;
