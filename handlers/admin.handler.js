const universalFunction = require('../lib/universal-function');
const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const users = require("../models/users");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const messages = messageList.MESSAGES;
const generatorPassword = require('generate-password');

module.exports.getExaminerDetails = async function (payload) {
  try {
  } catch (err) {
    throw err;
  }
};

module.exports.approveOrDeclineExaminer = async function (payload) {
  let query = {_id:mongoose.Types.ObjectId(payload.examinerId)};

  let newPassword = generatorPassword.generate({
    length:14,
    numbers:true,
    uppercase:true
   });
   let options = { new: true };

   let hashedPassword = universalFunction.hashPasswordUsingBcrypt(newPassword);

   let toUpdate = {
    status:payload.status,
    password: hashedPassword
   }
   
   let updateExaminer = await users.findOneAndUpdate(query,toUpdate,options)
};

module.exports.pendingExaminers = async function () {
  try {
    let query = {
      $and: [
        { userType: APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER },
        { status: APP_CONSTANTS.ACCOUNT_STATUS.PENDING },
      ],
    };
    let pendingExaminers = await users.find(query);
    let count = await users.countDocuments(query);

    return {
      status: statusCodes.SUCCESS,
      msg: messages.SUCCESS,
      data: {
        count: count,
        pendingExaminers: pendingExaminers,
      },
    };
  } catch (err) {
    throw err;
  }
};
