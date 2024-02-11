const licensedcategories= require("../../models/addproduct/licensedchar")
const categories= require("../../models/addproduct/categories")
const brands = require("../../models/addproduct/brand")
const product = require("../../models/addproduct/addproduct")
const path = require("path")
const { fileURLToPath } = require("url")
const { updateOne } = require("../../models/admin/admin")
const session = require("express-session")



let page_form_product_3= async(req, res)=>{
    try {
        
        const license= await licensedcategories.find()
        const newcategories = await categories.find()
        const branddetails = await brands.find() 
        console.log(license)
        console.log(`${newcategories} here is the value`)
        let categorysession = await req.session.category
        console.log(categorysession)
        var newmessage = null;
       
        if(categorysession ==true){
            delete req.session.category     
             newmessage = "session passed"          
             res.render("admin/page-form-product-3.ejs",{license:license,newcategories:newcategories, brand:branddetails,newmessage})
      

        }else{
            delete req.session.category;
            console.log("no session created")   
       return res.render("admin/page-form-product-3.ejs",{license:license,newcategories:newcategories, brand:branddetails})

        }
       
        
    } catch (error) {
        console.log(error)
        
    }
}

let addlicense= async(req, res)=>{
    try {
        const categoryname= req.query.category
    console.log(categoryname);
    const licenseName = await licensedcategories.findOne({categoryname:categoryname})
    if(!licenseName){
        const newCategory = new licensedcategories({ categoryname: categoryname });
        await newCategory.save();
        console.log(newCategory);
        res.redirect("/page-form-product-3")


    }else{
        req.session.category=true
        res.redirect("/page-form-product-3")
    }
     
    } catch (error) {
        console.log(error)
        
    }

}
let addcategory = async(req, res)=>{
    try {
        const categoryname= req.query.generalcategory
        console.log(categoryname);
        const categoryName= await categories.findOne({categoryname:categoryname})

        if(!categoryName){
            const newCat = new categories({ categoryname: categoryname });

            await newCat.save();
            console.log(newCat);
            console.log("username saved")
            return res.redirect("/page-form-product-3")

        }else{

            req.session.category =true
           return res.redirect("/page-form-product-3")
        }

        
    } catch (error) {
        console.log(error.message);
        
    }
}

let addbrands = async(req, res)=>{
try {
    const brandname = req.query.brandname;
    console.log(req.query);
    console.log(brandname);

    console.log("brandname is recieved")

    const brandName = await brands.findOne({name:brandname});

    if(!brandName){
        const brand = new brands ({
            name: brandname
        })
        await brand.save();
        console.log(brand)
       return res.redirect("/page-form-product-3")

    }else{

        req.session.category=true
       return res.redirect("/page-form-product-3")
    }


} catch (error) {
    console.log(error.message)
    
}

}
let addproduct = async(req, res)=>{
    try {
  
    const images = req.files.map(file => file.filename);
    console.log(images);
    const formdata=req.body;
    const  {productTitle,
        productSKU,
        productColor,
        productSize,
        description,
        price,
        gender,
        tags,
        category,
        subcategory,
        brand}= req.body

        console.log(formdata);


    const newproducts =  new product({

        productname:productTitle,
        stock:productSKU,
        color:productColor,
        size:productSize,
        category:category,
        license:subcategory,
        brand:brand,
        description:description,
        images:images,
        price:price,
        tags:tags,
        gender:gender

    })
    console.log(newproducts)

    newproducts.save()
    console.log("new product saved")
    
    
        

    res.status(200).json({message:`product added successfully`});
    } catch (error) {
        res.status(500).json({error: `internal server Error`})

        
    }
}

let updatecategory = async (req, res)=>{

try {
    const {categoryId,categoryName }= req.query;
    console.log(categoryId,categoryName)

    const newcatergories = await categories.find({_id:categoryId})
    const newlicense = await licensedcategories.find({_id:categoryId})
    const newbrands =await brands.find({_id:categoryId})

    if(newcatergories.length > 0){

        const update= await categories.updateOne({_id:categoryId},{$set:{categoryname:categoryName}})
        console.log("newcategories");
    }else if(newlicense.length > 0){
        const update= await licensedcategories.updateOne({_id:categoryId},{$set:{categoryname:categoryName}})

        console.log("new license");
        
    }else if(newbrands.length > 0){
        const update= await brands.updateOne({_id:categoryId},{$set:{name:categoryName}})

        console.log("newbrands");
        
    }
    // res.json({update})
    res.status(200).json({message:`updated successfully`})

    
} catch (error) {
    console.log(error.message)
    res.status(500).json({message:`internal error error`})
    
}
}


module.exports={page_form_product_3,addcategory,addlicense,addbrands,addproduct, updatecategory}
