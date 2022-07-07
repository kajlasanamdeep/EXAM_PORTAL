const Handler = require('../handlers');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const universalFunction = require('../lib/universal-function');

module.exports.getDashboard = async function (req,res) {
    try {

        const response = await Handler.examiner.getDashboard(req);
        return universalFunction.sendResponse(res, response.status, response.message, response.data);

    }
    catch (error) {

        return universalFunction.errorResponse(res, error);

    }
};
