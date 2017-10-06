import express from 'express';
import Verify from '../controllers/jwtVerify';


import AuthCtrl from '../controllers/authentication';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up logic
router.post('/api/v1/user/register', AuthCtrl.register);

// route to paginate all users
router.post('/api/v1/users/searchList/:offset', AuthCtrl.searchUser);

// Login logic

router.post('/api/v1/user/login', AuthCtrl.login);

// Add logout route
router.post('/api/v1/user/logout', AuthCtrl.logout);

router.get('/api/v1/users', Verify.hasToken, AuthCtrl.listUsers);

// forgot password api for the user
router.post('/api/v1/forgot-password', AuthCtrl.forgotPassoword);

// update user password
router.post('/api/v1/reset-password/:token', AuthCtrl.reset);

// authenticate reset password token
router.post('/api/v1/reset/token', AuthCtrl.authToken);


export default router;
