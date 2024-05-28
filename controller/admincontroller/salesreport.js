const moment = require("moment");
const Order = require("../../models/user/order")

let SalesReport = async(req, res)=>{
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 

        const orderDetails = await Order.find({ paymentStatus: "PaymentRecieved" })
    .populate("userId")
    .sort({ _id: -1 })  // Sort by _id in descending order
    .skip(skip)
    .limit(limit);

        const OrderCount = orderDetails.length;
        const totalPages = Math.ceil(OrderCount/limit);
        
        if(req.session.day){
            delete req.session.day;
            console.log("here it comes");
            delete req.session.day;
            const today = moment().startOf("day").toDate(); 
            const newOrderDetails = await Order.find({paymentStatus:"PaymentRecieved", date:{$gte: today }}).populate("userId");
          return await res.status(200).json({orderDetails:newOrderDetails,time:"day"})          
        }
        if(req.session.weekly){
            delete req.session.weekly
            const startOfWeek = moment().startOf('isoWeek').toDate(); 
            const endOfWeek = moment().endOf('isoWeek').toDate(); 
            const newOrderDetails = await Order.find({ paymentStatus: "PaymentRecieved", date: { $gte: startOfWeek, $lte: endOfWeek } }).populate("userId"); 
            return res.status(200).json({ orderDetails: newOrderDetails, time: "weekly" }); 
        }
        if(req.session.monthly){
            delete req.session.monthly;
            const startOfMonth = moment().startOf("month").toDate(); 
            const endOfMonth = moment().endOf("month").toDate(); // corrected here
            const newOrderDetails = await Order.find({ paymentStatus: "PaymentRecieved", date: { $gte: startOfMonth, $lte: endOfMonth } }).populate("userId"); 
            return res.status(200).json({ orderDetails: newOrderDetails, time: "monthly" });
        }
        if(req.session.yearly){
            delete req.session.yearly;
            const startOfYear = moment().startOf("year").toDate();
            const endOfYear = moment().endOf("year").toDate();
            const newOrderDetails = await Order.find({ paymentStatus: "PaymentRecieved", date: { $gte: startOfYear, $lte: endOfYear } }).populate("userId");
            return res.status(200).json({ orderDetails: newOrderDetails, time: "yearly" });
        }
            res.render("admin/salesreport.ejs",{orderDetails, totalPages})
        
    } catch (error) {

        console.log(error.message)
        
    }
}

let ledger = async(req, res)=>{
    try {
        console.log("working")
        const selectedDate = req.query.selectedDate;
        console.log(selectedDate);
        if(selectedDate == "day"){
            req.session.day=true
            return res.redirect("/salesreport")
        }else if(selectedDate == "weekly"){
            req.session.weekly=true
            return res.redirect("/salesreport")
        }else if(selectedDate == "monthly"){
            req.session.monthly=true
            return res.redirect("/salesreport")
        }else if(selectedDate == "yearly"){
            req.session.yearly=true
            return res.redirect("/salesreport")
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}
let customDate = async(req, res)=>{
    try{
        const fromDate = new Date (req.query.fromDate);
        const toDate = new Date(req.query.toDate);
        console.log(fromDate, toDate);
        const orderDetails = await Order.find({
            paymentStatus: "PaymentRecieved",
            date: { $gte: fromDate, $lte: toDate }
          }).populate("userId").sort({_id:-1})
          console.log(orderDetails);
          await res.status(200).json({orderDetails})

    }catch(error){
        console.log(error.message)

    }
}
module.exports={
    SalesReport,
    ledger,
    customDate,

}

