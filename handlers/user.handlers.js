const universalFunction = require('../lib/universal-function');
const users= require('../models/users');
const messageList = require("../messages/messages");
const validator = require('../validations/user.validations');
const statusCodeList = require("../statusCodes/status_codes");
const statusCodes = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;
const { default: mongoose } = require('mongoose');
const { comparePasswordUsingBcrypt } = require('../lib/universal-function');

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

module.exports.loginHandler = async function(email,password) {
    let user = await users.findOne({
        email:email
    })
    if(!user)  return {
        status: statusCodes.BAD_REQUEST,
        message:messages.USER_NOT_FOUND
    } 

    let password = await comparePasswordUsingBcrypt(password)
    try{
    if(!password){
        return {
            status:statusCodes.BAD_REQUEST,
            message:messages.INVALID_PASSWORD
        }
    }
    let accessToken = await universalFunction.jwtSign(user);
    return {
        status:statusCodes.SUCCESS,
        message:messages.USER_LOGIN_SUCCESSFULLY,
        accessToken:accessToken,
        user:user
    }
}
catch(err){
    throw err;
}

}