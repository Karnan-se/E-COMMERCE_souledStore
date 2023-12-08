const express= require("express");
const router= express.Router();
const adminController= require("../../controller/admincontroller/admincontroller");
const admin = require("../../models/admin/admin");

router.get("/admin",adminController.adminLogin);
router.get("/register",adminController.admindashboard)




module.exports=router;