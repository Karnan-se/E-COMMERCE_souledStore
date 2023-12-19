const express= require('express');
const userrouter = express.Router()
const userController= require("../../controller/usercontroller/usercontroller")


userrouter.get("/",userController.userLogin)




module.exports=userrouter