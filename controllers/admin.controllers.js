const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const Handler = require('../handlers');
const universalFunction = require('../lib/universal-function');
const messagesList = require('../messages/messages');
const messages = messagesList.MESSAGES;
const validator = require('../validations');

module.exports.approveOrDeclineExaminer = async function (req, res) {
    try {


        const { error, value } = validator.admin.validateAction(req);
        if (error) return universalFunction.validationError(res, error)

        const response = await Handler.admin.approveOrDeclineExaminer(value);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }

};

module.exports.getExaminers = async function (req, res) {
    try {

        const response = await Handler.admin.getExaminers(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }
}

module.exports.getDashboard = async function (req, res) {
    try {

        let response = await Handler.admin.getDashboard(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    } catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};