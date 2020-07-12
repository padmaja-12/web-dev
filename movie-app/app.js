var express = require("express");
var app = express();
var request = require("request");
const fetch = require("node-fetch");

app.set("view engine","ejs");



app.get("/",(req,res) => {
    res.render("landing");
});

var post,movie;
var favourites = [];
app.get("/search", (req,res) => {
     var url2 = "https://api.themoviedb.org/3/discover/movie?api_key=1510cae89a9c50b52ba4e6a2f5db4dbe&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=true&page="
     fetch(url2+'60').then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {

	// Store the post data to a variable
    post=data;

	// Fetch another API
	return fetch(url2+"125");

}).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (userData) {
	res.render("search",{data:post, d:userData});
}).catch(function (error) {
	console.log(error);
});
})
app.get("/result",(req,res)=>{
    var query = req.query.search
    var url = "https://api.themoviedb.org/3/search/movie?api_key=1510cae89a9c50b52ba4e6a2f5db4dbe&query="+query
      request(url,(error,response,body)=>{
          if(!error && response.statusCode == 200){
              var data = JSON.parse(body)
              res.render("result",{data: data});
          }
      })
});
app.get("/main",(req,res)=>{
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
app.listen(3000, function(){
    console.log("MovieApp sever is up....PORT: 3000");
});