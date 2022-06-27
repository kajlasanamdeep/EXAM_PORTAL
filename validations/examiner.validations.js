const joi = require('joi');

module.exports.validateCourse = function (req) {

    let courseSchema = joi.object({

    });

    return courseSchema.validate(req.body);
};