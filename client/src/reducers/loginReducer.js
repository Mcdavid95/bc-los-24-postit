import * as types from '../constant';
import initialState from '../initialState';

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return [
        ...state, action
      ];

    case types.LOGIN_USER_ERROR:
      return [];

    default:
      return state;
  }
};

export default loginReducer;
