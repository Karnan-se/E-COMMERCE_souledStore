const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'karnan.se@gmail.com',
        pass:'seethalakshmi'
    }
});


function generateotp(){
    const otp =Math.floor(1000+Math.random()*9000).toString();
    const timestamp = Date.now();
    const expiryTIme = 5*60*1000;

    return {otp, timestamp, expiryTIme}

}

function sendOTP(email) {
    const {otp, timestamp, expriytime} =generateotp();

    const mailoption ={
        from: 'karnan.se@gmail.com',
        to: email,
        subject:'your otp for verification',
        text: `your otp is${otp}. it is valid for 5 minutes`
    }
}