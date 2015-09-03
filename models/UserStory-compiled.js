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
        ref: "Status"
    },
    priority: {
        type: Number
    },
    reasonForImpeded: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember"
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
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
});

module.exports = mongoose.model('UserStory', schema);

//# sourceMappingURL=UserStory-compiled.js.map