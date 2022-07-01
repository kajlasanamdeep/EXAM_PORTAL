const router = require('express').Router();
const controller = require('../controllers').admin;
const userAuthorization = require('../auth/user.authorization');
const verify = require('../middelwares/verify')

router.get('/dashboard',userAuthorization,verify.isAdmin,controller.getDashboard);
router.get('/examiners/:status',userAuthorization,verify.isAdmin,controller.getExaminers);
router.put('/examiner/action',userAuthorization,verify.isAdmin,controller.approveOrDeclineExaminer);

module.exports = router;