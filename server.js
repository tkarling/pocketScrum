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
var ThumbnailCtrl = require("./controllers/ThumbnailCtrl");
var PicCtrl = require("./controllers/PicCtrl");


var type = upload.single('file');
app.post('/api/pocketScrum/designpic', type, PicCtrl.upload);
//app.post("/api/pocketScrum/designpic", PicCtrl.create);
app.get("/api/pocketScrum/fullpic", PicCtrl.read);
app.get("/api/pocketScrum/thumbnail", PicCtrl.readThumbnail);
//app.put("/api/pocketScrum/designpic", PicCtrl.update);
app.delete("/api/pocketScrum/designpic", PicCtrl.delete);

app.post("/api/pocketScrum/picdata", ThumbnailCtrl.create);
app.get("/api/pocketScrum/picdata", ThumbnailCtrl.read);
app.put("/api/pocketScrum/picdata", ThumbnailCtrl.update);
app.delete("/api/pocketScrum/picdata", ThumbnailCtrl.delete);


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
