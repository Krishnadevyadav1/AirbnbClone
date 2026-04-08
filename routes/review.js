const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const{validatereview,isLoggedIn,isReviewAuthor}=require("../middleware.js")
const reviewsController=require("../controllers/reviews.js")







router.post("/",isLoggedIn,validatereview, wrapAsync(reviewsController.newReviews))

router.delete("/:reviewid",isLoggedIn,isReviewAuthor, wrapAsync(reviewsController.deleteReview))


module.exports=router