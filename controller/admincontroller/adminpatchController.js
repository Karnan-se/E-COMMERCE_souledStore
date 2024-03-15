const sendEmail = require('../../utils/otp')
const user = require("../../models/user/userdetails")
const resetToken= require("../../models/admin/resetPass")
const { json } = require('stream/consumers');
const { error } = require('console');
const bcrypt = require('bcrypt');
const { getHashes } = require('crypto');
const { reset } = require('nodemon');


let forgot_password= async(req, res)=>{

    if(req.session.tokenExpired){
        delete req.session.tokenExpired;

        res.render("admin/forgot-password.ejs",{tokenExpired:"noToken"})

    }
   
           res.render("admin/forgot-password.ejs")

}




let resetpassword = async(req, res)=>{


    console.log("hey");

    const emailid = req.query.email;
    console.log(emailid);
   
    
    const userDetail= await user.findOne({email:emailid});
  
   
    if(!userDetail){
        console.log("user doesnot exists")
       return res.status(200).json({data:"!user"})
       
    }
   
    const resetTokenValue = Math.floor(100000 + Math.random() * 900000);

    const ResetToken = new resetToken({
        email: emailid,
        passwordResetToken: resetTokenValue,
       
    });

    await ResetToken.save();


    const resetUrl=`${req.protocol}://${req.get('host')}/PasswordChange/${resetTokenValue}/${userDetail._id}`
    const message = `we have received a password reset request\n\n${resetUrl}\n\n this password link is valid for 10 minutes`
    try{
    await sendEmail.sendEmail({   
        
            email:userDetail.email,
            subject:"passsword change request recieved",
            message:message,
  
    });
    const data = "hey";
    await res.status(200).json({data})
    
     return;
} catch (error) {
    console.log(error.message)

}


}


let newPasswordChange= async(req,res)=>{

   try{
    const userid =(req?.params?.id);
    const token =(req?.params?.token);

    if(!token){
        console.log("token Expired");
        req.session.tokenExpired = true;
       return  res.redirect("/forgot-password")
    }
   

    const resetId= await resetToken.findOne({passwordResetToken:token});

    if(!resetId){
        console.log("pasasword reset Token has expired")
        req.session.tokenExpired = true;
       return res.redirect("/forgot-password");
    }else{

        const emailId = resetId.email;
        console.log(emailId)
        res.render("admin/resetpassword.ejs",)   

    }
    
   
             
    } catch (error) {
        console.log(error)
    }
}


let updatepassword= async(req, res)=>{
    try {
  
        console.log("hey")
       
       
        const password1 = req.body.password1;

        const salt = await bcrypt.genSalt(10)
        const hash =  await bcrypt.hash(password1, salt)

        const updatedpassword = await admin.updateOne({_id:userid},{$set:{password:hash}})
           
        console.log(`password saved successsfully ${updatedpassword}`);

        }catch{
        console.log(error)
        
        }
        
        res.redirect("/forgot-password")
        

}

module.exports={resetpassword,forgot_password, newPasswordChange }