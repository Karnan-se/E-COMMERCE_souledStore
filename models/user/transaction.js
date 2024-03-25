const mongoose=  require("mongoose");

const transaction= new mongoose.Schema({

    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true,

    },
    OrderID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order",
        required:false,
    },
    modeoftransaction:{
        type:String,
        required:false,
        
    },
    payementStatus:{
        type:String,
        required:false,

    },
    paymentAmount:{
        type:String,
        required:true,
    }

})
module.exports =mongoose.model("transaction", transaction)