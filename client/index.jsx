import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import Message from './src/containers/Message';
import Board from './src/pages/MessageBoard/Board';
import Login from './src/pages/Login/Login';
import Signup from './src/pages/Signup/Signup';
import configureStore from './src/store';
import history from './src/utils/History';
import setAuthToken from './src/utils/setAuthToken';
import setCurrentUser from './src/actions/currentUserActions';
import requireAuth from './src/utils/Authenticate';
import ForgotPasswordPage from './src/pages/ForgotPassword';
import ResetPassword from './src/pages/ResetPassword';
import SearchUserPage from './src/containers/SearchPage';
import PageNotFound from './src/pages/404/PageNotFound';

import './public/materialize.min.css';
import './public/auth.scss';
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
        <Route exact path="/" component={requireAuth(Board)} />
        <Route exact path="/register" name="signup" component={Signup} />
        <Route exact path="/login" name="login" component={Login} />
        <Route
          exact
          path="/forgot-password"
          name="forgot-password"
          component={ForgotPasswordPage}
        />
        <Route exact path="/dashboard" name="board" component={requireAuth(Board)} />
        <Route path="/group/:groupId" name="group" component={requireAuth(Message)} />
        <Route path="/reset/:token" name="reset" component={ResetPassword} />
        <Route path="/search-user" name="search-user" component={requireAuth(SearchUserPage)} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  </Provider>
  , app);
