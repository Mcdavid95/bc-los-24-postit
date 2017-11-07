import addUser from '../../src/reducers/addUserToGroupReducer';
import * as types from '../../constant';
import state from '../../src/initialState';

describe('Add User to Group Reducer', () => {
  it('should return ADD_USER_TO_GROUP_SUCCESS', () => {
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
    const action = {
      male: '',
      type: types.ADD_USER_TO_GROUP_FAILED,
    };
    const results = addUser(state, action);
    expect(results)
      .toEqual([]);
  });
});
