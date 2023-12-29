const mongoose = require("mongoose");

const brand = new mongoose.Schema ({

    name:{
        type:String,
        required:true,
    },

    isActive:{
        type:Boolean,
        default:true,
        required:false
    },
    createdAt:{
        type:Date,
        default:()=>Date.now()
    }


    })



    module.exports=mongoose.model("brand", brand)