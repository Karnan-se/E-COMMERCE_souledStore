const express= require("express");
const router= express();
const adminController= require("../../controller/admincontroller/admincontroller");
const adminPostcontroller = require("../../controller/admincontroller/adminpostController")
const adminpatchcontroller= require("../../controller/admincontroller/adminpatchController")
const adminusercontroller = require("../../controller/admincontroller/userdetailcontroller")
const addproductcontroller= require("../../controller/admincontroller/addproductcontrolle")
const productlist = require("../../controller/admincontroller/productlist")
const upload = require("../../middlewares/multer/multer")
const categories = require("../../controller/admincontroller/category")
const admin = require("../../models/admin/admin");

router.get("/admin",adminController.adminLogin);
router.get("/admindashboard",adminController.admindashboard)
router.get("/dashboard",adminController.admindashboard)
router.get("/admin", adminController.adminLogin);


router.get("/page-products-grid", adminController.page_products_grid);
router.get("/page-products-grid-2", adminController.page_products_grid_2);

router.get("/page-orders-1", adminController.page_orders_1);
router.get("/page-orders-2", adminController.page_orders_2);
router.get("/page-orders-detail", adminController.page_orders_detail);

router.get("/page-form-product-1", adminController.page_form_product_1);
router.get("/page-form-product-2", adminController.page_form_product_2);

router.get("/page-form-product-4", adminController.page_form_product_4);
router.get("/page-transaction-1", adminController.page_transaction_1);
router.get("/page-transaction-2", adminController.page_transaction_2);
router.get("/page-account-login", adminController.page_account_login);
router.get("/page-account-register", adminController.page_account_register);
router.get("/page-reviews", adminController.page_reviews);
router.get("/page-brands", adminController.page_brands);
router.get("/page-settings-1", adminController.page_settings_1);
router.get("/page-settings-2", adminController.page_settings_2);
router.get("/page-blank", adminController.page_blank);

router.get("/forgot-password",adminpatchcontroller.forgot_password)

router.post("/page-account-register",adminPostcontroller.page_account_register);
router.post("/index",adminPostcontroller.page_account_login)

router.post("/resetpassword",adminpatchcontroller.resetpassword)
router.get("/resetpassword/:token/:id",adminpatchcontroller.patchpassword)
router.post("/updatepassword",adminpatchcontroller.updatepassword)


router.get("/admin-user-page",adminusercontroller.admin_user_page);
router.get("/toggle",adminusercontroller.toggle)
router.get("/active",adminusercontroller.active)
router.get("/search",adminusercontroller.search)

router.get("/page-form-product-3", addproductcontroller.page_form_product_3);
router.get("/updatecategory",addproductcontroller.addlicense)
router.get("/updatecategory1",addproductcontroller.addcategory)




router.get("/updatebrand",addproductcontroller.addbrands)
router.post("/save", upload.array('images',3),addproductcontroller.addproduct)
router.get("/updatecat",addproductcontroller.updatecategory)


router.get("/page-categories", categories.page_categories);
router.get("/blockproduct",categories.blockproduct);
router.post("/addcategory",categories.createcategory)
router.get("/loadcategory",categories.laodcategory)
router.get("/deleteproduct",categories.deleteproduct)


router.get("/page-products-list", productlist.page_products_list);
router.get("/productblock", productlist.productblock);
router.get("/productedit",productlist.editproduct)




module.exports=router;