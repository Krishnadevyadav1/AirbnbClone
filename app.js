const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const ejs=require("ejs");

const ejsmate=require("ejs-mate")

const ExpressError=require("./utils/ExpressError.js");


const listings=require("./routes/listing.js")
const review=require("./routes/review.js");

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





app.use("/listing",listings)

app.use("/listing/:id/reviews",review)

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
