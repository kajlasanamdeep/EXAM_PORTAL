const joi = require('joi');

module.exports.validateCourse = function (req) {

    let courseSchema = joi.object({
        examinerID: joi.string().hex().length(24).required().error(() => Error('ExaminerID Is Not Valid')),
        name: joi.string().required().max(6).uppercase().error(() => Error('Name Is Not Valid')),
        description: joi.string().required().error(() => Error('Description Is Not Valid'))
    });

    return courseSchema.validate(req.body);
};