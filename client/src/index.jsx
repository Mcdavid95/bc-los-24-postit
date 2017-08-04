import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';

import Board from './pages/MessageBoard/Board.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';

const app = document.getElementById('root');

ReactDom.render(
  <Router history={HashRouter}>
    <Switch>
      <Route exact path="/" component={Layout} />
      <Route exact path="/layout" component={Layout} />
      <Route exact path="/signup" name="signup" component={Signup} />
      <Route exact path="/login" name="login" component={Login} />
    </Switch>
  </Router>, app);
