import * as types from '../../constant';
import initialState from '../initialState';

const getAllUsers = (state = initialState.allUsers, action) => {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return [
        ...state, action.users
      ];

    case types.GET_USERS_FAILED:
      return state;

    default:
      return state;
  }
};

export default getAllUsers;
