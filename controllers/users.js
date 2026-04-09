const User=require("../models/user.js");
module.exports.userSignup=(req,res)=>{
res.render("users/signup.ejs")
}

module.exports.postUserSignup=async(req,res,next)=>{
    
    try{const{username,email,password }=req.body;
    const nuser= new User({email,username})
  const reguser=  await User.register(nuser,password)
   req.login(reguser,(err)=>{
        if(err)
        {
            return next(err)
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
}

module.exports.UserGetLogin=(req,res)=>{
res.render("users/login.ejs")
}


module.exports.userPostLogin=async(req,res)=>
{   
    req.flash("success","login successful")
    let rdu=res.locals.redirectUrl||"/listing"
    res.redirect(rdu)}


module.exports.userLogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            next(err);
        }
        req.flash("success","logout successful")
        res.redirect("/listing")
    })
}    
