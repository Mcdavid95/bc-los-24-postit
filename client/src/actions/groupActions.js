import axios from 'axios';
import * as types from '../../constant';
import history from '../utils/History';

const createGroupSuccess = group => ({ type: types.CREATE_GROUP_SUCCESS, group });

const createGroupFailed = group => ({ type: types.CREATE_GROUP_ERROR, group });


const loadGroupsSuccess = groups => ({ type: types.LOAD_GROUPS_SUCCESS, groups });

const loadGroupFailed = groups => ({ type: types.LOAD_GROUPS_FAILED, groups });

/**
 * @function getUserGroups
 * @returns {object} dispatches an action
 * @description It makes an api call to get groups belonging to the loggedIn user
 */
export const getUserGroups = () => (dispatch) => {
  axios.get('/api/v1/user/groups')
    .then((response) => {
      dispatch(loadGroupsSuccess(response.data));
    })
    .catch((err) => {
      Materialize.toast('Sorry your session expired please login', 3000, 'rounded red');
      history.push('/login');
      dispatch(loadGroupFailed(err));
    });
};

/**
 * @function createGroupRequest
 * @param {object} groupdata
 * @returns {object} dispatches an action
 * @description It makes an api call to create a new user and dispatches the action
 */
export const createGroupRequest = groupdata => dispatch => axios.post('/api/v1/group', groupdata)
  .then((response) => {
    dispatch(createGroupSuccess(response));
    dispatch(getUserGroups());
    Materialize.toast(response.data.message, 3000, 'rounded, green');
    history.push('/dashboard');
  })
  .catch((err) => {
    dispatch(createGroupFailed(err));
    Materialize.toast(err.response.data.message, 3000, 'rounded red');
  });


const addUserSuccess = username => ({ type: types.ADD_USER_TO_GROUP_SUCCESS, username });

const addUserFailed = username => ({ type: types.ADD_USER_TO_GROUP_FAILED, username });

/**
 * @function addUserRequest
 * @param { object } userData
 * @param { number} groupId
 * @returns {object} dispatches an action
 * @description It makes an api call to add a user to the current group
 */
export const addUserRequest = (userData, groupId) => dispatch => axios.post(`/api/v1/group/${groupId}/user`, userData)
  .then((response) => {
    dispatch(addUserSuccess(response));
    Materialize.toast(response.data.message, 3000, 'rounded, green');
  })
  .catch((err) => {
    dispatch(addUserFailed(err));
    Materialize.toast(err.response.data.Error, 3000, 'rounded red');
  });
