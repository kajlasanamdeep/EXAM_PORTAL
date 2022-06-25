const router = require('express').Router();
const controller = require('../controllers').admin;
const userAuthorization = require('../auth/user.authorization');

router.get('/dashboard',userAuthorization,controller.getDashboard);
router.get('/examiners/:status',userAuthorization,controller.getExaminers);
router.post('/examiner/action',userAuthorization,controller.approveOrDeclineExaminer);

module.exports = router;