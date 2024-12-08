const express = require('express');
const { registerController, loginController, logoutController } = require('../controllers/authController');
// router object
const router = express.Router();
// routes

// 1.register
router.post('/register',registerController);
// 2.login
router.post('/login',loginController);
// 3.logout 
router.post('/logout',logoutController);

module.exports = router;