const universalFunction = require('../lib/universal-function');
const users = require('../models/users');
const messageList = require("../messages/messages");
const validator = require('../validations/user.validations');
const statusCodeList = require("../statusCodes/status_codes");
const statusCodes = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;
const userHandler = require('../handlers/user.handlers')
const { default: mongoose } = require('mongoose');

module.exports.register = async function(req, res) {
    
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
