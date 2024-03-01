const mongoose = require("mongoose");
const cart = new mongoose.Schema({

    name:{
        type: String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,

    },
    userDetails:{
        type:String,
        required:true,
    }
   
})

module.exports= (mongoose.model("cart", cart))