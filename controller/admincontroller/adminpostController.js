const bcrypt = require("bcrypt")
const { encode } = require("punycode");
const admin = require("../../models/admin/admin")
const sendemail = require("../../utils/otp")
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

let page_account_login =async(req, res)=>{
    try {
        delete req.session.passworderror;
        delete req.session.emailerror;

        const {password, email}= req.body

        const matchingAdmin = await admin.find({email:email})
        console.log(matchingAdmin)
            
        
        if (matchingAdmin.length> 0){
            const matchingPassword = await bcrypt.compare(password, matchingAdmin[0].password)
            console.log(matchingPassword)
            delete req.session.passworderror

            if(matchingPassword == true){
                console.log("passwordMatched")
                req.session.adminisAuth=true;
                res.redirect("admindashboard")

            }else{
                req.session.passworderror=true;
                res.redirect("/admin-login")
            }

        } else {
            req.session.emailerror = true
            res.redirect("/admin-login")
        }
    
     
    } catch (error) {
        console.log(error.message)
        
    }
}


module.exports={page_account_register, page_account_login}