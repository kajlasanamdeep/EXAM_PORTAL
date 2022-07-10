const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const universalFunction = require("../lib/universal-function");
const mailer = require("../services/mailer");
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
      if (payload.findIndex((e) => e.name == payload[i].name) != i) {
        return {
          status: statusCodes.DUPLICATE,
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
        subjects: subjects
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
    let course = await Model.courses.findById(payload.courseID);

    if (!course || course.examinerID != payload.examinerID)
      return {
        status: statusCodes.NOT_FOUND,
        message: messages.COURSE_NOT_FOUND,
      };

    let password = await universalFunction.hashPasswordUsingBcrypt(payload.password);
    payload.password = password;

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
      user.mobileNumber != payload.mobileNumber ||
      user.dob != payload.dob
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
        userID: user._id
      });

      if (existingStudent)
        return {
          status: statusCodes.UNPROCESSABLE_ENTITY,
          message: messages.STUDENT_WITH_THIS_DETAILS_ALREADY_REGISTERED,
        };


      let fieldsToUpdate = {
        password: password
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

    if (!course || course.examinerID != payload.examinerID)
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
          userID: "$details._id",
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
        students: students
      },
    };
  } catch (error) {
    throw error;
  }
};


module.exports.getSubjects = async function (req) {
  try {
    let payload = req.params;
    let course = await Model.courses.findById(payload.courseID);

    if (!course || course.examinerID != payload.examinerID)
      return {
        status: statusCodes.NOT_FOUND,
        message: messages.COURSE_NOT_FOUND,
      };

    let subjects = await Model.courses.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(payload.courseID),
          status: APP_CONSTANTS.SUBJECT_STATUS.ACTIVE
        }
      },
      {
        $lookup: {
          from: "subjects",
          localField: "_id",
          foreignField: "courseID",
          as: "subjects",
        }
      },
      {
        $unwind: "$subjects"
      },
      {
        $project: {
          name: "$subjects.name",
          subjectID: "$subjects._id",
          course: "$name",
          examinerID: "$examinerID"
        }
      }
    ]);

    return {
      status: statusCodes.SUCCESS,
      message: messages.SUBJECTS_LOADED_SUCCESSFULLY,
      data: {
        count: subjects.length,
        subjects: subjects
      }
    }
  }
  catch (error) {
    throw error;
  }
}

module.exports.createExam = async function (req) {
  try {

    let payload = req.body;
    let subject = await Model.subjects.findById(payload.subjectID);
    if (!subject)
      return {
        status: statusCodes.NOT_FOUND,
        message: messages.SUBJECT_NOT_FOUND,
      };

    let course = await Model.courses.findById(subject.courseID);
    if (!course || course.examinerID != payload.examinerID)
      return {
        status: statusCodes.NOT_FOUND,
        message: messages.COURSE_NOT_FOUND,
      };

    payload.totalMarks = parseInt(payload.questions.map((e) => e.marks).reduce((a, b) => a + b));
    payload.passingMarks = parseInt((35 / 100) * payload.totalMarks);

    let exam = await Model.exams.create(payload);

    for (let i in payload.questions) {
      let question = payload.questions[i];
      await Model.questions.create({ ...question, examID: exam._id });
    }

    for (let element of payload.students) {
      let student = await Model.students.findOne({ _id: mongoose.Types.ObjectId(element), courseID: course._id });
      if (!student) return {
        status: statusCodes.NOT_FOUND,
        message: messages.STUDENT_NOT_FOUND
      }
      let user = await Model.users.findById(mongoose.Types.ObjectId(student.userID));
      await Model.examstudents.create({
        examID: exam._id,
        studentID: student._id,
        subjectID: subject._id,
        examinerID: payload.examinerID
      })
      let data = {
        email: user.email,
        subject: subject.name,
        course: course.name,
        accessCode: payload.accessCode
      }
      mailer.sendExamMail(data);
    }

    return {
      status: statusCodes.CREATED,
      message: messages.EXAM_CREATED_SUCCESSFULLY
    }
  }
  catch (error) {

    throw error;

  }
}

module.exports.viewExam = async function (req) {
  try {

    let examiner = req.loggedUser;
    let exams = await Model.exams.aggregate([
      {
        $match: {
          examinerID: mongoose.Types.ObjectId(examiner._id),
        }
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjectID",
          foreignField: "_id",
          as: "subject",
        }
      },
      {
        $lookup: {
          from: "examstudents",
          let: {
            id: "$_id"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                      $eq: ["$$id","$examID"]
                }
              }
            },
            {
              $lookup: {
                from: "students",
                let: {
                  studentID: "$studentID"
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                            $eq: ["$$studentID", "$_id"]
                      }
                    }
                  },
                  {
                    $lookup: {
                      from: "users",
                      let: {
                        userID: "$userID"
                      },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                                $eq: ["$$userID", "$_id"]
                            }
                          }
                        },
                        {
                          $project: {
                            firstName: "$firstName",
                            lastName: "$lastName",
                            email: "$email",
                            mobileNumber: "$mobileNumber"
                          }
                        }
                      ],
                      as: "user"
                    }
                  },
                  {
                    $unwind: "$user"
                  },
                  {
                    $project: {
                      firstName: "$user.firstName",
                      lastName: "$user.lastName",
                      email: "$user.email",
                      mobileNumber: "$user.mobileNumber"
                    }
                  }
                ],
                as: "student"
              }
            },
            {
              $unwind: "$student"
            },
            {
              $project: {
                firstName: "$student.firstName",
                lastName: "$student.lastName",
                email: "$student.email",
                mobileNumber: "$student.mobileNumber",
                studentID: "$studentID"
              }
            }
          ],
          as: "students"
        }
      },
      {
        $lookup: {
          from: "questions",
          let: {
            id: "$_id"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                      $eq: ["$$id","$examID"]
                }
              }
            },
            {
              $project: {
                question: "$question",
                marks: "$marks",
                options: "$options",
                correctOption: "$correctOption",
              }
            }
          ],
          as: "questions"
        }
      },
      {
        $unwind: "$subject"
      },
      {
        $lookup: {
          from: "courses",
          localField: "subject.courseID",
          foreignField: "_id",
          as: "course",
        }
      },
      {
        $unwind: "$course"
      },
      {
        $project: {
          _id: 0,
          students: "$students",
          course: "$course.name",
          subject: "$subject.name",
          subjectID: "$subjectID",
          examID: "$_id",
          startTime: "$startTime",
          endTime: "$endTime",
          totalMarks: "$totalMarks",
          passingMarks: "$passingMarks",
          examDate: "$examDate",
          duration: "$duration",
          questions: "$questions"
        }
      }
    ]);

    return {
      status: statusCodes.SUCCESS,
      message: messages.EXAM_LOADED_SUCCESSFULLY,
      data: {
        count: exams.length,
        exams: exams
      }
    }

  } catch (error) {

    throw error;

  }
};