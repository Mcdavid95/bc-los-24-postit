import axios from 'axios';
import * as types from '../../constant';

const postMessageSuccess = message => ({ type: types.POST_MESSAGE_SUCCESS, message });

const postMessageFailed = message => ({ type: types.POST_MESSAGE_FAILED, message });

const postMessageRequest = (groupId, messageData) => dispatch => axios.post(`/api/v1/group/${groupId}/message`, messageData)
  .then((details) => {
    dispatch(postMessageSuccess(details));
  })
  .catch((err) => {
    dispatch(postMessageFailed(err));
    Materialize.toast('Sorry, something went wrong check your connection and try again', 5000, 'rounded red');
  });
export default postMessageRequest;
