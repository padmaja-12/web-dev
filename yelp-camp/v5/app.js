var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment");
    // Comments

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

app.get("/", function(req, res){
    //res.send("This will be the landing page");
    res.render("landing");
});

// INDEX ROUTE
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE ROUTE
app.post("/campgrounds", function(req, res){
    var newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ==========================================
// COMMENT ROUTES
// ==========================================

// NEW ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res){
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
app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(8080, function(){
    console.log("YelpCamp sever is up....PORT: 8080");
});