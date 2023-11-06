const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');


router.post('/dashboard', adminController.adminLogin);
router.get("/getUsers", adminController.getUsers); 

module.exports = router;