const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Handler = require("../handlers");
const universalFunction = require("../lib/universal-function");
const messagesList = require("../messages/messages");
const messages = messagesList.MESSAGES;
const validator = require("../validations");

module.exports.createCourse = async function (req, res) {
  try {
    req.body.examinerID = req.loggedUser.id;

    const { error, value } = validator.examiner.validateCourse(req);
    if (error) return universalFunction.validationError(res, error);

    const response = await Handler.examiner.createCourse(value);

    return universalFunction.sendResponse(
      res,
      response.status,
      response.message,
      response.data
    );
  } catch (error) {
    return universalFunction.errorResponse(res, error);
  }
};

module.exports.addStudent = async function (req, res) {
  try {

    req.body.userType = APP_CONSTANTS.ACCOUNT_TYPE.STUDENT;
    req.body.status = APP_CONSTANTS.ACCOUNT_STATUS.APPROVED;

    const { error, value } = validator.examiner.validateAddStudent(req);
    if (error) return universalFunction.validationError(res, error);

    const response = await Handler.examiner.addStudent(value);

    return universalFunction.sendResponse(
      res,
      response.status,
      response.message,
      response.data
    );
  } catch (error) {
    return universalFunction.errorResponse(res, error);
  }
};

module.exports.getDashboard = async function (req, res) {
  try {
    const response = await Handler.examiner.getDashboard(req);
    return universalFunction.sendResponse(
      res,
      response.status,
      response.message,
      response.data
    );
  } catch (error) {
    return universalFunction.errorResponse(res, error);
  }
};

module.exports.getStudent = async function (req, res) {
  try {
    const { error, value } = validator.examiner.validateGetStudent(req);
    if (error) return universalFunction.validationError(res, error);

    value.examinerID = req.loggedUser.id;
    const response = await Handler.examiner.getStudent(value);
    return universalFunction.sendResponse(
      res,
      response.status,
      response.message,
      response.data
    );
  } catch (error) {
    return universalFunction.errorResponse(res, error);
  }
};

module.exports.addSubject = async function (req, res) {
  try {
    const response = await Handler.examiner.addSubject(req.body);
    return universalFunction.sendResponse(res, response.status, response.message, response.data);
  } catch (error) {
    return universalFunction.errorResponse(res, error);
  }
};
