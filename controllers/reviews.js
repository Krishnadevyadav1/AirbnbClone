const  reviews=require("../models/reviews.js")
const  listing =require("../models/listing.js")

module.exports.newReviews=async(req,res)=>{
    
    let listings= await listing.findById(req.params.id);
    let newreview=new reviews(req.body.reviews)
    newreview.author=req.user._id
    listings.reviews.push(newreview)
    await newreview.save()
    await listings.save()
    req.flash("success","New review created!")

 res.redirect(`/listing/${listings._id}/show`)
}

module.exports.deleteReview=async(req,res)=>
{
    const {id,reviewid}=req.params;
    console.log(id)
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await reviews.findByIdAndDelete(reviewid);
   req.flash("success","review Deleted!")

    res.redirect(`/listing/${id}/show`)

}