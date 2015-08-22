var fs = require('fs');
var lwip = require('lwip');
var Pic = require('../models/Pic');
var PicData = require('../models/PicData');

var getImageType = function (mimetype) {
    return mimetype.substring(6, mimetype.length);
}

var createPicImage = function (image, name, contentType) {
    return {data: image, name: name, contentType: contentType}
};

module.exports = {

    upload: function (req, res) {
        var tmp_path = req.file.path;
        var mimetype = req.file.mimetype;
        var imgType = getImageType(mimetype);
        var imgName = req.file.originalname;
        var thumbnailName = "tn_" + imgName;
        //console.log("tmp_path", tmp_path, imgName, thumbnailName, mimetype, req.file);

        var newPic = new Pic;
        fs.readFile(tmp_path, function (err, data) {
            if (err) return res.status(500).send(err);
            newPic.img = createPicImage(data, imgName, mimetype);
            lwip.open(tmp_path, imgType, function (err, image) {
                if (err) console.log("lwip.open error", err);
                image.resize(100, 100, function (err, scaledImage) {
                    if (err) console.log("image.scale error", err);
                    scaledImage.toBuffer(imgType, function(err, buffer){
                        if (err) console.log("toBuffer error", err);
                        newPic.thumbnail = createPicImage(buffer, thumbnailName, mimetype);
                        newPic.save(function (perr, picsResult) {
                            fs.unlink(tmp_path, function (uerr) {
                                if (uerr) console.log("error deleting tmp file", uerr);
                            });
                            if (perr) return res.status(500).send(perr);

                            var newPicData = new PicData;
                            newPicData.picId = picsResult._id;
                            newPicData.save(function(derr, dataResult) {
                                if (derr) return res.status(500).send(derr);
                                else res.send(picsResult._id);
                            });
                        });
                    });
                });
            });
        });
    },

    create: function (req, res) {
        var imgPath = './images/';
        var newPic = new Pic;
        newPic.img.data = fs.readFileSync(imgPath + req.query.file + ".jpg");
        newPic.img.contentType = 'image/jpg';
        newPic.save(function (err, result) {
            //console.log("result", result);
            if (err) return res.status(500).send(err);
            else res.send(result._id);
        });
    },

    read: function (req, res, next) {
        Pic.findById(req.query.id, function (err, doc) {
            if (err) return next(err);
            res.contentType(doc.img.contentType);
            res.send(doc.img.data);
        });
    },

    readThumbnail: function (req, res, next) {
        Pic.findById(req.query.id, function (err, doc) {
            //console.log("readThumbnail", doc);
            if (err) return next(err);
            res.contentType(doc.thumbnail.contentType);
            res.send(doc.thumbnail.data);
        });
    },

    update: function (req, res) {
        Pic.findByIdAndUpdate(req.query.id, req.body, function (err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    delete: function (req, res) {
        Pic.findByIdAndRemove(req.query.id, function (err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    }
};