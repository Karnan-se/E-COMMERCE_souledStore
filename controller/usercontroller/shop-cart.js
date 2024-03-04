const { log } = require("console")
const product = require("../../models/addproduct/addproduct")
const cart = require("../../models/user/cart")
const { default: mongoose } = require("mongoose")



let shop_cart=async(req,res)=>{
    try {
       const userDetails= await req.session.userisAuth._id
        console.log(userDetails)
       
        const productsInCart = await cart.findOne({userId:userDetails}).populate("items.product")
        console.log("prodi")
        console.log(productsInCart);
        const newProducts = productsInCart.items;
        console.log(newProducts)
       await res.render("user/user-shop-cart.ejs",{Product:productsInCart})

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
        let productId = req.query.productDetails;
        let productid = new mongoose.Types.ObjectId(productId)
        console.log(productid);

        if(userId){
            var userID= new mongoose.Types.ObjectId(userId)
        }
        
      let userIncart = await cart.findOne({userId:userID})
      

        if(!userDetails){
            res.redirect("/user-login")
        }else if(userIncart){
            const exist= userIncart.items.find(items => items.product == productId)
            
            if(!exist){
            const updateToCart = await cart.updateOne({userId:userId},{$addToSet:{items:{product: productId}}})
            console.log(updateToCart);
            console.log("userExsited so cart updated");
            res.redirect("/");
            }else{
                
                console.log("product alreadyexisted")
                res.redirect("/")
            }
            

        }else{
        
        console.log(productid);  
        const userCart = new cart({
           userId: userId,
           items: [
            {product:productid }],
           

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