const CartDetails = require("../../models/user/cart")
const UserModel = require("../../models/user/userdetails")
const OrderDetails = require("../../models/user/order");
const cart = require("../../models/user/cart");
const order = require("../../models/user/order");






let checkout = async(req, res)=>{
    try {
        const userDetail = req.session.userisAuth._id;
        console.log(userDetail)
        const CartDetail = await CartDetails.findOne({userId:userDetail}).populate("items.product")
        const userDetails = await UserModel.findOne({_id: userDetail, "Address.status": true })
        console.log(userDetails)
        
       return  res.render("user/user-shop-checkout.ejs",{CartDetail, userDetails})
        
    } catch (error) {
        console.log(error.message)
        
    }
}

let welcomePage =async(req, res)=>{
    try {

        const selectedAddress = req.body.selectedAddress;
        const paymentMethod = req.body.payment_option;
        const userDetail = req.session.userisAuth;
        console.log(userDetail.name)
        const userId = req.session.userisAuth._id;
        console.log(userId);

        const trueAddress =userDetail.Address[selectedAddress];
        console.log(trueAddress)
        
const cartDetail = await cart.findOne({userId:userId})
       const productinCart = cartDetail.items.map((item)=>{
            return item
        })
        const TotalPrice = cartDetail.totalprice;
        console.log(TotalPrice)

       const newOrder = new OrderDetails({

        userId:userId,
        totalAmount:TotalPrice,
        products:productinCart,
        paymentMethod:paymentMethod,
        
        addresstoDeliver:{
            username:userDetail.name,
            phonenumber:userDetail.mobile,
            houseaddress:trueAddress.housename,
            state:trueAddress.State,
            district:trueAddress.Street,
            city:trueAddress.City,
        }
        })

        await newOrder.save()

        // const orderId = await order.findOne({userId:userId});
        // generateuniqueID()
      


        await res.send("welcome ")
        
        

        
    } catch (error) {
        console.log(error.message)
        
    }
}



module.exports ={
    checkout,
    welcomePage

}