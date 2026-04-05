const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");



router.get("/signup",(req,res)=>{
res.render("users/signup.ejs")
})

router.post("/signup",wrapAsync(async(req,res)=>{
    
    try{const{username,email,password }=req.body;
    const nuser= new User({email,username})
  const reguser=  await User.register(nuser,password)
   req.login(reguser,(err)=>{
        if(err)
        {
            next(err)
        }
         req.flash("success","Registration Successful!")
   
    res.redirect("/listing")
    })
   
   }

    catch(err)
    {
        req.flash("error","user already exist !")
            res.redirect("/signup")

    }
}))


router.get("/login",(req,res)=>{
res.render("users/login.ejs")
})
router.post("/login",saveRedirectUrl, passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),async(req,res)=>
{   
    req.flash("success","login successful")
    let rdu=res.locals.redirectUrl||"/listing"
    res.redirect(rdu)

})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            next(err);
        }
        req.flash("success","logout successful")
        res.redirect("/listing")
    })
})

module.exports=router