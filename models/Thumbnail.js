var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
    keywords: [{
        //tag: {
            type: String
        //}
    }],
    picId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pic",
        required: true
    }
});

module.exports = mongoose.model('Thumbnail', schema);