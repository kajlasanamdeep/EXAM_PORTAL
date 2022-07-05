const mongoose = require("mongoose");
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

const questionStatus = [
	APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
	APP_CONSTANTS.QUESTION_STATUS.DELETED,
	APP_CONSTANTS.QUESTION_STATUS.INACTIVE,
];

const Schema = mongoose.Schema;
const questionModel = new Schema({
    examID: {
        type: Schema.Types.ObjectId,
        ref: 'exams',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
         required:true
    },
    options: [{
        key: String, 
        value: String
    }],
    correctOption: {
        type: String,
         required:true
    },
    createdDate: { 
        type: Number, 
        default: Date.now 
    },
	modifiedDate: { 
        type: Number, 
        default: Date.now 
    },
	status: { 
        type: String, 
        required: true, 
        enum: questionStatus
    }
});

module.exports = mongoose.model('questions', questionModel);