const joi = require('joi');

module.exports.accessExamSchema = {

    body: joi.object({
        studentID: joi.string().hex().length(24).required().error(() => Error('Student ID Is Not Valid')),
        examID: joi.string().hex().length(24).required().error(() => Error('Exam ID Is Not Valid')),
        accessCode: joi.string().required().error(() => Error('Access Code Is Not Valid'))
    })
    
}

module.exports.answerSchema = {

    body: joi.object({
        studentID: joi.string().hex().length(24).required().error(() => Error('Student ID Is Not Valid')),
        questionID: joi.string().hex().length(24).required().error(() => Error('Question ID Is Not Valid')),

    })
    
}