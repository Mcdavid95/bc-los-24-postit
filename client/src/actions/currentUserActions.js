import { SET_CURRENT_USER } from '../../constant';

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export default setCurrentUser;
