// https://mongoosejs.com/docs/schematypes.html
const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({

    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    image: {
        type: String
    },
    tags: {
        type: Array
    }

});

module.exports = mongoose.model("Question", QuestionSchema);