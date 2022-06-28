const joi = require('joi');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');

module.exports.validateLogin = (req) => {

    let UserLoginSchema = joi.object({
        email: joi.string().email().required().messages().error(() => Error('Email is Not Valid!')),
        password: joi.string().required().error(() => Error('Password Is Not Valid!'))
    });

    return UserLoginSchema.validate(req.body);
};

module.exports.validateRegister = (req) => {

    let UserRegistrationSchema = joi.object({
        firstName: joi.string().required().error(() => Error('First Name Is Not Valid!')),
        lastName: joi.string().optional().error(() => Error('Last Name Is Not Valid!')),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().lowercase().error(() => Error('Email Address Is Not Valid!')),
        mobileNumber: joi.string().min(10).max(12).required().error(() => Error('Mobile Number Is Not Valid!')),
        userType: joi.string().valid(APP_CONSTANTS.ACCOUNT_TYPE.EXAMINER).required().error(() => Error('User Type Is Not Valid!')),
        password: joi.string().min(6).required().error(() => Error('Password Is Not Valid!'))
    });

    return UserRegistrationSchema.validate(req.body);
};