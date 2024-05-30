const mongoose=require("mongoose")

const offerSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "addproduct",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "categories",
    },
    discountPercent: {
        type: Number,
        default:0,
       
    },
    maxDiscountAmount: {
        type: Number,
        required: true
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    is_List:{
        type:Boolean,
        default:false
    },
    ExpiryDate:{
        type:Date,
        required:true
    },
    OfferName :{
        type: String,
        required:false,
    },
    fixedRate:{
        type: Number,
        required: false,
        default:0,
    }


})

module.exports = mongoose.model("Offers", offerSchema);