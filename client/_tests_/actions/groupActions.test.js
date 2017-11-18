import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import initialState from '../../src/initialState';
import mockLocalStorage from '../_mocks_/mockLocalStorage';
import * as actions from '../../src/actions/groupActions';
import * as types from '../../src/constant';
import { userData, invalidUserData, groupData, invalidGroupData } from '../_mocks_/actions.mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Create Group Request action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);


  it('contains a createGroupRequest function', () => {
    expect(typeof (actions.createGroupRequest())).toBe('function');
  });
  it('should dispatch CREATE_GROUP_SUCCESS after creating group', (done) => {
    moxios.stubRequest('/api/v1/group', {
      status: 201,
      response: {
        message: 'SGroup created succcesfully created.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.CREATE_GROUP_SUCCESS }
    ];
    store.dispatch(actions.createGroupRequest(groupData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch CREATE_GROUP_ERROR on successful sign up', (done) => {
    moxios.stubRequest('/api/v1/group', {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.CREATE_GROUP_ERROR }
    ];
    store.dispatch(actions.createGroupRequest(invalidGroupData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});


describe('Get User Groups Request action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a createGroupRequest function', () => {
    expect(typeof (actions.createGroupRequest())).toBe('function');
  });

  it('should dispatch [] after creating group errors', (done) => {
    moxios.stubRequest('/api/v1/user/groups', {
      status: 201,
      response: {
        message: 'Welcome.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [];

    store.dispatch(actions.getUserGroups());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should dispatch LOAD_GROUPS_SUCCESS if successful', (done) => {
    moxios.stubRequest('/api/v1/user/groups', {
      status: 401,
      response: {
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = 'LOAD_GROUPS_SUCCESS';
    store.dispatch(actions.getUserGroups());
    expect(store.getActions()[0].type).toEqual(expectedActions);
    done();
  });
});


describe('Add User to Group Request action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);


  it('contains a addUserRequest function', () => {
    expect(typeof (actions.addUserRequest())).toBe('function');
  });

  it('should dispatch ADD_USER_TO_GROUP_SUCCESS after creating group', (done) => {
    moxios.stubRequest(`/api/v1/group/${userData.groupId}/user`, {
      status: 201,
      response: {
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.ADD_USER_TO_GROUP_SUCCESS }
    ];
    store.dispatch(actions.addUserRequest(userData, userData.groupId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch ADD_USER_TO_GROUP_ERROR on successful sign up', (done) => {
    moxios.stubRequest(`/api/v1/group/${invalidUserData.groupId}/user`, {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.ADD_USER_TO_GROUP_FAILED }
    ];
    store.dispatch(actions.addUserRequest(userData, userData.groupId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get Group members', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a getMembers function', () => {
    expect(typeof (actions.groupMembers())).toBe('function');
  });

  it('should dispatch GET_GROUPMEMBERS_SUCCESS', (done) => {
    moxios.stubRequest('/api/v1/group/1/users', {
      status: 201,
      response: {
        message: 'Welcome.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk',
          members: [
            {
              id: 1,
              isCreator: true,
              userId: '1',
              groupId: 1,
              groupName: 'jonny',
              email: 'mcdavidemereuwa95@gmail.com',
              description: 'for yemi alade',
              username: 'mcdavid',
              createdAt: '2017-11-15T12:52:48.137Z',
              updatedAt: '2017-11-15T12:52:48.137Z' }, { id: 2, isCreator: false, userId: '3', groupId: 1, groupName: 'jonny', email: 'melody@gmail.com', description: 'for yemi alade', username: 'melody', createdAt: '2017-11-15T12:52:48.276Z', updatedAt: '2017-11-15T12:52:48.276Z' }, { id: 5, isCreator: false, userId: null, groupId: 1, groupName: 'everyday', email: 'melo@gmail.com', description: 'daily life', username: 'melody', createdAt: '2017-11-15T12:52:49.872Z', updatedAt: '2017-11-15T12:52:49.872Z' }, { id: 6, isCreator: false, userId: null, groupId: 1, groupName: 'everyday', email: 'melo@gmail.com', description: 'daily life', username: 'melody', createdAt: '2017-11-15T12:52:49.884Z', updatedAt: '2017-11-15T12:52:49.884Z' }, { id: 7, isCreator: false, userId: null, groupId: 1, groupName: 'everyday', email: 'melo@gmail.com', description: 'daily life', username: 'melody', createdAt: '2017-11-15T12:52:49.888Z', updatedAt: '2017-11-15T12:52:49.888Z' }] }
      }
    });
    const expectedActions = { members: [{ id: 2, username: 'mcdavid' }],
      type: 'GET_GROUPMEMBERS_SUCCESS' };

    store.dispatch(actions.groupMembers(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_GROUPMEMBERS_FAILED if unsuccessful', (done) => {
    moxios.stubRequest('/api/v1/group/1/users', {
      status: 401,
      response: {
        message: 'Welcome.',
        data: { }
      }
    });
    const expectedActions = {
      type: 'GET_GROUPMEMBERS_FAILED'
    };
    store.dispatch(actions.groupMembers(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get Current Group', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a currentGroup function', () => {
    expect(typeof (actions.currentGroup())).toBe('function');
  });

  it('should dispatch GET_CURRENTGROUP_SUCCESS, and group name', (done) => {
    moxios.stubRequest('/api/v1/group/1', {
      status: 201,
      response: {
        message: 'Welcome.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk',
          groupName: 'Pheonix'
        }
      }
    });
    const expectedActions = {
      groupName: 'Pheonix',
      type: 'GET_CURRENTGROUP_SUCCESS'
    };
    store.dispatch(actions.currentGroup(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_CURRENTGROUP_FAILED if unsuccessful', (done) => {
    moxios.stubRequest('/api/v1/group/undefined', {
      status: 401,
      response: {
        message: 'Welcome.',
        data: { }
      }
    });
    const expectedActions = {
      groupName: undefined,
      type: 'GET_CURRENTGROUP_FAILED'
    };
    store.dispatch(actions.currentGroup(undefined)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

