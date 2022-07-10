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
                                                options: "$options"
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
                        $lookup:{
                            from:"subjects",
                            let:{
                                subjectID:"$subjectID"
                            },
                            pipeline:[
                                {
                                    $match:{
                                        $expr:{
                                            $eq:["$$subjectID","$_id"]
                                        }
                                    }
                                },
                                {
                                    $lookup:{
                                        from:"courses",
                                        let:{
                                            courseID:"$courseID"
                                        },
                                        pipeline:[
                                            {
                                                $match:{
                                                    $expr:{
                                                        $eq:["$$courseID","$_id"]
                                                    }
                                                }
                                            }
                                        ],
                                        as:"course"
                                    }
                                },
                                {
                                    $unwind:"$course"
                                }
                            ],
                            as:"subject"
                        }
                    },
                    {
                        $unwind:"$subject"
                    },
                    {
                        $project:{
                            _id:0,
                            examID:1,
                            studentID:1,
                            subject:"$subject.name",
                            course:"$subject.course.name",
                            totalMarks:"$exam.totalMarks",
                            startTime:"$exam.startTime",
                            endTime:"$exam.endTime",
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
            $group:{
                _id:"$userID",
                courses:{$push:"$course.name"},
                firstName:{$first:"$user.firstName"},
                lastName:{$first:"$user.lastName"},
                email:{$first:"$user.email"},
                dob:{$first:"$dob"},
                fatherName:{$first:"$fatherName"},
                motherName:{$first:"$motherName"},
                address:{$last:"$address"},
                city:{$last:"$city"},
                state:{$last:"$state"},
                gender:{$first:"$gender"},
                exams:{$push:"$studentexams"}
            }
        },
        {
            $unwind:"$exams"
        },
        {
            $project:{
                _id:0,
                userID:"$_id",
                firstName:"$firstName",
                lastName:"$lastName",
                email:"$email",
                dob:"$email",
                fatherName:"$fatherName",
                motherName:"$motherName",
                address:"$address",
                city:"$city",
                state:"$state",
                gender:"$gender",
                courses:"$courses",
                exams:"$exams"
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