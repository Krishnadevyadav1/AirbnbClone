const listing=require("./models/listing.js")
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewschema}=require("./schema.js")
const review=require("./models/reviews.js")

module.exports.isLoggedIn=(req,res,next)=>{
     if(!req.isAuthenticated())
    {
        req.session.redirectUrl=req.originalUrl
        req.flash("error","Please login to add listing")
       return  res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

module.exports.isOwner=async(req,res,next)=>{
   
    let {id}=req.params;
        let li= await listing.findById(id);
    
        if(! li.owner._id.equals(res.locals.currUser._id))
        {
          req.flash("error","you are not authorized ")
           return res.redirect(`/listing/${id}/show`)
        }
next()
}

module.exports.validateListing=(req,res,next)=>{
     let result=listingSchema.validate(req.body);
   if(result.error)
   {
    let errMsg=result.error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg)
   }else{
    next()
   }
   
}

module.exports.validatereview=(req,res,next)=>{
     let result=reviewschema.validate(req.body);
     
   if(result.error)
   {
    let errMsg=result.error.details.map((el)=>el.message).join(",");
    
    throw new ExpressError(400,errMsg)
   }else{
    next()
   }
}


module.exports.isReviewAuthor=async(req,res,next)=>{
   
    let {id,reviewid}=req.params;
        let reviews= await review.findById(reviewid);
    
        if(! reviews.author._id.equals(res.locals.currUser._id))
        {
          req.flash("error","you are not authorized ")
           return res.redirect(`/listing/${id}/show`)
        }
next()
}
