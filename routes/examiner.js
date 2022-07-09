const router = require('express').Router();
const { examiner } = require('../controllers');
const { ACCOUNT_TYPE } = require('../constant/APP_CONSTANTS');
const { validate, authorize } = require('../middelwares');
const { addCourseSchema, getStudentsSchema, addStudentSchema, addSubjectSchema, getSubjectsSchema, createExamSchema } = require('../validations/examiner');

router.get('/dashboard', authorize(ACCOUNT_TYPE.EXAMINER), examiner.getDashboard);
router.post('/course', authorize(ACCOUNT_TYPE.EXAMINER), validate(addCourseSchema), examiner.createCourse);
router.post('/subjects', authorize(ACCOUNT_TYPE.EXAMINER), validate(addSubjectSchema), examiner.addSubjects);
router.post('/student', authorize(ACCOUNT_TYPE.EXAMINER), validate(addStudentSchema), examiner.addStudent);
router.get('/students/:courseID', authorize(ACCOUNT_TYPE.EXAMINER), validate(getStudentsSchema), examiner.getStudents);
router.get('/subjects/:courseID', authorize(ACCOUNT_TYPE.EXAMINER), validate(getSubjectsSchema),examiner.getSubjects);
router.post('/exam',authorize(ACCOUNT_TYPE.EXAMINER),validate(createExamSchema),examiner.createExam);
router.get('/exams',authorize(ACCOUNT_TYPE.EXAMINER),examiner.viewExam);

module.exports = router;