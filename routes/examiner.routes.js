const router = require('express').Router();
const controller = require('../controllers').examiner;
const userAuthorization = require('../auth/user.authorization');

router.post('/course',userAuthorization,controller.createCourse);
router.get('/dashboard',userAuthorization,controller.getDashboard)

module.exports = router;