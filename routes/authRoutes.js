// routes/authRoutes.js
const express = require('express');
const { signUp , signIn , user } = require('../controllers/authController');
const authMiddleware =require ('../middleware/authenticateJWT.js'); 

const { getAllUsers,deleteUser,updateUser }= require('../controllers/ADuserController.js'); 
// const authMiddleware = require('../middleware/auth.js'); 


const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/user', authMiddleware, user); 

router.get('/admin/users', authMiddleware, getAllUsers);
router.delete('/admin/users/:id', authMiddleware, deleteUser);
router.put('/admin/users/:id', authMiddleware, updateUser);


module.exports = router; 
