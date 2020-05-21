var express = require("express"),
    router  = express.Router(),
    middleware = require("../middleware");

var Campground = require("../models/campground");

// INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
            // how come req.user is passed to a get route????
        }
    });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    var author = {
        id:       req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: author
    };
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW ROUTE
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("back");
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect to show page
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;