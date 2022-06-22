const mongoose = require('mongoose');
const users = require('../models/users');
const universalFunction = require('../lib/universal-function');
const messageList = require("../messages/messages");
const messages = messageList.MESSAGES;

module.exports = async(req, res, next) => {
    try {
        if (req.headers.authorization){
            let accessToken = req.headers.authorization;

            if (accessToken.startsWith('Bearer')) {
                [, accessToken] = accessToken.split(' ');
            }

            const decodedData = await universalFunction.jwtVerify(accessToken);
                if (!decodedData) return universalFunction.forBiddenResponse(res,messages.INVALID_TOKEN);
                let userData = await users.findOne({
                    _id:mongoose.Types.ObjectId(decodedData._id),
                    status:'APPROVED'
                });
                if(userData){
                    req.loggedUser = userData;
                    next();
                }else{
                    return universalFunction.unauthorizedResponse(res,messages.USER_NOT_FOUND);
                }
        } else {
            return universalFunction.unauthorizedResponse(res,messages.INVALID_TOKEN);
        }  
    } catch (error) {
        return universalFunction.unauthorizedResponse(res);
    }
};