const { string } = require("joi");
const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");

const courseStatus = [
  APP_CONSTANTS.COURSE_STATUS.ACTIVE,
  APP_CONSTANTS.COURSE_STATUS.DELETED,
  APP_CONSTANTS.COURSE_STATUS.BLOCKED,
];

const Schema = mongoose.Schema;
const CourseModel = new Schema({
  examinerID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name:{
    type: String,
    required:true
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  modifiedDate: {
    type: Date,
    default: new Date(),
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    default: courseStatus[0],
    enum: courseStatus,
  },
});

module.exports = mongoose.model("courses", CourseModel);
