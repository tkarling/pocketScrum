var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
    pic: { type: String, required: true},
});

module.exports = mongoose.model('Pic', schema);