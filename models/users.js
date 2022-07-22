const mongoose = require('mongoose');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

const userTypes = [
    APP_CONSTANTS.ACCOUNT_TYPE.STUDENT,
    APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER,
    APP_CONSTANTS.ACCOUNT_TYPE.ADMIN
];

const userStatus = [
    APP_CONSTANTS.ACCOUNT_STATUS.PENDING,
    APP_CONSTANTS.ACCOUNT_STATUS.APPROVED,
    APP_CONSTANTS.ACCOUNT_STATUS.DECLINED,
    APP_CONSTANTS.ACCOUNT_STATUS.DELETED
];

const Schema = mongoose.Schema;
const UserModel = new Schema({
    firstName: {
        type: String, default: ''
    },
    lastName: {
        type: String, default: ''
    },
    email: {
        type: String, index: true, required: true
    },
    mobileNumber: {
        type: String, required: true
    },
    password: {
        type: String, index: true, required: true
    },
    userType: {
        type: String,
        enum: userTypes,
        required: true
    },
    status: {
        type: String,
        enum: userStatus,
        default: userStatus[0],
    },
    createdOn: { type: Date, default: new Date(Date.now() + 5 * 300000 + 1800000).toISOString() }
});

module.exports = mongoose.model('users', UserModel);