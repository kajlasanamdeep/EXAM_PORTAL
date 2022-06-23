const universalFunction = require('../lib/universal-function');
const users = require('../models/users');
const messageList = require("../messages/messages");
const validator = require('../validations/user.validations');
const statusCodeList = require("../statusCodes/status_codes");
const statusCodes = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;
const { default: mongoose } = require('mongoose');

module.exports.registerHandler = async function (req, res) {
    try {
        const { error, value } = validator.validateRegister(req);
        if (error) return universalFunction.validationError(res, error.message);
        const existingUser = await users.findOne({
            email: value.email
        })
        if (existingUser) return universalFunction.sendResponse(res, statusCodes.UNPROCESSABLE_ENTITY, messages.EMAIL_ALREDAY_EXIT);
    } catch (error) {

    }
}