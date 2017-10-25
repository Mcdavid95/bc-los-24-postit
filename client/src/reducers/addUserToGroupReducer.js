import * as types from '../../constant';
import initialState from '../initialState';

const addUserToGroup = (state = initialState.addUser, action) => {
  switch (action.type) {
    case types.ADD_USER_TO_GROUP_SUCCESS:
      return [
        ...state, action
      ];
    case types.ADD_USER_TO_GROUP_FAILED:
      return [];

    default:
      return state;
  }
};

export default addUserToGroup;
