var PicData = require('../models/PicData');

module.exports = {

    create: function(req, res) {
        var newThumbnail = new PicData(req.body);
        newThumbnail.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },
    read: function(req, res) {
        PicData.find(req.query)
            .exec(function(err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    update: function(req, res) {
        PicData.findByIdAndUpdate(req.query.id, req.body, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    delete: function(req, res) {
        PicData.findByIdAndRemove(req.query.id, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    }
};