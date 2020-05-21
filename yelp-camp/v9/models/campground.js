var mongoose = require("mongoose");

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name:           String,
    image:          String,
    description:    String,
    author:         {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:  "User"
        },
        username:   String
    },
    comments:       [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports =  mongoose.model("Campground", campgroundSchema);