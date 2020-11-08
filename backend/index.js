const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require('method-override');
const User = require("./model/user");
app.use(methodOverride('_method'));
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.connect('mongodb://127.0.0.1:27017/Events', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
var Events = require('./model/events');
app.get('/', (req,res) => {
    Events.find({} ,(err, events) => {
        if (err) {
            console.log(err);
        } else {
            res.json(events);
        }
    });
});
app.get('/:id', (req,res) => {
    let id = req.params.id;
    Events.findById(id, function(err, event) {
        if(err){
            console.log(err);
        }
        else{
            res.json(event);
        }
    });
});
app.post('/add', (req,res) => {
    let event = new Events(req.body);
    event.save()
        .then(event => {
            res.status(200).json({'event': 'event added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new event failed');
        });
});
app.put('/update/:id',(req,res) => {
    Events.findByIdAndUpdate(req.params.id, req.body ,{upsert : true}, function(err, events) {
        if (err)
            res.status(404).send("data is not found");
        else{
            res.send({events});
        }
    });
});
app.post("/signup", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            return res.send({
                status : "404",
                message : err
            });
        }
        passport.authenticate("local")(req, res, function(){
             return res.send({
                status : "200",
                data : user
             });
        });
    });
});

app.post("/login", passport.authenticate("local", 
), function(req, res){
    //console.log(req.body.username)
    User.findOne({username : req.body.username} ,function(err, item) {
        if(err){
            return res.send({
                status : "404",
                message : err
            });
        }
        res.send({
            status : "200",
            data : item
        });
    }) 
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});