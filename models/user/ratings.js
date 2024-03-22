const mongoose = require("mongoose");

const ratings = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetails",
        required:true,
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order",
        required:false,
    },
    rating:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "addproduct",
            required: true,
        },
        hisRatings: {
            type:Number,
            default:0,
            required:false,
        },
        size:{
            type:String,
            required:false,
        },
        feedback:{
            type:String,
            required:false,
        }
    }]
})

module.exports= (mongoose.model("ratings", ratings))


