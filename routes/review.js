const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const{validatereview,isLoggedIn,isReviewAuthor}=require("../middleware.js")
const  listing =require("../models/listing.js")
const  reviews=require("../models/reviews.js")








router.post("/",isLoggedIn,validatereview, wrapAsync(async(req,res)=>{
    
    let listings= await listing.findById(req.params.id);
    let newreview=new reviews(req.body.reviews)
    newreview.author=req.user._id
    listings.reviews.push(newreview)
    await newreview.save()
    await listings.save()
    req.flash("success","New review created!")

 res.redirect(`/listing/${listings._id}/show`)
}))

router.delete("/:reviewid",isLoggedIn,isReviewAuthor, wrapAsync(async(req,res)=>
{
    const {id,reviewid}=req.params;
    console.log(id)
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await reviews.findByIdAndDelete(reviewid);
   req.flash("success","review Deleted!")

    res.redirect(`/listing/${id}/show`)

}))
module.exports=router