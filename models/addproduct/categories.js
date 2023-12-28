const mongoose = require("mongoose");

const categories = new mongoose({
    categoryname:{
        type:String,
        required:true,
    }

    })