import createGroup from '../../src/reducers/createGroupReducer';
import * as types from '../../src/constant';
import state from '../../src/initialState';

describe('Create Group Reducer', () => {
  it('should return CREATE_GROUP_SUCCES', () => {
    const action = {
      type: types.CREATE_GROUP_SUCCESS,
      GroupName: 'Into the storm',
      description: 'Love for Aliens',
    };
    const results = createGroup(state, action);
    expect(results)
      .toEqual([{
        type: types.CREATE_GROUP_SUCCESS,
        GroupName: 'Into the storm',
        description: 'Love for Aliens',
      }]);
  });
  it('should return CREATE_GROUP_ERROR', () => {
    const action = {
      male: '',
      type: types.CREATE_GROUP_ERROR,
    };
    const results = createGroup(state, action);
    expect(results)
      .toEqual([]);
  });
});
