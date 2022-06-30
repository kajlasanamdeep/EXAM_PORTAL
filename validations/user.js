const joi = require('joi');

module.exports.userLoginSchema = {
    body: joi.object({
        email: joi.string().email().required().error(() => Error('Email is Not Valid!')),
        password: joi.string().required().error(() => Error('Password Is Not Valid!'))
    })
};

module.exports.userRegistrationSchema = {

    body: joi.object({
        firstName: joi.string().required().error(() => Error('First Name Is Not Valid!')),
        lastName: joi.string().optional().error(() => Error('Last Name Is Not Valid!')),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().lowercase().error(() => Error('Email Address Is Not Valid!')),
        mobileNumber: joi.string().min(10).max(12).required().error(() => Error('Mobile Number Is Not Valid!')),
        password: joi.string().min(6).required().error(() => Error('Password Is Not Valid!'))
    })
    
};