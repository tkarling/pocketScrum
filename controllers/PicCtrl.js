var fs = require('fs');
var Pic = require('../models/Pic');
var imgPath = './images/';

module.exports = {

    create: function(req, res) {
        var newPic = new Pic;
        newPic.img.data = fs.readFileSync(imgPath + req.query.file + ".jpg");
        newPic.img.contentType = 'image/jpg';
        newPic.save(function(err, result) {
            //console.log("result", result);
            if (err) return res.status(500).send(err);
            else res.send(result._id);
        });
    },

    read: function(req, res) {
        Pic.findById(req.query.id, function (err, doc) {
            if (err) return next(err);
            res.contentType(doc.img.contentType);
            res.send(doc.img.data);
        });
    },

    update: function(req, res) {
        Pic.findByIdAndUpdate(req.query.id, req.body, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    delete: function(req, res) {
        Pic.findByIdAndRemove(req.query.id, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    }
};