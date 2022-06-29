const mongoose = require("mongoose");
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const subject_Status = [
   APP_CONSTANTS.SUBJECT_STATUS.ACTIVE,
   APP_CONSTANTS.SUBJECT_STATUS.DELETED
]
const Schema = mongoose.Schema;
const SubjectModel = new Schema({
    courseID: {
        type:Schema.Types.ObjectId,
		required: true
    },
    name: {
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: subject_Status
    }
 
});

module.exports = mongoose.model('subjects',SubjectModel);