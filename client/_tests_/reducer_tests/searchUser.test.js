import searchUser from '../../src/reducers/searchUserReducer';
import * as types from '../../constant';

describe('Search User Reducer', () => {
  it('should return SEARCH_USERS_SUCCESS', () => {
    const state = {
      username: '',
      allUsers: []
    };
    const action = {
      type: types.SEARCH_USERS_SUCCESS,
      username: 'mc',
      users: ['mcdavid'],
    };
    const results = searchUser(state, action);
    expect(results)
      .toEqual([{
        type: types.SEARCH_USERS_SUCCESS,
        username: 'mc',
        users: ['mcdavid'],
      }]);
  });
  it('should return SEARCH_USERS_FAILED', () => {
    const state = {
      username: '',
      AllUsers: []
    };
    const action = {
      male: '',
      type: types.SEARCH_USERS_FAILED,
    };
    const results = searchUser(state, action);
    expect(results)
      .toEqual([]);
  });
});
