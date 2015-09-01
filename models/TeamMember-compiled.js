'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    currentProject: {
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