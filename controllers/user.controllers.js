const Handler = require("../handlers");
const universalFunction = require("../lib/universal-function");
const validator = require('../validations');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

module.exports.register = async function (req, res) {
    try {
        req.body.userType = APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER;

        const { error, value } = validator.user.validateRegister(req);
        if (error) return universalFunction.validationError(res, error);

        const response = await Handler.user.register(value);
        return universalFunction.sendResponse(res,response.status,response.message,response.data);

    } catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};

module.exports.login = async function (req, res) {
    try {
        const { error, value } = validator.user.validateLogin(req);

        if (error) return universalFunction.validationError(res, error);

        const response = await Handler.user.login(value);
        return universalFunction.sendResponse(res,response.status,response.message,response.data);

    } catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};