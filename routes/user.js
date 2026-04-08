const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js")


router.route("/signup")
.get(userController.userSignup)
.post(wrapAsync(userController.postUserSignup))


router.route("/login")
.get(userController.UserGetLogin)
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.userPostLogin

)

router.get("/logout",userController.userLogout)



module.exports=router