import * as types from '../constant';
import initialState from '../initialState';

const searchUser = (state = initialState.search, action) => {
  switch (action.type) {
    case types.SEARCH_USERS_SUCCESS:
      return [
        ...state,
        action
      ];
    case types.SEARCH_USERS_FAILED:
      return [];

    default:
      return state;
  }
};
export default searchUser;
