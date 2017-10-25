import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../../constant';
import history from '../utils/History';
import setAuthToken from '../utils/setAuthToken';
import setCurrentUser from './currentUserActions';

const signupUserSuccess = user => ({ type: types.SIGNUP_USER, user });

const signupUserFail = user => ({ type: types.SIGNUP_USER_ERROR, user });

const userSignupRequest = userData => dispatch => axios.post('/api/v1/user/register', userData)
  .then((response) => {
    dispatch(signupUserSuccess(response));
    const token = response.data.myToken;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token))
    );
    Materialize.toast(response.data.message, 3000, 'rounded green');
    history.push('/dashboard');
  }).catch((err) => {
    dispatch(signupUserFail(err));
    Materialize.toast(err.response.data.message, 3000, 'rounded red');
  });
export default userSignupRequest;
