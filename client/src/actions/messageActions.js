import axios from 'axios';
import * as types from '../../constant';
import history from '../utils/History';

const postMessageSuccess = message => ({ type: types.POST_MESSAGE_SUCCESS, message });

const postMessageFailed = message => ({ type: types.POST_MESSAGE_FAILED, message });

/**
 * @function postMessageRequest
 * @param { number} groupId
 * @param { object } messageData
 * @returns {object} dispatches an action
 * @description It makes an api call to post message to a group
 */
export const postMessageRequest = (groupId, messageData) => dispatch => axios.post(`/api/v1/group/${groupId}/message`, messageData)
  .then((details) => {
    dispatch(postMessageSuccess(details));
  })
  .catch((err) => {
    dispatch(postMessageFailed(err));
    Materialize.toast('Sorry, something went wrong check your connection and try again', 5000, 'rounded red');
  });

const getMessageSuccess = messages => ({
  type: types.GET_MESSAGES_SUCCESS, messages
});

const getMessageFailed = messages => ({
  type: types.GET_MESSAGES_FAILED, messages
});

/**
 * @function getGroupMessages
 * @param { number } groupId
 * @returns {object} dispatches an action
 * @description It makes an api call to get all messages in the current group
 */
export const getGroupMessages = groupId =>
  dispatch =>
    axios.get(`/api/v1/group/${groupId}/messages`)
      .then((response) => {
        dispatch(getMessageSuccess(response.data.messages));
      })
      .catch((response) => {
        Materialize.toast('Group does not exist', 3000, 'rounded red');
        history.push('*');
        dispatch(getMessageFailed(response));
      });
