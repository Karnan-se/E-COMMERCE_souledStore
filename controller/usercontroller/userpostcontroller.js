const bcrypt = require("bcrypt");
const { encode } = require("punycode");
const user = require("../../models/user/userdetails");
const { sendEmail } = require("../../utils/otp");
const generateOtp = require("../../utils/generateOtp");
const otpSchema = require("../../models/user/otp")

let user_register = async (req, res) => {
  try {
    const { name, password, email, mobileNumber } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let newUser = new user({
      name,
      password: hash,
      email,
      mobile: mobileNumber,
    });
    const users = await user.find({});
    const matchingusers = users.find(
      (user) => user.name === name || user.email === email
    );

    if (matchingusers) {
      console.log("user already exists");
      req.session.signuperror = true;
      req.session.emailerror = true;
      res.redirect(`/user-register`);
    } else {
      await newUser.save();
      console.log(newUser);
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

let user_login = async (req, res) => {
  try {
    const { password, email } = req.body;

    const users = await user.find({});
    const matchingUser = users.find((user) => {
      return user.email === email;
    });

    if (matchingUser) {
      const matchingPassword = await bcrypt.compare(
        password,
        matchingUser.password
      );

      if (matchingPassword) {
        res.redirect("/");
      } else {
        req.session.passworderror = true;
        res.redirect("/user-login");
      }
    } else {
      req.session.emailerror = true;
      res.redirect("/user-login");
    }
  } catch (error) {}
};

let sendOtp = async (req, res) => {
  try {
    var email = req.query.email

    const message = `this message is only valid for few minutes`;
    const otp = generateOtp.generateOtp();
    console.log(otp);

   const newOtp = new otpSchema({
    otp:otp,
    gmail:email
})
await newOtp.save();
console.log("hhhhh")



    const options = {
      email,
      subject: `passsword change request recieved ${otp}`,
      message,
    };
    await sendEmail(options);
    
    const data="otp is send"

    res.status(200).json(data);

  } catch (error) {
    console.log(error.message);
  }
};

let verifyOtp = async(req, res)=>{
try {
    const otp = req.query.otp
    console.log(otp);
    let savedOtp = null;

    const dbotp = await otpSchema.findOne({otp:otp})
    console.log(dbotp);
     savedOtp=dbotp?.otp
    console.log(savedOtp)

    if (otp == savedOtp){

        const otpData="otp Matched"

        res.status(200).json(otpData)
        
    }else{
        const otpError = "otp doesnot matched"
        res.status(200).json(otpError)
    }
    

    
} catch (error) {

    console.log(error.message)

    
}
}


module.exports = { user_login, user_register, sendOtp,verifyOtp};
