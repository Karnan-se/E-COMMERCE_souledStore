const nodemailer = require("nodemailer")

module.exports={
 sendEmail: async (options)=>{
   try{

    const transporter = nodemailer.createTransport(
        {
        service:"gmail",
        auth:{
            user:"mhdrizwanpkd@gmail.com",
            pass:"sgzmnhpoginjuwat"
        }
    })//TRANSPORTER

    const emailoptions={
        from: 'mhdrizwanpkd@gmail.com',
        to:options.email,
        subject:options.subject,
        text:options.message,
    }
    await transporter.sendMail(emailoptions);
    console.log("email sent successfully")
    
    

}catch (error){
    console.log(error)
    
}

}
}


