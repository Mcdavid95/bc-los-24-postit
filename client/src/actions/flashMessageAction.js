import * as types from '../../constant';

const flashMessageAction = message => ({
  type: types.NEW_MESSAGE,
  message
});

export default flashMessageAction;
