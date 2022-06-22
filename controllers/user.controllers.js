const Handler = require('../handlers/user.handlers');
const universalFunction = require('../lib/universal-function');
const messageList = require("../messages/messages");
const statusCodeList = require("../statusCodes/status_codes");
const statusCodes = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;
const userHandler = require('../handlers/user.handlers')
const { default: mongoose } = require('mongoose');

module.exports.register = async function(req, res) {
try {
    const data = await Handler.registerHandler(req,res);
    return universalFunction.sendResponse(res,data.status,data.message,data);
} catch (error) {
    universalFunction.validationError(res, error.details);
}
}

module.exports.loginHandler = async function(res,res){
    try{
    const {email,password} = req.body;
    const data = await userHandler.loginHandler(email,password);
     universalFunction.sendResponse(res,data.status,data.message,data);
    }
    catch(err){
        universalFunction.validationError(res,err)
    }
    

}
