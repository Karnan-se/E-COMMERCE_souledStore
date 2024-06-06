
const Offermodule = require("../../models/admin/offer")
const Product = require("../../models/addproduct/addproduct");
const Category =require("../../models/addproduct/categories");
const { fn } = require("moment");


let offerPage = async(req, res)=>{

   try {
    let offer = await Offermodule.find({})
   offer.reverse()

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

        const {
            productSelect,
            // OfferName,
            productDetails,
            DiscountType,
            max_amount, 
            expiry_date,
            percentage =0,
            fixedRate =0,
          } = req.body;

          console.log(productSelect,  productDetails,  DiscountType, max_amount, expiry_date, percentage, fixedRate);
          

            if(productSelect == "product"){
                const OfferNames = await Product.findById({_id:productDetails})
                let newOffer = new Offermodule({
                    OfferName:OfferNames.productname,
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
                const OfferNames= await Category.findById({_id:productDetails});

                let newOffer = new Offermodule({
                    OfferName:OfferNames.categoryname,
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
        const {offerID} = req.query;
        console.log("worked")
        const islIsted = await Offermodule.findOne({_id:offerID});
        let products = await Product.findOne({_id:islIsted.product});
        if(!products){
           const categoryId= islIsted?.category;
            const categoryMangent = togggleOfferCategory(categoryId,offerID,res);
            return categoryMangent;
        }
       
        islIsted.is_List =! islIsted.is_List;
        await islIsted.save();

        if(islIsted.is_List){
            let cachePrice =products.price
            
 // checking for previous discount'

            let discountAmount;
            if (islIsted.discountPercent > 0) {
                discountAmount = Math.floor(products.price * islIsted.discountPercent / 100);
                console.log(discountAmount, "kitty.........")
           
            } else {
            discountAmount = islIsted.fixedRate;
            }
// only dicount Applied for The  Products which has higher discount
            if(products.orginalPrice>0 && (products.orginalPrice-products.price)<discountAmount){  
                products.price = (products.orginalPrice- discountAmount);
                // products.orginalPrice = cachePrice;
                console.log("Product Saved Here higher discount Than category")
                await products.save();
                return await res.status(200).json({data:"The Discount is already greater"})
            }

            if(islIsted.fixedRate == 0){ 
                console.log("percentage is orking Here")
               products.price -= (discountAmount<islIsted.maxDiscountAmount)? discountAmount : islIsted.maxDiscountAmount;

            }else{
                products.price-=islIsted.fixedRate; 
            }
            products.orginalPrice = cachePrice;

 // another discount checked
        
  // unlisted here

        }else{
            let discountAmount ;
            if(islIsted.discountPercent>0){
                discountAmount=Math.floor((products.orginalPrice*islIsted.discountPercent)/100)
            }else if(islIsted.fixedRate > 0){
                discountAmount= products.orginalPrice-islIsted.fixedRate
            }
            if(products.orginalPrice==0 ){
                // products.price !== products.orginalPrice-discountAmount
                console.log("not unlisted bcz this discount is not belongs to this Product")

            }else{   
            products.price = products.orginalPrice;
            products.orginalPrice = 0;
            }
        }
       
        await products.save()
       await res.status(200).json({data:"reload"})
     
    } catch (error) {
        console.log(error.message)
        
    }

}

async function togggleOfferCategory(categoryId, offerId, res){

    try{

    if(typeof categoryId == "undefined")   return res.status(404).json({ message: 'Category not found' });

    const islIsted = await Offermodule.findOne({_id:offerId});
    let products = await Product.find({category:categoryId})

    islIsted.is_List =! islIsted.is_List;
    
    await islIsted.save();

    if(islIsted.is_List){

    if(islIsted.fixedRate==0){
// percentage

    for(let items of products){
        let cachePrice = items.price

        const discountForEachitem= Math.floor((items.price*islIsted.discountPercent)/100);
       if(items.orginalPrice>0 ){
       
        // items.price -= items.orginalPrice-items.price;
        console.log("replaced previous", items.productname)
       }else{
        console.log("this Product is Discounted Here")
       items.price -= (discountForEachitem<islIsted.maxDiscountAmount)? discountForEachitem :islIsted.maxDiscountAmount;
       items.orginalPrice = cachePrice;
       }

         await items.save()
    }
}else{
 // Listing fixed PRice for category
    for(let items of products){
        if(items.orginalPrice>0 && items.orginalPrice-items.price>islIsted.fixedRate){
            console.log("no changes required for", items.productname)
        }else{
        items.orginalPrice =items.price;
        items.price -= islIsted.fixedRate;
       
    }
    await items.save()

    }

}

// unListing The Category;
    }else{
        
        if(islIsted.discountPercent > 0){
        for(let items of products){
               const discountAmount = Math.floor((items.orginalPrice*islIsted.discountPercent)/100);
               
               console.log("unListing", discountAmount);
                if(items.orginalPrice !== 0 && items.price !== Math.abs(items.orginalPrice-discountAmount)){
                    console.log("not UnListed bcz this Product not belongs to discount Category")
                    console.log(items.productname)

                }else{
                    if(discountAmount == 0){
                        console.log("discountAmoun is zero",items.productname )
                    }else{
                    items.price=items.orginalPrice;
                    items.orginalPrice = 0;
                    await items.save();
                    }

                }
            }
            // unlisting Fixed Price
        }else{
            for(let items of products){
                if(items.orginalPrice == 0 || items.price !== items.orginalPrice-islIsted.fixedRate){
                    console.log("not UnListed bcz this Product not belongs to discount Category")
                }else{
                    items.price = items.orginalPrice;
                    items.orginalPrice =0
                    await items.save()
                }

            }
        }

        
    }

    return res.status(200).json({data:"reload"})

}catch(error){
    console.log(error.message)

}

}




let editOffer = async(req, res)=>{
    try {
        const {offerId} = req.query;
        console.log(offerId)

        const products = await Product.aggregate([{$match:{isActive:true}}])
        const categories = await Category.aggregate([{$match:{isActive:true}}])

        const Offer = await Offermodule.findOne({_id:offerId});
        const formattedExpiryDate = Offer.ExpiryDate ? Offer.ExpiryDate.toISOString().split('T')[0] : '';

        res.render("admin/editoffer.ejs",{Offer, products, categories, formattedExpiryDate})
        
    } catch (error) {
        console.log(error.message)
        
    }
}

let submitEditOffer = async(req, res)=>{
    try{
    
        const {
            productSelect,
            // OfferName,
            productDetails,
            DiscountType,
            max_amount, 
            expiry_date,
            percentage =0,
            fixedRate =0,
          } = req.body;


          console.log(productSelect,  productDetails,  DiscountType, max_amount, expiry_date, percentage, fixedRate);

        //   Category 658dd87f106f82635bad85e1 Percentage 500 2024-06-30 15 0

          const {offerId} = req.query;
          console.log(offerId)



          const offer =await Offermodule.findOne({_id:offerId});


          let Offername;
          if(productSelect == "Category"){
            const CategoryName = await Category.findById({_id:productDetails})
             Offername =  CategoryName.categoryname;
             offer.category =productDetails;
          }else{
            const ProductName = await Product.findOne({_id:productDetails})
             Offername = ProductName.productname
             offer.product =productDetails;
          }

            offer.OfferName=Offername
            offer.maxDiscountAmount=max_amount;
            offer.ExpiryDate = expiry_date;
            offer.discountPercent=percentage;
            offer.fixedRate=fixedRate;
            

          
          const offerData=await offer.save()
          console.log(offerData);


          res.redirect("/offer")
          
               
                   

    } catch (error) {
        console.log(error.message)
        
    }
}








module.exports ={
    offerPage,
    addOffer,
    Submitoffer,
    toggleoffer,
    editOffer,
    submitEditOffer
}