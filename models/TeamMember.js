var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
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
    }
    //, currentProject: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: "Project"
    //}

});

module.exports = mongoose.model('TeamMember', schema);