var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
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
        default: "55e2326af68548f0fc933afb"
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
        enum: [
            'requirement',
            'bug'
        ],
        default: "requirement"
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
        ref: "Feature",
        default: "55e287ee586d4b5e460d46e8"
    }
});

module.exports = mongoose.model('UserStory', schema);