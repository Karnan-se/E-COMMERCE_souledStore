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
         console.log(productDetails)
       

        const brandId = new mongoose.Types.ObjectId(productId);
        console.log(brandId);

        const fcat =  await asyncLookup.karnan("brands","brand","_id",brandId)
        console.log(fcat[0]?.newcat[0] ?? null)
        const brandDetail = fcat[0]?.newcat[0] ?? null;

        const AllBrandName = await lookupAllCategory("brands","brand","_id")
    
        const brandNames = []
        for(let i= 0; i<AllBrandName.length; i++){
           brandNames.push(AllBrandName[i]?.newcat[0]?? null)

        }
        brandNames.forEach((files)=>{
           console.log(files)
        })
        const dummy ={}
        const uniqueBrandNames = brandNames.filter((item, index, array) => {
            if(item === null){
                return false ;

            }

            if(!dummy[item]){
                dummy[item] = true;
                return  true;
            }
            return false;
        });
        
        

        res.render("user/user-shop-product-right.ejs",{productDetails,brandDetail,uniqueBrandNames})

        
    } catch (error) {
        console.log(error.message)
        
    }
}





module.exports={shop_product_right}