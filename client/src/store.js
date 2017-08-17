import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import initialState from './initialState';


const logger = createLogger();
const middleware = applyMiddleware(logger, thunk);

const configureStore = (state = initialState) => {
  return createStore(
    rootReducer,
    state,
    compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f));
};

export default configureStore;
