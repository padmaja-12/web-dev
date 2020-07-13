var express = require("express"),
    app = express(),
    request = require("request"),
    fetch = require("node-fetch"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    bodyParser = require("body-parser"),
    User = require("./model/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
mongoose.connect("mongodb://localhost/movie_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret:"I love my mummy",
    resave : false,
    saveUninitialized : false
}));

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.get("/",(req,res) => {
    res.render("landing");
});


var post,movie;
app.get("/search",isLoggedIn, (req,res) => {
     var url2 = "https://api.themoviedb.org/3/movie/upcoming?api_key=1510cae89a9c50b52ba4e6a2f5db4dbe&language=en-US&page=1";
     var ur = "https://api.themoviedb.org/3/movie/top_rated?api_key=1510cae89a9c50b52ba4e6a2f5db4dbe&language=en-US&page=1";
     fetch(url2).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {

	// Store the post data to a variable
    post=data;

	// Fetch another API
	return fetch(ur);

}).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (userData) {
    res.render("search",{data:post, d:userData,currentUser:req.user});
    //console.log(req.user);
}).catch(function (error) {
	console.log(error);
});
})
app.get("/search/result",isLoggedIn,(req,res)=>{
    var query = req.query.search
    var url = "https://api.themoviedb.org/3/search/movie?api_key=1510cae89a9c50b52ba4e6a2f5db4dbe&query="+query
      request(url,(error,response,body)=>{
          if(!error && response.statusCode == 200){
              var data = JSON.parse(body)
              res.render("result",{data: data});
          }
      })
});
app.get("/search/main",isLoggedIn,(req,res)=>{
    var id = req.query.id
    var url1 = "https://api.themoviedb.org/3/movie/"+ id + "?api_key=1510cae89a9c50b52ba4e6a2f5db4dbe&append_to_response=videos,images,reviews"
    var u = "https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=1510cae89a9c50b52ba4e6a2f5db4dbe"
    fetch(url1).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
    
        // Store the post data to a variable
        movie=data;
        
        // Fetch another API
        return fetch(u);
    
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (userData) {
        res.render("main",{data:movie, d:userData});
    }).catch(function (error) {
        console.log(error);
    });
});

app.get("/register",(req,res) => {
     res.render("register");
});

app.post("/register",(req,res)=> {
    var newUser = new User({username : req.body.username});
    User.register(newUser,req.body.password, (err,user) => {
        if(err){
            req.flash("error",err.message)
            return res.render("register");
        }
        passport.authenticate("local")(req,res, () => {
            req.flash("success","Welcome to this page  "+ user.username)
            res.redirect("/search");
        });
    });
});
app.get("/login",(req,res) => {
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect : "/search",   
    failureRedirect : "/login"
}),(req,res) => {
});

app.get("/logout",(req,res) => {
    req.logout();
    req.flash("success","You have been logged out!!")
    res.redirect("/");
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You Need To Login To Move Ahead!");
    res.redirect("/login");
}
app.listen(3000, function(){
    console.log("MovieApp sever is up....PORT: 3000");
});