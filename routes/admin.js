const router = require('express').Router();
const { admin } = require('../controllers');
const { ACCOUNT_TYPE } = require('../constant/APP_CONSTANTS');
const { actionSchema } = require('../validations/admin');
const { validate, authorize } = require('../middelwares');

router.get('/dashboard', authorize(ACCOUNT_TYPE.ADMIN), admin.getDashboard);
router.get('/examiners/:status', authorize(ACCOUNT_TYPE.ADMIN), admin.getExaminers);
router.put('/examiner/action', authorize(ACCOUNT_TYPE.ADMIN), validate(actionSchema), admin.approveOrDeclineExaminer);

module.exports = router;