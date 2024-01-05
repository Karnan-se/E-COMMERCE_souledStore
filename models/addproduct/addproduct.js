const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const addproduct = new mongoose.Schema({



    productid:{
        type:String,
        default: uuidv4(),
        required: false,
        
    },

    productname:{
        type:String,
        required: true
    },
    stock:{
        type:Number,
        required:true,
    },
    color:{
        type:String,
        required:false,
    },
    size:{
        type:String,
        required:true,
    },


    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: false
    },

    license:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'license',
        required:false
    },

    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'brand',
        required:false
    },

    description:{
        type:String,
        required:true
    },
    images: [{
        type:String,
        required:true
    }],
    price:{
        type:Number,
        required:true

    },
     tags:{
        type:String,
        required:false
     },
    gender:{
        type:Boolean,
        required:true
    },
    createdat:{
        type: Date,
        default:Date.now,
        required:false
    },
    isActive:{
        type:Boolean,
        default:true,
        required:false
    }
})





module.exports= (mongoose.model("addproduct", addproduct))