const mongoose = require('mongoose');
const {format} = require('date-fns')
const bcrypt = require("bcrypt")
const user = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:false
    },
    isActive:{
        type:Boolean,
        required:false,
        default:true
    },
    passwordResetToken: {
        type: String,
        required: false,
    },
    passwordResetTokenExpires: {
        type: Date,
        required: false,
    },
    Address:[{
        housename:{
            type:String,
            required: false,
        },
        Street:{
            type:String,
            required:false,
        },
        City:{
            type:String,
            required:false,
        },
        State:{
            type:String,
            required:false,
        },
        status:{
            type:Boolean,
            default: false,
        },
        
    }],
 
  
});


    user.pre('save',async function(next){

        try {
            if(!this.date) {
                const currentdate = new Date();
                this.date= currentdate;
            }
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    

    user.methods.formateDate = function () {
        return format(this.date, 'dd-MM-yyyy')
    }
    

    module.exports=mongoose.model('user',user);
