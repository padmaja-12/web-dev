var express = require("express"),
    app     = express();


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/",(req,res) => {
    res.render("landing");
    //console.log("Hi");
});

app.get("/home", (req,res) => {
    res.render("home");
});



app.listen(8000,() => {
    console.log("Vocabulary-app is up and running on PORT : 8000");
})