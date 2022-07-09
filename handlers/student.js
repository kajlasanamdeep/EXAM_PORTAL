const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const universalFunction = require("../lib/universal-function");
const messages = messageList.MESSAGES;

module.exports.getDashboard = async function (req) {
    let user = req.loggedUser;
    let student = await Model.students.aggregate([
        {
            $match:{userID:mongoose.Types.ObjectId(user._id)}
        },
        {
            $lookup:{
                from:"users",
                let:{
                    userID:"$userID"
                },
                pipeline:[
                    {
                        $match:{
                            $eq:['$$userID','$_id']
                        }
                    }
                ]
            }
        }
    ])
    return{
        data:student
    }
}