const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js")
const  listing =require("../models/listing.js")




const validateListing=(req,res,next)=>{
     let result=listingSchema.validate(req.body);
   if(result.error)
   {
    let errMsg=result.error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg)
   }else{
    next()
   }
}



router.get("/", wrapAsync(async(req,res,next)=>{

    let alllisting=  await listing.find();
    res.render("listing/index.ejs",{alllisting});
  
    
   
   
}))
router.get("/:id/show", wrapAsync(async(req,res)=>{
    let {id}=req.params
   let list=  await listing.findById(id).populate("reviews");
   if(!list)
   {
        req.flash("error"," listing doesn't exist!")
        res.redirect("/listing")
   }
   else{   res.render("listing/show.ejs",{list});}
 
    
}))

router.get("/new", (req,res)=>{
    
    
    res.render("listing/new.ejs")
})
//new listing
router.post("/new", validateListing,wrapAsync(async(req,res)=>{
    let listing1=new listing(req.body.listing);

 await listing1.save().then((result)=>{
    req.flash("success","New listing created!")
    res.redirect("/listing")
    
})}))



router.get("/:id/edit", wrapAsync(async (req,res)=>{
    let {id}=req.params
    
    
   let list=  await listing.findById(id);
    res.render("listing/edit.ejs",{list});
    
}))

router.put("/:id/edit",validateListing,wrapAsync(async (req,res)=>{
   
     let {id}=req.params;
 

     await listing.findByIdAndUpdate(id,{...req.body.listing})
         req.flash("success","listing  updated!")

        if(!list)
   {
        req.flash("error"," listing doesn't exist!")
        res.redirect("/listing")
   }
   else{   res.render("listing/show.ejs",{list});}
    

    
}))
router.delete("/:id/delete",wrapAsync(async(req,res)=>{
 let {id}=req.params;

 let del= await listing.findByIdAndDelete(id);
 req.flash("success","listing Deleted!")

res.redirect("/listing")
console.log(del)

}))

module.exports=router
