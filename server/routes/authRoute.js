import express from 'express';
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
router.get('/api/user/logout', AuthCtrl.logout);

router.get('/api/users', AuthCtrl.listUsers);

export default router;
