const Coupon = require("../../models/admin/coupons") 
const mongoose= require("mongoose")


let coupons = async(req, res)=>{
    try {

        
        const coupon = await Coupon.find({})


        res.render("admin/coupons.ejs",{coupon})
        
    } catch (error) {
        
    }
}


let addcouponspage = async(req, res)=>{
    try {


        res.render("admin/addcoupons.ejs")
        
    } catch (error) {
        
    }
}

let addcoupons = async (req, res)=>{
    try {
        const {coupon_code,description, percentage, min_amount, max_amount, expiry_date} = req.body;

        const Coupons = new Coupon({
            coupon_code,
            description,
            percentage,
            minimumAmount:min_amount,
            maximumAmount:max_amount,
            expiryDate:expiry_date
        })

        await Coupons.save()
        res.redirect("/coupons")
    } catch (error) {
        console.log(error.message)
    }
}

let toggleCoupon = async(req, res)=>{
    try {
        const couponId = req.query.couponId;
        
        const findCouponStatus = await Coupon.findOne({_id:couponId})
       if(findCouponStatus.isListed === true){
        const unlistCoupon = await Coupon.updateOne({_id:couponId}, {$set:{isListed:false}})
       }else if(findCouponStatus.isListed === false){
        const listCoupon = await Coupon.updateOne({_id:couponId}, {$set:{isListed:true}})
       }
       await res.status(200).json({data:"data"})

        
    } catch (error) {
        console.log(error.message)
        
    }
}
let editCoupon = async(req, res)=>{
    try {
        const couponId = req.query.couponId;
        console.log(couponId);
        const couponDetail = await Coupon.find({_id:couponId})

        res.render("admin/editcoupons.ejs",{couponDetail})
        
    } catch (error) {
        console.log(error.message)
    }
}

let editCouponPost = async(req, res)=>{
    try {
        console.log("coupon edit");
      
       
      
        const {coupon_code,description, percentage, min_amount, max_amount, expiry_date, couponId} = req.body;
        console.log(couponId);
        const EditCoupons = await Coupon.updateOne({_id:couponId},{$set:{
            coupon_code: coupon_code,
            description:description,
            percentage:percentage,
            minimumAmount:min_amount,
            maximumAmount:max_amount,
            expiryDate:expiry_date }})


            console.log(EditCoupons);

            res.redirect("/coupons")
        
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports={
    coupons,
    addcouponspage,
    addcoupons,
    toggleCoupon,
    editCoupon,
    editCouponPost
}