var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
        required: true,
    },
    releaseDate: {
        type: Number
    }
});

module.exports = mongoose.model('Project', schema);
