import express from 'express';
import jwtVerify from '../utils/jwtVerify';
import GroupCtrl from '../controllers/groupCtrl';
import MessageCtrl from '../controllers/messageCtrl';

const router = express.Router();

// ======================
// GROUP ROUTES
// ======================

// create group
router.post('/api/v1/group', jwtVerify.hasToken, GroupCtrl.createGroup);

// fetch all groups
router.get('/api/v1/groups', jwtVerify.hasToken, GroupCtrl.listGroups);

// add user to group
router.post('/api/v1/group/:groupId/user', jwtVerify.hasToken, GroupCtrl.addGroupMember);

// fetch users in a group
router.get('/api/v1/group/:groupId/users', jwtVerify.hasToken, GroupCtrl.ListGroupMembers);

// post message to group
router.post('/api/v1/group/:groupId/message', jwtVerify.hasToken, MessageCtrl.postMessage);

// fetch all messages in group
router.get('/api/v1/group/:groupId/messages', jwtVerify.hasToken, MessageCtrl.listMessages);

// fetch all groups of a single user
router.get('/api/v1/user/groups', jwtVerify.hasToken, GroupCtrl.listUserGroups);

// get current groupName
router.get('/api/v1/group/:groupId', jwtVerify.hasToken, GroupCtrl.getCurrentGroup);


export default router;
