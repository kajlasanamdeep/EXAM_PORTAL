const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const messages = messageList.MESSAGES;

module.exports.getDashboard = async function (req) {
  try {

    let adminDetails = req.loggedUser;

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

module.exports.approveOrDeclineExaminer = async function (req) {
  try {

    let payload = req.body;
    let _id = mongoose.Types.ObjectId(payload.examinerID);

    let fieldsToUpdate = {
      status: payload.action
    };

    let options = {
      new: true,
      projection: {
        password: 0
      }
    };

    let upatedExaminer = await Model.users.findByIdAndUpdate(_id, fieldsToUpdate, options);
    let message = (upatedExaminer.status == APP_CONSTANTS.ACCOUNT_STATUS.APPROVED) ? messages.USER_APPROVED_SUCCESSFULLY : messages.USER_DECLINED_SUCCESSFULLY;

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

    let payload = req.params;
    let query = {
      $and: [
        { userType: APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER }
      ]
    };

    if (payload.status == "pending") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.PENDING });
    else if (payload.status == "approved") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.APPROVED });
    else if (payload.status == "declined") query.$and.push({ status: APP_CONSTANTS.ACCOUNT_STATUS.DECLINED });
    else if (payload.status) return {
      status: statusCodes.NOT_FOUND,
      message: messages.INVALID_URL
    };

    let projection = {
      password: 0,
      userType: 0
    };

    let Examiners = await Model.users.find(query, projection);
    let count = await Model.users.countDocuments(query);

    return {
      status: statusCodes.SUCCESS,
      message: messages.SUCCESS,
      data: {
        count: count,
        Examiners: Examiners
      }
    };

  } catch (error) {

    throw error;

  }
};
