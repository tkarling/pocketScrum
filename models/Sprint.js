var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    goal: {
        type: String
    },
    startDate: {
        type: Number
    },
    endDate: {
        type: Number
    },
    release: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Release"
    }
});

module.exports = mongoose.model('Sprint', schema);