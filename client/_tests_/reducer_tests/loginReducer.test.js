import login from '../../src/reducers/loginReducer';
import * as types from '../../constant';
import reducers from '../../src/reducers';

describe('Login Reducer', () => {
  it('should return LOGIN_USER_SUCCES success', () => {
    const state = {
      username: '',
      email: '',
      phoneNumber: 234,
      loggedIn: false,
      password: ''
    };
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
    const state = {
      username: '',
      email: '',
      phoneNumber: 234,
      loggedIn: false,
      password: ''
    };
    const action = {
      type: types.LOGIN_USER_ERROR,
      male: ''
    };
    const results = login(state, action);
    expect(results)
      .toEqual([]);
  });
});
