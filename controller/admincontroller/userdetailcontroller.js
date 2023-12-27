
const { format } = require("date-fns");
const user = require("../../models/user/userdetails")

let admin_user_page = async(req, res)=>{
    try {
        var users
   
    if(req.session.activesort)
    {
        console.log('active sort')

       let users = await user.find({isActive:'true'});

   console.log(users)
        return res.render("admin/admin-user-page.ejs",{users:users})


    }
    else if(req.session.disabledsort)
    {
       let users = await user.find({isActive:false});
        return res.render("admin/admin-user-page.ejs",{users:users})

    }
    else
    {
       
        delete req.session.activesort   

        delete req.session.disabledsort   

        users = await user.find();
        return res.render("admin/admin-user-page.ejs",{users:users})

        
    }
        
    } catch (error) {
        console.log(error);
        
    }
}




let toggle = async(req, res)=>{

    try {

        var userId = await req.query.userId;
        console.log(userId)
      
        const userdetails= await user.findOne({_id:userId})
        if (userdetails.isActive==true){
            var update = await user.updateOne({_id : userId}, {$set:{isActive:false}}).catch((error)=>{
                console.log("if part worked")

            })
              
        }else{
            var update = await user.updateOne({_id : userId}, {$set:{isActive:true}}).catch((error)=>{
                console.log(`else part worked${error}`)
            })
   
        }
        res.json({update})
     
          
        
        
    } catch (error) {
        console.log(error)
        
    }
}

let active = async(req, res)=>{{
    try {
        delete req.session.activesort   

        delete req.session.disabledsort   

        const option = req.query.option
        if(option == 'Active')
        {
      console.log('active sort true')
        req.session.activesort = true
     
        res.redirect('/admin-user-page')
        }else if(option == 'Disabled')
        {
        
            req.session.disabledsort = true
      
            res.redirect('/admin-user-page')

        }
        else if(option == 'showall')
        {
            
            res.redirect('/admin-user-page')
        }

             
    } catch (error) {

        console.log(error)
        
    }
   
}}



let disabled = async(req, res)=>{{
    try {
        const users= await user.find({isActive:false})
        console.log(users)
        res.json(users)       
        
    } catch (error) {
        console.log(error)
        
    }   
}}
                        



module.exports={
    admin_user_page,
    toggle, active, disabled
}