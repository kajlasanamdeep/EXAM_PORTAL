const router = require('express').Router();
const controller = require('../controllers').examiner;
const userAuthorization = require('../auth/user.authorization');
const verify = require('../middelwares/verify')

router.post('/course',userAuthorization,verify.isExaminer,controller.createCourse);
router.get('/dashboard',userAuthorization,verify.isExaminer,controller.getDashboard);
router.post('/student',userAuthorization,verify.isExaminer,controller.addStudent);
router.get('/students/:courseID',userAuthorization,verify.isExaminer, controller.getStudent);
router.post('/course/addsubject', controller.addSubject);

module.exports = router;