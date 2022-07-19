const Handler = require('../handlers');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const universalFunction = require('../lib/universal-function');

module.exports.getDashboard = async function (req,res) {
    try {

        const response = await Handler.student.getDashboard(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};

module.exports.getExams = async function (req,res) {
    try {

        const response = await Handler.student.getExams(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};

module.exports.accessExam = async function (req,res) {
    try {
        
        const response = await Handler.student.accessExam(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};

module.exports.answer = async function (req,res) {
    try{
        const response = await Handler.student.answer(req);
        return universalFunction.sendResponse(res,response.status,response.message,response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }

}