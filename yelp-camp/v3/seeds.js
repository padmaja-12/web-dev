  
var mongoose    = require("mongoose"),
Campground  = require("./models/campground"),
Comment     = require("./models/comment");

var data = [
{
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3455/3753652218_266bca0b93.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
    name: "Desert Meso",
    image: "https://farm7.staticflickr.com/6004/6017807192_bf8b96b3ff.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
    name: "Canyon Floor",
    image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144393f3c27da3e4b3_340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
];

function seedDB(){
// Remove all campgrounds
Campground.remove({}, function(err){
    if (err) {
        console.log(err);
    }
    else {
        console.log("removed campground");
        data.forEach(function(seed){
            // add a few campgrounds
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }
                else {
                    console.log("campground added");
                    // add a few comments
                    Comment.create(
                        {
                            text: "This place is great, but i wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Added a new comment!");
                            }
                        });
                }
            });

        });
    }
});

};

module.exports = seedDB;
