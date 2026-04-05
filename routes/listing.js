const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const listing = require("../models/listing.js")

const { isOwner, isLoggedIn, validateListing } = require("../middleware.js")






router.get("/", wrapAsync(async (req, res, next) => {

    let alllisting = await listing.find();
    res.render("listing/index.ejs", { alllisting });




}))
router.get("/:id/show", wrapAsync(async (req, res) => {
    let { id } = req.params
    let list = await listing.findById(id)
    .populate({path:"reviews",populate:"author"}).populate("owner");

    if (!list) {
        req.flash("error", " listing doesn't exist!")
        res.redirect("/listing")
    }
    else { res.render("listing/show.ejs", { list }); 

}


}))

router.get("/new", isLoggedIn, (req, res) => {

    res.render("listing/new.ejs")
})
//new listing
router.post("/new", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    let listing1 = new listing(req.body.listing);
    listing1.owner = req.user._id
    await listing1.save().then((result) => {
        req.flash("success", "New listing created!")
        res.redirect("/listing")

    })
}))



router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params

    let list = await listing.findById(id);
    if (!list) {
        req.flash("error", " listing doesn't exist!")
        res.redirect("/listing")
    }
    else { res.render("listing/edit.ejs", { list })}; 
    

}))

router.put("/:id/edit", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {

    let { id } = req.params;

    await listing.findByIdAndUpdate(id, { ...req.body.listing })
    
    req.flash("success", "listing  updated!")
    res.redirect(`/listing/${id}/show`)
  



}))
router.delete("/:id/delete", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;

    let del = await listing.findByIdAndDelete(id);
    req.flash("success", "listing Deleted!")

    res.redirect("/listing")
    console.log(del)

}))

module.exports = router
