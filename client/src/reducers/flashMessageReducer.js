import shortId from 'shortid';
import initialState from '../initialState';
import { NEW_MESSAGE } from '../../constant';

const flashMessageReducer = (state = initialState.addflashMessages, action = {}) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return [
        ...state,
        {
          id: shortId.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    default:
      return state;
  }
};
export default flashMessageReducer;
