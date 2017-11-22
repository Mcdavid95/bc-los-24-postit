import * as types from '../../constant';
import initialState from '../initialState';

const createGroupReducer = (state = initialState.group, action = {}) => {
  switch (action.type) {
    case types.CREATE_GROUP_SUCCESS:
      return [
        ...state, action
      ];

    case types.CREATE_GROUP_ERROR:
      return [];

    default:
      return state;
  }
};

export default createGroupReducer;
