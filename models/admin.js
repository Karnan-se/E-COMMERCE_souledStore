const mongoose= require("mongoose");

const admin = new mongoose.Schema({
     name: {
        type:String,
        required:true,
     },
     age: {
        type:Number,
        required: true,
     },
     mobileNumber:{
        type:Number,
        required:true,
     }
})

module.exports=(mongoose.model("admin", admin))
