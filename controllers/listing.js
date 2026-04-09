const listing = require("../models/listing.js")
const axios = require("axios")
const geotoken=process.env.FORWARD_GEO

async function geocodeLocation(query) {
    const response = await axios.get("https://us1.locationiq.com/v1/search", {
        params: {
            key: geotoken,
            q: query,
            format: "json",
        },
    });

    if (!response.data || !response.data.length) {
        throw new Error("Location not found");
    }

    const best = response.data[0];
    return {
        lat: Number(best.lat),
        lng: Number(best.lon),
    };
}

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
        return res.redirect("/listing")
    }
    else { res.render("listing/show.ejs", { list }); }


}

module.exports.newRoute=(req, res) => {

    res.render("listing/new.ejs")
}

module.exports.newPostRoute=async (req, res) => {
    if (!req.file) {
        req.flash("error", "Image upload failed. Please upload an image.");
        return res.redirect("/listing/new");
    }

    let url = req.file.path || req.file.secure_url || req.file.url;
    let filename = req.file.filename || req.file.public_id;
    if (!url) {
        req.flash("error", "Image upload failed. Please try again.");
        return res.redirect("/listing/new");
    }

    let listing1 = new listing(req.body.listing);
    listing1.owner = req.user._id
    listing1.image={url,filename}

    try {
        const coords = await geocodeLocation(req.body.listing.location);
        listing1.geometry = {
            type: "Point",
            coordinates: [coords.lng, coords.lat],
        };
    } catch (err) {
        req.flash("error", "Could not geocode location, using default map location.");
    }

    await listing1.save()
    req.flash("success", "New listing created!")
    res.redirect("/listing")
}

module.exports.getEdit=async (req, res) => {
    let { id } = req.params

    let list = await listing.findById(id);
    if (!list) {
        req.flash("error", " listing doesn't exist!")
        return res.redirect("/listing")
    }

    let originalimg=(list.image && list.image.url) ? list.image.url : "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=900&q=60";
    originalimg=originalimg.replace("/upload","/upload/h_300,w_250")

     res.render("listing/edit.ejs", { list ,originalimg}); 
    

}

module.exports.postEdit=async (req, res) => {

    let { id } = req.params;

   let listing2= await listing.findByIdAndUpdate(id, { ...req.body.listing })
   if(!listing2){
    req.flash("error", " listing doesn't exist!")
    return res.redirect("/listing")
   }
   if(typeof req.file!="undefined"){
     let url = req.file.path || req.file.secure_url || req.file.url;
    let filename = req.file.filename || req.file.public_id;
     if (url) {
       listing2.image={url,filename}
       await listing2.save();
     }
   }
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
