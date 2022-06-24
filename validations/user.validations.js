const joi = require('joi');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

const validateLogin = (req) => {
    let UserLoginSchema = joi.object({
        email: joi.string().email().required().error(()=>Error('email is Not valid!')),
        password: joi.string().required().error(()=>Error('password is Not valid!'))
    });
    return UserLoginSchema.validate(req.body);
};
const validateRegister = (req) => {
    let UserRegistrationSchema = joi.object({
        firstName: joi.string().optional().error(()=>Error('firstName is Not valid!')),
        lastName: joi.string().optional().error(()=>Error('lastName is Not valid!')),
        mobileNumber: joi.string().min(10).max(12).required().error(()=>Error('mobileNumber is Not valid!')),
        email: joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required().lowercase().error(()=>Error('email is Not valid!')),
        userType: joi.string().valid(APP_CONSTANTS.ACCOUNT_TYPE.STUDENT,APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER).required().error(()=>Error('userType is Not valid!')),
        password: joi.string().min(6).required().error(()=>Error('password is Not valid!'))
    });
    return UserRegistrationSchema.validate(req.body);
};
module.exports = {
    validateLogin: validateLogin,
    validateRegister: validateRegister
}