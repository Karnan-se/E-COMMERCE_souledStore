 
 const mongoose = require("mongoose");

 const resetToken = new mongoose.Schema({


    email:{
        type:String,
        required:true,
    },
                   
    passwordResetToken: {
        type: String,
        required: false,
        expires: 120,
    },
    createdon:{
        type: Date,
        default: Date.now(),
        expires : 120,
    },

 })
    
  
  
  
  module.exports =mongoose.model("resetToken", resetToken)