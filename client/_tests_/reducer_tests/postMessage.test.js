import postMessage from '../../src/reducers/postMessageReducer';
import * as types from '../../src/constant';
import state from '../../src/initialState';

describe('Post message Reducer', () => {
  it('should return POST_MESSAGE_SUCCESS', () => {
    const action = {
      type: types.POST_MESSAGE_SUCCESS,
      message: 'hi apple',
      priority: 'normal',
    };
    const results = postMessage(state, action);
    expect(results)
      .toEqual([{
        type: types.POST_MESSAGE_SUCCESS,
        message: 'hi apple',
        priority: 'normal',
      }]);
  });
  it('should return POST_MESSAGE_FAILED when wrong message format is sent', () => {
    const action = {
      male: '',
      type: types.POST_MESSAGE_FAILED,
    };
    const results = postMessage(state, action);
    expect(results)
      .toEqual([]);
  });
});
