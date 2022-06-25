const joi = require('joi');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const Actions = [
                    APP_CONSTANTS.ACCOUNT_STATUS.APPROVED,
                    APP_CONSTANTS.ACCOUNT_STATUS.DELETED,
                    APP_CONSTANTS.ACCOUNT_STATUS.DECLINED
                ];

module.exports.validateAction = function (req) {
    let actionSchema = joi.object({
        examinerID: joi.string().hex().length(24).required().error(()=>Error('ExaminerID Is Not Valid')),
        action:joi.string().valid(...Actions).required().error(()=>Error('Action Is Not Valid!'))
    });
    return actionSchema.validate(req.body);
};