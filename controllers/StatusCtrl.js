var Status = require('../models/Status');

module.exports = {

    create: function (req, res) {
        var newStatus = new Status(req.body);
        newStatus.save(function (err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    read: function (req, res) {
        Status.find(req.query)
            .exec(function (err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    update: function (req, res) {
        var id = req.query.id;
        var updatedObject = req.body;
        Status.findByIdAndUpdate(id, updatedObject, {
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
        Status.findByIdAndRemove(id, function (err, result) {
            if (err) return res.status(500).send(derr);
            else res.send(result);
        });
    }
};