const mongoose = require("mongoose");
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

const gender = [
    APP_CONSTANTS.STUDENT_GENDER.FEMALE,
    APP_CONSTANTS.STUDENT_GENDER.MALE,
    APP_CONSTANTS.STUDENT_GENDER.OTHER]

const Schema = mongoose.Schema;
const StudentModel = new Schema({
    userID:{
        type: Schema.Types.ObjectId,
		required: true,
        ref:'users'
    },
    fatherName: { 
        type: String, 
        required: true 
    },
	motherName: { 
        type: String, 
        required: true 
    },
    dob: { 
        type: String, 
        required: true 
    },
	address: { 
        type: String, 
        required: true 
    },
	city: { 
        type: String, 
        required: true 
    },
	state: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true, 
        enum: gender 
    },
    courseID: {
        type:Schema.Types.ObjectId,
		required: true
    }
   
});

module.exports = mongoose.model('students',StudentModel);