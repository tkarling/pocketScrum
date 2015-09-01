'use strict';

var TeamMember = require('../models/TeamMember');

module.exports = {

    create: function create(req, res) {
        var newTeamMember = new TeamMember(req.body);
        newTeamMember.save(function (err, result) {
            if (err) return res.status(500).send(err);else res.send(result);
        });
    },

    read: function read(req, res) {
        TeamMember.find(req.query).exec(function (err, result) {
            if (err) return res.status(500).send(err);else res.send(result);
        });
    },

    update: function update(req, res) {
        var id = req.query.id;
        var updatedObject = req.body;
        TeamMember.findByIdAndUpdate(id, updatedObject, {
            'new': true
        }, function (err, result) {
            if (err) return res.status(500).send(err);else {
                res.send(result);
            }
        });
    },

    'delete': function _delete(req, res) {
        var id = req.query.id;
        TeamMember.findByIdAndRemove(id, function (err, result) {
            if (err) return res.status(500).send(derr);else res.send(result);
        });
    }
};

//# sourceMappingURL=TeamMemberCtrl-compiled.js.map