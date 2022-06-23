const mongoose = require('mongoose');
const adminHandler = require('../handlers/admin.handler');
const universalFunction = require('../lib/universal-function');

module.exports.approveOrDeclineExaminer =  async function(req,res) {
    try{
    let payload = req.body;
    let responseData = await adminHandler.approveOrDeclineExaminer(payload);
    }
    catch(err){
        throw err;
    }

}

module.exports.pendingExaminers = async function(req,res) {
    try{
    let examiners = await adminHandler.pendingExaminers();
    return universalFunction.sendResponse(res,examiners.status,examiners.msg,examiners);
    }
    catch(err){
    throw err;
    }
}