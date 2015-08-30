var Feature = require('../models/Feature');

module.exports = {

    create: function (req, res) {
        var newFeature = new Feature(req.body);
        newFeature.save(function (err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    read: function (req, res) {
        Feature.find(req.query)
            .populate("status")
            .exec(function (err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    update: function (req, res) {
        var id = req.query.id;
        var updatedObject = req.body;
        Feature.findByIdAndUpdate(id, updatedObject, {
            new: true
        }, function (err, result) {
            if (err) return res.status(500).send(err);
            else {
                res.send(result);
            }
        });
    },

    delete: function (req, res) {
        var id = req.query.id;
        Feature.findByIdAndRemove(id, function (err, result) {
            if (err) return res.status(500).send(derr);
            else res.send(result);
        });
    }
};
