"use strict";

var Story = require('../models/UserStory');

module.exports = {

    create: function create(req, res) {
        var newStory = new Story(req.body);
        newStory.save(function (err, result) {
            if (err) return res.status(500).send(err);else res.send(result);
        });
    },

    read: function read(req, res) {
        Story.find(req.query).populate("feature").populate("status").populate("assignedTo").exec(function (err, result) {
            if (err) return res.status(500).send(err);else res.send(result);
        });
    },

    update: function update(req, res) {
        var id = req.query.id;
        var updatedObject = req.body;
        Story.findByIdAndUpdate(id, updatedObject, {
            "new": true
        }, function (err, result) {
            if (err) return res.status(500).send(err);else {
                res.send(result);
            }
        });
    },

    "delete": function _delete(req, res) {
        var id = req.query.id;
        Story.findByIdAndRemove(id, function (err, result) {
            if (err) return res.status(500).send(derr);else res.send(result);
        });
    }
};

//# sourceMappingURL=UserStoryCtrl-compiled.js.map