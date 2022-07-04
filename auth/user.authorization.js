const mongoose = require('mongoose');
const users = require('../models/users');
const universalFunction = require('../lib/universal-function');
const messageList = require("../messages/messages");
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const messages = messageList.MESSAGES;

module.exports = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let accessToken = req.headers.authorization;

            if (accessToken.startsWith('Bearer')) {
                [, accessToken] = accessToken.split(' ');
            }

            const decodedData = await universalFunction.jwtVerify(accessToken);

            if (!decodedData) return universalFunction.forBiddenResponse(res, messages.INVALID_TOKEN);

            let userData = await users.findOne({
                _id: mongoose.Types.ObjectId(decodedData._id),
                status: APP_CONSTANTS.ACCOUNT_STATUS.APPROVED
            },{password:0});

            if (userData) {

                req.loggedUser = userData;
                next();

            } else {

                return universalFunction.forBiddenResponse(res, messages.USER_NOT_ALLOWDED_TO_LOGIN);

            }
        } else {

            return universalFunction.unauthorizedResponse(res, messages.UNAUTHORIZED);

        }

    } catch (error) {

        return universalFunction.forBiddenResponse(res, messages.INVALID_TOKEN);

    }
};