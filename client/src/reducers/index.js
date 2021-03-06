import { combineReducers } from 'redux';
import signup from './signupReducer';
import login from './loginReducer';
import setAuthToken from './authTokenReducer';
import group from './createGroupReducer';
import userGroupList from './groupListReducer';
import groupMessages from './getMessagesReducer';
import postMessage from './postMessageReducer';
import addUser from './addUserToGroupReducer';
import allUsers from './getAllUsersReducer';
import forgotPassword from './forgotPasswordReducer';
import resetPassword from './resetPasswordReducer';
import search from './searchUserReducer';
import groupMembers from './groupMembersReducer';
import currentGroup from './getCurrentGroupReducer';

const rootReducer = combineReducers({
  signup,
  login,
  setAuthToken,
  group,
  userGroupList,
  groupMessages,
  postMessage,
  addUser,
  allUsers,
  forgotPassword,
  resetPassword,
  search,
  groupMembers,
  currentGroup
});

export default rootReducer;
