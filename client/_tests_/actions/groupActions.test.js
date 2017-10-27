import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import initialState from '../../src/initialState';
import mockLocalStorage from '../_mocks_/mockLocalStorage';
import * as actions from '../../src/actions/groupActions';
import * as types from '../../constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;


describe('Create Group Request action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const groupData = {
    groupName: 'Death',
    description: 'All things dark'
  };

  const invalidGroupData = {
    group: 'flash'
  };

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

  it('should dispatch LOAD_GROUPS_SUCCESS after creating group', (done) => {
    moxios.stubRequest('/api/v1/user/groups', {
      status: 201,
      response: {
        message: 'Welcome.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = { type: types.LOAD_GROUPS_SUCCESS };

    store.dispatch(actions.getUserGroups());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should dispatch LOAD_GROUPS_ERROR if unsuccessful', (done) => {
    moxios.stubRequest('/api/v1/user/groups', {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = 'LOAD_GROUPS_FAILED';
    store.dispatch(actions.getUserGroups());
    expect(store.getActions()[0].type).toEqual(expectedActions);
    done();
  });
});


describe('Add User to Group Request action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  const groupData = {
    username: 'mcdavid',
    groupId: 1
  };

  it('contains a addUserRequest function', () => {
    expect(typeof (actions.addUserRequest())).toBe('function');
  });

  it('should dispatch ADD_USER_TO_GROUP_SUCCESS after creating group', (done) => {
    moxios.stubRequest(`/api/v1/group/${groupData.groupId}/user`, {
      status: 201,
      response: {
        message: 'Error.',
        data: {
          token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
        }
      }
    });
    const expectedActions = [
      { type: types.ADD_USER_TO_GROUP_SUCCESS }
    ];
    store.dispatch(actions.addUserRequest(groupData, groupData.groupId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch ADD_USER_TO_GROUP_ERROR on successful sign up', (done) => {
    moxios.stubRequest(`/api/v1/group/${groupData.groupId}/user`, {
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
    store.dispatch(actions.addUserRequest(groupData, groupData.groupId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
