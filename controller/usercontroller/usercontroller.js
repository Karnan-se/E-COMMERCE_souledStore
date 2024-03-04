const { register } = require("module");
const moment = require("moment")
const user = require("../../models/user/userdetails")
const products = require("../../models/addproduct/addproduct")
const asyncLookup = require("../../utils/asynclookup")
const lookupAll = require("../../utils/lookupallCat")
const brand = require("../../models/addproduct/brand")
const mongoose = require("mongoose")
const categories= require("../../models/addproduct/categories");4
const cart = require("../../models/user/cart")



let user_index = async(req, res)=>{
    try {
        let message1=null;

    
        const threedays = new Date();
        threedays.setDate(threedays.getDate()-3)

        const product= await products.find({isActive:true})
        const ApparelCategory = await categories.find({isActive:true})
        const productDetails = await products.find({isActive:true, gender: true})
        const brandDetails = await brand.find({isActive: true})
        const fcat = await lookupAll.lookupAllCategory("categories", "category", "_id")
        const data= req.session.userisAuth;
        const userid = data?._id;
        const userID = new mongoose.Types.ObjectId(userid)
        const userinCart= await cart.findOne({userId:userID})
        console.log(userinCart);
        console.log("hey");

       
        const newProducts = await products.aggregate([{$match:{
            createdat: {$gte: threedays}}}])


        const lowtohigh = req.session.low_High;
        
            if(lowtohigh){
                delete req.session.low_High
               fcat.sort((a, b)=>{
                return a.price - b.price
               })
            
                
                return res.render("user/index.ejs",{message1, product:fcat, ApparelCategory, productDetails, brandDetails , data, newProducts, userinCart})    
            }
            const Hightolow = req.session.Highlow;
            
            if(Hightolow){
                delete req.session.Highlow;
                fcat.sort((a, b)=>{
                    return b.price - a.price;
                })
            }

            
        res.render("user/index.ejs",{message1, product:fcat, ApparelCategory, productDetails, brandDetails , data, newProducts, userinCart})
    } catch (error) {
        console.log(error.message);
        
        
    }

}

let userlogin = async (req, res)=>{
    try {
        let message1=null;
        if(req.session.emailerror){
            delete req.session.emailerror
             message1="username not exist or user is blocked"
        }else if(req.session.passworderror){
             message1="incorrect password"
             delete req.session.passworderror;
        } else{
            message1=null;
        }
        res.render("user/userlogin.ejs",{message1})
    } catch (error) {
        console.log(error);
        
    }
     
}

let user_register= async(req, res)=>{
    try {
       let message1 = ''
req.session.signuperror = false
        if(req.session.signuperror)
        {
            message1= 'Username already exists'
           delete req.session.signuperror
            await res.render("user/user-register.ejs",{message1})

        }
        else if(req.session.emailerror)
            {
                message1 = 'userId already exist please login '
                delete req.session.emailerror
                await res.render("user/user-register.ejs",{message1})

            }
else{
         await res.render("user/user-register.ejs",{message1})
}
    } catch (error) {
        console.log(error)
        
    }
}
const shop_grid_right = async(req, res)=>{
    try {
        const product = await products.find();
        const productId=product[0]._id
        console.log(productId)
        const ApparelCategory = await categories.find({isActive:true})
        
        
        
        const shirt = await asyncLookup.karnan("categories", "category","_id",productId )
        console.log(shirt[0]?.newcat[0].categoryname)
        const apparelcategoryId = req.query.ApparelCategory
        console.log(apparelcategoryId);
        
       
        
        const newproduct = await products.find({category:apparelcategoryId,});
       
        console.log(newproduct)
        

        
        

        res.render("user/user-shop-grid-right.ejs",{product:newproduct, ApparelCategory})
        
    } catch (error) {
        
    }
}

let submit_image = async(req, res)=>{
    try {
        
        const productImage = req.query.productId;
        console.log(productImage);
      
        const productDetails = await products.findOne({_id: productImage})
        console.log(productDetails)
        const data = productDetails
        
        res.status(200).json(data) 
        
    } catch (error) {
        console.log(error.message);
        
    }
}

let user_out = async(req, res)=>{
    try {

        delete req.session.userisAuth;
        res.redirect("/user-login")
        
    } catch (error) {
        console.log(error.message)
        
    }
}

let low_High = async (req, res)=>{
    try {
        req.session.low_High = true;
        res.redirect("/")
        
    } catch (error) {
        console.log(error.message)
        
    }
}
let High_low = async(req, res)=>{
    try {
        req.session.Highlow = true;
        res.redirect("/")
        
    } catch (error) {
        console.log(error.message)
    }
}






module.exports={user_index,
     userlogin, 
     user_register,
     shop_grid_right, 
     submit_image, 
     user_out,
    low_High,
    High_low}