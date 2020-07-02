var express = require("express");
var app = express();


app.set("view engine","ejs");

var genre = [
    {name : "Action" , img : "https://www.inviul.com/wp-content/uploads/2018/03/Actions-class-in-Selenium.jpg"},
    {name : "Comedy" , img : "https://colchester-events.co.uk/wp-content/uploads/2018/09/comedystore_coloursplash_logo-1080x675.jpg"},
    {name : "Drama" , img : "https://i0.wp.com/4.bp.blogspot.com/--EIQS3inAWs/V-MEcG_Op5I/AAAAAAAAdyk/Y6OrRRUqHYAEganAA6OCrQ7s_Qc1J_1jACLcB/s1600/drama.jpg"},
    {name : "Fantasy" , img : "https://images.hdqwalls.com/wallpapers/colorful-fantasy-4k-z8.jpg"},
    {name : "Horror" , img : "https://cdn.vox-cdn.com/thumbor/5vwNia3paNvsm1r68IBd03ooCLs=/0x0:3000x2000/1200x675/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/61985015/horrorclassics_2.0.jpg"},
    {name : "Mystery" , img : "https://melissabourbon.com/wp-content/uploads/2010/10/its-a-mystery-500x325.jpg"},
    {name : "Romance" , img : "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/06/02/689090-relationship-02-thinkstock.jpg"},
    {name : "Thriller" , img : "https://genylifestyles.com/wp-content/uploads/2019/09/GENY-banner-Thriller.jpg"},
    {name : "Western" , img : "https://www.westernclassicmovies.com/wp-content/uploads/2017/08/tcm_john_wayne-1.jpg"}
];


app.get("/",(req,res) => {
    res.render("landing");
});

app.get("/generes",(req,res) => {
     res.render("generes",{genre:genre});
});


app.listen(3000, function(){
    console.log("MovieApp sever is up....PORT: 3000");
});