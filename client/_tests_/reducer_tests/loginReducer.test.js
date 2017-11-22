import login from '../../src/reducers/loginReducer';
import * as types from '../../constant';
import state from '../../src/initialState';

describe('Login Reducer', () => {
  it('should return LOGIN_USER_SUCCES success', () => {
    const action = {
      type: types.LOGIN_USER,
      username: 'Mcdavid',
      email: 'mcdavidemereuwa@gmail.com',
      phoneNumber: 2333405585,
      loggedIn: false,
      password: 'jhiuiui'
    };
    const results = login(state, action);
    expect(results)
      .toEqual([{
        type: types.LOGIN_USER,
        username: 'Mcdavid',
        email: 'mcdavidemereuwa@gmail.com',
        phoneNumber: 2333405585,
        loggedIn: false,
        password: 'jhiuiui'
      }]);
  });
});

describe('Login Reducer', () => {
  it('should return LOGIN_USER_ERROR', () => {
    const action = {
      type: types.LOGIN_USER_ERROR,
      male: ''
    };
    const results = login(state, action);
    expect(results)
      .toEqual([]);
  });
});
