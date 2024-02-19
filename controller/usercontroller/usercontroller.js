const { register } = require("module");
const user = require("../../models/user/userdetails")
const products = require("../../models/addproduct/addproduct")
const asyncLookup = require("../../utils/asynclookup")
const mongoose = require("mongoose")
const categories= require("../../models/addproduct/categories")


let user_index = async(req, res)=>{
    try {
        let message1=null;

        const apparelcategory =[]

        const product= await products.find()
        const ApparelCategory = await categories.find()
        const productDetails = await products.find()



        for(let i= 0; i< product.length; i++){
            console.log(product[i]._id)
            
            const productId = new mongoose.Types.ObjectId(product[i]._id);
            console.log(productId);
             const fcat=await asyncLookup.karnan("categories","category","_id",productId);
            const apparelCategoryId = fcat[0]?.newcat[0]?._id?.toString() ?? null;
            apparelcategory.push(apparelCategoryId)
     

        }
        // console.log (...apparelcategory)
        

        res.render("user/index.ejs",{message1, product, apparelcategory, ApparelCategory, productDetails})
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
        
        const shirt = await asyncLookup.karnan("categories", "category","_id",productId )
        console.log(shirt[0]?.newcat[0].categoryname)
        const apparelcategoryId = req.query.ApparelCategory
        console.log(apparelcategoryId);
        
       
        
        const newproduct = await products.find({category:apparelcategoryId});
       
        console.log(newproduct)
        

        
        

        res.render("user/user-shop-grid-right.ejs",{product:newproduct})
        
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




module.exports={user_index, userlogin, user_register,shop_grid_right, submit_image }