const product = require("../../models/addproduct/addproduct")
const cart = require("../../models/user/cart")


let shop_cart=async(req,res)=>{
    try {
        res.render("user/user-shop-cart.ejs")
    } catch (error) {
        console.log(error.message)
    }
}

let addtoCart = async(req, res)=>{
    try {

        const userDetails = req.session.userisAuth;
        console.log(userDetails);
        if(!userDetails){
            res.redirect("/user-login")
        }
        const productid = req.query.productDetails;
        console.log(productid);

        const productDetails = await product.find({_id:productid});
        console.log(productDetails)
        const cart = new cart({
            
        })

        
    } catch (error) {
        
    }
}


module.exports={
    shop_cart
}