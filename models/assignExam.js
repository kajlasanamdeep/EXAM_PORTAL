const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentExamModel = new Schema({
    subjectID: {
        type: Schema.Types.ObjectId,
        ref: 'subjects',
        required: true
    },
    examID:{
        type: Schema.Types.ObjectId,
        ref: 'exams',
        required: true
    },
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    examinerID: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
});

module.exports = mongoose.model('studentexams', studentExamModel);