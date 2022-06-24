const UserAuthorized = require('../auth/UserAuthorized');
const controller = require('../controllers');

const router = require('express').Router();

router.post('/Action',UserAuthorized,controller.admin.approveOrDeclineExaminer);
router.get('/:getExaminers',UserAuthorized,controller.admin.getExaminers);

module.exports = router;