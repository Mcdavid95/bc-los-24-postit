import * as types from '../../constant';
import initialState from '../initialState';

const createGroupReducer = (state = initialState.group, action = {}) => {
  switch (action.type) {
    case types.CREATE_GROUP:
      return [
        state,
        Object.assign({}, action.groupData)
      ];

    case types.CREATE_GROUP_ERROR:
      return [
        state,
        Object.assign({}, action.groupData)
      ];

    default:
      return state;
  }
};

export default createGroupReducer;
