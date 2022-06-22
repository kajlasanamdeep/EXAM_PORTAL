const joi = require('joi');

const validateLogin = (req) => {
    let UserLoginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    return UserLoginSchema.validate(req.body);
};
const validateRegister = (req) => {
    let UserRegistrationSchema = joi.object({
        firstName: joi.string().optional(),
        lastName: joi.string().optional(),
        mobileNumber: joi.string().min(10).max(12).required(),
        email: joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        userType: joi.string().valid("STUDENT","EXAMINER").required(),
        password: joi.string().min(6).required()
    });
    return UserRegistrationSchema.validate(req.body);
};
module.exports = {
    validateLogin: validateLogin,
    validateRegister: validateRegister
}