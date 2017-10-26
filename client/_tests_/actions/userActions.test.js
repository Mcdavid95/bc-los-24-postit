import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { createBrowserHistory } from 'history';
import initialState from '../../src/initialState';
import mockLocalStorage from '../_mocks_/mockLocalStorage';
import * as actions from '../../src/actions/userActions';
import * as types from '../../constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Sign up action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const userData = {
    username: 'Mcdavid',
    password: 'janike_13',
    email: 'mcdavidemereuwa95@gmail.com',
    phoneNumber: 234795959
  };

  const invalidUserData = {
    username: 'Mcdavid',
    password: 'janike_13',
    phoneNumber: 234795959
  };

  it('contains a sign up function', () => {
    expect(typeof (actions.userSignupRequest())).toBe('function');
  });

  it('should dispatch SET_CURRENT_USER on successful sign up', (done) => {
    moxios.stubRequest('/api/v1/user/register', {
      status: 201,
      response: {
        message: 'Sign in succesful.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.SET_CURRENT_USER }
    ];
    store.dispatch(actions.userSignupRequest(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });


  it('should dispatch SIGNUP_USER_ERROR on successful sign up', (done) => {
    moxios.stubRequest('/api/v1/user/register', {
      status: 401,
      response: {
        message: 'Sign in succesful.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.SIGNUP_USER_ERROR }
    ];
    store.dispatch(actions.userSignupRequest(invalidUserData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Sign in action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const userData = {
    username: 'Mcdavid',
    password: 'janike_13'
  };

  const invalidUserData = {
    username: 'Mcdavid'
  };

  it('contains a userLoginRequest function', () => {
    expect(typeof (actions.userLoginRequest())).toBe('function');
  });

  it('should dispatch LOGIN_USER on successful sign in', (done) => {
    moxios.stubRequest('/api/v1/user/login', {
      status: 201,
      response: {
        message: 'Sign in succesful.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.LOGIN_USER }
    ];
    store.dispatch(actions.userLoginRequest(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch LOGIN_USER_ERROR on successful sign up', (done) => {
    moxios.stubRequest('/api/v1/user/login', {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.LOGIN_USER_ERROR }
    ];
    store.dispatch(actions.userSignupRequest(invalidUserData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Logout Action', () => {
  const token = '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk';
  beforeEach(() => {
    moxios.install();
    mockLocalStorage.setItem('jwtToken', token);
    mockLocalStorage.getItem('jwtToken');
    const history = createBrowserHistory();
  });
  afterEach(() => {
    moxios.uninstall();
    mockLocalStorage.removeItem('jwtToken');
  });
  jest.mock('history', () => ({ createBrowserHistory: { push: jest.fn() } }));
  const store = mockStore(initialState);

  it('contains a logout function', () => {
    expect(typeof (actions.logout())).toBe('function');
  });

  it('should dispatch LOGOUT_USER on successful logout', (done) => {
    const expectedActions = [
      { type: types.LOGOUT_USER }
    ];
    store.dispatch(actions.logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get all users action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a getAllUsers function', () => {
    expect(typeof (actions.getAllUsers())).toBe('function');
  });

  it('should dispatch GET_USERS_SUCCESS ', (done) => {
    moxios.stubRequest('/api/v1/users', {
      status: 201,
      response: {
        message: 'yea it workedl.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.GET_USERS_SUCCESS }
    ];
    store.dispatch(actions.getAllUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_USERS_FAILED on successful sign up', (done) => {
    moxios.stubRequest('/api/v1/users', {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.GET_USERS_FAILED }
    ];
    store.dispatch(actions.getAllUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Search users action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const payLoad = {
    username: 'mcdavid',
    offset: 5
  };

  it('contains a searchUsers function', () => {
    expect(typeof (actions.searchUsers())).toBe('function');
  });

  it('should dispatch SEARCH_USER_SUCCESS ', (done) => {
    moxios.stubRequest(`/api/v1/users/searchList/${payLoad.offset}`, {
      status: 201,
      response: {
        message: 'yea it workedl.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.SEARCH_USER_SUCCESS }
    ];
    store.dispatch(actions.searchUsers(payLoad.username, payLoad.offset)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch SEARCH_USER_FAILED if an error occurs', (done) => {
    moxios.stubRequest(`/api/v1/users/searchList/${payLoad.offset}`, {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.SEARCH_USER_FAILED }
    ];
    store.dispatch(actions.searchUsers(payLoad.username, payLoad.offset)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Forgot password action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const payLoad = {
    email: 'mcdavidemereuwa95@gmail.com',
  };

  it('contains a forgotPassword function', () => {
    expect(typeof (actions.forgotPassword())).toBe('function');
  });

  it('should dispatch CONFIRM_EMAIL_SUCCESS', (done) => {
    moxios.stubRequest('/api/v1/forgot-password', {
      status: 201,
      response: {
        message: 'yea it workedl.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.CONFIRM_EMAIL_SUCCESS }
    ];
    store.dispatch(actions.forgotPassword(payLoad)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch CONFIRM_EMAIL if an error occurs', (done) => {
    moxios.stubRequest('/api/v1/forgot-password', {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.CONFIRM_EMAIL_FAILED }
    ];
    store.dispatch(actions.forgotPassword()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});


describe('confirm Password reset', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const payLoad = {
    email: 'mcdavidemereuwa95@gmail.com',
    token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk',
    newPassword: 'qwertyu'
  };
  it('contains a forgotPassword function', () => {
    expect(typeof (actions.confirmPasswordResetRequest())).toBe('function');
  });

  it('should dispatch RESET_PASSWORD_SUCCESS', (done) => {
    moxios.stubRequest(`/api/v1/reset-password/${payLoad.token}`, payLoad, {
      status: 201,
      response: {
        message: 'yea it workedl.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.RESET_PASSWORD_SUCCESS }
    ];
    store.dispatch(actions.confirmPasswordResetRequest(payLoad.token, payLoad)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch RESET_PASSWORD_FAILED if an error occurs', (done) => {
    moxios.stubRequest(`/api/v1/reset-password/${payLoad.token}`, payLoad, {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.RESET_PASSWORD_FAILED }
    ];
    store.dispatch(actions.confirmPasswordResetRequest(payLoad.token, payLoad)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});