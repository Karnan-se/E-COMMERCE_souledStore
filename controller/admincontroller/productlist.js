const { log } = require("console");
const products = require("../../models/addproduct/addproduct")
const licensedcategories= require("../../models/addproduct/licensedchar")
const categories= require("../../models/addproduct/categories")
const brands = require("../../models/addproduct/brand")
const mongoose = require("mongoose");
const asyncLookup = require('../../utils/asynclookup.js');



let page_products_list = async(req, res)=>{
    try {

        let product= await products.find()
        res.render("admin/page-products-list.ejs",{product})
        
    } catch (error) {
        console.log(error);
        
    }
}


let productblock = async( req, res)=>{
    try {

        
        let userId= req.query.userid
        console.log(userId);
        const newproduct= await products.findOne({_id:userId})


        if(newproduct){
        if( newproduct.isActive == true){
        await products.updateOne({_id:userId},{$set:{isActive:false}})
        console.log("product blocked")
        }else if(newproduct.isActive== false){
            await products.updateOne({_id:userId},{$set:{isActive:true}})
            console.log("product unlocked")
        }
        res.redirect("/page-products-list")

    }else{
        console.log("no match is found");
    }

        
    } catch (error) {
        console.log(error.message)
        
    }
    
}

let productdelete= async(req, res)=>{

    try {

        
        let userId= req.query.userid
        console.log(userId);
        const newproduct= await products.findOne({_id:userId})

        if(newproduct){    
            await products.deleteOne({_id:userId})
            console.log("product deleted");
            const data = "hey";
            res.status(200).json({data});
          
        }else{
        console.log("no match is found");
    }

        
    } catch (error) {
        console.log(error.message)
        
    }

}
let editproduct = async(req, res)=>{
    try {
        const license= await licensedcategories.find()
        const newcategories = await categories.find()
        const brand = await brands.find() 

        const productDetail = req.query.userid;
        console.log(productDetail);
        
        const productId = new mongoose.Types.ObjectId(productDetail);      
          console.log(productId)


        const fcat=await asyncLookup.karnan("categories","category","_id",productId);
        const licenseModule=await asyncLookup.karnan("licenses","license","_id",productId);
        const brandModule= await asyncLookup.karnan("brands","brand","_id",productId);

        const licenseCategory = (licenseModule && licenseModule[0] && licenseModule[0].newcat && licenseModule[0].newcat.length > 0) ?
        licenseModule[0].newcat[0]._id?.toString() ?? null : null;

        let brandCategory = null;
        if (brandModule && brandModule.length > 0 && brandModule[0].newcat && brandModule[0].newcat.length > 0) {
            brandCategory = brandModule[0].newcat[0]._id?.toString() ?? null;
            console.log(`${brandCategory} this is value of brandCategory`)
        } 
        const ApparelCategory = (fcat && fcat[0] && fcat[0].newcat && fcat[0].newcat.length > 0) ?
         fcat[0].newcat[0]._id?.toString() ?? null : null;
         const product= await products.findOne({_id:productDetail})
        console.log("worked")
      
       
       res.render("admin/editproduct.ejs",{product,license,newcategories,brand,ApparelCategory,brandCategory,licenseCategory})

        
        
    } catch (error) {
        
    }
}

let deleteImage = async(req, res)=>{
    try {
        

    const imageName= req.query.imageName;
    const selectedproduct= req.query.id
    console.log(selectedproduct)
    console.log(imageName);

        const imagenametoDelete = await products.updateOne({_id:selectedproduct},{$pull:{images:imageName}})
        console.log(imagenametoDelete);
    console.log("product deleted")

    
    res.status(200).json({message:`response send`});
        
    } catch (error) {
        
        console.log(error.message);
    }
}
let updateprouct = async(req, res)=>{
    try {
        const images = req.files.map(file => file.filename);
        console.log(images)

        

       
        let  {productTitle,
            productSKU,
            productColor,
            
            description,
            price,
            gender,
            tags,
            category,
            subcategory,
            brand,
            size_s,
            size_m,
            size_l,
            size_xl,
            size_xxl}= req.body

            console.log(productTitle)
        
        
        const updatedproduct= await products.updateOne({productname:productTitle},{$set:{

            productname:productTitle,
            stock:productSKU,
            color:productColor,
           
            category:category,
            license:subcategory,
            brand:brand,
            description:description,
            
            price:price,
            tags:tags,
            gender:gender,
            
            "sizes.S.newStock":size_s,
            "sizes.M.newStock":size_m,
            "sizes.L.newStock":size_l,
            "sizes.XL.newStock":size_xl,
            "sizes.XXL.newStock":size_xxl,
        }, $addToSet:{images: {$each: images}}})

        console.log(updatedproduct)
        console.log("product updated")

        
        res.status(200).json({message:`product added successfully`});
        
    } catch (error) {
        console.log(error.message)
        
    }
}


module.exports = {page_products_list,productblock, editproduct, deleteImage,updateprouct, productdelete}