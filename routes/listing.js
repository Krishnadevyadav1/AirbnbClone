const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isOwner, isLoggedIn, validateListing } = require("../middleware.js")
const listingController=require("../controllers/listing.js")





router.get("/", wrapAsync(listingController.index))
router.get("/:id/show", wrapAsync(listingController.showRoute))


router.route("/new")
.get( isLoggedIn, listingController.newRoute)
.post(isLoggedIn, validateListing, wrapAsync(listingController.newPostRoute))

router.route("/:id/edit")
.get( isLoggedIn, isOwner, wrapAsync(listingController.getEdit))
.put( isLoggedIn, isOwner, validateListing, wrapAsync(listingController.postEdit))



router.delete("/:id/delete", isLoggedIn, isOwner, wrapAsync(listingController.deleteRoute))




module.exports = router
