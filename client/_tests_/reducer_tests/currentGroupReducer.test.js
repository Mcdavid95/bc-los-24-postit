import getCurrentGroup from '../../src/reducers/getCurrentGroupReducer';
import * as types from '../../constant';
import state from '../../src/initialState';

describe('Get Messages Reducer', () => {
  it('should return GET_CURRENTGROUP_SUCCESS', () => {
    const action = {
      type: types.GET_CURRENTGROUP_SUCCESS,
      groupName: 'melody'
    };
    const results = getCurrentGroup(state, action);
    expect(results)
      .toEqual('melody');
  });
  it('should return GET_CURRENTGROUP_FAILED', () => {
    const action = {
      male: '',
      type: types.GET_CURRENTGROUP_FAILED
    };
    const results = getCurrentGroup(state, action);
    expect(results)
      .toEqual([]);
  });
  it('should return GET_CURRENTGROUP_FAILED', () => {
    const action = {
    };
    const results = getCurrentGroup(state, action);
    expect(results)
      .toEqual(state);
  });
});
