const universalFunction = require('../lib/universal-function');
const Model = require('../models');
const messageList = require("../messages/messages");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const { default: mongoose } = require('mongoose');

module.exports.register = async function (payload) {
    try {

        let existingUser = await Model.users.findOne({ email: payload.email });

        if (existingUser) return {
            status: statusCodes.UNPROCESSABLE_ENTITY,
            message: messages.EMAIL_ALREDAY_TAKEN
        };

        existingUser = await Model.users.findOne({ mobileNumber: payload.mobileNumber });

        if (existingUser) return {
            status: statusCodes.UNPROCESSABLE_ENTITY,
            message: messages.MOBILE_NUMBER_ALREADY_TAKEN
        };

        payload.password = await universalFunction.hashPasswordUsingBcrypt(payload.password);
        payload.status = APP_CONSTANTS.ACCOUNT_STATUS.PENDING;
        let user = await Model.users.create(payload);
        let accessToken = await universalFunction.jwtSign(user);

        return {
            status: statusCodes.CREATED,
            message: messages.USER_REGISTER_SUCCESSFULLY,
            data: {
                accessToken: accessToken,
                userType: user.userType
            }
        };

    } catch (error) {

        throw error;

    }
}



module.exports.login = async function (payload) {
    try {

        let user = await Model.users.findOne({
            email: payload.email
        });

        if (!user) return {
            status: statusCodes.NOT_FOUND,
            message: messages.USER_NOT_FOUND
        };

        let passwordIsCorrect = await universalFunction.comparePasswordUsingBcrypt(payload.password, user.password);

        if (!passwordIsCorrect) {
            return {
                status: statusCodes.BAD_REQUEST,
                message: messages.INVALID_PASSWORD
            }
        };

        if(user.status != APP_CONSTANTS.ACCOUNT_STATUS.APPROVED) return{
            status:statusCodes.FORBIDDEN,
            message:messages.USER_NOT_ALLOWDED_TO_LOGIN
        }
        if (user.status != APP_CONSTANTS.ACCOUNT_STATUS.APPROVED) return {
            status: statusCodes.FORBIDDEN,
            message: messages.USER_NOT_ALLOWDED_TO_LOGIN
        };


        let accessToken = await universalFunction.jwtSign(user);

        return {
            status: statusCodes.SUCCESS,
            message: messages.USER_LOGIN_SUCCESSFULLY,
            data: {
                accessToken: accessToken,
                userType: user.userType
            }
        }
    }
    catch (error) {

        throw error;

    }
}