const oderDetails = require("../../models/user/cart")
const UserModel = require("../../models/user/userdetails")






let checkout = async(req, res)=>{
    try {
        const userDetail = req.session.userisAuth._id;
        console.log(userDetail)
        const orderDetail = await oderDetails.findOne({userId:userDetail}).populate("items.product")
        const userDetails = await UserModel.findOne({_id: userDetail, "Address.status": true })
        console.log(userDetails)
        res.render("user/user-shop-checkout.ejs",{orderDetail, userDetails})
        
    } catch (error) {
        console.log(error.message)
        
    }
}


module.exports ={
    checkout
}