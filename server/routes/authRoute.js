import express from 'express';
import Verify from '../controllers/jwtVerify';


import AuthCtrl from '../controllers/authentication';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up route
router.post('/api/v1/user/register', AuthCtrl.register);

// route to paginate all users
router.post('/api/v1/users/searchList', AuthCtrl.searchUser);

// Login route

router.post('/api/v1/user/login', AuthCtrl.login);

// Logout route
router.post('/api/v1/user/logout', AuthCtrl.logout);

// Get all registered Users route
router.get('/api/v1/users', Verify.hasToken, AuthCtrl.listUsers);

// forgot password api for the user route
router.post('/api/v1/forgot-password', AuthCtrl.forgotPassoword);

// update user password route
router.post('/api/v1/reset-password/:token', AuthCtrl.reset);

export default router;
