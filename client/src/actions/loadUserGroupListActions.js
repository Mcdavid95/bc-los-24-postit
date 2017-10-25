import axios from 'axios';
import * as types from '../../constant';

const loadGroupsSuccess = groups => ({ type: types.LOAD_GROUPS_SUCCESS, groups });

const loadGroupFailed = groups => ({ type: types.LOAD_GROUPS_FAILED, groups });

const getUserGroups = () => (dispatch) => {
  axios.get('/api/v1/user/groups')
    .then((response) => {
      dispatch(loadGroupsSuccess(response.data));
    })
    .catch((err) => {
      dispatch(loadGroupFailed(err));
    });
};
export default getUserGroups;
