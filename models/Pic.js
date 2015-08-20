var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Pic', schema);