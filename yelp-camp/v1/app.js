var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f1c77ba1ecbc_340.jpg"},
    {name: "Granite Hill", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f1c77ba1ecbc_340.jpg"},
    {name: "Granite Hill", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144393f1c77ba1ecbc_340.jpg"},
    {name: "Granite Hill", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"}
];

app.get("/", function(req, res){
    //res.send("This will be the landing page");
    res.render("landing");
});

app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.post("/campgrounds", function(req, res){
    var newCampground = {
        name: req.body.name,
        image: req.body.image
    };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.listen(8080, function(){
    console.log("YelpCamp sever is up....PORT: 8080");
});