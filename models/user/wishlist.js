
const mongoose = require("mongoose");

const wishlist = new mongoose.Schema({

    userId:{
        type:String,
        required:false,

    },
    product:[
        {
        productId:{
            type:String,
            ref:"addproduct",
            required:false,
        },

        createdat:{
            type:Date,
            default:()=>Date.now(),
            required:false
        },
        }
    ]
});
module.exports=(mongoose.model("wishlist", wishlist))