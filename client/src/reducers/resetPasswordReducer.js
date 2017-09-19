import * as types from '../../constant';
import initialState from '../initialState';

const resetPasswordReducer = (state = initialState.forgotPassword, action = {}) => {
  switch (action.type) {
    case types.RESET_PASSWORD_SUCCESS:
      return [
        state,
        Object.assign({}, action.password)
      ];

    case types.RESET_PASSWORD_FAILED:
      return [
        state,
        Object.assign({}, action.password)
      ];

    default:
      return state;
  }
};
export default resetPasswordReducer;
