import groupList from '../../src/reducers/groupListReducer';
import * as types from '../../constant';

describe('Get User Groups Reducer', () => {
  it('should return.LOAD_GROUPS_SUCCESS', () => {
    const state = {
      groups: {},
    };
    const action = {
      type: types.LOAD_GROUPS_SUCCESS,
      groups: [[{ groupName: 'jonny', groupId: 1, description: 'for yemi alade' }]]
    };
    const results = groupList(state, action);
    expect(results)
      .toEqual([[[{ groupName: 'jonny', groupId: 1, description: 'for yemi alade' }]]
      ]);
  });
  it('should return.LOAD_GROUPS_FAILED', () => {
    const state = {
      username: '',
      users: []
    };
    const action = {
      male: '',
      type: types.LOAD_GROUPS_FAILED
    };
    const results = groupList(state, action);
    expect(results)
      .toEqual([]);
  });
});
