const { default: mongoose } = require("mongoose");
const mogoose=require("mongoose");
const{Schema}=mongoose
const review=require("./reviews.js")

const listingSchema= new mongoose.Schema({
    title:{type:String,
        required:true,

    },
    description:String,

    
   image: {
  filename: String,
  url:String,
}
    ,
    price:Number,
    location:String,
    country:String,
    geometry:{
      type:{
        type:String,
        enum:['Point'],
        default:'Point'
      },
      coordinates:{
        type:[Number],
        default:[77.12,28.38]
      }
    },
    reviews:[{
      type:Schema.Types.ObjectId,
      ref:"review"
    }],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",

    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing)
  {
    await review.deleteMany({_id:{$in:listing.reviews}})
  }
})

const listing= mongoose.model("listing",listingSchema);
module.exports=listing;
