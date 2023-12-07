const mongoose= require("mongoose");
const admin = new mongoose.Schema({
     name: {
        type:String,
        required:true,
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
        required: true,
     },
     mobileNumber:{
        type:Number,
        required:true,
     }
})

module.exports=(mongoose.model("admin", admin))
