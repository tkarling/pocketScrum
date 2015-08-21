var fs = require('fs');
var Pic = require('../models/Pic');

module.exports = {

    upload: function (req, res) {
        var tmp_path = req.file.path;
        var mimetype = req.file.mimetype;
        var imgName = req.file.originalname;
        console.log("tmp_path", tmp_path, mimetype, req.file);

        var newPic = new Pic;
        fs.readFile(tmp_path, function (err, data) {
            if (err) return res.status(500).send(err);
            newPic.img.data = data;
            newPic.img.name = imgName;
            newPic.img.contentType = mimetype;
            newPic.save(function (err, result) {
                fs.unlink(tmp_path, function (uerr) {
                    if (uerr) console.log("error deleting tmp file", uerr);
                });
                if (err) return res.status(500).send(err);
                else res.send(result._id);
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

    read: function (req, res) {
        Pic.findById(req.query.id, function (err, doc) {
            if (err) return next(err);
            res.contentType(doc.img.contentType);
            res.send(doc.img.data);
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