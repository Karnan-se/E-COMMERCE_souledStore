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
        type: String,
        required: false,
    }


})

module.exports = mongoose.model("Offers", offerSchema);