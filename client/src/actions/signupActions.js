import axios from 'axios';
import * as types from '../../constant';
import history from '../utils/History';

const signupUserSuccess = (user) => {
  return { type: types.SIGNUP_USER, user };
};

const signupUserFail = (user) => {
  return { type: types.SIGNUP_USER_ERROR, user };
};

const userSignupRequest = userData => dispatch => axios.post('/api/user/register', userData)
  .then((response) => {
    dispatch(signupUserSuccess(response));
    Materialize.toast(response.data.message, 3000, 'rounded green');
    history.push('/login');
  }).catch((err) => {
    dispatch(signupUserFail(err));
    Materialize.toast(err.response.data.message, 3000, 'rounded red');
  });
export default userSignupRequest;
