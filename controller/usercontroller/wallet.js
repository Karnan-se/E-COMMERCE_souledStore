const WalletSchema = require("../../models/user/wallets")
const instance = require("../../utils/razorpay");




let walletPage = async(req, res)=>{
    try {

        res.render("user/wallet.ejs")
        
    } catch (error) {

        console.log(error.messagge);
        
    }
}
let addToWallet = async(req, res)=>{
    try {
        const walletAmount = req.query.walletAmount;
        console.log(walletAmount);

            var options = {
                amount: walletAmount*100,  
                currency: "INR",
                receipt: "order_rcptid_11",   
    
              };
              instance.orders.create(options, async function(err, order) {
                console.log("order:",order);
                return await res.status(200).json({order})
              });

            
    } catch (error) {
        console.log(error.messagge)
        
    }
}



let addAmounttoWallet = async(req, res)=>{
    try {

        const walletAmount = req.query.amount;
        console.log(walletAmount);
        const userId = req.session.userisAuth._id;
        console.log(userId)


        const userwallet = await WalletSchema.findOne({userId:userId})

        if(!userwallet){
            const walletSchem = new WalletSchema({
                userId:userId,
                TotalAmount:walletAmount/100
            })
            
           
           await walletSchem.save()
           const newwallet = await WalletSchema.findOne({userId:userId})
           newwallet.history.push({amount:walletAmount/100, type: "Credit",description:"Deposit" })
           
           
           await newwallet.save()

        }else{

            const updateWalllet = await WalletSchema.updateOne(
                { userId: userId },
                { $inc: { TotalAmount: walletAmount/100 } }
            );
            userwallet.history.push({amount:parseInt(walletAmount)/100, type: "Credit",description:"Deposit" })
            console.log(userwallet)

            await userwallet.save();
            console.log("cash updated")
                return await res.status(200).json({datas:"hey"})
        }
                
        

    } catch (error) {
        console.log(error.messagge)
        
    }
    
}

module.exports ={walletPage,
    addToWallet,
    addAmounttoWallet

}