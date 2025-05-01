// routes/authRoutes.js
const express = require('express');
const { signUp , signIn , user } = require('../controllers/authController');
const authMiddleware =require ('../middleware/authenticateJWT.js'); 

const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/user', authMiddleware, user); 

module.exports = router; 
