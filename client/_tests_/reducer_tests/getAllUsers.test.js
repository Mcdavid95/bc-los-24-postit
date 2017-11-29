import getAllUsers from '../../src/reducers/getAllUsersReducer';
import * as types from '../../src/constant';
import state from '../../src/initialState';

describe('Get All Users Reducer', () => {
  it('should return GET_USERS_SUCCESS', () => {
    const action = {
      type: types.GET_USERS_SUCCESS,
      username: 'mcdavid',
      users: ['dave', 'mcdavid'],
    };
    const results = getAllUsers(state, action);
    expect(results)
      .toEqual([{
        type: types.GET_USERS_SUCCESS,
        username: 'mcdavid',
        users: ['dave', 'mcdavid'],
      }]);
  });
  it('should return GET_USERS_FAILED', () => {
    const action = {
      male: '',
      type: types.GET_USERS_FAILED,
    };
    const results = getAllUsers(state, action);
    expect(results)
      .toEqual([]);
  });
});
