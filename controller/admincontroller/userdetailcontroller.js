
const user = require("../../models/user/userdetails")

let admin_user_page = async(req, res)=>{
    try {
        const users = await user.find();

        res.render("admin/admin-user-page.ejs",users)
        console.log(users)
    } catch (error) {
        console.log(error);
        
    }
}



module.exports={
    admin_user_page
}