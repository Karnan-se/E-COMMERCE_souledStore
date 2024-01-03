const categories=require("../../models/addproduct/categories")
const license   =require("../../models/addproduct/licensedchar")
const brands    =require("../../models/addproduct/brand")


let page_categories = async(req, res)=>{
    try {
        const newcategories = await categories.find()
        const newlicense = await license.find()
        const newbrands = await brands.find()

     res.render("admin/page-categories.ejs",{newcategories,brand:newbrands,lic:newlicense})
     
    } catch (error) {
     
    }
 }

 let editcategoroies = async(req, res)=>{
    try {


        
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






 module.exports={page_categories, blockproduct}