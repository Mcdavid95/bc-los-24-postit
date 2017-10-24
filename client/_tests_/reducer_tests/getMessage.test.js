import getMessages from '../../src/reducers/getMessagesReducer';
import * as types from '../../constant';

describe('Get Messages Reducer', () => {
  it('should return GET_MESSAGES_SUCCESS', () => {
    const state = {
      messages: {},
    };
    const action = {
      type: types.GET_MESSAGES_SUCCESS,
      messages: [{ id: 1, message: 'hi', userId: 1, groupId: 1, username: 'mcdavid', priority: 'normal' }]
    };
    const results = getMessages(state, action);
    expect(results)
      .toEqual([[{ id: 1, message: 'hi', userId: 1, groupId: 1, username: 'mcdavid', priority: 'normal' }]
      ]);
  });
  it('should return GET_MESSAGES_FAILED', () => {
    const state = {
      username: '',
      users: []
    };
    const action = {
      male: '',
      type: types.GET_MESSAGES_FAILED
    };
    const results = getMessages(state, action);
    expect(results)
      .toEqual([]);
  });
});
