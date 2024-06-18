const CartDetails = require("../../models/user/cart")
const UserModel = require("../../models/user/userdetails")
const OrderDetails = require("../../models/user/order");
const cart = require("../../models/user/cart");
const order = require("../../models/user/order");
const addproduct= require("../../models/addproduct/addproduct")
const instance= require("../../utils/razorpay")
const walletSchema = require("../../models/user/wallets")
const Coupons= require("../../models/admin/coupons")









let checkout = async(req, res)=>{
    try {
        const userDetail = req.session.userisAuth._id;
        console.log(userDetail)
        const CartDetail = await CartDetails.findOne({userId:userDetail}).populate("items.product")
        const userDetails = await UserModel.findOne({_id: userDetail, "Address.status": true })
        const data= req.session.userisAuth;
       const coupon =await Coupons.find({expiryDate:{$gte:new Date()}, isListed:true})
        
       return  res.render("user/user-shop-checkout.ejs",{CartDetail, userDetails, data, coupon})
        
    } catch (error) {
        console.log(error.message)
        
    }
}

let welcomePage =async(req, res)=>{
    try {

        const selectedAddress = req.body.selectedAddress;
        const paymentMethod = req.body.paymentMethod;
        let inputCoupons =  req.body.inputCoupons ?? 0;
        console.log(inputCoupons)
        console.log(paymentMethod)

        // const userDetail = req.session.userisAuth;
        // console.log(userDetail.name)
        const userId = req.session.userisAuth._id;
        console.log(userId);
        const userDetail = await UserModel.findOne({_id:userId})
        req.session.userisAuth=userDetail

        const trueAddress =userDetail.Address.status==true;
        console.log(trueAddress)
        


        
const cartDetail = await cart.findOne({userId:userId}).populate("items.product")
       const productinCart = cartDetail.items.map((item)=>{
     
        const discount = item.product.orginalPrice - item.product.price
        console.log(discount, "this is discount")
        if(item.product.orginalPrice == 0){
            return item;
        }
        
        return {
            ...item._doc,  
            discountrecieved: discount 
        }
        })
        cartDetail.markModified('items');
        console.log(productinCart)
        if(cartDetail){
        const TotalPrice = (cartDetail.totalprice)-parseInt(inputCoupons);
        console.log(TotalPrice)

       const newOrder = new OrderDetails({

        userId:userId,
        totalAmount:TotalPrice,
        products:productinCart,
        paymentMethod:paymentMethod,
        
        
        coupon:inputCoupons,
        
        addresstoDeliver:{
            username:userDetail.name,
            phonenumber:userDetail.mobile,
            houseaddress:trueAddress.housename,
            state:trueAddress.State,
            district:trueAddress.Street,
            city:trueAddress.City,
            paymentStatus:"pending"
        }
        })

        const saveOrder = await  newOrder.save()
        var trueorderId = saveOrder._id;
        console.log(trueorderId);
    

        if(paymentMethod == "Cash on delivery"){
            const statusupdatecod = await OrderDetails.findOne({_id:trueorderId})
            statusupdatecod.paymentStatus = "Cash-on-Delivery";
            await statusupdatecod.save();


            // stock updation
            const cartDetail = await cart.findOne({userId:userId})
            const productinCart = cartDetail.items.map(async (item)=>{
                const quantity = item.quantity;
                const size = item.size;
                const product =item.product;
    
                const quantityupdated=await addproduct.updateOne({_id:product, [`sizes.${size}`]:{$exists:true}},{$inc:{[`sizes.${size}.newStock`]:-quantity}})
                console.log(quantityupdated)
            })

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
            const transactioninWallet = await walletSchema.findOne({userId:userId})
            transactioninWallet.history.push({amount:TotalPrice, type:"Debit", description: "Purchase"})
            await transactioninWallet.save()

            console.log("worked upto here")
           
           return await res.status(200).json({data:"success", wallet: checkWalletbalance, walletBalance, TotalPrice,trueorderId})
        }else{
            const deleteOrder = await OrderDetails.deleteOne({_id:trueorderId})
            console.log("orderDeleeted");
            console.log(deleteOrder);
            return await res.status(200).json({data:"failed"})
        }  
       
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
        const findOrder = await OrderDetails.findOne({_id: orderId })

        // stockMangement
        if(updatePaymentStatus && findOrder.paymentStatus=="PaymentRecieved"){

        const cartDetail = await cart.findOne({userId:userId})
        const productinCart = cartDetail.items.map(async (item)=>{
            const quantity = item.quantity;
            const size = item.size;
            const product =item.product;

            const quantityupdated=await addproduct.updateOne({_id:product, [`sizes.${size}`]:{$exists:true}},{$inc:{[`sizes.${size}.newStock`]:-quantity}})
            console.log(quantityupdated)
        
               
            })
             
        
            // for(items of productinCart
            //     const quantity=items.quantity;
            //     const size = items.size;
            //     const product =items.product;
        
            //     const quantityupdated=await addproduct.updateOne({_id:product, [`sizes.${size}`]:{$exists:true}},{$inc:{[`sizes.${size}.newStock`]:-quantity}})
            //     console.log(quantityupdated)
            // }

        }
        console.log("Payement Status updated");
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

        console.log("walllet  Balance reverted")
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

let applyCoupon = async(req, res)=>{
    try {
        const couponCode = req.query.couponCode;
        const totalAmount = req.query.totalAmount;
        const date = Date.now()
       
        console.log(couponCode);
        const userId = req.session.userisAuth._id;
        console.log(userId)
        const findCoupons = await Coupons.findOne({coupon_code:couponCode})

        if(findCoupons){
       
        const isUserIdPresent = findCoupons.userId.includes(userId);
       
        
       if(!isUserIdPresent){

        if(findCoupons.isListed == false){
            return res.status(200).json({data:"unlisted"})
        }

        if(date > findCoupons.expiryDate){
            console.log("Date is Expired")
            return res.status(200).json({data:"expired"})
        }else{
            if(totalAmount<findCoupons.minimumAmount){
                console.log("Less than minimum order Amount")
                return res.status(200).json({data:"lessthanMinimumAmount"})
            }else{
              const discount =  (totalAmount*findCoupons.percentage)/100;
              if(discount>findCoupons.maximumAmount){
                console.log("GreaterThanDiscount");
                const priceAfterDiscount = totalAmount-findCoupons.maximumAmount;
                return res.status(200).json({data:"couponAppiled", discount:findCoupons.maximumAmount, priceAfterDiscount});
                
              }else{
                const priceAfterDiscount = totalAmount-discount;
            
                return res.status(200).json({data:"couponAppiled",discount:discount, priceAfterDiscount})
              }
            }
        }
      
       }else{
        console.log("oldUser")
        return await res.status(200).json({data:"oldUser"})
       }
    }else{
        return await res.status(200).json({data:"invalidCoupon"})
    }


        
    } catch (error) {
        console.log(error.message)
        
    }
}



module.exports ={
    checkout,
    welcomePage,
    paymentStatus,
    WalletPaymentCancelled,
    thanYou,
    applyCoupon

}