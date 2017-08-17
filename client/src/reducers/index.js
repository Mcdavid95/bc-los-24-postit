import { combineReducers } from 'redux';
import signup from './signupReducer';
import login from './loginReducer';
import setAuthToken from './authTokenReducer';
import addflashMessages from './flashMessageReducer';

const rootReducer = combineReducers({
  signup,
  login,
  setAuthToken,
  addflashMessages
});

export default rootReducer;
