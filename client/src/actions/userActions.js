import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../../constant';
import history from '../utils/History';
import setAuthToken from '../utils/setAuthToken';

const signupUserSuccess = user => ({ type: types.SIGNUP_USER, user });

const signupUserFail = user => ({ type: types.SIGNUP_USER_ERROR, user });


export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

export const userSignupRequest = userData => dispatch => axios.post('/api/v1/user/register', userData)
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

const userLoginSuccess = user => ({ type: types.LOGIN_USER, user });

const userLoginFailed = user => ({ type: types.LOGIN_USER_ERROR, user });


export const userLoginRequest = userData => dispatch => axios.post('/api/v1/user/login', userData)
  .then((response) => {
    dispatch(userLoginSuccess(response));
    const token = response.data.myToken;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token))
    );

    Materialize.toast(response.data.message, 3000, 'rounded green');
    history.push('/dashboard');
  })
  .catch((err) => {
    dispatch(userLoginFailed(err));
    Materialize.toast(err.response.data.message, 3000, 'rounded red');
  });


const logoutSuccess = user => ({
  type: types.LOGOUT_USER,
  user
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(logoutSuccess());
  history.push('/login');
};

const getAllUsersSuccess = users => ({ type: types.GET_USERS_SUCCESS, users });

const getAllUsersFailed = users => ({ type: types.GET_USERS_FAILED, users });

export const getAllUsers = () => dispatch =>
  axios.get('/api/v1/users')
    .then((response) => {
      dispatch(getAllUsersSuccess(response.data));
    })
    .catch((response) => {
      dispatch(getAllUsersFailed(response.data));
    });

const searchUserSuccess = users => ({ type: types.SEARCH_USERS_SUCCESS, users });

const searchUserFailed = users => ({ type: types.SEARCH_USERS_FAILED, users });

export const searchUsers = (username, offset) => dispatch =>
  axios.post(`/api/v1/users/searchList/${offset}`, username)
    .then((response) => {
      dispatch(searchUserSuccess(response.data));
    })
    .catch((response) => {
      dispatch(searchUserFailed(response));
    });

const confirmEmailSuccess = email => ({
  type: types.CONFIRM_EMAIL_SUCCESS, email
});

const confirmEmailFailed = email => ({
  type: types.CONFIRM_EMAIL_FAILED, email
});

export const forgotPassword = email => dispatch =>
  axios.post('/api/v1/forgot-password', email)
    .then((response) => {
      dispatch(confirmEmailSuccess(response));
      Materialize.toast('A Link has been sent to your mail to reset your email /n It expires after 30mins', 6000, 'rounded, green');
      history.push('/login');
    })
    .catch((err) => {
      dispatch(confirmEmailFailed(err));
      Materialize.toast(err.response.data.message, 3000, 'rounded red');
    });

const confirmPasswordResetSuccess = password => ({
  type: types.RESET_PASSWORD_SUCCESS, password
});

const confirmPasswordResetFailed = password => ({
  type: types.RESET_PASSWORD_FAILED, password
});

export const confirmPasswordResetRequest = (token, newPassword) => dispatch =>
  axios.post(`/api/v1/reset-password/${token}`, newPassword)
    .then((response) => {
      dispatch(confirmPasswordResetSuccess(response));
      Materialize.toast('Password reset successful', 6000, 'rounded, green');
      history.push('/login');
    })
    .catch((err) => {
      dispatch(confirmPasswordResetFailed(err));
      Materialize.toast(err.response.data.message, 3000, 'rounded red');
    });