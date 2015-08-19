var Thumbnail = require('../models/Thumbnail');

module.exports = {

    create: function(req, res) {
        var newThumbnail = new Thumbnail(req.body);
        newThumbnail.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },
    read: function(req, res) {
        Thumbnail.find(req.query)
            .exec(function(err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    update: function(req, res) {
        Thumbnail.findByIdAndUpdate(req.query.id, req.body, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    delete: function(req, res) {
        Thumbnail.findByIdAndRemove(req.query.id, function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    }
};