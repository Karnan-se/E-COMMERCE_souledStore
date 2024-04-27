const WishlistSchema = require("../../models/user/wishlist")



let shopWishlist = async(req, res)=>{
    try {
        const wishList = await WishlistSchema.findOne({userId:req.session.userisAuth._id}).populate("product.productId")
       return await res.render("user/user-shop-wishlist.ejs",{wishList})
        
        
    } catch (error) {
        console.log(error.message)
    }
}

let addtowishList = async(req, res)=>{
    try {
        console.log("its is working")
        const productId = req.query.productId;
        console.log(productId);
        const islogged = req?.session?.userisAuth;
        if(!islogged){
            await res.status(200).json({data:"redirect"})
}else{ 

        const WISHLIST = await WishlistSchema.findOne({userId:req.session.userisAuth._id})
        if(WISHLIST){

            // check for the product
            const Productexist = await WishlistSchema.findOne({"product.productId":productId })
            if(Productexist){
                console.log("hey product Already  exist")
                return await res.status(200).json({data:"Product-Already-Exist"});
            }else{
            WISHLIST.product.push({productId: productId})
            await WISHLIST.save();
            console.log("WishList updated",WISHLIST )
            }

        }else{
        const wishList = new WishlistSchema({
            userId: req.session.userisAuth._id,
           product:[{
            productId: productId
           }]
        })
    
        await wishList.save()
        console.log("new Product wishlist Created Here for new USer");

    }
    const findLength = await WishlistSchema.findOne({userId:req.session.userisAuth._id});
    const lengthOfArray = findLength.product.length;
    console.log(lengthOfArray)
    await res.status(200).json({data:"addtowishList", length:lengthOfArray})

        }
        // session else end here
        
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports={shopWishlist, 
addtowishList}