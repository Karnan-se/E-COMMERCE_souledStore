const express= require('express');
const userrouter = express.Router()
const userController= require("../../controller/usercontroller/usercontroller")
const userpostcontroller= require("../../controller/usercontroller/userpostcontroller")
userrouter.use(express.static("public"));

userrouter.get("/",userController.user_index)
userrouter.get("/user-login",userController.userlogin)
userrouter.get("/user-register",userController.user_register)

userrouter.post("/user-login",userpostcontroller.user_login)
userrouter.post("/user-register",userpostcontroller.user_register)





module.exports=userrouter