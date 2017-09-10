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
  allUsers
});

export default rootReducer;
