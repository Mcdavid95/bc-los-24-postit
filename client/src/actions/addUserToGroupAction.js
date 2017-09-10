import axios from 'axios';
import * as types from '../../constant';

const addUserSuccess = username => ({ type: types.ADD_USER_TO_GROUP_SUCCESS, username });

const addUserFailed = username => ({ type: types.ADD_USER_TO_GROUP_FAILED, username });

const addUserRequest = (userData, groupId) => dispatch => axios.post(`/api/group/${groupId}/user`, userData)
  .then((response) => {
    dispatch(addUserSuccess(response));
  })
  .catch((err) => {
    dispatch(addUserFailed(err));
  });

export default addUserRequest;
