let adminLogin= async(req, res)=>{
    res.render("admin/adminlogin.ejs",{message:null})
}
let admindashboard = async(req, res)=>{
    res.render("admin/admindashboard.ejs")
}

module.exports={adminLogin}