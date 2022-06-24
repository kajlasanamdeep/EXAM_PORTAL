const {adminController} = require('../controllers');

const router = require('express').Router();

router.get('/pendingExaminers',adminController.pendingExaminers);


module.exports = router;