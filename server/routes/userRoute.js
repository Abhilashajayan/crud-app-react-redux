const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');


router.post('/register',userController.userReg);
router.post('/login',userController.userLogin);

module.exports = router;