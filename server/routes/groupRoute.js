import express from 'express';
import GroupCtrl from '../controllers/groupCtrl';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// create group
router.post('/api/group', GroupCtrl.createGroup);

// add user to group

router.post('/api/group/:id/user', GroupCtrl.groupMember);

// post message to group
router.get('/api/group/:id/message', GroupCtrl.message);

// fetch all messages in group
router.get('/api/group/:id/messages', GroupCtrl.listMessages);

export default router;
