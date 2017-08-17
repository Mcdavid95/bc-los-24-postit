import * as types from '../../constant';
import initialState from '../initialState';

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return [
        ...state,
        Object.assign({}, action.userData)
      ];

    case types.LOGIN_USER_ERROR:
      return [
        ...state,
        Object.assign({}, action.userData)
      ];

    default:
      return state;
  }
};

export default loginReducer;
