const mongoose=require("mongoose");
const  listing=require("../models/listing.js")
const initData = require("./data.js");
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

const init = async()=>{
await listing.deleteMany({})
initData.data= initData.data.map((obj)=>({...obj,owner:"69ceb26a16981f84155473ba"}))
await listing.insertMany(initData.data)};
init();