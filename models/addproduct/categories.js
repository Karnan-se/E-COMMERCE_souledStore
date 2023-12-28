const mongoose = require("mongoose");

const categories = new mongoose.Schema ({

    categoryname:{
        type:String,
        required:true,
    },
    categoryDescription:{
        type:String,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true,
        required:false
    }


    })

    categories.pre('save', async function(next){
        try{
            this.isActive= true;
            next();
        }catch(error){
            console.log(`this is the middleware for save function ${error}`)
        }
    })

    module.exports=mongoose.model("categories", categories)