const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");

const status = [
    APP_CONSTANTS.STUDENT_ANSWER_STATUS.ATTEMPTED,
    APP_CONSTANTS.STUDENT_ANSWER_STATUS.NOTATTEMPTED
]

const Schema = mongoose.Schema;
const answerModel = new Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    questionID: {
        type: Schema.Types.ObjectId,
        ref: 'questions',
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
         required:true
    },
    status: {
        type: String,
        enum: status,
        required:true
    },

});

module.exports = mongoose.model('answers', answerModel);