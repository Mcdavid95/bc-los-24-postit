import { combineReducers } from 'redux';
import signup from './signupReducer';
import login from './loginReducer';
import setAuthToken from './authTokenReducer';
import addflashMessages from './flashMessageReducer';
import group from './createGroupReducer';
import userGroupList from './groupListReducer';
import groupMessages from './getMessagesReducer';
import postMessage from './postMessageReducer';
import addUser from './addUserToGroupReducer';
import allUsers from './getAllUsersReducer';
import forgotPassword from './forgotPassworrdReducer';
import resetPassword from './resetPasswordReducer';
import search from './searchUserReducer';

const rootReducer = combineReducers({
  signup,
  login,
  setAuthToken,
  addflashMessages,
  group,
  userGroupList,
  groupMessages,
  postMessage,
  addUser,
  allUsers,
  forgotPassword,
  resetPassword,
  search
});

export default rootReducer;
