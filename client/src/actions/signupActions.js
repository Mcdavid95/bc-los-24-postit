import axios from 'axios';

const userSignupRequest = userData => dispatch => axios.post('/api/user/register', userData);
export default userSignupRequest;
