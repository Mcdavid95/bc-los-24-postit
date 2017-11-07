import setAuthToken from '../../src/reducers/authTokenReducer';
import * as types from '../../constant';
import state from '../../src/initialState';

describe('Set Current User Reducer', () => {
  it('should return.SET_CURRENT_USER', () => {
    const action = {
      type: types.SET_CURRENT_USER,
      isAuthenticated: true,
      user: { id: 1, name: 'mcdavid', email: 'mcdavidemereuwa95@gmail.com', iat: 1505944828, exp: 1506031228 }
    };
    const results = setAuthToken(state, action);
    expect(results)
      .toEqual({
        isAuthenticated: true,
        user: { id: 1, name: 'mcdavid', email: 'mcdavidemereuwa95@gmail.com', iat: 1505944828, exp: 1506031228 }
      });
  });
});
