const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const addproduct = new mongoose.Schema({



    productid:{
        type:String,
        default: uuidv4(),
        unique: true,
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
        required: true
    },

    license:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'license',
        required:true
    },

    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'brand',
        required:true
    },

    description:{
        type:String,
        required:true
    },
    images: [{
        data:Buffer,
        contentType:String
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
    }
})





module.exports= (mongoose.model("addproduct", addproduct))