const express= require('express');
const userrouter = express.Router()
const userController= require("../../controller/usercontroller/usercontroller")
const userpostcontroller= require("../../controller/usercontroller/userpostcontroller")
const productController = require("../../controller/usercontroller/productcontroller")
const auth = require("../../middlewares/multer/userSession")
const MyAccount = require("../../controller/usercontroller/user-account")
const wishlist = require("../../controller/usercontroller/shopwishlist")
const shopCart = require("../../controller/usercontroller/shop-cart")
const checkout = require("../../controller/usercontroller/checkout");
const rating= require("../../controller/usercontroller/ratingscontroller")
const walletController = require("../../controller/usercontroller/wallet")
const getInvoice = require("../../controller/usercontroller/invoice")

userrouter.use(express.static("public"));

userrouter.get("/",userController.user_index)
userrouter.get("/user-login",auth.isLogout,userController.userlogin)
userrouter.get("/user-register",auth.isLogout,userController.user_register)
userrouter.get("/user-logout",auth.isLogin,userController.user_out)
userrouter.get("/searchProduct", userController.search)

userrouter.post("/user-login",userpostcontroller.user_login) 
userrouter.post("/user-register",userpostcontroller.user_register)

userrouter.get("/sendotp",userpostcontroller.sendOtp)
userrouter.get("/verifyotp",userpostcontroller.verifyOtp)
userrouter.get("/shop-grid-right",auth.isLogin,userController.shop_grid_right)
userrouter.get("/submit-image",auth.isLogin, userController.submit_image)
userrouter.get("/low-to-high",auth.isLogin,userController.low_High)
userrouter.get("/High-to-low",auth.isLogin,userController.High_low)



userrouter.get("/myAccount",auth.isLogin,MyAccount.user_page_account)
userrouter.post("/currentPassword",auth.isLogin,MyAccount.currentPassword)
userrouter.post("/newpasswordchange",auth.isLogin,MyAccount.newpasswordchange)
userrouter.post("/addAddress",auth.isLogin, MyAccount.addAddress)
userrouter.get("/updateAddressStatus",auth.isLogin,MyAccount.updateAddressStatus)
userrouter.get("/deleteAddress",auth.isLogin,MyAccount.deleteAddress)
userrouter.get("/updateName",auth.isLogin,MyAccount.updateName)
userrouter.get("/editAddressfields",auth.isLogin,MyAccount.editAddressfields)
userrouter.get("/cancelOrder",auth.isLogin,MyAccount.cancelOrder)
userrouter.get("/returnOrder",auth.isLogin,MyAccount.returnOrder)
userrouter.get("/retryTransaction",auth.isLogin,MyAccount.retryTransaction)


userrouter.get("/shop-product-right",auth.isLogin,productController.shop_product_right)
userrouter.get("/shop-cart",auth.isLogin,shopCart.shop_cart )
userrouter.get("/addtoCart",auth.isLogin,shopCart.addtoCart )

userrouter.get("/deleteFromCart",auth.isLogin,shopCart.DeleteItem )
userrouter.get("/quantityUpdate",auth.isLogin,shopCart.quantityUpdate )
userrouter.get("/updatePriceToCart",auth.isLogin,shopCart.updatePriceToCart)

userrouter.get("/checkStock",auth.isLogin,shopCart.checkStock )



userrouter.get("/checkout",auth.isLogin,checkout.checkout)
userrouter.get("/paymentStatus",auth.isLogin,checkout.paymentStatus)
userrouter.post("/welcomePage",auth.isLogin,checkout.welcomePage)
userrouter.get("/applyCoupon",auth.isLogin,checkout.applyCoupon)
userrouter.get("/WalletPaymentCancelled",auth.isLogin,checkout.WalletPaymentCancelled)
userrouter.get("/thankYou",auth.isLogin,checkout.thanYou)



userrouter.get("/shop-wishlist",wishlist.shopWishlist)
userrouter.get("/addtowishList",wishlist.addtowishList)

userrouter.post("/addratings",rating.addratings)
userrouter.get("/ratings",rating.loadratings)
userrouter.get("/wallet",walletController.walletPage)
userrouter.get("/addtoWallet",walletController.addToWallet)
userrouter.get("/addAmounttoWallet",walletController.addAmounttoWallet)
userrouter.get("/collectTransaction",MyAccount.collectTransaction)



userrouter.get("/getInvoice",getInvoice.downloadInvoice)









module.exports=userrouter