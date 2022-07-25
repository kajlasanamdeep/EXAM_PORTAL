const mongoose = require("mongoose");
const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const Model = require("../models");
const statusCodeList = require("../statusCodes/statusCodes");
const statusCodes = statusCodeList.STATUS_CODE;
const messageList = require("../messages/messages");
const universalFunction = require("../lib/universal-function");
const messages = messageList.MESSAGES;
const [date,] = new Date(Date.now() + (5 * 3600000 + 1800000)).toISOString().split('T');

module.exports.getDashboard = async function (req) {
    try {
        let user = req.loggedUser;
        let student = await Model.students.aggregate([
            {
                $match: { userID: mongoose.Types.ObjectId(user._id) }
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
                                    $eq: ['$$userID', '$_id']
                                }
                            }
                        }
                    ],
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            {
                $group:{
                    _id:"$userID",
                    firstName: { $first: "$user.firstName" },
                    lastName: { $first: "$user.lastName" },
                    email: { $first: "$user.email" },
                    dob: { $first: "$dob" },
                    fatherName: { $first: "$fatherName" },
                    motherName: { $first: "$motherName" },
                    address: { $last: "$address" },
                    city: { $last: "$city" },
                    state: { $last: "$state" },
                    gender: { $first: "$gender" },
                    studentID:{$push:"$_id"}
                }
            },
            {
                $lookup: {
                    from: "examstudents",
                    let: {
                        studentID: "$studentID"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$studentID", "$$studentID"]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "exams",
                                let: {
                                    examID: "$examID"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            examDate: {
                                                $gte: new Date(date)
                                            },
                                            $expr: {
                                                $eq: ["$$examID", "$_id"]
                                            }
                                        }
                                    },
                                ],
                                as: "exam"
                            }
                        },
                        {
                            $unwind: "$exam"
                        },
                        {
                            $lookup: {
                                from: "subjects",
                                let: {
                                    subjectID: "$subjectID"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$$subjectID", "$_id"]
                                            }
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "courses",
                                            let: {
                                                courseID: "$courseID"
                                            },
                                            pipeline: [
                                                {
                                                    $match: {
                                                        $expr: {
                                                            $eq: ["$$courseID", "$_id"]
                                                        }
                                                    }
                                                }
                                            ],
                                            as: "course"
                                        }
                                    },
                                    {
                                        $unwind: "$course"
                                    }
                                ],
                                as: "subject"
                            }
                        },
                        {
                            $unwind: "$subject"
                        },
                        {
                            $project: {
                                _id: 0,
                                examID: 1,
                                studentID: 1,
                                subject: "$subject.name",
                                course: "$subject.course.name",
                                totalMarks: "$exam.totalMarks",
                                startTime: "$exam.startTime",
                                endTime: "$exam.endTime",
                                duration: "$exam.duration",
                                examDate: "$exam.examDate",
                            }
                        }
                    ],
                    as: "studentexams"
                }
            },
            {
                $project:{
                    _id:0,
                    studentID:0
                }
            }
        ]);

        return {
            status: statusCodes.SUCCESS,
            message: messages.DASHBOARD_LOADED_SUCCESSFULLY,
            data: {
                student: student
            }
        }
    }
    catch (error) {

        throw error;

    }
}

module.exports.getExams = async function (req) {
    try {
        let user = req.loggedUser;
        let studentexams = await Model.students.aggregate([
            {
                $match: { userID: mongoose.Types.ObjectId(user._id) }
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
                                    $eq: ['$$userID', '$_id']
                                }
                            }
                        }
                    ],
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            {
                $group:{
                    _id:"$userID",
                    studentID:{$push:"$_id"}
                }
            },
            {
                $lookup: {
                    from: "examstudents",
                    let: {
                        studentID: "$studentID"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$studentID", "$$studentID"]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "exams",
                                let: {
                                    examID: "$examID"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            examDate: new Date(date),
                                            $expr: {
                                                $eq: ["$$examID", "$_id"]
                                            }
                                        }
                                    },
                                ],
                                as: "exam"
                            }
                        },
                        {
                            $unwind: "$exam"
                        },
                        {
                            $lookup: {
                                from: "subjects",
                                let: {
                                    subjectID: "$subjectID"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$$subjectID", "$_id"]
                                            }
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: "courses",
                                            let: {
                                                courseID: "$courseID"
                                            },
                                            pipeline: [
                                                {
                                                    $match: {
                                                        $expr: {
                                                            $eq: ["$$courseID", "$_id"]
                                                        }
                                                    }
                                                }
                                            ],
                                            as: "course"
                                        }
                                    },
                                    {
                                        $unwind: "$course"
                                    }
                                ],
                                as: "subject"
                            }
                        },
                        {
                            $unwind: "$subject"
                        },
                        {
                            $project: {
                                _id: 0,
                                examID: 1,
                                studentID: 1,
                                subject: "$subject.name",
                                course: "$subject.course.name",
                                totalMarks: "$exam.totalMarks",
                                startTime: "$exam.startTime",
                                endTime: "$exam.endTime",
                                duration: "$exam.duration",
                                examDate: "$exam.examDate",
                            }
                        }
                    ],
                    as: "studentexams"
                }
            },
            {
                $project:{
                    studentexams:1,
                    _id:0
                }
            }
        ]);

        return {
            status: statusCodes.SUCCESS,
            message: messages.EXAM_LOADED_SUCCESSFULLY,
            data: {
                ...studentexams
            }
        }
    }
    catch (error) {

        throw error;

    }
}

module.exports.accessExam = async function (req) {
    try {
        let payload = req.body;
        let exam = await Model.exams.findById(payload.examID);
        let student = await Model.students.findById(payload.studentID);
        let examStudent = await Model.examstudents.findOne({ examID: payload.examID, studentID: payload.studentID });
        if (!exam) return {
            status: statusCodes.NOT_FOUND,
            message: messages.EXAM_NOT_FOUND
        }
        if (!student) return {
            status: statusCodes.NOT_FOUND,
            message: messages.STUDENT_NOT_FOUND
        }
        if (!examStudent) return {
            status: statusCodes.FORBIDDEN,
            message: messages.STUDENT_NOT_ALLOWDED_TO_TAKE_EXAM
        }
        if (payload.accessCode != exam.accessCode) return {
            status: statusCodes.FORBIDDEN,
            message: messages.INVALID_EXAM_ACCESS_CODE
        }
        if (exam.examDate.getTime() != new Date(date).getTime() ) return {
            status: statusCodes.FORBIDDEN,
            message: messages.EXAM_ONLY_ACCESSED_ON_EXAMDATE
        }
       
        if (exam.durationStatus == APP_CONSTANTS.DURATION_STATUS.OVER) return {
            status: statusCodes.FORBIDDEN,
            message: messages.EXAM_ALREADY_COMPLETED
        }

        exam = await Model.exams.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(exam._id)
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
                                    $eq: ["$$id", "$examID"]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                questionID: "$_id",
                                question: "$question",
                                marks: "$marks",
                                options: "$options",
                            }
                        }
                    ],
                    as: "questions"
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
                $unwind: "$subject"
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "subject.courseID",
                    foreignField: "_id",
                    as: "course"
                }
            },
            {
                $unwind: "$course"
            },
            {
                $project: {
                    _id: 0,
                    examID: "$_id",
                    course: "$course.name",
                    subject: "$subject.name",
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
            status:statusCodes.SUCCESS,
            message:messages.EXAM_LOADED_SUCCESSFULLY,
            data:{
                studentID:student._id,
                exam:exam[0]
            }
        }
    } catch (error) {

        throw error;

    }
}

module.exports.answer = async function (req){
    try{

        let payload = req.body;
        let attemptedQs=[];
        let notattemptedQs=[];
        payload.answers.forEach(element => {
        if(element.answer){
            attemptedQs.push({
                'studentID':element.studentID,
                'questionID':element.questionID,
                'answer':element.answer,
                'status':"ATTEMPTED"
                            });
        }else{
            notattemptedQs.push({
                'studentID':element.studentID,
                'questionID':element.questionID,
                'status':"NOT_ATTEMPTED"
            })
        }

        });
       
        let canswers = [];
        let answers;
        for(let i= 0;i < attemptedQs.length; i++ ){
           answers = await Model.questions.findById(attemptedQs[i].questionID);
           canswers.push({ 'questionID':answers._id,
            'answer':answers.correctOption});
        }
        
        let Answers = [];
        for(let x=0; x < attemptedQs.length ; x++){
            if(attemptedQs[x].questionID === canswers[x].questionID.toString() && attemptedQs[x].answer === canswers[x].answer){
                attemptedQs[x]['correct'] = true;
                Answers.push(attemptedQs[x]);
            }else{
                attemptedQs[x]['correct'] = false;
                Answers.push(attemptedQs[x]);
               
            }
           
        }

        for(let y = 0 ; y < notattemptedQs.length ; y++){
            Answers.push(notattemptedQs[y])
        }
          
        for(let z = 0; z < payload.answers.length; z++){
            let ans = await Model.answers.create(Answers[z]);
            console.log(ans);
        }

        return {
            status:statusCodes.SUCCESS,
            message:messages.EXAM_SUBMITTED_SUCCESSFULLY
        }
        
    } catch (error) {

        throw error;

    }

} 