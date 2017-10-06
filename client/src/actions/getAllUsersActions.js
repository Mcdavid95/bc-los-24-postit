import axios from 'axios';
import * as types from '../../constant';

const getAllUsersSuccess = users => ({ type: types.GET_USERS_SUCCESS, users });

const getAllUsersFailed = users => ({ type: types.GET_USERS_FAILED, users });

const getAllUsers = () => dispatch =>
  axios.get('/api/v1/users')
    .then((response) => {
      dispatch(getAllUsersSuccess(response.data));
    })
    .catch((response) => {
      dispatch(getAllUsersFailed(response.data));
    });

export default getAllUsers;
