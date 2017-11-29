import groupMembers from '../../src/reducers/groupMembersReducer';
import * as types from '../../src/constant';
import state from '../../src/initialState';

describe('Get User Groups Reducer', () => {
  it('should return.GET_GROUPMEMBERS_SUCCESS', () => {
    const action = {
      type: types.GET_GROUPMEMBERS_SUCCESS,
      members: [[{ username: 'melody' }]]
    };
    const results = groupMembers(state, action);
    expect(results)
      .toEqual([[[{ username: 'melody' }]]
      ]);
  });
  it('should return.GET_GROUPMEMBERS_FAILED', () => {
    const action = {
      male: '',
      type: types.GET_GROUPMEMBERS_FAILED
    };
    const results = groupMembers(state, action);
    expect(results)
      .toEqual([]);
  });
});
