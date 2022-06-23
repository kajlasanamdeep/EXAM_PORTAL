var jwt = require('jsonwebtoken');
var config = require('../config/config');
const bcrypt = require('bcrypt');
const statusCodeList = require("../statusCodes/status_codes");
const messageList = require("../messages/messages");
const statusCode = statusCodeList.STATUS_CODE;
const messages = messageList.MESSAGES;

const sendResponse = async (res, code, message, data) => {
		code = code || statusCode.SUCCESS;
		message = message || messages.SUCCESS;
		data = data || {};
		return res.status(code).send({
			message: message,
			data: data,
		});
};
const unauthorizedResponse= async (res,message) => {
		const code = statusCode.UNAUTHORIZED;
	    message = message ||  messages.UNAUTHORIZED;
		return res.status(code).send({
			statusCode: code,
			message: message
		});
};
const forBiddenResponse= async (res,message) => {
		const code = statusCode.FORBIDDEN;
	    message = message ||  messages.FORBIDDEN;
		return res.status(code).send({
			statusCode: code,
			message: message
		});
};

const verifyExamCode = async(req,Exam_Code)=>{
	if(req.body.Exam_Code == Exam_Code) return true;
	else return false;
}

const validationError = async (res,error) => {
	const code = statusCode.BAD_REQUEST;
	return res.status(code).send({
		statusCode: code,
		error: error,
	});
};

const hashPasswordUsingBcrypt = async (plainTextPassword) => {
    const saltRounds = 10;
    return bcrypt.hashSync(plainTextPassword, saltRounds);
};

const jwtSign = async (payload) => {
		return jwt.sign({_id:payload._id},config.JWTSECRETKEY,{expiresIn:"1d"});
};

const jwtVerify = async(token) => {
		return jwt.verify(token, config.JWTSECRETKEY);
};

const comparePasswordUsingBcrypt = async (plainTextPassword, passwordhash) => {
    return bcrypt.compareSync(plainTextPassword, passwordhash);
};

module.exports = {
	sendResponse :sendResponse,
	unauthorizedResponse: unauthorizedResponse,
	forBiddenResponse:forBiddenResponse,
	jwtSign:jwtSign,
	jwtVerify:jwtVerify,
	verifyExamCode:verifyExamCode,
	validationError:validationError,
	hashPasswordUsingBcrypt: hashPasswordUsingBcrypt,
	comparePasswordUsingBcrypt: comparePasswordUsingBcrypt,
}