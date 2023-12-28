const mongoose = require("mongoose");

const license = new mongoose.Schema ({

    categoryname:{
        type:String,
        required:true,
    },
    categoryDescription:{
        type:String,
        required:false
    },

    isActive:{
        type:Boolean,
        default:true,
        required:false
    }


    })

    license.pre('save', async function(next){
        try{
            this.isActive= true;
            next();
        }catch(error){
            console.log(`this is the middleware for save function ${error}`)
        }
    })

    module.exports=mongoose.model("license", license)