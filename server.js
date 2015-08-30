var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require("multer");
var upload = multer({ dest: 'upload/'});

// passport specific
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys.js');

var FACEBOOK_APP_ID = keys.FACEBOOK_APP_ID;
var FACEBOOK_APP_SECRET = keys.FACEBOOK_APP_SECRET;
//

var app = express();
var port = 3039;

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});
// MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

// passport specific
app.use(session({
    secret: 'some-random-string'
}));
app.use(passport.initialize());
app.use(passport.session());
//
app.use(bodyParser.json());
app.use(cors());

// passport specific
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:' + port + '/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
    console.log("profile: ", profile);
    return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/Facebook'
}), function(req, res) {
    console.log("req.session", req.session);
});
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
//

app.get('/api/pocketScrum/logout', function(req, res){
    req.logout();
    res.redirect("http://localhost:3039/#/login");
});
app.get('/api/pocketScrum/me', function(req, res) {
    console.log("me", req.user);
    res.send(req.user);
});


// API
var PicCtrl = require("./controllers/PicCtrl");
var StoryCtrl = require("./controllers/UserStoryCtrl");
var FeatureCtrl = require("./controllers/FeatureCtrl");
var StatusCtrl = require("./controllers/StatusCtrl");
var TeamMemberCtrl = require("./controllers/TeamMemberCtrl");

var type = upload.single('file');
app.post('/api/pocketScrum/designpic', type, PicCtrl.upload);   // add one pic, thumb & data

app.get("/api/pocketScrum/designpic", PicCtrl.read);            // get list of pic data
app.get("/api/pocketScrum/fullpic", PicCtrl.readFullPic);       // get one full pic image
app.get("/api/pocketScrum/thumbnail", PicCtrl.readThumbnail);   // get one thumbnail image

app.put("/api/pocketScrum/designpic", PicCtrl.update);          // update pic data for one pic
app.delete("/api/pocketScrum/designpic", PicCtrl.delete);       // delete one pic, thumb & data


app.post('/api/pocketScrum/stories', StoryCtrl.create);
app.get("/api/pocketScrum/stories", StoryCtrl.read);
app.put("/api/pocketScrum/stories", StoryCtrl.update);
app.delete("/api/pocketScrum/stories", StoryCtrl.delete);

app.post('/api/pocketScrum/features', FeatureCtrl.create);
app.get("/api/pocketScrum/features", FeatureCtrl.read);
app.put("/api/pocketScrum/features", FeatureCtrl.update);
app.delete("/api/pocketScrum/features", FeatureCtrl.delete);

app.post('/api/pocketScrum/status', StatusCtrl.create);
app.get("/api/pocketScrum/status", StatusCtrl.read);
app.put("/api/pocketScrum/status", StatusCtrl.update);
app.delete("/api/pocketScrum/status", StatusCtrl.delete);

app.post('/api/pocketScrum/members', TeamMemberCtrl.create);
app.get("/api/pocketScrum/members", TeamMemberCtrl.read);
app.put("/api/pocketScrum/members", TeamMemberCtrl.update);
app.delete("/api/pocketScrum/members", TeamMemberCtrl.delete);


var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost:27017/pocketScrum';
mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
    console.log('connected to mongoDB at: ', mongoUri);
});

var server = app.listen(port, function() {
    console.log("Listening at address", server.address());
});
