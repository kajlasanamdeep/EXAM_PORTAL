const { string } = require("joi");
const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");

const courseStatus = [
  APP_CONSTANTS.COURSE_STATUS.ACTIVE,
  APP_CONSTANTS.COURSE_STATUS.DELETED
];

const Schema = mongoose.Schema;
const CourseModel = new Schema({
  examinerID: {
    type: Schema.Types.ObjectId,
    ref:'users',
    required: true
  },
  name:{
    type: String,
    required:true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: courseStatus,
    default: courseStatus[0]
  },
  createdDate: {
    type: Date,
    default: new Date()
  },
  modifiedDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("courses", CourseModel);
