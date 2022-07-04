const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const messagesList = require('../messages/messages');
const messages = messagesList.MESSAGES;
const {forBiddenResponse} = require('../lib/universal-function');
module.exports = {
    isAdmin: (req,res,next) => {
        let loggedUser = req.loggedUser;
        if (loggedUser.userType != APP_CONSTANTS.ACCOUNT_TYPE.ADMIN){
            return forBiddenResponse(res, messages.USER_NOT_ALLOWDED_TO_ACCESS_THIS_PAGE);
        } 
        next();
    },
    isExaminer: (req,res,next) => {
        let loggedUser = req.loggedUser;
        if(loggedUser.userType != APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER){
            return forBiddenResponse(res,messages.USER_NOT_ALLOWDED_TO_ACCESS_THIS_PAGE);
        }
        next();
    }
}