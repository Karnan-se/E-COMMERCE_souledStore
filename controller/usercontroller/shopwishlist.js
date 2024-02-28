let shopWishlist = async(req, res)=>{
    try {
        res.render("user/user-shop-wishlist.ejs")
        
        
    } catch (error) {
        console.lof(error.message)
    }
}

module.exports={shopWishlist}