import axios from 'axios';
import history from '../utils/History';
import * as types from '../../constant';

const confirmEmailSuccess = email => ({
  type: types.CONFIRM_EMAIL_SUCCESS, email
});

const confirmEmailFailed = email => ({
  type: types.CONFIRM_EMAIL_FAILED, email
});

const confirmEmailRequest = email => dispatch =>
  axios.post('/api/v1/forgot-password', email)
    .then((response) => {
      dispatch(confirmEmailSuccess(response));
      Materialize.toast('A Link has been sent to your mail to reset your email /n It expires after 30mins', 6000, 'rounded, green');
      history.push('/login');
    })
    .catch((err) => {
      dispatch(confirmEmailFailed(err));
      Materialize.toast(err.response.data.message, 3000, 'rounded red');
    });
export default confirmEmailRequest;
