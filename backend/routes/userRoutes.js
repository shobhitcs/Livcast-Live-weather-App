const express = require('express');
const { loginUser,signupUser,verifyUser }=require('../controllers/userController');
const router=express.Router();

//login routes
router.post('/login', loginUser)


//signup routes
router.post('/signup', signupUser)



//verify routes
router.post('/verify', verifyUser);
module.exports = router;