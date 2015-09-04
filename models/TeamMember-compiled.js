'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    authId: {
        type: String,
        required: true,
        unique: true
    },
    authProvider: {
        type: String,
        required: true
    },
    picId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pic"
    },
    role: {
        type: String,
        lowercase: true,
        'enum': ['scrum master', 'product owner', 'dev team member', 'other'],
        'default': "dev team member"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    noShow: {
        type: Boolean,
        'default': false
    }

});

module.exports = mongoose.model('TeamMember', schema);

//# sourceMappingURL=TeamMember-compiled.js.map