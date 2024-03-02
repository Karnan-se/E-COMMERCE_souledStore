const { log } = require("console")
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
        const userId = userDetails?._id;
        console.log(userId);
        let productid = req.query.productDetails;
        
      const userIncart = await cart.findOne({userId:userId})
      console.log(userIncart);

        if(!userDetails){
            res.redirect("/user-login")
        }else if(userIncart){
            if(userIncart.items.includes(productid)){
            const updateToCart = await cart.updateOne({userId:userId},{$addToSet:{items:[productid]}})
            console.log(updateToCart);
            console.log("userExsited so cart updated");
            res.redirect("/");
            }else{
                console.log("product alreadyexisted")
            }
            

        }else{
        
        console.log(productid);  
        const userCart = new cart({
           userId: userId,
           items: [productid],
           

        })
        console.log(userCart);
        console.log("cart Added");

        userCart.save()
        res.redirect("/");
    
    }
        
    } catch (error) {
        console.log(error.message)
        
    }
}



module.exports={
    shop_cart,
    addtoCart

}