const mongoose = require("mongoose")
const otp = new mongoose.Schema({

    otp:{
        type:Number,
        required:true,

    },
    gmail:{
        type:String,
        required:true,
    },

    createdon:{
        type:Date,
        default:Date.now(),
        expires:60

        
    }

})

module.exports=mongoose.model('otp',otp);
