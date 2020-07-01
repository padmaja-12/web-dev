var express = require("express");
var app = express();


app.set("view engine","ejs");

app.get("/",(req,res) => {
    res.render("landing");
});

app.get("/questions",)
app.listen(3000, function(){
    console.log("MovieApp sever is up....PORT: 3000");
});