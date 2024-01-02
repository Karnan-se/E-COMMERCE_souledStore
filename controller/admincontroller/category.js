const categories=require("../../models/addproduct/addproduct")
const license   =require("../../models/addproduct/licensedchar")
const brands    =require("../../models/addproduct/brand")


let page_categories = async(req, res)=>{
    try {
        const newcategories = await categories.find()
        const newlicense = await license.find()
        const newbrands = await brands.find()

     res.render("admin/page-categories.ejs",{cat:newcategories,brand:newbrands,lic:newlicense})
     
    } catch (error) {
     
    }
 }

 let editcategoroies = async(req, res)=>{
    try {


        
    } catch (error) {
        
    }
 }






 module.exports={page_categories}