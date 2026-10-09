const mongoose = require("mongoose");
const validator = require("validator");

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
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid" + value);
      }
    }

  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Not a strong password" +  value);
      }
    }
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
