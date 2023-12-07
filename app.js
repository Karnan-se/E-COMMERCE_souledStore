const express = require("express")
const app= express();
app.set("viewengine", "ejs");
app.set("views",__dirname+"/views");
app.use(express.static("public"));
app.use("/css", express.static("public/css"))
app.use(express.urlencoded({extended:true}))
const session= require("express-session");
app.use(session({
   secret:"your-secret-here",
   resave:false,
   saveUninitialized:true,
}));








app.listen(3000,()=>{"localhost3000"})