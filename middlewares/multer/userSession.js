// for normalpages

let isLogin= async(req, res, next)=>{
    try{
        if(req.session.userisAuth){
            next()
        }else{
            res.redirect("/user-login")
        }
    }catch(error){
        
        console.log(error.message)

    }
}

// for  logout page

let isLogout = async(req, res, next)=>{
    try {

        if(req.session.userisAuth){
            res.redirect("/")
         } else{
                next()
            }     
        
    } catch (error) {
        
    }

}
module.exports={isLogin, isLogout}