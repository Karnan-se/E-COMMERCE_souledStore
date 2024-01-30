const categories=require("../../models/addproduct/categories")
const license   =require("../../models/addproduct/licensedchar")
const brands    =require("../../models/addproduct/brand")
const e = require("express")


let page_categories = async(req, res)=>{
    try {
        const newcategories = await categories.find()
        const newlicense = await license.find()
        const newbrands = await brands.find()
        let message = req.session.error;
        let warning = req.session.warning;
        console.log(warning)

        if(message){
            
            res.render("admin/page-categories.ejs",{newcategories,brand:newbrands,lic:newlicense,message})
            delete req.session.error;

         } else if(warning){
                res.render("admin/page-categories.ejs",{newcategories,brand:newbrands,lic:newlicense,warning})
                delete req.session.warning;
            
            

        }else{
            
            res.render("admin/page-categories.ejs",{newcategories,brand:newbrands,lic:newlicense})


        }


     
     
    } catch (error) {
     
    }
 }

 let blockproduct =async(req, res)=>{
    try {

        const userId= req.query.userId
        console.log(userId)

        const newcategories= await categories.findOne({_id:userId})
        const newlicense= await license.findOne({_id:userId})
        const newbrands = await brands.findOne({_id:userId})

        if(newcategories){

            if(newcategories.isActive === true){
                 await categories.updateOne({_id:userId},{$set:{isActive:false}})
                console.log("new categories updated to false");

            }else{
                 await categories.updateOne({_id:userId},{$set:{isActive:true}})
                console.log("new categories updated to true");
            }   
        }else if(newlicense){
            if(newlicense.isActive == true){
                 await license.updateOne({_id:userId},{$set:{isActive:false}})
                console.log("new categories updated to false");
                

            }else{
                await license.updateOne({_id:userId},{$set:{isActive:true}})
                 console.log("new categories updated to true");
                 

            }


        }else if(newbrands){
            if(newbrands.isActive==true){
                await brands.updateOne({_id:userId},{$set:{isActive:false}})
                console.log("new categories updated to false");
            }else{
                await brands.updateOne({_id:userId},{$set:{isActive:true}})
                 console.log("new categories updated to true");
                
            }
        }
        res.redirect("/page-categories")


       
        
    } catch (error) {
        console.log(error.message)
        
    }
 }

 let createcategory = async(req, res)=>{
    
try {

    const{input,category,textarea} = req.body;
    console.log(`${input}`)
    if (category =="apparel"){
       const newproduct= await categories.findOne({categoryname:input})


       if(newproduct){
        req.session.error =true;
        res.redirect("/page-categories")
       }else{

        delete req.session.error;
        await categories.create({categoryname:input})
       console.log("category created for apparel")
       res.redirect("/page-categories")
       }
        
       
 
    } else if(category == "hero") {
        const newproduct = await categories.findOne({categoryname:input})
        if(newproduct){
           req.session.error=true;
           res.redirect("/page-categories")

        }else{
            delete req.session.error;
                await license.create({categoryname:input})
                console.log("category created")
                res.redirect("/page-categories")

            }   
      
    }else if(category == "Brands") {
        const newproduct = await categories.findOne({name:input})

        if(newproduct){
           req.session.error=true;
           res.redirect("/page-categories")

        }else{
            delete req.session.error
                await license.create({name:input})
                console.log("category created")
                res.redirect("/page-categories")

            }   
   
    }
    
} catch (error) {
    console.log(error.message)
    
}
 }



 let laodcategory = async(req, res)=>{

    const selectedcategory = req.query;

    console.log(selectedcategory);
    if(selectedcategory.changeCategory == "hero"){

        const data = await license.find({})
        console.log(data)
        const description = "Hero category"
        res.status(200).json({data, description})
    }else if (selectedcategory.changeCategory =="category"){
        console.log("category");
        const data = await categories.find({})
        console.log(data)
        const description = "Apparel category"
        res.status(200).json({data, description})
    } else if(selectedcategory.changeCategory =="brand"){
        console.log("brand");
        const data = await brands.find({})
        console.log(data)
        const description = "Brands"
        res.status(200).json({data, description})
    }else if(selectedcategory.changeCategory == "all"){
        const data = "reload"
        console.log(data)
        res.status(200).json(data)
       
    }
 }

 let deleteproduct = async(req, res)=>{
    const {userId}= req.query
    console.log(userId);

    const newcategories= await categories.findOne({_id:userId})
    const newlicense= await license.findOne({_id:userId})
    const newbrands = await brands.findOne({_id:userId})
if(newcategories){
    await categories.deleteOne({_id:userId})
    console.log("product deleted from categories")
    
}else if(newlicense){
    await license.deleteOne({_id:userId})
    console.log("product deleted from licese")
    

}else if(newbrands){
    await brands.deleteOne({_id:userId})
    console.log("product deleted from brand")
  
}
req.session.warning=true;
res.redirect("/page-categories")

    
 }






 module.exports={page_categories, blockproduct,createcategory, deleteproduct,laodcategory}