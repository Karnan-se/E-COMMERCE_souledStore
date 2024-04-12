const mongoose = require("mongoose")
const {format} = require('date-fns')

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
    history:[
        {
            amount:{
                type:Number,
                required:false,
            },
            type:{
                type:String,
                required:false,
            },
            createdAt:{
                type:Date,
                default:()=>Date.now(),
                required:false
            },
            transactionId:{
                type:String,
                required:false,
            },
            description:{
                type:String,
                required:false,
            },
        }
    ],
   
    
})

wallet.pre("save", function(next) {
    
        this.history.forEach(item => {
           
                const randomNum = Math.floor(100000 + Math.random() * 90000);
                item.transactionId = `TRN${randomNum}`;
            
        });
   
    
    next();
})


module.exports= (mongoose.model("wallet", wallet))
