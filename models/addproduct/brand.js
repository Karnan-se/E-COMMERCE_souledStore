const mongoose = require("mongoose");

const brand = new mongoose.Schema ({

    name:{
        type:String,
        required:false,
    },

    isActive:{
        type:Boolean,
        default:true,
        required:false
    },
    createdAt:{
        type:Date,
        default:()=>Date.now()
    },
    images:[{
        type:String,
        required:false,
    }]


    })
    


    module.exports=mongoose.model("brand", brand)