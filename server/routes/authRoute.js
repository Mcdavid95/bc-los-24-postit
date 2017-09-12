import express from 'express';
import Verify from '../controllers/jwtVerify';


import AuthCtrl from '../controllers/authentication';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up logic
router.post('/api/user/register', AuthCtrl.register);

// Login logic

router.post('/api/user/login', AuthCtrl.login);

// Add logout route
router.post('/api/user/logout', AuthCtrl.logout);

router.get('/api/users', Verify.hasToken, AuthCtrl.listUsers);

// forgot password api for the user
router.post('/api/forgot/password', AuthCtrl.forgotPassoword);

// update user password
router.post('/api/reset/password/:token', AuthCtrl.reset);

// authenticate reset password token
router.post('/api/reset/token', AuthCtrl.authToken);

export default router;
