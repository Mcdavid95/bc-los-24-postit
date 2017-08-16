import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import Board from './src/pages/MessageBoard/Board';
import Layout from './src/components/Layout';
import Login from './src/pages/Login/Login';
import Signup from './src/pages/Signup/Signup';
import configureStore from './src/store';
import history from './src/utils/History';
import setAuthToken from './src/utils/setAuthToken';
import setCurrentUser from './src/actions/currentUserActions';
import routes from './src/routes';

import './public/materialize.min.css';
import './public/auth.css';
import './js/jquery-3.2.1.min';
import './js/materialize.min';
import './js/post';

const app = document.getElementById('root');
const store = configureStore();

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/layout" component={Layout} />
        <Route exact path="/api/user/register" name="signup" component={Signup} />
        <Route exact path="/api/user/login" name="login" component={Login} />
        <Route exact path="/api/group/:groupId/message" name="board" component={Board} />
      </Switch>
    </Router>
  </Provider>
  , app);
