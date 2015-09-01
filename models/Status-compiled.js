'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Status', schema);

//# sourceMappingURL=Status-compiled.js.map