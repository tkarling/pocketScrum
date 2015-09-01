"use strict";

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        "default": "55e2326af68548f0fc933afb"
    },
    priority: {
        type: Number
    },
    reasonForImpeded: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
        "default": "55e48b010fde1bd55c316cf6"
    },
    tag: {
        type: String,
        lowercase: true,
        "enum": ['requirement', 'bug'],
        "default": "requirement"
    },
    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sprint"
    },
    release: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Release"
    },
    feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feature"
    }
});

module.exports = mongoose.model('UserStory', schema);

//# sourceMappingURL=UserStory-compiled.js.map