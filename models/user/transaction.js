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

  
    products:[{
        product_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
        },
        productAmount:{
          type:Number,
          required:true,
        },
        payementStatus:{
          type:String,
          required:false,
    
        },
    }],


})
module.exports =mongoose.model("transaction", transaction)