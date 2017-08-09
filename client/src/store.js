import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';

import allReducers from './reducers/index';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);

export default createStore(allReducers);
