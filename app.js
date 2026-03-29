const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const ejs=require("ejs");
const  listing =require("./models/listing.js")
const ejsmate=require("ejs-mate")
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewschema}=require("./schema.js")
const  reviews=require("./models/reviews.js")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));




const mangooseUrl="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log("error ! ")
})

async function main() {
    await mongoose.connect(mangooseUrl);
    
}


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
app.get("/listing", wrapAsync(async(req,res,next)=>{

    let alllisting=  await listing.find();
    res.render("listing/index.ejs",{alllisting});
  
    
   
   
}))
app.get("/listing/:id/show", wrapAsync(async(req,res)=>{
    let {id}=req.params
   let list=  await listing.findById(id).populate("reviews");
    res.render("listing/show.ejs",{list});
    
}))

app.get("/listing/new", (req,res)=>{
    
    
    res.render("listing/new.ejs")
})
app.post("/listing/new", validateListing,wrapAsync(async(req,res)=>{
  
    const {title,description,image,price,country,location}=req.body;
    let listing1=new listing({
    title:title,
    description:description,
    image:image,
    price:price,
    location:location,
   country:country
    ,
}) 
 await listing1.save().then((result)=>{
    res.redirect("/listing")
    
})}))



app.get("/listing/:id/edit", wrapAsync(async (req,res)=>{
    let {id}=req.params
   let list=  await listing.findById(id);
    res.render("listing/edit.ejs",{list});
}))

app.put("/listing/:id/edit",validateListing,wrapAsync(async (req,res)=>{
   
     let {id}=req.params;
     await listing.findByIdAndUpdate(id,{...req.body.listing})
     res.redirect(`/listing/${id}/show`)
    
}))
app.delete("/listing/:id/delete",wrapAsync(async(req,res)=>{
 let {id}=req.params;

 let del= await listing.findByIdAndDelete(id);
res.redirect("/listing")
console.log(del)

}))

app.post("/listing/:id/reviews",validatereview, wrapAsync(async(req,res)=>{
    
    let listings= await listing.findById(req.params.id);
    let newreview=new reviews(req.body.reviews)
    listings.reviews.push(newreview)

    await newreview.save()
    await listings.save()
 res.redirect(`/listing/${listings._id}/show`)
}))

app.delete("/listing/:id/reviews/:reviewid",wrapAsync(async(req,res)=>
{
    const {id,reviewid}=req.params;
    console.log(id)
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await reviews.findByIdAndDelete(reviewid);
    res.redirect(`/listing/${id}/show`)

}))
app.get("/",(req,res)=>{
    res.redirect("/listing")
})
// Catch-all route
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.render("error.ejs",{err})
//   res.status(statusCode).send(message);
});


// app.all('/*',(req,res,next)=>{
//     next(new ExpressError(404,"page not found"))
// })

// app.use((err,req,res,next)=>{
//     let (statusCode,message)= err;
//     res.status(statusCode).send(message)
// })
app.listen(8080,(req,res)=>{
    console.log("listening")
   
})
