const mongoose = require("mongoose")

const wallet = new mongoose.Schema({

    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:false,
    },
    TotalAmount:{
        type:Number,
        required:true,
        default:0,
    },
    
})

module.exports= (mongoose.model("wallet", wallet))
