var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        default: "55e2326af68548f0fc933afb"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
});

module.exports = mongoose.model('Feature', schema);