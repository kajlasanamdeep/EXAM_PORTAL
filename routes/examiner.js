const router = require('express').Router();
const { examiner } = require('../controllers');
const { ACCOUNT_TYPE } = require('../constant/APP_CONSTANTS');
const { validate, authorize } = require('../middelwares');
const { courseSchema, getStudentsSchema, addStudentSchema } = require('../validations/examiner');
const  verify  = require('../middelwares/verify')

router.post('/course', authorize(ACCOUNT_TYPE.EXAMINER), validate(courseSchema), examiner.createCourse);
router.get('/dashboard', authorize(ACCOUNT_TYPE.EXAMINER), examiner.getDashboard);
router.post('/student', authorize(ACCOUNT_TYPE.EXAMINER), validate(addStudentSchema), examiner.addStudent);
router.get('/students/:courseID', authorize(ACCOUNT_TYPE.EXAMINER), validate(getStudentsSchema), examiner.getStudents);
// router.post('/course/subject',authorize(ACCOUNT_TYPE.EXAMINER),examiner.addSubject);
module.exports = router;