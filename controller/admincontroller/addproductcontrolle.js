const categories= require("../../models/addproduct/licensedchar")


let page_form_product_3= async(req, res)=>{
    try {
        
        const license= await categories.find()
        console.log(license)
        res.render("admin/page-form-product-3.ejs",{license:license})

        
    } catch (error) {
        console.log(error)
        
    }
}



let addcategory= async(req, res)=>{
    try {
        const categoryname= req.query.category
    console.log(categoryname);
    const newCategory = new categories({ categoryname: categoryname });

        
        await newCategory.save();
        console.log(newCategory);
    
    req.session.categoryname=categoryname,
    res.redirect("/page-form-product-3")
    
        
    } catch (error) {
        console.log(error)
        
    }

}
module.exports={page_form_product_3,addcategory}
