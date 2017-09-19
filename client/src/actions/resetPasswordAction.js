import axios from 'axios';
import history from '../utils/History';
import * as types from '../../constant';

const confirmPasswordResetSuccess = password => ({
  type: types.RESET_PASSWORD_SUCCESS, password
});

const confirmPasswordResetFailed = password => ({
  type: types.RESET_PASSWORD_FAILED, password
});

const confirmPasswordResetRequest = (token, newPassword) => dispatch =>
  axios.post(`/api/reset-password/${token}`, newPassword)
    .then((response) => {
      dispatch(confirmPasswordResetSuccess(response));
      Materialize.toast('Password reset successful', 6000, 'rounded, green');
      history.push('/login');
    })
    .catch((err) => {
      dispatch(confirmPasswordResetFailed(err));
      Materialize.toast(err.response.data.message, 3000, 'rounded red');
    });
export default confirmPasswordResetRequest;
