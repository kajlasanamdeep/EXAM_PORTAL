const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const universalFunction = require("../lib/universal-function");
const messages = messageList.MESSAGES;

module.exports.getDashboard = async function (req) {
    let user = req.loggedUser;
    let student = await Model.students.aggregate([
        {
            $match:{userID:mongoose.Types.ObjectId(user._id)}
        },
        {
            $lookup:{
                from:"users",
                let:{
                    userID:"$userID"
                },
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $eq:['$$userID','$_id']
                            }
                        }
                    }
                ],
                as:'user'
            }
        },
        {
            $unwind:"$user"
        },
        {
            $lookup:{
                from:"courses",
                localField:"courseID",
                foreignField:"_id",
                as:"course"
            }
        },
        {
            $unwind:"$course"
        },
        {
            $lookup:{
                from:"examstudents",
                let:{
                    studentID:"$_id"
                },
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $eq:["$$studentID","$studentID"]
                            }
                        }
                    },
                    {
                        $lookup:{
                            from:"exams",
                            let:{
                                examID:"$examID"
                            },
                            pipeline:[
                                {
                                    $match:{
                                        $expr:{
                                            $eq:["$$examID","$_id"]
                                        }
                                    }
                                },
                                {
                                    $lookup:{
                                        from:"questions",
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
                                }
                            ],
                            as:"exam"
                        }
                    },
                    {
                        $unwind:"$exam"
                    },
                    {
                        $project:{
                            _id:0,
                            examID:1,
                            subjectID:1,
                            totalMarks:"$exam.totalMarks",
                            duration:"$exam.duration",
                            examDate:"$exam.examDate",
                            questions:"$exam.questions"
                        }
                    }
                ],
                as:"studentexams"
            }
        },
        {
            $project:{
                firstName:"$user.firstName",
                lastName:"$user.lastName",
                email:"$user.email",
                dob:"$dob",
                fatherName:"$fatherName",
                motherName:"$motherName",
                address:"$address",
                city:"$city",
                state:"$state",
                gender:"$gender",
                course:"$course.name",
                exams:"$studentexams"
            }
        }
    ]);

    return{
        status:statusCodes.SUCCESS,
        message:messages.DASHBOARD_LOADED_SUCCESSFULLY,
        data:{
            student:student
        }
    }
}