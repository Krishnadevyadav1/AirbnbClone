const { default: mongoose } = require("mongoose");
const mogoose=require("mongoose");


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
});

const listing= mongoose.model("listing",listingSchema);
module.exports=listing;