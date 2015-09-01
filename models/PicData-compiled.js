"use strict";

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    note: {
        type: String
    },
    keywords: [{
        type: String
    }],
    picId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pic",
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
});

module.exports = mongoose.model('PicData', schema);

//# sourceMappingURL=PicData-compiled.js.map