import axios from 'axios';
import * as types from '../../constant';

const getMessageSuccess = messages => ({
  type: types.GET_MESSAGES_SUCCESS, messages
});

const getMessageFailed = messages => ({
  type: types.GET_MESSAGES_FAILED, messages
});

const getGroupMesssages = groupId =>
  dispatch =>
    axios.get(`/api/group/${groupId}/messages`)
      .then((response) => {
        dispatch(getMessageSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getMessageFailed(err));
      });

export default getGroupMesssages;

