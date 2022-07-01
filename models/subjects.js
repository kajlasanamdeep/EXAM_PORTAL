const mongoose = require("mongoose");
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

const subjectStatus = [
    APP_CONSTANTS.SUBJECT_STATUS.ACTIVE,
    APP_CONSTANTS.SUBJECT_STATUS.DELETED
];

const Schema = mongoose.Schema;
const SubjectModel = new Schema({
    courseID: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: subjectStatus,
        default: subjectStatus[0]
    }
});

module.exports = mongoose.model('subjects', SubjectModel);