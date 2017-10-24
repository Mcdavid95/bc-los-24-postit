import signup from '../../src/reducers/signupReducer';
import reducers from '../../src/reducers';
import * as types from '../../constant';

test('reducers', () => {
  const state = reducers({
    signup: { username: '', email: '', phoneNumber: 234, loggedIn: false, password: '' },
    login: [null],
    setAuthToken: { isAuthenticated: true, user: { id: 1, name: 'mcdavid', email: 'mcdavidemereuwa95@gmail.com', iat: 1505944828, exp: 1506031228 } },
    group: { GroupName: '', description: '' },
    userGroupList: [[{ groupName: 'jonny', groupId: 1, description: 'for yemi alade' }]],
    groupMessages: [],
    postMessage: { message: '', priority: 'normal' },
    addUser: { username: '' },
    allUsers: [],
    forgotPassword: { email: '' },
    resetPassword: { newPassword: '', confirmPassword: '' },
    search: { username: '' } },
  { type: 'GET_MESSAGES_SUCCESS',
    messages: [{ id: 1, message: 'hi', userId: 1, groupId: 1, username: 'mcdavid', priority: 'normal' }] });
  expect(state).toEqual({ signup:
    { username: '', email: '', phoneNumber: 234, loggedIn: false, password: '' },
  login: [null],
  setAuthToken: { isAuthenticated: true, user: { id: 1, name: 'mcdavid', email: 'mcdavidemereuwa95@gmail.com', iat: 1505944828, exp: 1506031228 } },
  group: { GroupName: '', description: '' },
  userGroupList: [[{ groupName: 'jonny', groupId: 1, description: 'for yemi alade' }]],
  groupMessages: [[{ id: 1, message: 'hi', userId: 1, groupId: 1, username: 'mcdavid', priority: 'normal' }]],
  postMessage: { message: '', priority: 'normal' },
  addUser: { username: '' },
  allUsers: [],
  forgotPassword: { email: '' },
  resetPassword: { newPassword: '', confirmPassword: '' },
  search: { username: '' } });
});


describe('Signup Reducer', () => {
  it('SIGNUP_USER success', () => {
    const state = {
      username: '',
      email: '',
      phoneNumber: 234,
      loggedIn: false,
      password: ''
    };
    const action = {
      type: types.SIGNUP_USER,
      username: 'Mcdavid',
      email: 'mcdavidemereuwa@gmail.com',
      phoneNumber: 2333405585,
      loggedIn: false,
      password: 'jhiuiui'
    };
    const results = signup(state, action);
    expect(results)
      .toEqual([{
        type: 'SIGN_UP_USER_SUCCESS',
        username: 'Mcdavid',
        email: 'mcdavidemereuwa@gmail.com',
        phoneNumber: 2333405585,
        loggedIn: false,
        password: 'jhiuiui'
      }]);
  });
});

describe('Signup Reducer', () => {
  it('should return SIGNUP_USER_ERROR', () => {
    const state = {
      username: '',
      email: '',
      phoneNumber: 234,
      loggedIn: false,
      password: ''
    };
    const action = {
      type: types.SIGNUP_USER_ERROR,
      male: ''
    };
    const results = signup(state, action);
    expect(results)
      .toEqual([]);
  });
});
