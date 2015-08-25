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
        type: String,
        lowercase: true,
        enum: [
            'not started',
            'in progress',
            'done',
            'impeded',
            'rejected'
        ],
        default: "not started"
    },
    reasonForImpeded: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember"
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