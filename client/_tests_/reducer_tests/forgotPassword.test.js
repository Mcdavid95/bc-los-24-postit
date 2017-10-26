import forgotPassword from '../../src/reducers/forgotPasswordReducer';
import * as types from '../../constant';

describe('Post message Reducer', () => {
  it('should return CONFIRM_EMAIL_SUCCESS', () => {
    const state = {
      email: ''
    };
    const action = {
      type: types.CONFIRM_EMAIL_SUCCESS,
      email: 'mcdavidemereuwa95@gmail.com'
    };
    const results = forgotPassword(state, action);
    expect(results)
      .toEqual(['mcdavidemereuwa95@gmail.com'
      ]);
  });
  it('should return CONFIRM_EMAIL_FAILED when wrong message format is sent', () => {
    const state = {
      username: '',
      users: []
    };
    const action = {
      male: '',
      type: types.CONFIRM_EMAIL_FAILED,
    };
    const results = forgotPassword(state, action);
    expect(results)
      .toEqual([]);
  });
});
