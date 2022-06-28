const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const Handler = require('../handlers');
const universalFunction = require('../lib/universal-function');
const messagesList = require('../messages/messages');
const messages = messagesList.MESSAGES;
const validator = require('../validations');

module.exports.registerCourse = async function (req,res) {
    try {

        let loggedUser = req.loggedUser;
        if (loggedUser.userType != APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER) return universalFunction.forBiddenResponse(res, messages.USER_NOT_ALLOWDED_TO_ACCESS_THIS_PAGE);
        
        req.body.examinerID = req.loggedUser._id;
        const { error, value } = validator.examiner.validateCourse(req);
        if (error) return universalFunction.validationError(res, error);

        const response = await Handler.examiner.registerCourse(value);

        return universalFunction.sendResponse(res,response.status,response.message,response.data);

    } catch (error) {

        return  universalFunction.errorResponse(res,error);

    }
}