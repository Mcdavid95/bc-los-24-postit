import * as types from '../../constant';
import initialState from '../initialState';

const resetPasswordReducer = (state = initialState.forgotPassword, action = {}) => {
  switch (action.type) {
    case types.RESET_PASSWORD_SUCCESS:
      return [
        state,
        ...state, action.password
      ];

    case types.RESET_PASSWORD_FAILED:
      return [
      ];

    default:
      return state;
  }
};
export default resetPasswordReducer;
