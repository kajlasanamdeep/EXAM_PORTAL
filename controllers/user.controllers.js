const Handler = require("../handlers/user.handlers");
const universalFunction = require("../lib/universal-function");
const validator = require('../validations/user.validations');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const { default: mongoose } = require('mongoose');

module.exports.register = async function (req, res) {
    try {
        req.body.userType = APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER;

        const { error, value } = validator.validateRegister(req);
        if (error) return universalFunction.validationError(res, error);

        const data = await Handler.registerHandler(value);
        return universalFunction.sendResponse(res, data.status, data.message, data.data);

    } catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};

module.exports.login = async function (req, res) {
    try {
        const { error, value } = validator.validateLogin(req);

        if (error) return universalFunction.validationError(res, error);

        const data = await Handler.loginHandler(value);
        return universalFunction.sendResponse(res, data.status, data.message, data.data);

    } catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};


