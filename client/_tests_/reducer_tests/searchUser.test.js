import searchUser from '../../src/reducers/searchUserReducer';
import * as types from '../../src/constant';
import state from '../../src/initialState';

describe('Search User Reducer', () => {
  it('should return SEARCH_USERS_SUCCESS', () => {
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
    const action = {
      male: '',
      type: types.SEARCH_USERS_FAILED,
    };
    const results = searchUser(state, action);
    expect(results)
      .toEqual([]);
  });
});
