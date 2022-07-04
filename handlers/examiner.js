const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const universalFunction = require("../lib/universal-function");

const messages = messageList.MESSAGES;

module.exports.createCourse = async function (req) {
  try {
    let payload = req.body;
    let existingCourse = await Model.courses.findOne({
      name: payload.name,
      examinerID: payload.examinerID,
      status: APP_CONSTANTS.COURSE_STATUS.ACTIVE,
    });

    if (existingCourse)
      return {
        status: statusCodes.UNPROCESSABLE_ENTITY,
        message: messages.COURSE_ALREADY_EXIST,
      };

    let course = await Model.courses.create(payload);

    return {
      status: statusCodes.CREATED,
      message: messages.COURSE_REGISTERED_SUCCESSFULLY,
      data: {
        course: course,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports.addSubjects = async function (req) {
    try {

        let payload = req.body.subjects;
        for (let i in payload) {
            if(payload.findIndex((e)=>e.name == payload[i].name) != i){
                return {
                    status:statusCodes.DUPLICATE,
                    message: messages.DUPLICATE_ENTRY
                }
            }

            let existingSubject = await Model.subjects.findOne({
                name: payload[i].name,
                courseID: payload[i].courseID,
                status: APP_CONSTANTS.SUBJECT_STATUS.ACTIVE
            });
    
            if (existingSubject) return {
                status: statusCodes.UNPROCESSABLE_ENTITY,
                message: messages.SUBJECT_ALREADY_EXIST
            }
        };    

        let subjects = await Model.subjects.insertMany(payload);

        return {
            status: statusCodes.CREATED,
            message: messages.SUBJECT_REGISTERED_SUCCESSFULLY,
            data: {
                subjects:subjects
            }
        }

    } catch (error) {

        throw error;

    }
};

module.exports.getDashboard = async function (req) {
  try {
    let examiner = req.loggedUser;

    let courses = await Model.courses.find({
      examinerID: examiner._id,
      status: APP_CONSTANTS.COURSE_STATUS.ACTIVE,
    });

    return {
      status: statusCodes.SUCCESS,
      message: messages.DASHBOARD_LOADED_SUCCESSFULLY,
      data: {
        examinerDetails: examiner,
        examinerCourses: courses,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports.addStudent = async function (req) {
  try {
    let payload = req.body;
    let user = await Model.users.findOne(
      {
        $or: [{ email: payload.email }, { mobileNumber: payload.mobileNumber }],
      },
      { password: 0, status: 0 }
    );

    if (!user) {
      user = await Model.users.create(payload);
    } else if (user.userType != "STUDENT") {
      let message =
        user.email == payload.email
          ? messages.EMAIL_ALREDAY_TAKEN
          : messages.MOBILE_NUMBER_ALREADY_TAKEN;

      return {
        status: statusCodes.UNPROCESSABLE_ENTITY,
        message: message,
      };
    } else if (
      user.email != payload.email ||
      user.lastName != payload.lastName ||
      user.firstName != payload.firstName ||
      user.mobileNumber != payload.mobileNumber
    ) {
      return {
        status: statusCodes.UNPROCESSABLE_ENTITY,
        message: messages.INCORRECT_DETAILS,
        data: {
          existingStudent: user,
        },
      };
    } else {
      let existingStudent = await Model.students.findOne({
        courseID: payload.courseID,
        userID: user._id,
      });

      if (existingStudent)
        return {
          status: statusCodes.UNPROCESSABLE_ENTITY,
          message: messages.STUDENT_WITH_THIS_DETAILS_ALREADY_REGISTERED,
        };

      let password = await universalFunction.hashPasswordUsingBcrypt(
        payload.password
      );

      let fieldsToUpdate = {
        password: password,
      };

      let options = {
        new: true,
        projection: {
          password: 0,
        },
      };

      user = await Model.users.findByIdAndUpdate(
        user._id,
        fieldsToUpdate,
        options
      );
    }

    payload.userID = user._id;
    let student = await Model.students.create(payload);

    return {
      status: statusCodes.CREATED,
      message: messages.STUDENT_REGISTERED_SUCCESSFULLY,
      data: {
        student: student,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getStudents = async function (req) {
  try {
    let payload = req.params;
    let course = await Model.courses.findById(payload.courseID);

    if (course.examinerID != payload.examinerID)
      return {
        status: statusCodes.NOT_FOUND,
        message: messages.COURSE_NOT_FOUND,
      };

    let students = await Model.students.aggregate([
      {
        $match: {
          courseID: mongoose.Types.ObjectId(payload.courseID),
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseID",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "details",
        },
      },
      {
        $unwind: "$details",
      },
      {
        $unwind: "$course",
      },
      {
        $project: {
          dob: "$dob",
          gender: "$gender",
          address: "$address",
          course: "$course.name",
          email: "$details.email",
          motherName: "$motherName",
          fatherName: "$fatherName",
          name: "$details.firstName",
          mobilenumber: "$details.mobileNumber",
        },
      },
    ]);

    let count = await Model.students.countDocuments({
      courseID: payload.courseID,
    });

    return {
      status: statusCodes.SUCCESS,
      message: messages.SUCCESS,
      data: {
        count: count,
        students: students,
      },
    };
  } catch (error) {
    throw error;
  }
};


module.exports.viewSubject = async function (req) {
  try{
    let payload = req.params;
    let course = await Model.courses.findById(payload.courseID);
      

  }
  catch (error) {
    throw error;
  }
}