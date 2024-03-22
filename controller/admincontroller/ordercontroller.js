const order = require("../../models/user/order");
const orderSchema = require("../../models/user/order")
const userSchema = require("../../models/user/userdetails")


let orderadmin = async(req, res)=>{
    try {
        const orderDetails = await orderSchema.find({}).populate("userId");
        
       
        res.render("admin/page-orders-1.ejs",{orderDetails})

    } catch (error) {
        console.log(error.message)
        
    }
    
}

let orders_detail = async(req, res)=>{
    try {
        const orderId = req.query.orderDetails;
        console.log(orderId);
        const orderDetails = await orderSchema.find({_id:orderId}).populate("userId").populate("products.product")
        res.render("admin/page-orders-detail.ejs",{orderDetails})
    } catch (error) {
        console.log(error);
        
    }
}
let orderStaus =async(req, res)=>{
    try {
        const orderStatus = req.query.selectedvalue;
        const orderId = req.query.orderId;
        console.log(orderStatus)
        console.log(orderId);
        const orderDetail = await order.updateOne({_id:orderId},{$set:{orderStatus:orderStatus}})
        console.log(orderDetail);
        await res.status(200).json({data:"data"})

          
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports={
    orderadmin,
    orders_detail,
    orderStaus
}