const mongoose = require("mongoose");

const addproduct = new mongoose.Schema({

    productname:{
        type:String,
        required: true
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'category',
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

    size:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:false,
    },

    description:{
        type:String,
        required:true
    },
    images: [{
        data:Buffer,
        contentType:String
    }],
    stock:{
        type:Number,
        required:true,
    }
})


module.exports= (mongoose.model("addproduct", addproduct))