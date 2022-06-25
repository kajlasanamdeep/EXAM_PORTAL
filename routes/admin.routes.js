const UserAuthorized = require('../auth/UserAuthorized');
const controller = require('../controllers');

const router = require('express').Router();

router.get('/dashboard',UserAuthorized,controller.admin.getDashboard);
router.post('/examiner/action',UserAuthorized,controller.admin.approveOrDeclineExaminer);
router.get('/examiners/:status',UserAuthorized,controller.admin.getExaminers);

module.exports = router;