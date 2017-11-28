import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import initialState from '../../src/initialState';
import mockLocalStorage from '../_mocks_/mockLocalStorage';
import * as actions from '../../src/actions/messageActions';
import * as types from '../../src/constant';
import { messageData, invalidMessageData, token } from '../_mocks_/actions.mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;


describe('Post Message Request action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a postMessageRequest function', () => {
    expect(typeof (actions.postMessageRequest())).toBe('function');
  });

  it('should dispatch POST_MESSAGE_SUCCESS after creating group', (done) => {
    moxios.stubRequest(`/api/v1/group/${messageData.groupId}/message`, {
      status: 201,
      response: {
        message: 'Group created succcesfully created.',
        data: {
          token
        }
      }
    });
    const expectedActions = [
      { type: types.POST_MESSAGE_SUCCESS }
    ];
    store.dispatch(actions.postMessageRequest(messageData.groupId,
      messageData.message)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch POST_MESSAGE_ERROR if there is an errror', (done) => {
    moxios.stubRequest(`/api/v1/group/${messageData.groupId}/message`, {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token
        }
      }
    });
    const expectedActions = [
      { type: types.POST_MESSAGE_FAILED }
    ];
    store.dispatch(actions.postMessageRequest(messageData.groupId,
      invalidMessageData.group)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});


describe('Get Group Messages Request action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a postMessageRequest function', () => {
    expect(typeof (actions.postMessageRequest())).toBe('function');
  });

  it('should dispatch GET_MESSAGES_SUCCESS after creating group', (done) => {
    moxios.stubRequest(`/api/v1/group/${messageData.groupId}/messages`, {
      status: 201,
    });
    const expectedActions = [
      { type: types.GET_MESSAGES_SUCCESS }
    ];
    store.dispatch(actions.getGroupMessages(messageData.groupId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_MESSAGES_ERROR if unsuccessful', (done) => {
    moxios.stubRequest(`/api/v1/group/${messageData.groupId}/messages`, {
      status: 401,
      response: {
        message: 'Error.',
        data: {
          token
        }
      }
    });
    const expectedActions = [
      { type: types.GET_MESSAGES_FAILED }
    ];
    store.dispatch(actions.getGroupMessages(messageData.groupId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
