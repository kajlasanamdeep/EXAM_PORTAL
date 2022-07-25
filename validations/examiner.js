const joi = require('joi');
const APP_CONSTANTS = require('../constant/APP_CONSTANTS');
const [date,] = new Date(Date.now() + (5 * 3600000 + 1800000)).toISOString().split('T');

const genders = [
    APP_CONSTANTS.STUDENT_GENDER.MALE,
    APP_CONSTANTS.STUDENT_GENDER.FEMALE,
    APP_CONSTANTS.STUDENT_GENDER.OTHER
]

module.exports.addCourseSchema = {

    body: joi.object({
        name: joi.string().required().max(12).uppercase().error(() => Error('Course Name Is Not Valid')),
        description: joi.string().required().error(() => Error('Course Description Is Not Valid'))
    })
    
};

module.exports.addSubjectSchema = {

    body: joi.object({
            subjects:joi.array().items(
                joi.object({
                    name: joi.string().required().uppercase().error(() => Error('Subject Name Is Not Valid')),
                    courseID: joi.string().hex().length(24).required().error(() => Error('CourseID Is Not Valid'))
                })
            )
        })    
};

module.exports.getStudentsSchema = {

    params: joi.object({
        courseID: joi.string().hex().length(24).required().error(() => Error('CourseID Is Not Valid'))
    })
}

module.exports.getSubjectsSchema = {

    params: joi.object({
        courseID: joi.string().hex().length(24).required().error(() => Error('CourseID Is Not Valid'))
    })
}

module.exports.addStudentSchema = {

    body: joi.object({
        firstName: joi.string().required().error(() => Error('First Name Is Not Valid!')),
        lastName: joi.string().optional().error(() => Error('Last Name Is Not Valid!')),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().lowercase().error(() => Error('Email Address Is Not Valid!')),
        mobileNumber: joi.string().min(10).max(12).required().error(() => Error('Mobile Number Is Not Valid!')),
        password: joi.string().min(6).required().error(() => Error('Password Is Not Valid!')),
        courseID: joi.string().hex().length(24).required().error(() => Error('Course ID Is Not Valid')),
        fatherName: joi.string().required().error(() => Error('Father Name Is Not Valid')),
        motherName: joi.string().required().error(() => Error('Mother Name Is Not Valid')),
        dob: joi.date().less(new Date(date)).required().error(() => Error('D.O.B. Is Not Valid')),
        city: joi.string().required().error(() => Error('City Is Not Valid')),
        state: joi.string().required().error(() => Error('State Is Not Valid')),
        address: joi.string().required().error(() => Error('Address Is Not Valid')),
        gender: joi.string().valid(...genders).required().error(() => Error('Gender Is Not Valid'))
    })
}

module.exports.createExamSchema = {
    body: joi.object({
        subjectID: joi.string().hex().length(24).required().error(() => Error('SubjectID Is Not Valid')),
        startTime: joi.string().required().error(() => Error('Start Time Is Not Valid')),
        endTime: joi.string().required().error(() => Error('End Time Is Not Valid')),
        examDate: joi.date().required().error(() => Error('Exam Date Is Not Valid')),
        duration: joi.string().required().error(() => Error('Duration Is Not Valid')),
        accessCode: joi.string().required().error(() => Error('Access Code Is Not Valid')),
        questions:joi.array().items(
            joi.object({
                question: joi.string().required().trim().error(() => Error('Question Is Not Valid')),
                options: joi.array().items(joi.string().required().trim().error(() => Error('Option Is Not Valid'))),
                correctOption: joi.string().required().trim().error(() => Error('Correct Option Is Not Valid')),
                marks: joi.number().required().error(() => Error('Marks Is Not Valid'))
            }).required().error(() => Error('Question Is Not Valid'))).required().error(() => Error('Questions Is Not Valid')),
        students: joi.array().items(joi.string().hex().length(24).required().error(() => Error('StudentID Is Not Valid'))).required().error(() => Error('Students Is Not Valid'))
    })
}