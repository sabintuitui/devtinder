const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/devTinder");
    console.log("Mongo db Connect sucessfully");
  } catch (err) {
    console.err("Cannnot conect " + err);
  }
};

module.exports = connectDB;
