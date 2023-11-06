const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({

    userID: {
        type: String,
        required: true
    },
    questionID: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Likes", LikeSchema);