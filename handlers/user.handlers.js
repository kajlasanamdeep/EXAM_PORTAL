const universalFunction = require('../lib/universal-function');
const users = require('../models/users');
const messageList = require("../messages/messages");
const statusCodeList = require("../statusCodes/status_codes");
const statusCodes = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const { default: mongoose } = require('mongoose');

module.exports.registerHandler = async function (payload) {
    try {

        let existingUser = await users.findOne({ email: payload.email });

        if (existingUser) return {
            status: statusCodes.UNPROCESSABLE_ENTITY,
            message: messages.EMAIL_ALREDAY_TAKEN
        };

        existingUser = await users.findOne({ mobileNumber: payload.mobileNumber });

        if (existingUser) return {
            status: statusCodes.UNPROCESSABLE_ENTITY,
            message: messages.MOBILE_NUMBER_ALREADY_TAKEN
        };

        payload.password = await universalFunction.hashPasswordUsingBcrypt(payload.password);
        payload.status = APP_CONSTANTS.ACCOUNT_STATUS.PENDING;
        let user = await users.create(payload);
        let accessToken = await universalFunction.jwtSign(user);

        return {
            status: statusCodes.CREATED,
            message: messages.USER_REGISTER_SUCCESSFULLY,
            data: {
                accessToken: accessToken,
                user: user
            }
        };

    } catch (error) {

        throw error;

    }
}



module.exports.loginHandler = async function (payload) {
    try {

        let user = await users.findOne({
            email: payload.email
        });

        if (!user) return {
            status: statusCodes.NOT_FOUND,
            message: messages.USER_NOT_FOUND
        };

        let checkPassword = await universalFunction.comparePasswordUsingBcrypt(payload.password, user.password);

        if (!checkPassword) {
            return {
                status: statusCodes.BAD_REQUEST,
                message: messages.INVALID_PASSWORD
            }
        };

        let accessToken = await universalFunction.jwtSign(user);

        return {
            status: statusCodes.SUCCESS,
            message: messages.USER_LOGIN_SUCCESSFULLY,
            data: {
                accessToken: accessToken,
                user: user
            }
        }
    }
    catch (error) {
        throw error;
    }
}