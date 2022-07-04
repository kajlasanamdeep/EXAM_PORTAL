const Handler = require("../handlers");
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const universalFunction = require("../lib/universal-function");

module.exports.register = async function (req, res) {
    try {

        req.body.userType = APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER;
        const response = await Handler.user.register(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    } catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};

module.exports.login = async function (req, res) {
    try {
        
        const response = await Handler.user.login(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    } catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};