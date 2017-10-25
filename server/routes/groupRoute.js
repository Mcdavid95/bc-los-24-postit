import express from 'express';
import Verify from '../controllers/jwtVerify';
import GroupCtrl from '../controllers/groupCtrl';
import MessageCtrl from '../controllers/messageCtrl';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// create group
router.post('/api/v1/group', Verify.hasToken, GroupCtrl.createGroup);

// fetch all groups
router.get('/api/v1/groups', Verify.hasToken, GroupCtrl.listGroups);

// add user to group

router.post('/api/v1/group/:groupId/user', Verify.hasToken, GroupCtrl.addGroupMember);

// fetch users in a group
router.get('/api/v1/group/:groupId/users', Verify.hasToken, GroupCtrl.ListGroupMembers);

// post message to group
router.post('/api/v1/group/:groupId/message', Verify.hasToken, MessageCtrl.postMessage);

// fetch all messages in group
router.get('/api/v1/group/:groupId/messages', Verify.hasToken, MessageCtrl.listMessages);

// fetch all groups of a single user
router.get('/api/v1/user/groups', Verify.hasToken, GroupCtrl.listUserGroups);


export default router;
