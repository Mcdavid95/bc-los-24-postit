import resetPassword from '../../src/reducers/resetPasswordReducer';
import * as types from '../../src/constant';
import state from '../../src/initialState';

describe('Reset password Reducer', () => {
  it('should return RESET_PASSWORD_SUCCESS', () => {
    const action = {
      type: types.RESET_PASSWORD_SUCCESS,
      password: 'mcdavidemereuwa95@gmail.com'
    };
    const results = resetPassword(state, action);
    expect(results)
      .toEqual(['mcdavidemereuwa95@gmail.com'
      ]);
  });
  it('should return RESET_PASSWORD_FAILED when wrong message format is sent', () => {
    const action = {
      male: '',
      type: types.RESET_PASSWORD_FAILED,
    };
    const results = resetPassword(state, action);
    expect(results)
      .toEqual([]);
  });
});
