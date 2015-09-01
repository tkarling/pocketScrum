'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    releaseDate: {
        type: Number
    }
});

module.exports = mongoose.model('Project', schema);

//# sourceMappingURL=Project-compiled.js.map