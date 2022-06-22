const controller = require('../controllers/user.controllers');

const router = require('express').Router();

router.post('/register',controller.register);

module.exports = router;