const sendEmail = require('../../utils/otp')
const admin = require("../../models/admin/admin");
const { json } = require('stream/consumers');
const { error } = require('console');

//it is get of forgot password
let forgot_password= async(req, res)=>{
    try {
        let message=null;

        if(req.session.countown=true){
             req.session.destroy()
            let message="hey"
            let resetToken= req.query.token;
            let id= req.query.id;
            console.log(id);
            res.render("admin/forgot-password.ejs",{message,resetToken,id});   
        }else{
            res.render("admin/forgot-password.ejs",{message});

        }  
    } catch (error) {
        console.log(error); 
    }
}
let resetpassword = async(req, res)=>{

    const user= await admin.findOne({email:req.body.email});
    const email = req.body.email;
    req.session.email=email;
    if(!user){
        console.log("user doesnot exists")
    }
   
    else{
        console.log(user)
       
    }
    var resetToken = await user.createResetPasswordToken();
    await user.save()

    const resetUrl=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}/${user._id}`
    const message = `we have received a password reset request\n\n${resetUrl}\n\n this password link is valid for 10 minutes`
    try{
    await sendEmail.sendEmail({   
        
            email:user.email,
            subject:"passsword change request recieved",
            message:message,
  
    });
    req.session.countown=true;
    
     res.redirect(`/forgot-password?token=${resetToken}&id=${user._id}`)
     return;
} catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires= undefined;
    user.save({validateBeforeSave:false})
    console.log("error sending the email")
    return;

}


}


let patchpassword= async(req,res)=>{

   try{
    const user =(req.params.id);
    console.log(user)
    req.session.user=user;
   
            res.render("admin/resetpassword.ejs",{user})    
    } catch (error) {
        console.log(error)
    }
}
let updatepassword= async(req, res)=>{
    try {
  
        console.log("hey")
        userid= req.session.user;
        console.log(userid)
        const password1 = req.body.password1;
     
        
            const updatedpassword = await admin.updateOne({_id:userid},{$set:{password:password1}})
           
            console.log(`password saved successsfully ${updatedpassword}`);

        }catch{
            console.log(error)
        }
        
        res.redirect("/forgot-password")
        

}

module.exports={resetpassword,patchpassword,forgot_password, updatepassword}