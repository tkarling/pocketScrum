var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require("multer");
var upload = multer({ dest: 'upload/'});

var app = express();
var port = 3039;

// MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());


// API
var PicCtrl = require("./controllers/PicCtrl");
var StoryCtrl = require("./controllers/UserStoryCtrl");


var type = upload.single('file');
app.post('/api/pocketScrum/designpic', type, PicCtrl.upload);   // add one pic, thumb & data

app.get("/api/pocketScrum/designpic", PicCtrl.read);      // get list of pic data
app.get("/api/pocketScrum/fullpic", PicCtrl.readFullPic);              // get one full pic image
app.get("/api/pocketScrum/thumbnail", PicCtrl.readThumbnail);   // get one thumbnail image

app.put("/api/pocketScrum/designpic", PicCtrl.update);          // update pic data for one pic
app.delete("/api/pocketScrum/designpic", PicCtrl.delete);       // delete one pic, thumb & data


app.post('/api/pocketScrum/stories', StoryCtrl.create);
app.get("/api/pocketScrum/stories", StoryCtrl.read);
app.put("/api/pocketScrum/stories", StoryCtrl.update);
app.delete("/api/pocketScrum/stories", StoryCtrl.delete);


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
