import axios from 'axios';
import * as types from '../../constant';
import userGroups from './loadUserGroupListActions';

const createGroupSuccess = group => ({ type: types.CREATE_GROUP_SUCCESS, group });

const createGroupFailed = group => ({ type: types.CREATE_GROUP_ERROR, group });


const createGroupRequest = groupdata => dispatch => axios.post('/api/group', groupdata)
  .then((response) => {
    dispatch(createGroupSuccess(response));
    dispatch(userGroups());
    Materialize.toast(response.data.message, 3000, 'rounded, green');
  })
  .catch((response) => {
    dispatch(createGroupFailed(response));
    Materialize.toast(response.data.message, 3000, 'rounded red');
  });

export default createGroupRequest;
