const UserAuthorized = require('../auth/UserAuthorized');
const controller = require('../controllers');

const router = require('express').Router();

router.post('/Action',UserAuthorized,controller.admin.approveOrDeclineExaminer);

router.get('/pendingExaminers',UserAuthorized,controller.admin.getPendingExaminers);

module.exports = router;