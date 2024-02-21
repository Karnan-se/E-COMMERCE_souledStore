// for normalpages

let isLogin= async(req, res, next)=>{
    try{
        if(req.session.adminisAuth){
            next()
        }else{
            res.redirect("/admin-login")
        }
    }catch(error){
        
        console.log(error.message)

    }
}

// for  logout page

let isLogout = async(req, res, next)=>{
    try {

        if(req.session.adminisAuth){
            res.redirect("/admindashboard")
         } else{
                next()
            }     
        
    } catch (error) {
        
    }

}
module.exports={isLogin, isLogout}