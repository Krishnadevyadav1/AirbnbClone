const { default: mongoose } = require("mongoose");
const mogoose=require("mongoose");
const{Schema}=mongoose

const reviewsSchema=mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdat:{type:Date,
        default:Date.now(),

    },
     author:{
      type:Schema.Types.ObjectId,
      ref:"User",

    },
})

module.exports=mongoose.model("review",reviewsSchema);