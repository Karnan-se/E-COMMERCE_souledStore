const { log } = require("console")
const product = require("../../models/addproduct/addproduct")
const cart = require("../../models/user/cart")
const { default: mongoose } = require("mongoose")



let shop_cart=async(req,res)=>{
    try {
       const userDetails= await req.session.userisAuth._id
       const data= req.session.userisAuth;
       
        if(!userDetails){
            return res.redirect("/user-login")
        }
       var fullTotal = 0
       let arrayProduct=[]
        const productsInCart = await cart.findOne({userId:userDetails}).populate("items.product") 
        for (const item of productsInCart.items) {
            const itemId = item._id;
            const quantity = item.quantity
            const price = item.product.price

           const Localprice = quantity*price;
            console.log(Localprice)
            arrayProduct.push(itemId);
        
            fullTotal += Localprice;

            var updatePrice= await cart.updateOne({_id:productsInCart._id, "items._id" : itemId},{$set:{"items.$.price":Localprice}})
            const totalPrice = await cart.updateOne({userId:userDetails},{$set:{totalprice:fullTotal}} )

            
        }
        // here I have optimise by deleting repeating id in product
    
        
    await res.render("user/user-shop-cart.ejs",{Product:productsInCart, data})

    } catch (error) {
        console.log(error.message)
    }
}



let addtoCart = async(req, res)=>{
    try {

        const userId = req?.session?.userisAuth?._id;
        let productId = req.query.productDetails;   
        let userIncart = await cart.findOne({userId:userId}) 
        
        // || !userIncart it was below
    
        if(!userId ){
            const data = "redirect";
           return await res.status(200).json({data})
        
        }
       
        else if(userIncart){
            const size = req?.query?.selectedSize;
            const exist= userIncart.items.find(items => items.product == productId && items.size == size)

            if(!exist){    
            const size = req?.query?.selectedSize;

            const updateToCart = await cart.updateOne({userId:userId},{$addToSet:{items:{product: productId, size:size}}})
            console.log(updateToCart);
            console.log("userExsited so cart updated");
            const data = await cart.findOne({userId:userId}).populate("items.product");
            let allprice =0;

            for(item of data.items){
                const itemId = item._id;
                const quantity = item.quantity;
                const price = item.product.price;

                const Localprice =quantity*price;
                allprice += Localprice;
                console.log(`${allprice} this is total price`)

           

                

                var updatePrice= await cart.updateOne({_id:data._id, "items._id" : itemId},{$set:{"items.$.price":Localprice}})
               
            
            }
           
            const totalPrice = await cart.updateOne({userId:userId},{$set:{totalprice:allprice}} )
            console.log(allprice);
            return  res.status(200).json({data})


            }else{
                
                console.log("product alreadyexisted")
                const data = "already-Existed"
                return await res.status(200).json({data})
            }
            

        }else{
        


        const size = req?.query?.selectedSize;
        
        if(size){
            console.log(size);
            const userCart = new cart({
                userId: userId,
                items: [
                 {product:productId,size:size}],
             })
             console.log(userCart);
             await userCart.save()
             res.redirect("/");
        }else{
        const userCart = new cart({
           userId: userId,
           items: [
            {product:productId }],
        })
      
        userCart.save()
        res.redirect("/")
    }
}
        
    } catch (error) {
        console.log(error.message)
        
    }
}



let DeleteItem = async(req, res)=>{

    const productId= req.query.itemId;
    const size = req?.query?.size;
    console.log(`size ${size}`)
    console.log(productId);
    const userDetails = req.session.userisAuth._id
    console.log(`userId, ${userDetails}`)

    if(size){
    const DeleteItem = await cart.updateOne(
        { userId: userDetails },
        { $pull: { items:{product:productId, size: size}} }
    );
    }else{
    const DeleteItem = await cart.updateOne(
        { userId: userDetails },
        { $pull: { items:{product:productId, size: null}} }
    )
    }
    


    
    const data = await cart.findOne({userId:userDetails}).populate("items.product")
        let whileprice =0
    for(item of data.items){
        const itemId = item._id;
        const quantity = item.quantity;
        const price = item.product.price;

        const Localprice = quantity*price;
         whileprice += Localprice;
         console.log(whileprice);
    }
    const totalPrice = await cart.updateOne({userId:userDetails},{$set:{totalprice:whileprice}} )



    await res.status(200).json({data:whileprice});

}

let quantityUpdate = async(req, res)=>{
    try {
        const quantity = req.query.number;
        const productId = req.query.productId;
        
        console.log(productId)
        console.log(quantity);
        const userDetails = req.session.userisAuth._id;

        const updateQuantity = await cart.updateOne(
            { userId: userDetails, "items.product": productId }, 
            { $set: { "items.$.quantity": quantity } } 
        );
        
        console.log(updateQuantity);
        var TotalPrice =0;
        

        const AllProductInCart = await cart.findOne({userId:userDetails}).populate("items.product");
        for(item of AllProductInCart.items){           
            const individualPrice =item.product.price*(item.quantity);
            TotalPrice += individualPrice;
            console.log(individualPrice);
            const updatePrice = await cart.updateOne({userId:userDetails, "items._id": item._id},{$set:{"items.$.price":individualPrice}})
            
            console.log(updatePrice);

        }
        const saveTotal = await cart.updateOne({userId:userDetails},{$set:{totalprice : TotalPrice }})
        console.log(saveTotal)

        console.log(TotalPrice)
        const data = TotalPrice
       return await res.status(200).json(data)



        
    } catch (error) {
        console.log(error.message)
        
    }
}
let updatePriceToCart = async(req, res)=>{
    try {
        const totalPrice = req.query.totalPrice;
        console.log(totalPrice)
        const data = "this function is worked";
        await res.status(200).json({data})
        
    } catch (error) {
        
    }
}


module.exports={
    shop_cart,
    addtoCart,
    DeleteItem,
    quantityUpdate,
    updatePriceToCart,

}
