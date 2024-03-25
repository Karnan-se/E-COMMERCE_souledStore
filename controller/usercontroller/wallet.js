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
              instance.orders.create(options, function(err, order) {
                console.log("order:",order);
                return res.status(200).json({order,trueorderId})
              });

            

        const walletSchem = new WalletSchema({
            TotalAmount:walletAmount


        })
        await walletSchem.save()

           
        
    } catch (error) {
        console.log(error.messagge)
        
    }
}


module.exports ={walletPage,
    addToWallet

}