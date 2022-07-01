const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const universalFunction = require("../lib/universal-function");
const messages = messageList.MESSAGES;

module.exports.createCourse = async function (payload) {
    try {

        let existingCourse = await Model.courses.findOne({
            examinerID: payload.examinerID,
            status: APP_CONSTANTS.COURSE_STATUS.ACTIVE,
            name: payload.name
        });

        if (existingCourse) return {
            status: statusCodes.UNPROCESSABLE_ENTITY,
            message: messages.COURSE_ALREADY_EXIST
        }

        let course = await Model.courses.create(payload);

        return {
            status: statusCodes.CREATED,
            message: messages.COURSE_REGISTERED_SUCCESSFULLY,
            data: {
                course: course
            }
        }

    } catch (error) {

        throw error;

    }
};

module.exports.getDashboard = async function (payload) {
    try {

        let examiner = payload.loggedUser;

        let courses = await Model.courses.find({
            examinerID: examiner._id,
            status: APP_CONSTANTS.COURSE_STATUS.ACTIVE
        });

        return {
            status: statusCodes.SUCCESS,
            message: messages.DASHBOARD_LOADED_SUCCESSFULLY,
            data: {
                examinerDetails: examiner,
                examinerCourses: courses
            }
        };

    } catch (error) {

        throw error;

    }
}

module.exports.addStudent = async function (payload) {
    try {

        let user = await Model.users.findOne({$or:[{ email: payload.email },{mobileNumber:payload.mobileNumber}]});

        if (!user) {
            user = await Model.users.create(payload);
        }

        else if (user.userType != "STUDENT") {

            let message = user.email == payload.email ? messages.EMAIL_ALREDAY_TAKEN : messages.MOBILE_NUMBER_ALREADY_TAKEN;

            return {
                status: statusCodes.UNPROCESSABLE_ENTITY,
                message: message
            };
        }

        else {

            let existingStudent = await Model.students.findOne({
                courseID: payload.courseID,
                userID: user._id
            });
    
            if (existingStudent) return {
                status: statusCodes.UNPROCESSABLE_ENTITY,
                message: messages.STUDENT_WITH_THIS_DETAILS_ALREADY_REGISTERED
            }
    
            let password = await universalFunction.hashPasswordUsingBcrypt(payload.password);
            user = await Model.users.findByIdAndUpdate(user._id, { $set: { password: password } }, { new: true });
        }

        payload.userID = user._id;
        let student = await Model.students.create(payload);

        return {
            status: statusCodes.CREATED,
            message: messages.STUDENT_REGISTERED_SUCCESSFULLY,
            data: {
                student: student
            }
        }

    } catch (error) {

        throw error;

    }
}

module.exports.getStudent = async function (payload) {
    try {
        let course = await Model.courses.findById(payload.courseID);

        if(course.examinerID != payload.examinerID) return{
            status:statusCodes.NOT_FOUND,
            message:messages.COURSE_NOT_FOUND
        };

        let students = await Model.students.aggregate([
            {
                $match:{
                    courseID : mongoose.Types.ObjectId(payload.courseID)
                }
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'courseID',
                    foreignField: '_id',
                    as: 'course'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userID',
                    foreignField: '_id',
                    as: 'details'
                }
            },
            {
                $unwind:"$details"
            },
            {
                $unwind:"$course"
            },
            {
                $project: {
                    fatherName:"$fatherName",
                    motherName:"$motherName",
                    DOB:"$dob",
                    address:"$address",
                    gender:"$gender",
                    course:"$course.name",
                    name:"$details.firstName",
                    email:"$details.email",
                    mobilenumber:"$details.mobileNumber"
                }
            }
        ]);

        let count = await Model.students.countDocuments({courseID:payload.courseID});

        return {
            status:statusCodes.SUCCESS,
            message: messages.STUDENTS,
            data:{
                students:students,
                count:count
            }
        };
    }
    catch (error) {

        throw error;

    }
}

module.exports.addSubject = async function (payload) {

   let subjects = await payload.forEach( sub =>{
    Model.subject.create(sub)
   })

   return {
    status:statusCodes.SUCCESS,
    message: messages.SUBJECT_REGISTERED_SUCCESSFULLY,
    data:{}
   }
   
}