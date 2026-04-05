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
  url: {
    type: String,
    default: 'https://i2.wp.com/theluxuryeditor.com/wp-content/uploads/2019/03/154872166.jpg?resize=940%2C627&ssl=1'
  }
}
    ,
    price:Number,
    location:String,
    country:String,
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