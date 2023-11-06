const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const upload = require("../services/multer");




router.post('/register',userController.userReg);
router.post('/login',userController.userLogin);
router.post('/api/:id/editProfile',upload.single('image'),userController.editUser);


module.exports = router;