const joi = require('joi');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

module.exports.validateAction = function (req) {
    let actionSchema = joi.object({
        examinerID:joi.string().required().error(()=>Error('examinerID validation Error')),
        status:joi.string().valid(APP_CONSTANTS.ACCOUNT_STATUS.DECLINED,APP_CONSTANTS.ACCOUNT_STATUS.APPROVED).required().error(()=>Error('status is Not valid!'))
    });
    return actionSchema.validate(req.body);
};