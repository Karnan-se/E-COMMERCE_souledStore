const mongoose= require("mongoose");
const bcrypt = require("bcrypt")
const admin = new mongoose.Schema({
     name: {
        type:String,
        required:false,
     },
     email:{
      type:String,
      required:true,
     },
     password:{
      type:String,
      required:true,
     },
     dateOfBirth: {
        type:Number,
        required: false,
     },
     mobileNumber:{
        type:Number,
        required:false,
     },
    
});
module.exports=(mongoose.model("admin", admin))
