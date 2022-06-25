const controller = require('../controllers');

const router = require('express').Router();

router.post('/register',controller.user.register);

router.post('/login',controller.user.login);

module.exports = router;