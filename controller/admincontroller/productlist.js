const { log } = require("console");
const products = require("../../models/addproduct/addproduct")


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
            
            const result = await swal.fire({
                title: "Are you sure ?",
                text: "you won't be able to revert this",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'

            })
        await products.deleteOne({_id:userId})
        console.log("product deleted")
        res.redirect("/page-products-list")
        
        }else{
        console.log("no match is found");
    }

        
    } catch (error) {
        console.log(error.message)
        
    }

}


module.exports = {page_products_list,productblock}