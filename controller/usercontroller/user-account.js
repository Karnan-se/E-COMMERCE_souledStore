const { yearsToQuarters } = require("date-fns");
const userdetail = require("../../models/user/userdetails");
const orders = require("../../models/user/order")
const rating = require("../../models/user/ratings")
const bcrypt = require("bcrypt")
const Wallet = require("../../models/user/wallets");
const order = require("../../models/user/order");
const addproduct = require("../../models/addproduct/addproduct")
const transaction = require("../../models/user/transaction")
const instance = require("../../utils/razorpay");

let user_page_account = async(req, res)=>{
    try {
        const userDetails = req.session.userisAuth;

        const page = parseInt(req.query.orderpage) || 1;
        const limit =  2;
        const skip = (page-1) * limit;

       
        const TotalOrder = await orders.find({userId:userDetails})
        const order = (await orders.find({userId:userDetails}).populate("products.product").skip(skip).limit(limit)).reverse()
        const ratings = await rating.find({userId:userDetails._id});
        const WalletDetail = await Wallet.findOne({userId:userDetails._id})

        let ordercount =TotalOrder.length
        console.log(ordercount)



        const totalPages = Math.ceil((ordercount)/limit)
        console.log(totalPages, "totalPage")
        const data= req.session.userisAuth;
        
        if(req.session.passwordUpdated){
            delete req.session.passwordUpdated;
            const message="passwordUpdated";
            
            return res.render("user/user-page-account.ejs",{userDetails,message,order, ratings, WalletDetail, data, totalPages})
        }
       
       return res.render("user/user-page-account.ejs",{userDetails, order, ratings, WalletDetail, data,totalPages })


        
    } catch (error) {
        console.log(error.message)
    }
}

let currentPassword= async(req, res)=>{
    try {
        const currentPassword = req.body.password;
        const userDetails = req.session.userisAuth;
      
        const encrypyedPassword = await bcrypt.compare(currentPassword, userDetails.password)
        console.log(encrypyedPassword);
        if(encrypyedPassword == true){
            const data = encrypyedPassword;
            
            return await res.status(200).json({data})
        }else if(encrypyedPassword == false){
            data= false;
            console.log(data)
            return res.status(200).json({data})
        }
       
    } catch (error) {
        console.log(error.message)
        
    }
}

let newpasswordchange = async(req, res)=>{
    try {
        const newpassword = req.body.npassword;
        console.log("password")
        console.log(newpassword)
        const userDetails = req.session.userisAuth;
        console.log(userDetails)
       const userEmail= userDetails.email;
        console.log(userEmail);
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(newpassword, salt)
        const updatePassword = await userdetail.updateOne({email:userEmail},{$set:{password:HashedPassword}})
        console.log("passwordUpdated");
        if(updatePassword){
        const newUserDetails = await userdetail.findOne({email:userEmail})
        req.session.userisAuth=newUserDetails;
        console.log("session updated")
        req.session.passwordUpdated= true;
        res.redirect("/myAccount")
        }else{
            console.log("password update failed")
        }

        
    } catch (error) {
        console.log(error.message)
    }
}


// here i like to add if there only one element then it should the status should be true
let addAddress = async(req, res)=>{
    try {
        
       
        if(req.session.userisAuth){

            const userEmail=req.session.userisAuth.email;
            console.log(userEmail);
            const address = req.body.address;

            const user = await userdetail.findOne({email:userEmail});
            if( user.Address.length<1){
                const update = await userdetail.updateOne({email:userEmail},
                    {$addToSet:{Address: {housename:address.houseName, Street : address.streetName, City :address.city,State: address.state, status:true}}})

                   return await res.status(200).json({update})

            }
            

            const update = await userdetail.updateOne({email:userEmail},
                {$addToSet:{Address: {housename:address.houseName, Street : address.streetName, City :address.city,State: address.state}}})

            
            console.log(update)
            
            console.log(address)
            console.log(address.houseName)

      const userInfo = await userdetail.findOne({email:userEmail})  
       req.session.userisAuth=userInfo
        const data = "data"

        await res.status(200).json({data})

        }else{
            res.redirect("/user-login")
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}

let updateAddressStatus = async(req, res)=>{
    try {
        console.log("conneted");
        const index = req.query.index;
        console.log(index);

        const userDetails  = req.session.userisAuth;
        console.log(userDetails);
        const userEmail = userDetails.email
        const updateallfalse = await userdetail.updateMany({Address:{$exists: true} },{$set:{"Address.$[].status":false}})
        const updateaoneTOtrue= await userdetail.updateOne({email:userEmail},{$set:{[`Address.${index}.status`]:true}})
        console.log("selected address status become true");
        console.log(updateallfalse);
        console.log(updateaoneTOtrue);
        const newuserisAuth = await userdetail.findOne({email:userDetails.email});
        req.session.userisAuth=newuserisAuth
        console.log(req.session.userisAuth);
       const data="Address Status updated to true";

        res.status(200).json({data})
       

        

    } catch (error) {
         console.log(error.message);
        
    }

}

let deleteAddress = async(req, res)=>{
    try {
        const index= (req.query.index1);
       console.log(index);

        const userEmail = req.session.userisAuth.email;
        const updatedUser = await userdetail.findOneAndUpdate(
            { email: userEmail },
            { $pull: { Address: { _id: { $in: [index] } } } },
            { new: true } 
          );
          
        console.log(updatedUser);
        const userdetails = await userdetail.findOne({email:userEmail});
        req.session.userisAuth=userdetails;
        const data ="hey";
        await res.status(200).json({data});
        
    } catch (error) {
        console.log(error.message)
        
    }
}
let updateName= async(req, res)=>{
    try {

        const name = req.query.name;
        console.log(name);
        const userId = req.session.userisAuth._id;
        console.log(userId);
        const userModel = await userdetail.updateOne({_id:userId},{$set:{name:name}});
        console.log(userModel)
        const dataset = await userdetail.findOne({_id:userId})
        const data= dataset.name;
        console.log(data);
        req.session.userisAuth = dataset
        await res.status(200).json(data)
        

    } catch (error) {
        console.log(error.message);
        
    }

}

let editAddressfields = async(req, res)=>{
    try {
       const AddressData= req.query.AddressData;
       const Address = JSON.parse(AddressData);
       console.log(Address.id);
      
       const userId = req.session.userisAuth._id;
       console.log(userId);
       const updateResult = await userdetail.updateOne(
   
        { _id: userId, "Address._id": Address.id },

        {
            $set: {
                "Address.$.housename": Address.houseName,
                "Address.$.Street": Address.streetName,
                "Address.$.City": Address.cityName,
                "Address.$.State": Address.state,
               
            }
        }
    );
    const user = await userdetail.findOne({_id:userId})
    console.log(updateResult)
    req.session.userisAuth=user;
   await res.status(200).json({data:"hey"})
   

       
        
    } catch (error) {
        console.log(error.message)
        
    }
}
let cancelOrder = async(req, res)=>{
    try {
        const orderId = req.query.orderId;
        const ProductId = req.query.ProductId;
        const price = req.query.price;
        const userId = req.session.userisAuth._id
        
        const orderSchema = await orders.find({_id:orderId})
         
        const cancelProduct = await order.updateOne(
            { _id: orderId, "products._id": ProductId, "products.isOrderCancelled": false },
            { $set: { "products.$.isOrderCancelled": true, "products.$.isOrderReturned": true } }
        );
            const newOrder = await order.find({_id:orderId})
            
            const iteratingmap = newOrder[0].products.map( async (item)=>{
                 const product = item.product;
                 const size = item.size;
                 const quantity = item.quantity;
                 const quantityupdated= await addproduct.updateOne({_id:product, [`sizes.${size}`]:{$exists:true}},{$inc:{[`sizes.${size}.newStock`]:quantity}})
                 console.log("quantity updated")
                 console.log(quantityupdated)
 
 
             })

            const ExtractorderDetails = await Promise.all(newOrder[0].products.map(async(product)=>{
                return product.isOrderCancelled;
            }))
            const allProductsCancelled = ExtractorderDetails.every(value => value === true);

            if(allProductsCancelled){
                const cancelOrder = await orders.updateOne({_id:orderId},{$set:{orderStatus:"Cancelled"}})
                const paymentStatusrefund = await order.updateOne({_id:orderId},{$set:{paymentStatus: "refunded"}})
            }
            if(orderSchema[0].paymentStatus == "PaymentRecieved"){

                const returnMoney = await Wallet.updateOne({userId:userId},{$inc:{TotalAmount: price }})
               
               const updateWallet = await Wallet.findOne({userId:userId})
               updateWallet.history.push({ amount: price, type: "Credit", description: "Refund"});
            
               await updateWallet.save()

                return await res.status(200).json({data:"paymentreturned"})

                }
                await res.status(200).json({data:"OrderCancelled"})
        
    } catch (error) {
        console.log(error.message) 
    }
}


let returnOrder = async(req, res)=>{
    try {
        const orderId = req.query.orderId;
        const ProductId = req.query.ProductId;
        const price = req.query.price;
        const userId = req.session.userisAuth._id;
        const orderSchema = await orders.find({_id:orderId});
        const wallet = await Wallet.findOne({userId:userId})

            const cancelProduct = await order.updateOne(
                { _id: orderId, "products._id": ProductId, "products.isOrderReturned": false },
                { $set: { "products.$.isOrderReturned": true } },
            );

            // stockManagement
            const newOrder = await order.find({_id:orderId})
           const iteratingmap = newOrder[0].products.map( async (item)=>{
                const product = item.product;
                const size = item.size;
                const quantity = item.quantity;
                const quantityupdated= await addproduct.updateOne({_id:product, [`sizes.${size}`]:{$exists:true}},{$inc:{[`sizes.${size}.newStock`]:quantity}})
                console.log("quantity updated")
                console.log(quantityupdated)


            })
            const ExtractorderDetails = await Promise.all(newOrder[0].products.map(async(product)=>{
            return product.isOrderReturned;
            }))
            
            
            
            const allproductsReturned = ExtractorderDetails.every(value=> value === true)
            
            if(allproductsReturned){
                const changeOrderStatus = await orders.updateOne({_id:orderId},{$set:{orderStatus:"Returned"}})
                console.log(changeOrderStatus);
                const paymentStatusrefund = await order.updateOne({_id:orderId},{$set:{paymentStatus: "refunded-Intiated"}})
            } 
            if(orderSchema[0].paymentStatus == "PaymentRecieved"){
                const returnMoney = await Wallet.updateOne({userId:userId},{$inc:{TotalAmount: price }})
               
                const updateWallet = await Wallet.findOne({userId:userId})
                updateWallet.history.push({ amount: price, type: "Credit", description: "Refund"});
             
                await updateWallet.save()
                await res.status(200).json({data:"paymentreturned"})
                }else{
                    await res.status(200).json({data:"ORDER RETURNED"})

                }
               

    } catch (error) {
        console.log(error.message)
    }
}

let retryTransaction = async(req, res)=>{
    try {
        const totalamount = req.query.totalPrice;
        console.log(totalamount);
        var options = {
            amount: totalamount*100,  
            currency: "INR",
            receipt: "order_rcptid_11",   

          };
          instance.orders.create(options, async function(err, order) {
            console.log("order:",order);
            return await res.status(200).json({order})
          });

        
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports={user_page_account, 
    currentPassword,
    newpasswordchange,
    addAddress,
    updateAddressStatus,
    deleteAddress,
    updateName,
    editAddressfields,
    cancelOrder,
    returnOrder,
    retryTransaction
}