import axios from 'axios';
import * as types from '../../constant';
import userGroups from './loadUserGroupListActions';
import history from '../utils/History';

const createGroupSuccess = group => ({ type: types.CREATE_GROUP_SUCCESS, group });

const createGroupFailed = group => ({ type: types.CREATE_GROUP_ERROR, group });


const createGroupRequest = groupdata => dispatch => axios.post('/api/v1/group', groupdata)
  .then((response) => {
    dispatch(createGroupSuccess(response));
    dispatch(userGroups());
    Materialize.toast(response.data.message, 3000, 'rounded, green');
    history.push('dashboard');
  })
  .catch((err) => {
    dispatch(createGroupFailed(err));
    Materialize.toast(err.response.data.message, 3000, 'rounded red');
  });

export default createGroupRequest;
