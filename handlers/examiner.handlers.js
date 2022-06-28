const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const messages = messageList.MESSAGES;

module.exports.registerCourse = async function (payload) {
    try {
         
        let existingCourse = await Model.courses.findOne(payload);
        
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
}