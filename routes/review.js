const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewschema}=require("../schema.js")
const  listing =require("../models/listing.js")
const  reviews=require("../models/reviews.js")






const validatereview=(req,res,next)=>{
     let result=reviewschema.validate(req.body);
     
   if(result.error)
   {
    let errMsg=result.error.details.map((el)=>el.message).join(",");
    
    throw new ExpressError(400,errMsg)
   }else{
    next()
   }
}

router.post("/",validatereview, wrapAsync(async(req,res)=>{
    
    let listings= await listing.findById(req.params.id);
    let newreview=new reviews(req.body.reviews)
    listings.reviews.push(newreview)

    await newreview.save()
    await listings.save()
    req.flash("success","New review created!")

 res.redirect(`/listing/${listings._id}/show`)
}))

router.delete("/:reviewid",wrapAsync(async(req,res)=>
{
    const {id,reviewid}=req.params;
    console.log(id)
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await reviews.findByIdAndDelete(reviewid);
   req.flash("success","review Deleted!")

    res.redirect(`/listing/${id}/show`)

}))
module.exports=router