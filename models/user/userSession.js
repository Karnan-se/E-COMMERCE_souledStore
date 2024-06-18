const mongoose = require("mongoose")

const userSession = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:false,
        },

})

module.exports= (mongoose.model("userSession", userSession))