const Handler = require("../handlers/user.handlers");
const universalFunction = require("../lib/universal-function");
const { default: mongoose } = require('mongoose');

module.exports.register = async function (req, res) {
  try {
    const data = await Handler.registerHandler(req);
    return universalFunction.sendResponse(res, data.status, data.message, data);
  } catch (error) {
    universalFunction.validationError(res, error.message);
  }
};

module.exports.login = async function (req, res) {
  try {
    const data = await Handler.loginHandler(req);
    universalFunction.sendResponse(res, data.status, data.message, data);
  } catch (err) {
    universalFunction.validationError(res, err.message);
  }
};


