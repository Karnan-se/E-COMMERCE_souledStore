const mongoose = require("mongoose");
const asyncLookup = require("../../utils/asynclookup")
const {lookupAllCategory}= require("../../utils/lookupallCat")

const product = require("../../models/addproduct/addproduct");
const { type } = require("os");
let shop_product_right = async(req, res)=>{
    try {
         const productId = req.query.productId;
         console.log(productId)
         const productDetails = await product.findOne({_id:productId})
         const data= req.session.userisAuth;
         console.log(productDetails)
       

        const brandId = new mongoose.Types.ObjectId(productId);
        console.log(brandId);

        const fcat =  await asyncLookup.karnan("brands","brand","_id",brandId)
        const brandDetail = fcat[0]?.newcat[0] ?? null;
        console.log(brandDetail);
        const brandid = brandDetail._id;
        console.log(brandid);
        const relatedProducts = await product.find({brand:brandid});
        
        console.log(relatedProducts);
        
        
        res.render("user/user-shop-product-right.ejs",{productDetails,brandDetail, relatedProducts, data})

        
    } catch (error) {
        console.log(error.message)
        
    }
}





module.exports={shop_product_right}