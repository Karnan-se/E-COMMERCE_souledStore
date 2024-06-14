const express = require("express")
const admin= require("./models/admin/admin")
const app= express();
const methodOverride = require('method-override')
require('dotenv').config();
app.set("viewengine", "ejs");
app.set("views",__dirname+"/views");
app.use(express.static("public"));
app.use("/css", express.static("public/css"))
app.use("/js", express.static("public/js"))
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const session= require("express-session");
const mongoose= require("mongoose");
const router = require("./route/adminroute/route");
const userroute=require("./route/userroute/useroute")


app.use((req, res, next) => {
   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
   next();
 });

console.log(process.env.MONG0_URL)
async function dbconnect(){
   try {
      await mongoose.connect(process.env.MONG0_URL)
      console.log("database connected");
      
   } catch (error) {
      console.log(error.message)
      console.log("dataBase couldnot be connected")
      
   }
}
dbconnect();
app.use(session({
   secret:"your-secret-here",
   resave:false,
   saveUninitialized:true,
}));
app.use(express.json());

app.use("/",router)
app.use("/",userroute)


app.listen(process.env.PORT,()=>{
   console.log("localhost 3000")
   console.log(process.env.EMAIL_HOST)
})