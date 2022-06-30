const router = require('express').Router();
const { validate } = require('../middelwares');
const { user } = require('../controllers');
const { userLoginSchema, userRegistrationSchema } = require('../validations/user');

router.post('/login', validate(userLoginSchema), user.login);
router.post('/register', validate(userRegistrationSchema), user.register);

module.exports = router;