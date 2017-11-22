import * as types from '../../constant';
import initialState from '../initialState';

const userGroupsReducer = (state = initialState.userGroupList, action = {}) => {
  switch (action.type) {
    case types.LOAD_GROUPS_SUCCESS:
      return [
        ...state,
        action.groups
      ];

    case types.LOAD_GROUPS_FAILED:
      return [];

    default:
      return state;
  }
};

export default userGroupsReducer;
