import express from 'express';
import jwtVerify from '../utils/jwtVerify';


import userController from '../controllers/userController';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up route
router.post('/api/v1/user/register', userController.register);

// route to paginate all users
router.post('/api/v1/users/searchList', userController.searchUser);

// Login route

router.post('/api/v1/user/login', userController.login);

// Logout route
router.post('/api/v1/user/logout', userController.logout);

// Get all registered Users route
router.get('/api/v1/users', jwtVerify.hasToken, userController.listUsers);

// forgot password api for the user route
router.post('/api/v1/forgot-password', userController.forgotPassoword);

// update user password route
router.post('/api/v1/reset-password/:token', userController.reset);

export default router;
