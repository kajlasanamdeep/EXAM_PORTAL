const router = require('express').Router();
const { student } = require('../controllers');
const { ACCOUNT_TYPE } = require('../constant/APP_CONSTANTS');
const { validate, authorize } = require('../middelwares');
const {  } = require('../validations/student');

router.get('/dashboard', authorize(ACCOUNT_TYPE.STUDENT), student.getDashboard);

module.exports = router;