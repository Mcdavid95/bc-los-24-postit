import { combineReducers } from 'redux';
import signup from './signupReducer';
import login from './loginReducer';
import setAuthToken from './authTokenReducer';
import addflashMessages from './flashMessageReducer';
import group from './createGroupReducer';
import userGroupList from './groupListReducer';

const rootReducer = combineReducers({
  signup,
  login,
  setAuthToken,
  addflashMessages,
  group,
  userGroupList
});

export default rootReducer;
