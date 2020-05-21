var express = require("express"),
    router  = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
    // fimd campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new", {campground: campground});
        }



    });
});

// CREATE ROUTE
router.post("/", isLoggedIn, function(req, res){
    // lookup campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;