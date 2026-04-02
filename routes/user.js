const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport")



router.get("/signup",(req,res)=>{
res.render("users/signup.ejs")
})

router.post("/signup",wrapAsync(async(req,res)=>{
    
    try{const{username,email,password }=req.body;
    const nuser= new User({email,username})
    await User.register(nuser,password)
    req.flash("success","Registration Successful!")
   
    res.redirect("/listing")}

    catch(err)
    {
        req.flash("error","user already exist !")
            res.redirect("/signup")

    }
}))


router.get("/login",(req,res)=>{
res.render("users/login.ejs")
})
router.post("/login", passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),async(req,res)=>
{
    res.send("login successful")

})

module.exports=router