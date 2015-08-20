var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require("multer");
//var upload = multer({ dest: 'uploads/' });

var app = express();
var port = 3039;

// MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

var upload = multer({ dest: 'upload/'});
var fs = require('fs');

/** Permissible loading a single file,
 the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('file');

app.post('/api/pocketScrum/uploads', type, function (req,res) {

    /** When using the "single"
     data come in "req.file" regardless of the attribute "name". **/
    var tmp_path = req.file.path;
    console.log("tmp_path", tmp_path);

    res.send("OK");

    ///** The original name of the uploaded file
    // stored in the variable "originalname". **/
    //var target_path = 'uploads/' + req.file.originalname;
    //
    ///** A better way to copy the uploaded file. **/
    //var src = fs.createReadStream(tmp_path);
    //var dest = fs.createWriteStream(target_path);
    //src.pipe(dest);
    //src.on('end', function() { res.render('complete'); });
    //src.on('error', function(err) { res.render('error'); });


});


//var fs = require('fs');
//var imgPath = './images/';
//var upload = multer().single('fileName')
//app.post("/api/pocketScrum/uploads",  function (req, res) {
//    console.log("req.file", req.file);
//    upload(req, res, function (err) {
//        if (err) {
//            // An error occurred when uploading
//            console.log("err", err);
//            return
//        }
//        console.log("fine");
//        // Everything went fine
//    });
//});



    //
    //, upload.single('fileName.jpg'), function(req, res, next) {
    //console.log("moi");
    //console.log("api/pocketScrum/uploads req.body", req.body);
    //console.log("api/pocketScrum/uploads req.file", req.file);



    //var fileTooLarge = false;
    //var handler = multer({
    //    dest: imgPath,
    //    limits: {
    //        fileSize: 500000
    //    },
    //    rename: function (fieldname, filename, req, res) {
    //        var username = req.user.username;
    //        return username + '001';
    //    },
    //    onFileSizeLimit: function (file) {
    //        fileTooLarge = true;
    //        res.json({
    //            uploadError: 'Upload failed. File must be less than 500 KB'
    //        });
    //    },
    //    onFileUploadStart: function (file) {
    //        console.log(file.originalname + ' is starting ...');
    //    },
    //    onFileUploadComplete: function (file, req, res) {
    //        console.log(file.fieldname + ' uploaded to  ' + file.path);
    //        var newFileName = req.files.file[0].name;
    //        if(!fileTooLarge) {
    //            coonsole.log("received file", newFileName);
    //            //articles.uploadUserImage(req, res, newFileName, function() {
    //            //    file.path = 'http://<myblobstorage>.blob.core.windows.net/userpictures/' + newFileName;
    //            //    //file param is actually an object with the path as a property
    //            //    res.send(file);
    //            //    //delete file from local uploads folder
    //            //    fs.unlink('packages/theme/public/assets/img/uploads/' + newFileName);
    //            //});
    //        } else {
    //            fs.unlink(imgPath + newFileName);
    //        }
    //    }
    //});
    //handler(req, res, next);
//}
//);


// API
var ThumbnailCtrl = require("./controllers/ThumbnailCtrl");
var PicCtrl = require("./controllers/PicCtrl");

app.post("/api/pocketScrum/thumbnail", ThumbnailCtrl.create);
app.get("/api/pocketScrum/thumbnail", ThumbnailCtrl.read);
app.put("/api/pocketScrum/thumbnail", ThumbnailCtrl.update);
app.delete("/api/pocketScrum/thumbnail", ThumbnailCtrl.delete);

app.post("/api/pocketScrum/designpic", PicCtrl.create);
app.get("/api/pocketScrum/designpic", PicCtrl.read);
app.put("/api/pocketScrum/designpic", PicCtrl.update);
app.delete("/api/pocketScrum/designpic", PicCtrl.delete);


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
