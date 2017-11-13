import * as types from '../../constant';
import initialState from '../initialState';

const groupMembersReducer = (state = initialState.groupMembers, action = {}) => {
  switch (action.type) {
    case types.GET_GROUPMEMBERS_SUCCESS:
      return [
        ...state,
        action.members
      ];

    case types.GET_GROUPMEMBERS_FAILED:
      return [];

    default:
      return state;
  }
};

export default groupMembersReducer;
