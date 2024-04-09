const CartDetails = require("../../models/user/cart")
const UserModel = require("../../models/user/userdetails")
const OrderDetails = require("../../models/user/order");
const cart = require("../../models/user/cart");
const order = require("../../models/user/order");
const addproduct= require("../../models/addproduct/addproduct")
const instance= require("../../utils/razorpay")
const walletSchema = require("../../models/user/wallets")








let checkout = async(req, res)=>{
    try {
        const userDetail = req.session.userisAuth._id;
        console.log(userDetail)
        const CartDetail = await CartDetails.findOne({userId:userDetail}).populate("items.product")
        const userDetails = await UserModel.findOne({_id: userDetail, "Address.status": true })
        const data= req.session.userisAuth;
        console.log(userDetails)
        
       return  res.render("user/user-shop-checkout.ejs",{CartDetail, userDetails, data})
        
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
        var trueorderId = saveOrder._id;
        console.log(trueorderId);

        if(paymentMethod == "Cash on delivery"){
            
               return await res.status(200).json({data:"welcome Page"})
        }




    //   const DeletefromCart = await cart.deleteOne({userId:userId,items:productinCart})
    //   console.log("cart is empty now");
    //   console.log(DeletefromCart);

    
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




    if(paymentMethod == "Wallet"){
        const checkWalletbalance =await walletSchema.findOne({userId:userId})
        const walletBalance=checkWalletbalance.TotalAmount - TotalPrice;
        if(walletBalance>0){
            const walletUpdate= await walletSchema.updateOne({userId:userId},{$inc:{TotalAmount:-TotalPrice}})
            console.log("worked upto here")
           
           return await res.status(200).json({data:"success", wallet: checkWalletbalance, walletBalance, TotalPrice,trueorderId})
        }else{
            const deleteOrder = await OrderDetails.deleteOne({_id:trueorderId})
            console.log("orderDeleeted");
            console.log(deleteOrder);
            return await res.status(200).json({data:"failed"})
        }  
       
    }      
    } catch (error) {
        console.log(error.message)
        
    }
}

const paymentStatus = async(req, res)=>{
    try {
      
        const Status = req.query.status;
        const orderId = req.query.orderId;
        const userId = req.session.userisAuth._id;
        const updatePaymentStatus = await OrderDetails.updateOne({_id:orderId},{$set:{paymentStatus:Status}})

        // stockMangement
        if(updatePaymentStatus && updatePaymentStatus=="PaymentRecieved"){

        const cartDetail = await cart.findOne({userId:userId})
        const productinCart = cartDetail.items.map((item)=>{
            return item
        })
            for(items of productinCart){
                const quantity=items.quantity;
                const size = items.size;
                const product =items.product;
        
                const quantityupdated=await addproduct.updateOne({_id:product, [`sizes.${size}`]:{$exists:true}},{$inc:{[`sizes.${size}.newStock`]:-quantity}})
                console.log(quantityupdated)
            }

        }
        await res.status(200).json({data:"paymentStatus UPDated"})
   
    } catch (error) {
        console.log(error.message);
        
    }
}
let WalletPaymentCancelled= async(req, res)=>{
    try {

        const orderId = req.query.orderId;
        const TotalPrice= req.query.price;
        const userId = req.session.userisAuth._id;
        console.log(`orderId ${orderId}`);
        // console.log(price);

        const revertWallet = await walletSchema.updateOne({userId:userId},{$inc:{TotalAmount:TotalPrice}})
        const deleteOrder = await OrderDetails.deleteOne({_id:orderId})

        console.log(revertWallet)

        console.log("walllet  Balane reverted")
        await res.status(200).json({status:"walletCancelled"});
        
    } catch (error) {
        console.log(error.message)
        
    }
}
let thanYou = async(req, res)=>{
    try {
        const userId= req.session.userisAuth._id;
        if(userId){
        const cartdelete = await cart.deleteOne({userId:userId})
        }
        res.render("user/thankYou.ejs")
        
    } catch (error) {
        console.log(error.message)
        
    }
}



module.exports ={
    checkout,
    welcomePage,
    paymentStatus,
    WalletPaymentCancelled,
    thanYou

}