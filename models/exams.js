const mongoose = require("mongoose");
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

const durationStatus = [
    APP_CONSTANTS.DURATION_STATUS.ACTIVE,
    APP_CONSTANTS.DURATION_STATUS.NOT_STARTED,
    APP_CONSTANTS.DURATION_STATUS.OVER
    
];

const examStatus = [
    APP_CONSTANTS.EXAM_STATUS.CREATED,
    APP_CONSTANTS.EXAM_STATUS.BLOCKED,
    APP_CONSTANTS.EXAM_STATUS.ACTIVE,
    APP_CONSTANTS.EXAM_STATUS.DELETED

]

const Schema = mongoose.Schema;
const examModel = new Schema({
    subjectID: {
        type: Schema.Types.ObjectId,
        ref: 'subjects',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
         required:true
    },
    examDate: {
        type: Date,
         required:true
    },
    duration: {
        type: String,
        required:true
    },
    accessCode: {
        type: String,
        required:true
    },
    durationStatus: {
        type: String,
        enum: durationStatus,
        default:durationStatus[1],
        required:true
    },
    status: {
        type: String,
        enum: examStatus,
        default:examStatus[0],
        required:true
    },
    totalMarks: {
        type: Number,
        required:true
    },
    passingMarks: {
        type: Number,
        required:true
    },
    examinerID: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('exams', examModel);