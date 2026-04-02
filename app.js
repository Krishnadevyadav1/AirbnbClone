const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const session = require('express-session')
const flash=require("connect-flash")
const ejsmate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError.js");
const listings=require("./routes/listing.js")
const review=require("./routes/review.js");
const passport=require("passport")
const LocalStrategy=require("passport-local")
const User=require("./models/user.js")
const user=require("./routes/user.js")


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const methodOverride=require("method-override");


app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialised :true,
    cookie:{
   expires:Date.now()*7*24*60*60*1000,
   maxAge:7*24*60*60*1000,
   httpOnly:true,     
    }
};




const mangooseUrl="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log("error ! ")
})

async function main() {
    await mongoose.connect(mangooseUrl);
    
}
app.get("/",(req,res)=>{
    res.redirect("/listing")
})

app.use(session(sessionOptions));
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

// app.get("/demouser",async(req,res)=>{
//     let fakeuser=new User({
//         email:"kdy@gmail.com",
//         username:"kdy"
//     })
//    const ruser=await  User.register(fakeuser,"password")
//    res.send(ruser)
// })


app.use("/listing",listings)

app.use("/listing/:id/reviews",review)

app.use("/",user)


// Catch-all route
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.render("error.ejs",{err})
//   res.status(statusCode).send(message);
});


// app.all('/*',(req,res,next)=>{
//     next(new ExpressError(404,"page not found"))
// })

// app.use((err,req,res,next)=>{
//     let (statusCode,message)= err;
//     res.status(statusCode).send(message)
// })
app.listen(8080,(req,res)=>{
    console.log("listening")
   
})
