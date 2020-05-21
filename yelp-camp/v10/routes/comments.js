  
var express = require("express"),
router  = express.Router({mergeParams: true}),
middleware = require("../middleware");

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
                // add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // connect new comment to campground
                comment.save();
                campground.comments.push(comment);
                campground.save();
                // redirect to campground show page
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    }
});
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
        res.redirect("/campgrounds");
    } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
});
});

// UPDATE ROUTE
router.put("/:comment_id", function(req, res){
Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
        res.redirect("back");
    } else {
        res.redirect("/campgrounds/" + req.params.id);
    }
});
});

// DESTROY ROUTE
router.delete("/:comment_id", function(req, res){
Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
        res.redirect("/campgrounds/" + req.params.id);
    } else {
        res.redirect("/campgrounds/" + req.params.id);
    }
});
});

module.exports = router;