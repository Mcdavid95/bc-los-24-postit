import axios from 'axios';
import * as types from '../../constant';

const searchUserSuccess = users => ({ type: types.SEARCH_USERS_SUCCESS, users });

const searchUserFailed = users => ({ type: types.SEARCH_USERS_FAILED, users });

const searchUsers = (page, username) => dispatch =>
  axios.post(`/api/users/searchList/${page}`, username)
    .then((response) => {
      dispatch(searchUserSuccess(response.data.result));
    })
    .catch((response) => {
      dispatch(searchUserFailed(response));
    });

export default searchUsers;
