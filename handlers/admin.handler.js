const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const messages = messageList.MESSAGES;


module.exports.approveOrDeclineExaminer = async function (payload) {
    try {

        let _id = mongoose.Types.ObjectId(payload.examinerID);
   
        let fieldsToUpdate = {
                                 status:payload.status
                             };
     
         let options = {
                         new:true
                     };
     
        let upatedExaminer = await Model.users.findByIdAndUpdate(_id,fieldsToUpdate,options);
     
        return{
            status:statusCodes.SUCCESS,
            message:messages.SUCCESS,
            data:{
                upatedExaminer:upatedExaminer
            }
        }
     
    } catch (error) {

        throw error;

    }

};

module.exports.getExaminers = async function (req) {
  try {

    let query = {
      $and: [
        { userType: APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER }
      ]
    };

    if(req.params.getExaminers == "pendingExaminers") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.PENDING });
    else if(req.params.getExaminers == "approvedExaminers") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.APPROVED });
    else if(req.params.getExaminers == "declinedExaminers") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.DECLINED });
    else if(req.params.getExaminers == "deletedExaminers") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.DELETED });
    else if(req.params.getExaminers == "Examiners");
    else return{
      status:statusCodes.NOT_FOUND,
      message:messages.INVALID_URL
    };

    let Examiners = await Model.users.find(query);
    let count = await Model.users.countDocuments(query);

    return {
      status: statusCodes.SUCCESS,
      message: messages.SUCCESS,
      data: {
        count: count,
        Examiners: Examiners
      },
    };

  } catch (err) {

    throw err;

  }
};
