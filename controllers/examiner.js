const Handler = require('../handlers');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const universalFunction = require('../lib/universal-function');

module.exports.createCourse = async function (req,res) {
    try {

        req.body.examinerID = req.loggedUser.id;
        const response = await Handler.examiner.createCourse(req);
        return universalFunction.sendResponse(res,response.status,response.message,response.data);

    } catch (error) {

        return  universalFunction.errorResponse(res,error);

    }
};

module.exports.addSubjects = async function (req,res) {
    try {

        const response = await Handler.examiner.addSubjects(req);
        return universalFunction.sendResponse(res,response.status,response.message,response.data);

    } catch (error) {

        return  universalFunction.errorResponse(res,error);

    }
};

module.exports.addStudent = async function(req,res) {
    try {
                
        req.body.userType = APP_CONSTANTS.ACCOUNT_TYPE.STUDENT;
        req.body.status = APP_CONSTANTS.ACCOUNT_STATUS.APPROVED;
        req.body.examinerID = req.loggedUser.id;
        const response = await Handler.examiner.addStudent(req);
        return universalFunction.sendResponse(res,response.status,response.message,response.data);
        
    } catch (error) {
        
        return  universalFunction.errorResponse(res,error);

    }
};

module.exports.getDashboard = async function (req,res) {
    try {

        const response = await Handler.examiner.getDashboard(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};

module.exports.getStudents = async function (req,res) {
    try{  

        req.params.examinerID = req.loggedUser.id;
        const response = await Handler.examiner.getStudents(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }
}

module.exports.getSubjects = async function (req,res) {
    try{

        req.params.examinerID = req.loggedUser.id;
        const response = await Handler.examiner.getSubjects(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {
              return universalFunction.errorResponse(res, error);
            }
}

  