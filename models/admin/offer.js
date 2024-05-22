const mongoose=require("mongoose")

const offerSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",
    },
    discountPercent: {
        type: Number,
        required: true
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
    }

})

module.exports = mongoose.model("Offers", offerSchema);