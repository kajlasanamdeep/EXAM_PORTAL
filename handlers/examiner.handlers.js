const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const messages = messageList.MESSAGES;

module.exports.createCourse = async function (payload) {
    try {
         
        let existingCourse = await Model.courses.findOne({
            examinerID:payload.examinerID,
            status:APP_CONSTANTS.COURSE_STATUS.ACTIVE,
            name:payload.name
        });

        if (existingCourse) return {
            status:statusCodes.UNPROCESSABLE_ENTITY,
            message: messages.COURSE_ALREADY_EXIST
        }

        let course = await Model.courses.create(payload);

        return {
            status:statusCodes.CREATED,
            message: messages.COURSE_REGISTERED_SUCCESSFULLY,
            data:{
                course:course
            }
        }

    } catch (error) {

        throw error;

    }
};

module.exports.getDashboard = async function (payload) {
    try {
        
        let examiner = payload.loggedUser;

        let courses = await Model.courses.find({
            examinerID:examiner._id,
            status:APP_CONSTANTS.COURSE_STATUS.ACTIVE
        });

        return {
            status:statusCodes.SUCCESS,
            message: messages.DASHBOARD_LOADED_SUCCESSFULLY,
            data:{
                examinerDetails:examiner,
                examinerCourses:courses
            }
        };

    } catch (error) {

        throw error;

    }
}