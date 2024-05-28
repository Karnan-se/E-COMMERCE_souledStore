
const Offermodule = require("../../models/admin/offer")
const Product = require("../../models/addproduct/addproduct");
const Category =require("../../models/addproduct/categories");
const { fn } = require("moment");
let offerPage = async(req, res)=>{

   try {
    let offer = await Offermodule.find({})

    res.render("admin/offerPage.ejs",{offer})
    
   } catch (error) {
    console.log(error.message)
    
   }
}

let addOffer = async(req, res)=>{
    try {
        const products = await Product.aggregate([{$match:{isActive:true}}])
        const categories = await Category.aggregate([{$match:{isActive:true}}])

        res.render("admin/addoffer.ejs",{products,categories})
    } catch (error) {
        console.log(error.message)
        
    }
}

let Submitoffer = async(req, res)=>{
    try {
 //    product JHVHGF Percentage 400 2024-05-26 18 undefined 
        const {
            productSelect,
            OfferName,
            productDetails,
            DiscountType,
            max_amount, 
            expiry_date,
            percentage =0,
            fixedRate =0,
          } = req.body;

          console.log(productSelect,  productDetails, OfferName, DiscountType, max_amount, expiry_date, percentage, fixedRate);
            if(productSelect == "product"){
                let newOffer = new Offermodule({
                    OfferName:OfferName,
                    maxDiscountAmount:max_amount,
                    ExpiryDate : expiry_date, 
                    discountPercent:percentage,
                    fixedRate:fixedRate,
                    product :productDetails,
                    is_List:false
                })
                await newOffer.save()
                console.log("Product Saved")
                res.redirect("/offer")
            }else if(productSelect == "Category"){

                let newOffer = new Offermodule({
                    OfferName:OfferName,
                    maxDiscountAmount:max_amount,
                    ExpiryDate : expiry_date, 
                    discountPercent:percentage,
                    fixedRate:fixedRate,
                    category :productDetails,
                    is_List:false,
                })
                await newOffer.save()
                console.log("Product Saved")
                res.redirect("/offer")

            }

   
    } catch (error) {
        console.log(error.message)
        
    }
}

let toggleoffer = async(req, res)=>{
    try {
        const offerID = req.query.offerID;
        console.log(offerID);
        const islIsted = await Offermodule.findOne({_id:offerID});
        
        const ProductId = islIsted.product;
        const categoryId = islIsted.category;
        const fixed = parseInt(islIsted.fixedRate);
        const percentage = parseInt(islIsted.discountPercent);
   
        if(islIsted.is_List == true){
            console.log("going to unlist")
       await Offermodule.updateOne({_id:offerID},{$set:{is_List:false}});
       if(ProductId){
       const product = await Product.findOne({_id:ProductId})
       const resetPrice = parseInt(product.orginalPrice);
       console.log(resetPrice)
       await Product.updateOne({_id:ProductId},{$set:{price:resetPrice}})
       console.log("Product resetted");
       }else if(categoryId ){
        let product = await Product.find({category:categoryId})
       Promise.all(product.map(async(item)=> {
        item.price=item.orginalPrice
        await item.save()
        }))
        console.log("Price is resetted for category");
       }

 //going to List

        }else{
            await Offermodule.updateOne({_id:offerID},{$set:{is_List:true}})
            if(ProductId && fixed){
                console.log("ProductId and Fixed Price")
                const product = await Product.findOne({_id:ProductId})
                if(product.orginalPrice == "undefined" || product.price == product.orginalPrice){

               const orginPriceInserted= await Product.updateOne({_id:ProductId},{$set:{orginalPrice:parseInt(product.price)}},{upsert:true});
                await Product.updateOne({_id:ProductId},{$inc:{price:-fixed}});
                console.log(orginPriceInserted);
                console.log("discount Applied");
                }else{
                    console.log("categoryDiscount is already greater")
                }
            }else if(ProductId && percentage) {
                console.log("Product and percentage")
              const product = await Product.findOne({_id:ProductId})
              const percent =  product.price*percentage/100;
              if(typeof product.orginalPrice == "undefined" || product.price == product.orginalPrice ){
                console.log("overRided The condition")
                const product = await Product.findOne({_id:ProductId})
             const orginPriceInserted=  await Product.updateOne({_id:ProductId},{$set:{orginalPrice:parseInt(product.price)}},{upsert:true})
             console.log(orginPriceInserted);
              await Product.updateOne({_id:ProductId},{$inc:{price:-percent}})
              console.log("discount Applied");
              }else{
                console.log("category discount is already greater")
              }
            }
            if(categoryId && fixed){
                console.log("when it is fixed");
              let product = await Product.find({category:categoryId});
              const updateallcat = Promise.all(product.map(async(item)=>{
                await product.updateOne({category:categoryId},{$set:{orginalPrice:Math.floor(parseInt(item.price))}},{upsert:true})
               const increasedForall= await product.updateMany({category:categoryId},{$inc:{price:-fixed}})
               console.log(increasedForall,"increased for all")
              }))
             console.log("category fixed Listed",updateallcat);
            }else if(categoryId && percentage){
                let product = await Product.find({category:categoryId});
              const updateallcat =await Promise.all(product.map(async(item)=>{
                const inserorginalPrice = await Product.updateMany({category:categoryId},{$set:{orginalPrice:parseInt(item.price)}},{upsert:true})
                    let percent = Math.floor(parseInt(item.price*percentage)/100)
                    const currentPrice = item.price;
                    item.price =currentPrice-percent; 
                    await item.save() 
                }))
                
                console.log("all The product Updated", )
            
            }
           
        }
        console.log("upto here working")
        return await res.status(200).json({data:"reload"})
  

        
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports ={
    offerPage,
    addOffer,
    Submitoffer,
    toggleoffer,
}