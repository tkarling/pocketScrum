var Story = require('../models/UserStory');

module.exports = {

    create: function (req, res) {
        var newStory = new Story(req.body);
        newStory.save(function (err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },

    read: function (req, res) {
        Story.find(req.query)
            .populate("feature")
            .populate("status")
            .populate("assignedTo")
            .exec(function (err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    },

    update: function (req, res) {
        var id = req.query.id;
        var updatedObject = req.body;
        Story.findByIdAndUpdate(id, updatedObject, {
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
        Story.findByIdAndRemove(id, function (err, result) {
            if (err) return res.status(500).send(derr);
            else res.send(result);
        });
    }
};