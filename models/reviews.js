const { default: mongoose } = require("mongoose");
const mogoose=require("mongoose");


const reviewsSchema=mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdat:{type:Date,
        default:Date.now(),

    }
})

module.exports=mongoose.model("review",reviewsSchema);