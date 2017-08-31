import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as types from '../../constant';
import history from '../utils/History';
import setAuthToken from '../utils/setAuthToken';
import setCurrentUser from './currentUserActions';
import groupListActions from './loadUserGroupListActions';

const userLoginSuccess = user => ({ type: types.LOGIN_USER, user });

const userLoginFailed = user => ({ type: types.LOGIN_USER_ERROR, user });


const userLoginRequest = userData => dispatch => axios.post('/api/user/login', userData)
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
  .catch((response) => {
    dispatch(userLoginFailed(response));
    Materialize.toast(response.data.message, 3000, 'rounded red');
  });
export default userLoginRequest;
