import axios from 'axios';
import * as types from '../../constant';

const searchUserSuccess = users => ({ type: types.SEARCH_USERS_SUCCESS, users });

const searchUserFailed = users => ({ type: types.SEARCH_USERS_FAILED, users });

const searchUsers = (username, offset) => dispatch =>
  axios.post(`/api/v1/users/searchList/${offset}`, username)
    .then((response) => {
      dispatch(searchUserSuccess(response.data));
    })
    .catch((response) => {
      dispatch(searchUserFailed(response));
    });

export default searchUsers;
