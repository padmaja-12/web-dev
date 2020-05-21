var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name:           String,
    image:          String,
    description:    String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create(
//     {name: "Mountain Goat's Rest",
//     image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
//     description: "This is an awsome Mountain placed campground... Full of nice hiking spots... And a few mounatin sports like bungee jumping as well ;-)"
//     }, function(err, campground){
//      if(err){
//          console.log(err);
//      } else {
//          console.log("NEWLY CREATED CAMPGROUND");
//          console.log(campground);
//      }
// });

app.get("/", function(req, res){
    //res.send("This will be the landing page");
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

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

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(8080, function(){
    console.log("YelpCamp sever is up....PORT: 8080");
});
