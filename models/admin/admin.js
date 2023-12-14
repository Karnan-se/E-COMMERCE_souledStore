const mongoose= require("mongoose");
const bcrypt = require("bcrypt")
const admin = new mongoose.Schema({
     name: {
        type:String,
        required:false,
     },
     email:{
      type:String,
      required:true,
     },
     password:{
      type:String,
      required:true,
     },
     dateOfBirth: {
        type:Number,
        required: false,
     },
     mobileNumber:{
        type:Number,
        required:false,
     },
     passwordResetToken: {
      type: String,
      required: false,
  },
  passwordResetTokenExpires: {
      type: Date,
      required: false,
  },
});

admin.methods.createResetPasswordToken = async function () {
   const resetToken = await bcrypt.hash(`${Date.now()}`, 10);
   const expirationTime = new Date();
   expirationTime.setMinutes(expirationTime.getMinutes() + 10);
   this.passwordResetToken = resetToken;
   this.passwordResetTokenExpires = expirationTime;
   return resetToken;
};
module.exports=(mongoose.model("admin", admin))
