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
    options:{
        type:[String],
        required:true
    },
    correctOption: {
        type: String,
        required:true
    },
    createdDate: { 
        type: String, 
        default: new Date() 
    },
	modifiedDate: { 
        type: String, 
        default: new Date()
    },
	status: { 
        type: String,
        enum: questionStatus,
        default:questionStatus[0]
    }
});

module.exports = mongoose.model('questions', questionModel);