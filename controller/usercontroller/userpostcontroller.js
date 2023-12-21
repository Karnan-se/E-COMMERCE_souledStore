const bcrypt = require("bcrypt")
const { encode } = require("punycode");
const user = require("../../models/user/userdetails")
const sendemail = require("../../utils/otp")


let user_register = async(req, res)=>{
    try {
        
            const {name, password, email, mobileNumber} = req.body;
            
            const salt = await bcrypt.genSalt(10)
            const hash =  await bcrypt.hash(password, salt)
            let newUser = new user({
                name,
                password:hash,
                email,
                mobile:mobileNumber,
                
                
            })
            const users = await user.find({})
            const matchingusers = users.find((user)=>user.name=== name || user.email===email);
           

            if(matchingusers){
                console.log("user already exists")
                req.session.signuperror = true 
                req.session.emailerror =true
                 res.redirect(`/user-register`)
                

              }else{
            await newUser.save();  
            console.log(newUser) 
            res.redirect("/")
            
        }
        
    } catch (error) {
        console.log(error) 
    }
   
}

let user_login =async(req, res)=>{
    try {
        const {password, email}= req.body

        const users = await user.find({});
        const matchingUser = users.find((user)=>{
            return user.email===email;
            

        })
        
        if (matchingUser){
            const matchingPassword = await bcrypt.compare(password, matchingUser.password)

        if(matchingPassword){
            res.redirect("/")
        } else {
            req.session.passworderror=true;
            res.redirect("/user-login")
        }
    } else{
        req.session.emailerror= true
    res.redirect("/user-login")
    }
     
    } catch (error) {
        
    }
}
module.exports={user_login, user_register}