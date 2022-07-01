const mongoose = require('mongoose');
const users = require('../models/users');
const universalFunction = require('../lib/universal-function');
const messageList = require("../messages/messages");
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const messages = messageList.MESSAGES;

module.exports = function (userType) {
    return async (req, res, next) => {
        try {
            if (req.headers.authorization) {

                let accessToken = req.headers.authorization;

                if (accessToken.startsWith('Bearer')) {
                    [, accessToken] = accessToken.split(' ');
                };

                const decodedData = await universalFunction.jwtVerify(accessToken);
                let userData = await users.findById(decodedData._id, { password: 0 });

                if (userData) {

                    if (userData.status != APP_CONSTANTS.ACCOUNT_STATUS.APPROVED) {
                        return universalFunction.forBiddenResponse(res, messages.USER_NOT_ALLOWDED_TO_LOGIN);
                    }
                    else if (userData.userType === userType) {
                        req.loggedUser = userData;
                        next();
                    }
                    else {
                        return universalFunction.forBiddenResponse(res, messages.USER_NOT_ALLOWDED_TO_ACCESS_THIS_PAGE);
                    }

                } else {

                    return universalFunction.forBiddenResponse(res, messages.INVALID_TOKEN);

                }

            } else {

                return universalFunction.unauthorizedResponse(res, messages.UNAUTHORIZED);

            }

        } catch (error) {

            return universalFunction.forBiddenResponse(res, messages.INVALID_TOKEN);

        }
    }
}
