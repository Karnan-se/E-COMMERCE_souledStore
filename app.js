const express = require("express")
const admin= require("./models/admin/admin")
const app= express();
app.set("viewengine", "ejs");
app.set("views",__dirname+"/views");
app.use(express.static("public"));
app.use("/css", express.static("public/css"))
app.use("/js", express.static("public/js"))
app.use(express.urlencoded({extended:true}))
const session= require("express-session");
const mongoose= require("mongoose");
const router = require("./route/adminroute/route");

async function dbconnect(){
   try {
      await mongoose.connect("mongodb://127.0.0.1:27017/souled-store")
      console.log("database connected");
      
   } catch (error) {
      console.log("dataBase couldnot be connected")
      
   }
}
dbconnect();

app.use("/",router)

app.use(session({
   secret:"your-secret-here",
   resave:false,
   saveUninitialized:true,
}));

app.listen(3000,()=>{
   console.log("localhost 3000")
})