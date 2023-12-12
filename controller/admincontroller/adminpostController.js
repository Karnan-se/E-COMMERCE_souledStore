const bcrypt = require("bcrypt")
const { encode } = require("punycode");
const admin = require("../../models/admin/admin")
let page_account_register = async(req, res)=>{
    try {
        
            const {name, password, email, mobileNumber} = req.body;
            const salt = await bcrypt.genSalt(10)
            const hash =  await bcrypt.hash(password, salt)
            let newAdmin = new admin({
                name,
                password:hash,
                email,
                mobileNumber,
            })
            const admins = await admin.find({})
            const matchingAdmin = admins.find((admin)=>admin.name=== name || admin.email===email);
           

            if(matchingAdmin){
                console.log("user already exists")
                req.session.signuperror = true 
                req.session.emailerror =true
                 res.redirect(`/page-account-register`)
                

              }else{
            await newAdmin.save();  
            console.log(newAdmin) 
            res.redirect("/admindashboard")
            
        }
        
    } catch (error) {
        console.log(error) 
    }
   
}
module.exports={page_account_register}