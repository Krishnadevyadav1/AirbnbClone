const listing = require("../models/listing.js")


module.exports.index= async (req, res, next) => {

    let alllisting = await listing.find();
    res.render("listing/index.ejs", { alllisting });




}

module.exports.showRoute=async (req, res) => {
    let { id } = req.params
    let list = await listing.findById(id)
    .populate({path:"reviews",populate:"author"}).populate("owner");

    if (!list) {
        req.flash("error", " listing doesn't exist!")
        res.redirect("/listing")
    }
    else { res.render("listing/show.ejs", { list }); 

}


}

module.exports.newRoute=(req, res) => {

    res.render("listing/new.ejs")
}

module.exports.newPostRoute=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    let listing1 = new listing(req.body.listing);
    listing1.owner = req.user._id
    listing1.image={url,filename}
    await listing1.save().then((result) => {
        req.flash("success", "New listing created!")
        res.redirect("/listing")

    })
}

module.exports.getEdit=async (req, res) => {
    let { id } = req.params

    let list = await listing.findById(id);
    if (!list) {
        req.flash("error", " listing doesn't exist!")
        res.redirect("/listing")
    }

    let originalimg=list.image.url;
    originalimg=originalimg.replace("/upload","/upload/h_300,w_250")

     res.render("listing/edit.ejs", { list ,originalimg}); 
    

}

module.exports.postEdit=async (req, res) => {

    let { id } = req.params;

   let listing2= await listing.findByIdAndUpdate(id, { ...req.body.listing })
   if(typeof req.file!="undefined"){
     let url=req.file.path;
    let filename=req.file.filename;
     listing2.image={url,filename}
     await listing2.save();}
    req.flash("success", "listing  updated!")
    res.redirect(`/listing/${id}/show`)
  



}

module.exports.deleteRoute=async (req, res) => {
    let { id } = req.params;

    let del = await listing.findByIdAndDelete(id);
    req.flash("success", "listing Deleted!")

    res.redirect("/listing")
    console.log(del)

}
