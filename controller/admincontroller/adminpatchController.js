const sendEmail = require('../../utils/otp')
const admin = require("../../models/admin/admin")

let resetpassword = async(req, res)=>{

    const user= await admin.findOne({email:req.body.email});
    if(!user){
        console.log("user doesnot exists")
    }
    else{
        console.log(user)
    }
    const resetToken = user.createResetPasswordToken();

    await user.save()
    const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`
    const message = `we have received a password reset request\n\n${resetUrl}\n\n this password link is valid for 10 minutes`
    try{
    await sendEmail.sendEmail({   
        
            email:user.email,
            subject:"passsword change request recieved",
            message:message,
  
    });
    res.status(200).json({})
} catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires= undefined;
    user.save({validateBeforeSave:false})
    console.log("error sending the email")
    return;

}


}

let patchpassword= async(req,res)=>{

    try {
        
    } catch (error) {
        
    }

}

module.exports={resetpassword,patchpassword}