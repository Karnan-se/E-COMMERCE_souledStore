const mongoose = require("mongoose");
const cart = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetails",
        required:true,
    },
   items:[{
    type:  mongoose.Schema.Types.ObjectId,
    ref: "addproduct",
    required: true,
   }],

   totalprice:{
    type: Number,
    required: false,
   },

   size:[{
    type: String,
    required: false,
   }]

   
})

module.exports= (mongoose.model("cart", cart))