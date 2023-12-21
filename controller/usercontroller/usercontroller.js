const { register } = require("module");
const user = require("../../models/user/userdetails")


let user_index = async(req, res)=>{
    try {
        let message1=null;

        res.render("user/index.ejs",{message1})
    } catch (error) {
        console.log(error);
        
    }

}

let userlogin = async (req, res)=>{
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
        res.render("user/userlogin.ejs",{message1})
    } catch (error) {
        console.log(error);
        
    }
     
}

let user_register= async(req, res)=>{
    try {
       let message1 = ''
req.session.signuperror = false
        if(req.session.signuperror)
        {
            message1= 'Username already exists'
           delete req.session.signuperror
            await res.render("user/user-register.ejs",{message1})

        }
        else if(req.session.emailerror)
            {
                message1 = 'userId already exist please login '
                delete req.session.emailerror
                await res.render("user/user-register.ejs",{message1})

            }
else{
         await res.render("user/user-register.ejs",{message1})
}
    } catch (error) {
        console.log(error)
        
    }
}





module.exports={user_index, userlogin, user_register}