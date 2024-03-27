const { json } = require("stream/consumers");
const ratings = require("../../models/user/ratings");
const orderSchema = require("../../models/user/order")


const addratings = async(req,res)=>{
try {
    console.log("route is working")
   
    const {size,value,productId,orderID} = (req.body)
    console.log(size, value, productId);
    const userId = req.session.userisAuth._id;
    console.log(userId)
    const ratingpresent = await ratings.findOne({userId:userId, orderId:orderID, "rating.productId":productId, "rating.size":size})

    if(ratingpresent){
        const updaterating = await ratings.updateOne(
            { userId: userId, "rating.productId": productId }, 
            { $set: { "rating.$.hisRatings": value, "rating.$.size": size } }
        );
        
        console.log(updaterating)
        console.log("ratings updated")
        return await res.status(200).json({data:"ratiings-updated"})
    }else{
    const newRating = new ratings({
        userId: userId,
        orderId:orderID,
        rating:{
            productId:productId,
            hisRatings:value,
            size:size
        }   
    })
    await newRating.save()

    
await res.status(200).json({data:"ratings-Added"})
    }
    
} catch (error) {
    
}

}


let loadratings= async(req, res)=>{
    try {
       
        const{orderid,productId,itemSize}= req.query;

        let  productRatings = null
      
        userId = req.session.userisAuth._id;
        console.log(userId)


        const orderDetails = await orderSchema.findOne({_id:orderid,"products.product" : productId, "products.size":itemSize }).populate("products.product")
        console.log(orderDetails);
        
         productRatings= await ratings.findOne({userId:userId, orderId:orderid, "rating.productId" :productId, "rating.size":itemSize})
            
         
         console.log(productRatings?.rating[0]?.hisRatings)
   
        await res.render("user/ratings.ejs",{productRatings,orderDetails})
        
    } catch (error) {
        console.log(error.message)
    }
}


module.exports={
    addratings,loadratings
}