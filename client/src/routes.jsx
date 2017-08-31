import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Board from './pages/MessageBoard/Board';
import Layout from './components/Layout';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/layout" component={Layout} />
    <Route exact path="/register" name="signup" component={Signup} />
    <Route exact path="/login" name="login" component={Login} />
    <Route exact path="/api/group/:groupId/message" name="board" component={Board} />
  </Switch>
);
