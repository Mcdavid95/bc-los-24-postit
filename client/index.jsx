import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import Messages from './src/containers/Message';
import Board from './src/components/MessageBoard/Board';
import Login from './src/components/Login/Login';
import Signup from './src/components/Signup/Signup';
import configureStore from './src/store';
import history from './src/utils/History';
import setAuthToken from './src/utils/setAuthToken';
import { setCurrentUser } from './src/actions';
import requireAuth from './src/utils/Authenticate';
import CheckLoggedInUser from './src/utils/CheckLoggedInUser';

import ForgotPasswordPage from './src/containers/ForgotPassword';
import ResetPassword from './src/containers/ResetPassword';
import SearchUserPage from './src/containers/SearchPage';
import PageNotFound from './src/components/404/PageNotFound';

import './public/materialize.min.css';
import './public/auth.scss';
import './js/jquery-3.2.1.min';
import './js/materialize.min';

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
        {localStorage.jwtToken
          ? <Route exact path="/" component={requireAuth(Board)} /> :
          <Route exact path="/" name="login" component={Login} />}
        <Route exact path="/register" name="signup" component={CheckLoggedInUser(Signup)} />
        <Route exact path="/login" name="login" component={CheckLoggedInUser(Login)} />
        <Route
          exact
          path="/forgot-password"
          name="forgot-password"
          component={ForgotPasswordPage}
        />
        <Route exact path="/dashboard" name="board" component={requireAuth(Board)} />
        <Route
          exact
          path="/group/:groupId/messages"
          name="group"
          component={requireAuth(Messages)}
        />
        <Route path="/reset/:token" name="reset" component={ResetPassword} />
        <Route path="/search-user" name="search-user" component={requireAuth(SearchUserPage)} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  </Provider>
  , app);
