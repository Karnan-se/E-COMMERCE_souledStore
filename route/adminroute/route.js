const express= require("express");
const router= express.Router();
const adminController= require("../../controller/admincontroller/admincontroller")

router.get("/admin",adminController.adminLogin)




module.exports=router;