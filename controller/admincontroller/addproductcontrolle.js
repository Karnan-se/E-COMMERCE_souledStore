const licensedcategories= require("../../models/addproduct/licensedchar")
const categories= require("../../models/addproduct/categories")
const brands = require("../../models/addproduct/brand")
const product = require("../../models/addproduct/addproduct")
const path = require("path")
const { fileURLToPath } = require("url")



let page_form_product_3= async(req, res)=>{
    try {
        
        const license= await licensedcategories.find()
        const newcategories = await categories.find()
        const branddetails = await brands.find() 
        console.log(license)
        console.log(`${newcategories} here is the value`)
        res.render("admin/page-form-product-3.ejs",{license:license,newcategories:newcategories, brand:branddetails})

        
    } catch (error) {
        console.log(error)
        
    }
}



let addlicense= async(req, res)=>{
    try {
        const categoryname= req.query.category
    console.log(categoryname);
    const newCategory = new licensedcategories({ categoryname: categoryname });

        
        await newCategory.save();
        console.log(newCategory);
    
   
    res.redirect("/page-form-product-3")
    
        
    } catch (error) {
        console.log(error)
        
    }

}
let addcategory = async(req, res)=>{
    try {
        const categoryname= req.query.generalcategory
        console.log(categoryname);
        const newCat = new categories({ categoryname: categoryname });
    
            
            await newCat.save();
            console.log(newCat);
            console.log("username saved")
        
       
        res.redirect("/page-form-product-3")
        
        
        
    } catch (error) {
        
    }
}
let addbrands = async(req, res)=>{
try {
    const brandname = req.query.brandname;
    console.log(req.query);
    console.log(brandname);

    console.log("brandname is recieved")
    const brand = new brands ({
        name: brandname
    })
    await brand.save();
    console.log(brand)
    res.redirect("/page-form-product-3")


    
} catch (error) {
    console.log(error.message)
    
}

}
let addproduct = async(req, res)=>{
    try {
    //   console.log('body',req.body)
    //   console.log('fies',req.files);
    const images = req.files.map(file => file.filename);
    console.log(images);
    
    
        

    res.status(200).json({message:`product added successfully`});
    } catch (error) {
        res.status(500).json({error: `internal server Error`})

        
    }
}


module.exports={page_form_product_3,addcategory,addlicense,addbrands,addproduct}
