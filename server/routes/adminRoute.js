const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

//post method
router.post('/dashboard', adminController.adminLogin);

//get method
router.get("/getUsers", adminController.getUsers); 


//delete method

router.delete('/delete/user/:userId', adminController.userDelete);



module.exports = router;