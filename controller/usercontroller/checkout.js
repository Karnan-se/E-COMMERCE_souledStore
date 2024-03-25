const CartDetails = require("../../models/user/cart")
const UserModel = require("../../models/user/userdetails")
const OrderDetails = require("../../models/user/order");
const cart = require("../../models/user/cart");
const order = require("../../models/user/order");
const addproduct= require("../../models/addproduct/addproduct")
const instance= require("../../utils/razorpay")








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
        const paymentMethod = req.body.paymentMethod;
        console.log(paymentMethod)

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

        const saveOrder = await  newOrder.save()
        const trueorderId = saveOrder._id;
        console.log(trueorderId);

    //   const DeletefromCart = await cart.deleteOne({userId:userId,items:productinCart})
    //   console.log("cart is empty now");
    //   console.log(DeletefromCart);

    for(items of productinCart){
        const quantity=items.quantity;
        const size = items.size;
        const product =items.product;

        const quantityupdated=await addproduct.updateOne({_id:product, [`sizes.${size}`]:{$exists:true}},{$inc:{[`sizes.${size}.newStock`]:-quantity}})
        console.log(quantityupdated)
    }
    if(paymentMethod=="RazorPay"){
        var options = {
            amount: TotalPrice*100,  
            currency: "INR",
            receipt: "order_rcptid_11",

          };
           instance.orders.create(options, function(err, order) {

            console.log("order:",order);
            console.log("err==================:",err);
            return res.status(200).json({order,trueorderId})
          });
    }        
    } catch (error) {
        console.log(error.message)
        
    }
}
const paymentStatus = async(req, res)=>{
    try {
      
        const Status = req.query.status;
        const orderId = req.query.orderId;
        console.log(Status);
        console.log(orderId);
        const userId = req.session.userisAuth._id;
        console.log(userId);

        const updatePaymentStatus = await OrderDetails.updateOne({_id:orderId},{$set:{paymentStatus:Status}})
        console.log(updatePaymentStatus)
        await res.status(200).json({data:"paymentStatus UPDated"})

       
        
        
    } catch (error) {
        console.log(error.message);
        
    }
}



module.exports ={
    checkout,
    welcomePage,
    paymentStatus

}