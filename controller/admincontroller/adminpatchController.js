const sendEmail = require('../../utils/otp')
const admin = require("../../models/admin/admin")

//it is get of forgot password
let forgot_password= async(req, res)=>{
    try {
        let message=null;

        if(req.session.countown=true){
             req.session.destroy()
            let message="hey"
            let resetToken= req.query
            
            res.render("admin/forgot-password.ejs",{message,resetToken});
        

            
        }else{
            res.render("admin/forgot-password.ejs",{message});

        }

        
        
        
    } catch (error) {
        console.log(error);
        
    }
}
let resetpassword = async(req, res)=>{

    //example //


    const user= await admin.findOne({email:req.body.email});
    if(!user){
        console.log("user doesnot exists")
    }
    if(isTokenExpired(user)){
        console.log("reset Token is expired")
    }
    else{
        console.log(user)
    }
    let resetToken = await user.createResetPasswordToken();
    await user.save()

    const resetUrl=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`
    const message = `we have received a password reset request\n\n${resetUrl}\n\n this password link is valid for 10 minutes`
    try{
    await sendEmail.sendEmail({   
        
            email:user.email,
            subject:"passsword change request recieved",
            message:message,
  
    });
    req.session.countown=true;
     res.redirect(`/forgot-password?token=${resetToken}`)
     return;
} catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires= undefined;
    user.save({validateBeforeSave:false})
    console.log("error sending the email")
    return;

}


}
const isTokenExpired =(admin) =>{
    if(!admin.passwordResetToken){
        return true;
    }
    const expiredTime = new Date(admin.passwordResetTokenExpires)
    const currentTime = new Date();

    return currentTime > expiredTime;
}

let patchpassword= async(req,res)=>{

    try {
        
     
      
        res.render("admin/resetpassword.ejs",)

        
    } catch (error) {
        
    }

}

module.exports={resetpassword,patchpassword,forgot_password}