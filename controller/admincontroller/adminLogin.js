const admins= require("../../models/admin/admin")

let adminLogin= async(req, res)=>{
    try {
        let message1=null;
        if(req.session.emailerror){
            delete req.session.emailerror
             message1="username not exist"
        }else if(req.session.passworderror){
             message1="incorrect password"
             delete req.session.passworderror;
        } else{
            message1=null;
        }
       return res.render("admin/adminlogin.ejs",{message1})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports ={
    adminLogin
}