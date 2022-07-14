const router = require('express').Router();
const { student } = require('../controllers');
const { ACCOUNT_TYPE } = require('../constant/APP_CONSTANTS');
const { validate, authorize } = require('../middelwares');
const { accessExamSchema } = require('../validations/student');

router.get('/dashboard', authorize(ACCOUNT_TYPE.STUDENT), student.getDashboard);
router.get('/exams', authorize(ACCOUNT_TYPE.STUDENT), student.getExams);
router.post('/exam', authorize(ACCOUNT_TYPE.STUDENT), validate(accessExamSchema), student.accessExam);

module.exports = router;