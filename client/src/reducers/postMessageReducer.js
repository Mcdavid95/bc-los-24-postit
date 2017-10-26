import * as types from '../../constant';
import initialState from '../initialState';

const postMessageReducer = (state = initialState.postMessage, action) => {
  switch (action.type) {
    case types.POST_MESSAGE_SUCCESS:
      return [
        ...state, action
      ];

    case types.POST_MESSAGE_FAILED:
      return [];

    default:
      return state;
  }
};

export default postMessageReducer;
