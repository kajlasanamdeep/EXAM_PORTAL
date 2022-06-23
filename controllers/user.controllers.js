const universalFunction = require('../lib/universal-function');
const users = require('../models/users');
const messageList = require("../messages/messages");
const validator = require('../validations/user.validations');
const statusCodeList = require("../statusCodes/status_codes");
const statusCodes = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;
const { default: mongoose } = require('mongoose');

module.exports.register = async function(req, res) {
    
}
