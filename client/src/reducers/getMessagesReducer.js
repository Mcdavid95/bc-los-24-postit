import * as types from '../../constant';
import initialState from '../initialState';

const getMessagesReducer = (state = initialState.groupMessages, action = {}) => {
  switch (action.type) {
    case types.GET_MESSAGES_SUCCESS:
      return [
        ...state, action.messages
      ];

    case types.GET_MESSAGES_FAILED:
      return state;

    default:
      return state;
  }
};

export default getMessagesReducer;
