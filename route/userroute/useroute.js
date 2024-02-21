const express= require('express');
const userrouter = express.Router()
const userController= require("../../controller/usercontroller/usercontroller")
const userpostcontroller= require("../../controller/usercontroller/userpostcontroller")
const productController = require("../../controller/usercontroller/productcontroller")
const auth = require("../../middlewares/multer/userSession")

userrouter.use(express.static("public"));

userrouter.get("/",userController.user_index)
userrouter.get("/user-login",userController.userlogin)
userrouter.get("/user-register",userController.user_register)
userrouter.get("/user-logout",userController.user_out)

userrouter.post("/user-login",userpostcontroller.user_login) 
userrouter.post("/user-register",userpostcontroller.user_register)

userrouter.get("/sendotp",userpostcontroller.sendOtp)
userrouter.get("/verifyotp",userpostcontroller.verifyOtp)
userrouter.get("/shop-grid-right",userController.shop_grid_right)
userrouter.get("/submit-image", userController.submit_image)
userrouter.get("/shop-product-right",productController.shop_product_right)




module.exports=userrouter