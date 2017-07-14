import express from 'express';
import Verify from '../controllers/jwtVerify';
import GroupCtrl from '../controllers/groupCtrl';
import MessageCtrl from '../controllers/messageCtrl';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// create group
router.post('/api/group', Verify.hasToken, GroupCtrl.createGroup);

router.get('/api/groups', Verify.hasToken, GroupCtrl.listGroups);

// add user to group

router.post('/api/group/:groupId/user', Verify.hasToken, GroupCtrl.groupMember);

// post message to group
router.post('/api/group/:groupId/message', Verify.hasToken, MessageCtrl.postMessage);

// fetch all messages in group
router.get('/api/group/:groupId/messages', Verify.hasToken, MessageCtrl.listMessages);

export default router;
