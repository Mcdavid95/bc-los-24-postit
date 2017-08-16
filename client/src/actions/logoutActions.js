import setCurrentUser from './currentUserActions';
import setAuthToken from '../reducers/authTokenReducer';
import { LOGOUT_USER } from '../../constant';
import history from '../utils/History';

const logoutSuccess = user => ({
  type: LOGOUT_USER,
  user
});

const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(logoutSuccess());
  history.push('/api/user/login');
};

export default logout;

