const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  google : {
     name : {
      type : String,
      required : true
     },
     email : {
      type : String,
      required : true
     },
     details : {
      picture : String
     }
  },
  role : {
    type : String,
    default : "free"
  }
},{timestamps : true});

const User = mongoose.model("User", UserSchema);

module.exports = User;
