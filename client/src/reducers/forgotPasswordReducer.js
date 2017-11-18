import * as types from '../constant';
import initialState from '../initialState';

const forgotPasswordReducer = (state = initialState.forgotPassword, action = {}) => {
  switch (action.type) {
    case types.CONFIRM_EMAIL_SUCCESS:
      return [
        ...state, action.email
      ];

    case types.CONFIRM_EMAIL_FAILED:
      return [];

    default:
      return state;
  }
};
export default forgotPasswordReducer;
