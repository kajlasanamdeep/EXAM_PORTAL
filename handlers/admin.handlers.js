const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const messages = messageList.MESSAGES;

module.exports.getDashboard = async function (payload) {
  try {

    let adminDetails = payload.loggedUser;

    return {
      status: statusCodes.SUCCESS,
      message: messages.DASHBOARD_LOADED_SUCCESSFULLY,
      data: {
        adminDetails: adminDetails
      }
    };

  } catch (error) {

    throw error;

  }
}

module.exports.approveOrDeclineExaminer = async function (payload) {
  try {

    let _id = mongoose.Types.ObjectId(payload.examinerID);

    let fieldsToUpdate = {
      status: payload.action
    };

    let options = {
      new: true
    };

    let upatedExaminer = await Model.users.findByIdAndUpdate(_id, fieldsToUpdate, options);
    let message = upatedExaminer.status == APP_CONSTANTS.ACCOUNT_STATUS.APPROVED ? 
                                            messages.USER_APPROVED_SUCCESSFULLY : upatedExaminer.status == APP_CONSTANTS.ACCOUNT_STATUS.DECLINED ?
                                            messages.USER_DECLINED_SUCCESSFULLY : messages.USER_DELETED_SUCCESSFULLY;

    return {
      status: statusCodes.SUCCESS,
      message: message
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

    if (req.params.status == "pending") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.PENDING });
    else if (req.params.status == "approved") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.APPROVED });
    else if (req.params.status == "declined") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.DECLINED });
    else if (req.params.status == "deleted") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.DELETED });
    else if (req.params.status != "all") return{
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

  } catch (error) {

    throw error;

  }
};
