const router = require('express').Router();
const controller = require('../controllers').examiner;
const userAuthorization = require('../auth/user.authorization');

router.post('/course',userAuthorization,controller.createCourse);
router.get('/dashboard',userAuthorization,controller.getDashboard);
router.post('/student',userAuthorization,controller.addStudent);
router.get('/students/:courseID',userAuthorization,controller.getStudent);

module.exports = router;