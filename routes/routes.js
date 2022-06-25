const router = require('express').Router();
const controller = require('../controllers').user;

router.post('/login',controller.login);
router.post('/register',controller.register);

module.exports = router;