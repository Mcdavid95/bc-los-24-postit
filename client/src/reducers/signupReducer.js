import * as types from '../constant';
import initialState from '../initialState';

const signupReducer = (state = initialState.signup, action) => {
  switch (action.type) {
    case types.SIGNUP_USER:
      return [
        ...state, action
      ];

    case types.SIGNUP_USER_ERROR:
      return [];
    default:
      return state;
  }
};

export default signupReducer;
