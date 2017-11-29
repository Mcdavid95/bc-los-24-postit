import * as types from '../constant';
import initialState from '../initialState';

const groupCurrentGroupReducer = (state = initialState.currentGroup, action = {}) => {
  switch (action.type) {
    case types.GET_CURRENTGROUP_SUCCESS:
      return action.groupName;

    case types.GET_CURRENTGROUP_FAILED:
      return [];

    default:
      return state;
  }
};

export default groupCurrentGroupReducer;
