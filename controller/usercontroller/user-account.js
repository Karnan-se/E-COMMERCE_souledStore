const { yearsToQuarters } = require("date-fns");
const userdetail = require("../../models/user/userdetails");
const bcrypt = require("bcrypt")

let user_page_account = async(req, res)=>{
    try {
        const userDetails = req.session.userisAuth;
       
        
        if(req.session.passwordUpdated){
            delete req.session.passwordUpdated;
            const message="passwordUpdated";
            return res.render("user/user-page-account.ejs",{userDetails,message})
        }
       return res.render("user/user-page-account.ejs",{userDetails})


        
    } catch (error) {
        console.log(error.message)
    }
}

let currentPassword= async(req, res)=>{
    try {
        const currentPassword = req.body.password;
        const userDetails = req.session.userisAuth;
        const encrypyedPassword = await bcrypt.compare(currentPassword, userDetails.password)
        console.log(encrypyedPassword);
        if(encrypyedPassword == true){
            const data = encrypyedPassword;
            
            return await res.status(200).json({data})
        }else if(encrypyedPassword == false){
            data= false;
            console.log(data)
            return res.status(200).json({data})
        }
       
    } catch (error) {
        console.log(error.message)
        
    }
}

let newpasswordchange = async(req, res)=>{
    try {
        const newpassword = req.body.npassword;
        console.log("password")
        console.log(newpassword)
        const userDetails = req.session.userisAuth;
        console.log(userDetails)
       const userEmail= userDetails.email;
        console.log(userEmail);
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(newpassword, salt)
        const updatePassword = await userdetail.updateOne({email:userEmail},{$set:{password:HashedPassword}})
        console.log("passwordUpdated");
        if(updatePassword){
        const newUserDetails = await userdetail.findOne({email:userEmail})
        req.session.userisAuth=newUserDetails;
        console.log("session updated")
        req.session.passwordUpdated= true;
        res.redirect("/myAccount")
        }else{
            console.log("password update failed")
        }

        
    } catch (error) {
        console.log(error.message)
    }
}


// here i like to add if there only one element then it should the status should be true
let addAddress = async(req, res)=>{
    try {
        
       
        if(req.session.userisAuth){

            const userEmail=req.session.userisAuth.email;
            console.log(userEmail);
            const address = req.body.address;

            const user = await userdetail.findOne({email:userEmail});
            if( user.Address.length<1){
                const update = await userdetail.updateOne({email:userEmail},
                    {$addToSet:{Address: {housename:address.houseName, Street : address.streetName, City :address.city,State: address.state, status:true}}})
    

            }
            

            const update = await userdetail.updateOne({email:userEmail},
                {$addToSet:{Address: {housename:address.houseName, Street : address.streetName, City :address.city,State: address.state}}})

            // const update = await userdetail.updateOne({email: userEmail}, {$addToSet:{Address:address}});
            console.log(update)
            
            console.log(address)
            console.log(address.houseName)
        
       
        const data = "data"

        await res.status(200).json({data})

        }else{
            res.redirect("/user-login")
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}

let updateAddressStatus = async(req, res)=>{
    try {
        console.log("conneted");
        const index = req.query.index;
        console.log(index);

        const userDetails  = req.session.userisAuth;
        console.log(userDetails);
        const userEmail = userDetails.email
        const updateallfalse = await userdetail.updateMany({Address:{$exists: true} },{$set:{"Address.$[].status":false}})
        const updateaoneTOtrue= await userdetail.updateOne({email:userEmail},{$set:{[`Address.${index}.status`]:true}})
        console.log("selected address status become true");
        console.log(updateallfalse);
        console.log(updateaoneTOtrue);
        const newuserisAuth = await userdetail.findOne({email:userDetails.email});
        req.session.userisAuth=newuserisAuth
        console.log(req.session.userisAuth);
       const data="Address Status updated to true";

        res.status(200).json({data})
       

        

    } catch (error) {
         console.log(error.message);
        
    }

}

let deleteAddress = async(req, res)=>{
    try {
        const index= (req.query.index1);
       console.log(index);

        const userEmail = req.session.userisAuth.email;
        const updatedUser = await userdetail.findOneAndUpdate(
            { email: userEmail },
            { $pull: { Address: { _id: { $in: [index] } } } },
            { new: true } 
          );
          
        console.log(updatedUser);
        const userdetails = await userdetail.findOne({email:userEmail});
        req.session.userisAuth=userdetails;
        const data ="hey";
        await res.status(200).json({data});
        
    } catch (error) {
        console.log(error.message)
        
    }
}
let updateName= async(req, res)=>{
    try {

        const name = req.query.name;
        console.log(name);
        const userId = req.session.userisAuth._id;
        console.log(userId);
        const userModel = await userdetail.updateOne({_id:userId},{$set:{name:name}});
        console.log(userModel)
        const dataset = await userdetail.findOne({_id:userId})
        const data= dataset.name;
        console.log(data);
        req.session.userisAuth = dataset
        await res.status(200).json(data)
        

    } catch (error) {
        
    }
}



module.exports={user_page_account, 
    currentPassword,
     newpasswordchange,
        addAddress,
        updateAddressStatus,
        deleteAddress,
    updateName }