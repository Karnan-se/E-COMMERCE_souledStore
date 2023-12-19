const mongoose = require('mongoose');
const user = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    passsword:{
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
    }
});


    user.pre('save',function(next){
        const currentdate = new Date();
        this.date= currentdate;
        next();
    })

    user.methods.formateDate = function () {
        return format(this.date, 'dd-MM-yyyy')
    }

    module.exports=mongoose.model('user',user);
