const express= require("express");
const router= express();
const adminController= require("../../controller/admincontroller/admincontroller");
const loginController = require("../../controller/admincontroller/adminLogin")
const adminPostcontroller = require("../../controller/admincontroller/adminpostController")
const adminpatchcontroller= require("../../controller/admincontroller/adminpatchController")
const adminusercontroller = require("../../controller/admincontroller/userdetailcontroller")
const addproductcontroller= require("../../controller/admincontroller/addproductcontrolle")
const productlist = require("../../controller/admincontroller/productlist")
const upload = require("../../middlewares/multer/multer")
const categories = require("../../controller/admincontroller/category")
const admin = require("../../models/admin/admin");
const auth = require('../../middlewares/multer/adminSession')
const orderController = require("../../controller/admincontroller/ordercontroller")
const coupons = require("../../controller/admincontroller/coupons")
const salesreport = require("../../controller/admincontroller/salesreport")
const Offer = require("../../controller/admincontroller/offerController")






router.get("/admin-login",auth.isLogout, loginController.adminLogin);
router.get("/admindashboard", auth.isLogin, adminController.admindashboard)
router.post("/index", adminPostcontroller.page_account_login)
router.get("/logout", auth.isLogin, adminController.logout,)

router.get("/page-products-grid",auth.isLogin, adminController.page_products_grid);
router.get("/page-products-grid-2", auth.isLogin, adminController.page_products_grid_2);


router.get("/page-form-product-1",auth.isLogin, adminController.page_form_product_1);
router.get("/page-form-product-2",auth.isLogin, adminController.page_form_product_2);

router.get("/page-form-product-4",auth.isLogin, adminController.page_form_product_4);
router.get("/page-transaction-1",auth.isLogin, adminController.page_transaction_1);
router.get("/page-transaction-2",auth.isLogin, adminController.page_transaction_2);
router.get("/page-account-login",auth.isLogin, adminController.page_account_login);
router.get("/page-account-register",auth.isLogin, adminController.page_account_register);
router.get("/page-reviews",auth.isLogin, adminController.page_reviews);
router.get("/page-brands",auth.isLogin, adminController.page_brands);
router.get("/page-settings-1",auth.isLogin, adminController.page_settings_1);
router.get("/page-settings-2",auth.isLogin, adminController.page_settings_2);
router.get("/page-blank",auth.isLogin, adminController.page_blank);



router.get("/admin-user-page", auth.isLogin,adminusercontroller.admin_user_page);
router.get("/toggle",auth.isLogin,adminusercontroller.toggle)
router.get("/active",auth.isLogin,adminusercontroller.active)
router.get("/search",auth.isLogin,adminusercontroller.search)

router.get("/page-form-product-3",auth.isLogin, addproductcontroller.page_form_product_3);
router.get("/updatecategory",auth.isLogin,addproductcontroller.addlicense)
router.get("/updatecategory1",auth.isLogin,addproductcontroller.addcategory)


router.get("/updatebrand",addproductcontroller.addbrands)
router.post("/save", upload.array('images',3),addproductcontroller.addproduct)
router.get("/updatecat",addproductcontroller.updatecategory)


router.get("/page-categories",auth.isLogin, categories.page_categories);
router.get("/blockproduct", auth.isLogin,categories.blockproduct);
router.post("/addcategory",auth.isLogin,categories.createcategory)
router.get("/loadcategory",auth.isLogin,categories.laodcategory)
router.get("/deleteproduct",auth.isLogin,categories.deleteproduct)


router.get("/page-products-list",auth.isLogin, productlist.page_products_list);
router.get("/productDelete",auth.isLogin,productlist.productdelete)
router.get("/productblock",auth.isLogin, productlist.productblock);
router.get("/productedit",auth.isLogin,productlist.editproduct)
router.get("/deleteimage",productlist.deleteImage)
router.post("/updateproduct",upload.array("images", 3),productlist.updateprouct)
router.post("/edit-info-image",upload.array("image"),categories.edit_info_image)

// router.post("/page-account-register",adminPostcontroller.page_account_register);
router.get("/forgot-password", adminpatchcontroller.forgot_password)
router.get("/resetpassword", adminpatchcontroller.resetpassword)
router.get("/PasswordChange/:token/:id",adminpatchcontroller.newPasswordChange)


// // router.post("/resetpassword",adminpatchcontroller.resetpassword)

// router.post("/updatepassword",adminpatchcontroller.updatepassword)


router.get("/page-orders-1", auth.isLogin, orderController.orderadmin);
router.get("/page-orders-2",auth.isLogin, adminController.page_orders_2);
router.get("/page-orders-detail",auth.isLogin, orderController.orders_detail);
router.get("/orderStaus",auth.isLogin, orderController.orderStaus)
router.get("/coupons",auth.isLogin,coupons.coupons)
router.get("/addCoupon",auth.isLogin,coupons.addcouponspage)
router.post("/addCoupon",auth.isLogin,coupons.addcoupons)
router.get("/toggleList",auth.isLogin,coupons.toggleCoupon)
router.get("/editCoupon",auth.isLogin,coupons.editCoupon)
router.post("/editCoupon",auth.isLogin,coupons.editCouponPost)
router.get("/activeCoupons",coupons.activeCoupons)


router.get("/salesreport",auth.isLogin,salesreport.SalesReport)
router.get("/ledger",auth.isLogin,salesreport.ledger)

router.get("/offer",auth.isLogin,Offer.offerPage);
router.get("/addoffer",auth.isLogin,Offer.addOffer);
router.get("/toggleoffer", auth.isLogin,Offer.toggleoffer)
router.post("/addoffer",auth.isLogin,Offer.Submitoffer);


module.exports=router;