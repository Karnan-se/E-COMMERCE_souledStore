
const { encode } = require("punycode");
const admin = require("../../models/admin/admin")
let page_account_register = async(req, res)=>{
    try {
        
            const {name, password, email, mobileNumber} = req.body;
            const newAdmin = new admin({
                name,
                password,
                email,
                mobileNumber,
            })
            const admins = await admin.find({})
            const matchingAdmin = admins.find((admin)=>admin.name=== name && admin.password=== password);

            if(matchingAdmin){
                console.log("user already exists")
           req.session.signuperror = true 
            }else{
            await newAdmin.save();
            }
          
            const matchingEmail = admins.find((admin)=> admin.email===email)
            
            if(matchingEmail){
                const matchingPassword= admins.find((admin)=> admin.password===password)
                console.log(matchingPassword);
                
                req.session.emailerror = true
            }else{
                console.log("error")

            }    
            res.redirect(`/page-account-register`)
        
    } catch (error) {
        console.log(error)
        
    }
}
module.exports={page_account_register}