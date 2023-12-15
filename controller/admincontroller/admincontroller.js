const { json } = require("stream/consumers");


let adminLogin= async(req, res)=>{
    try {
        let message1=null;
        if(req.session.emailerror){
            delete req.session.emailerror
             message1="username not exist"
        }else if(req.session.passworderror){
             message1="incorrect password"
             delete req.session.passworderror;
        } else{
            message1=null;
        }
        res.render("admin/adminlogin.ejs",{message1})
    } catch (error) {
        console.log(error);
        
    }
}

let admindashboard = async(req, res)=>{
    try {
      
        res.render("admin/dashboard.ejs",)
    } catch (error) {
        console.log(error);
        
    }
}
let page_products_list = async(req, res)=>{
    try {
        res.render("admin/page-products-list.ejs")
        
    } catch (error) {
        console.log(error);
        
    }
}

let page_products_grid = async(req, res)=>{
    try {
        res.render("admin/page-products-grid.ejs")
    } catch (error) {
        console.log(error)
    }
    
}
let page_products_grid_2 = async(req, res)=>{
    try {
        res.render("admin/page-products-grid-2.ejs")
    } catch (error) {
        console.log(error)
    }
}
let page_categories = async(req, res)=>{
   try {
    res.render("admin/page-categories.ejs")
    
   } catch (error) {
    
   }
}
let page_orders_1 = async(req, res)=>{
    try {
        res.render("admin/page-orders-1.ejs")
        
    } catch (error) {
        
    }
    
}

let page_orders_2 = async(req, res)=>{
    try {
        res.render("admin/page-orders-2.ejs")
        
    } catch (error) {
        console.log(error)
        
    }
}
let page_orders_detail = async(req, res)=>{
    try {
        res.render("admin/page-orders-detail.ejs")
    } catch (error) {
        console.log(error);
        
    }
}
let page_sellers_cards = async(req, res)=>{
    try {
        res.render("admin/page-sellers-cards.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_sellers_list = async(req, res)=>{
    try {
        res.render("admin/page-sellers-list.ejs")
    } catch (error) {
        console.log(error);
        
    }
}

let page_seller_detail = async(req, res)=>{
    try {
        res.render("admin/page-seller-detail.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_form_product_1= async(req, res)=>{
    try {
        res.render("admin/page-form-product-1.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_form_product_2= async(req, res)=>{
    try {
        res.render("admin/page-form-product-2.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_form_product_3= async(req, res)=>{
    try {
        res.render("admin/page-form-product-3.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_form_product_4= async(req, res)=>{
    try {
        res.render("admin/page-form-product-3.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_transaction_1= async(req, res)=>{
    try {
        res.render("admin/page-transaction-1.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_transaction_2= async(req, res)=>{
    try {
        res.render("admin/page-transaction-2.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_account_login= async(req, res)=>{
    try {
        res.render("admin/adminlogin.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_account_register= async(req, res)=>{
    try {
     
        // const message1 =req.query.message1
        // stringMessage = JSON.stringify(message1)
       let message1 = ''
req.session.signuperror = false
        if(req.session.signuperror)
        {
            message1= 'Username already exists'
           delete req.session.signuperror
            await res.render("admin/page-account-register.ejs",{message1})

        }
        else if(req.session.emailerror)
            {
                message1 = 'userId already exist please login '
                delete req.session.emailerror
                await res.render("admin/page-account-register.ejs",{message1})

            }
else{
         await res.render("admin/page-account-register.ejs",{message1})
}
    } catch (error) {
        console.log(error)
        
    }
}
let page_reviews= async(req, res)=>{
    try {
        res.render("admin/page-reviews.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_brands= async(req, res)=>{
    try {
        res.render("admin/page-brands.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_settings_1= async(req, res)=>{
    try {
        res.render("admin/page-settings-1.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_settings_2= async(req, res)=>{
    try {
        res.render("admin/page-settings-2.ejs")
    } catch (error) {
        console.log(error)
        
    }
}
let page_blank= async(req, res)=>{
    try {
        res.render("admin/page-blank.ejs")
    } catch (error) {
        console.log(error)
        
    }

}



let resetpassword = async(req, res)=>{
    try {
        res.render()
        
    } catch (error) {
        
    }
}

module.exports={adminLogin, 
    admindashboard, 
    page_products_list,
    page_products_grid,
    page_products_grid_2,
    page_categories,
    page_orders_1,
    page_orders_2,
    page_orders_detail,
    page_sellers_cards,
    page_sellers_list,
    page_seller_detail,
    page_form_product_1,
    page_form_product_2,
    page_form_product_3,
    page_form_product_4,
    page_transaction_1,
    page_transaction_2,
    page_account_login,
    page_account_register,
    page_reviews,
    page_brands,
    page_settings_1,
    page_settings_2,
    page_blank,
    }