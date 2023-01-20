const mongoose = require("mongoose");


const leadSchema = new mongoose.Schema({
    name : String,
    email : String ,
    phoneNumber : String,
    message : String,
    course : String ,
})

const Lead = mongoose.model("Lead",leadSchema);

module.exports = Lead ;