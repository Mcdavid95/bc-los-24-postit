import addUser from '../../src/reducers/addUserToGroupReducer';
import * as types from '../../constant';

describe('Add User to Group Reducer', () => {
  it('should return ADD_USER_TO_GROUP_SUCCESS', () => {
    const state = {
      username: '',
      users: []
    };
    const action = {
      type: types.ADD_USER_TO_GROUP_SUCCESS,
      username: 'mcdavid',
      users: ['dave', 'mcdavid'],
    };
    const results = addUser(state, action);
    expect(results)
      .toEqual([{
        type: types.ADD_USER_TO_GROUP_SUCCESS,
        username: 'mcdavid',
        users: ['dave', 'mcdavid'],
      }]);
  });
  it('should return ADD_USER_TO_GROUP_FAILED', () => {
    const state = {
      username: '',
      users: []
    };
    const action = {
      male: '',
      type: types.ADD_USER_TO_GROUP_FAILED,
    };
    const results = addUser(state, action);
    expect(results)
      .toEqual([]);
  });
});
