const universalFunction = require('../lib/universal-function');
const users = require('../models/users');
const messageList = require("../messages/messages");
const validator = require('../validations/user.validations');
const statusCodeList = require("../statusCodes/status_codes");
const statusCodes = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;
const { default: mongoose } = require('mongoose');
const { comparePasswordUsingBcrypt } = require('../lib/universal-function');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

module.exports.registerHandler = async function (req, res) {
    try {
        req.body.userType = APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER;

        const { error, value } = validator.validateRegister(req);
        if (error) throw error;

        let existingUser = await users.findOne({ email: value.email });

        if (existingUser) return {
            status: statusCodes.UNPROCESSABLE_ENTITY,
            message: messages.EMAIL_ALREDAY_TAKEN
        };

        existingUser = await users.findOne({ mobileNumber: value.mobileNumber });

        if (existingUser) return {
            status: statusCodes.UNPROCESSABLE_ENTITY,
            message: messages.MOBILE_NUMBER_ALREADY_TAKEN
        };

        value.password = await universalFunction.hashPasswordUsingBcrypt(value.password);
        value.status = APP_CONSTANTS.ACCOUNT_STATUS.PENDING;
        let user = await users.create(value);
        let accessToken = await universalFunction.jwtSign(user);

        return {
            status: statusCodes.SUCCESS,
            message: messages.USER_REGISTER_SUCCESSFULLY,
            accessToken: accessToken,
            user: user
        };

    } catch (error) {

        throw error;

    }
}

module.exports.loginHandler = async function (email, password) {
    try {

        let user = await users.findOne({
            email: email
        });

        if (!user) return {
            status: statusCodes.BAD_REQUEST,
            message: messages.USER_NOT_FOUND
        };

        let checkPassword = await comparePasswordUsingBcrypt(password);

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
            accessToken: accessToken,
            user: user
        }
    }
    catch (error) {
        throw error;
    }
}