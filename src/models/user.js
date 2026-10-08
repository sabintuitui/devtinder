const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,

  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,

  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,

  },
  gender: {
    type: String,
    
  },
  about:{
    type: String,
    default: "This is default value of about",

  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
