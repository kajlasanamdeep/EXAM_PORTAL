const joi = require('joi');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const Actions = [
    APP_CONSTANTS.ACCOUNT_STATUS.APPROVED,
    APP_CONSTANTS.ACCOUNT_STATUS.DECLINED
];

module.exports.actionSchema = {

    body : joi.object({
        examinerID: joi.string().hex().length(24).required().error(() => Error('ExaminerID Is Not Valid')),
        action: joi.string().valid(...Actions).required().error(() => Error('Action Is Not Valid!'))
    })
    
}

module.exports.deleteSchema = {

    params : joi.object({
        examinerID: joi.string().hex().length(24).required().error(() => Error('ExaminerID Is Not Valid'))
    })
    
}
